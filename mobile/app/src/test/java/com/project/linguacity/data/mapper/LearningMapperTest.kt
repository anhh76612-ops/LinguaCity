package com.project.linguacity.data.mapper

import com.project.linguacity.data.remote.IsoTime
import com.project.linguacity.data.remote.city.CityDto
import com.project.linguacity.data.remote.learning.CompleteResultDto
import com.project.linguacity.data.remote.learning.SessionDto
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/** JSON thật của server (§10.4.2, §7.2.8) → domain. */
class LearningMapperTest {

    private val json = Json { ignoreUnknownKeys = true }

    @Test
    fun `session json maps multiple choice and fill blank questions`() {
        val s = json.decodeFromString(SessionDto.serializer(), """
            {"sessionId":"a1","type":"PLACEMENT","buildingCode":"HOUSING","vocabLevel":1,"status":"ACTIVE",
             "startedAt":"2026-11-08T03:00:00Z",
             "expiresAt":"2026-11-09T03:00:00.5Z",
             "serverTime":"2026-11-08T03:00:00Z",
             "totalCount":2,"correctCount":1,"items":[
              {"itemNo":1,"vocabularyId":5,"answered":true,"isCorrect":true,
               "question":{"id":13,"skill":"READING","questionType":"MULT_CHOICE","tier":1,"questionText":"What does \"deposit\" mean?",
                           "metadata":{"options":["tiền đặt cọc","tiền thuê nhà"]}}},
              {"itemNo":2,"vocabularyId":5,"answered":false,
               "question":{"id":14,"skill":"WRITING","questionType":"FILL_BLANK","tier":2,"questionText":"Điền từ",
                           "metadata":{"sentence":"We paid a ___.","hint":"d _ _ _ _ _ t"}}}]}""")
        val d = s.toDomain()
        assertTrue(d.placement)
        assertEquals(1, d.firstOpenIndex)
        assertTrue(d.items[0].question.multipleChoice)
        assertEquals(listOf("tiền đặt cọc", "tiền thuê nhà"), d.items[0].question.options)
        assertFalse(d.items[1].question.multipleChoice)
        assertEquals("We paid a ___.", d.items[1].question.sentence)
        assertEquals("d _ _ _ _ _ t", d.items[1].question.hint)
        assertNull(d.items[1].isCorrect)
        assertEquals(IsoTime.parseMillis("2026-11-09T03:00:00.500Z"), d.expiresAtMillis)
    }

    @Test
    fun `complete result keeps the kp breakdown and tutorial step`() {
        val r = json.decodeFromString(CompleteResultDto.serializer(), """
            {"sessionId":"a1","type":"LEARNING","correct":17,"total":20,"kpAwarded":105,"kpBase":85,"kpBonus":20,
             "dailySessionIndex":1,
             "dailyMultiplier":1.0,
             "collection":{"buildingCode":"HOUSING","level":1,"collected":22,"total":30},
             "newAchievements":["COMBO10"],
             "profile":{"knowledgePoints":205,"hourglassCount":0,"blueprintShards":0},
             "tutorialStep":"BUILD_HOUSE"}""").toDomain()
        assertEquals(105, r.kpAwarded)
        assertEquals(22, r.collected)
        assertEquals(listOf("COMBO10"), r.newAchievements)
        assertEquals("BUILD_HOUSE", r.tutorialStep)
    }

    @Test
    fun `city building maps server times`() {
        val c = json.decodeFromString(CityDto.serializer(), """
            {"serverTime":"2026-11-08T03:00:00Z","buildings":[{"buildingId":1,"code":"HOUSING","currentLevel":0,"targetLevel":1,
             "maxLevel":3,"status":"UPGRADING","startedAt":"2026-11-08T03:00:00Z","finishAt":"2026-11-08T03:00:10Z"}],
             "events":[],"tutorialStep":"BUILD_HOUSE"}""")
        val e = c.buildings.single().toEntity()
        assertEquals(10_000L, e.finishAtMillis!! - e.startedAtMillis!!)
        assertEquals("UPGRADING", e.status)
    }

    @Test
    fun `iso time parses fractions of any length and rejects garbage`() {
        assertEquals(1_794_106_800_000L, IsoTime.parseMillis("2026-11-08T03:00:00Z"))
        assertEquals(1_794_106_800_525L, IsoTime.parseMillis("2026-11-08T03:00:00.525205Z"))
        assertEquals(1_794_106_800_500L, IsoTime.parseMillis("2026-11-08T03:00:00.5Z"))
        assertNull(IsoTime.parseMillis("hôm qua"))
        assertNull(IsoTime.parseMillis(null))
    }
}
