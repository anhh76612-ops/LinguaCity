package com.linguacity.backend.city.service;

import com.linguacity.backend.city.dto.CityDtos.*;
import com.linguacity.backend.city.dto.CityDtos.OwnedBlueprintDto;
import com.linguacity.backend.city.entity.UserBlueprint;
import com.linguacity.backend.city.entity.UserBuilding;
import com.linguacity.backend.city.repository.UserBlueprintRepository;
import com.linguacity.backend.city.repository.UserBuildingRepository;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.content.entity.Blueprint;
import com.linguacity.backend.content.entity.Building;
import com.linguacity.backend.content.entity.BuildingLevel;
import com.linguacity.backend.content.entity.BuildingLevelId;
import com.linguacity.backend.content.repository.BlueprintRepository;
import com.linguacity.backend.content.repository.BuildingLevelRepository;
import com.linguacity.backend.content.repository.BuildingRepository;
import com.linguacity.backend.content.service.ContentService;
import com.linguacity.backend.event.service.CityEventService;
import com.linguacity.backend.identity.dto.ResourcesDto;
import com.linguacity.backend.identity.entity.TutorialStep;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.learning.repository.UserVocabProgressRepository;
import com.linguacity.backend.player.service.StreakService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Thành phố của người chơi: GET /city (hoàn tất lười theo giờ server, FR-SYS-04) và xây /
 * nâng cấp mọi level (ADR-014, ADR-015 §3): Lv0→1 cần từ đã sưu tầm + KP; từ Lv1 trở đi cần
 * bản vẽ + mảnh + KP.
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
    private final BlueprintRepository blueprints;
    private final UserBlueprintRepository userBlueprints;
    private final CityEventService cityEvents;
    private final StreakService streak;
    private final Clock clock;

    public CityService(
            UserBuildingRepository userBuildings,
            BuildingRepository buildings,
            BuildingLevelRepository levels,
            UserProfileRepository users,
            UserVocabProgressRepository progress,
            ContentService content,
            BlueprintRepository blueprints,
            UserBlueprintRepository userBlueprints,
            CityEventService cityEvents,
            StreakService streak,
            Clock clock) {
        this.userBuildings = userBuildings;
        this.buildings = buildings;
        this.levels = levels;
        this.users = users;
        this.progress = progress;
        this.content = content;
        this.blueprints = blueprints;
        this.userBlueprints = userBlueprints;
        this.cityEvents = cityEvents;
        this.streak = streak;
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
        streak.refresh(profile);
        return new CityDto(
                Times.toInstant(now),
                dtos,
                cityEvents.todayEvents(profile),
                profile.getTutorialStep(),
                ownedBlueprints(userId, all),
                ResourcesDto.of(profile),
                streak.status(profile));
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

    /**
     * POST /buildings/{code}/build — xây level kế tiếp. Lv0→1: từ đã sưu tầm + KP (BR-TUT-03,
     * BR-UPG-03). Từ Lv1 trở đi: 1 bản vẽ + mảnh + KP (BR-UPG-01).
     */
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
        int nextLevel = userBuilding.getCurrentLevel() + 1;
        if (nextLevel > building.getMaxLevel()) {
            throw ApiException.conflict("MAX_LEVEL", "Building is already at max level");
        }
        BuildingLevel level = levels.findById(new BuildingLevelId(building.getId(), nextLevel))
                .orElseThrow(() -> ApiException.conflict(
                        "NO_CONTENT", "No level " + nextLevel + " config for " + code));

        if (nextLevel == 1) {
            checkRequirements(profile, building, level);
        } else {
            UserBlueprint blueprint = requireBlueprint(userId, building, nextLevel);
            checkUpgradeResources(profile, level);
            blueprint.setQuantity(blueprint.getQuantity() - 1);
            userBlueprints.save(blueprint);
            profile.setBlueprintShards(profile.getBlueprintShards() - level.getRequiredShards());
        }
        profile.setKnowledgePoints(profile.getKnowledgePoints() - level.getKnowledgeCost());
        users.save(profile);
        startConstruction(userBuilding, level, now);
        return new BuildResultDto(
                toDto(userBuilding, building), Times.toInstant(now), ResourcesDto.of(profile));
    }

    /** Đủ từ đã sưu tầm và đủ KP chưa; thiếu thì 409 kèm chi tiết thiếu bao nhiêu (§10.4). */
    private void checkRequirements(UserProfile profile, Building building, BuildingLevel level) {
        List<Long> words = content.vocabularyIdsOf(building.getId(), level.getId().getLevel());
        long collected = words.isEmpty()
                ? 0
                : progress.countByUserIdAndVocabularyIdInAndCollectedAtIsNotNull(
                        profile.getId(), words);
        long missingWords = Math.max(0, level.getRequiredCollected() - collected);
        long missingKp = Math.max(0, level.getKnowledgeCost() - profile.getKnowledgePoints());
        if (missingWords == 0 && missingKp == 0) {
            return;
        }
        Map<String, Object> details = new LinkedHashMap<>();
        details.put("collected", collected);
        details.put("requiredCollected", level.getRequiredCollected());
        details.put("missingCollected", missingWords);
        details.put("knowledgePoints", profile.getKnowledgePoints());
        details.put("requiredKnowledge", level.getKnowledgeCost());
        details.put("missingKnowledge", missingKp);
        throw new ApiException(
                HttpStatus.CONFLICT, "REQUIREMENTS_NOT_MET", "Requirements not met", details);
    }

    /** Bản vẽ (công trình, level đích) phải còn ít nhất 1; không có thì 409 NEEDS_BLUEPRINT. */
    private UserBlueprint requireBlueprint(UUID userId, Building building, int targetLevel) {
        Blueprint blueprint = blueprints.findAll().stream()
                .filter(candidate -> candidate.getBuildingId().equals(building.getId())
                        && candidate.getTargetLevel() == targetLevel)
                .findFirst()
                .orElseThrow(() -> ApiException.conflict(
                        "NO_CONTENT", "No blueprint for level " + targetLevel));
        return userBlueprints.findByUserIdAndBlueprintId(userId, blueprint.getId())
                .filter(owned -> owned.getQuantity() > 0)
                .orElseThrow(() -> new ApiException(HttpStatus.CONFLICT, "NEEDS_BLUEPRINT",
                        "A blueprint is required to upgrade",
                        Map.of("blueprintCode", blueprint.getCode())));
    }

    /** Nâng cấp: đủ mảnh và KP chưa; thiếu thì 409 kèm số còn thiếu (BR-UPG-01). */
    private static void checkUpgradeResources(UserProfile profile, BuildingLevel level) {
        int missingShards = Math.max(0, level.getRequiredShards() - profile.getBlueprintShards());
        int missingKp = Math.max(0, level.getKnowledgeCost() - profile.getKnowledgePoints());
        if (missingShards == 0 && missingKp == 0) {
            return;
        }
        Map<String, Object> details = new LinkedHashMap<>();
        details.put("blueprintShards", profile.getBlueprintShards());
        details.put("requiredShards", level.getRequiredShards());
        details.put("missingShards", missingShards);
        details.put("knowledgePoints", profile.getKnowledgePoints());
        details.put("requiredKnowledge", level.getKnowledgeCost());
        details.put("missingKnowledge", missingKp);
        throw new ApiException(
                HttpStatus.CONFLICT, "REQUIREMENTS_NOT_MET", "Requirements not met", details);
    }

    /** Bản vẽ đang giữ (quantity > 0), kèm mã công trình để app hiện trên thẻ. */
    private List<OwnedBlueprintDto> ownedBlueprints(UUID userId, List<Building> all) {
        Map<Long, String> buildingCode = all.stream()
                .collect(Collectors.toMap(Building::getId, Building::getCode));
        Map<Long, Blueprint> byId = blueprints.findAll().stream()
                .collect(Collectors.toMap(Blueprint::getId, Function.identity()));
        return userBlueprints.findByUserIdAndQuantityGreaterThan(userId, 0).stream()
                .map(owned -> {
                    Blueprint blueprint = byId.get(owned.getBlueprintId());
                    return new OwnedBlueprintDto(
                            blueprint.getCode(),
                            buildingCode.get(blueprint.getBuildingId()),
                            blueprint.getTargetLevel(),
                            owned.getQuantity());
                })
                .toList();
    }

    /** Bắt đầu xây theo giờ server; xong khi tới finishAt (hoàn tất lười, FR-SYS-04). */
    private void startConstruction(
            UserBuilding userBuilding, BuildingLevel level, LocalDateTime now) {
        userBuilding.setUnlocked(true);
        userBuilding.setStatus(UserBuilding.UPGRADING);
        userBuilding.setTargetLevel(level.getId().getLevel());
        userBuilding.setStartedAt(now);
        userBuilding.setFinishAt(now.plusSeconds(level.getConstructionTime()));
        userBuildings.save(userBuilding);
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
