package com.project.linguacity.domain.learning

import com.project.linguacity.data.remote.IsoTime
import com.project.linguacity.domain.model.learning.VocabProgress
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class VocabProgressTest {

    private val now = IsoTime.parseMillis("2026-11-09T00:00:00Z")!!
    private val day = 24L * 60 * 60 * 1000

    private fun progress(firstSeen: Long?, lastCorrect: Long?) = VocabProgress(
        vocabularyId = 1, mastery = 3, maxMastery = 10, collected = false,
        firstSeenAtMillis = firstSeen, lastCorrectAtMillis = lastCorrect
    )

    @Test
    fun `lastCorrect 6 ngay truoc khong sap quen`() {
        assertFalse(progress(now - 30 * day, now - 6 * day).isStale(now))
    }

    @Test
    fun `lastCorrect 8 ngay truoc sap quen`() {
        assertTrue(progress(now - 30 * day, now - 8 * day).isStale(now))
    }

    @Test
    fun `chua tung dung va gap 8 ngay truoc sap quen`() {
        assertTrue(progress(now - 8 * day, null).isStale(now))
    }

    @Test
    fun `chua tung dung va gap 2 ngay truoc chua sap quen`() {
        assertFalse(progress(now - 2 * day, null).isStale(now))
    }

    @Test
    fun `chua gap thi khong sap quen va seen false`() {
        val p = progress(null, null)
        assertFalse(p.isStale(now))
        assertFalse(p.seen)
    }

    @Test
    fun `dung 7 ngay tron chua sap quen`() {
        assertFalse(progress(now - 30 * day, now - 7 * day).isStale(now))
    }
}
