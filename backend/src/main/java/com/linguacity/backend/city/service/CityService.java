package com.linguacity.backend.city.service;

import com.linguacity.backend.city.dto.CityDtos.*;
import com.linguacity.backend.city.entity.UserBuilding;
import com.linguacity.backend.city.repository.UserBuildingRepository;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.content.entity.Building;
import com.linguacity.backend.content.entity.BuildingLevel;
import com.linguacity.backend.content.entity.BuildingLevelId;
import com.linguacity.backend.content.repository.BuildingLevelRepository;
import com.linguacity.backend.content.repository.BuildingRepository;
import com.linguacity.backend.content.service.ContentService;
import com.linguacity.backend.identity.dto.ResourcesDto;
import com.linguacity.backend.identity.entity.TutorialStep;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.learning.repository.UserVocabProgressRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Thành phố của người chơi: GET /city (lazy completion theo giờ server, FR-SYS-04) và xây Lv0→1
 * (ADR-014).
 * Nâng cấp Lv1→2 trở đi cần bài thi + bản vẽ (VS4/VS5), chưa làm ở đây.
 */
@Service
@Transactional
public class CityService {

    private final UserBuildingRepository userBuildings;
    private final BuildingRepository buildings;
    private final BuildingLevelRepository levels;
    private final UserProfileRepository users;
    private final UserVocabProgressRepository progress;
    private final ContentService content;
    private final Clock clock;

    public CityService(
            UserBuildingRepository userBuildings,
            BuildingRepository buildings,
            BuildingLevelRepository levels,
            UserProfileRepository users,
            UserVocabProgressRepository progress,
            ContentService content,
            Clock clock) {
        this.userBuildings = userBuildings;
        this.buildings = buildings;
        this.levels = levels;
        this.users = users;
        this.progress = progress;
        this.content = content;
        this.clock = clock;
    }

    public CityDto city(UUID userId) {
        UserProfile profile = users.findById(userId).orElseThrow(UserProfileNotFoundException::new);
        LocalDateTime now = Times.nowUtc(clock);
        List<Building> all = buildings.findAllByOrderBySortOrderAsc();
        Map<Long, UserBuilding> rows = ensureRows(userId, all);

        for (UserBuilding userBuilding : rows.values()) {
            completeIfDue(userBuilding, now);
        }
        Building housing = all.stream().filter(b -> "HOUSING".equals(b.getCode())).findFirst()
                .orElse(null);
        if (housing != null && profile.getTutorialStep() == TutorialStep.BUILD_HOUSE
                && rows.get(housing.getId()).getCurrentLevel() >= 1) {
            // ADR-014: House xây xong → bước vào nhà
            profile.setTutorialStep(TutorialStep.ENTER_HOUSE);
            users.save(profile);
        }
        List<BuildingStateDto> dtos = all.stream().map(b -> toDto(rows.get(b.getId()), b)).toList();
        return new CityDto(Times.toInstant(now), dtos, List.of(), profile.getTutorialStep());
    }

    /** Level hiện tại của một công trình (đã tính hoàn tất lười). Chưa có dòng → 0. */
    public int currentLevel(UUID userId, Long buildingId) {
        return userBuildings.findByUserIdAndBuildingId(userId, buildingId)
                .map(ub -> {
                    completeIfDue(ub, Times.nowUtc(clock));
                    return ub.getCurrentLevel();
                })
                .orElse(0);
    }

    /** POST /buildings/{code}/build — chỉ Lv0→1 (BR-TUT-03). */
    public BuildResultDto build(UUID userId, String code) {
        UserProfile profile = users.findById(userId).orElseThrow(UserProfileNotFoundException::new);
        Building building = buildings.findByCode(code.toUpperCase(Locale.ROOT))
                .orElseThrow(() -> ApiException.notFound(
                        "BUILDING_NOT_FOUND", "Unknown building " + code));
        LocalDateTime now = Times.nowUtc(clock);
        UserBuilding userBuilding = ensureRows(userId, List.of(building)).get(building.getId());
        completeIfDue(userBuilding, now);

        if (UserBuilding.UPGRADING.equals(userBuilding.getStatus())) {
            throw ApiException.conflict("BUSY", "Building is under construction");
        }
        if (userBuilding.getCurrentLevel() >= 1) {
            throw ApiException.conflict(
                    "ALREADY_BUILT", "Building already built; upgrades need an exam (VS4/VS5)");
        }
        BuildingLevel levelOne = levels.findById(new BuildingLevelId(building.getId(), 1))
                .orElseThrow(() -> ApiException.conflict(
                        "NO_CONTENT", "No level 1 config for " + code));
        List<Long> words = content.vocabularyIdsOf(building.getId(), 1);
        long collected = words.isEmpty() ? 0
                : progress.countByUserIdAndVocabularyIdInAndCollectedAtIsNotNull(userId, words);
        long missingWords = Math.max(0, levelOne.getRequiredCollected() - collected);
        long missingKp = Math.max(0, levelOne.getKnowledgeCost() - profile.getKnowledgePoints());
        if (missingWords > 0 || missingKp > 0) {
            Map<String, Object> details = new LinkedHashMap<>();
            details.put("collected", collected);
            details.put("requiredCollected", levelOne.getRequiredCollected());
            details.put("missingCollected", missingWords);
            details.put("knowledgePoints", profile.getKnowledgePoints());
            details.put("requiredKnowledge", levelOne.getKnowledgeCost());
            details.put("missingKnowledge", missingKp);
            throw new ApiException(
                    HttpStatus.CONFLICT, "REQUIREMENTS_NOT_MET", "Requirements not met", details);
        }

        profile.setKnowledgePoints(profile.getKnowledgePoints() - levelOne.getKnowledgeCost());
        users.save(profile);
        userBuilding.setUnlocked(true);
        userBuilding.setStatus(UserBuilding.UPGRADING);
        userBuilding.setTargetLevel(1);
        userBuilding.setStartedAt(now);
        userBuilding.setFinishAt(now.plusSeconds(levelOne.getConstructionTime()));
        userBuildings.save(userBuilding);
        return new BuildResultDto(
                toDto(userBuilding, building), Times.toInstant(now), ResourcesDto.of(profile));
    }

    private Map<Long, UserBuilding> ensureRows(UUID userId, List<Building> wanted) {
        Map<Long, UserBuilding> rows = userBuildings.findByUserId(userId).stream()
                .collect(Collectors.toMap(UserBuilding::getBuildingId, Function.identity()));
        for (Building building : wanted) {
            rows.computeIfAbsent(building.getId(), id -> {
                UserBuilding userBuilding = new UserBuilding();
                userBuilding.setUserId(userId);
                userBuilding.setBuildingId(id);
                return userBuildings.save(userBuilding);
            });
        }
        return rows;
    }

    /** Lazy completion (§7.2.8): công trình UPGRADING có finish_at ≤ now thì hoàn tất. */
    private void completeIfDue(UserBuilding userBuilding, LocalDateTime now) {
        if (UserBuilding.UPGRADING.equals(userBuilding.getStatus())
                && userBuilding.getFinishAt() != null
                && !userBuilding.getFinishAt().isAfter(now)) {
            userBuilding.setCurrentLevel(userBuilding.getTargetLevel());
            userBuilding.setTargetLevel(null);
            userBuilding.setStatus(UserBuilding.IDLE);
            userBuilding.setStartedAt(null);
            userBuilding.setFinishAt(null);
            userBuildings.save(userBuilding);
        }
    }

    private BuildingStateDto toDto(UserBuilding userBuilding, Building building) {
        return new BuildingStateDto(
                building.getId(),
                building.getCode(),
                userBuilding.getCurrentLevel(),
                userBuilding.getTargetLevel(),
                building.getMaxLevel(),
                userBuilding.getStatus(),
                Times.toInstant(userBuilding.getStartedAt()),
                Times.toInstant(userBuilding.getFinishAt()));
    }
}
