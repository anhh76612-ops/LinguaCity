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
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeParseException;
import java.util.UUID;

/** Thông tin của chính người chơi: hồ sơ, bước tutorial, tiến độ từ, danh hiệu (§10.4.3, §10.4.4). */
@RestController
@RequestMapping("/api/v1/users/me")
public class PlayerController {

    private final UserProfileRepository users;
    private final UserVocabProgressRepository progress;
    private final TutorialService tutorial;
    private final LearningService learning;
    private final AchievementService achievements;
    private final CosmeticService cosmetics;
    private final Clock clock;

    public PlayerController(UserProfileRepository users, UserVocabProgressRepository progress, TutorialService tutorial,
                            LearningService learning, AchievementService achievements, CosmeticService cosmetics,
                            Clock clock) {
        this.users = users;
        this.progress = progress;
        this.tutorial = tutorial;
        this.learning = learning;
        this.achievements = achievements;
        this.cosmetics = cosmetics;
        this.clock = clock;
    }

    @GetMapping
    public PlayerDto me(@RequestHeader("X-Guest-UUID") UUID guest) {
        UserProfile p = users.findById(guest).orElseThrow(UserProfileNotFoundException::new);
        return toDto(p);
    }

    @PutMapping("/tutorial/step")
    public PlayerDto step(@RequestHeader("X-Guest-UUID") UUID guest, @RequestBody StepRequest body) {
        if (body.step() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_BODY", "step is required");
        }
        return toDto(tutorial.advanceByClient(guest, body.step()));
    }

    @GetMapping("/vocab-progress")
    public ProgressDto vocabProgress(@RequestHeader("X-Guest-UUID") UUID guest,
                                     @RequestParam(required = false) String since) {
        LocalDateTime sinceUtc = null;
        if (since != null && !since.isBlank()) {
            try {
                sinceUtc = LocalDateTime.ofInstant(Instant.parse(since), ZoneOffset.UTC);
            } catch (DateTimeParseException e) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PARAMETER", "Invalid since");
            }
        }
        return learning.progressSince(guest, sinceUtc);
    }

    @GetMapping("/achievements")
    public AchievementsDto achievements(@RequestHeader("X-Guest-UUID") UUID guest) {
        UserProfile p = users.findById(guest).orElseThrow(UserProfileNotFoundException::new);
        return new AchievementsDto(p.getEquippedAchievementCode(), achievements.earnedBy(guest).stream()
                .map(a -> new EarnedDto(a.getId().getAchievementCode(), Times.toInstant(a.getEarnedAt())))
                .toList());
    }

    @PutMapping("/equipped-title")
    public PlayerDto equip(@RequestHeader("X-Guest-UUID") UUID guest, @RequestBody EquipRequest body) {
        return toDto(achievements.equip(guest, body.code()));
    }

    private PlayerDto toDto(UserProfile p) {
        long collected = progress.countByUserIdAndCollectedAtIsNotNull(p.getId());
        int streak = achievements.streakDays(p.getId(), Times.nowUtc(clock));
        return new PlayerDto(p.getId(), p.getKnowledgePoints(), p.getHourglassCount(), p.getBlueprintShards(),
                p.getTutorialStep(), p.isTutorialCompleted(), p.getEquippedAchievementCode(),
                cosmetics.avatarOf(p), cosmetics.houseStyleOf(p),
                new StatsDto(collected, streak));
    }
}
