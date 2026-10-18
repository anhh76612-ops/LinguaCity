package com.project.linguacity.presentation.onboarding

import com.project.linguacity.domain.model.UserProfile

data class OnboardingState(
    val isLoading: Boolean = false,
    val userProfile: UserProfile? = null,
    val error: String? = null
)