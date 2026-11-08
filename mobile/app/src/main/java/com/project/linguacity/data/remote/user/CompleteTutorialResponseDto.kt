package com.project.linguacity.data.remote.user

import kotlinx.serialization.Serializable

@Serializable
data class CompleteTutorialResponseDto(val tutorialCompleted: Boolean) {

}
