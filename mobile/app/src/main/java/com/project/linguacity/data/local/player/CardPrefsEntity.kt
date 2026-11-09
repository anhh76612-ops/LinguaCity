package com.project.linguacity.data.local.player

import androidx.room.Entity

/** Tuỳ chọn riêng của người chơi cho từng thẻ trong Kho thẻ (yêu thích, cỡ chữ, ghi chú). */
@Entity(tableName = "user_card_prefs", primaryKeys = ["vocabularyId"])
data class CardPrefsEntity(
    val vocabularyId: Long,
    val favorite: Boolean = false,
    val userScale: Float = 1f,
    val note: String = "",
    val lastSelfCheckAtMillis: Long? = null,
    val updatedAtMillis: Long
)
