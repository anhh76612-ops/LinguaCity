package com.linguacity.backend.achievement.service;

import com.linguacity.backend.achievement.entity.Achievement;
import com.linguacity.backend.achievement.entity.UserAchievement;
import com.linguacity.backend.achievement.entity.UserAchievementId;
import com.linguacity.backend.achievement.repository.AchievementRepository;
import com.linguacity.backend.achievement.repository.UserAchievementRepository;
import com.linguacity.backend.common.config.BalanceProperties;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.learning.entity.LearningSession;
import com.linguacity.backend.learning.entity.LearningSessionItem;
import com.linguacity.backend.learning.entity.SessionStatus;
import com.linguacity.backend.learning.entity.SessionType;
import com.linguacity.backend.learning.repository.LearningSessionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Xét và trao danh hiệu (BR-ACH-01..05, system-design §10.5). Danh hiệu chỉ trao một lần,
 * không thu hồi — trừ danh hiệu {@code revocable} (danh hiệu chuỗi, ADR-015 §7).
 */
@Service
public class AchievementService {

    public static final String NEW_RESIDENT = "NEW_RESIDENT";
    public static final String GOOD_START = "GOOD_START";
    public static final String COLLECTOR = "COLLECTOR";
    public static final String TOP_ENTRANT = "TOP_ENTRANT";
    public static final String DILIGENT = "DILIGENT";
    public static final String FLAWLESS = "FLAWLESS";
    public static final String COMBO10 = "COMBO10";
    /** condition_type của danh hiệu chuỗi (ADR-015 §7). */
    public static final String STREAK_DAYS = "STREAK_DAYS";

    private final AchievementRepository catalog;
    private final UserAchievementRepository earned;
    private final LearningSessionRepository sessions;
    private final UserProfileRepository users;
    private final BalanceProperties balance;

    public AchievementService(
            AchievementRepository catalog,
            UserAchievementRepository earned,
            LearningSessionRepository sessions,
            UserProfileRepository users,
            BalanceProperties balance) {
        this.catalog = catalog;
        this.earned = earned;
        this.sessions = sessions;
        this.users = users;
        this.balance = balance;
    }

    /** Trao danh hiệu nếu chưa có. Trả true nếu vừa trao. */
    @Transactional
    public boolean grant(UUID userId, String code, LocalDateTime nowUtc) {
        UserAchievementId id = new UserAchievementId(userId, code);
        if (!catalog.existsById(code) || earned.existsById(id)) {
            return false;
        }
        UserAchievement ua = new UserAchievement();
        ua.setId(id);
        ua.setEarnedAt(nowUtc);
        earned.save(ua);
        return true;
    }

    /**
     * Xét sau khi một phiên vừa COMPLETED. {@code levelFullyCollected}: người chơi đã sưu tầm đủ
     * mọi từ của
     * (công trình, Level) của phiên chưa — tính sẵn ở LearningService.
     */
    @Transactional
    public List<String> evaluateAfterSession(
            LearningSession session,
            List<LearningSessionItem> items,
            boolean levelFullyCollected,
            LocalDateTime nowUtc) {
        UUID user = session.getUserId();
        List<String> granted = new ArrayList<>();
        Map<String, Integer> threshold = catalog.findAll().stream()
                .collect(Collectors.toMap(Achievement::getCode, Achievement::getThreshold));

        if (session.getType() == SessionType.PLACEMENT) {
            long distinctCorrectWords = items.stream()
                    .filter(i -> Boolean.TRUE.equals(i.getIsCorrect()))
                    .map(LearningSessionItem::getVocabularyId).distinct().count();
            if (distinctCorrectWords > threshold.getOrDefault(GOOD_START, 15)) {
                grantInto(granted, user, GOOD_START, nowUtc);
            }
            if (session.getTotalCount() > 0
                    && session.getCorrectCount().equals(session.getTotalCount())) {
                grantInto(granted, user, FLAWLESS, nowUtc);
            }
            if (isTopEntrant(session)) {
                grantInto(granted, user, TOP_ENTRANT, nowUtc);
            }
        }
        if (session.getBestStreak() >= threshold.getOrDefault(COMBO10, 10)) {
            grantInto(granted, user, COMBO10, nowUtc);
        }
        if (levelFullyCollected) {
            grantInto(granted, user, COLLECTOR, nowUtc);
        }
        if (streakDays(user, nowUtc) >= threshold.getOrDefault(DILIGENT, 3)) {
            grantInto(granted, user, DILIGENT, nowUtc);
        }
        return granted;
    }

    /**
     * BR-ACH-03: có ≥ min-samples bài PLACEMENT khác thì phải cao hơn ≥ top-percent% số bài đó;
     * chưa đủ mẫu thì dùng ngưỡng cố định (≥ fallback-correct câu đúng).
     */
    public boolean isTopEntrant(LearningSession session) {
        List<Integer> others = sessions.correctCountsOfOthers(
                SessionType.PLACEMENT, SessionStatus.COMPLETED, session.getId());
        int mine = session.getCorrectCount();
        if (others.size() < balance.getAchievementMinSamples()) {
            return mine >= balance.getAchievementFallbackCorrect();
        }
        long below = others.stream().filter(c -> c < mine).count();
        return below * 100 >= (long) balance.getAchievementTopPercent() * others.size();
    }

    /** Số ngày liên tiếp (tính tới hôm nay hoặc hôm qua) có ít nhất một phiên COMPLETED. */
    @Transactional(readOnly = true)
    public int streakDays(UUID userId, LocalDateTime nowUtc) {
        ZoneId zone = balance.zone();
        LocalDate today = Times.localDate(nowUtc, zone);
        Set<LocalDate> days = sessions.completedAtSince(
                userId, SessionStatus.COMPLETED, nowUtc.minusDays(400)).stream()
                .map(t -> Times.localDate(t, zone))
                .collect(Collectors.toSet());
        LocalDate cursor = days.contains(today) ? today : today.minusDays(1);
        int streak = 0;
        while (days.contains(cursor)) {
            streak++;
            cursor = cursor.minusDays(1);
        }
        return streak;
    }

    /**
     * Danh hiệu chuỗi (condition_type STREAK_DAYS) đạt mốc {@code days}: trao những cái chưa có
     * (BR-STREAK-03). Trả danh sách mã vừa trao.
     */
    @Transactional
    public List<String> grantStreakTitles(UUID userId, int days, LocalDateTime nowUtc) {
        List<String> granted = new ArrayList<>();
        for (Achievement achievement : catalog.findAllByOrderBySortOrderAsc()) {
            // Chỉ danh hiệu thu hồi được: DILIGENT cũng dùng STREAK_DAYS nhưng theo luật cũ
            boolean streakTitle = achievement.isRevocable()
                    && STREAK_DAYS.equals(achievement.getConditionType());
            if (streakTitle && days >= achievement.getThreshold()) {
                grantInto(granted, userId, achievement.getCode(), nowUtc);
            }
        }
        return granted;
    }

    /**
     * Thu hồi mọi danh hiệu {@code revocable} của người chơi; đang đeo thì gỡ (BR-ACH-05).
     * Người gọi tự lưu {@code profile}.
     */
    @Transactional
    public void revokeRevocable(UserProfile profile) {
        Set<String> revocable = catalog.findAll().stream()
                .filter(Achievement::isRevocable)
                .map(Achievement::getCode)
                .collect(Collectors.toSet());
        for (String code : revocable) {
            UserAchievementId id = new UserAchievementId(profile.getId(), code);
            if (earned.existsById(id)) {
                earned.deleteById(id);
            }
        }
        if (revocable.contains(profile.getEquippedAchievementCode())) {
            profile.setEquippedAchievementCode(null);
        }
    }

    @Transactional(readOnly = true)
    public List<UserAchievement> earnedBy(UUID userId) {
        return earned.findByIdUserIdOrderByEarnedAtAsc(userId);
    }

    /** BR-ACH-04: chỉ đeo được danh hiệu đã có; {@code null} = tháo. */
    @Transactional
    public UserProfile equip(UUID userId, String code) {
        UserProfile profile = users.findById(userId).orElseThrow(UserProfileNotFoundException::new);
        if (code != null && !earned.existsById(new UserAchievementId(userId, code))) {
            throw ApiException.conflict("NOT_EARNED", "Achievement not earned: " + code);
        }
        profile.setEquippedAchievementCode(code);
        return users.save(profile);
    }

    private void grantInto(List<String> granted, UUID user, String code, LocalDateTime nowUtc) {
        if (grant(user, code, nowUtc)) {
            granted.add(code);
        }
    }
}
