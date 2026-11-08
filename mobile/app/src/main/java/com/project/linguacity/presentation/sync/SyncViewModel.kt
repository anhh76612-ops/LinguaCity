package com.project.linguacity.presentation.sync

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.usecase.SyncContentUseCase
import com.project.linguacity.presentation.common.friendlyNetworkError
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

/** SCR-03 Content Sync (UC_03). */
data class SyncState(
    val running: Boolean = true,
    val done: Int = 0,
    val total: Int = 0,
    val currentPack: String? = null,
    /** Lần đầu, không mạng → chặn và hiện lỗi + Thử lại (BR-CONTENT-08). */
    val error: String? = null,
    val finished: Boolean = false
)

sealed interface SyncIntent {
    data object Start : SyncIntent
    data object Retry : SyncIntent
}

@HiltViewModel
class SyncViewModel @Inject constructor(
    private val syncContent: SyncContentUseCase
) : ViewModel() {

    private val _state = MutableStateFlow(SyncState())
    val state: StateFlow<SyncState> = _state.asStateFlow()

    fun onIntent(intent: SyncIntent) {
        when (intent) {
            SyncIntent.Start, SyncIntent.Retry -> sync()
        }
    }

    private var job: Job? = null

    private fun sync() {
        if (job?.isActive == true) {  // xoay màn hình / bấm Thử lại liên tục: không chạy chồng
            return
        }
        _state.value = SyncState(running = true)
        job = viewModelScope.launch {
            try {
                syncContent { progress -> _state.update {
                    it.copy(
                        done = progress.done,
                        total = progress.total,
                        currentPack = progress.currentPack
                    )
                } }
                _state.update { it.copy(running = false, finished = true) }
            } catch (e: Exception) {
                // Đã có cache → vào game bằng dữ liệu cũ, không làm phiền người chơi (UC_03 E2).
                if (syncContent.hasCache()) {
                    _state.update { it.copy(running = false, finished = true) }
                } else {
                    _state.update {
                        it.copy(running = false, error = friendlyNetworkError(e, firstRun = true))
                    }
                }
            }
        }
    }
}
