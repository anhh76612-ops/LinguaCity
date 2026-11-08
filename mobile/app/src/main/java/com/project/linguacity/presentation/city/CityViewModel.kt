package com.project.linguacity.presentation.city

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.model.player.BuildOutcome
import com.project.linguacity.domain.repository.CityRepository
import com.project.linguacity.domain.repository.ContentRepository
import com.project.linguacity.domain.repository.CosmeticRepository
import com.project.linguacity.domain.repository.LearningRepository
import com.project.linguacity.domain.repository.PlayerRepository
import com.project.linguacity.domain.usecase.SyncContentUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Bộ não của màn City: nhận intent từ bản đồ và từ UI, quyết định làm gì.
 * Bản đồ (WebView) chỉ hiển thị; mọi nghiệp vụ nằm ở Repository + server (FR-SYS-01).
 */
@HiltViewModel
class CityViewModel @Inject constructor(
    private val cityRepository: CityRepository,
    contentRepository: ContentRepository,
    private val learning: LearningRepository,
    private val player: PlayerRepository,
    private val cosmetics: CosmeticRepository,
    private val syncContent: SyncContentUseCase
) : ViewModel() {

    private val _state = MutableStateFlow(
        CityUiState(city = cityRepository.city.value, deviceNowMillis = System.currentTimeMillis())
    )
    val state: StateFlow<CityUiState> = _state.asStateFlow()

    private var lastRefreshMillis = 0L

    init {
        // Dữ liệu thành phố đổi → cập nhật state → Compose vẽ lại → bản đồ nhận state mới.
        viewModelScope.launch {
            cityRepository.city.collect { city ->
                _state.update { it.copy(city = city, deviceNowMillis = System.currentTimeMillis()) }
            }
        }
        // Chi phí xây/nâng cấp từng Level: đọc từ Room (gói CORE).
        viewModelScope.launch {
            contentRepository.observeBuildingLevels().collect { levels -> _state.update { it.copy(levels = levels) } }
        }
        viewModelScope.launch {
            player.observeProfile().collect { profile -> _state.update { it.copy(profile = profile) } }
        }
        viewModelScope.launch {
            player.observeAchievements().collect { list ->
                _state.update { it.copy(equippedTitleName = list.firstOrNull { a -> a.equipped }?.name) }
            }
        }
        // M8: ngoại hình + kiểu nhà (mã cosmetic trong Room) → giá trị để vẽ cho bản đồ
        viewModelScope.launch {
            cosmetics.observe().collect { c ->
                _state.update {
                    it.copy(avatar = LookResolver.avatar(c.avatar, c.items), house = LookResolver.house(c.house, c.items))
                }
            }
        }
        // Số từ đã sưu tầm theo từng gói — để thẻ công trình nói rõ còn thiếu bao nhiêu từ.
        viewModelScope.launch {
            combine(contentRepository.observePackWordIds(), learning.observeProgress()) { packs, progress ->
                packs.mapValues { (_, ids) -> ids.count { progress[it]?.collected == true } to ids.size }
            }.collect { collection -> _state.update { it.copy(collection = collection) } }
        }
        // Đồng hồ hiển thị: mỗi giây tính lại tiến độ; khi đã tới giờ xong thì hỏi server (lazy completion).
        viewModelScope.launch {
            while (isActive) {
                delay(TICK_MILLIS)
                val st = _state.value
                if (st.city.buildings.any { it.isUpgrading }) {
                    _state.update { it.copy(deviceNowMillis = System.currentTimeMillis()) }
                    val due = st.render.buildings.any { it.upgrading && it.progress >= 1f }
                    if (due && System.currentTimeMillis() - lastRefreshMillis > REFRESH_GAP_MILLIS) refreshQuietly()
                }
            }
        }
    }

    fun onIntent(intent: CityIntent) {
        when (intent) {
            is CityIntent.Map -> onMapIntent(intent.intent)
            CityIntent.DismissSelection -> _state.update { it.copy(selected = null) }
            CityIntent.BuildSelected -> buildSelected()
            CityIntent.MessageShown -> _state.update { it.copy(message = null) }
            CityIntent.EnterSelected -> _state.update {
                val code = it.selected
                if (code == null || it.focus != null || it.render.building(code)?.isBuilt != true) it
                else it.copy(focus = code, selected = null)
            }
            CityIntent.ExitBuilding -> _state.update {
                // chỉ ra khi đã vào xong; đang hoạt cảnh thì bỏ qua (bản đồ cũng từ chối)
                if (it.inside != null && it.focus == it.inside) it.copy(focus = null) else it
            }
            CityIntent.AppForeground -> {
                refreshQuietly()
                syncQuietly()
            }
        }
    }

    private fun onMapIntent(intent: CityMapIntent) {
        when (intent) {
            // Ready lần nữa = bản đồ vừa tải lại: nó đang ở ngoài phố.
            CityMapIntent.Ready -> _state.update { it.copy(mapReady = true, focus = null, inside = null) }
            is CityMapIntent.BuildingTapped -> _state.update { if (it.focus != null) it else it.copy(selected = intent.code) }
            is CityMapIntent.BuildingEntered -> _state.update {
                if (it.focus == intent.code) it.copy(inside = intent.code, selected = null) else it
            }
            is CityMapIntent.BuildingExited -> _state.update { it.copy(inside = null, focus = null) }
            is CityMapIntent.CityEventTapped -> {
                cityRepository.resolveEvent(intent.eventId)
                _state.update { it.copy(message = "Sự kiện thành phố: bài ngữ pháp sẽ có ở bản sau") }
            }
        }
    }

    private fun buildSelected() {
        val code = _state.value.selected ?: return
        if (_state.value.building) return
        _state.update { it.copy(building = true) }
        viewModelScope.launch {
            val message = when (val outcome = cityRepository.build(code)) {
                BuildOutcome.Started -> "Bắt đầu xây ${code.displayName}!"
                is BuildOutcome.NotMet -> buildList {
                    if (outcome.missingCollected > 0) add("sưu tầm thêm ${outcome.missingCollected} từ")
                    if (outcome.missingKnowledge > 0) add("thêm ${outcome.missingKnowledge} KP")
                }.joinToString(" và ", prefix = "Cần ", postfix = " để xây nhé.")
                BuildOutcome.Busy -> "${code.displayName} đang được xây."
                BuildOutcome.NeedsExam -> "Nâng cấp lên Lv2 cần bài thi ở School — sắp có!"
                BuildOutcome.Offline -> "Cần kết nối mạng để xây."
                is BuildOutcome.Failed -> outcome.message
            }
            _state.update { it.copy(building = false, message = message) }
        }
    }

    /** Tải lại thành phố + hồ sơ + tiến độ từ (FR-SYS-03). Lỗi mạng bỏ qua: đã có bản trong Room. */
    private fun refreshQuietly() {
        lastRefreshMillis = System.currentTimeMillis()
        viewModelScope.launch {
            runCatching { cityRepository.refresh() }.onFailure { Log.w(TAG, "Bỏ qua tải thành phố: ${it.message}") }
            runCatching { player.refresh() }
            runCatching { learning.refreshProgress() }
            runCatching { cosmetics.refresh() }
        }
    }

    /** Đồng bộ im lặng: có gói mới thì tải, lỗi mạng thì bỏ qua vì đã có cache (UC_03 E2). */
    private fun syncQuietly() {
        viewModelScope.launch {
            runCatching { syncContent() }
                .onSuccess { if (it.downloaded.isNotEmpty()) Log.i(TAG, "Đã tải gói mới: ${it.downloaded}") }
                .onFailure { Log.w(TAG, "Bỏ qua đồng bộ nền: ${it.message}") }
        }
    }

    private companion object {
        const val TAG = "CityViewModel"
        const val TICK_MILLIS = 1_000L
        const val REFRESH_GAP_MILLIS = 3_000L
    }
}
