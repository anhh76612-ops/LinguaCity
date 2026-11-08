package com.project.linguacity.data.repository

import com.project.linguacity.data.local.player.PlayerDao
import com.project.linguacity.data.local.player.UserAchievementEntity
import com.project.linguacity.data.local.player.UserVocabProgressEntity
import com.project.linguacity.data.local.preferences.GuestIdStore
import com.project.linguacity.data.local.user.UserProfileDao
import com.project.linguacity.data.mapper.toDomain
import com.project.linguacity.data.remote.IsoTime
import com.project.linguacity.data.remote.apiError
import com.project.linguacity.data.remote.learning.AnswerRequestDto
import com.project.linguacity.data.remote.learning.LearningApi
import com.project.linguacity.data.remote.learning.StartSessionRequestDto
import com.project.linguacity.data.remote.player.PlayerApi
import com.project.linguacity.domain.model.learning.AnswerFeedback
import com.project.linguacity.domain.model.learning.LearningException
import com.project.linguacity.domain.model.learning.LearningException.Kind
import com.project.linguacity.domain.model.learning.LessonResult
import com.project.linguacity.domain.model.learning.LessonSession
import com.project.linguacity.domain.model.learning.VocabProgress
import com.project.linguacity.domain.repository.LearningRepository
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import java.io.IOException
import javax.inject.Inject
import javax.inject.Singleton

/**
 * UC_05. Server chấm và quyết định mọi thứ; app chỉ GHI LẠI kết quả server trả về vào Room
 * (Mastery, sưu tầm, KP, bước tutorial) — không tự tính (FR-SYS-01).
 */
@Singleton
class LearningRepositoryImpl @Inject constructor(
    private val api: LearningApi,
    private val playerApi: PlayerApi,
    private val playerDao: PlayerDao,
    private val profiles: UserProfileDao,
    private val guestIdStore: GuestIdStore
) : LearningRepository {

    override suspend fun startLesson(buildingCode: String): LessonSession =
        call { api.start(guest(), StartSessionRequestDto(buildingCode)).toDomain() }

    override suspend fun startPlacement(): LessonSession = call {
        api.placement(guest()).toDomain()
    }

    override suspend fun session(id: String): LessonSession = call { api.get(
        guest(),
        id
    ).toDomain() }

    override suspend fun answer(
        sessionId: String,
        itemNo: Int,
        answer: String
    ): AnswerFeedback = call {
        val r = api.answer(guest(), sessionId, itemNo, AnswerRequestDto(answer))
        val before = playerDao.progress(r.vocabularyId)
        playerDao.upsertProgress(
            listOf(
                UserVocabProgressEntity(
                    vocabularyId = r.vocabularyId,
                    masteryScore = r.masteryAfter,
                    maxMastery = r.maxMastery,
                    collected = (before?.collected == true) || r.collectedNow,
                    lastReviewedAtMillis = System.currentTimeMillis()
                )
            )
        )
        r.toDomain()
    }

    override suspend fun complete(sessionId: String): LessonResult = call {
        val r = api.complete(guest(), sessionId)
        val id = guest()
        profiles.getById(id)?.let {
            profiles.upsert(
                it.copy(
                    knowledgePoints = r.profile.knowledgePoints,
                    hourglassCount = r.profile.hourglassCount,
                    blueprintShards = r.profile.blueprintShards,
                    tutorialStep = r.tutorialStep
                )
            )
        }
        val now = System.currentTimeMillis()
        playerDao.upsertEarned(r.newAchievements.map { UserAchievementEntity(it, now) })
        r.toDomain()
    }

    override suspend fun refreshProgress() {
        val dto = playerApi.progress(guest())
        playerDao.upsertProgress(dto.items.map {
            UserVocabProgressEntity(it.vocabularyId, it.masteryScore, it.maxMastery, it.collected,
                IsoTime.parseMillis(it.lastReviewedAt))
        })
    }

    override fun observeProgress(): Flow<Map<Long, VocabProgress>> =
        playerDao.observeProgress().map { rows ->
            rows.associate {
                it.vocabularyId to VocabProgress(
                    it.vocabularyId,
                    it.masteryScore,
                    it.maxMastery,
                    it.collected
                )
            }
        }

    private suspend fun guest() = guestIdStore.getOrCreateGuestUuid()

    private suspend fun <T> call(block: suspend () -> T): T = try {
        block()
    } catch (e: CancellationException) {
        throw e
    } catch (e: LearningException) {
        throw e
    } catch (e: IOException) {
        throw LearningException(Kind.OFFLINE, e.message)
    } catch (e: Exception) {
        val error = e.apiError()
        val kind = when (error?.code) {
            "SESSION_EXPIRED" -> Kind.EXPIRED
            "ALREADY_ANSWERED" -> Kind.ALREADY_ANSWERED
            "SESSION_CLOSED" -> Kind.CLOSED
            "INCOMPLETE" -> Kind.INCOMPLETE
            "NO_CONTENT" -> Kind.NO_CONTENT
            "INVALID_STEP" -> Kind.INVALID_STEP
            else -> Kind.OTHER
        }
        throw LearningException(kind, error?.message ?: e.message)
    }
}
