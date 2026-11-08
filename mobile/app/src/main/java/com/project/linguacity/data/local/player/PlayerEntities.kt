package com.project.linguacity.data.local.player

import androidx.room.Entity

/*
 * Room v4 — bản sao Player State từ server (FR-SYS-03: server là nguồn sự thật, app chỉ ghi lại kết
 * quả).
 * Một máy = một Guest (ADR-008) nên các bảng này không có cột userId.
 */

/** Tiến độ một từ — để xem dấu ✓ sưu tầm và Mastery khi offline (ADR-004). */
@Entity(tableName = "user_vocab_progress", primaryKeys = ["vocabularyId"])
data class UserVocabProgressEntity(
    val vocabularyId: Long,
    val masteryScore: Int,
    val maxMastery: Int,
    val collected: Boolean,
    val lastReviewedAtMillis: Long?
)

/** Trạng thái công trình theo GET /city (hợp đồng A). Giờ lưu theo giờ server. */
@Entity(tableName = "user_buildings", primaryKeys = ["buildingCode"])
data class UserBuildingEntity(
    val buildingCode: String,
    val buildingId: Long,
    val currentLevel: Int,
    val targetLevel: Int?,
    val maxLevel: Int,
    val status: String,
    val startedAtMillis: Long?,
    val finishAtMillis: Long?
)

/** Danh mục danh hiệu (gói CORE). Danh hiệu Ẩn không có description (BR-ACH-02). */
@Entity(tableName = "achievements", primaryKeys = ["code"])
data class AchievementEntity(
    val code: String,
    val name: String,
    val description: String?,
    val tier: String,
    val hidden: Boolean,
    val sortOrder: Int
)

@Entity(tableName = "user_achievements", primaryKeys = ["code"])
data class UserAchievementEntity(
    val code: String,
    val earnedAtMillis: Long
)
