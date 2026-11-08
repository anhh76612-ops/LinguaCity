package com.project.linguacity.data.repository

import com.project.linguacity.data.local.player.PlayerDao
import com.project.linguacity.data.local.player.UnlockedCosmeticEntity
import com.project.linguacity.data.local.preferences.GuestIdStore
import com.project.linguacity.data.local.user.UserProfileDao
import com.project.linguacity.data.local.user.UserProfileEntity
import com.project.linguacity.data.mapper.CosmeticJson
import com.project.linguacity.data.mapper.toDomain
import com.project.linguacity.data.mapper.toDto
import com.project.linguacity.data.remote.apiError
import com.project.linguacity.data.remote.player.CosmeticsDto
import com.project.linguacity.data.remote.player.PlayerApi
import com.project.linguacity.domain.model.player.AvatarConfig
import com.project.linguacity.domain.model.player.CosmeticOutcome
import com.project.linguacity.domain.model.player.CosmeticsState
import com.project.linguacity.domain.model.player.HouseStyleConfig
import com.project.linguacity.domain.repository.CosmeticRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.emitAll
import kotlinx.coroutines.flow.flow
import java.io.IOException
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class CosmeticRepositoryImpl @Inject constructor(
    private val api: PlayerApi,
    private val dao: PlayerDao,
    private val profiles: UserProfileDao,
    private val guestIdStore: GuestIdStore
) : CosmeticRepository {

    override fun observe(): Flow<CosmeticsState> = combine(
        dao.observeCosmetics(),
        dao.observeUnlocked(),
        flow { emitAll(profiles.observeById(guestIdStore.getOrCreateGuestUuid())) }
    ) { items, unlocked, profile ->
        CosmeticsState(
            items = items.mapNotNull { it.toDomain() },
            unlocked = unlocked.map { it.code }.toSet(),
            avatar = CosmeticJson.decodeAvatar(profile?.avatarJson),
            house = CosmeticJson.decodeHouse(profile?.houseStyleJson),
            knowledgePoints = profile?.knowledgePoints ?: 0
        )
    }

    override suspend fun refresh() {
        save(api.cosmetics(guestIdStore.getOrCreateGuestUuid()))
    }

    override suspend fun unlock(code: String): CosmeticOutcome = call { api.unlock(it, code) }

    override suspend fun saveAvatar(config: AvatarConfig): CosmeticOutcome = call { api.saveAvatar(it, config.toDto()) }

    override suspend fun saveHouse(config: HouseStyleConfig): CosmeticOutcome = call { api.saveHouseStyle(it, config.toDto()) }

    private suspend fun call(block: suspend (String) -> CosmeticsDto): CosmeticOutcome = try {
        save(block(guestIdStore.getOrCreateGuestUuid()))
        CosmeticOutcome.Done
    } catch (e: IOException) {
        CosmeticOutcome.Offline
    } catch (e: Exception) {
        val err = e.apiError()
        when (err?.code) {
            "INSUFFICIENT_KP" -> CosmeticOutcome.NotEnoughKp(err.detailInt("missingKnowledge") ?: 0)
            "INVALID_COSMETIC", "NOT_PURCHASABLE" -> CosmeticOutcome.Invalid
            // đã mua ở máy khác / lần trước mất mạng sau khi server ghi: tải lại là đủ
            "ALREADY_UNLOCKED" -> { runCatching { refresh() }; CosmeticOutcome.Done }
            else -> CosmeticOutcome.Failed(err?.message ?: e.message ?: "Lỗi không xác định")
        }
    }

    /** Server là nguồn sự thật: ghi đè danh sách đã mở, cấu hình và KP trong Room. */
    private suspend fun save(dto: CosmeticsDto) {
        val id = guestIdStore.getOrCreateGuestUuid()
        val base = profiles.getById(id) ?: UserProfileEntity(id = id)
        profiles.upsert(
            base.copy(
                knowledgePoints = dto.knowledgePoints,
                avatarJson = CosmeticJson.encodeAvatar(dto.avatar),
                houseStyleJson = CosmeticJson.encodeHouse(dto.houseStyle)
            )
        )
        dao.clearUnlocked()
        dao.upsertUnlocked(dto.unlocked.map { UnlockedCosmeticEntity(it) })
    }
}
