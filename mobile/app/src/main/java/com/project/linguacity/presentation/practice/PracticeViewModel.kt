package com.project.linguacity.presentation.practice

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.model.progression.PracticeMode
import com.project.linguacity.domain.model.progression.PracticeStatus
import com.project.linguacity.domain.model.progression.ProgressionException
import com.project.linguacity.domain.model.progression.ProgressionException.Kind
import com.project.linguacity.domain.repository.ProgressionRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

/** SCR-24 Luyện tập (UC_18): chọn kiểu, chủ đề, cỡ bài; phiên chạy bằng LessonRoute. */
data class PracticeUiState(
    val loading: Boolean = true,
    val status: PracticeStatus? = null,
    val mode: PracticeMode = PracticeMode.REVIEW,
    /** Rỗng = mọi chủ đề (BR-PRAC-01). */
    val themes: Set<String> = emptySet(),
    val wordCount: Int = 10,
    val message: String? = null
) {
    val usesLeft: Int
        get() = when (mode) {
            PracticeMode.REVIEW -> status?.review?.left ?: 0
            PracticeMode.MIXED -> status?.mixed?.left ?: 0
        }

    val canStart: Boolean get() = status != null && usesLeft > 0
}

@HiltViewModel
class PracticeViewModel @Inject constructor(
    private val repository: ProgressionRepository
) : ViewModel() {

    private val _state = MutableStateFlow(PracticeUiState())
    val state: StateFlow<PracticeUiState> = _state.asStateFlow()

    /** Màn gọi mỗi lần ON_RESUME (cả lần đầu), để số lượt còn lại đúng sau một phiên. */
    fun load() {
        viewModelScope.launch {
            try {
                val status = repository.practiceStatus()
                _state.update { it.copy(loading = false, status = status) }
            } catch (e: ProgressionException) {
                val text = if (e.kind == Kind.OFFLINE) {
                    "Luyện tập cần mạng. Kết nối rồi thử lại nhé."
                } else {
                    e.message ?: "Chưa tải được trạng thái luyện tập."
                }
                _state.update { it.copy(loading = false, message = text) }
            }
        }
    }

    fun selectMode(mode: PracticeMode) = _state.update { it.copy(mode = mode) }

    fun toggleTheme(code: String) = _state.update {
        val themes = if (code in it.themes) it.themes - code else it.themes + code
        it.copy(themes = themes)
    }

    fun clearThemes() = _state.update { it.copy(themes = emptySet()) }

    fun selectWordCount(count: Int) = _state.update { it.copy(wordCount = count) }

    fun messageShown() = _state.update { it.copy(message = null) }

    companion object {
        val WORD_COUNTS = listOf(10, 20)
    }
}
