package com.project.linguacity.domain.model.progression

import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.learning.LessonQuestion

/** Trạng thái một bài thi lên level của công trình (SCR-10, system-design §11.2). */
data class ExamStatus(
    val code: String,
    val buildingCode: BuildingCode?,
    val targetLevel: Int,
    val questionCount: Int,
    val passPercent: Int,
    val requiredWords: Int,
    val requiredKnowledge: Int,
    val requiredShards: Int,
    val requiredBuilding: BuildingCode?,
    val requiredBuildingLevel: Int,
    val collected: Int,
    val knowledgePoints: Int,
    val shards: Int,
    val requiredBuildingLevelNow: Int,
    val missingWords: Int,
    val missingKnowledge: Int,
    val missingShards: Int,
    val missingBuilding: Boolean,
    val available: Boolean,
    val passed: Boolean,
    val activeAttemptId: Long?
)

/** Một câu trong đề đã chốt (không có đáp án — NFR-01). */
data class ExamQuestion(val order: Int, val question: LessonQuestion)

data class ExamAttempt(
    val id: Long,
    val examCode: String,
    val status: String,
    val passPercent: Int,
    val questions: List<ExamQuestion>
)

data class ExamResultItem(
    val order: Int,
    val questionText: String,
    val sentence: String?,
    val given: String?,
    val correctAnswer: String,
    val isCorrect: Boolean,
    val explanation: String?
)

data class ExamResult(
    val passed: Boolean,
    val correct: Int,
    val total: Int,
    val scorePercent: Int,
    val passPercent: Int,
    val items: List<ExamResultItem>,
    val blueprintTargetLevel: Int?
)

/** Nhiệm vụ (SCR-23, system-design §11.4). */
data class Quest(
    val code: String,
    val kind: String,
    val title: String,
    val description: String,
    val progress: Int,
    val goal: Int,
    val completed: Boolean,
    val claimed: Boolean,
    val rewardKp: Int,
    val rewardShards: Int
) {
    val claimable: Boolean get() = completed && !claimed
}

data class StreakStatus(
    val days: Int,
    val best: Int,
    val todayCounted: Boolean,
    val lessonDone: Boolean,
    val questDone: Boolean
) {
    companion object {
        val NONE = StreakStatus(0, 0, todayCounted = false, lessonDone = false, questDone = false)
    }
}

data class QuestsOverview(
    val main: List<Quest>,
    val daily: List<Quest>,
    val dailyBonus: Quest?,
    val streak: StreakStatus,
    val resetsAtMillis: Long?
)

/** Luyện tập (SCR-24, system-design §11.6). */
data class PracticeUsage(val used: Int, val limit: Int) {
    val left: Int get() = (limit - used).coerceAtLeast(0)
}

data class ThemeProgress(val code: String, val name: String, val collected: Int, val total: Int)

data class PracticeStatus(
    val review: PracticeUsage,
    val mixed: PracticeUsage,
    val newWords: PracticeUsage,
    val themes: List<ThemeProgress>,
    val resetsAtMillis: Long?
)

enum class PracticeMode { REVIEW, MIXED }

/** Lỗi nghiệp vụ của thi / nhiệm vụ / luyện tập — ViewModel đổi thành câu chữ cho người chơi. */
class ProgressionException(
    val kind: Kind,
    message: String? = null,
    val details: Map<String, Int> = emptyMap()
) : Exception(message) {

    enum class Kind {
        OFFLINE,
        REQUIREMENTS_NOT_MET,
        ALREADY_PASSED,
        ATTEMPT_CLOSED,
        INCOMPLETE,
        NOT_COMPLETED,
        ALREADY_CLAIMED,
        DAILY_LIMIT,
        NO_CONTENT,
        NOT_FOUND,
        OTHER
    }
}
