package com.linguacity.backend.player.dto;

import com.linguacity.backend.identity.entity.TutorialStep;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public final class PlayerDtos {

    private PlayerDtos() {
    }

    public record StatsDto(long collectedWords, int streakDays) {}

    /** GET /users/me (§10.4.3). */
    public record PlayerDto(UUID userId, int knowledgePoints, int hourglassCount, int blueprintShards,
                            TutorialStep tutorialStep, boolean tutorialCompleted, String equippedTitle,
                            StatsDto stats) {}

    public record StepRequest(TutorialStep step) {}

    public record EarnedDto(String code, Instant earnedAt) {}

    public record AchievementsDto(String equipped, List<EarnedDto> items) {}

    public record EquipRequest(String code) {}
}
