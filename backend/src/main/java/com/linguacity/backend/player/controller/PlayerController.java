package com.linguacity.backend.player.controller;

import com.linguacity.backend.achievement.service.AchievementService;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.cosmetic.service.CosmeticService;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.identity.service.TutorialService;
import com.linguacity.backend.learning.dto.LearningDtos.ProgressDto;
import com.linguacity.backend.learning.repository.UserVocabProgressRepository;
import com.linguacity.backend.learning.service.LearningService;
import com.linguacity.backend.player.dto.PlayerDtos.*;
import com.linguacity.backend.player.service.StreakService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.UUID;

/**
 * Thông tin của chính người chơi: hồ sơ, bước tutorial, tiến độ từ, danh hiệu (§10.4.3, §10.4.4).
 */
@RestController
@RequestMapping("/api/v1/users/me")
public class PlayerController {

    private final UserProfileRepository users;
    private final UserVocabProgressRepository progress;
    private final TutorialService tutorial;
    private final LearningService learning;
    private final AchievementService achievements;
    private final CosmeticService cosmetics;
    private final StreakService streak;
    private final Clock clock;

    public PlayerController(
            UserProfileRepository users,
            UserVocabProgressRepository progress,
            TutorialService tutorial,
            LearningService learning,
            AchievementService achievements,
            CosmeticService cosmetics,
            StreakService streak,
            Clock clock) {
        this.users = users;
        this.progress = progress;
        this.tutorial = tutorial;
        this.learning = learning;
        this.achievements = achievements;
        this.cosmetics = cosmetics;
        this.streak = streak;
        this.clock = clock;
    }

    @GetMapping
    public PlayerDto me(@RequestHeader("X-Guest-UUID") UUID guest) {
        UserProfile profile = users.findById(guest).orElseThrow(UserProfileNotFoundException::new);
        return toDto(streak.refresh(profile));
    }

    @PutMapping("/tutorial/step")
    public PlayerDto step(
            @RequestHeader("X-Guest-UUID") UUID guest, @RequestBody StepRequest body) {
        if (body.step() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_BODY", "step is required");
        }
        return toDto(tutorial.advanceByClient(guest, body.step()));
    }

    @GetMapping("/vocab-progress")
    public ProgressDto vocabProgress(
            @RequestHeader("X-Guest-UUID") UUID guest,
            @RequestParam(required = false) String since) {
        LocalDateTime sinceUtc = null;
        if (since != null && !since.isBlank()) {
            try {
                sinceUtc = LocalDateTime.ofInstant(Instant.parse(since), ZoneOffset.UTC);
            } catch (DateTimeParseException e) {
                throw new ApiException(
                        HttpStatus.BAD_REQUEST, "INVALID_PARAMETER", "Invalid since");
            }
        }
        return learning.progressSince(guest, sinceUtc);
    }

    @GetMapping("/achievements")
    public AchievementsDto achievements(@RequestHeader("X-Guest-UUID") UUID guest) {
        UserProfile profile = users.findById(guest).orElseThrow(UserProfileNotFoundException::new);
        List<EarnedDto> earned = achievements.earnedBy(guest).stream()
                .map(a -> new EarnedDto(
                        a.getId().getAchievementCode(), Times.toInstant(a.getEarnedAt())))
                .toList();
        return new AchievementsDto(profile.getEquippedAchievementCode(), earned);
    }

    @PutMapping("/equipped-title")
    public PlayerDto equip(
            @RequestHeader("X-Guest-UUID") UUID guest, @RequestBody EquipRequest body) {
        return toDto(achievements.equip(guest, body.code()));
    }

    private PlayerDto toDto(UserProfile profile) {
        long collected = progress.countByUserIdAndCollectedAtIsNotNull(profile.getId());

        return new PlayerDto(
                profile.getId(),
                profile.getKnowledgePoints(),
                profile.getHourglassCount(),
                profile.getBlueprintShards(),
                profile.getTutorialStep(),
                profile.isTutorialCompleted(),
                profile.getEquippedAchievementCode(),
                cosmetics.avatarOf(profile),
                cosmetics.houseStyleOf(profile),
                new StatsDto(collected, profile.getStreakDays(), profile.getBestStreak()));
    }
}
