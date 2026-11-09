package com.project.linguacity.data.local.preferences

import org.junit.Assert.assertEquals
import org.junit.Test

class SettingsParsingTest {

    @Test
    fun parseOrientation_nullVaLa_veLandscape() {
        assertEquals(OrientationSetting.LANDSCAPE, parseOrientation(null))
        assertEquals(OrientationSetting.LANDSCAPE, parseOrientation("sideways"))
    }

    @Test
    fun parseOrientation_giaTriHopLe_giuNguyen() {
        assertEquals(OrientationSetting.PORTRAIT, parseOrientation("PORTRAIT"))
        assertEquals(OrientationSetting.AUTO, parseOrientation("AUTO"))
    }

    @Test
    fun parseReadMode_macDinhGrid() {
        assertEquals(CardReadMode.GRID, parseReadMode(null))
        assertEquals(CardReadMode.GRID, parseReadMode("masonry"))
        assertEquals(CardReadMode.BENTO, parseReadMode("BENTO"))
    }

    @Test
    fun appSettings_macDinhXoayNgang() {
        assertEquals(OrientationSetting.LANDSCAPE, AppSettings().orientation)
    }
}
