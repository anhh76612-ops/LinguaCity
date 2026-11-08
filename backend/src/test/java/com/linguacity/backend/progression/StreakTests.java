package com.linguacity.backend.progression;

import com.linguacity.backend.support.MutableClock;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import tools.jackson.databind.JsonNode;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.not;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Chuỗi ngày, danh hiệu thu hồi được và những luật đổi theo ngày giờ Việt Nam (ADR-015 §7).
 * TC-STREAK-*, TC-QUEST-07, TC-PRAC-06/08, TC-EVT-03 (docs/06-testing/test-plan.md §10).
 * Context và đồng hồ riêng: mỗi test bắt đầu ở 10:00 (giờ VN) của một ngày mới, nên việc tua
 * nhiều ngày không làm ảnh hưởng tới {@link ProgressionFlowTests}.
 */
@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:linguacity_streak;DB_CLOSE_DELAY=-1",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect",
        "spring.jpa.show-sql=false"
})
@Import(StreakTests.ClockConfig.class)
class StreakTests extends ProgressionTestBase {

    @TestConfiguration
    static class ClockConfig {
        @Bean
        @Primary
        MutableClock testClock() {
            return new MutableClock(Instant.parse("2026-12-01T03:00:00Z"));
        }
    }

    @BeforeEach
    void freshDay() {
        nextDayAtTen();
    }

    // TC-STREAK-01
    @Test
    void aLessonAloneOrAQuestAloneDoesNotCountTheDay() throws Exception {
        String user = newDoneUser();
        setTodayQuests(user, "DAILY_NEW_WORDS", "DAILY_REVIEW", "DAILY_EVENT");
        lesson(user, 0); // sai hết: không có từ mới, không ôn → không xong nhiệm vụ nào

        getAs("/api/v1/quests", user)
                .andExpect(jsonPath("$.streak.days").value(0))
                .andExpect(jsonPath("$.streak.todayCounted").value(false))
                .andExpect(jsonPath("$.streak.lessonDone").value(true))
                .andExpect(jsonPath("$.streak.questDone").value(false));
    }

    // TC-STREAK-02, TC-STREAK-03, TC-STREAK-06, TC-STREAK-11
    @Test
    void threeCountedDaysInARowGrantStreakThree() throws Exception {
        String user = newDoneUser();
        for (int day = 1; day <= 3; day++) {
            if (day > 1) {
                nextDayAtTen();
            }
            countToday(user);
            getAs("/api/v1/quests", user)
                    .andExpect(jsonPath("$.streak.days").value(day))
                    .andExpect(jsonPath("$.streak.best").value(day))
                    .andExpect(jsonPath("$.streak.todayCounted").value(true));
        }
        lesson(user, 0); // làm thêm trong ngày không cộng lần nữa
        getAs("/api/v1/users/me", user)
                .andExpect(jsonPath("$.stats.streakDays").value(3))
                .andExpect(jsonPath("$.stats.bestStreak").value(3));
        getAs("/api/v1/users/me/achievements", user)
                .andExpect(jsonPath("$.items[*].code", hasItem("STREAK_3")));
    }

    // TC-STREAK-06: danh hiệu chuỗi vừa đạt phải có trong newAchievements để app báo
    @Test
    void theNewStreakTitleIsReportedByTheCallThatEarnedIt() throws Exception {
        String user = newDoneUser();
        List<String> reported = new ArrayList<>();
        for (int day = 1; day <= 3; day++) {
            if (day > 1) {
                nextDayAtTen();
            }
            JsonNode result = countToday(user);
            result.get("newAchievements").forEach(code -> reported.add(code.asString()));
        }
        assertTrue(reported.contains("STREAK_3"),
                "complete ngày thứ 3 phải báo STREAK_3, thực tế " + reported);
    }

    // TC-STREAK-04, TC-STREAK-07, TC-STREAK-08, TC-STREAK-10
    @Test
    void missingADayResetsTheStreakAndRevokesOnlyStreakTitles() throws Exception {
        String user = newDoneUser();
        for (int day = 1; day <= 3; day++) {
            if (day > 1) {
                nextDayAtTen();
            }
            countToday(user);
        }
        getAs("/api/v1/users/me/achievements", user)
                .andExpect(jsonPath("$.items[*].code", hasItem("STREAK_3")))
                .andExpect(jsonPath("$.items[*].code", hasItem("DILIGENT")));
        put("/api/v1/users/me/equipped-title", user, "{\"code\":\"STREAK_3\"}")
                .andExpect(status().isOk());

        nextDayAtTen();
        nextDayAtTen(); // bỏ trống một ngày
        getAs("/api/v1/users/me", user)
                .andExpect(jsonPath("$.stats.streakDays").value(0))
                .andExpect(jsonPath("$.stats.bestStreak").value(3))
                .andExpect(jsonPath("$.equippedTitle").doesNotExist());
        getAs("/api/v1/users/me/achievements", user)
                .andExpect(jsonPath("$.items[*].code", not(hasItem("STREAK_3"))))
                .andExpect(jsonPath("$.items[*].code", hasItem("DILIGENT")));

        countToday(user);
        getAs("/api/v1/quests", user).andExpect(jsonPath("$.streak.days").value(1));
        nextDayAtTen();
        countToday(user);
        nextDayAtTen();
        countToday(user);
        getAs("/api/v1/users/me/achievements", user)
                .andExpect(jsonPath("$.items[*].code", hasItem("STREAK_3"))); // trao lại
    }

    // TC-STREAK-05
    @Test
    void theStreakIsKeptUntilTheDayIsOver() throws Exception {
        String user = newDoneUser();
        countToday(user);
        nextDayAtTen();
        getAs("/api/v1/users/me", user).andExpect(jsonPath("$.stats.streakDays").value(1));
        getAs("/api/v1/quests", user)
                .andExpect(jsonPath("$.streak.days").value(1))
                .andExpect(jsonPath("$.streak.todayCounted").value(false));
    }

    // TC-STREAK-09: 23:59 và 0:01 giờ Việt Nam là hai ngày khác nhau
    @Test
    void theDayBoundaryIsMidnightVietnamTime() throws Exception {
        String user = newDoneUser();
        clock.advance(Duration.ofHours(13).plusMinutes(58)); // 16:58Z = 23:58 VN
        countToday(user);
        clock.advance(Duration.ofMinutes(4)); // 17:02Z = 0:02 VN hôm sau
        getAs("/api/v1/quests", user)
                .andExpect(jsonPath("$.streak.days").value(1))
                .andExpect(jsonPath("$.streak.todayCounted").value(false));
        countToday(user);
        getAs("/api/v1/quests", user).andExpect(jsonPath("$.streak.days").value(2));
    }

    // TC-QUEST-07
    @Test
    void dailyQuestsRenewAtMidnightVietnamTime() throws Exception {
        String user = newDoneUser();
        setTodayQuests(user, "DAILY_LESSON", "DAILY_REVIEW", "DAILY_EVENT");
        lesson(user, 0);
        JsonNode today = body(getAs("/api/v1/quests", user));
        assertTrue(today.get("daily").get(0).get("completed").asBoolean()
                || today.get("daily").get(1).get("completed").asBoolean()
                || today.get("daily").get(2).get("completed").asBoolean());
        String resetsAt = today.get("resetsAt").asString();

        clock.advance(Duration.ofHours(13).plusMinutes(59).plusSeconds(59)); // 16:59:59Z
        assertEquals(resetsAt, body(getAs("/api/v1/quests", user)).get("resetsAt").asString());
        clock.advance(Duration.ofSeconds(1)); // 17:00:00Z = 0h VN
        JsonNode tomorrow = body(getAs("/api/v1/quests", user));
        assertNotEquals(resetsAt, tomorrow.get("resetsAt").asString());
        assertEquals(3, tomorrow.get("daily").size());
        for (JsonNode quest : tomorrow.get("daily")) {
            assertEquals(0, quest.get("progress").asInt(), quest.toString());
            assertTrue(!quest.get("claimed").asBoolean());
        }
    }

    // TC-PRAC-06, TC-PRAC-08 (hôm sau được thưởng lại)
    @Test
    void practiceLimitsAndRewardsResetTheNextDay() throws Exception {
        String user = newDoneUser();
        collect(user, house1.subList(0, 10));
        JsonNode first = body(practiceReview(user).andExpect(status().isCreated()));
        answerSession(user, first, 15);
        complete(first.get("sessionId").asString(), user)
                .andExpect(jsonPath("$.kpAwarded").value(30));
        practiceReview(user).andExpect(status().isConflict());

        nextDayAtTen();
        JsonNode second = body(practiceReview(user).andExpect(status().isCreated()));
        answerSession(user, second, 15);
        complete(second.get("sessionId").asString(), user)
                .andExpect(jsonPath("$.kpAwarded").value(30));
    }

    // TC-EVT-03 (BR-EVT-04: sự kiện chưa giải không cộng dồn sang hôm sau)
    @Test
    void openEventsDoNotCarryOverToTheNextDay() throws Exception {
        String user = newDoneUser();
        collect(user, house1.subList(0, 8));
        JsonNode yesterday = body(getAs("/api/v1/city", user)).get("events");
        assertEquals(3, yesterday.size());
        long oldId = yesterday.get(0).get("id").asLong();

        nextDayAtTen();
        JsonNode today = body(getAs("/api/v1/city", user)).get("events");
        assertEquals(3, today.size());
        for (JsonNode event : today) {
            assertNotEquals(oldId, event.get("id").asLong());
        }
        getAs("/api/v1/city", user)
                .andExpect(jsonPath("$.events[*].id", not(hasItem((int) oldId))));
    }

    // TC-EVT-03 phụ (Q6): sự kiện của hôm qua không còn trên bản đồ thì không mở được nữa
    @Test
    void yesterdaysEventCannotBeStartedAnyMore() throws Exception {
        String user = newDoneUser();
        collect(user, house1.subList(0, 8));
        long oldId = body(getAs("/api/v1/city", user)).get("events").get(0).get("id").asLong();
        nextDayAtTen();
        getAs("/api/v1/city", user);
        int code = post("/api/v1/events/" + oldId + "/start", user, "")
                .andReturn().getResponse().getStatus();
        assertTrue(code == 404 || code == 409,
                "sự kiện hôm qua (BR-EVT-04) vẫn mở được, HTTP " + code);
        // sau bản sửa B4: 409 EVENT_EXPIRED
        post("/api/v1/events/" + oldId + "/start", user, "")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("EVENT_EXPIRED"));
    }

    // M15b: lịch chuỗi 7 ngày trong GET /quests (cũ trước, hôm nay cuối; BR-STREAK-01)
    @Test
    void theWeekCalendarMarksOnlyDaysWithLessonAndQuest() throws Exception {
        String user = newDoneUser();
        countToday(user);                       // hôm kia: đủ
        nextDayAtTen();
        setTodayQuests(user, "DAILY_NEW_WORDS", "DAILY_REVIEW", "DAILY_EVENT");
        lesson(user, 0);                        // hôm qua: chỉ có bài học
        nextDayAtTen();
        getAs("/api/v1/quests", user)
                .andExpect(jsonPath("$.streakWeek.length()").value(7))
                .andExpect(jsonPath("$.streakWeek[4]").value(true))
                .andExpect(jsonPath("$.streakWeek[5]").value(false))
                .andExpect(jsonPath("$.streakWeek[6]").value(false));
        countToday(user);                       // hôm nay: đủ
        JsonNode week = body(getAs("/api/v1/quests", user)).get("streakWeek");
        List<Boolean> days = new ArrayList<>();
        week.forEach(day -> days.add(day.asBoolean()));
        assertEquals(List.of(false, false, false, false, true, false, true), days);
    }

    // =============================================================================================

    /** Làm cho hôm nay được tính: đặt bộ nhiệm vụ có DAILY_LESSON rồi học một bài. */
    private JsonNode countToday(String user) throws Exception {
        setTodayQuests(user, "DAILY_LESSON", "DAILY_REVIEW", "DAILY_EVENT");
        return lesson(user, 0);
    }

    private org.springframework.test.web.servlet.ResultActions practiceReview(String user)
            throws Exception {
        return post("/api/v1/learning/practice", user,
                "{\"mode\":\"REVIEW\",\"themeCodes\":[],\"wordCount\":10}");
    }

    /** Tua tới 03:00Z (10:00 giờ VN) của ngày kế tiếp. */
    private void nextDayAtTen() {
        LocalDateTime now = nowUtc();
        LocalDateTime target = now.toLocalDate().plusDays(1).atTime(3, 0);
        clock.advance(Duration.between(now.toInstant(ZoneOffset.UTC),
                target.toInstant(ZoneOffset.UTC)));
    }
}
