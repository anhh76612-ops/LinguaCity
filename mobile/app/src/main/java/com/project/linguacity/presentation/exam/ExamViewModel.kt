package com.project.linguacity.presentation.exam

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.progression.ExamAttempt
import com.project.linguacity.domain.model.progression.ExamResult
import com.project.linguacity.domain.model.progression.ExamStatus
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

/** SCR-10/11/12: trung tâm thi → làm bài → kết quả (UC_06/07/08, ADR-015 §2). */
data class ExamUiState(
    val loading: Boolean = true,
    val status: ExamStatus? = null,
    val attempt: ExamAttempt? = null,
    /** Câu đang xem (0-based) và câu trả lời giữ trong máy, theo thứ tự câu. */
    val index: Int = 0,
    val answers: Map<Int, String> = emptyMap(),
    val reviewing: Boolean = false,
    val confirmFee: Boolean = false,
    val busy: Boolean = false,
    val result: ExamResult? = null,
    val message: String? = null
) {
    val currentOrder: Int? get() = attempt?.questions?.getOrNull(index)?.order
    val answeredCount: Int get() = answers.count { it.value.isNotBlank() }
}

@HiltViewModel
class ExamViewModel @Inject constructor(
    savedStateHandle: SavedStateHandle,
    private val repository: ProgressionRepository
) : ViewModel() {

    private val building: BuildingCode = BuildingCode.entries.firstOrNull {
        it.name == savedStateHandle.get<String>("buildingCode")
    } ?: BuildingCode.HOUSING

    private val _state = MutableStateFlow(ExamUiState())
    val state: StateFlow<ExamUiState> = _state.asStateFlow()

    init {
        load()
    }

    fun load() {
        _state.update { it.copy(loading = true) }
        guarded {
            val exams = repository.exams(building)
            val exam = exams.firstOrNull { !it.passed } ?: exams.lastOrNull()
            _state.update { it.copy(loading = false, status = exam) }
        }
    }

    /** "Bắt đầu thi": có lượt dở thì vào lại, không thì hỏi xác nhận phí. */
    fun start() {
        val status = _state.value.status ?: return
        if (status.activeAttemptId != null) {
            guarded { open(repository.attempt(status.activeAttemptId)) }
        } else {
            _state.update { it.copy(confirmFee = true) }
        }
    }

    fun dismissFee() = _state.update { it.copy(confirmFee = false) }

    fun confirmStart() {
        val code = _state.value.status?.code ?: return
        _state.update { it.copy(confirmFee = false, busy = true) }
        guarded { open(repository.startExam(code)) }
    }

    fun answer(text: String) {
        val order = _state.value.currentOrder ?: return
        _state.update { it.copy(answers = it.answers + (order to text)) }
    }

    fun goTo(index: Int) {
        val size = _state.value.attempt?.questions?.size ?: return
        _state.update { it.copy(index = index.coerceIn(0, size - 1), reviewing = false) }
    }

    fun next() {
        val state = _state.value
        val size = state.attempt?.questions?.size ?: return
        if (state.index + 1 >= size) {
            _state.update { it.copy(reviewing = true) }
        } else {
            goTo(state.index + 1)
        }
    }

    fun review() = _state.update { it.copy(reviewing = true) }

    fun submit() {
        val state = _state.value
        val attempt = state.attempt ?: return
        if (state.busy) {
            return
        }
        _state.update { it.copy(busy = true) }
        guarded {
            val answers = state.answers.filterValues { it.isNotBlank() }
            val result = repository.submit(attempt.id, answers)
            _state.update { it.copy(busy = false, result = result, reviewing = false) }
        }
    }

    fun messageShown() = _state.update { it.copy(message = null) }

    private fun open(attempt: ExamAttempt) {
        _state.update {
            it.copy(busy = false, loading = false, attempt = attempt, index = 0, reviewing = false)
        }
    }

    private fun guarded(block: suspend () -> Unit) {
        viewModelScope.launch {
            try {
                block()
            } catch (e: ProgressionException) {
                _state.update { it.copy(loading = false, busy = false, message = describe(e)) }
                if (e.kind == Kind.INCOMPLETE || e.kind == Kind.ATTEMPT_CLOSED) {
                    _state.update { it.copy(reviewing = true) }
                }
            }
        }
    }

    private fun describe(e: ProgressionException): String = when (e.kind) {
        Kind.OFFLINE -> "Bài thi cần mạng. Câu trả lời vẫn được giữ — có mạng rồi thử lại nhé."
        Kind.REQUIREMENTS_NOT_MET -> "Chưa đủ điều kiện thi. Xem lại các mục còn thiếu nhé."
        Kind.ALREADY_PASSED -> "Bạn đã đậu bài thi này rồi."
        Kind.INCOMPLETE -> "Còn câu chưa trả lời. Kiểm tra lại trước khi nộp nhé."
        Kind.ATTEMPT_CLOSED -> "Bài này đã nộp rồi."
        Kind.NO_CONTENT -> "Bài thi chưa có câu hỏi."
        else -> e.message ?: "Có lỗi xảy ra, thử lại sau nhé."
    }
}
