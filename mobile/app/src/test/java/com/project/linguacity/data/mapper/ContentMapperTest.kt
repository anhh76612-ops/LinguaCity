package com.project.linguacity.data.mapper

import com.project.linguacity.data.local.Converters
import com.project.linguacity.data.remote.content.CoreDto
import com.project.linguacity.data.remote.content.PackDto
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * JSON thật của server → DTO → dòng Room. Chuỗi JSON lấy theo đúng hình dạng §10.4.1 (rút gọn).
 */
class ContentMapperTest {

    private val json = Json { ignoreUnknownKeys = true }

    @Test
    fun `core maps many themes per building into join rows`() {
        val core = json.decodeFromString(
            CoreDto.serializer(),
            """{"code":"CORE","version":1,
               "themes":[{"id":1,"code":"DAILY_LIFE","name":"Daily Life"},{"id":2,"code":"HOUSE","name":"House","description":null}],
               "buildings":[{"id":1,"code":"HOUSING","name":"Nhà ở","maxLevel":3,"sortOrder":1,"themeCodes":["DAILY_LIFE","HOUSE"]}],
               "buildingLevels":[{"buildingCode":"HOUSING","level":1,"knowledgeCost":100,"constructionTimeSeconds":10,"requiredCollected":20}],
               "blueprints":[{"id":1,"code":"BLUEPRINT_HOUSING_LV2","buildingCode":"HOUSING","targetLevel":2}],
               "achievements":[],"cosmetics":[]}"""
        )
        val rows = core.toRows()
        assertEquals(2, rows.themes.size)
        assertEquals(listOf("DAILY_LIFE", "HOUSE"), rows.buildingThemes.map { it.themeCode })
        assertEquals(20, rows.buildingLevels.single().requiredCollected)
        assertEquals(10L, rows.buildingLevels.single().toDomain().constructionTimeSeconds)
    }

    @Test
    fun `pack rows carry the pack code and keep question metadata as raw json`() {
        val pack = json.decodeFromString(
            PackDto.serializer(),
            """{"code":"HOUSING:1","version":1,
               "vocabularies":[{"id":1,"word":"rent","meaning":"tiền thuê nhà","wordType":"NOUN","ipa":"/rent/",
                                "examples":["My rent is due."],"imageUrl":null,"themeCode":"HOUSE","level":1,"difficultyRank":"D"}],
               "questions":[{"id":1,"contentType":"VOCABULARY","skill":"READING","questionType":"MULT_CHOICE","tier":1,
                             "questionText":"What does \"rent\" mean?","audioUrl":null,
                             "metadata":{"options":["tiền thuê nhà","tiền cọc"]}}],
               "questionVocabularies":[{"questionId":1,"vocabularyId":1,"relationType":"TARGET"}],
               "exams":[{"id":1,"code":"EXAM_HOUSING_LV2","buildingCode":"HOUSING","targetLevel":2,"blueprintCode":"BLUEPRINT_HOUSING_LV2",
                         "questionCount":10,
                         "requirement":{"requiredCardCount":30,"requiredKnowledge":200,"requiredBlueprintShards":0},
                         "questionIds":[3,12]}]}"""
        )
        val rows = pack.toRows()

        assertTrue(rows.vocabularies.all { it.packCode == "HOUSING:1" })
        assertEquals(listOf("My rent is due."), rows.vocabularies.single().examples)
        assertEquals(
            """{"options":["tiền thuê nhà","tiền cọc"]}""",
            rows.questions.single().metadata
        )
        assertEquals(30, rows.examRequirements.single().requiredCardCount)
        assertEquals(listOf(3L, 12L), rows.examQuestions.map { it.questionId })
        assertEquals("rent", rows.vocabularies.single().toDomain().word)
    }

    @Test
    fun `examples survive the Room type converter round trip, including quotes and Vietnamese`() {
        val converters = Converters()
        val examples = listOf("The deposit is equal to one month's rent.", "Nói \"xin chào\" nhé")
        assertEquals(examples, converters.toStringList(converters.fromStringList(examples)))
        assertEquals(emptyList<String>(), converters.toStringList(""))
    }

    @Test
    fun `a question in a pack never has answer fields`() {
        // DTO không có trường answer/explanation: nếu server lỡ gửi, ignoreUnknownKeys bỏ qua và
        // Room không lưu.
        val pack = json.decodeFromString(
            PackDto.serializer(),
            """{"code":"HOUSING:1","version":1,"questions":[{"id":9,"contentType":"VOCABULARY","skill":"WRITING",
               "questionType":"FILL_BLANK","tier":2,"answer":"rent","explanation":"x","metadata":{"hint":"r _ _ t"}}]}"""
        )
        val stored = pack.toRows().questions.single().toString()
        assertFalse(stored.contains("answer"))
        assertFalse(stored.contains("explanation"))
    }

    @Test
    fun `pack maps collocations explanation and icon key`() {
        val pack = json.decodeFromString(
            PackDto.serializer(),
            """{"code":"HOUSING:1","version":1,
               "vocabularies":[{"id":1,"word":"rent","meaning":"tiền thuê nhà","wordType":"NOUN","ipa":"/rent/",
                                "examples":["My rent is due."],"imageUrl":null,"themeCode":"HOUSE","level":1,"difficultyRank":"D",
                                "collocations":["pay the rent"],"explanation":"Khoản trả hằng tháng.","iconKey":"key"}]}"""
        )
        val entity = pack.toRows().vocabularies.single()
        assertEquals(listOf("pay the rent"), entity.collocations)
        assertEquals("Khoản trả hằng tháng.", entity.explanation)
        assertEquals("key", entity.iconKey)

        val domain = entity.toDomain()
        assertEquals(listOf("pay the rent"), domain.collocations)
        assertEquals("Khoản trả hằng tháng.", domain.explanation)
        assertEquals("key", domain.iconKey)
    }

    @Test
    fun `old pack json without new fields still parses`() {
        val pack = json.decodeFromString(
            PackDto.serializer(),
            """{"code":"HOUSING:1","version":1,
               "vocabularies":[{"id":1,"word":"rent","meaning":"tiền thuê nhà","wordType":"NOUN","ipa":"/rent/",
                                "examples":["My rent is due."],"imageUrl":null,"themeCode":"HOUSE","level":1,"difficultyRank":"D"}]}"""
        )
        val entity = pack.toRows().vocabularies.single()
        assertEquals(emptyList<String>(), entity.collocations)
        assertEquals(null, entity.explanation)
        assertEquals(null, entity.iconKey)
    }
}
