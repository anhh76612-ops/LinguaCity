package com.project.linguacity.data.repository

import android.util.Log
import com.project.linguacity.data.local.player.PlayerDao
import com.project.linguacity.data.local.player.UserBuildingEntity
import com.project.linguacity.data.local.preferences.GuestIdStore
import com.project.linguacity.data.local.user.UserProfileDao
import com.project.linguacity.data.mapper.toEntity
import com.project.linguacity.data.remote.IsoTime
import com.project.linguacity.data.remote.apiError
import com.project.linguacity.data.remote.city.CityApi
import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.BuildingState
import com.project.linguacity.domain.model.city.BuildingStatus
import com.project.linguacity.domain.model.city.CityState
import com.project.linguacity.domain.model.player.BuildOutcome
import com.project.linguacity.domain.repository.CityRepository
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import java.io.IOException
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Thành phố thật (thay FakeCityRepository). Dữ liệu đi: server (GET /city) → Room (user_buildings) → StateFlow.
 * Nhờ đọc từ Room, mở app offline vẫn thấy thành phố lần đồng bộ cuối (ADR-004).
 */
@Singleton
class CityRepositoryImpl @Inject constructor(
    private val api: CityApi,
    private val dao: PlayerDao,
    private val profiles: UserProfileDao,
    private val guestIdStore: GuestIdStore
) : CityRepository {

    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default)

    /** Giờ server − giờ máy, đo mỗi lần nhận serverTime (FR-SYS-04). */
    private val offset = MutableStateFlow(0L)

    override val city: StateFlow<CityState> = combine(dao.observeBuildings(), offset) { rows, off ->
        CityState(buildings = toStates(rows), serverOffsetMillis = off)
    }.stateIn(scope, SharingStarted.Eagerly, CityState(toStates(emptyList())))

    override suspend fun refresh() {
        val dto = api.city(guestIdStore.getOrCreateGuestUuid())
        measureOffset(dto.serverTime)
        dao.upsertBuildings(dto.buildings.map { it.toEntity() })
        dto.tutorialStep?.let { step -> updateProfile { it.copy(tutorialStep = step) } }
    }

    override suspend fun build(code: BuildingCode): BuildOutcome = try {
        val r = api.build(guestIdStore.getOrCreateGuestUuid(), code.name)
        measureOffset(r.serverTime)
        dao.upsertBuildings(listOf(r.building.toEntity()))
        updateProfile { it.copy(knowledgePoints = r.profile.knowledgePoints) }
        BuildOutcome.Started
    } catch (e: CancellationException) {
        throw e
    } catch (e: IOException) {
        BuildOutcome.Offline
    } catch (e: Exception) {
        val error = e.apiError()
        when (error?.code) {
            "REQUIREMENTS_NOT_MET" -> BuildOutcome.NotMet(
                error.detailInt("missingCollected") ?: 0, error.detailInt("missingKnowledge") ?: 0
            )
            "BUSY" -> BuildOutcome.Busy
            "ALREADY_BUILT" -> BuildOutcome.NeedsExam
            else -> BuildOutcome.Failed(error?.message ?: e.message ?: "Lỗi không xác định")
        }
    }

    override fun resolveEvent(eventId: String) {
        Log.i("CityRepository", "City Event $eventId: bài ngữ pháp chưa có ở bản này (FR-CITY-06)")
    }

    private fun measureOffset(serverTime: String) {
        IsoTime.parseMillis(serverTime)?.let { offset.value = it - System.currentTimeMillis() }
    }

    private suspend fun updateProfile(change: (com.project.linguacity.data.local.user.UserProfileEntity) ->
    com.project.linguacity.data.local.user.UserProfileEntity) {
        profiles.getById(guestIdStore.getOrCreateGuestUuid())?.let { profiles.upsert(change(it)) }
    }

    private fun toStates(rows: List<UserBuildingEntity>): List<BuildingState> {
        val byCode = rows.associateBy { it.buildingCode }
        return BuildingCode.entries.map { code ->
            val row = byCode[code.name]
            if (row == null) BuildingState(code, level = 0)
            else BuildingState(
                code = code,
                level = row.currentLevel,
                status = if (row.status == "UPGRADING") BuildingStatus.UPGRADING else BuildingStatus.IDLE,
                startedAtMillis = row.startedAtMillis,
                finishAtMillis = row.finishAtMillis
            )
        }
    }
}
