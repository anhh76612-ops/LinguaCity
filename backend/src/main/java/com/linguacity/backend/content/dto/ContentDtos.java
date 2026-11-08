package com.linguacity.backend.content.dto;

import com.linguacity.backend.cosmetic.dto.CosmeticDtos.CosmeticItemDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import tools.jackson.databind.JsonNode;

import java.time.Instant;
import java.util.List;

/**
 * DTO của API nội dung (system-design §10.4.1). Không có trường nào chứa đáp án (NFR-01,
 * BR-CONTENT-07).
 */
public final class ContentDtos {

    private ContentDtos() {
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public record PackRef(String code, String buildingCode, Integer level, int version) {}

    public record Manifest(Instant serverTime, List<PackRef> packs) {}

    public record ThemeDto(Long id, String code, String name, String description) {}

    public record BuildingDto(
            Long id,
            String code,
            String name,
            int maxLevel,
            int sortOrder,
            List<String> themeCodes) {}

    public record BuildingLevelDto(
            String buildingCode,
            int level,
            int knowledgeCost,
            long constructionTimeSeconds,
            int requiredCollected,
            int requiredShards) {}

    public record BlueprintDto(Long id, String code, String buildingCode, int targetLevel) {}

    /** Danh hiệu: danh hiệu Ẩn không gửi {@code description} (BR-ACH-02). */
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public record AchievementDto(
            String code,
            String name,
            String description,
            String tier,
            boolean hidden,
            int sortOrder,
            boolean revocable) {}

    /** cosmetics: danh mục món tuỳ biến (V005, M8). */
    public record Core(
            String code,
            int version,
            List<ThemeDto> themes,
            List<BuildingDto> buildings,
            List<BuildingLevelDto> buildingLevels,
            List<BlueprintDto> blueprints,
            List<AchievementDto> achievements,
            List<CosmeticItemDto> cosmetics) {}

    public record VocabularyDto(Long id, String word, String meaning, String wordType, String ipa,
                                List<String> examples, String imageUrl, String themeCode, int level,
                                String difficultyRank) {}

    /** Câu hỏi để hiển thị: KHÔNG có answer, acceptedAnswers, explanation. */
    public record QuestionDto(
            Long id,
            String contentType,
            String skill,
            String questionType,
            int tier,
            String questionText,
            String audioUrl,
            JsonNode metadata) {}

    public record QuestionVocabularyDto(Long questionId, Long vocabularyId, String relationType) {}

    public record ExamRequirementDto(
            int requiredCardCount,
            int requiredKnowledge,
            int requiredBlueprintShards,
            String requiredBuildingCode,
            int requiredBuildingLevel) {}

    public record ExamDto(
            Long id,
            String code,
            String buildingCode,
            int targetLevel,
            String blueprintCode,
            int questionCount,
            ExamRequirementDto requirement,
            List<Long> questionIds,
            int passPercent) {}

    public record Pack(
            String code,
            int version,
            List<VocabularyDto> vocabularies,
            List<QuestionDto> questions,
            List<QuestionVocabularyDto> questionVocabularies,
            List<ExamDto> exams) {}
}
