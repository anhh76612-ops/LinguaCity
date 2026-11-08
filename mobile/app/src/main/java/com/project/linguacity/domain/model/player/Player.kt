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

    /**
     * Danh hiệu chuỗi bị thu hồi khi đứt chuỗi (BR-STREAK-03). Room v5 chưa lưu cột revocable
     * nên nhận theo tiền tố mã của V007 (STREAK_3/10/20/30).
     */
    val revocable: Boolean get() = code.startsWith("STREAK_")
}

/** Thống kê học tập từ GET /users/me (cần mạng). */
data class PlayerStats(val collectedWords: Int, val streakDays: Int)

/** Kết quả bấm Xây (POST /buildings/{code}/build). */
sealed interface BuildOutcome {
    data object Started : BuildOutcome
    data class NotMet(
        val missingCollected: Int,
        val missingKnowledge: Int,
        val missingShards: Int = 0
    ) : BuildOutcome
    data object Busy : BuildOutcome
    data object NeedsExam : BuildOutcome
    /** Nâng cấp cần bản vẽ (thi đậu bài thi lên level, ADR-015 §3). */
    data object NeedsBlueprint : BuildOutcome
    data object MaxLevel : BuildOutcome
    data object Offline : BuildOutcome
    data class Failed(val message: String) : BuildOutcome
}
