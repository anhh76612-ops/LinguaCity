package com.linguacity.backend.content;

import com.linguacity.backend.content.entity.*;
import com.linguacity.backend.content.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * TC-VS2-01 → TC-VS2-06 (docs/06-testing/test-plan.md §4). Chạy trên H2 với dữ liệu mẫu nhỏ;
 * seed thật (V003) được kiểm ở TC-VS2-11 trên PostgreSQL.
 */
@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:linguacity_test;DB_CLOSE_DELAY=-1",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect",
        "spring.jpa.show-sql=false"
})
@Transactional
class ContentApiTests {

    private static final String GUEST = UUID.randomUUID().toString();

    @Autowired private WebApplicationContext context;
    @Autowired private ThemeRepository themes;
    @Autowired private BuildingRepository buildings;
    @Autowired private BuildingThemeRepository buildingThemes;
    @Autowired private BuildingLevelRepository buildingLevels;
    @Autowired private BlueprintRepository blueprints;
    @Autowired private VocabularyRepository vocabularies;
    @Autowired private QuestionRepository questions;
    @Autowired private QuestionVocabularyRepository questionVocabularies;
    @Autowired private ExamRepository exams;
    @Autowired private ExamRequirementRepository examRequirements;
    @Autowired private ExamQuestionRepository examQuestions;
    @Autowired private ContentPackRepository packs;

    private MockMvc api;
    private Long housingId;

    @BeforeEach
    void seed() {
        api = MockMvcBuilders.webAppContextSetup(context).build();

        Theme daily = theme("DAILY_LIFE");
        Theme house = theme("HOUSE");
        Theme transport = theme("TRANSPORTATION");

        Building housing = building("HOUSING", 1);
        Building road = building("ROAD", 2);
        housingId = housing.getId();
        link(housing, daily);
        link(housing, house);
        link(road, transport);

        BuildingLevel l1 = new BuildingLevel();
        l1.setId(new BuildingLevelId(housing.getId(), 1));
        l1.setKnowledgeCost(100);
        l1.setConstructionTime(10L);
        l1.setRequiredCollected(20);
        buildingLevels.save(l1);

        Blueprint bp = new Blueprint();
        bp.setCode("BLUEPRINT_HOUSING_LV2");
        bp.setBuildingId(housing.getId());
        bp.setTargetLevel(2);
        blueprints.save(bp);

        Vocabulary rent = vocab("rent", house, 1);
        Vocabulary bill = vocab("bill", daily, 1);
        vocab("ticket", transport, 1);   // chủ đề của ROAD: không được lọt vào gói HOUSING:1
        vocab("mortgage", house, 2);     // Level 2: không được lọt vào gói HOUSING:1

        Question q1 = question(
                1, "MULT_CHOICE", "{\"options\":[\"tiền thuê nhà\",\"hoá đơn\"]}", "tiền thuê nhà");
        Question q2 = question(3, "FILL_BLANK", "{\"sentence\":\"Pay the ___.\"}", "bill");
        target(q1, rent);
        target(q2, bill);
        QuestionVocabulary context = new QuestionVocabulary();
        context.setId(new QuestionVocabularyId(q2.getId(), rent.getId()));
        context.setRelationType("CONTEXT");
        questionVocabularies.save(context);

        Exam exam = new Exam();
        exam.setCode("EXAM_HOUSING_LV2");
        exam.setBuildingId(housing.getId());
        exam.setTargetLevel(2);
        exam.setRewardBlueprintId(bp.getId());
        exam.setQuestionCount(10);
        exams.save(exam);
        ExamRequirement req = new ExamRequirement();
        req.setExamId(exam.getId());
        req.setRequiredCardCount(30);
        req.setRequiredKnowledge(200);
        req.setRequiredBlueprintShards(0);
        examRequirements.save(req);
        ExamQuestion eq = new ExamQuestion();
        eq.setId(new ExamQuestionId(exam.getId(), q2.getId()));
        examQuestions.save(eq);

        pack("CORE", null, null, 3);
        pack("HOUSING:1", housing.getId(), 1, 1);
    }

    // TC-VS2-01
    @Test
    void manifestListsEveryPackWithItsVersion() throws Exception {
        api.perform(get("/api/v1/content/manifest").header("X-Guest-UUID", GUEST))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.serverTime").exists())
                .andExpect(jsonPath("$.packs.length()").value(2))
                .andExpect(jsonPath("$.packs[0].code").value("CORE"))
                .andExpect(jsonPath("$.packs[0].version").value(3))
                .andExpect(jsonPath("$.packs[0].buildingCode").doesNotExist())
                .andExpect(jsonPath("$.packs[1].code").value("HOUSING:1"))
                .andExpect(jsonPath("$.packs[1].buildingCode").value("HOUSING"))
                .andExpect(jsonPath("$.packs[1].level").value(1));
    }

    // TC-VS2-02
    @Test
    void coreContainsWorldDataWithManyThemesPerBuilding() throws Exception {
        api.perform(get("/api/v1/content/core").header("X-Guest-UUID", GUEST))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.version").value(3))
                .andExpect(jsonPath("$.themes.length()").value(3))
                .andExpect(jsonPath("$.buildings[0].code").value("HOUSING"))
                .andExpect(jsonPath("$.buildings[0].themeCodes", contains("DAILY_LIFE", "HOUSE")))
                .andExpect(jsonPath("$.buildings[1].themeCodes", contains("TRANSPORTATION")))
                .andExpect(jsonPath("$.buildingLevels[0].buildingCode").value("HOUSING"))
                .andExpect(jsonPath("$.buildingLevels[0].requiredCollected").value(20))
                .andExpect(jsonPath("$.buildingLevels[0].constructionTimeSeconds").value(10))
                .andExpect(jsonPath("$.blueprints[0].code").value("BLUEPRINT_HOUSING_LV2"))
                .andExpect(jsonPath("$.achievements").isArray())
                .andExpect(jsonPath("$.cosmetics").isArray());
    }

    // TC-VS2-03
    @Test
    void packContainsOnlyThisBuildingAndLevel() throws Exception {
        api.perform(get("/api/v1/content/packs/HOUSING/1").header("X-Guest-UUID", GUEST))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("HOUSING:1"))
                .andExpect(jsonPath("$.vocabularies[*].word", containsInAnyOrder("rent", "bill")))
                .andExpect(jsonPath("$.vocabularies[0].examples[0]").value("rent example"))
                .andExpect(jsonPath("$.vocabularies[0].themeCode").value("HOUSE"))
                .andExpect(jsonPath("$.questions.length()").value(2))
                .andExpect(jsonPath("$.questions[0].metadata.options[0]").value("tiền thuê nhà"))
                .andExpect(jsonPath("$.questionVocabularies.length()").value(3))
                .andExpect(jsonPath("$.exams[0].code").value("EXAM_HOUSING_LV2"))
                .andExpect(jsonPath("$.exams[0].blueprintCode").value("BLUEPRINT_HOUSING_LV2"))
                .andExpect(jsonPath("$.exams[0].requirement.requiredCardCount").value(30))
                .andExpect(jsonPath("$.exams[0].questionIds.length()").value(1));
    }

    @Test
    void packExposesCollocationsExplanationAndIconKey() throws Exception {
        Vocabulary v = vocabularies.findAll().stream()
                .filter(x -> x.getWord().equals("rent")).findFirst().orElseThrow();
        v.setCollocations("[\"pay the rent\",\"monthly rent\"]");
        v.setExplanation("Khoản trả hằng tháng.");
        v.setIconKey("key");
        vocabularies.save(v);
        api.perform(get("/api/v1/content/packs/HOUSING/1").header("X-Guest-UUID", GUEST))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.vocabularies[?(@.word=='rent')].collocations")
                        .value(contains(contains("pay the rent", "monthly rent"))))
                .andExpect(jsonPath("$.vocabularies[?(@.word=='rent')].explanation")
                        .value(contains("Khoản trả hằng tháng.")))
                .andExpect(jsonPath("$.vocabularies[?(@.word=='rent')].iconKey")
                        .value(contains("key")));
    }

    @Test
    void packReturnsEmptyCollocationsWhenNull() throws Exception {
        api.perform(get("/api/v1/content/packs/HOUSING/1").header("X-Guest-UUID", GUEST))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.vocabularies[?(@.word=='bill')].collocations")
                        .value(contains(empty())))
                .andExpect(jsonPath("$.vocabularies[?(@.word=='bill')].explanation")
                        .value(contains(nullValue())))
                .andExpect(jsonPath("$.vocabularies[?(@.word=='bill')].iconKey")
                        .value(contains(nullValue())));
    }

    // TC-VS2-04 (NFR-01, BR-CONTENT-07)
    @Test
    void packNeverLeaksAnswers() throws Exception {
        String body = api.perform(get("/api/v1/content/packs/housing/1").header(
                "X-Guest-UUID", GUEST))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questions[*].explanation").doesNotExist())
                .andReturn().getResponse().getContentAsString();
        assertAll(
                () -> assertFalse(body.contains("\"answer\"")),
                () -> assertFalse(body.contains("acceptedAnswers")),
                () -> assertFalse(body.contains("SECRET")));
    }

    // TC-VS2-05
    @Test
    void unknownPackIs404WithCode() throws Exception {
        api.perform(get("/api/v1/content/packs/ROAD/1").header("X-Guest-UUID", GUEST))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("PACK_NOT_FOUND"));
        api.perform(get("/api/v1/content/packs/CASTLE/1").header("X-Guest-UUID", GUEST))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("PACK_NOT_FOUND"));
    }

    // TC-VS2-06
    @Test
    void headerIsRequired() throws Exception {
        api.perform(get("/api/v1/content/manifest"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("MISSING_HEADER"));
        api.perform(get("/api/v1/content/core").header("X-Guest-UUID", "not-a-uuid"))
                .andExpect(status().isBadRequest());
    }

    // ---------- dữ liệu mẫu ----------
    private Theme theme(String code) {
        Theme t = new Theme();
        t.setCode(code);
        t.setName(code);
        return themes.save(t);
    }

    private Building building(String code, int order) {
        Building b = new Building();
        b.setCode(code);
        b.setName(code);
        b.setMaxLevel(3);
        b.setSortOrder(order);
        return buildings.save(b);
    }

    private void link(Building b, Theme t) {
        BuildingTheme bt = new BuildingTheme();
        bt.setId(new BuildingThemeId(b.getId(), t.getId()));
        buildingThemes.save(bt);
    }

    private Vocabulary vocab(String word, Theme theme, int level) {
        Vocabulary v = new Vocabulary();
        v.setWord(word);
        v.setMeaning("nghĩa của " + word);
        v.setWordType("NOUN");
        v.setIpa("/x/");
        v.setExamples("[\"" + word + " example\"]");
        v.setThemeId(theme.getId());
        v.setLevel(level);
        v.setDifficultyRank("D");
        return vocabularies.save(v);
    }

    private Question question(int tier, String type, String metadata, String answer) {
        Question q = new Question();
        q.setContentType("VOCABULARY");
        q.setSkill(tier == 1 ? "READING" : "WRITING");
        q.setQuestionType(type);
        q.setTier(tier);
        q.setQuestionText("Q");
        q.setAnswer(answer);
        q.setAcceptedAnswers("[\"SECRET-ALT\"]");
        q.setExplanation("SECRET explanation");
        q.setMetadata(metadata);
        return questions.save(q);
    }

    private void target(Question q, Vocabulary v) {
        QuestionVocabulary qv = new QuestionVocabulary();
        qv.setId(new QuestionVocabularyId(q.getId(), v.getId()));
        qv.setRelationType("TARGET");
        questionVocabularies.save(qv);
    }

    private void pack(String code, Long buildingId, Integer level, int version) {
        ContentPack p = new ContentPack();
        p.setCode(code);
        p.setScope("GLOBAL");
        p.setBuildingId(buildingId);
        p.setLevel(level);
        p.setVersion(version);
        p.setUpdatedAt(LocalDateTime.now());
        packs.save(p);
    }
}
