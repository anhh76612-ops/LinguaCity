package com.linguacity.backend.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.ZoneId;
import java.util.Map;

/**
 * Thông số cân bằng game (system-design §10.6, GDD §4). Không hardcode trong code nghiệp vụ (SRS
 * A.5):
 * mọi giá trị đọc từ {@code linguacity.balance.*} trong application.properties; giá trị mặc định ở
 * đây
 * dùng khi chưa khai báo (và trong test).
 */
@ConfigurationProperties(prefix = "linguacity.balance")
public class BalanceProperties {

    /** Trần Mastery theo độ khó của từ (ADR-013). */
    private Map<String, Integer> masteryMax = Map.of("D", 10, "C", 15, "B", 20, "A", 25);
    private int defaultMasteryMax = 10;

    private int wordsPerSession = 20;
    private int sessionTtlMinutes = 30;
    private int reviewCooldownMinutes = 10;

    private int kpPerCorrect = 5;
    private double kpBonusRatio = 0.8;
    private int kpBonus = 20;
    private int kpFullSessionsPerDay = 5;
    private double kpReducedMultiplier = 0.2;
    private String dayZone = "Asia/Ho_Chi_Minh";

    private int placementWords = 20;
    private int placementQuestions = 30;
    private int placementTtlHours = 24;
    private int placementKpPerCorrect = 3;
    private int placementWelcomeKp = 100;

    private int achievementTopPercent = 90;
    private int achievementMinSamples = 50;
    private int achievementFallbackCorrect = 27;

    /** Số câu mỗi phiên LEARNING: mỗi từ một câu đọc, phần còn lại là câu viết (ADR-015 §1). */
    private int questionsPerSession = 30;

    /** Luyện tập (ADR-015 §6). */
    private int practiceReviewPerDay = 1;
    private int practiceMixedPerDay = 3;
    private int practiceNewWordsPerDay = 20;
    private int practiceKpPerCorrect = 3;
    private int practiceTtlMinutes = 30;

    /** Sự kiện thành phố (ADR-015 §5). */
    private int eventPerDay = 3;
    private int eventQuestions = 5;
    private int eventPassCorrect = 4;
    private int eventRewardKp = 15;
    private int eventRewardShards = 1;
    private int eventMinCollected = 5;
    private int eventTtlMinutes = 30;

    /** Nhiệm vụ hằng ngày (ADR-015 §4). */
    private int dailyQuestCount = 3;

    public int maxMastery(String difficultyRank) {
        return masteryMax.getOrDefault(difficultyRank, defaultMasteryMax);
    }

    public ZoneId zone() {
        return ZoneId.of(dayZone);
    }

    // ---------- getters / setters (Spring Boot binding) ----------
    public Map<String, Integer> getMasteryMax() {
        return masteryMax;
    }
    public void setMasteryMax(Map<String, Integer> masteryMax) {
        this.masteryMax = masteryMax;
    }
    public int getDefaultMasteryMax() {
        return defaultMasteryMax;
    }
    public void setDefaultMasteryMax(int v) {
        this.defaultMasteryMax = v;
    }
    public int getWordsPerSession() {
        return wordsPerSession;
    }
    public void setWordsPerSession(int v) {
        this.wordsPerSession = v;
    }
    public int getSessionTtlMinutes() {
        return sessionTtlMinutes;
    }
    public void setSessionTtlMinutes(int v) {
        this.sessionTtlMinutes = v;
    }
    public int getReviewCooldownMinutes() {
        return reviewCooldownMinutes;
    }
    public void setReviewCooldownMinutes(int v) {
        this.reviewCooldownMinutes = v;
    }
    public int getKpPerCorrect() {
        return kpPerCorrect;
    }
    public void setKpPerCorrect(int v) {
        this.kpPerCorrect = v;
    }
    public double getKpBonusRatio() {
        return kpBonusRatio;
    }
    public void setKpBonusRatio(double v) {
        this.kpBonusRatio = v;
    }
    public int getKpBonus() {
        return kpBonus;
    }
    public void setKpBonus(int v) {
        this.kpBonus = v;
    }
    public int getKpFullSessionsPerDay() {
        return kpFullSessionsPerDay;
    }
    public void setKpFullSessionsPerDay(int v) {
        this.kpFullSessionsPerDay = v;
    }
    public double getKpReducedMultiplier() {
        return kpReducedMultiplier;
    }
    public void setKpReducedMultiplier(double v) {
        this.kpReducedMultiplier = v;
    }
    public String getDayZone() {
        return dayZone;
    }
    public void setDayZone(String v) {
        this.dayZone = v;
    }
    public int getPlacementWords() {
        return placementWords;
    }
    public void setPlacementWords(int v) {
        this.placementWords = v;
    }
    public int getPlacementQuestions() {
        return placementQuestions;
    }
    public void setPlacementQuestions(int v) {
        this.placementQuestions = v;
    }
    public int getPlacementTtlHours() {
        return placementTtlHours;
    }
    public void setPlacementTtlHours(int v) {
        this.placementTtlHours = v;
    }
    public int getPlacementKpPerCorrect() {
        return placementKpPerCorrect;
    }
    public void setPlacementKpPerCorrect(int v) {
        this.placementKpPerCorrect = v;
    }
    public int getPlacementWelcomeKp() {
        return placementWelcomeKp;
    }
    public void setPlacementWelcomeKp(int v) {
        this.placementWelcomeKp = v;
    }
    public int getAchievementTopPercent() {
        return achievementTopPercent;
    }
    public void setAchievementTopPercent(int v) {
        this.achievementTopPercent = v;
    }
    public int getAchievementMinSamples() {
        return achievementMinSamples;
    }
    public void setAchievementMinSamples(int v) {
        this.achievementMinSamples = v;
    }
    public int getAchievementFallbackCorrect() {
        return achievementFallbackCorrect;
    }
    public void setAchievementFallbackCorrect(int v) {
        this.achievementFallbackCorrect = v;
    }

    public int getQuestionsPerSession() {
        return questionsPerSession;
    }

    public void setQuestionsPerSession(int value) {
        this.questionsPerSession = value;
    }

    public int getPracticeReviewPerDay() {
        return practiceReviewPerDay;
    }

    public void setPracticeReviewPerDay(int value) {
        this.practiceReviewPerDay = value;
    }

    public int getPracticeMixedPerDay() {
        return practiceMixedPerDay;
    }

    public void setPracticeMixedPerDay(int value) {
        this.practiceMixedPerDay = value;
    }

    public int getPracticeNewWordsPerDay() {
        return practiceNewWordsPerDay;
    }

    public void setPracticeNewWordsPerDay(int value) {
        this.practiceNewWordsPerDay = value;
    }

    public int getPracticeKpPerCorrect() {
        return practiceKpPerCorrect;
    }

    public void setPracticeKpPerCorrect(int value) {
        this.practiceKpPerCorrect = value;
    }

    public int getPracticeTtlMinutes() {
        return practiceTtlMinutes;
    }

    public void setPracticeTtlMinutes(int value) {
        this.practiceTtlMinutes = value;
    }

    public int getEventPerDay() {
        return eventPerDay;
    }

    public void setEventPerDay(int value) {
        this.eventPerDay = value;
    }

    public int getEventQuestions() {
        return eventQuestions;
    }

    public void setEventQuestions(int value) {
        this.eventQuestions = value;
    }

    public int getEventPassCorrect() {
        return eventPassCorrect;
    }

    public void setEventPassCorrect(int value) {
        this.eventPassCorrect = value;
    }

    public int getEventRewardKp() {
        return eventRewardKp;
    }

    public void setEventRewardKp(int value) {
        this.eventRewardKp = value;
    }

    public int getEventRewardShards() {
        return eventRewardShards;
    }

    public void setEventRewardShards(int value) {
        this.eventRewardShards = value;
    }

    public int getEventMinCollected() {
        return eventMinCollected;
    }

    public void setEventMinCollected(int value) {
        this.eventMinCollected = value;
    }

    public int getEventTtlMinutes() {
        return eventTtlMinutes;
    }

    public void setEventTtlMinutes(int value) {
        this.eventTtlMinutes = value;
    }

    public int getDailyQuestCount() {
        return dailyQuestCount;
    }

    public void setDailyQuestCount(int value) {
        this.dailyQuestCount = value;
    }
}
