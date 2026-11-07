package com.project.linguacity.data.remote.user

import kotlinx.serialization.Serializable

@Serializable
data class OnboardUserResponseDto(
    val userId: String,
    val knowledgePoints: Int,
    val hourglassCount: Int,
    val blueprintShards: Int,
    val tutorialCompleted: Boolean,
    /** v3.3 (ADR-014). Server cũ không gửi → mặc định INTRO. */
    val tutorialStep: String = "INTRO"
)