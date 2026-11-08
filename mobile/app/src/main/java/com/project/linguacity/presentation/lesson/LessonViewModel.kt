package com.project.linguacity.presentation.lesson

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.model.learning.AnswerFeedback
import com.project.linguacity.domain.model.learning.LearningException
import com.project.linguacity.domain.model.learning.LearningException.Kind
import com.project.linguacity.domain.model.learning.LessonResult
import com.project.linguacity.domain.model.learning.LessonSession
import com.project.linguacity.domain.repository.LearningRepository
import com.project.linguacity.domain.repository.PlayerRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

/** Lỗi hiện trên màn bài học. OFFLINE có nút Thử lại làm lại đúng việc vừa hỏng. */
enum class LessonProblem { OFFLINE, EXPIRED, NO_CONTENT, INVALID_STEP, OTHER }

data class LessonUiState(
    val loading: Boolean = true,
    val session: LessonSession? = null,
    /** Chỉ số câu đang hiện (0-based). */
    val index: Int = 0,
    val input: String = "",
    /** Đáp án người chơi vừa chọn/gõ (để tô màu phương án). */
    val chosen: String? = null,
    val submitting: Boolean = false,
    val feedback: AnswerFeedback? = null,
    val maiLine: String? = null,
    val correctSoFar: Int = 0,
    val completing: Boolean = false,
    val result: LessonResult? = null,
    /** Tên các danh hiệu mới (ghép từ danh mục). */
    val newAchievementNames: List<String> = emptyList(),
    val problem: LessonProblem? = null,
    val problemMessage: String? = null
) {
    val current get() = session?.items?.getOrNull(index)
}

sealed interface LessonIntent {
    data object Start : LessonIntent
    data class Input(val text: String) : LessonIntent
    data class Choose(val option: String) : LessonIntent
    data object Submit : LessonIntent
    data object Next : LessonIntent
    data object Retry : LessonIntent
}

/**
 * SCR-08/09 (UC_05). Cùng một ViewModel cho phiên học ở công trình và bài kiểm tra trình độ
 * (placement = true).
 * Server chấm từng câu; ViewModel chỉ điều khiển luồng hiển thị.
 */
@HiltViewModel
class LessonViewModel @Inject constructor(
    savedStateHandle: SavedStateHandle,
    private val learning: LearningRepository,
    private val player: PlayerRepository
) : ViewModel() {

    private val buildingCode: String = savedStateHandle["buildingCode"] ?: "HOUSING"
    private val placement: Boolean = savedStateHandle["placement"] ?: false

    private val _state = MutableStateFlow(LessonUiState())
    val state: StateFlow<LessonUiState> = _state.asStateFlow()

    /** Việc vừa hỏng vì mất mạng — Thử lại sẽ làm lại đúng việc này. */
    private var pending: (() -> Unit)? = null

    fun onIntent(intent: LessonIntent) {
        when (intent) {
            LessonIntent.Start -> if (_state.value.session == null) start()
            is LessonIntent.Input -> _state.update { it.copy(input = intent.text) }
            is LessonIntent.Choose -> submit(intent.option)
            LessonIntent.Submit -> submit(_state.value.input)
            LessonIntent.Next -> next()
            LessonIntent.Retry -> {
                val action = pending
                _state.update { it.copy(problem = null, problemMessage = null) }
                if (action != null) action() else start()
            }
        }
    }

    private fun start() {
        _state.update { it.copy(loading = true, problem = null) }
        launchGuarded(retry = { start() }) {
            val s = if (placement) learning.startPlacement() else learning.startLesson(buildingCode)
            val correct = s.items.count { it.isCorrect == true }
            _state.update {
                it.copy(
                    loading = false,
                    session = s,
                    index = s.firstOpenIndex,
                    correctSoFar = correct
                )
            }
            if (s.firstOpenIndex >= s.items.size) {
                complete()
            }
        }
    }

    private fun submit(answer: String) {
        val st = _state.value
        val item = st.current ?: return
        if (st.submitting || st.feedback != null || answer.isBlank()) {
            return
        }
        val session = st.session ?: return
        _state.update { it.copy(submitting = true, chosen = answer) }
        launchGuarded(retry = { submit(answer) }) {
            try {
                val fb = learning.answer(session.id, item.itemNo, answer)
                _state.update {
                    it.copy(
                        submitting = false,
                        feedback = fb,
                        maiLine = MaiLines.forAnswer(
                            fb.isCorrect,
                            fb.streak,
                            fb.collectedNow,
                            item.itemNo
                        ),
                        correctSoFar = it.correctSoFar + if (fb.isCorrect) 1 else 0
                    )
                }
            } catch (e: LearningException) {
                if (e.kind == Kind.ALREADY_ANSWERED) {
                    // Câu đã được nộp trước đó (vd. mất mạng sau khi server đã nhận): đọc lại
                    // phiên, sang câu kế.
                    val fresh = learning.session(session.id)
                    _state.update {
                        it.copy(
                            submitting = false,
                            session = fresh,
                            index = fresh.firstOpenIndex,
                            input = "",
                            chosen = null
                        )
                    }
                } else throw e
            }
        }
    }

    private fun next() {
        val st = _state.value
        val total = st.session?.items?.size ?: return
        val nextIndex = st.index + 1
        _state.update {
            it.copy(index = nextIndex, feedback = null, maiLine = null, input = "", chosen = null)
        }
        if (nextIndex >= total) {
            complete()
        }
    }

    private fun complete() {
        val session = _state.value.session ?: return
        _state.update { it.copy(completing = true) }
        launchGuarded(retry = { complete() }) {
            val result = learning.complete(session.id)
            val names = runCatching { player.observeAchievements().first() }.getOrNull()
                ?.associate { it.code to it.name } ?: emptyMap()
            _state.update {
                it.copy(completing = false, result = result,
                    newAchievementNames = result.newAchievements.map { code -> names[code]
                        ?: code })
            }
        }
    }

    private fun launchGuarded(retry: () -> Unit, block: suspend () -> Unit) {
        viewModelScope.launch {
            try {
                block()
                pending = null
            } catch (e: LearningException) {
                val problem = when (e.kind) {
                    Kind.OFFLINE -> LessonProblem.OFFLINE
                    Kind.EXPIRED -> LessonProblem.EXPIRED
                    Kind.NO_CONTENT -> LessonProblem.NO_CONTENT
                    Kind.INVALID_STEP -> LessonProblem.INVALID_STEP
                    else -> LessonProblem.OTHER
                }
                pending = when (problem) {
                    LessonProblem.OFFLINE -> retry
                    LessonProblem.EXPIRED -> {
                        {
                            _state.update { LessonUiState() }
                            start()
                        }
                    }
                    else -> null
                }
                _state.update {
                    it.copy(
                        loading = false,
                        submitting = false,
                        completing = false,
                        problem = problem,
                        problemMessage = e.message
                    )
                }
            }
        }
    }
}
