package com.project.linguacity.domain.repository

import com.project.linguacity.domain.model.learning.CardPrefs
import kotlinx.coroutines.flow.Flow

/** Tuỳ chọn thẻ lưu cục bộ (không đồng bộ lên server). */
interface CardPrefsRepository {
    fun observeAll(): Flow<Map<Long, CardPrefs>>
    suspend fun setFavorite(id: Long, favorite: Boolean)
    suspend fun setUserScale(id: Long, scale: Float)
    suspend fun setNote(id: Long, note: String)
    suspend fun markSelfCheck(id: Long, nowMillis: Long)
}
