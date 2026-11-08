package com.project.linguacity.presentation.onboarding

import com.project.linguacity.domain.model.UserProfile

data class OnboardingState(
    val isLoading: Boolean = false,
    val userProfile: UserProfile? = null,
    val error: String? = null,
    /** Chưa có phiên đăng nhập (VS6): chuyển sang màn chào SCR-20. */
    val needsAuth: Boolean = false
)
