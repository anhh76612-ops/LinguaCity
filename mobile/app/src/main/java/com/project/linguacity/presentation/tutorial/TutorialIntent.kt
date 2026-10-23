package com.project.linguacity.presentation.tutorial

sealed interface TutorialIntent {
    data object Next : TutorialIntent
    data object Complete : TutorialIntent
}
