package com.project.linguacity.presentation.city

import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.BuildingState
import com.project.linguacity.domain.model.city.BuildingStatus
import com.project.linguacity.domain.model.city.CityState
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/** Lớp dịch hợp đồng (A) → (B): tính tiến độ xây theo giờ server. */
class CityRenderStateTest {

    private fun upgrading(start: Long?, finish: Long?) =
        BuildingState(BuildingCode.SCHOOL, level = 1, status = BuildingStatus.UPGRADING, startedAtMillis = start, finishAtMillis = finish)

    @Test
    fun progress_cacMocThoiGian() {
        val b = upgrading(start = 1_000, finish = 5_000)
        assertEquals(0f, b.progressAt(500), 0f)      // trước khi bắt đầu → kẹp 0
        assertEquals(0f, b.progressAt(1_000), 0f)
        assertEquals(0.25f, b.progressAt(2_000), 1e-6f)
        assertEquals(1f, b.progressAt(5_000), 0f)
        assertEquals(1f, b.progressAt(99_000), 0f)   // quá hạn nhưng server chưa xác nhận → vẫn 1
    }

    @Test
    fun progress_duLieuBatThuong() {
        assertEquals(1f, upgrading(start = 3_000, finish = 3_000).progressAt(3_000), 0f) // thời gian xây = 0
        assertEquals(0f, upgrading(start = null, finish = 5_000).progressAt(2_000), 0f)
        assertEquals(0f, BuildingState(BuildingCode.SCHOOL, level = 1).progressAt(2_000), 0f) // IDLE
    }

    @Test
    fun toRenderState_dungDoLechDongHoServer() {
        // Server chạy nhanh hơn máy 10 giây.
        val city = CityState(buildings = listOf(upgrading(start = 10_000, finish = 30_000)), serverOffsetMillis = 10_000)
        val view = city.toRenderState(city.serverNow(deviceNowMillis = 10_000)).buildings.single()
        assertTrue(view.upgrading)
        assertEquals(0.5f, view.progress, 1e-6f) // giờ server = 20 000 → nửa chặng
    }

    @Test
    fun toRenderState_level0VaKepLevel() {
        val city = CityState(
            buildings = listOf(
                BuildingState(BuildingCode.PARK, level = 0),
                BuildingState(BuildingCode.ROAD, level = 9)
            )
        )
        val r = city.toRenderState(0)
        assertFalse(r.building(BuildingCode.PARK)!!.isBuilt)
        assertEquals(3, r.building(BuildingCode.ROAD)!!.level)
    }
}
