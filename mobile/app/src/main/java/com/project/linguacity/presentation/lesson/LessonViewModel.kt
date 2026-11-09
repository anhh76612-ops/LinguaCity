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
enum class LessonProblem { OFFLINE, EXPIRED, NO_CONTENT, INVALID_STEP, DAILY_LIMIT, CLOSED, OTHER }

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
    val problemMessage: String? = null,
    /** S5: gợi ý của Bơ cho câu hiện tại (null = chưa xin). */
    val hint: com.project.linguacity.domain.model.learning.BoHint? = null,
    /** S5: số lần đã nhờ Bơ trong bài (tối đa [MAX_HINTS]). */
    val hintsUsed: Int = 0,
    val hinting: Boolean = false
) {
    val hintsLeft: Int get() = (MAX_HINTS - hintsUsed).coerceAtLeast(0)
    val current get() = session?.items?.getOrNull(index)
}

sealed interface LessonIntent {
    data object Start : LessonIntent
    data class Input(val text: String) : LessonIntent
    data class Choose(val option: String) : LessonIntent
    data object Submit : LessonIntent
    data object Next : LessonIntent
    data object Retry : LessonIntent
    /** S5: nhờ Bơ nhắc bài. */
    data object AskHint : LessonIntent
}

const val MAX_HINTS = 2

/**
 * SCR-08/09 (UC_05). Cùng một ViewModel cho mọi kiểu phiên: bài học ở công trình, bài kiểm
 * tra trình độ (placement), luyện tập (practiceMode) và sự kiện thành phố (eventId) — ADR-015.
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
    private val practiceMode: String = savedStateHandle["practiceMode"] ?: ""
    private val practiceThemes: String = savedStateHandle["themes"] ?: ""
    private val wordCount: Int = savedStateHandle["wordCount"] ?: 20
    private val eventId: Long = savedStateHandle["eventId"] ?: 0L

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
            LessonIntent.AskHint -> askHint()
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
            val startedSession = startSession()
            val correct = startedSession.items.count { it.isCorrect == true }
            _state.update {
                it.copy(
                    loading = false,
                    session = startedSession,
                    index = startedSession.firstOpenIndex,
                    correctSoFar = correct
                )
            }
            if (startedSession.firstOpenIndex >= startedSession.items.size) {
                complete()
            }
        }
    }

    private fun submit(answer: String) {
        val current = _state.value
        val item = current.current ?: return
        if (current.submitting || current.feedback != null || answer.isBlank()) {
            return
        }
        val session = current.session ?: return
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

    private fun askHint() {
        val current = _state.value
        val item = current.current ?: return
        val session = current.session ?: return
        if (current.hinting || current.hint != null || current.feedback != null ||
            current.hintsLeft <= 0 || session.placement) {
            return
        }
        _state.update { it.copy(hinting = true) }
        viewModelScope.launch {
            val hint = runCatching { learning.hint(session.id, item.itemNo) }.getOrNull()
            _state.update {
                it.copy(
                    hinting = false,
                    hint = hint,
                    hintsUsed = if (hint != null) it.hintsUsed + 1 else it.hintsUsed
                )
            }
        }
    }

    private fun next() {
        val current = _state.value
        val total = current.session?.items?.size ?: return
        val nextIndex = current.index + 1
        _state.update {
            it.copy(
                index = nextIndex, feedback = null, maiLine = null, input = "", chosen = null,
                hint = null
            )
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

    private suspend fun startSession() = when {
        eventId > 0 -> learning.startEvent(eventId)
        practiceMode.isNotEmpty() -> learning.startPractice(
            practiceMode,
            practiceThemes.split(",").filter { it.isNotBlank() },
            wordCount
        )
        placement -> learning.startPlacement()
        else -> learning.startLesson(buildingCode)
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
                    Kind.DAILY_LIMIT -> LessonProblem.DAILY_LIMIT
                    Kind.CLOSED -> LessonProblem.CLOSED
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
