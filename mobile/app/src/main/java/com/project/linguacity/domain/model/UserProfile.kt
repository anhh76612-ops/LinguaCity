package com.project.linguacity.domain.model

data class UserProfile(
    val id: String,
    val knowledgePoints: Int,
    val hourglassCount: Int,
    val blueprintShards: Int,
    val tutorialCompleted: Boolean,
    val tutorialStep: String = "INTRO",
    val equippedTitle: String? = null,
    /** ADR-017 */
    val bricks: Int = 0,
    val wood: Int = 0
)
