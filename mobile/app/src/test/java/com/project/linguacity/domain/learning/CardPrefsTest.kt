package com.project.linguacity.domain.learning

import com.project.linguacity.domain.model.learning.CardPrefs
import java.time.ZoneId
import java.time.ZonedDateTime
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class CardPrefsTest {

    private val zone: ZoneId = ZoneId.of("Asia/Ho_Chi_Minh")

    private fun millis(y: Int, m: Int, d: Int, h: Int, min: Int, z: ZoneId = zone): Long =
        ZonedDateTime.of(y, m, d, h, min, 0, 0, z).toInstant().toEpochMilli()

    private fun prefs(last: Long?) = CardPrefs(vocabularyId = 1L, lastSelfCheckAtMillis = last)

    @Test
    fun neverChecked_canSelfCheck() {
        assertTrue(prefs(null).canSelfCheck(millis(2026, 11, 9, 10, 0), zone))
    }

    @Test
    fun checkedSameLocalDay_cannotSelfCheck() {
        val last = millis(2026, 11, 9, 10, 0)
        assertFalse(prefs(last).canSelfCheck(millis(2026, 11, 9, 20, 0), zone))
    }

    @Test
    fun checkedYesterdayNight_canSelfCheckAfterMidnight() {
        val last = millis(2026, 11, 8, 23, 30)
        assertTrue(prefs(last).canSelfCheck(millis(2026, 11, 9, 0, 10), zone))
    }

    @Test
    fun checked2330Utc_isSameLocalDay_usesDeviceZoneNotUtc() {
        // 23:30 UTC ngày 8 = 06:30 ngày 9 giờ Việt Nam.
        val last = millis(2026, 11, 8, 23, 30, ZoneId.of("UTC"))
        assertFalse(prefs(last).canSelfCheck(millis(2026, 11, 9, 10, 0), zone))
    }
}
