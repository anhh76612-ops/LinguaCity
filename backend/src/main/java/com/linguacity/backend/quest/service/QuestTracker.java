package com.linguacity.backend.quest.service;

import com.linguacity.backend.common.config.BalanceProperties;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.player.service.StreakService;
import com.linguacity.backend.quest.entity.Quest;
import com.linguacity.backend.quest.entity.UserQuest;
import com.linguacity.backend.quest.repository.QuestRepository;
import com.linguacity.backend.quest.repository.UserQuestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Đếm tiến độ nhiệm vụ hằng ngày (BR-QUEST-03). Các service khác gọi {@link #record} hoặc
 * {@link #recordMax} khi có sự kiện tương ứng; nhiệm vụ vừa xong thì báo {@link StreakService}.
 */
@Service
@Transactional
public class QuestTracker {

    public static final String LESSON_COMPLETED = "LESSON_COMPLETED";
    public static final String NEW_WORDS = "NEW_WORDS";
    public static final String EVENT_RESOLVED = "EVENT_RESOLVED";
    public static final String STREAK_CORRECT = "STREAK_CORRECT";
    public static final String REVIEW_WORDS = "REVIEW_WORDS";

    private final QuestRepository quests;
    private final UserQuestRepository userQuests;
    private final StreakService streak;
    private final BalanceProperties balance;
    private final Clock clock;

    public QuestTracker(
            QuestRepository quests,
            UserQuestRepository userQuests,
            StreakService streak,
            BalanceProperties balance,
            Clock clock) {
        this.quests = quests;
        this.userQuests = userQuests;
        this.streak = streak;
        this.balance = balance;
        this.clock = clock;
    }

    /**
     * Nhiệm vụ hằng ngày của hôm nay. Lần đầu trong ngày thì chọn {@code daily-quest-count} mẫu,
     * cố định theo (người chơi, ngày) để gọi lại vẫn ra cùng kết quả.
     */
    public List<UserQuest> todayDaily(UUID userId) {
        LocalDate today = today();
        Map<String, Quest> templates = dailyTemplates();
        List<UserQuest> rows = userQuests.findByUserIdAndPeriodDate(userId, today).stream()
                .filter(row -> templates.containsKey(row.getQuestCode()))
                .collect(Collectors.toCollection(ArrayList::new));
        if (!rows.isEmpty() || templates.isEmpty()) {
            return rows;
        }

        List<Quest> pool = new ArrayList<>(templates.values());
        pool.sort((left, right) -> left.getSortOrder().compareTo(right.getSortOrder()));
        long seed = userId.getMostSignificantBits() ^ userId.getLeastSignificantBits()
                ^ today.toEpochDay();
        Collections.shuffle(pool, new Random(seed));
        for (Quest quest : pool.subList(0, Math.min(balance.getDailyQuestCount(), pool.size()))) {
            UserQuest row = new UserQuest();
            row.setUserId(userId);
            row.setQuestCode(quest.getCode());
            row.setPeriodDate(today);
            rows.add(userQuests.save(row));
        }
        return rows;
    }

    /**
     * Cộng {@code amount} vào nhiệm vụ hằng ngày có loại mục tiêu {@code goalType}. Trả danh
     * hiệu chuỗi vừa trao nếu nhiệm vụ xong làm hôm nay được tính (lỗi B3).
     */
    public List<String> record(UUID userId, String goalType, int amount) {
        return update(userId, goalType, progress -> progress + amount);
    }

    /** Ghi giá trị lớn nhất (ví dụ chuỗi trả lời đúng dài nhất trong ngày). */
    public List<String> recordMax(UUID userId, String goalType, int value) {
        return update(userId, goalType, progress -> Math.max(progress, value));
    }

    private List<String> update(
            UUID userId, String goalType, Function<Integer, Integer> next) {
        Map<String, Quest> templates = dailyTemplates();
        LocalDateTime now = Times.nowUtc(clock);
        boolean newlyCompleted = false;
        for (UserQuest row : todayDaily(userId)) {
            Quest quest = templates.get(row.getQuestCode());
            if (!goalType.equals(quest.getGoalType()) || row.isCompleted()) {
                continue;
            }
            row.setProgress(Math.min(quest.getGoalValue(), next.apply(row.getProgress())));
            if (row.getProgress() >= quest.getGoalValue()) {
                row.setCompletedAt(now);
                newlyCompleted = true;
            }
            userQuests.save(row);
        }
        if (!newlyCompleted) {
            return List.of();
        }
        return streak.recordActivity(userId);
    }

    private Map<String, Quest> dailyTemplates() {
        return quests.findByKindOrderBySortOrderAsc(Quest.DAILY).stream()
                .collect(Collectors.toMap(Quest::getCode, Function.identity()));
    }

    private LocalDate today() {
        return Times.localDate(Times.nowUtc(clock), balance.zone());
    }
}
