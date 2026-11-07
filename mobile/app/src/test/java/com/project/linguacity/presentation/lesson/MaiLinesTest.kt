package com.project.linguacity.presentation.lesson

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class MaiLinesTest {

    @Test
    fun `same seed gives the same line so recomposition does not change the text`() {
        assertEquals(MaiLines.forAnswer(true, 1, false, 4), MaiLines.forAnswer(true, 1, false, 4))
    }

    @Test
    fun `streaks and new cards are mentioned`() {
        assertTrue(MaiLines.forAnswer(true, 3, false, 1).contains("3 câu liền"))
        assertTrue(MaiLines.forAnswer(true, 10, false, 1).contains("Chuỗi 10"))
        assertTrue(MaiLines.forAnswer(true, 1, true, 1).contains("thẻ mới"))
    }
}
