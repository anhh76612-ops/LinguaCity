package com.project.linguacity.presentation.tutorial

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.usecase.CompleteTutorialUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class TutorialViewModel @Inject constructor(
    private val completeTutorialUseCase: CompleteTutorialUseCase
) : ViewModel() {

    private val _state = MutableStateFlow(TutorialState())

    val state: StateFlow<TutorialState> = _state.asStateFlow()

    fun onIntent(intent: TutorialIntent) {
        when (intent) {
            TutorialIntent.Next -> _state.update { current ->
                if (current.isLastStep) current
                else current.copy(currentStep = current.currentStep + 1)
            }

            TutorialIntent.Complete -> completeTutorial()
        }
    }

    private fun completeTutorial() {
        if (_state.value.isSubmitting) return

        viewModelScope.launch {
            _state.update { it.copy(isSubmitting = true, error = null) }

            try {
                val completed = completeTutorialUseCase()

                _state.update { it.copy(isSubmitting = false, isCompleted = completed) }

            } catch (exception: Exception) {

                _state.update {
                    it.copy(
                        isSubmitting = false,
                        error = exception.message ?: "Complete tutorial failed"
                    )
                }
            }
        }
    }
}
