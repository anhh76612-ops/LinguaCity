package com.project.linguacity.data.repository

import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.BuildingState
import com.project.linguacity.domain.model.city.CityEvent
import com.project.linguacity.domain.model.city.CityState
import com.project.linguacity.domain.repository.CityRepository
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Dữ liệu giả lập trong bộ nhớ, đủ để thử City View trước khi có API (VS5).
 * Nâng cấp "chạy" trong [UPGRADE_MILLIS] rồi tăng level. Bản thật: Backend quyết định
 * thời gian theo giờ server, app chỉ hiển thị.
 */
@Singleton
class FakeCityRepository @Inject constructor() : CityRepository {

    private val _city = MutableStateFlow(
        CityState(
            buildings = listOf(
                BuildingState(BuildingCode.HOUSING, level = 1),
                BuildingState(BuildingCode.SCHOOL, level = 1),
                BuildingState(BuildingCode.PARK, level = 1),
                BuildingState(BuildingCode.ROAD, level = 2)
            ),
            events = listOf(CityEvent(id = "evt-demo-1"))
        )
    )
    override val city: StateFlow<CityState> = _city.asStateFlow()

    override suspend fun startUpgrade(code: BuildingCode): Boolean {
        val current = _city.value.building(code) ?: return false
        if (current.upgrading || current.isMaxLevel) return false

        for (step in 0..STEPS) {
            setBuilding(code) { it.copy(upgrading = true, progress = step / STEPS.toFloat()) }
            delay(UPGRADE_MILLIS / STEPS)
        }
        setBuilding(code) { it.copy(level = it.level + 1, upgrading = false, progress = 0f) }
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
        const val UPGRADE_MILLIS = 6_000L
        const val STEPS = 20
    }
}
