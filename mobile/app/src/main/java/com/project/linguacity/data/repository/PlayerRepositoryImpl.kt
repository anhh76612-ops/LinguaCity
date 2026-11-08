package com.project.linguacity.data.repository

import com.project.linguacity.data.local.player.PlayerDao
import com.project.linguacity.data.local.player.UserAchievementEntity
import com.project.linguacity.data.local.preferences.GuestIdStore
import com.project.linguacity.data.mapper.CosmeticJson
import com.project.linguacity.data.local.user.UserProfileDao
import com.project.linguacity.data.remote.IsoTime
import com.project.linguacity.data.remote.player.EquipRequestDto
import com.project.linguacity.data.remote.player.PlayerApi
import com.project.linguacity.data.remote.player.PlayerDto
import com.project.linguacity.data.remote.player.StepRequestDto
import com.project.linguacity.domain.model.UserProfile
import com.project.linguacity.domain.model.player.AchievementView
import com.project.linguacity.domain.model.player.PlayerStats
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import com.project.linguacity.domain.repository.PlayerRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.emitAll
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class PlayerRepositoryImpl @Inject constructor(
    private val api: PlayerApi,
    private val dao: PlayerDao,
    private val profiles: UserProfileDao,
    private val guestIdStore: GuestIdStore
) : PlayerRepository {

    private val _stats = MutableStateFlow<PlayerStats?>(null)
    override val stats: StateFlow<PlayerStats?> = _stats.asStateFlow()

    override fun observeProfile(): Flow<UserProfile?> = flow {
        emitAll(profiles.observeById(guestIdStore.getOrCreateGuestUuid()))
    }.map { e ->
        e?.let { UserProfile(it.id, it.knowledgePoints, it.hourglassCount, it.blueprintShards, it.tutorialCompleted,
            it.tutorialStep, it.equippedTitle) }
    }

    override fun observeAchievements(): Flow<List<AchievementView>> =
        combine(dao.observeAchievements(), dao.observeEarned(), observeProfile()) { catalog, earned, profile ->
            val have = earned.map { it.code }.toSet()
            catalog.map {
                AchievementView(it.code, it.name, it.description, it.tier, it.hidden, it.code in have,
                    it.code == profile?.equippedTitle)
            }
        }

    override suspend fun refresh() {
        val guest = guestIdStore.getOrCreateGuestUuid()
        save(api.me(guest))
        val earned = api.achievements(guest)
        dao.clearEarned()
        dao.upsertEarned(earned.items.map { UserAchievementEntity(it.code, IsoTime.parseMillis(it.earnedAt) ?: 0L) })
    }

    override suspend fun equip(code: String?) {
        save(api.equip(guestIdStore.getOrCreateGuestUuid(), EquipRequestDto(code)))
    }

    override suspend fun advanceTutorial(step: String) {
        save(api.step(guestIdStore.getOrCreateGuestUuid(), StepRequestDto(step)))
    }

    private suspend fun save(me: PlayerDto) {
        _stats.value = PlayerStats(me.stats.collectedWords, me.stats.streakDays)
        val current = profiles.getById(me.userId)
        val base = current ?: com.project.linguacity.data.local.user.UserProfileEntity(id = me.userId)
        profiles.upsert(
            base.copy(
                knowledgePoints = me.knowledgePoints,
                hourglassCount = me.hourglassCount,
                blueprintShards = me.blueprintShards,
                tutorialCompleted = me.tutorialCompleted,
                tutorialStep = me.tutorialStep,
                equippedTitle = me.equippedTitle,
                avatarJson = me.avatar?.let { CosmeticJson.encodeAvatar(it) } ?: base.avatarJson,
                houseStyleJson = me.houseStyle?.let { CosmeticJson.encodeHouse(it) } ?: base.houseStyleJson
            )
        )
    }
}
