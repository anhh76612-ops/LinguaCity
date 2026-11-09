package com.project.linguacity.domain.model.learning

import java.time.Instant
import java.time.ZoneId

/** Tuỳ chọn riêng của người chơi cho một thẻ, chỉ lưu trên máy. */
data class CardPrefs(
    val vocabularyId: Long,
    val favorite: Boolean = false,
    val userScale: Float = 1f,
    val note: String = "",
    val lastSelfCheckAtMillis: Long? = null
) {
    /** Mỗi ngày lịch (theo [zone]) tự kiểm tra một lần. */
    fun canSelfCheck(nowMillis: Long, zone: ZoneId): Boolean {
        val last = lastSelfCheckAtMillis ?: return true
        val lastDay = Instant.ofEpochMilli(last).atZone(zone).toLocalDate()
        val today = Instant.ofEpochMilli(nowMillis).atZone(zone).toLocalDate()
        return lastDay != today
    }
}
