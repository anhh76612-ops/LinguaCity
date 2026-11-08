package com.linguacity.backend.cosmetic.service;

import com.linguacity.backend.achievement.repository.UserAchievementRepository;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.cosmetic.dto.CosmeticDtos.AvatarConfig;
import com.linguacity.backend.cosmetic.dto.CosmeticDtos.CosmeticItemDto;
import com.linguacity.backend.cosmetic.dto.CosmeticDtos.CosmeticsDto;
import com.linguacity.backend.cosmetic.dto.CosmeticDtos.HouseStyleConfig;
import com.linguacity.backend.cosmetic.entity.CosmeticItem;
import com.linguacity.backend.cosmetic.entity.UserCosmetic;
import com.linguacity.backend.cosmetic.entity.UserCosmeticId;
import com.linguacity.backend.cosmetic.repository.CosmeticItemRepository;
import com.linguacity.backend.cosmetic.repository.UserCosmeticRepository;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.databind.ObjectMapper;

import java.time.Clock;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Tuỳ biến nhân vật và nhà (UC_14, BR-COS-01..03, system-design §10.4.4).
 * <ul>
 *   <li>Món FREE: luôn dùng được.</li>
 *   <li>Món KP: mua một lần bằng KP ({@link #unlock}), lưu vào {@code user_cosmetics}.</li>
 *   <li>Món ACHIEVEMENT: dùng được khi người chơi đã có danh hiệu tương ứng (không cần mua).</li>
 * </ul>
 * Cấu hình lưu bằng MÃ cosmetic; app tự dịch mã → asset_key để gửi cho bản đồ.
 */
@Service
public class CosmeticService {

    private final CosmeticItemRepository items;
    private final UserCosmeticRepository owned;
    private final UserAchievementRepository achievements;
    private final UserProfileRepository users;
    private final ObjectMapper json;
    private final Clock clock;

    public CosmeticService(CosmeticItemRepository items, UserCosmeticRepository owned,
                           UserAchievementRepository achievements, UserProfileRepository users,
                           ObjectMapper json, Clock clock) {
        this.items = items;
        this.owned = owned;
        this.achievements = achievements;
        this.users = users;
        this.json = json;
        this.clock = clock;
    }

    @Transactional(readOnly = true)
    public List<CosmeticItemDto> catalog() {
        return items.findAllByOrderByCategoryAscSortOrderAsc().stream()
                .map(i -> new CosmeticItemDto(i.getCode(), i.getCategory(), i.getName(),
                        i.getUnlockType(),
                        i.getPriceKp(), i.getAchievementCode(), i.getAssetKey(), i.getSortOrder()))
                .toList();
    }

    @Transactional(readOnly = true)
    public CosmeticsDto get(UUID userId) {
        return toDto(profile(userId));
    }

    /** Mua món KP. 404 mã lạ · 409 NOT_PURCHASABLE / ALREADY_UNLOCKED / INSUFFICIENT_KP. */
    @Transactional
    public CosmeticsDto unlock(UUID userId, String code) {
        UserProfile p = profile(userId);
        CosmeticItem item = items.findById(code)
                .orElseThrow(() -> ApiException.notFound(
                        "COSMETIC_NOT_FOUND", "Unknown cosmetic: " + code));
        if (!CosmeticItem.KP.equals(item.getUnlockType())) {
            throw ApiException.conflict("NOT_PURCHASABLE", "Cosmetic is not sold for KP: " + code);
        }
        UserCosmeticId id = new UserCosmeticId(userId, code);
        if (owned.existsById(id)) {
            throw ApiException.conflict("ALREADY_UNLOCKED", "Cosmetic already unlocked: " + code);
        }
        int missing = item.getPriceKp() - p.getKnowledgePoints();
        if (missing > 0) {
            throw new ApiException(HttpStatus.CONFLICT, "INSUFFICIENT_KP", "Not enough KP",
                    Map.of("priceKp", item.getPriceKp(), "missingKnowledge", missing));
        }
        // @Version trên user_profiles: hai lần mua song song không trừ KP chồng nhau (FR-SYS-05)
        p.setKnowledgePoints(p.getKnowledgePoints() - item.getPriceKp());
        UserCosmetic uc = new UserCosmetic();
        uc.setId(id);
        uc.setUnlockedAt(Times.nowUtc(clock));
        owned.save(uc);
        return toDto(users.save(p));
    }

    /**
     * BR-COS-03: mỗi mã phải đúng nhóm và đã mở. Sai → 400 INVALID_COSMETIC (details: field, code,
     * reason).
     */
    @Transactional
    public CosmeticsDto setAvatar(UUID userId, AvatarConfig body) {
        UserProfile p = profile(userId);
        if (body == null) {
            throw invalidBody();
        }
        Set<String> unlocked = unlockedCodes(userId);
        Map<String, CosmeticItem> byCode = byCode();
        check(byCode, unlocked, "skin", body.skin(), "SKIN");
        check(byCode, unlocked, "hairStyle", body.hairStyle(), "HAIR_STYLE");
        check(byCode, unlocked, "hairColor", body.hairColor(), "HAIR_COLOR");
        check(byCode, unlocked, "shirtColor", body.shirtColor(), "SHIRT_COLOR");
        check(byCode, unlocked, "pantsColor", body.pantsColor(), "PANTS_COLOR");
        check(byCode, unlocked, "accessory", body.accessory(), "ACCESSORY");
        p.setAvatarConfig(json.writeValueAsString(body));
        return toDto(users.save(p));
    }

    @Transactional
    public CosmeticsDto setHouseStyle(UUID userId, HouseStyleConfig body) {
        UserProfile p = profile(userId);
        if (body == null) {
            throw invalidBody();
        }
        Set<String> unlocked = unlockedCodes(userId);
        Map<String, CosmeticItem> byCode = byCode();
        check(byCode, unlocked, "wall", body.wall(), "WALL");
        check(byCode, unlocked, "floor", body.floor(), "FLOOR");
        p.setHouseStyle(json.writeValueAsString(body));
        return toDto(users.save(p));
    }

    /** Cấu hình đã lưu, hoặc mặc định nếu chưa chọn / dữ liệu hỏng. */
    public AvatarConfig avatarOf(UserProfile p) {
        return read(p.getAvatarConfig(), AvatarConfig.class, AvatarConfig.DEFAULT);
    }

    public HouseStyleConfig houseStyleOf(UserProfile p) {
        return read(p.getHouseStyle(), HouseStyleConfig.class, HouseStyleConfig.DEFAULT);
    }

    /** FREE + đã mua bằng KP + ACHIEVEMENT mà người chơi đã có danh hiệu. */
    @Transactional(readOnly = true)
    public Set<String> unlockedCodes(UUID userId) {
        Set<String> bought = owned.findByIdUserId(userId).stream()
                .map(uc -> uc.getId().getItemCode()).collect(Collectors.toSet());
        Set<String> earned = achievements.findByIdUserIdOrderByEarnedAtAsc(userId).stream()
                .map(a -> a.getId().getAchievementCode()).collect(Collectors.toSet());
        Set<String> result = new TreeSet<>();
        for (CosmeticItem i : items.findAll()) {
            boolean ok = switch (i.getUnlockType()) {
                case CosmeticItem.FREE -> true;
                case CosmeticItem.KP -> bought.contains(i.getCode());
                case CosmeticItem.ACHIEVEMENT -> earned.contains(i.getAchievementCode());
                default -> false;
            };
            if (ok) {
                result.add(i.getCode());
            }
        }
        return result;
    }

    private void check(
            Map<String,
            CosmeticItem> byCode,
            Set<String> unlocked,
            String field,
            String code,
            String category) {
        CosmeticItem item = code == null ? null : byCode.get(code);
        String reason;
        if (item == null) {
            reason = "UNKNOWN";
        } else if (!category.equals(item.getCategory())) {
            reason = "WRONG_CATEGORY";
        } else if (!unlocked.contains(code)) {
            reason = "LOCKED";
        } else {
            return;
        }
        Map<String, Object> details = new LinkedHashMap<>();
        details.put("field", field);
        details.put("code", code);
        details.put("reason", reason);
        throw new ApiException(
                HttpStatus.BAD_REQUEST,
                "INVALID_COSMETIC",
                "Invalid cosmetic for " + field,
                details);
    }

    private Map<String, CosmeticItem> byCode() {
        return items.findAll().stream().collect(Collectors.toMap(CosmeticItem::getCode, i -> i));
    }

    private <T> T read(String raw, Class<T> type, T fallback) {
        if (raw == null || raw.isBlank()) {
            return fallback;
        }
        try {
            return json.readValue(raw, type);
        } catch (RuntimeException e) {
            return fallback;
        }
    }

    private CosmeticsDto toDto(UserProfile p) {
        return new CosmeticsDto(
                List.copyOf(unlockedCodes(p.getId())),
                avatarOf(p),
                houseStyleOf(p),
                p.getKnowledgePoints());
    }

    private UserProfile profile(UUID userId) {
        return users.findById(userId).orElseThrow(UserProfileNotFoundException::new);
    }

    private static ApiException invalidBody() {
        return new ApiException(HttpStatus.BAD_REQUEST, "INVALID_BODY", "Body is required");
    }
}
