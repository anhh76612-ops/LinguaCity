package com.linguacity.backend.progression;

import com.linguacity.backend.identity.entity.TutorialStep;
import com.linguacity.backend.support.MutableClock;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.test.web.servlet.ResultActions;
import tools.jackson.databind.JsonNode;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.not;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Đợt 2 (ADR-015, system-design §11): thi, nâng cấp, nhiệm vụ, sự kiện, luyện tập.
 * TC-EXAM-*, TC-UPG-*, TC-QUEST-*, TC-EVT-*, TC-PRAC-* (docs/06-testing/test-plan.md §10).
 * DB riêng; mỗi test một người chơi mới. Đồng hồ chỉ tua vài giờ trong cùng ngày giờ Việt Nam
 * (bắt đầu 10:00), các ca qua ngày nằm ở {@link StreakTests}.
 */
@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:linguacity_progression;DB_CLOSE_DELAY=-1",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect",
        "spring.jpa.show-sql=false"
})
@Import(ProgressionFlowTests.ClockConfig.class)
class ProgressionFlowTests extends ProgressionTestBase {

    @TestConfiguration
    static class ClockConfig {
        @Bean
        @Primary
        MutableClock testClock() {
            return new MutableClock(Instant.parse("2026-11-08T03:00:00Z")); // 10:00 giờ Việt Nam
        }
    }

    // =============================================================================================
    // Thi (UC_06–08)
    // =============================================================================================

    // TC-EXAM-01, TC-EXAM-02
    @Test
    void examCenterListsWhatIsMissingAndCountsOnlyWordsOfTheBuilding() throws Exception {
        String user = newDoneUser();
        collect(user, house1);
        collect(user, house2.subList(0, 8));
        collect(user, school1.subList(0, 10)); // từ SCHOOL không tính cho bài thi House
        setLevel(user, HOUSING, 1);
        setResources(user, 240, 1);

        getAs("/api/v1/exams?building=HOUSING", user)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.exams.length()").value(1))
                .andExpect(jsonPath("$.exams[0].code").value("EXAM_HOUSING_LV2"))
                .andExpect(jsonPath("$.exams[0].passPercent").value(80))
                .andExpect(jsonPath("$.exams[0].requirement.requiredCardCount").value(45))
                .andExpect(jsonPath("$.exams[0].requirement.requiredBuildingCode").value(SCHOOL))
                .andExpect(jsonPath("$.exams[0].requirement.requiredBuildingLevel").value(1))
                .andExpect(jsonPath("$.exams[0].progress.collected").value(38))
                .andExpect(jsonPath("$.exams[0].progress.knowledgePoints").value(240))
                .andExpect(jsonPath("$.exams[0].missing.collected").value(7))
                .andExpect(jsonPath("$.exams[0].missing.knowledge").value(0))
                .andExpect(jsonPath("$.exams[0].missing.building").value(true))
                .andExpect(jsonPath("$.exams[0].available").value(false))
                .andExpect(jsonPath("$.exams[0].passed").value(false));
    }

    // TC-EXAM-03
    @Test
    void startingWithoutRequirementsIsRejectedAndChargesNothing() throws Exception {
        String user = eligibleExamUser(150);
        setLevel(user, SCHOOL, 0);

        post("/api/v1/exams/EXAM_HOUSING_LV2/start", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("REQUIREMENTS_NOT_MET"))
                .andExpect(jsonPath("$.details.missing.collected").value(0))
                .andExpect(jsonPath("$.details.missing.knowledge").value(50))
                .andExpect(jsonPath("$.details.missing.building").value(true));
        assertEquals(150, profile(user).getKnowledgePoints());
    }

    // TC-EXAM-04, TC-EXAM-05
    @Test
    void startChargesTheFeeOnceHidesAnswersAndResumes() throws Exception {
        String user = eligibleExamUser(250);
        getAs("/api/v1/exams?building=HOUSING", user)
                .andExpect(jsonPath("$.exams[0].available").value(true));

        ResultActions started = post("/api/v1/exams/EXAM_HOUSING_LV2/start", user, "")
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value("IN_PROGRESS"))
                .andExpect(jsonPath("$.questions.length()").value(10))
                .andExpect(jsonPath("$.profile.knowledgePoints").value(50));
        String raw = started.andReturn().getResponse().getContentAsString();
        assertFalse(raw.contains("\"answer\""), raw);
        assertFalse(raw.contains("acceptedAnswers"), raw);
        assertFalse(raw.contains("explanation"), raw);
        assertFalse(raw.contains("alt-"), raw);

        JsonNode attempt = json.readTree(raw);
        Set<Integer> orders = new HashSet<>();
        Set<Long> questionIds = new HashSet<>();
        attempt.get("questions").forEach(q -> {
            orders.add(q.get("order").asInt());
            questionIds.add(q.get("questionId").asLong());
        });
        assertEquals(Set.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10), orders);
        assertEquals(10, questionIds.size());

        long attemptId = attempt.get("attemptId").asLong();
        post("/api/v1/exams/EXAM_HOUSING_LV2/start", user, "")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.attemptId").value(attemptId))
                .andExpect(jsonPath("$.questions[0].questionId")
                        .value(attempt.get("questions").get(0).get("questionId").asLong()));
        assertEquals(50, profile(user).getKnowledgePoints());
        getAs("/api/v1/exam-attempts/" + attemptId, user)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questions.length()").value(10));
        getAs("/api/v1/exams?building=HOUSING", user)
                .andExpect(jsonPath("$.exams[0].activeAttemptId").value(attemptId))
                .andExpect(jsonPath("$.exams[0].available").value(false));
    }

    // TC-EXAM-07
    @Test
    void submittingWithMissingAnswersListsThemAndKeepsTheAttemptOpen() throws Exception {
        String user = eligibleExamUser(250);
        JsonNode attempt = body(post("/api/v1/exams/EXAM_HOUSING_LV2/start", user, ""));
        long id = attempt.get("attemptId").asLong();

        List<Map<String, Object>> answers = examAnswers(attempt, 10);
        answers.remove(9);
        answers.get(0).put("answer", "   "); // chỉ khoảng trắng = chưa trả lời
        submit(id, user, answers)
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("INCOMPLETE"))
                .andExpect(jsonPath("$.details.missingOrders", contains(1, 10)));
        getAs("/api/v1/exam-attempts/" + id, user)
                .andExpect(jsonPath("$.status").value("IN_PROGRESS"));
    }

    // TC-EXAM-08, TC-EXAM-11, TC-EXAM-12, TC-EXAM-14, TC-UPG-08
    @Test
    void passingAtEightyPercentGrantsOneBlueprintAndCannotBeRepeated() throws Exception {
        String user = eligibleExamUser(250);
        JsonNode attempt = body(post("/api/v1/exams/EXAM_HOUSING_LV2/start", user, ""));
        long id = attempt.get("attemptId").asLong();

        List<Map<String, Object>> answers = examAnswers(attempt, 8);
        // chấm như phiên học: hoa/thường, khoảng trắng thừa, accepted_answers đều đúng
        String first = (String) answers.get(0).get("answer");
        answers.get(0).put("answer", "  " + first.toUpperCase() + " ");
        answers.get(1).put("answer", "alt-" + answers.get(1).get("answer"));

        submit(id, user, answers)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("PASSED"))
                .andExpect(jsonPath("$.correct").value(8))
                .andExpect(jsonPath("$.total").value(10))
                .andExpect(jsonPath("$.scorePercent").value(80))
                .andExpect(jsonPath("$.items[0].isCorrect").value(true))
                .andExpect(jsonPath("$.items[1].isCorrect").value(true))
                .andExpect(jsonPath("$.items[9].isCorrect").value(false))
                .andExpect(jsonPath("$.items[9].correctAnswer").isNotEmpty())
                .andExpect(jsonPath("$.items[9].explanation").isNotEmpty())
                .andExpect(jsonPath("$.blueprint.code").value("BLUEPRINT_HOUSING_LV2"))
                .andExpect(jsonPath("$.blueprint.quantity").value(1));
        assertEquals(1, blueprintCount(user));

        submit(id, user, answers)
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("ATTEMPT_CLOSED"));
        assertEquals(1, blueprintCount(user));

        post("/api/v1/exams/EXAM_HOUSING_LV2/start", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("ALREADY_PASSED"));
        getAs("/api/v1/exams?building=HOUSING", user)
                .andExpect(jsonPath("$.exams[0].passed").value(true))
                .andExpect(jsonPath("$.exams[0].available").value(false));
        getAs("/api/v1/city", user)
                .andExpect(jsonPath("$.blueprints.length()").value(1))
                .andExpect(jsonPath("$.blueprints[0].code").value("BLUEPRINT_HOUSING_LV2"))
                .andExpect(jsonPath("$.blueprints[0].buildingCode").value(HOUSING))
                .andExpect(jsonPath("$.blueprints[0].quantity").value(1));
    }

    // TC-EXAM-09
    @Test
    void failingAtSeventyPercentKeepsTheFeeAndAllowsANewPaidAttempt() throws Exception {
        String user = eligibleExamUser(450);
        JsonNode attempt = body(post("/api/v1/exams/EXAM_HOUSING_LV2/start", user, ""));
        long id = attempt.get("attemptId").asLong();

        submit(id, user, examAnswers(attempt, 7))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("FAILED"))
                .andExpect(jsonPath("$.scorePercent").value(70))
                .andExpect(jsonPath("$.blueprint").doesNotExist())
                .andExpect(jsonPath("$.profile.knowledgePoints").value(250));
        assertEquals(0, blueprintCount(user));

        JsonNode retry = body(post("/api/v1/exams/EXAM_HOUSING_LV2/start", user, "")
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.profile.knowledgePoints").value(50)));
        assertNotEquals(id, retry.get("attemptId").asLong());
    }

    // TC-EXAM-10
    @Test
    void submittingAppliesMasteryAndCollectsNewWords() throws Exception {
        String user = newDoneUser();
        collect(user, house1);
        collect(user, house2.subList(10, 25)); // pool Lv2 là 10 từ Lv2 đầu → chưa sưu tầm
        setLevel(user, HOUSING, 1);
        setLevel(user, SCHOOL, 1);
        setResources(user, 250, 0);

        JsonNode attempt = body(post("/api/v1/exams/EXAM_HOUSING_LV2/start", user, ""));
        List<Map<String, Object>> answers = examAnswers(attempt, 5);
        Map<Long, Integer> before = new LinkedHashMap<>();
        List<Long> vocabByOrder = new ArrayList<>();
        for (JsonNode q : attempt.get("questions")) {
            long vocab = targetOf(q.get("questionId").asLong());
            vocabByOrder.add(vocab);
            before.put(vocab, mastery(user, vocab));
        }
        submit(attempt.get("attemptId").asLong(), user, answers).andExpect(status().isOk());

        for (int i = 0; i < 10; i++) {
            long vocab = vocabByOrder.get(i);
            // ADR-017: đúng +1, sai giữ nguyên
            int expected = i < 5 ? before.get(vocab) + 1 : before.get(vocab);
            assertEquals(expected, mastery(user, vocab), "câu " + (i + 1));
            if (i < 5 && house2.contains(vocab)) {
                assertTrue(isCollected(user, vocab), "từ mới đúng trong bài thi được sưu tầm");
            }
        }
    }

    // TC-EXAM-13
    @Test
    void unknownExamsAndOtherPlayersAttemptsAreNotFound() throws Exception {
        String user = eligibleExamUser(250);
        post("/api/v1/exams/EXAM_NOPE/start", user, "")
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("EXAM_NOT_FOUND"));
        long id = body(post("/api/v1/exams/EXAM_HOUSING_LV2/start", user, ""))
                .get("attemptId").asLong();
        String stranger = newUser();
        getAs("/api/v1/exam-attempts/" + id, stranger)
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("ATTEMPT_NOT_FOUND"));
        submit(id, stranger, List.of())
                .andExpect(status().isNotFound());
    }

    // =============================================================================================
    // Nâng cấp (UC_10)
    // =============================================================================================

    // TC-UPG-01
    @Test
    void upgradingWithoutABlueprintIsRejectedAndChargesNothing() throws Exception {
        String user = newDoneUser();
        setLevel(user, HOUSING, 1);
        setResources(user, 500, 5);

        post("/api/v1/buildings/HOUSING/build", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("NEEDS_BLUEPRINT"))
                .andExpect(jsonPath("$.details.blueprintCode").value("BLUEPRINT_HOUSING_LV2"));
        assertEquals(500, profile(user).getKnowledgePoints());
        assertEquals(5, profile(user).getBlueprintShards());
    }

    // TC-UPG-02
    @Test
    void upgradingWithTooFewShardsOrKpListsWhatIsMissing() throws Exception {
        String user = newDoneUser();
        setLevel(user, HOUSING, 1);
        giveBlueprint(user, 1);
        setResources(user, 100, 1);

        post("/api/v1/buildings/HOUSING/build", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("REQUIREMENTS_NOT_MET"))
                .andExpect(jsonPath("$.details.missingShards").value(2))
                .andExpect(jsonPath("$.details.missingKnowledge").value(200));
        assertEquals(1, blueprintCount(user));
        assertEquals(100, profile(user).getKnowledgePoints());
        assertEquals(1, profile(user).getBlueprintShards());
    }

    // TC-UPG-03, TC-UPG-04, TC-UPG-05, TC-UPG-07
    @Test
    void upgradeSpendsBlueprintShardsAndKpThenFinishesOnServerTime() throws Exception {
        String user = newDoneUser();
        setLevel(user, HOUSING, 1);
        giveBlueprint(user, 1);
        setResources(user, 320, 4);

        post("/api/v1/buildings/HOUSING/build", user, "")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.building.status").value("UPGRADING"))
                .andExpect(jsonPath("$.building.targetLevel").value(2))
                .andExpect(jsonPath("$.profile.knowledgePoints").value(20))
                .andExpect(jsonPath("$.profile.blueprintShards").value(1));
        assertEquals(0, blueprintCount(user));
        getAs("/api/v1/city", user).andExpect(jsonPath("$.blueprints.length()").value(0));
        post("/api/v1/buildings/HOUSING/build", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("BUSY"));

        clock.advance(Duration.ofSeconds(3599));
        getAs("/api/v1/city", user)
                .andExpect(jsonPath("$.buildings[?(@.code == 'HOUSING')].status")
                        .value(contains("UPGRADING")));
        clock.advance(Duration.ofSeconds(1));
        getAs("/api/v1/city", user)
                .andExpect(jsonPath("$.buildings[?(@.code == 'HOUSING')].currentLevel")
                        .value(contains(2)))
                .andExpect(jsonPath("$.buildings[?(@.code == 'HOUSING')].status")
                        .value(contains("IDLE")));

        post("/api/v1/buildings/HOUSING/build", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("MAX_LEVEL"));
    }

    // TC-UPG-07 (thiếu cấu hình level)
    @Test
    void upgradingWithoutLevelConfigIsNoContent() throws Exception {
        String user = newDoneUser();
        setLevel(user, SCHOOL, 1); // SCHOOL chỉ có cấu hình Lv1
        setResources(user, 1000, 10);
        post("/api/v1/buildings/SCHOOL/build", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("NO_CONTENT"));
    }

    // =============================================================================================
    // Nhiệm vụ (UC_16, UC_17)
    // =============================================================================================

    // TC-QUEST-01..05
    @Test
    void mainQuestsAreDerivedFromStateAndClaimedInOrder() throws Exception {
        String user = newDoneUser();
        setLevel(user, HOUSING, 1); // người chơi cũ đã có House Lv1
        setLevel(user, SCHOOL, 1);  // đã xây School nhưng bước đó chưa tới lượt
        collect(user, school1.subList(0, 5));
        setResources(user, 0, 0);

        getAs("/api/v1/quests", user)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.main.length()").value(1))
                .andExpect(jsonPath("$.main[0].code").value("MAIN_BUILD_HOUSE"))
                .andExpect(jsonPath("$.main[0].completed").value(true))
                .andExpect(jsonPath("$.main[0].claimed").value(false));

        post("/api/v1/quests/MAIN_BUILD_SCHOOL/claim", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("NOT_COMPLETED"));
        post("/api/v1/quests/MAIN_BUILD_HOUSE/claim", user, "")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.quest.claimed").value(true))
                .andExpect(jsonPath("$.profile.knowledgePoints").value(30))
                .andExpect(jsonPath("$.profile.blueprintShards").value(0));
        post("/api/v1/quests/MAIN_BUILD_HOUSE/claim", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("ALREADY_CLAIMED"));
        assertEquals(30, profile(user).getKnowledgePoints());

        getAs("/api/v1/quests", user)
                .andExpect(jsonPath("$.main.length()").value(2))
                .andExpect(jsonPath("$.main[1].code").value("MAIN_LEARN_SCHOOL"))
                .andExpect(jsonPath("$.main[1].progress").value(5))
                .andExpect(jsonPath("$.main[1].goal").value(20))
                .andExpect(jsonPath("$.main[1].completed").value(false));
        post("/api/v1/quests/MAIN_LEARN_SCHOOL/claim", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("NOT_COMPLETED"));

        collect(user, school1.subList(5, 20));
        post("/api/v1/quests/MAIN_LEARN_SCHOOL/claim", user, "")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.profile.knowledgePoints").value(70))
                .andExpect(jsonPath("$.profile.blueprintShards").value(1));
        // School đã Lv1 từ trước → bước kế hoàn thành ngay (suy ra từ trạng thái)
        getAs("/api/v1/quests", user)
                .andExpect(jsonPath("$.main[2].code").value("MAIN_BUILD_SCHOOL"))
                .andExpect(jsonPath("$.main[2].completed").value(true));

        post("/api/v1/quests/NOPE/claim", user, "")
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("QUEST_NOT_FOUND"));
    }

    // TC-QUEST-06
    @Test
    void dailyQuestsArePickedOncePerDay() throws Exception {
        String user = newDoneUser();
        JsonNode first = body(getAs("/api/v1/quests", user).andExpect(status().isOk()));
        assertEquals(3, first.get("daily").size());
        List<String> codes = new ArrayList<>();
        first.get("daily").forEach(q -> codes.add(q.get("code").asString()));
        assertEquals(3, new HashSet<>(codes).size());

        JsonNode again = body(getAs("/api/v1/quests", user));
        List<String> codesAgain = new ArrayList<>();
        again.get("daily").forEach(q -> codesAgain.add(q.get("code").asString()));
        assertEquals(codes, codesAgain);
        // 0h hôm sau giờ Việt Nam = 17:00Z hôm nay
        assertEquals("2026-11-08T17:00:00Z", first.get("resetsAt").asString());
    }

    // TC-QUEST-08, TC-QUEST-09, TC-QUEST-10, TC-QUEST-11
    @Test
    void dailyQuestsCountProgressAndTheBonusNeedsAllThree() throws Exception {
        String user = newDoneUser();
        setTodayQuests(user, "DAILY_LESSON", "DAILY_NEW_WORDS", "DAILY_REVIEW");

        post("/api/v1/quests/DAILY_BONUS/claim", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("NOT_COMPLETED"));
        post("/api/v1/quests/DAILY_LESSON/claim", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("NOT_COMPLETED"));

        // một bài học đúng hết: 20 từ mới (≥ 5), 10 câu viết cho từ vừa sưu tầm ở phần đọc (≥ 10)
        JsonNode result = lesson(user, 30);
        int kpAfterLesson = result.get("profile").get("knowledgePoints").asInt();
        int shardsAfterLesson = result.get("profile").get("blueprintShards").asInt();
        assertEquals(0, shardsAfterLesson, "bài học không cho mảnh (BR-QUEST-05)");

        JsonNode quests = body(getAs("/api/v1/quests", user));
        for (JsonNode quest : quests.get("daily")) {
            assertTrue(quest.get("completed").asBoolean(), quest.toString());
            assertEquals(
                    quest.get("goal").asInt(), quest.get("progress").asInt(), quest.toString());
        }
        assertTrue(quests.get("dailyBonus").get("completed").asBoolean());

        for (String code : List.of("DAILY_LESSON", "DAILY_NEW_WORDS", "DAILY_REVIEW")) {
            post("/api/v1/quests/" + code + "/claim", user, "").andExpect(status().isOk());
        }
        post("/api/v1/quests/DAILY_LESSON/claim", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("ALREADY_CLAIMED"));
        post("/api/v1/quests/DAILY_BONUS/claim", user, "")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.profile.knowledgePoints").value(kpAfterLesson + 30 + 20))
                .andExpect(jsonPath("$.profile.blueprintShards").value(3 + 1));
        post("/api/v1/quests/DAILY_BONUS/claim", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("ALREADY_CLAIMED"));
        // không phải nhiệm vụ của hôm nay
        post("/api/v1/quests/DAILY_EVENT/claim", user, "")
                .andExpect(status().isNotFound());
    }

    // TC-QUEST-08 (STREAK_CORRECT lấy chuỗi đúng dài nhất, EVENT không tính LESSON_COMPLETED)
    @Test
    void streakQuestTakesTheLongestRunAndEventsAreNotLessons() throws Exception {
        String user = newDoneUser();
        collect(user, house1);
        setTodayQuests(user, "DAILY_STREAK10", "DAILY_LESSON", "DAILY_EVENT");

        JsonNode event = body(getAs("/api/v1/city", user)).get("events").get(0);
        JsonNode session = body(post("/api/v1/events/" + event.get("id").asLong() + "/start",
                user, ""));
        answerSession(user, session, 5);
        complete(session.get("sessionId").asString(), user).andExpect(status().isOk());

        JsonNode daily = body(getAs("/api/v1/quests", user)).get("daily");
        Map<String, JsonNode> byCode = new LinkedHashMap<>();
        daily.forEach(q -> byCode.put(q.get("code").asString(), q));
        assertEquals(0, byCode.get("DAILY_LESSON").get("progress").asInt(),
                "phiên EVENT không tính là một bài học");
        assertTrue(byCode.get("DAILY_EVENT").get("completed").asBoolean());
        assertEquals(5, byCode.get("DAILY_STREAK10").get("progress").asInt());

        lesson(user, 12); // chuỗi đúng 12 câu đầu
        daily = body(getAs("/api/v1/quests", user)).get("daily");
        daily.forEach(q -> byCode.put(q.get("code").asString(), q));
        assertTrue(byCode.get("DAILY_STREAK10").get("completed").asBoolean());
        assertTrue(byCode.get("DAILY_LESSON").get("completed").asBoolean());
    }

    // =============================================================================================
    // Sự kiện thành phố (UC_18)
    // =============================================================================================

    // TC-EVT-01, TC-EVT-02
    @Test
    void eventsAppearOnlyAfterTheTutorialWithFiveWordsAndStayTheSameAllDay() throws Exception {
        String user = newUser();
        collect(user, house1.subList(0, 4));
        getAs("/api/v1/city", user).andExpect(jsonPath("$.events.length()").value(0));
        setStep(user, TutorialStep.DONE);
        getAs("/api/v1/city", user).andExpect(jsonPath("$.events.length()").value(0));

        collect(user, house1.subList(4, 5));
        JsonNode events = body(getAs("/api/v1/city", user)).get("events");
        assertEquals(3, events.size());
        Set<String> ids = new HashSet<>();
        Set<String> residents = new HashSet<>();
        for (JsonNode event : events) {
            ids.add(event.get("eventId").asString());
            residents.add(event.get("residentName").asString());
            assertTrue(event.get("eventId").asString().startsWith("evt-"));
            assertEquals("OPEN", event.get("status").asString());
        }
        assertEquals(3, residents.size(), "không trùng mẫu trong ngày");

        Set<String> again = new HashSet<>();
        body(getAs("/api/v1/city", user)).get("events")
                .forEach(event -> again.add(event.get("eventId").asString()));
        assertEquals(ids, again);
    }

    // TC-EVT-04, TC-EVT-05, TC-EVT-07, TC-EVT-08
    @Test
    void solvingFourOfFiveResolvesTheEventAndPaysShardsAndKp() throws Exception {
        String user = newDoneUser();
        collect(user, house1.subList(0, 8));
        setResources(user, 0, 0);
        JsonNode event = body(getAs("/api/v1/city", user)).get("events").get(0);
        long eventId = event.get("id").asLong();

        JsonNode session = body(post("/api/v1/events/" + eventId + "/start", user, "")
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.type").value("EVENT"))
                .andExpect(jsonPath("$.totalCount").value(5)));
        for (long vocab : vocabIdsOf(session)) {
            assertTrue(house1.subList(0, 8).contains(vocab), "chỉ hỏi từ đã sưu tầm");
        }
        post("/api/v1/events/" + eventId + "/start", user, "")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sessionId").value(session.get("sessionId").asString()));

        answerSession(user, session, 4);
        complete(session.get("sessionId").asString(), user)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.kpAwarded").value(15))
                .andExpect(jsonPath("$.shardsAwarded").value(1))
                .andExpect(jsonPath("$.eventResolved").value(true))
                .andExpect(jsonPath("$.dailySessionIndex").doesNotExist())
                .andExpect(jsonPath("$.profile.blueprintShards").value(1))
                .andExpect(jsonPath("$.profile.knowledgePoints").value(15));

        getAs("/api/v1/city", user)
                .andExpect(jsonPath("$.events.length()").value(2))
                .andExpect(jsonPath("$.events[*].id", not(hasItem((int) eventId))))
                .andExpect(jsonPath("$.profile.blueprintShards").value(1));
        post("/api/v1/events/" + eventId + "/start", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("EVENT_RESOLVED"));
        post("/api/v1/events/" + eventId + "/start", newDoneUser(), "")
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("EVENT_NOT_FOUND"));
    }

    // TC-EVT-08 (tách riêng: id lạ / của người khác → 404, không phải 500)
    @Test
    void anotherPlayersEventIsNotFound() throws Exception {
        String owner = newDoneUser();
        collect(owner, house1.subList(0, 8));
        long eventId = body(getAs("/api/v1/city", owner)).get("events").get(0).get("id").asLong();
        post("/api/v1/events/" + eventId + "/start", newDoneUser(), "")
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("EVENT_NOT_FOUND"));
        post("/api/v1/events/999999/start", owner, "")
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("EVENT_NOT_FOUND"));
    }

    // TC-EVT-06, TC-EVT-07
    @Test
    void failingAnEventKeepsItOpenWithoutRewardButMasteryStillCounts() throws Exception {
        String user = newDoneUser();
        collect(user, house1.subList(0, 8));
        setResources(user, 0, 0);
        long eventId = body(getAs("/api/v1/city", user)).get("events").get(0).get("id").asLong();

        JsonNode session = body(post("/api/v1/events/" + eventId + "/start", user, ""));
        long firstWord = vocabIdsOf(session).get(0);
        answerSession(user, session, 3);
        complete(session.get("sessionId").asString(), user)
                .andExpect(jsonPath("$.kpAwarded").value(0))
                .andExpect(jsonPath("$.shardsAwarded").value(0))
                .andExpect(jsonPath("$.eventResolved").value(false));
        assertEquals(2, mastery(user, firstWord), "câu đúng vẫn +1 Mastery");
        assertEquals(0, profile(user).getBlueprintShards());

        getAs("/api/v1/city", user).andExpect(jsonPath("$.events.length()").value(3));
        JsonNode retry = body(post("/api/v1/events/" + eventId + "/start", user, "")
                .andExpect(status().isCreated()));
        assertNotEquals(session.get("sessionId").asString(), retry.get("sessionId").asString());
    }

    // TC-EVT-09 (Q5: sự kiện thứ hai làm phiên đang dở của sự kiện đầu hết hạn)
    @Test
    void startingASecondEventExpiresTheFirstEventsSession() throws Exception {
        String user = newDoneUser();
        collect(user, house1.subList(0, 8));
        JsonNode events = body(getAs("/api/v1/city", user)).get("events");
        long eventA = events.get(0).get("id").asLong();
        long eventB = events.get(1).get("id").asLong();

        JsonNode sessionA = body(post("/api/v1/events/" + eventA + "/start", user, "")
                .andExpect(status().isCreated()));
        post("/api/v1/events/" + eventB + "/start", user, "")
                .andExpect(status().isCreated());
        getAs("/api/v1/learning/sessions/" + sessionA.get("sessionId").asString(), user)
                .andExpect(jsonPath("$.status").value("EXPIRED"));
        JsonNode againA = body(post("/api/v1/events/" + eventA + "/start", user, "")
                .andExpect(status().isCreated()));
        assertNotEquals(sessionA.get("sessionId").asString(), againA.get("sessionId").asString());
    }

    // =============================================================================================
    // Luyện tập (UC_19)
    // =============================================================================================

    // TC-PRAC-01, TC-PRAC-02
    @Test
    void practiceValidatesTheRequest() throws Exception {
        String user = newDoneUser();
        practice(user, "XYZ", List.of(), 10)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("INVALID_BODY"));
        practice(user, "REVIEW", List.of(), 15)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("INVALID_BODY"));
        practice(user, "REVIEW", List.of(), 10)
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("NO_CONTENT"));
    }

    // TC-PRAC-01..04, TC-PRAC-10
    @Test
    void reviewUsesOnlyCollectedWordsOfTheThemeOncePerDay() throws Exception {
        String user = newDoneUser();
        collect(user, house1.subList(0, 20));
        collect(user, school1.subList(0, 12));

        JsonNode session = body(practice(user, "REVIEW", List.of("education"), 10)
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.type").value("PRACTICE_REVIEW"))
                .andExpect(jsonPath("$.totalCount").value(15)));
        Set<Long> words = new HashSet<>(vocabIdsOf(session));
        assertEquals(10, words.size());
        assertTrue(school1.subList(0, 12).containsAll(words), "chỉ từ đã sưu tầm của EDUCATION");

        practice(user, "REVIEW", List.of(), 20)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sessionId").value(session.get("sessionId").asString()));
        answerSession(user, session, 15);
        complete(session.get("sessionId").asString(), user).andExpect(status().isOk());

        practice(user, "REVIEW", List.of(), 10)
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("DAILY_LIMIT"))
                .andExpect(jsonPath("$.details.mode").value("REVIEW"))
                .andExpect(jsonPath("$.details.used").value(1))
                .andExpect(jsonPath("$.details.limit").value(1))
                .andExpect(jsonPath("$.details.resetsAt").value("2026-11-08T17:00:00Z"));
        getAs("/api/v1/learning/practice/status", user)
                .andExpect(jsonPath("$.review.used").value(1))
                .andExpect(jsonPath("$.review.limit").value(1))
                .andExpect(jsonPath("$.mixed.used").value(0))
                .andExpect(jsonPath("$.mixed.limit").value(3))
                .andExpect(jsonPath("$.themes[?(@.code == 'EDUCATION')].collected")
                        .value(contains(12)))
                .andExpect(jsonPath("$.themes[?(@.code == 'EDUCATION')].total")
                        .value(contains(30)));
    }

    // TC-PRAC-05, TC-PRAC-07, TC-PRAC-09
    @Test
    void mixedRunsAreCappedAtThreeAndTwentyNewWordsADay() throws Exception {
        String user = newDoneUser();
        collect(user, house1);
        int newWordsTotal = 0;
        for (int run = 1; run <= 3; run++) {
            Set<Long> before = new HashSet<>();
            for (long id : allWordIds()) {
                if (isCollected(user, id)) {
                    before.add(id);
                }
            }
            JsonNode session = body(practice(user, "MIXED", List.of(), 20)
                    .andExpect(status().isCreated()));
            Set<Long> fresh = new HashSet<>(vocabIdsOf(session));
            fresh.removeAll(before);
            assertTrue(fresh.size() <= 10, "tối đa nửa bài là từ mới, lượt " + run);
            newWordsTotal += fresh.size();
            answerSession(user, session, session.get("items").size());
            complete(session.get("sessionId").asString(), user).andExpect(status().isOk());
            for (long id : fresh) {
                assertTrue(isCollected(user, id), "từ mới trả lời đúng được sưu tầm");
            }
        }
        assertTrue(newWordsTotal <= 20, "≤ 20 từ mới / ngày, thực tế " + newWordsTotal);
        assertEquals(20, newWordsTotal, "3 lượt × tối đa 10 bị chặn ở 20");
        getAs("/api/v1/learning/practice/status", user)
                .andExpect(jsonPath("$.mixed.used").value(3))
                .andExpect(jsonPath("$.newWords.used").value(20))
                .andExpect(jsonPath("$.newWords.limit").value(20));
        practice(user, "MIXED", List.of(), 10)
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("DAILY_LIMIT"))
                .andExpect(jsonPath("$.details.used").value(3));
    }

    // TC-PRAC-05 (Q3: lượt tính khi bắt đầu, phiên bỏ dở / hết hạn vẫn mất lượt)
    @Test
    void anAbandonedPracticeStillUsesTheRun() throws Exception {
        String user = newDoneUser();
        collect(user, house1);
        practice(user, "REVIEW", List.of(), 10).andExpect(status().isCreated());
        clock.advance(Duration.ofMinutes(31));
        practice(user, "REVIEW", List.of(), 10)
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("DAILY_LIMIT"));
    }

    // TC-PRAC-08 (BR-PRAC-03, phần thưởng)
    @Test
    void aWordIsRewardedOnlyOnTheFirstCorrectAnswerOfTheDay() throws Exception {
        String user = newDoneUser();
        collect(user, house1.subList(0, 10));
        setResources(user, 0, 0);
        JsonNode session = body(practice(user, "REVIEW", List.of(), 10));
        // 15 câu cho 10 từ → 5 từ có hai câu
        Map<Long, Integer> answersPerWord = new LinkedHashMap<>();
        vocabIdsOf(session).forEach(id -> answersPerWord.merge(id, 1, Integer::sum));

        answerSession(user, session, 15);
        complete(session.get("sessionId").asString(), user)
                .andExpect(jsonPath("$.kpAwarded").value(10 * 3));
        for (long vocab : answersPerWord.keySet()) {
            // ADR-017: luyện tập không đổi Mastery (collect() để từ ở mức 1)
            assertEquals(1, mastery(user, vocab),
                    "Luyện tập không đổi Mastery dù trả lời đúng " + answersPerWord.get(vocab)
                            + " lần");
        }
        assertEquals(30, profile(user).getKnowledgePoints());
    }

    // TC-PRAC-08 (BR-PRAC-03, phần Mastery khi trả lời sai)
    @Test
    void wrongPracticeAnswersChangeMasteryAtMostOnceADay() throws Exception {
        String user = newDoneUser();
        collect(user, house1.subList(0, 10));
        for (long vocab : house1.subList(0, 10)) {
            setMastery(user, vocab, 5);
        }
        JsonNode session = body(practice(user, "REVIEW", List.of(), 10));
        Map<Long, Integer> answersPerWord = new LinkedHashMap<>();
        vocabIdsOf(session).forEach(id -> answersPerWord.merge(id, 1, Integer::sum));

        answerSession(user, session, 0); // sai hết
        for (Map.Entry<Long, Integer> entry : answersPerWord.entrySet()) {
            assertTrue(mastery(user, entry.getKey()) >= 4,
                    "BR-PRAC-03: Mastery chỉ đổi một lần mỗi ngày; từ " + entry.getKey()
                            + " sai " + entry.getValue() + " lần còn "
                            + mastery(user, entry.getKey()));
        }
    }

    // TC-PRAC-08 / TC-PRAC-09 sau bản sửa B2: câu đầu sai khoá thưởng của từ trong ngày, nhưng
    // từ mới trả lời đúng ở câu sau vẫn phải được sưu tầm (BR-PRAC-04)
    @Test
    void aNewWordAnsweredWrongThenRightIsStillCollected() throws Exception {
        String user = newDoneUser();
        collect(user, house1);
        setResources(user, 0, 0);
        JsonNode session = body(practice(user, "MIXED", List.of(), 20));
        String id = session.get("sessionId").asString();
        Map<Long, List<JsonNode>> itemsByWord = new LinkedHashMap<>();
        session.get("items").forEach(item -> itemsByWord
                .computeIfAbsent(item.get("vocabularyId").asLong(), key -> new ArrayList<>())
                .add(item));
        Long target = itemsByWord.entrySet().stream()
                .filter(entry -> !house1.contains(entry.getKey()) && entry.getValue().size() >= 2)
                .map(Map.Entry::getKey)
                .findFirst()
                .orElseThrow(() -> new AssertionError("không có từ mới nào có hai câu"));
        List<JsonNode> twoItems = itemsByWord.get(target);

        answer(id, user, twoItems.get(0).get("itemNo").asInt(), "sai")
                .andExpect(jsonPath("$.isCorrect").value(false));
        answer(id, user, twoItems.get(1).get("itemNo").asInt(),
                answerOf(twoItems.get(1).get("question").get("id").asLong()))
                .andExpect(jsonPath("$.isCorrect").value(true))
                .andExpect(jsonPath("$.collectedNow").value(true));
        assertTrue(isCollected(user, target));
        assertEquals(0, mastery(user, target), "câu đầu sai đã dùng lượt đổi Mastery hôm nay");
    }

    // TC-PRAC-09 (BR-PRAC-04)
    @Test
    void newWordsFromPracticeCountTowardsTheExam() throws Exception {
        String user = newDoneUser();
        collect(user, house1);
        int before = body(getAs("/api/v1/exams?building=HOUSING", user))
                .get("exams").get(0).get("progress").get("collected").asInt();
        JsonNode session = body(practice(user, "MIXED", List.of("HOUSE", "DAILY_LIFE"), 20));
        Set<Long> fresh = new HashSet<>(vocabIdsOf(session));
        fresh.removeIf(house1::contains);
        assertFalse(fresh.isEmpty(), "bài Hỗn hợp có từ mới");
        answerSession(user, session, session.get("items").size());
        int after = body(getAs("/api/v1/exams?building=HOUSING", user))
                .get("exams").get(0).get("progress").get("collected").asInt();
        assertEquals(before + fresh.size(), after);
    }

    // =============================================================================================
    // Hỗ trợ
    // =============================================================================================

    private ResultActions practice(String user, String mode, List<String> themes, int count)
            throws Exception {
        Map<String, Object> request = new LinkedHashMap<>();
        request.put("mode", mode);
        request.put("themeCodes", themes);
        request.put("wordCount", count);
        return post("/api/v1/learning/practice", user, json.writeValueAsString(request));
    }

    private ResultActions submit(long attemptId, String user, List<Map<String, Object>> answers)
            throws Exception {
        return post("/api/v1/exam-attempts/" + attemptId + "/submit", user,
                json.writeValueAsString(Map.of("answers", answers)));
    }

    /** Đáp án cho mọi câu của lượt thi: {@code correct} câu đầu (theo order) đúng. */
    private List<Map<String, Object>> examAnswers(JsonNode attempt, int correct) {
        List<Map<String, Object>> answers = new ArrayList<>();
        for (JsonNode q : attempt.get("questions")) {
            int order = q.get("order").asInt();
            String answer = order <= correct ? answerOf(q.get("questionId").asLong()) : "sai";
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("order", order);
            row.put("answer", answer);
            answers.add(row);
        }
        answers.sort((left, right) -> Integer.compare(
                (Integer) left.get("order"), (Integer) right.get("order")));
        return answers;
    }

    private long targetOf(long questionId) {
        return questionVocabularies.findByIdQuestionIdIn(List.of(questionId)).get(0)
                .getId().getVocabularyId();
    }

    private void setMastery(String user, long vocabId, int value) {
        var row = progress.findByUserIdAndVocabularyId(
                java.util.UUID.fromString(user), vocabId).orElseThrow();
        row.setMasteryScore(value);
        progress.save(row);
    }

    private List<Long> allWordIds() {
        List<Long> all = new ArrayList<>(house1);
        all.addAll(house2);
        all.addAll(school1);
        return all;
    }
}
