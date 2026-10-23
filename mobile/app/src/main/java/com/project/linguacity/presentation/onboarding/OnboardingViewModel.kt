package com.project.linguacity.presentation.onboarding

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.usecase.OnboardUserUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class OnboardingViewModel @Inject constructor(
    private val onboardUserUseCase: OnboardUserUseCase
) : ViewModel() {

    private val _state = MutableStateFlow(OnboardingState())

    val state: StateFlow<OnboardingState> = _state.asStateFlow()

    fun onIntent(intent: OnboardingIntent) {
        when (intent) {

            OnboardingIntent.Onboard,
            OnboardingIntent.Retry -> onboardUser()
        }
    }

    private fun onboardUser() {
        viewModelScope.launch {

            _state.value = _state.value.copy(
                isLoading = true,
                error = null
            )

            try {
                val userProfile = onboardUserUseCase()

                _state.value = OnboardingState(
                    isLoading = false,
                    userProfile = userProfile
                )

            } catch (exception: Exception) {

                _state.value = OnboardingState(
                    isLoading = false,
                    error = exception.message ?: "Onboarding failed"
                )
            }
        }
    }
}