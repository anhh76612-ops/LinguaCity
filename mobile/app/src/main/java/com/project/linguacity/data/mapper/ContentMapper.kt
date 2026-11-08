package com.project.linguacity.data.mapper

import com.project.linguacity.data.local.content.BlueprintEntity
import com.project.linguacity.data.local.content.BuildingEntity
import com.project.linguacity.data.local.content.BuildingLevelEntity
import com.project.linguacity.data.local.content.BuildingThemeEntity
import com.project.linguacity.data.local.content.ExamEntity
import com.project.linguacity.data.local.content.ExamQuestionEntity
import com.project.linguacity.data.local.content.ExamRequirementEntity
import com.project.linguacity.data.local.content.QuestionEntity
import com.project.linguacity.data.local.content.QuestionVocabularyEntity
import com.project.linguacity.data.local.content.ThemeEntity
import com.project.linguacity.data.local.content.VocabularyEntity
import com.project.linguacity.data.remote.content.CoreDto
import com.project.linguacity.data.remote.content.PackDto
import com.project.linguacity.data.remote.content.PackRefDto
import com.project.linguacity.domain.model.content.BuildingLevelInfo
import com.project.linguacity.domain.model.content.PackRef
import com.project.linguacity.domain.model.content.Vocabulary

/*
 * DTO (mạng) → Entity (Room) → Domain. Tách khỏi Repository để test được trên JVM
 * (ContentMapperTest)
 * — đúng gợi ý M-05 của handover VS2.
 */

/** Toàn bộ dòng Room của gói CORE. */
data class CoreRows(
    val themes: List<ThemeEntity>,
    val buildings: List<BuildingEntity>,
    val buildingThemes: List<BuildingThemeEntity>,
    val buildingLevels: List<BuildingLevelEntity>,
    val blueprints: List<BlueprintEntity>
)

/** Toàn bộ dòng Room của một gói (công trình, level). */
data class PackRows(
    val vocabularies: List<VocabularyEntity>,
    val questions: List<QuestionEntity>,
    val questionVocabularies: List<QuestionVocabularyEntity>,
    val exams: List<ExamEntity>,
    val examRequirements: List<ExamRequirementEntity>,
    val examQuestions: List<ExamQuestionEntity>
)

fun PackRefDto.toDomain() = PackRef(code, buildingCode, level, version)

fun CoreDto.toRows() = CoreRows(
    themes = themes.map { ThemeEntity(it.id, it.code, it.name, it.description) },
    buildings = buildings.map {
        BuildingEntity(it.id, it.code, it.name, it.maxLevel, it.sortOrder)
    },
    buildingThemes = buildings.flatMap { b -> b.themeCodes.map {
        BuildingThemeEntity(b.code, it)
    } },
    buildingLevels = buildingLevels.map {
        BuildingLevelEntity(
            it.buildingCode,
            it.level,
            it.knowledgeCost,
            it.constructionTimeSeconds,
            it.requiredCollected
        )
    },
    blueprints = blueprints.map { BlueprintEntity(it.id, it.code, it.buildingCode, it.targetLevel) }
)

fun PackDto.toRows(): PackRows {
    val pack = code
    return PackRows(
        vocabularies = vocabularies.map {
            VocabularyEntity(
                id = it.id,
                word = it.word,
                meaning = it.meaning,
                wordType = it.wordType,
                ipa = it.ipa,
                examples = it.examples,
                imageUrl = it.imageUrl,
                themeCode = it.themeCode,
                level = it.level,
                difficultyRank = it.difficultyRank, packCode = pack
            )
        },
        questions = questions.map {
            QuestionEntity(
                id = it.id,
                contentType = it.contentType,
                skill = it.skill,
                questionType = it.questionType,
                tier = it.tier, questionText = it.questionText, audioUrl = it.audioUrl,
                metadata = it.metadata?.toString(), packCode = pack
            )
        },
        questionVocabularies = questionVocabularies.map {
            QuestionVocabularyEntity(it.questionId, it.vocabularyId, it.relationType, pack)
        },
        exams = exams.map {
            ExamEntity(
                it.id,
                it.code,
                it.buildingCode,
                it.targetLevel,
                it.blueprintCode,
                it.questionCount,
                pack
            )
        },
        examRequirements = exams.map {
            ExamRequirementEntity(
                it.id, it.requirement.requiredCardCount, it.requirement.requiredKnowledge,
                it.requirement.requiredBlueprintShards, pack
            )
        },
        examQuestions = exams.flatMap { e -> e.questionIds.map {
            ExamQuestionEntity(e.id, it, pack)
        } }
    )
}

fun VocabularyEntity.toDomain() = Vocabulary(
    id,
    word,
    meaning,
    wordType,
    ipa,
    examples,
    themeCode,
    level,
    difficultyRank
)

fun BuildingLevelEntity.toDomain() =
    BuildingLevelInfo(
        buildingCode,
        level,
        knowledgeCost,
        constructionTimeSeconds,
        requiredCollected
    )
