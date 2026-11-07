package com.project.linguacity.domain.repository

import com.project.linguacity.domain.model.content.BuildingLevelInfo
import com.project.linguacity.domain.model.content.SyncProgress
import com.project.linguacity.domain.model.content.SyncReport
import com.project.linguacity.domain.model.content.Vocabulary
import kotlinx.coroutines.flow.Flow

/** Nội dung tĩnh: tải theo gói từ server (UC_03), đọc từ Room (UC_04). */
interface ContentRepository {

    /** Đã có gói CORE trong máy chưa — chưa có thì lần đầu bắt buộc phải có mạng (BR-CONTENT-08). */
    suspend fun hasCore(): Boolean

    /**
     * Tải CORE và các gói cần cho `currentLevels` (mã công trình → level hiện tại) nếu chưa có hoặc đổi version.
     * Ném lỗi mạng ra ngoài — nơi gọi quyết định chặn (lần đầu) hay bỏ qua (đã có cache).
     */
    suspend fun sync(currentLevels: Map<String, Int>, onProgress: (SyncProgress) -> Unit = {}): SyncReport

    fun observeVocabularies(buildingCode: String, level: Int): Flow<List<Vocabulary>>

    fun observeBuildingLevels(): Flow<List<BuildingLevelInfo>>
}
