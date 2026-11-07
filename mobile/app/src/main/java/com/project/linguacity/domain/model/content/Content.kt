package com.project.linguacity.domain.model.content

/** Thẻ từ vựng (đọc từ Room, dùng được offline — UC_04). */
data class Vocabulary(
    val id: Long,
    val word: String,
    val meaning: String,
    val wordType: String,
    val ipa: String?,
    val examples: List<String>,
    val themeCode: String,
    val level: Int,
    val difficultyRank: String
)

/** Chi phí và điều kiện để xây/nâng một công trình lên `level` (bảng building_levels). */
data class BuildingLevelInfo(
    val buildingCode: String,
    val level: Int,
    val knowledgeCost: Int,
    val constructionTimeSeconds: Long,
    val requiredCollected: Int
)

/** Một gói trong manifest của server. */
data class PackRef(val code: String, val buildingCode: String?, val level: Int?, val version: Int)

/** Kết quả một lần đồng bộ. */
data class SyncReport(
    val downloaded: List<String>,
    val upToDate: List<String>
)

/** Tiến trình để SCR-03 hiển thị. */
data class SyncProgress(val done: Int, val total: Int, val currentPack: String?)

fun packCode(buildingCode: String, level: Int) = "$buildingCode:$level"
