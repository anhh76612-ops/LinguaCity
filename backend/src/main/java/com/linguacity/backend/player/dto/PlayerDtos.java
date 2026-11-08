package com.linguacity.backend.player.dto;

import com.linguacity.backend.cosmetic.dto.CosmeticDtos.AvatarConfig;
import com.linguacity.backend.cosmetic.dto.CosmeticDtos.HouseStyleConfig;
import com.linguacity.backend.identity.entity.TutorialStep;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public final class PlayerDtos {

    private PlayerDtos() {
    }

    /** streakDays: chuỗi ngày theo ADR-015 §7 (học bài + xong nhiệm vụ hằng ngày). */
    public record StatsDto(long collectedWords, int streakDays, int bestStreak) {}

    /** GET /users/me (§10.4.3). */
    public record PlayerDto(
            UUID userId,
            int knowledgePoints,
            int hourglassCount,
            int blueprintShards,
            TutorialStep tutorialStep,
            boolean tutorialCompleted,
            String equippedTitle,
            AvatarConfig avatar,
            HouseStyleConfig houseStyle,
            StatsDto stats) {}

    public record StepRequest(TutorialStep step) {}

    public record EarnedDto(String code, Instant earnedAt) {}

    public record AchievementsDto(String equipped, List<EarnedDto> items) {}

    public record EquipRequest(String code) {}
}
