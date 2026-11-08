package com.project.linguacity.presentation.quest

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.model.progression.ProgressionException
import com.project.linguacity.domain.model.progression.ProgressionException.Kind
import com.project.linguacity.domain.model.progression.QuestsOverview
import com.project.linguacity.domain.repository.ProgressionRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

/** SCR-23 Nhiệm vụ & Chuỗi (UC_16, UC_19). */
data class QuestsUiState(
    val loading: Boolean = true,
    val overview: QuestsOverview? = null,
    val dailyTab: Boolean = false,
    /** Mã nhiệm vụ đang gửi yêu cầu nhận thưởng — chặn bấm hai lần. */
    val claiming: String? = null,
    val message: String? = null,
    val offline: Boolean = false
)

@HiltViewModel
class QuestsViewModel @Inject constructor(
    private val repository: ProgressionRepository
) : ViewModel() {

    private val _state = MutableStateFlow(QuestsUiState())
    val state: StateFlow<QuestsUiState> = _state.asStateFlow()

    init {
        load()
    }

    fun load() {
        _state.update { it.copy(loading = true, offline = false) }
        viewModelScope.launch {
            try {
                val overview = repository.quests()
                _state.update { it.copy(loading = false, overview = overview) }
            } catch (e: ProgressionException) {
                val offline = e.kind == Kind.OFFLINE
                _state.update {
                    it.copy(loading = false, offline = offline, message = describe(e))
                }
            }
        }
    }

    fun selectTab(daily: Boolean) = _state.update { it.copy(dailyTab = daily) }

    fun claim(code: String) {
        if (_state.value.claiming != null) {
            return
        }
        _state.update { it.copy(claiming = code) }
        viewModelScope.launch {
            try {
                repository.claim(code)
                val overview = repository.quests()
                _state.update {
                    it.copy(claiming = null, overview = overview, message = "Đã nhận thưởng!")
                }
            } catch (e: ProgressionException) {
                _state.update { it.copy(claiming = null, message = describe(e)) }
            }
        }
    }

    fun messageShown() = _state.update { it.copy(message = null) }

    private fun describe(e: ProgressionException): String = when (e.kind) {
        Kind.OFFLINE -> "Nhiệm vụ cần mạng. Kết nối rồi thử lại nhé."
        Kind.NOT_COMPLETED -> "Nhiệm vụ chưa xong."
        Kind.ALREADY_CLAIMED -> "Bạn đã nhận thưởng nhiệm vụ này rồi."
        Kind.NOT_FOUND -> "Nhiệm vụ này không còn nữa — có thể đã sang ngày mới."
        else -> e.message ?: "Có lỗi xảy ra, thử lại sau nhé."
    }
}
