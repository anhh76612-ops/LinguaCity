package com.project.linguacity.data.repository

import com.project.linguacity.data.local.player.PlayerDao
import com.project.linguacity.data.local.player.UserAchievementEntity
import com.project.linguacity.data.local.preferences.GuestIdStore
import com.project.linguacity.data.local.user.UserProfileDao
import com.project.linguacity.data.mapper.toDomain
import com.project.linguacity.data.remote.IsoTime
import com.project.linguacity.data.remote.apiError
import com.project.linguacity.data.remote.learning.ResourcesDto
import com.project.linguacity.data.remote.progression.AnswerDto
import com.project.linguacity.data.remote.progression.AttemptDto
import com.project.linguacity.data.remote.progression.ExamResultDto
import com.project.linguacity.data.remote.progression.ExamStatusDto
import com.project.linguacity.data.remote.progression.PracticeUsageDto
import com.project.linguacity.data.remote.progression.ProgressionApi
import com.project.linguacity.data.remote.progression.QuestDto
import com.project.linguacity.data.remote.progression.SubmitRequestDto
import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.progression.ExamAttempt
import com.project.linguacity.domain.model.progression.ExamQuestion
import com.project.linguacity.domain.model.progression.ExamResult
import com.project.linguacity.domain.model.progression.ExamResultItem
import com.project.linguacity.domain.model.progression.ExamStatus
import com.project.linguacity.domain.model.progression.PracticeStatus
import com.project.linguacity.domain.model.progression.PracticeUsage
import com.project.linguacity.domain.model.progression.ProgressionException
import com.project.linguacity.domain.model.progression.ProgressionException.Kind
import com.project.linguacity.domain.model.progression.Quest
import com.project.linguacity.domain.model.progression.QuestsOverview
import com.project.linguacity.domain.model.progression.StreakStatus
import com.project.linguacity.domain.model.progression.ThemeProgress
import com.project.linguacity.domain.repository.ProgressionRepository
import kotlinx.coroutines.CancellationException
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import java.io.IOException
import javax.inject.Inject
import javax.inject.Singleton

/** Server quyết định mọi thứ; app chỉ ghi lại tài nguyên server trả về vào Room (FR-SYS-01). */
@Singleton
class ProgressionRepositoryImpl @Inject constructor(
    private val api: ProgressionApi,
    private val profiles: UserProfileDao,
    private val playerDao: PlayerDao,
    private val guestIdStore: GuestIdStore
) : ProgressionRepository {

    override suspend fun exams(building: BuildingCode): List<ExamStatus> = call {
        api.exams(guest(), building.name).exams.map { it.toDomain() }
    }

    override suspend fun startExam(code: String): ExamAttempt = call {
        val dto = api.startExam(guest(), code)
        dto.profile?.let { saveResources(it) }
        dto.toDomain()
    }

    override suspend fun attempt(id: Long): ExamAttempt = call {
        api.attempt(guest(), id).toDomain()
    }

    override suspend fun submit(attemptId: Long, answers: Map<Int, String>): ExamResult = call {
        val body = SubmitRequestDto(answers.map { (order, answer) -> AnswerDto(order, answer) })
        val dto = api.submit(guest(), attemptId, body)
        dto.profile?.let { saveResources(it) }
        dto.toDomain()
    }

    override suspend fun quests(): QuestsOverview = call {
        val dto = api.quests(guest())
        QuestsOverview(
            main = dto.main.map { it.toDomain() },
            daily = dto.daily.map { it.toDomain() },
            dailyBonus = dto.dailyBonus?.toDomain(),
            streak = StreakStatus(
                dto.streak.days,
                dto.streak.best,
                dto.streak.todayCounted,
                dto.streak.lessonDone,
                dto.streak.questDone
            ),
            resetsAtMillis = IsoTime.parseMillis(dto.resetsAt)
        )
    }

    override suspend fun claim(code: String) {
        call {
            val result = api.claim(guest(), code)
            saveResources(result.profile)
            val now = System.currentTimeMillis()
            playerDao.upsertEarned(result.newAchievements.map { UserAchievementEntity(it, now) })
        }
    }

    override suspend fun practiceStatus(): PracticeStatus = call {
        val dto = api.practiceStatus(guest())
        PracticeStatus(
            review = dto.review.toDomain(),
            mixed = dto.mixed.toDomain(),
            newWords = dto.newWords.toDomain(),
            themes = dto.themes.map { ThemeProgress(it.code, it.name, it.collected, it.total) },
            resetsAtMillis = IsoTime.parseMillis(dto.resetsAt)
        )
    }

    private suspend fun saveResources(resources: ResourcesDto) {
        profiles.getById(guest())?.let {
            profiles.upsert(
                it.copy(
                    knowledgePoints = resources.knowledgePoints,
                    hourglassCount = resources.hourglassCount,
                    blueprintShards = resources.blueprintShards
                )
            )
        }
    }

    private suspend fun guest() = guestIdStore.getOrCreateGuestUuid()

    private suspend fun <T> call(block: suspend () -> T): T = try {
        block()
    } catch (e: CancellationException) {
        throw e
    } catch (e: ProgressionException) {
        throw e
    } catch (e: IOException) {
        throw ProgressionException(Kind.OFFLINE, e.message)
    } catch (e: Exception) {
        throw toProgressionException(e)
    }

    private fun toProgressionException(e: Exception): ProgressionException {
        val error = e.apiError()
        val kind = when (error?.code) {
            "REQUIREMENTS_NOT_MET" -> Kind.REQUIREMENTS_NOT_MET
            "ALREADY_PASSED" -> Kind.ALREADY_PASSED
            "ATTEMPT_CLOSED" -> Kind.ATTEMPT_CLOSED
            "INCOMPLETE" -> Kind.INCOMPLETE
            "NOT_COMPLETED" -> Kind.NOT_COMPLETED
            "ALREADY_CLAIMED" -> Kind.ALREADY_CLAIMED
            "DAILY_LIMIT" -> Kind.DAILY_LIMIT
            "NO_CONTENT" -> Kind.NO_CONTENT
            "EXAM_NOT_FOUND", "ATTEMPT_NOT_FOUND", "QUEST_NOT_FOUND" -> Kind.NOT_FOUND
            else -> Kind.OTHER
        }
        // REQUIREMENTS_NOT_MET của bài thi để số thiếu trong details.missing
        val missing = runCatching { error?.details?.get("missing")?.jsonObject }.getOrNull()
        val details = missing?.mapNotNull { (key, value) ->
            runCatching { value.jsonPrimitive.intOrNull }.getOrNull()?.let { key to it }
        }?.toMap() ?: emptyMap()
        return ProgressionException(kind, error?.message ?: e.message, details)
    }
}

private fun ExamStatusDto.toDomain() = ExamStatus(
    code = code,
    buildingCode = BuildingCode.entries.firstOrNull { it.name == buildingCode },
    targetLevel = targetLevel,
    questionCount = questionCount,
    passPercent = passPercent,
    requiredWords = requirement.requiredCardCount,
    requiredKnowledge = requirement.requiredKnowledge,
    requiredShards = requirement.requiredBlueprintShards,
    requiredBuilding = BuildingCode.entries.firstOrNull {
        it.name == requirement.requiredBuildingCode
    },
    requiredBuildingLevel = requirement.requiredBuildingLevel,
    collected = progress.collected,
    knowledgePoints = progress.knowledgePoints,
    shards = progress.blueprintShards,
    requiredBuildingLevelNow = progress.requiredBuildingLevel,
    missingWords = missing.collected,
    missingKnowledge = missing.knowledge,
    missingShards = missing.shards,
    missingBuilding = missing.building,
    available = available,
    passed = passed,
    activeAttemptId = activeAttemptId
)

private fun AttemptDto.toDomain() = ExamAttempt(
    id = attemptId,
    examCode = examCode,
    status = status,
    passPercent = passPercent,
    questions = questions.map { ExamQuestion(it.order, it.question.toDomain()) }
)

private fun ExamResultDto.toDomain() = ExamResult(
    passed = status == "PASSED",
    correct = correct,
    total = total,
    scorePercent = scorePercent,
    passPercent = passPercent,
    items = items.map {
        ExamResultItem(
            order = it.order,
            questionText = it.questionText.orEmpty(),
            sentence = it.sentence,
            given = it.given,
            correctAnswer = it.correctAnswer,
            isCorrect = it.isCorrect,
            explanation = it.explanation
        )
    },
    blueprintTargetLevel = blueprint?.targetLevel
)

private fun QuestDto.toDomain() = Quest(
    code = code,
    kind = kind,
    title = title,
    description = description,
    progress = progress,
    goal = goal,
    completed = completed,
    claimed = claimed,
    rewardKp = rewardKp,
    rewardShards = rewardShards
)

private fun PracticeUsageDto.toDomain() = PracticeUsage(used, limit)
