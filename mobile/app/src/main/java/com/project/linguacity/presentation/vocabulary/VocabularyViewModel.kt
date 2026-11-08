package com.project.linguacity.presentation.vocabulary

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.model.content.Vocabulary
import com.project.linguacity.domain.model.learning.VocabProgress
import com.project.linguacity.domain.repository.LearningRepository
import com.project.linguacity.domain.repository.ContentRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import javax.inject.Inject

/** SCR-06 / SCR-07 (UC_04): chỉ đọc Room → dùng được khi offline (BR-CONTENT-02). */
data class VocabularyState(
    val loading: Boolean = true,
    val buildingCode: String = "",
    val level: Int = 1,
    val words: List<Vocabulary> = emptyList(),
    /** Tiến độ từng từ (✓ sưu tầm, Mastery) — bản sao trong Room, xem được offline (ADR-004). */
    val progress: Map<Long, VocabProgress> = emptyMap()
) {
    val collectedCount: Int get() = words.count { progress[it.id]?.collected == true }
}

@HiltViewModel
class VocabularyViewModel @Inject constructor(
    savedStateHandle: SavedStateHandle,
    content: ContentRepository,
    learning: LearningRepository
) : ViewModel() {

    // Cả VocabularyRoute và FlashcardRoute đều có tham số buildingCode + level.
    private val buildingCode: String = checkNotNull(savedStateHandle["buildingCode"])
    private val level: Int = checkNotNull(savedStateHandle["level"])

    val state: StateFlow<VocabularyState> = combine(
        content.observeVocabularies(buildingCode, level),
        learning.observeProgress()
    ) { words, progress ->
        VocabularyState(
            loading = false,
            buildingCode = buildingCode,
            level = level,
            words = words,
            progress = progress
        )
    }
        .stateIn(
            viewModelScope,
            SharingStarted.WhileSubscribed(5_000),
            VocabularyState(buildingCode = buildingCode, level = level)
        )
}
