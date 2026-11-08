package com.project.linguacity.domain.model.player

/** Danh hiệu để hiển thị (UC_13): ghép danh mục (CORE) với những gì người chơi đã có. */
data class AchievementView(
    val code: String,
    val name: String,
    val description: String?,
    val tier: String,
    val hidden: Boolean,
    val earned: Boolean,
    val equipped: Boolean
) {
    /** Danh hiệu Ẩn chưa có thì che tên (BR-ACH-02). */
    val displayName: String get() = if (hidden && !earned) "???" else name
}

/** Thống kê học tập từ GET /users/me (cần mạng). */
data class PlayerStats(val collectedWords: Int, val streakDays: Int)

/** Kết quả bấm Xây (POST /buildings/{code}/build). */
sealed interface BuildOutcome {
    data object Started : BuildOutcome
    data class NotMet(val missingCollected: Int, val missingKnowledge: Int) : BuildOutcome
    data object Busy : BuildOutcome
    data object NeedsExam : BuildOutcome
    data object Offline : BuildOutcome
    data class Failed(val message: String) : BuildOutcome
}
