package com.project.linguacity.domain.model.learning

/** Phiên học / bài kiểm tra trình độ (ADR-013, ADR-014). Câu hỏi KHÔNG có đáp án. */
data class LessonSession(
    val id: String,
    /** LEARNING | PLACEMENT | PRACTICE_REVIEW | PRACTICE_MIXED | EVENT (ADR-015). */
    val type: String,
    val placement: Boolean,
    /** null với luyện tập và sự kiện (không gắn công trình). */
    val buildingCode: String?,
    val vocabLevel: Int,
    val status: String,
    val expiresAtMillis: Long?,
    val totalCount: Int,
    val correctCount: Int,
    val items: List<LessonItem>
) {
    val isActive: Boolean get() = status == "ACTIVE"

    /** Câu đầu tiên chưa nộp; bằng [items].size nếu đã nộp hết. */
    val firstOpenIndex: Int get() = items.indexOfFirst { !it.answered }.let {
        if (it < 0) items.size else it
    }
}

data class LessonItem(
    val itemNo: Int,
    val vocabularyId: Long,
    val answered: Boolean,
    val isCorrect: Boolean?,
    val question: LessonQuestion
)

data class LessonQuestion(
    val id: Long,
    val skill: String,
    val multipleChoice: Boolean,
    val tier: Int,
    val text: String,
    val options: List<String>,
    /** Câu có chỗ trống "___" (điền từ). */
    val sentence: String?,
    /** Gợi ý chữ cái, vd "r _ _ t" (tier 2). */
    val hint: String?
)

data class AnswerFeedback(
    val itemNo: Int,
    val isCorrect: Boolean,
    val correctAnswer: String,
    val explanation: String?,
    val masteryAfter: Int,
    val maxMastery: Int,
    val collectedNow: Boolean,
    val streak: Int
)

data class LessonResult(
    val type: String,
    val placement: Boolean,
    val correct: Int,
    val total: Int,
    val kpAwarded: Int,
    val kpBase: Int?,
    val kpBonus: Int?,
    val dailySessionIndex: Int?,
    val dailyMultiplier: Double?,
    val collected: Int,
    val collectionTotal: Int,
    val collectionLevel: Int,
    val newAchievements: List<String>,
    val knowledgePoints: Int,
    val tutorialStep: String,
    /** Sự kiện thành phố: mảnh nhận được và sự kiện đã được giải chưa. */
    val shardsAwarded: Int? = null,
    val eventResolved: Boolean? = null
) {
    val isEvent: Boolean get() = type == "EVENT"
    val isPractice: Boolean get() = type.startsWith("PRACTICE")
}

data class VocabProgress(
    val vocabularyId: Long,
    val mastery: Int,
    val maxMastery: Int,
    val collected: Boolean,
    val firstSeenAtMillis: Long? = null,
    val lastCorrectAtMillis: Long? = null
) {
    val seen: Boolean get() = firstSeenAtMillis != null

    /** Thẻ "sắp quên": quá [staleDays] ngày kể từ lần đúng gần nhất (hoặc lần đầu gặp nếu chưa từng đúng). */
    fun isStale(nowMillis: Long, staleDays: Int = STALE_DAYS): Boolean {
        val anchor = lastCorrectAtMillis ?: firstSeenAtMillis ?: return false
        return nowMillis - anchor > staleDays * MILLIS_PER_DAY
    }
}

const val STALE_DAYS = 7
private const val MILLIS_PER_DAY = 24L * 60 * 60 * 1000

/** Lỗi nghiệp vụ của phiên học — ViewModel quyết định hiện gì cho từng loại. */
class LearningException(val kind: Kind, message: String? = null) : Exception(message) {
    enum class Kind {
        OFFLINE,
        EXPIRED,
        ALREADY_ANSWERED,
        CLOSED,
        INCOMPLETE,
        NO_CONTENT,
        DAILY_LIMIT,
        INVALID_STEP,
        OTHER
    }
}
