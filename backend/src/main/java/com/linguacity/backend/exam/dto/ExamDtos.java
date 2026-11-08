package com.linguacity.backend.exam.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.linguacity.backend.identity.dto.ResourcesDto;
import com.linguacity.backend.learning.dto.LearningDtos.QuestionView;

import java.time.Instant;
import java.util.List;

/** API bài thi (system-design §11.2). */
public final class ExamDtos {

    private ExamDtos() {
    }

    public record RequirementDto(
            int requiredCardCount,
            int requiredKnowledge,
            int requiredBlueprintShards,
            String requiredBuildingCode,
            int requiredBuildingLevel) {}

    public record ProgressDto(
            long collected, int knowledgePoints, int blueprintShards, int requiredBuildingLevel) {}

    public record MissingDto(long collected, int knowledge, int shards, boolean building) {

        public boolean any() {
            return collected > 0 || knowledge > 0 || shards > 0 || building;
        }
    }

    public record ExamStatusDto(
            String code,
            String buildingCode,
            int targetLevel,
            int questionCount,
            int passPercent,
            RequirementDto requirement,
            ProgressDto progress,
            MissingDto missing,
            boolean available,
            boolean passed,
            Long activeAttemptId) {}

    public record ExamListDto(List<ExamStatusDto> exams) {}

    public record AttemptQuestionDto(int order, Long questionId, QuestionView question) {}

    public record AttemptDto(
            Long attemptId,
            String examCode,
            String status,
            Instant startedAt,
            Instant serverTime,
            int passPercent,
            List<AttemptQuestionDto> questions,
            ResourcesDto profile) {}

    public record AnswerDto(int order, String answer) {}

    public record SubmitRequest(List<AnswerDto> answers) {}

    public record ResultItemDto(
            int order,
            String questionText,
            String sentence,
            String given,
            String correctAnswer,
            boolean isCorrect,
            String explanation) {}

    public record BlueprintDto(String code, String buildingCode, int targetLevel, int quantity) {}

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public record ExamResultDto(
            Long attemptId,
            String status,
            int correct,
            int total,
            int scorePercent,
            int passPercent,
            List<ResultItemDto> items,
            BlueprintDto blueprint,
            List<String> newAchievements,
            ResourcesDto profile) {}
}
