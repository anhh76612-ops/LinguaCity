package com.linguacity.backend.quest.dto;

import com.linguacity.backend.identity.dto.ResourcesDto;
import com.linguacity.backend.player.service.StreakService.StreakStatus;

import java.time.Instant;
import java.util.List;

/** GET /quests và POST /quests/{code}/claim (system-design §11.4). */
public final class QuestDtos {

    private QuestDtos() {
    }

    public record QuestDto(
            String code,
            String kind,
            String title,
            String description,
            int progress,
            int goal,
            boolean completed,
            boolean claimed,
            int rewardKp,
            int rewardShards) {}

    public record QuestsDto(
            List<QuestDto> main,
            List<QuestDto> daily,
            QuestDto dailyBonus,
            StreakStatus streak,
            Instant resetsAt,
            List<Boolean> streakWeek) {}

    public record ClaimResultDto(
            QuestDto quest, ResourcesDto profile, List<String> newAchievements) {}
}
