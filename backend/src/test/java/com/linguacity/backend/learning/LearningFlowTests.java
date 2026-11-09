package com.linguacity.backend.learning;

import com.linguacity.backend.achievement.entity.Achievement;
import com.linguacity.backend.achievement.repository.AchievementRepository;
import com.linguacity.backend.achievement.service.AchievementService;
import com.linguacity.backend.content.entity.*;
import com.linguacity.backend.content.repository.*;
import com.linguacity.backend.identity.entity.TutorialStep;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.learning.entity.LearningSession;
import com.linguacity.backend.learning.entity.UserVocabProgress;
import com.linguacity.backend.learning.repository.LearningSessionRepository;
import com.linguacity.backend.learning.repository.UserVocabProgressRepository;
import com.linguacity.backend.support.MutableClock;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.http.MediaType;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Phiên học, bài kiểm tra trình độ, xây House, danh hiệu — chạy end-to-end qua API trên H2 với đồng
 * hồ giả.
 * TC-VS3-01..14, TC-TUT-01..06, TC-ACH-01/03/04 (docs/06-testing/test-plan.md §5–§6).
 * DB riêng (linguacity_learning) để không đụng dữ liệu của ContentApiTests. Mỗi test dùng một người
 * chơi mới.
 */
@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:linguacity_learning;DB_CLOSE_DELAY=-1",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect",
        "spring.jpa.show-sql=false"
})
@Import(LearningFlowTests.ClockConfig.class)
class LearningFlowTests {

    @TestConfiguration
    static class ClockConfig {
        @Bean
        @Primary
        MutableClock testClock() {
            return new MutableClock(Instant.parse("2026-11-08T03:00:00Z")); // 10:00 giờ Việt Nam
        }
    }

    @Autowired private WebApplicationContext context;
    @Autowired private MutableClock clock;
    @Autowired private ObjectMapper json;
    @Autowired private ThemeRepository themes;
    @Autowired private BuildingRepository buildings;
    @Autowired private BuildingThemeRepository buildingThemes;
    @Autowired private BuildingLevelRepository buildingLevels;
    @Autowired private VocabularyRepository vocabularies;
    @Autowired private QuestionRepository questions;
    @Autowired private QuestionVocabularyRepository questionVocabularies;
    @Autowired private ContentPackRepository packs;
    @Autowired private AchievementRepository achievementCatalog;
    @Autowired private AchievementService achievementService;
    @Autowired private UserProfileRepository users;
    @Autowired private UserVocabProgressRepository progress;
    @Autowired private LearningSessionRepository sessions;

    private MockMvc api;

    @BeforeEach
    void setUp() {
        api = MockMvcBuilders.webAppContextSetup(context).build();
        if (buildings.findByCode("HOUSING").isEmpty()) {
            seedWorld();
        }
    }

    // =====================================================================================
    // Phiên học
    // =====================================================================================

    // TC-VS3-01, TC-VS3-02, TC-LEARN-01 (đợt 2: 20 từ / 30 câu, BR-LEARN-01)
    @Test
    void sessionHasThirtyItemsReadingFirstWithoutAnswersAndResumes() throws Exception {
        String user = newUser();
        ResultActions first = post(
                "/api/v1/learning/sessions", user, "{\"buildingCode\":\"HOUSING\"}")
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.totalCount").value(30))
                .andExpect(jsonPath("$.items.length()").value(30))
                .andExpect(jsonPath("$.vocabLevel").value(1))
                .andExpect(jsonPath("$.items[0].question.skill").value("READING"))
                .andExpect(jsonPath("$.items[19].question.skill").value("READING"))
                .andExpect(jsonPath("$.items[20].question.skill").value("WRITING"))
                .andExpect(jsonPath("$.items[29].question.skill").value("WRITING"))
                .andExpect(jsonPath("$.items[0].question.metadata.options").isArray());
        String body = first.andReturn().getResponse().getContentAsString();
        assertFalse(body.contains("\"answer\""));
        assertFalse(body.contains("explanation"));
        assertFalse(body.contains("alt-"));
        JsonNode s = json.readTree(body);
        Set<Long> words = new HashSet<>();
        s.get("items").forEach(i -> words.add(i.get("vocabularyId").asLong()));
        assertEquals(20, words.size());
        // câu viết 21–30 thuộc 10 từ khác nhau nằm trong 20 từ của phần đọc
        Set<Long> readingWords = new HashSet<>();
        Set<Long> writingWords = new HashSet<>();
        for (int i = 0; i < 30; i++) {
            long vocab = s.get("items").get(i).get("vocabularyId").asLong();
            (i < 20 ? readingWords : writingWords).add(vocab);
        }
        assertEquals(20, readingWords.size());
        assertEquals(10, writingWords.size());
        assertTrue(readingWords.containsAll(writingWords));

        post("/api/v1/learning/sessions", user, "{\"buildingCode\":\"housing\"}")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sessionId").value(s.get("sessionId").asString()));
    }

    // TC-VS3-03, TC-VS3-06, TC-VS3-08
    @Test
    void answeringUpdatesMasteryCollectsOnFirstCorrectAndRejectsResubmit() throws Exception {
        String user = newUser();
        JsonNode s = start(user);
        String id = s.get("sessionId").asString();
        JsonNode first = s.get("items").get(0);
        long vocab = first.get("vocabularyId").asLong();

        answer(id, user, 1, "sai bét")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isCorrect").value(false))
                .andExpect(jsonPath("$.correctAnswer").value(answerOf(first)))
                .andExpect(jsonPath("$.explanation").exists())
                .andExpect(jsonPath("$.masteryAfter").value(0))
                .andExpect(jsonPath("$.collectedNow").value(false));
        answer(id, user, 1, answerOf(first))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("ALREADY_ANSWERED"));

        int writingNo = itemNoOf(s, vocab, "WRITING");
        JsonNode writing = s.get("items").get(writingNo - 1);
        answer(id, user, writingNo, "  " + answerOf(writing).toUpperCase() + " ")
                .andExpect(jsonPath("$.isCorrect").value(true))
                .andExpect(jsonPath("$.masteryAfter").value(1))
                .andExpect(jsonPath("$.collectedNow").value(true));

        UserVocabProgress p = progress.findByUserIdAndVocabularyId(
                UUID.fromString(user), vocab).orElseThrow();
        assertNotNull(p.getCollectedAt());
        assertNotNull(p.getFirstSeenAt());

        api.perform(get("/api/v1/users/me/vocab-progress").header("X-Guest-UUID", user))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items[?(@.vocabularyId == " + vocab + ")].collected")
                        .value(contains(true)))
                .andExpect(jsonPath("$.items[?(@.vocabularyId == " + vocab + ")].maxMastery")
                        .value(contains(vocab % 5 == 0 ? 15 : 10)));
    }

    @Test
    void correctAnswerSetsLastCorrectAt() throws Exception {
        String user = newUser();
        JsonNode s = start(user);
        String id = s.get("sessionId").asString();
        JsonNode first = s.get("items").get(0);
        long vocab = first.get("vocabularyId").asLong();

        answer(id, user, 1, answerOf(first))
                .andExpect(jsonPath("$.isCorrect").value(true));

        UserVocabProgress p = progress.findByUserIdAndVocabularyId(
                UUID.fromString(user), vocab).orElseThrow();
        assertEquals(LocalDateTime.ofInstant(clock.instant(), ZoneOffset.UTC), p.getLastCorrectAt());
        api.perform(get("/api/v1/users/me/vocab-progress").header("X-Guest-UUID", user))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items[0].lastCorrectAt").isNotEmpty());
    }

    @Test
    void wrongAnswerKeepsPreviousLastCorrectAt() throws Exception {
        String user = newUser();
        JsonNode s = start(user);
        String id = s.get("sessionId").asString();
        JsonNode first = s.get("items").get(0);
        long vocab = first.get("vocabularyId").asLong();
        LocalDateTime correctAt = LocalDateTime.ofInstant(clock.instant(), ZoneOffset.UTC);

        answer(id, user, 1, answerOf(first)).andExpect(jsonPath("$.isCorrect").value(true));
        clock.advance(Duration.ofMinutes(5));
        int writingNo = itemNoOf(s, vocab, "WRITING");
        answer(id, user, writingNo, "sai bét").andExpect(jsonPath("$.isCorrect").value(false));

        UserVocabProgress p = progress.findByUserIdAndVocabularyId(
                UUID.fromString(user), vocab).orElseThrow();
        assertEquals(correctAt, p.getLastCorrectAt());
        assertEquals(correctAt.plusMinutes(5), p.getLastReviewedAt());
    }

    @Test
    void wrongFirstAnswerLeavesLastCorrectAtNull() throws Exception {
        String user = newUser();
        JsonNode s = start(user);
        String id = s.get("sessionId").asString();
        long vocab = s.get("items").get(0).get("vocabularyId").asLong();

        answer(id, user, 1, "sai bét").andExpect(jsonPath("$.isCorrect").value(false));

        UserVocabProgress p = progress.findByUserIdAndVocabularyId(
                UUID.fromString(user), vocab).orElseThrow();
        assertNull(p.getLastCorrectAt());
        assertNotNull(p.getFirstSeenAt());
    }

    // TC-VS3-09, TC-VS3-11, TC-VS3-12
    @Test
    void completingAwardsKpOnceAndRequiresEveryAnswer() throws Exception {
        String user = newUser();
        JsonNode s = start(user);
        String id = s.get("sessionId").asString();

        // đợt 2: phiên 30 câu; 25/30 = 83% ≥ 80% nên có thưởng
        answerItems(id, user, s, 25, 29);
        complete(id, user).andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("INCOMPLETE"));
        answer(id, user, 30, "sai");

        complete(id, user)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.correct").value(25))
                .andExpect(jsonPath("$.kpBase").value(125))
                .andExpect(jsonPath("$.kpBonus").value(20))
                .andExpect(jsonPath("$.kpAwarded").value(145))
                .andExpect(jsonPath("$.dailySessionIndex").value(1))
                .andExpect(jsonPath("$.profile.knowledgePoints").value(145))
                .andExpect(jsonPath("$.collection.total").value(30));
        complete(id, user)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.kpAwarded").value(145))
                .andExpect(jsonPath("$.profile.knowledgePoints").value(145));
        assertEquals(145, users.findById(UUID.fromString(user)).orElseThrow().getKnowledgePoints());
        answer(
                id,
                user,
                1,
                "x").andExpect(status().isConflict())
                        .andExpect(jsonPath("$.code").value("SESSION_CLOSED"));
    }

    // TC-VS3-10
    @Test
    void sixthSessionOfTheDayGivesReducedKp() throws Exception {
        String user = newUser();
        for (int n = 1; n <= 6; n++) {
            JsonNode s = start(user);
            String id = s.get("sessionId").asString();
            answerItems(id, user, s, 30, 30);
            ResultActions done = complete(id, user)
                    .andExpect(jsonPath("$.dailySessionIndex").value(n));
            // 30 đúng × 5 + 20 = 170; bài thứ 6: round(170 × 0.2) = 34
            done.andExpect(jsonPath("$.kpAwarded").value(n <= 5 ? 170 : 34));
        }
        assertEquals(
                5 * 170 + 34,
                users.findById(UUID.fromString(user)).orElseThrow().getKnowledgePoints());
    }

    // TC-VS3-07
    @Test
    void expiredSessionKeepsMasteryButGivesNoKp() throws Exception {
        String user = newUser();
        JsonNode s = start(user);
        String id = s.get("sessionId").asString();
        answer(
                id,
                user,
                1,
                answerOf(s.get("items").get(0))).andExpect(jsonPath("$.isCorrect").value(true));

        clock.advance(Duration.ofMinutes(31));
        answer(
                id,
                user,
                2,
                "x").andExpect(status().isGone())
                        .andExpect(jsonPath("$.code").value("SESSION_EXPIRED"));
        complete(id, user).andExpect(status().isGone());
        api.perform(get("/api/v1/learning/sessions/" + id).header("X-Guest-UUID", user))
                .andExpect(jsonPath("$.status").value("EXPIRED"));

        long vocab = s.get("items").get(0).get("vocabularyId").asLong();
        assertEquals(
                1,
                progress.findByUserIdAndVocabularyId(
                        UUID.fromString(user), vocab).orElseThrow().getMasteryScore());
        assertEquals(0, users.findById(UUID.fromString(user)).orElseThrow().getKnowledgePoints());

        JsonNode fresh = start(user);
        assertNotEquals(id, fresh.get("sessionId").asString());
    }

    // TC-VS3-14: @Version chặn ghi đè bằng bản cũ (hai lệnh complete song song)
    @Test
    void staleSessionCannotOverwriteACompletedOne() throws Exception {
        String user = newUser();
        JsonNode s = start(user);
        String id = s.get("sessionId").asString();
        answerItems(id, user, s, 30, 30);
        LearningSession stale = sessions.findById(UUID.fromString(id)).orElseThrow();

        complete(id, user).andExpect(status().isOk());
        stale.setKpAwarded(999);
        assertThrows(
                ObjectOptimisticLockingFailureException.class, () -> sessions.saveAndFlush(stale));
    }

    @Test
    void buildingWithoutWordsHasNoLessons() throws Exception {
        String user = newUser();
        post("/api/v1/learning/sessions", user, "{\"buildingCode\":\"PARK\"}")
                .andExpect(status().isConflict()).andExpect(jsonPath("$.code").value("NO_CONTENT"));
        post("/api/v1/learning/sessions", user, "{\"buildingCode\":\"CASTLE\"}")
                .andExpect(status().isNotFound());
    }

    // =====================================================================================
    // Tutorial
    // =====================================================================================

    // TC-TUT-01
    @Test
    void clientMayOnlyTakeAllowedTutorialSteps() throws Exception {
        String user = newUser();
        api.perform(get("/api/v1/users/me").header("X-Guest-UUID", user))
                .andExpect(jsonPath("$.tutorialStep").value("INTRO"));
        put("/api/v1/users/me/tutorial/step", user, "{\"step\":\"TOUR\"}")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("INVALID_STEP"))
                .andExpect(jsonPath("$.details.current").value("INTRO"));
        put("/api/v1/users/me/tutorial/step", user, "{\"step\":\"PLACEMENT\"}")
                .andExpect(status().isOk())
                        .andExpect(jsonPath("$.tutorialStep").value("PLACEMENT"));
        put(
                "/api/v1/users/me/tutorial/step",
                user,
                "{\"step\":\"PLACEMENT\"}").andExpect(status().isOk());
        put(
                "/api/v1/users/me/tutorial/step",
                user,
                "{\"step\":\"LEARN_HOUSE\"}").andExpect(status().isConflict());
    }

    // TC-TUT-02, TC-TUT-03, TC-ACH-03 (FLAWLESS, COMBO10)
    @Test
    void placementHasThirtyQuestionsHarderAndHarderAndRewardsTheWelcomeGift() throws Exception {
        String user = newUser();
        post("/api/v1/tutorial/placement", user, "").andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("INVALID_STEP"));
        put("/api/v1/users/me/tutorial/step", user, "{\"step\":\"PLACEMENT\"}");

        JsonNode s = json.readTree(post("/api/v1/tutorial/placement", user, "")
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.type").value("PLACEMENT"))
                .andExpect(jsonPath("$.totalCount").value(30))
                .andReturn().getResponse().getContentAsString());
        Set<Long> words = new HashSet<>();
        for (int i = 0; i < 30; i++) {
            JsonNode item = s.get("items").get(i);
            words.add(item.get("vocabularyId").asLong());
            assertEquals(
                    i < 10 ? 1 : i < 20 ? 2 : 3,
                    item.get("question").get("tier").asInt(),
                    "item " + (i + 1));
        }
        assertEquals(20, words.size());

        String id = s.get("sessionId").asString();
        answerItems(id, user, s, 30, 30);
        complete(id, user)
                .andExpect(jsonPath("$.kpAwarded").value(30 * 3 + 100))
                .andExpect(jsonPath("$.tutorialStep").value("LEARN_HOUSE"))
                .andExpect(jsonPath(
                        "$.newAchievements",
                        hasItems("GOOD_START", "FLAWLESS", "TOP_ENTRANT", "COMBO10")));
    }

    // TC-ACH-01: phải ĐÚNG HƠN 15 từ (khác nhau)
    @Test
    void goodStartNeedsMoreThanFifteenDistinctWords() throws Exception {
        assertFalse(placementWithCorrectWords(15).contains("GOOD_START"));
        assertTrue(placementWithCorrectWords(16).contains("GOOD_START"));
    }

    // TC-ACH-02 (phần chưa đủ 50 mẫu: ngưỡng cố định 27/30)
    @Test
    void topEntrantFallsBackToTwentySevenOutOfThirty() throws Exception {
        assertTrue(placementWithCorrectItems(27).contains("TOP_ENTRANT"));
        assertFalse(placementWithCorrectItems(26).contains("TOP_ENTRANT"));
    }

    // TC-TUT-04, TC-TUT-05, TC-TUT-06
    @Test
    void learningAtHouseThenBuildingItMovesTheTutorialForward() throws Exception {
        String user = newUser();
        UUID uid = UUID.fromString(user);
        setStep(uid, TutorialStep.LEARN_HOUSE);

        JsonNode s = start(user);
        String id = s.get("sessionId").asString();
        answerItems(id, user, s, 0, 30);
        complete(id, user).andExpect(jsonPath("$.tutorialStep").value("BUILD_HOUSE"));

        post("/api/v1/buildings/HOUSING/build", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("REQUIREMENTS_NOT_MET"))
                .andExpect(jsonPath("$.details.missingCollected").value(20))
                .andExpect(jsonPath("$.details.missingKnowledge").value(100));

        collectWords(uid, 20);
        UserProfile p = users.findById(uid).orElseThrow();
        p.setKnowledgePoints(150);
        users.save(p);

        post("/api/v1/buildings/HOUSING/build", user, "")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.building.status").value("UPGRADING"))
                .andExpect(jsonPath("$.building.targetLevel").value(1))
                .andExpect(jsonPath("$.profile.knowledgePoints").value(50));
        post(
                "/api/v1/buildings/HOUSING/build",
                user,
                "").andExpect(jsonPath("$.code").value("BUSY"));
        api.perform(get("/api/v1/city").header("X-Guest-UUID", user))
                .andExpect(jsonPath("$.buildings[?(@.code == 'HOUSING')].status")
                        .value(contains("UPGRADING")))
                .andExpect(jsonPath("$.tutorialStep").value("BUILD_HOUSE"));

        clock.advance(Duration.ofSeconds(11));
        api.perform(get("/api/v1/city").header("X-Guest-UUID", user))
                .andExpect(jsonPath("$.buildings.length()").value(2))
                .andExpect(jsonPath("$.buildings[?(@.code == 'HOUSING')].currentLevel")
                        .value(contains(1)))
                .andExpect(jsonPath("$.buildings[?(@.code == 'HOUSING')].status")
                        .value(contains("IDLE")))
                .andExpect(jsonPath("$.buildings[?(@.code == 'PARK')].currentLevel")
                        .value(contains(0)))
                .andExpect(jsonPath("$.tutorialStep").value("ENTER_HOUSE"));
        // đợt 2: build dùng chung mọi level; seed này không có cấu hình Lv2 nên NO_CONTENT
        post(
                "/api/v1/buildings/HOUSING/build",
                user,
                "").andExpect(status().isConflict())
                        .andExpect(jsonPath("$.code").value("NO_CONTENT"));

        // TC-LEARN-02 (BR-LEARN-09): xây Lv1 khi mới có 20/30 từ → level học là 2 (seed chưa có
        // từ Lv2), nhưng 10 từ Lv1 chưa sưu tầm vẫn phải có trong bài: không còn ngõ cụt
        JsonNode after = json.readTree(post(
                "/api/v1/learning/sessions", user, "{\"buildingCode\":\"HOUSING\"}")
                .andExpect(status().isCreated()).andExpect(jsonPath("$.vocabLevel").value(2))
                .andReturn().getResponse().getContentAsString());
        Set<Long> uncollected = new HashSet<>();
        vocabularies.findAll().stream().filter(v -> v.getLevel() == 1).forEach(v -> {
            boolean collected = progress.findByUserIdAndVocabularyId(uid, v.getId())
                    .map(row -> row.getCollectedAt() != null).orElse(false);
            if (!collected) {
                uncollected.add(v.getId());
            }
        });
        assertEquals(10, uncollected.size());
        Set<Long> offered = new HashSet<>();
        after.get("items").forEach(i -> offered.add(i.get("vocabularyId").asLong()));
        assertTrue(offered.containsAll(uncollected), "mọi từ Lv1 chưa sưu tầm phải có trong bài");
    }

    // =====================================================================================
    // Danh hiệu
    // =====================================================================================

    // TC-ACH-04
    @Test
    void onlyEarnedTitlesCanBeEquipped() throws Exception {
        String user = newUser();
        put("/api/v1/users/me/equipped-title", user, "{\"code\":\"GOOD_START\"}")
                .andExpect(status().isConflict()).andExpect(jsonPath("$.code").value("NOT_EARNED"));
        achievementService.grant(
                UUID.fromString(user),
                "GOOD_START",
                LocalDateTime.now(clock.withZone(ZoneOffset.UTC)));
        put("/api/v1/users/me/equipped-title", user, "{\"code\":\"GOOD_START\"}")
                .andExpect(status().isOk())
                        .andExpect(jsonPath("$.equippedTitle").value("GOOD_START"));
        api.perform(get("/api/v1/users/me/achievements").header("X-Guest-UUID", user))
                .andExpect(jsonPath("$.equipped").value("GOOD_START"))
                .andExpect(jsonPath("$.items[0].code").value("GOOD_START"));
        put("/api/v1/users/me/equipped-title", user, "{\"code\":null}")
                .andExpect(jsonPath("$.equippedTitle").doesNotExist());
    }

    @Test
    void coreListsAchievementsButHidesSecretConditions() throws Exception {
        api.perform(get("/api/v1/content/core").header("X-Guest-UUID", newUser()))
                .andExpect(jsonPath("$.achievements.length()").value(7))
                .andExpect(jsonPath("$.achievements[?(@.code == 'FLAWLESS')].hidden")
                        .value(contains(true)))
                .andExpect(jsonPath("$.achievements[?(@.code == 'FLAWLESS')].description")
                        .isEmpty())
                .andExpect(jsonPath("$.achievements[?(@.code == 'GOOD_START')].description")
                        .isNotEmpty());
    }

    @Test
    void tutorialCompletionGrantsNewResident() throws Exception {
        String user = newUser();
        api.perform(MockMvcRequestBuilders.post("/api/v1/users/me/tutorial/complete")
                        .header("X-Guest-UUID", user))
                .andExpect(status().isConflict()); // TC-TUT-07: còn ở INTRO
        setStep(UUID.fromString(user), TutorialStep.TOUR);
        api.perform(MockMvcRequestBuilders.post("/api/v1/users/me/tutorial/complete")
                        .header("X-Guest-UUID", user))
                .andExpect(status().isOk());
        api.perform(get("/api/v1/users/me/achievements").header("X-Guest-UUID", user))
                .andExpect(jsonPath("$.items[*].code", hasItem("NEW_RESIDENT")));
        api.perform(get("/api/v1/users/me").header("X-Guest-UUID", user))
                .andExpect(jsonPath("$.tutorialStep").value("DONE"));
    }

    // =====================================================================================
    // Hỗ trợ
    // =====================================================================================

    private List<String> placementWithCorrectWords(int correctWords) throws Exception {
        String user = newUser();
        setStep(UUID.fromString(user), TutorialStep.PLACEMENT);
        JsonNode s = json.readTree(post(
                "/api/v1/tutorial/placement",
                user,
                "").andReturn().getResponse().getContentAsString());
        List<Long> order = new ArrayList<>();
        s.get("items").forEach(i -> {
            long v = i.get("vocabularyId").asLong();
            if (!order.contains(v)) {
                order.add(v);
            }
        });
        Set<Long> good = new HashSet<>(order.subList(0, correctWords));
        String id = s.get("sessionId").asString();
        for (JsonNode item : s.get("items")) {
            boolean ok = good.contains(item.get("vocabularyId").asLong());
            answer(id, user, item.get("itemNo").asInt(), ok ? answerOf(item) : "sai");
        }
        return achievementsOf(complete(id, user));
    }

    private List<String> placementWithCorrectItems(int correctItems) throws Exception {
        String user = newUser();
        setStep(UUID.fromString(user), TutorialStep.PLACEMENT);
        JsonNode s = json.readTree(post(
                "/api/v1/tutorial/placement",
                user,
                "").andReturn().getResponse().getContentAsString());
        String id = s.get("sessionId").asString();
        answerItems(id, user, s, correctItems, 30);
        return achievementsOf(complete(id, user));
    }

    private List<String> achievementsOf(ResultActions result) throws Exception {
        JsonNode body = json.readTree(result.andReturn().getResponse().getContentAsString());
        List<String> codes = new ArrayList<>();
        body.get("newAchievements").forEach(n -> codes.add(n.asString()));
        return codes;
    }

    /** Trả lời {@code count} câu đầu: {@code correct} câu đầu đúng, còn lại sai. */
    private void answerItems(
            String id, String user, JsonNode session, int correct, int count) throws Exception {
        for (int i = 0; i < count; i++) {
            JsonNode item = session.get("items").get(i);
            answer(id, user, item.get("itemNo").asInt(), i < correct ? answerOf(item) : "sai")
                    .andExpect(status().isOk());
        }
    }

    private String answerOf(JsonNode item) {
        return questions.findById(item.get("question").get("id").asLong()).orElseThrow()
                .getAnswer();
    }

    private int itemNoOf(JsonNode session, long vocabularyId, String skill) {
        for (JsonNode item : session.get("items")) {
            if (item.get("vocabularyId").asLong() == vocabularyId
                    && skill.equals(item.get("question").get("skill").asString())) {
                return item.get("itemNo").asInt();
            }
        }
        throw new AssertionError("no " + skill + " item for " + vocabularyId);
    }

    private void collectWords(UUID user, int count) {
        LocalDateTime now = LocalDateTime.now(clock.withZone(ZoneOffset.UTC));
        vocabularies.findAll().stream().filter(v -> v.getLevel() == 1).limit(count).forEach(v -> {
            UserVocabProgress p = progress.findByUserIdAndVocabularyId(
                    user, v.getId()).orElseGet(UserVocabProgress::new);
            p.setUserId(user);
            p.setVocabularyId(v.getId());
            p.setMasteryScore(Math.max(1, Optional.ofNullable(p.getMasteryScore()).orElse(0)));
            p.setCollectedAt(now);
            p.setUpdatedAt(now);
            progress.save(p);
        });
    }

    private void setStep(UUID user, TutorialStep step) {
        UserProfile p = users.findById(user).orElseThrow();
        p.setTutorialStep(step);
        users.save(p);
    }

    private String newUser() throws Exception {
        String id = UUID.randomUUID().toString();
        api.perform(MockMvcRequestBuilders
                .post("/api/v1/users/onboard").header(
                        "X-Guest-UUID", id)).andExpect(status().isOk());
        return id;
    }

    private JsonNode start(String user) throws Exception {
        return json.readTree(post(
                "/api/v1/learning/sessions", user, "{\"buildingCode\":\"HOUSING\"}")
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString());
    }

    private ResultActions answer(
            String id, String user, int itemNo, String answer) throws Exception {
        return post("/api/v1/learning/sessions/" + id + "/items/" + itemNo + "/answer", user,
                json.writeValueAsString(Map.of("answer", answer)));
    }

    private ResultActions complete(String id, String user) throws Exception {
        return post("/api/v1/learning/sessions/" + id + "/complete", user, "");
    }

    private ResultActions post(String url, String user, String body) throws Exception {
        var req = MockMvcRequestBuilders.post(url)
                .header(
                "X-Guest-UUID", user);
        if (!body.isEmpty()) {
            req = req.contentType(MediaType.APPLICATION_JSON).content(body);
        }
        return api.perform(req);
    }

    private ResultActions put(String url, String user, String body) throws Exception {
        return api.perform(MockMvcRequestBuilders.put(url)
                .header("X-Guest-UUID", user)
                .contentType(MediaType.APPLICATION_JSON)
                .content(body));
    }

    /**
     * Thế giới nhỏ: HOUSING (30 từ Level 1, mỗi từ 3 câu tier 1–3) + PARK (chưa có nội dung) + 7
     * danh hiệu.
     */
    private void seedWorld() {
        Theme house = theme("HOUSE");
        Theme daily = theme("DAILY_LIFE");
        Building housing = building("HOUSING", 1);
        building("PARK", 2);
        link(housing, house);
        link(housing, daily);

        BuildingLevel l1 = new BuildingLevel();
        l1.setId(new BuildingLevelId(housing.getId(), 1));
        l1.setKnowledgeCost(100);
        l1.setConstructionTime(10L);
        l1.setRequiredCollected(20);
        buildingLevels.save(l1);

        for (int i = 1; i <= 30; i++) {
            Vocabulary v = new Vocabulary();
            v.setWord("word" + i);
            v.setMeaning("nghĩa " + i);
            v.setWordType("NOUN");
            v.setExamples("[\"example " + i + "\"]");
            v.setThemeId(i <= 15 ? house.getId() : daily.getId());
            v.setLevel(1);
            v.setDifficultyRank(i % 5 == 0 ? "C" : "D");
            v = vocabularies.save(v);
            question(
                    v,
                    1,
                    "READING",
                    "MULT_CHOICE",
                    v.getMeaning(),
                    "{\"options\":[\"" + v.getMeaning() + "\",\"khác\"]}");
            question(
                    v,
                    2,
                    "WRITING",
                    "FILL_BLANK",
                    v.getWord(),
                    "{\"sentence\":\"___\",\"hint\":\"w _ d\"}");
            question(v, 3, "WRITING", "FILL_BLANK", v.getWord(), "{\"sentence\":\"a ___ here\"}");
        }

        ContentPack core = new ContentPack();
        core.setCode("CORE");
        core.setScope("GLOBAL");
        core.setVersion(2);
        core.setUpdatedAt(LocalDateTime.now());
        packs.save(core);

        String[][] catalog = {
                {
                    "NEW_RESIDENT",
                    "EASY",
                    "TUTORIAL_DONE",
                    "0"
                }, {"GOOD_START", "EASY", "PLACEMENT_WORDS_CORRECT", "15"},
                {
                    "COLLECTOR",
                    "EASY",
                    "LEVEL_COLLECTED",
                    "0"
                }, {"TOP_ENTRANT", "HARD", "PLACEMENT_TOP_PERCENT", "90"},
                {
                    "DILIGENT",
                    "HARD",
                    "STREAK_DAYS",
                    "3"
                }, {"FLAWLESS", "HIDDEN", "PLACEMENT_PERFECT", "30"},
                {"COMBO10", "HIDDEN", "ANSWER_STREAK", "10"}};
        for (int i = 0; i < catalog.length; i++) {
            Achievement a = new Achievement();
            a.setCode(catalog[i][0]);
            a.setName(catalog[i][0]);
            a.setDescription("desc " + catalog[i][0]);
            a.setTier(catalog[i][1]);
            a.setConditionType(catalog[i][2]);
            a.setThreshold(Integer.parseInt(catalog[i][3]));
            a.setSortOrder(i + 1);
            achievementCatalog.save(a);
        }
    }

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

    private void question(
            Vocabulary v, int tier, String skill, String type, String answer, String metadata) {
        Question q = new Question();
        q.setContentType("VOCABULARY");
        q.setSkill(skill);
        q.setQuestionType(type);
        q.setTier(tier);
        q.setQuestionText("Q" + tier + " " + v.getWord());
        q.setAnswer(answer);
        q.setAcceptedAnswers(tier == 1 ? "[]" : "[\"alt-" + v.getWord() + "\"]");
        q.setExplanation("Giải thích cho " + v.getWord());
        q.setMetadata(metadata);
        q = questions.save(q);
        QuestionVocabulary qv = new QuestionVocabulary();
        qv.setId(new QuestionVocabularyId(q.getId(), v.getId()));
        qv.setRelationType("TARGET");
        questionVocabularies.save(qv);
    }
}
