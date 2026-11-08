package com.project.linguacity.domain.content

import com.project.linguacity.domain.model.content.PackRef

/**
 * Quyết định gói nào cần tải (ADR-012, system-design §10.3.1). Hàm thuần — không gọi mạng, không
 * đọc Room —
 * nên kiểm thử được trên JVM (PackSelectorTest).
 *
 * - CORE luôn cần.
 * - Mỗi công trình cần các Level từ max(1, current) tới current + 1 (Level đang có và Level kế
 * tiếp).
 *   Công trình chưa có trong `currentLevels` coi như level 0 → cần Level 1.
 * - Chỉ tải khi gói chưa có ở máy hoặc version trên server khác version ở máy.
 */
object PackSelector {

    const val CORE = "CORE"

    fun wanted(manifest: List<PackRef>, currentLevels: Map<String, Int>): List<PackRef> =
        manifest.filter { pack ->
            if (pack.code == CORE) {
                return@filter true
            }
            val building = pack.buildingCode ?: return@filter false
            val level = pack.level ?: return@filter false
            val current = currentLevels[building] ?: 0
            level in maxOf(1, current)..(current + 1)
        }

    fun toDownload(
        manifest: List<PackRef>,
        currentLevels: Map<String, Int>,
        localVersions: Map<String, Int>
    ): List<PackRef> =
        wanted(manifest, currentLevels)
            .filter { localVersions[it.code] != it.version }
            // CORE trước: các gói khác tham chiếu tới nó
            .sortedBy { if (it.code == CORE) 0 else 1 }
}
