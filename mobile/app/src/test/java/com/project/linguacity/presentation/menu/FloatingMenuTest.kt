package com.project.linguacity.presentation.menu

import com.project.linguacity.data.local.preferences.OrientationSetting
import android.content.pm.ActivityInfo
import org.junit.Assert.assertEquals
import org.junit.Test

class FloatingMenuTest {

    @Test
    fun `items spread on a quarter arc from straight up to straight left`() {
        val (x0, y0) = arcOffset(0, 4, 100f)
        val (x3, y3) = arcOffset(3, 4, 100f)
        assertEquals(0f, x0, 0.01f)
        assertEquals(-100f, y0, 0.01f)   // thẳng lên
        assertEquals(-100f, x3, 0.01f)
        assertEquals(0f, y3, 0.01f)   // ngang sang trái
        val (x1, y1) = arcOffset(1, 4, 100f)
        assertEquals(-50f, x1, 0.01f)
        assertEquals(-86.6f, y1, 0.05f) // 120°
    }

    // TC-M15-02: menu đợt 2 có 6 mục (thêm 📜 Nhiệm vụ, 🎯 Luyện tập) vẫn nằm trên cung 90°
    @Test
    fun `six items keep the same quarter arc with even spacing`() {
        val points = (0 until 6).map { arcOffset(it, 6, 100f) }
        assertEquals(0f, points.first().first, 0.01f)
        assertEquals(-100f, points.first().second, 0.01f)
        assertEquals(-100f, points.last().first, 0.01f)
        assertEquals(0f, points.last().second, 0.01f)
        val gaps = points.zipWithNext { a, b ->
            kotlin.math.hypot(a.first - b.first, a.second - b.second)
        }
        gaps.forEach { assertEquals(gaps.first(), it, 0.01f) }
        points.forEach { (x, y) -> assertEquals(100f, kotlin.math.hypot(x, y), 0.01f) }
    }

    @Test
    fun `orientation settings map to activity values`() {
        assertEquals(
            ActivityInfo.SCREEN_ORIENTATION_USER_PORTRAIT,
            OrientationSetting.PORTRAIT.activityValue
        )
        assertEquals(
            ActivityInfo.SCREEN_ORIENTATION_USER_LANDSCAPE,
            OrientationSetting.LANDSCAPE.activityValue
        )
        assertEquals(
            ActivityInfo.SCREEN_ORIENTATION_FULL_USER,
            OrientationSetting.AUTO.activityValue
        )
    }
}
