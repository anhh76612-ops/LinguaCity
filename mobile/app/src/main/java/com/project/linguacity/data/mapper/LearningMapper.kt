package com.project.linguacity.data.mapper

import com.project.linguacity.data.remote.IsoTime
import com.project.linguacity.data.remote.city.BuildingStateDto
import com.project.linguacity.data.local.player.UserBuildingEntity
import com.project.linguacity.data.remote.learning.AnswerResultDto
import com.project.linguacity.data.remote.learning.CompleteResultDto
import com.project.linguacity.data.remote.learning.QuestionViewDto
import com.project.linguacity.data.remote.learning.SessionDto
import com.project.linguacity.domain.model.learning.AnswerFeedback
import com.project.linguacity.domain.model.learning.LessonItem
import com.project.linguacity.domain.model.learning.LessonQuestion
import com.project.linguacity.domain.model.learning.LessonResult
import com.project.linguacity.domain.model.learning.LessonSession
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonPrimitive

fun SessionDto.toDomain() = LessonSession(
    id = sessionId,
    type = type,
    placement = type == "PLACEMENT",
    buildingCode = buildingCode,
    vocabLevel = vocabLevel,
    status = status,
    expiresAtMillis = IsoTime.parseMillis(expiresAt),
    totalCount = totalCount,
    correctCount = correctCount,
    items = items.map {
        LessonItem(it.itemNo, it.vocabularyId, it.answered, it.isCorrect, it.question.toDomain())
    }
)

fun QuestionViewDto.toDomain(): LessonQuestion {
    val meta = metadata
    return LessonQuestion(
        id = id,
        skill = skill,
        multipleChoice = questionType == "MULT_CHOICE",
        tier = tier,
        text = questionText.orEmpty(),
        options = meta?.get("options")?.jsonArray?.map { it.jsonPrimitive.content } ?: emptyList(),
        sentence = meta?.get("sentence")?.jsonPrimitive?.contentOrNull,
        hint = meta?.get("hint")?.jsonPrimitive?.contentOrNull
    )
}

fun AnswerResultDto.toDomain() =
    AnswerFeedback(
        itemNo,
        isCorrect,
        correctAnswer,
        explanation,
        masteryAfter,
        maxMastery,
        collectedNow,
        streak
    )

fun CompleteResultDto.toDomain() = LessonResult(
    type = type,
    placement = type == "PLACEMENT",
    correct = correct, total = total, kpAwarded = kpAwarded, kpBase = kpBase, kpBonus = kpBonus,
    dailySessionIndex = dailySessionIndex, dailyMultiplier = dailyMultiplier,
    collected = collection?.collected ?: 0,
    collectionTotal = collection?.total ?: 0,
    collectionLevel = collection?.level ?: 0,
    newAchievements = newAchievements,
    knowledgePoints = profile.knowledgePoints,
    tutorialStep = tutorialStep,
    shardsAwarded = shardsAwarded,
    eventResolved = eventResolved
)

fun BuildingStateDto.toEntity() = UserBuildingEntity(
    buildingCode = code,
    buildingId = buildingId,
    currentLevel = currentLevel,
    targetLevel = targetLevel,
    maxLevel = maxLevel, status = status,
    startedAtMillis = IsoTime.parseMillis(startedAt), finishAtMillis = IsoTime.parseMillis(finishAt)
)
