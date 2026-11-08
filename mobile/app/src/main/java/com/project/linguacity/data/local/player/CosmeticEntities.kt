package com.project.linguacity.data.local.player

import androidx.room.Entity

/* Room v5 (M8) — tuỳ biến nhân vật và nhà (UC_14). */

/** Danh mục món tuỳ biến (gói CORE). */
@Entity(tableName = "cosmetic_items", primaryKeys = ["code"])
data class CosmeticItemEntity(
    val code: String,
    val category: String,
    val name: String,
    val unlockType: String,
    val priceKp: Int,
    val achievementCode: String?,
    val assetKey: String,
    val sortOrder: Int
)

/** Những món người chơi DÙNG ĐƯỢC theo server (FREE + đã mua + có danh hiệu). Thay toàn bộ mỗi lần tải. */
@Entity(tableName = "unlocked_cosmetics", primaryKeys = ["code"])
data class UnlockedCosmeticEntity(val code: String)
