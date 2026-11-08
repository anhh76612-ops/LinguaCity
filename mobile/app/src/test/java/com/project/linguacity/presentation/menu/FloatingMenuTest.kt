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
