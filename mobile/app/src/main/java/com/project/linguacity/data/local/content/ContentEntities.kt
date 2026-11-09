package com.project.linguacity.data.local.content

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.Index

/*
 * Room v3 — bộ nhớ đệm chỉ đọc của nội dung tĩnh (system-design §10.7, ADR-012).
 * - Không khai báo khoá ngoại giữa các bảng tĩnh: toàn vẹn đã được PostgreSQL đảm bảo (§6.1.1).
 * - Các bảng thuộc một gói có cột `packCode` (vd. "HOUSING:1") để khi gói đổi version thì xoá sạch
 *   dòng cũ của gói rồi ghi lại (BR-CONTENT-05) — từ/câu bị gỡ trên server cũng biến mất ở máy.
 * - Câu hỏi KHÔNG có answer / acceptedAnswers / explanation (NFR-01).
 */

@Entity(tableName = "themes", primaryKeys = ["id"])
data class ThemeEntity(
    val id: Long,
    val code: String,
    val name: String,
    val description: String?
)

@Entity(
    tableName = "buildings",
    primaryKeys = ["id"],
    indices = [Index(value = ["code"], unique = true)]
)
data class BuildingEntity(
    val id: Long,
    val code: String,
    val name: String,
    val maxLevel: Int,
    val sortOrder: Int
)

@Entity(tableName = "building_themes", primaryKeys = ["buildingCode", "themeCode"])
data class BuildingThemeEntity(
    val buildingCode: String,
    val themeCode: String
)

@Entity(tableName = "building_levels", primaryKeys = ["buildingCode", "level"])
data class BuildingLevelEntity(
    val buildingCode: String,
    val level: Int,
    val knowledgeCost: Int,
    val constructionTimeSeconds: Long,
    val requiredCollected: Int
)

@Entity(tableName = "blueprints", primaryKeys = ["id"])
data class BlueprintEntity(
    val id: Long,
    val code: String,
    val buildingCode: String,
    val targetLevel: Int
)

@Entity(tableName = "vocabularies", primaryKeys = ["id"], indices = [Index("packCode")])
data class VocabularyEntity(
    val id: Long,
    val word: String,
    val meaning: String,
    val wordType: String,
    val ipa: String?,
    val examples: List<String>,
    val imageUrl: String?,
    val themeCode: String,
    val level: Int,
    val difficultyRank: String,
    val packCode: String,
    @ColumnInfo(defaultValue = "[]")
    val collocations: List<String> = emptyList(),
    val explanation: String? = null,
    val iconKey: String? = null
)

@Entity(tableName = "questions", primaryKeys = ["id"], indices = [Index("packCode")])
data class QuestionEntity(
    val id: Long,
    val contentType: String,
    val skill: String,
    val questionType: String,
    val tier: Int,
    val questionText: String?,
    val audioUrl: String?,
    /** JSON thô (options / sentence / hint) — §6.2: metadata lưu dạng String. */
    val metadata: String?,
    val packCode: String
)

@Entity(
    tableName = "question_vocabularies",
    primaryKeys = ["questionId", "vocabularyId"],
    indices = [Index("vocabularyId"), Index("packCode")]
)
data class QuestionVocabularyEntity(
    val questionId: Long,
    val vocabularyId: Long,
    val relationType: String,
    val packCode: String
)

@Entity(tableName = "exams", primaryKeys = ["id"], indices = [Index("packCode")])
data class ExamEntity(
    val id: Long,
    val code: String,
    val buildingCode: String,
    val targetLevel: Int,
    val blueprintCode: String?,
    val questionCount: Int,
    val packCode: String
)

@Entity(tableName = "exam_requirements", primaryKeys = ["examId"], indices = [Index("packCode")])
data class ExamRequirementEntity(
    val examId: Long,
    val requiredCardCount: Int,
    val requiredKnowledge: Int,
    val requiredBlueprintShards: Int,
    val packCode: String
)

@Entity(
    tableName = "exam_questions",
    primaryKeys = ["examId", "questionId"],
    indices = [Index("packCode")]
)
data class ExamQuestionEntity(
    val examId: Long,
    val questionId: Long,
    val packCode: String
)

/**
 * Version của từng gói đã tải về máy (ADR-012). Có dòng "CORE" nghĩa là app đã vào game được
 * offline.
 */
@Entity(tableName = "content_pack_state", primaryKeys = ["code"])
data class ContentPackStateEntity(
    val code: String,
    val version: Int,
    val downloadedAtMillis: Long
)
