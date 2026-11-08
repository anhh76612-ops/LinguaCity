package com.project.linguacity.presentation.tutorial

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/** Kịch bản tutorial theo bước server (ADR-014, BR-TUT-03/04). */
class TutorialGuideTest {

    private fun ctx(step: String, collected: Int = 0, kp: Int = 0, upgrading: Boolean = false) =
        GuideContext(step, collected, requiredCollected = 20, knowledgePoints = kp, buildCost = 100,
            houseLevel = 0, houseUpgrading = upgrading)

    @Test
    fun `intro ends with starting the placement test`() {
        val s = TutorialGuide.script(ctx("INTRO"))!!
        assertEquals(GuideAction.START_PLACEMENT, s.action)
        assertEquals(3, s.lines.size)
    }

    @Test
    fun `learn house always asks for one lesson even with enough words`() {
        val s = TutorialGuide.script(ctx("LEARN_HOUSE", collected = 20, kp = 200))!!
        assertEquals(GuideAction.START_LESSON, s.action)
        assertEquals(SpotKeys.LEARN, s.lines.last().target)
        assertTrue(s.selectHousing)
    }

    @Test
    fun `build step tells exactly what is missing, or lets you build`() {
        val more = TutorialGuide.script(ctx("BUILD_HOUSE", collected = 14, kp = 60))!!
        assertEquals(GuideAction.START_LESSON, more.action)
        assertTrue(more.lines.single().text.contains("6 thẻ từ và 40 KP"))

        val ready = TutorialGuide.script(ctx("BUILD_HOUSE", collected = 20, kp = 172))!!
        assertEquals(GuideAction.BUILD, ready.action)
        assertEquals(SpotKeys.BUILD, ready.lines.last().target)

        val waiting = TutorialGuide.script(ctx(
            "BUILD_HOUSE",
            collected = 20,
            kp = 72,
            upgrading = true
        ))!!
        assertEquals(GuideAction.NONE, waiting.action)
    }

    @Test
    fun `tour finishes the tutorial and done shows nothing`() {
        assertEquals(GuideAction.FINISH_TUTORIAL, TutorialGuide.script(ctx("TOUR"))!!.action)
        assertNull(TutorialGuide.script(ctx("DONE")))
    }
}
