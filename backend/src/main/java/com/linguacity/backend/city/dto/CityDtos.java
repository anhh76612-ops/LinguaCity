package com.linguacity.backend.city.dto;

import com.linguacity.backend.event.service.CityEventService.CityEventDto;
import com.linguacity.backend.identity.dto.ResourcesDto;
import com.linguacity.backend.identity.entity.TutorialStep;
import com.linguacity.backend.player.service.StreakService.StreakStatus;

import java.time.Instant;
import java.util.List;

/** GET /city và POST /buildings/{code}/build (§7.2.8, §10.4.3, §11.3). */
public final class CityDtos {

    private CityDtos() {
    }

    public record BuildingStateDto(
            Long buildingId,
            String code,
            int currentLevel,
            Integer targetLevel,
            int maxLevel,
            String status,
            Instant startedAt,
            Instant finishAt) {}

    /** Bản vẽ người chơi đang giữ (chỉ những bản có quantity > 0). */
    public record OwnedBlueprintDto(
            String code, String buildingCode, int targetLevel, int quantity) {}

    /** §11.3: thêm bản vẽ, sự kiện thật, tài nguyên và chuỗi ngày (ADR-015). */
    public record CityDto(
            Instant serverTime,
            List<BuildingStateDto> buildings,
            List<CityEventDto> events,
            TutorialStep tutorialStep,
            List<OwnedBlueprintDto> blueprints,
            ResourcesDto profile,
            StreakStatus streak) {}

    public record BuildResultDto(
            BuildingStateDto building, Instant serverTime, ResourcesDto profile) {}
}
