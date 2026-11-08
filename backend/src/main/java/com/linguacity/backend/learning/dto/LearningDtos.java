package com.linguacity.backend.learning.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.linguacity.backend.identity.dto.ResourcesDto;
import com.linguacity.backend.identity.entity.TutorialStep;
import tools.jackson.databind.JsonNode;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/** DTO phiên học (system-design §10.4.2). Câu hỏi KHÔNG có đáp án cho tới khi đã nộp (NFR-01). */
public final class LearningDtos {

    private LearningDtos() {
    }

    public record StartSessionRequest(String buildingCode) {}

    public record AnswerRequest(String answer) {}

    public record QuestionView(
            Long id,
            String skill,
            String questionType,
            int tier,
            String questionText,
            JsonNode metadata) {}

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public record ItemDto(
            int itemNo,
            Long vocabularyId,
            boolean answered,
            Boolean isCorrect,
            QuestionView question) {}

    public record SessionDto(
            UUID sessionId,
            String type,
            String buildingCode,
            int vocabLevel,
            String status,
            Instant startedAt,
            Instant expiresAt,
            Instant serverTime,
            int totalCount,
            int correctCount,
            List<ItemDto> items) {}

    public record AnswerResultDto(
            int itemNo,
            boolean isCorrect,
            String correctAnswer,
            String explanation,
            Long vocabularyId,
            int masteryAfter,
            int maxMastery,
            boolean collectedNow,
            int streak) {}

    public record CollectionDto(String buildingCode, int level, long collected, int total) {}

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public record CompleteResultDto(
            UUID sessionId,
            String type,
            int correct,
            int total,
            int kpAwarded,
            Integer kpBase,
            Integer kpBonus,
            Integer dailySessionIndex,
            Double dailyMultiplier,
            CollectionDto collection,
            List<String> newAchievements,
            ResourcesDto profile,
            TutorialStep tutorialStep,
            Integer shardsAwarded,
            Boolean eventResolved) {}

    /** POST /learning/practice (ADR-015 §6): mode REVIEW | MIXED, wordCount 10 | 20. */
    public record PracticeRequest(String mode, List<String> themeCodes, Integer wordCount) {}

    public record PracticeUsage(long used, int limit) {}

    public record ThemeProgressDto(String code, String name, long collected, int total) {}

    /** GET /learning/practice/status. */
    public record PracticeStatusDto(
            PracticeUsage review,
            PracticeUsage mixed,
            PracticeUsage newWords,
            List<ThemeProgressDto> themes,
            Instant resetsAt) {}

    public record ProgressItemDto(
            Long vocabularyId,
            int masteryScore,
            int maxMastery,
            boolean collected,
            Instant firstSeenAt,
            Instant lastReviewedAt) {}

    public record ProgressDto(Instant serverTime, List<ProgressItemDto> items) {}
}
