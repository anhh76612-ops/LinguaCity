package com.project.linguacity.presentation.vocabulary

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.model.content.Vocabulary
import com.project.linguacity.domain.repository.ContentRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import javax.inject.Inject

/** SCR-06 / SCR-07 (UC_04): chỉ đọc Room → dùng được khi offline (BR-CONTENT-02). */
data class VocabularyState(
    val loading: Boolean = true,
    val buildingCode: String = "",
    val level: Int = 1,
    val words: List<Vocabulary> = emptyList()
)

@HiltViewModel
class VocabularyViewModel @Inject constructor(
    savedStateHandle: SavedStateHandle,
    content: ContentRepository
) : ViewModel() {

    // Cả VocabularyRoute và FlashcardRoute đều có tham số buildingCode + level.
    private val buildingCode: String = checkNotNull(savedStateHandle["buildingCode"])
    private val level: Int = checkNotNull(savedStateHandle["level"])

    val state: StateFlow<VocabularyState> = content.observeVocabularies(buildingCode, level)
        .map { VocabularyState(loading = false, buildingCode = buildingCode, level = level, words = it) }
        .stateIn(
            viewModelScope,
            SharingStarted.WhileSubscribed(5_000),
            VocabularyState(buildingCode = buildingCode, level = level)
        )
}
