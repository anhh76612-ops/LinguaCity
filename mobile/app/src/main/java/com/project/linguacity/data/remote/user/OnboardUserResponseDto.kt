package com.project.linguacity.data.remote.user

import kotlinx.serialization.Serializable

@Serializable
data class OnboardUserResponseDto(
    val userId: String,
    val knowledgePoints: Int,
    val hourglassCount: Int,
    val blueprintShards: Int
)