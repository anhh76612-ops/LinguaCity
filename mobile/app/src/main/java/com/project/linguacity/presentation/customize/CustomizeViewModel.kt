package com.project.linguacity.presentation.customize

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.model.player.AvatarConfig
import com.project.linguacity.domain.model.player.CosmeticCategory
import com.project.linguacity.domain.model.player.CosmeticItem
import com.project.linguacity.domain.model.player.CosmeticOutcome
import com.project.linguacity.domain.model.player.CosmeticsState
import com.project.linguacity.domain.model.player.HouseStyleConfig
import com.project.linguacity.domain.repository.CosmeticRepository
import com.project.linguacity.domain.repository.PlayerRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

/** SCR-20 Tuỳ biến nhân vật / nhà (UC_14, M8). */
data class CustomizeState(
    val cosmetics: CosmeticsState = CosmeticsState.EMPTY,
    val houseTab: Boolean = false,
    /** Bản nháp đang chọn; chỉ gửi server khi bấm Lưu. null = chưa tải xong. */
    val avatar: AvatarConfig? = null,
    val house: HouseStyleConfig? = null,
    /** Tên danh hiệu theo mã — để nói "cần danh hiệu …" với món khoá. */
    val achievementNames: Map<String, String> = emptyMap(),
    /** Món KP người chơi vừa chạm, chờ xác nhận mua. */
    val confirmUnlock: CosmeticItem? = null,
    val busy: Boolean = false,
    val message: String? = null
) {
    val dirty: Boolean
        get() = (avatar != null && avatar != cosmetics.avatar)
            || (house != null && house != cosmetics.house)

    fun selectedCode(c: CosmeticCategory): String? = avatar?.codeOf(c) ?: house?.codeOf(c)

    fun itemsOf(c: CosmeticCategory): List<CosmeticItem> = cosmetics.items.filter {
        it.category == c
    }
}

@HiltViewModel
class CustomizeViewModel @Inject constructor(
    savedStateHandle: SavedStateHandle,
    private val repository: CosmeticRepository,
    player: PlayerRepository
) : ViewModel() {

    private val _state = MutableStateFlow(
        CustomizeState(houseTab = savedStateHandle.get<Boolean>("houseTab") ?: false)
    )
    val state: StateFlow<CustomizeState> = _state.asStateFlow()

    init {
        viewModelScope.launch {
            repository.observe().collect { c ->
                // bản nháp lấy theo cấu hình đã lưu lần đầu; sau đó giữ lựa chọn của người chơi
                _state.update {
                    it.copy(
                        cosmetics = c,
                        avatar = it.avatar ?: c.avatar,
                        house = it.house ?: c.house
                    )
                }
            }
        }
        viewModelScope.launch {
            player.observeAchievements().collect { list ->
                _state.update {
                    it.copy(achievementNames = list.associate { a -> a.code to a.name })
                }
            }
        }
        viewModelScope.launch { runCatching { repository.refresh() } }
    }

    fun selectTab(house: Boolean) = _state.update { it.copy(houseTab = house) }

    /**
     * Chạm một món: đã mở thì chọn; món KP thì hỏi mua; món danh hiệu thì nói cần danh hiệu nào.
     */
    fun pick(item: CosmeticItem) {
        val st = _state.value
        when {
            st.cosmetics.isUnlocked(item) -> choose(item)
            item.unlockType == "KP" -> _state.update { it.copy(confirmUnlock = item) }
            else -> {
                val title = item.achievementCode?.let { st.achievementNames[it] ?: it } ?: "?"
                _state.update { it.copy(message = "Nhận danh hiệu \"$title\" để mở ${item.name}.") }
            }
        }
    }

    fun dismissUnlock() = _state.update { it.copy(confirmUnlock = null) }

    fun confirmUnlock() {
        val item = _state.value.confirmUnlock ?: return
        _state.update { it.copy(confirmUnlock = null, busy = true) }
        viewModelScope.launch {
            val outcome = repository.unlock(item.code)
            if (outcome == CosmeticOutcome.Done) {
                choose(item)
            }
            _state.update {
                it.copy(busy = false, message = describe(outcome, "Đã mở khoá ${item.name}!"))
            }
        }
    }

    fun save() {
        val st = _state.value
        if (st.busy || !st.dirty) {
            return
        }
        _state.update { it.copy(busy = true) }
        viewModelScope.launch {
            var outcome: CosmeticOutcome = CosmeticOutcome.Done
            if (st.avatar != null && st.avatar != st.cosmetics.avatar) {
                outcome = repository.saveAvatar(st.avatar)
            }
            if (outcome == CosmeticOutcome.Done && st.house != null
                && st.house != st.cosmetics.house) {
                outcome = repository.saveHouse(st.house)
            }
            _state.update { it.copy(busy = false, message = describe(outcome, "Đã lưu!")) }
        }
    }

    fun messageShown() = _state.update { it.copy(message = null) }

    private fun choose(item: CosmeticItem) = _state.update {
        if (item.category in CosmeticCategory.AVATAR) {
            it.copy(avatar = (it.avatar ?: it.cosmetics.avatar).with(item.category, item.code))
        }
        else it.copy(house = (it.house ?: it.cosmetics.house).with(item.category, item.code))
    }

    private fun describe(o: CosmeticOutcome, ok: String): String = when (o) {
        CosmeticOutcome.Done -> ok
        is CosmeticOutcome.NotEnoughKp -> "Cần thêm ${o.missing} KP. Học thêm một bài nhé!"
        CosmeticOutcome.Invalid -> "Món này chưa dùng được. Tải lại rồi thử nhé."
        CosmeticOutcome.Offline -> "Cần kết nối mạng để lưu thay đổi."
        is CosmeticOutcome.Failed -> o.message
    }
}
