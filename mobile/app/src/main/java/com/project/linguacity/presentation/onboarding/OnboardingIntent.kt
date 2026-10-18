package com.project.linguacity.presentation.onboarding

sealed interface OnboardingIntent {

    data object Onboard : OnboardingIntent
}