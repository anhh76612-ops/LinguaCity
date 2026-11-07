package com.project.linguacity.data.remote.content

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Path

/** UC_03 — system-design §10.4.1. */
interface ContentApi {

    @GET("api/v1/content/manifest")
    suspend fun manifest(@Header("X-Guest-UUID") guestUuid: String): ManifestDto

    @GET("api/v1/content/core")
    suspend fun core(@Header("X-Guest-UUID") guestUuid: String): CoreDto

    @GET("api/v1/content/packs/{buildingCode}/{level}")
    suspend fun pack(
        @Header("X-Guest-UUID") guestUuid: String,
        @Path("buildingCode") buildingCode: String,
        @Path("level") level: Int
    ): PackDto
}

@Serializable
data class PackRefDto(val code: String, val buildingCode: String? = null, val level: Int? = null, val version: Int)

@Serializable
data class ManifestDto(val serverTime: String, val packs: List<PackRefDto>)

@Serializable
data class ThemeDto(val id: Long, val code: String, val name: String, val description: String? = null)

@Serializable
data class BuildingDto(
    val id: Long, val code: String, val name: String, val maxLevel: Int, val sortOrder: Int,
    val themeCodes: List<String> = emptyList()
)

@Serializable
data class BuildingLevelDto(
    val buildingCode: String, val level: Int, val knowledgeCost: Int,
    val constructionTimeSeconds: Long, val requiredCollected: Int
)

@Serializable
data class BlueprintDto(val id: Long, val code: String, val buildingCode: String, val targetLevel: Int)

@Serializable
data class CoreDto(
    val code: String,
    val version: Int,
    val themes: List<ThemeDto> = emptyList(),
    val buildings: List<BuildingDto> = emptyList(),
    val buildingLevels: List<BuildingLevelDto> = emptyList(),
    val blueprints: List<BlueprintDto> = emptyList()
    // achievements / cosmetics: lưu vào Room từ Room v4/v5 (M4, M8) — tạm bỏ qua nhờ ignoreUnknownKeys.
)

@Serializable
data class VocabularyDto(
    val id: Long, val word: String, val meaning: String, val wordType: String, val ipa: String? = null,
    val examples: List<String> = emptyList(), val imageUrl: String? = null, val themeCode: String,
    val level: Int, val difficultyRank: String
)

/** Không có answer / acceptedAnswers / explanation — server không bao giờ gửi (NFR-01). */
@Serializable
data class QuestionDto(
    val id: Long, val contentType: String, val skill: String, val questionType: String, val tier: Int,
    val questionText: String? = null, val audioUrl: String? = null, val metadata: JsonElement? = null
)

@Serializable
data class QuestionVocabularyDto(val questionId: Long, val vocabularyId: Long, val relationType: String)

@Serializable
data class ExamRequirementDto(val requiredCardCount: Int, val requiredKnowledge: Int, val requiredBlueprintShards: Int)

@Serializable
data class ExamDto(
    val id: Long, val code: String, val buildingCode: String, val targetLevel: Int,
    val blueprintCode: String? = null, val questionCount: Int, val requirement: ExamRequirementDto,
    val questionIds: List<Long> = emptyList()
)

@Serializable
data class PackDto(
    val code: String,
    val version: Int,
    val vocabularies: List<VocabularyDto> = emptyList(),
    val questions: List<QuestionDto> = emptyList(),
    val questionVocabularies: List<QuestionVocabularyDto> = emptyList(),
    val exams: List<ExamDto> = emptyList()
)
