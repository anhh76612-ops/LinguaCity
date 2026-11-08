package com.linguacity.backend.player.service;

import com.linguacity.backend.achievement.service.AchievementService;
import com.linguacity.backend.common.config.BalanceProperties;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.learning.entity.SessionStatus;
import com.linguacity.backend.learning.entity.SessionType;
import com.linguacity.backend.learning.repository.LearningSessionRepository;
import com.linguacity.backend.quest.entity.Quest;
import com.linguacity.backend.quest.entity.UserQuest;
import com.linguacity.backend.quest.repository.QuestRepository;
import com.linguacity.backend.quest.repository.UserQuestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Chuỗi ngày (ADR-015 §7, BR-STREAK-01..03): một ngày được tính khi có ít nhất một phiên học /
 * luyện tập hoàn thành và ít nhất một nhiệm vụ hằng ngày hoàn thành. Đứt chuỗi thì về 0 và mất
 * danh hiệu chuỗi.
 */
@Service
@Transactional
public class StreakService {

    private static final List<SessionType> LESSON_TYPES = List.of(
            SessionType.LEARNING, SessionType.PRACTICE_REVIEW, SessionType.PRACTICE_MIXED);

    private final UserProfileRepository users;
    private final LearningSessionRepository sessions;
    private final QuestRepository quests;
    private final UserQuestRepository userQuests;
    private final AchievementService achievements;
    private final BalanceProperties balance;
    private final Clock clock;

    public StreakService(
            UserProfileRepository users,
            LearningSessionRepository sessions,
            QuestRepository quests,
            UserQuestRepository userQuests,
            AchievementService achievements,
            BalanceProperties balance,
            Clock clock) {
        this.users = users;
        this.sessions = sessions;
        this.quests = quests;
        this.userQuests = userQuests;
        this.achievements = achievements;
        this.balance = balance;
        this.clock = clock;
    }

    /** Trạng thái chuỗi để hiện trên HUD và màn Nhiệm vụ. */
    public record StreakStatus(
            int days, int best, boolean todayCounted, boolean lessonDone, boolean questDone) {}

    /**
     * Kiểm đứt chuỗi khi đọc (BR-STREAK-02): ngày cuối được tính trước hôm qua thì chuỗi về 0
     * và thu hồi danh hiệu chuỗi.
     */
    public UserProfile refresh(UserProfile profile) {
        LocalDate yesterday = today().minusDays(1);
        LocalDate last = profile.getStreakLastDate();
        boolean broken = last == null || last.isBefore(yesterday);
        if (profile.getStreakDays() > 0 && broken) {
            profile.setStreakDays(0);
            achievements.revokeRevocable(profile);
            users.save(profile);
        }
        return profile;
    }

    /**
     * Gọi sau khi xong một phiên học / luyện tập hoặc một nhiệm vụ hằng ngày. Nếu hôm nay vừa đủ
     * hai điều kiện thì tính ngày, trao danh hiệu chuỗi đạt mốc. Trả mã danh hiệu vừa trao.
     */
    public List<String> recordActivity(UUID userId) {
        UserProfile profile = users.findById(userId).orElseThrow(UserProfileNotFoundException::new);
        refresh(profile);
        LocalDate today = today();
        if (today.equals(profile.getStreakLastDate())) {
            return List.of();
        }
        if (!lessonDone(userId, today) || !dailyQuestDone(userId, today)) {
            return List.of();
        }

        boolean continues = today.minusDays(1).equals(profile.getStreakLastDate());
        int days = continues ? profile.getStreakDays() + 1 : 1;
        profile.setStreakDays(days);
        profile.setBestStreak(Math.max(profile.getBestStreak(), days));
        profile.setStreakLastDate(today);
        users.save(profile);
        return achievements.grantStreakTitles(userId, days, Times.nowUtc(clock));
    }

    @Transactional(readOnly = true)
    public StreakStatus status(UserProfile profile) {
        LocalDate today = today();
        return new StreakStatus(
                profile.getStreakDays(),
                profile.getBestStreak(),
                today.equals(profile.getStreakLastDate()),
                lessonDone(profile.getId(), today),
                dailyQuestDone(profile.getId(), today));
    }

    private boolean lessonDone(UUID userId, LocalDate day) {
        LocalDateTime[] range = dayRange(day);
        return sessions.countCompletedOfTypesBetween(
                userId, LESSON_TYPES, SessionStatus.COMPLETED, range[0], range[1]) > 0;
    }

    private boolean dailyQuestDone(UUID userId, LocalDate day) {
        Set<String> dailyCodes = quests.findByKindOrderBySortOrderAsc(Quest.DAILY).stream()
                .map(Quest::getCode)
                .collect(Collectors.toSet());
        return userQuests.findByUserIdAndPeriodDate(userId, day).stream()
                .filter(row -> dailyCodes.contains(row.getQuestCode()))
                .anyMatch(UserQuest::isCompleted);
    }

    /** Khoảng [0h, 24h) của một ngày giờ Việt Nam, đổi ra UTC để so với cột thời gian. */
    private LocalDateTime[] dayRange(LocalDate day) {
        return Times.dayRangeUtc(day, balance.zone());
    }

    private LocalDate today() {
        return Times.localDate(Times.nowUtc(clock), balance.zone());
    }
}
