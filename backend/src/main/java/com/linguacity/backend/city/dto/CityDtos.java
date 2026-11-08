package com.linguacity.backend.city.dto;

import com.linguacity.backend.identity.dto.ResourcesDto;
import com.linguacity.backend.identity.entity.TutorialStep;

import java.time.Instant;
import java.util.List;

/** §7.2.8 GET /city và §10.4.3 POST /buildings/{code}/build. */
public final class CityDtos {

    private CityDtos() {
    }

    public record BuildingStateDto(Long buildingId, String code, int currentLevel,
            Integer targetLevel, int maxLevel,
                                   String status, Instant startedAt, Instant finishAt) {}

    public record CityDto(Instant serverTime, List<BuildingStateDto> buildings, List<Object> events,
                          TutorialStep tutorialStep) {}

    public record BuildResultDto(
            BuildingStateDto building, Instant serverTime, ResourcesDto profile) {}
}
