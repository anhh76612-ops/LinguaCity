package com.project.linguacity.data.remote.progression

import com.project.linguacity.data.remote.learning.QuestionViewDto
import com.project.linguacity.data.remote.learning.ResourcesDto
import com.project.linguacity.data.remote.learning.SessionDto
import kotlinx.serialization.Serializable
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

/** Thi, nhiệm vụ, luyện tập, sự kiện (ADR-015, system-design §11). */
interface ProgressionApi {

    @GET("api/v1/exams")
    suspend fun exams(
        @Header("X-Guest-UUID") guest: String,
        @Query("building") building: String
    ): ExamListDto

    @POST("api/v1/exams/{code}/start")
    suspend fun startExam(
        @Header("X-Guest-UUID") guest: String,
        @Path("code") code: String
    ): AttemptDto

    @GET("api/v1/exam-attempts/{id}")
    suspend fun attempt(@Header("X-Guest-UUID") guest: String, @Path("id") id: Long): AttemptDto

    @POST("api/v1/exam-attempts/{id}/submit")
    suspend fun submit(
        @Header("X-Guest-UUID") guest: String,
        @Path("id") id: Long,
        @Body body: SubmitRequestDto
    ): ExamResultDto

    @GET("api/v1/quests")
    suspend fun quests(@Header("X-Guest-UUID") guest: String): QuestsDto

    @POST("api/v1/quests/{code}/claim")
    suspend fun claim(
        @Header("X-Guest-UUID") guest: String,
        @Path("code") code: String
    ): ClaimResultDto

    @GET("api/v1/learning/practice/status")
    suspend fun practiceStatus(@Header("X-Guest-UUID") guest: String): PracticeStatusDto

    @POST("api/v1/learning/practice")
    suspend fun startPractice(
        @Header("X-Guest-UUID") guest: String,
        @Body body: PracticeRequestDto
    ): SessionDto

    @POST("api/v1/events/{id}/start")
    suspend fun startEvent(
        @Header("X-Guest-UUID") guest: String,
        @Path("id") id: Long
    ): SessionDto
}

// ---------- Thi ----------

@Serializable
data class RequirementDto(
    val requiredCardCount: Int,
    val requiredKnowledge: Int,
    val requiredBlueprintShards: Int,
    val requiredBuildingCode: String? = null,
    val requiredBuildingLevel: Int = 0
)

@Serializable
data class ExamProgressDto(
    val collected: Int,
    val knowledgePoints: Int,
    val blueprintShards: Int,
    val requiredBuildingLevel: Int
)

@Serializable
data class MissingDto(
    val collected: Int = 0,
    val knowledge: Int = 0,
    val shards: Int = 0,
    val building: Boolean = false
)

@Serializable
data class ExamStatusDto(
    val code: String,
    val buildingCode: String,
    val targetLevel: Int,
    val questionCount: Int,
    val passPercent: Int,
    val requirement: RequirementDto,
    val progress: ExamProgressDto,
    val missing: MissingDto,
    val available: Boolean,
    val passed: Boolean,
    val activeAttemptId: Long? = null
)

@Serializable
data class ExamListDto(val exams: List<ExamStatusDto> = emptyList())

@Serializable
data class AttemptQuestionDto(val order: Int, val questionId: Long, val question: QuestionViewDto)

@Serializable
data class AttemptDto(
    val attemptId: Long,
    val examCode: String,
    val status: String,
    val passPercent: Int,
    val questions: List<AttemptQuestionDto> = emptyList(),
    val profile: ResourcesDto? = null
)

@Serializable
data class AnswerDto(val order: Int, val answer: String)

@Serializable
data class SubmitRequestDto(val answers: List<AnswerDto>)

@Serializable
data class ResultItemDto(
    val order: Int,
    val questionText: String? = null,
    val sentence: String? = null,
    val given: String? = null,
    val correctAnswer: String,
    val isCorrect: Boolean,
    val explanation: String? = null
)

@Serializable
data class BlueprintDto(
    val code: String,
    val buildingCode: String? = null,
    val targetLevel: Int,
    val quantity: Int
)

@Serializable
data class ExamResultDto(
    val attemptId: Long,
    val status: String,
    val correct: Int,
    val total: Int,
    val scorePercent: Int,
    val passPercent: Int,
    val items: List<ResultItemDto> = emptyList(),
    val blueprint: BlueprintDto? = null,
    val profile: ResourcesDto? = null
)

// ---------- Nhiệm vụ ----------

@Serializable
data class QuestDto(
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
)

@Serializable
data class StreakDto(
    val days: Int = 0,
    val best: Int = 0,
    val todayCounted: Boolean = false,
    val lessonDone: Boolean = false,
    val questDone: Boolean = false
)

@Serializable
data class QuestsDto(
    val main: List<QuestDto> = emptyList(),
    val daily: List<QuestDto> = emptyList(),
    val dailyBonus: QuestDto? = null,
    val streak: StreakDto = StreakDto(),
    val resetsAt: String? = null
)

@Serializable
data class ClaimResultDto(
    val quest: QuestDto,
    val profile: ResourcesDto,
    val newAchievements: List<String> = emptyList()
)

// ---------- Luyện tập ----------

@Serializable
data class PracticeUsageDto(val used: Int, val limit: Int)

@Serializable
data class ThemeProgressDto(val code: String, val name: String, val collected: Int, val total: Int)

@Serializable
data class PracticeStatusDto(
    val review: PracticeUsageDto,
    val mixed: PracticeUsageDto,
    val newWords: PracticeUsageDto,
    val themes: List<ThemeProgressDto> = emptyList(),
    val resetsAt: String? = null
)

@Serializable
data class PracticeRequestDto(val mode: String, val themeCodes: List<String>, val wordCount: Int)
