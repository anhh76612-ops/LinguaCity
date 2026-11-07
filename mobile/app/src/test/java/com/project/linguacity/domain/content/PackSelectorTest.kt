package com.project.linguacity.domain.content

import com.project.linguacity.domain.model.content.PackRef
import org.junit.Assert.assertEquals
import org.junit.Test

/** Chọn gói cần tải (ADR-012, system-design §10.3.1). */
class PackSelectorTest {

    private val manifest = listOf(
        PackRef("CORE", null, null, 2),
        PackRef("HOUSING:1", "HOUSING", 1, 1),
        PackRef("HOUSING:2", "HOUSING", 2, 1),
        PackRef("HOUSING:3", "HOUSING", 3, 1),
        PackRef("ROAD:1", "ROAD", 1, 1)
    )

    @Test
    fun `first install with every building at level 0 wants CORE and every level 1 pack`() {
        val wanted = PackSelector.wanted(manifest, mapOf("HOUSING" to 0, "ROAD" to 0)).map { it.code }
        assertEquals(listOf("CORE", "HOUSING:1", "ROAD:1"), wanted)
    }

    @Test
    fun `a building at level N wants level N and level N+1 only`() {
        val wanted = PackSelector.wanted(manifest, mapOf("HOUSING" to 2)).map { it.code }
        // HOUSING:1 không cần nữa (đã qua), HOUSING:3 là Level kế tiếp. ROAD không có trong map → coi như level 0.
        assertEquals(listOf("CORE", "HOUSING:2", "HOUSING:3", "ROAD:1"), wanted)
    }

    @Test
    fun `only packs that are missing or have another version are downloaded, CORE first`() {
        val local = mapOf("CORE" to 1, "HOUSING:1" to 1)
        val download = PackSelector.toDownload(manifest.reversed(), mapOf("HOUSING" to 0, "ROAD" to 0), local)
        // CORE: local v1 ≠ server v2 → tải lại; HOUSING:1 cùng version → bỏ qua; ROAD:1 chưa có → tải.
        assertEquals(listOf("CORE", "ROAD:1"), download.map { it.code })
    }

    @Test
    fun `nothing to download when everything is up to date`() {
        val local = mapOf("CORE" to 2, "HOUSING:1" to 1, "ROAD:1" to 1)
        assertEquals(emptyList<PackRef>(), PackSelector.toDownload(manifest, mapOf("HOUSING" to 0), local))
    }
}
