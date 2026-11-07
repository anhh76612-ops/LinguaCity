package com.project.linguacity.data.repository

import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.BuildingState
import com.project.linguacity.domain.model.city.BuildingStatus
import com.project.linguacity.domain.model.city.CityEvent
import com.project.linguacity.domain.model.city.CityState
import com.project.linguacity.domain.repository.CityRepository
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Giả lập Backend trong bộ nhớ, trả dữ liệu ĐÚNG HÌNH DẠNG server (status, startedAt, finishAt),
 * để phần tính tiến độ ở app chạy y như khi có API thật (VS5).
 * Không lưu xuống đĩa: tắt app là về trạng thái ban đầu.
 */
@Singleton
class FakeCityRepository @Inject constructor() : CityRepository {

    /** "Server" giả hoàn tất công trình độc lập với màn hình (giống job phía server). */
    private val serverScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)

    private val _city = MutableStateFlow(
        CityState(
            buildings = listOf(
                BuildingState(BuildingCode.HOUSING, level = 1),
                BuildingState(BuildingCode.SCHOOL, level = 1),
                BuildingState(BuildingCode.PARK, level = 0), // chưa xây: bản đồ hiện lô đất trống
                BuildingState(BuildingCode.ROAD, level = 2)
            ),
            events = listOf(CityEvent(id = "evt-demo-1")),
            serverOffsetMillis = 0 // server giả dùng chung đồng hồ với máy
        )
    )
    override val city: StateFlow<CityState> = _city.asStateFlow()

    override suspend fun startUpgrade(code: BuildingCode): Boolean {
        val current = _city.value.building(code) ?: return false
        if (current.isUpgrading || current.isMaxLevel) return false

        val now = System.currentTimeMillis()
        setBuilding(code) {
            it.copy(status = BuildingStatus.UPGRADING, startedAtMillis = now, finishAtMillis = now + CONSTRUCTION_MILLIS)
        }
        serverScope.launch {
            delay(CONSTRUCTION_MILLIS)
            setBuilding(code) {
                it.copy(level = it.level + 1, status = BuildingStatus.IDLE, startedAtMillis = null, finishAtMillis = null)
            }
        }
        return true
    }

    override fun resolveEvent(eventId: String) {
        _city.update { city -> city.copy(events = city.events.filterNot { it.id == eventId }) }
    }

    private fun setBuilding(code: BuildingCode, change: (BuildingState) -> BuildingState) {
        _city.update { city ->
            city.copy(buildings = city.buildings.map { if (it.code == code) change(it) else it })
        }
    }

    private companion object {
        /** Bản thật: building_levels.construction_time do server quyết định. */
        const val CONSTRUCTION_MILLIS = 8_000L
    }
}
