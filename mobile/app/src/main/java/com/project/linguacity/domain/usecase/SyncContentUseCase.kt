package com.project.linguacity.domain.usecase

import com.project.linguacity.domain.model.content.SyncProgress
import com.project.linguacity.domain.model.content.SyncReport
import com.project.linguacity.domain.repository.CityRepository
import com.project.linguacity.domain.repository.ContentRepository
import javax.inject.Inject

/**
 * UC_03: lấy level hiện tại của các công trình rồi tải các gói cần.
 * (Đến M5, CityRepository lấy level thật từ `GET /city`; hiện vẫn là dữ liệu giả lập.)
 */
class SyncContentUseCase @Inject constructor(
    private val content: ContentRepository,
    private val city: CityRepository
) {
    suspend operator fun invoke(onProgress: (SyncProgress) -> Unit = {}): SyncReport {
        val levels = city.city.value.buildings.associate { it.code.name to it.level }
        return content.sync(levels, onProgress)
    }

    suspend fun hasCache(): Boolean = content.hasCore()
}
