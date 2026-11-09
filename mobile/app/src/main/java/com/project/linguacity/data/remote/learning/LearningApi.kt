package com.project.linguacity.data.remote.learning

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path

/** UC_05 + bài kiểm tra trình độ (system-design §10.4.2, §10.4.3). */
interface LearningApi {

    @POST("api/v1/learning/sessions")
    suspend fun start(
        @Header("X-Guest-UUID") guest: String,
        @Body body: StartSessionRequestDto
    ): SessionDto

    @GET("api/v1/learning/sessions/{id}")
    suspend fun get(@Header("X-Guest-UUID") guest: String, @Path("id") id: String): SessionDto

    @POST("api/v1/learning/sessions/{id}/items/{itemNo}/answer")
    suspend fun answer(
        @Header("X-Guest-UUID") guest: String,
        @Path("id") id: String,
        @Path("itemNo") itemNo: Int,
        @Body body: AnswerRequestDto
    ): AnswerResultDto

    /** S5: gợi ý của Bơ. */
    @POST("api/v1/learning/sessions/{id}/items/{itemNo}/hint")
    suspend fun hint(
        @Header("X-Guest-UUID") guest: String,
        @Path("id") id: String,
        @Path("itemNo") itemNo: Int
    ): HintDto

    @POST("api/v1/learning/sessions/{id}/complete")
    suspend fun complete(
        @Header("X-Guest-UUID") guest: String,
        @Path("id") id: String
    ): CompleteResultDto

    @POST("api/v1/tutorial/placement")
    suspend fun placement(@Header("X-Guest-UUID") guest: String): SessionDto
}

@Serializable
data class StartSessionRequestDto(val buildingCode: String)

@Serializable
data class AnswerRequestDto(val answer: String)

@Serializable
data class HintDto(
    val kind: String,
    val option: String? = null,
    val letter: String? = null,
    val meaning: String? = null
)

/** Câu hỏi để hiển thị — server KHÔNG gửi đáp án trước khi nộp (NFR-01). */
@Serializable
data class QuestionViewDto(
    val id: Long,
    val skill: String,
    val questionType: String,
    val tier: Int,
    val questionText: String? = null,
    val metadata: JsonObject? = null
)

@Serializable
data class ItemDto(
    val itemNo: Int,
    val vocabularyId: Long,
    val answered: Boolean,
    val isCorrect: Boolean? = null,
    val question: QuestionViewDto
)

@Serializable
data class SessionDto(
    val sessionId: String,
    val type: String,
    val buildingCode: String? = null,
    val vocabLevel: Int,
    val status: String,
    val startedAt: String,
    val expiresAt: String,
    val serverTime: String,
    val totalCount: Int,
    val correctCount: Int,
    val items: List<ItemDto>
)

@Serializable
data class AnswerResultDto(
    val itemNo: Int,
    val isCorrect: Boolean,
    val correctAnswer: String,
    val explanation: String? = null,
    val vocabularyId: Long,
    val masteryAfter: Int,
    val maxMastery: Int,
    val collectedNow: Boolean,
    val streak: Int
)

@Serializable
data class CollectionDto(
    val buildingCode: String,
    val level: Int,
    val collected: Int,
    val total: Int
)

@Serializable
data class ResourcesDto(val knowledgePoints: Int, val hourglassCount: Int, val blueprintShards: Int)

@Serializable
data class CompleteResultDto(
    val sessionId: String,
    val type: String,
    val correct: Int,
    val total: Int,
    val kpAwarded: Int,
    val kpBase: Int? = null,
    val kpBonus: Int? = null,
    val dailySessionIndex: Int? = null,
    val dailyMultiplier: Double? = null,
    val collection: CollectionDto? = null,
    val newAchievements: List<String> = emptyList(),
    val profile: ResourcesDto,
    val tutorialStep: String,
    val shardsAwarded: Int? = null,
    val eventResolved: Boolean? = null
)

@Serializable
data class ProgressItemDto(
    val vocabularyId: Long,
    val masteryScore: Int,
    val maxMastery: Int,
    val collected: Boolean,
    val firstSeenAt: String? = null,
    val lastReviewedAt: String? = null,
    val lastCorrectAt: String? = null
)

@Serializable
data class ProgressDto(val serverTime: String, val items: List<ProgressItemDto>)
