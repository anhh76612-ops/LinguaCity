package com.project.linguacity.domain.repository

import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.CityState
import com.project.linguacity.domain.model.player.BuildOutcome
import kotlinx.coroutines.flow.StateFlow

/**
 * Nguồn dữ liệu thành phố (M5: bản thật gọi GET /city, cache trong Room để mở offline).
 * ViewModel và màn hình không đổi khi đổi nguồn dữ liệu.
 */
interface CityRepository {
    val city: StateFlow<CityState>

    /** Tải lại từ server (lazy completion diễn ra ở server, FR-SYS-04). Lỗi mạng ném ra ngoài. */
    suspend fun refresh()

    /** Xây công trình Lv0→1 (BR-TUT-03). Lv1+ cần bài thi (VS4/VS5). */
    suspend fun build(code: BuildingCode): BuildOutcome

    fun resolveEvent(eventId: String)
}
