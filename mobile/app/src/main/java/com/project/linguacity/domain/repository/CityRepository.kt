package com.project.linguacity.domain.repository

import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.CityState
import kotlinx.coroutines.flow.StateFlow

/**
 * Nguồn dữ liệu thành phố. Hiện dùng bản giả lập (FakeCityRepository);
 * đến VS5 sẽ thay bằng bản gọi Backend (GET /city, POST /buildings/{id}/upgrade)
 * mà không phải sửa ViewModel hay màn hình.
 */
interface CityRepository {
    val city: StateFlow<CityState>

    /** Nâng cấp một công trình. Trả về false nếu không nâng được (đang xây hoặc đã tối đa). */
    suspend fun startUpgrade(code: BuildingCode): Boolean

    fun resolveEvent(eventId: String)
}
