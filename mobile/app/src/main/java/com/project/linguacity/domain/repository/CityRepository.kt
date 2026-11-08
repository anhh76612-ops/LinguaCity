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

    /** Xây level kế tiếp: Lv0→1 cần từ + KP; Lv1+ cần bản vẽ + mảnh + KP (ADR-015 §3). */
    suspend fun build(code: BuildingCode): BuildOutcome
}
