package com.linguacity.backend.quest.service;

import com.linguacity.backend.city.service.CityService;
import com.linguacity.backend.common.config.BalanceProperties;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.content.entity.Building;
import com.linguacity.backend.content.entity.Exam;
import com.linguacity.backend.content.repository.BuildingRepository;
import com.linguacity.backend.content.repository.ExamRepository;
import com.linguacity.backend.content.service.ContentService;
import com.linguacity.backend.exam.entity.ExamAttempt;
import com.linguacity.backend.exam.repository.ExamAttemptRepository;
import com.linguacity.backend.identity.dto.ResourcesDto;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.learning.repository.UserVocabProgressRepository;
import com.linguacity.backend.player.service.StreakService;
import com.linguacity.backend.quest.dto.QuestDtos.ClaimResultDto;
import com.linguacity.backend.quest.dto.QuestDtos.QuestDto;
import com.linguacity.backend.quest.dto.QuestDtos.QuestsDto;
import com.linguacity.backend.quest.entity.Quest;
import com.linguacity.backend.quest.entity.UserQuest;
import com.linguacity.backend.quest.repository.QuestRepository;
import com.linguacity.backend.quest.repository.UserQuestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Nhiệm vụ chính tuyến và hằng ngày (ADR-015 §4, BR-QUEST-01..05). Tiến độ chính tuyến suy ra
 * từ trạng thái người chơi; tiến độ hằng ngày do {@link QuestTracker} đếm.
 */
@Service
@Transactional
public class QuestService {

    public static final String BUILDING_LEVEL = "BUILDING_LEVEL";
    public static final String COLLECTED_WORDS = "COLLECTED_WORDS";
    public static final String EXAM_PASSED = "EXAM_PASSED";

    private final QuestRepository quests;
    private final UserQuestRepository userQuests;
    private final QuestTracker tracker;
    private final StreakService streak;
    private final UserProfileRepository users;
    private final BuildingRepository buildings;
    private final CityService city;
    private final ContentService content;
    private final UserVocabProgressRepository progress;
    private final ExamRepository exams;
    private final ExamAttemptRepository attempts;
    private final BalanceProperties balance;
    private final Clock clock;

    public QuestService(
            QuestRepository quests,
            UserQuestRepository userQuests,
            QuestTracker tracker,
            StreakService streak,
            UserProfileRepository users,
            BuildingRepository buildings,
            CityService city,
            ContentService content,
            UserVocabProgressRepository progress,
            ExamRepository exams,
            ExamAttemptRepository attempts,
            BalanceProperties balance,
            Clock clock) {
        this.quests = quests;
        this.userQuests = userQuests;
        this.tracker = tracker;
        this.streak = streak;
        this.users = users;
        this.buildings = buildings;
        this.city = city;
        this.content = content;
        this.progress = progress;
        this.exams = exams;
        this.attempts = attempts;
        this.balance = balance;
        this.clock = clock;
    }

    /** GET /quests. */
    public QuestsDto overview(UUID userId) {
        UserProfile profile = requireUser(userId);
        streak.refresh(profile);
        List<QuestDto> daily = dailyView(userId);
        return new QuestsDto(
                mainView(userId),
                daily,
                bonusView(userId, daily),
                streak.status(profile),
                resetsAt(),
                streak.lastSevenDays(userId));
    }

    /** POST /quests/{code}/claim (BR-QUEST-02). */
    public ClaimResultDto claim(UUID userId, String code) {
        UserProfile profile = requireUser(userId);
        Quest quest = quests.findById(code)
                .orElseThrow(() -> ApiException.notFound("QUEST_NOT_FOUND", "No quest " + code));
        LocalDateTime now = Times.nowUtc(clock);
        UserQuest row = switch (quest.getKind()) {
            case Quest.MAIN -> claimMain(userId, quest, now);
            case Quest.DAILY -> claimDaily(userId, quest, now);
            default -> claimBonus(userId, quest, now);
        };

        profile.setKnowledgePoints(profile.getKnowledgePoints() + quest.getRewardKp());
        profile.setBlueprintShards(profile.getBlueprintShards() + quest.getRewardShards());
        users.save(profile);
        QuestDto dto = toDto(quest, row.getProgress(), true, true);
        return new ClaimResultDto(dto, ResourcesDto.of(profile), List.of());
    }

    // ---------------------------------------------------------------------------------------------
    // Chính tuyến: các bước đã nhận + một bước hiện tại
    // ---------------------------------------------------------------------------------------------

    private List<QuestDto> mainView(UUID userId) {
        Map<String, UserQuest> claimed = claimedMain(userId);
        List<QuestDto> view = new ArrayList<>();
        for (Quest quest : quests.findByKindOrderBySortOrderAsc(Quest.MAIN)) {
            UserQuest row = claimed.get(quest.getCode());
            if (row != null) {
                view.add(toDto(quest, quest.getGoalValue(), true, true));
                continue;
            }
            if (isUnlocked(quest, claimed)) {
                int current = Math.min(quest.getGoalValue(), goalProgress(userId, quest));
                view.add(toDto(quest, current, current >= quest.getGoalValue(), false));
            }
            break; // chỉ hiện một bước chưa nhận
        }
        return view;
    }

    private UserQuest claimMain(UUID userId, Quest quest, LocalDateTime now) {
        Map<String, UserQuest> claimed = claimedMain(userId);
        if (claimed.containsKey(quest.getCode())) {
            throw ApiException.conflict("ALREADY_CLAIMED", "Quest already claimed");
        }
        if (!isUnlocked(quest, claimed) || goalProgress(userId, quest) < quest.getGoalValue()) {
            throw ApiException.conflict("NOT_COMPLETED", "Quest is not completed yet");
        }
        UserQuest row = new UserQuest();
        row.setUserId(userId);
        row.setQuestCode(quest.getCode());
        row.setProgress(quest.getGoalValue());
        row.setCompletedAt(now);
        row.setClaimedAt(now);
        return userQuests.save(row);
    }

    private Map<String, UserQuest> claimedMain(UUID userId) {
        return userQuests.findByUserIdAndPeriodDateIsNull(userId).stream()
                .filter(UserQuest::isClaimed)
                .collect(Collectors.toMap(UserQuest::getQuestCode, Function.identity()));
    }

    private static boolean isUnlocked(Quest quest, Map<String, UserQuest> claimed) {
        return quest.getPrerequisiteCode() == null
                || claimed.containsKey(quest.getPrerequisiteCode());
    }

    /** Tiến độ suy ra từ trạng thái (system-design §11.4). */
    private int goalProgress(UUID userId, Quest quest) {
        return switch (quest.getGoalType()) {
            case BUILDING_LEVEL -> buildingOf(quest.getGoalRef())
                    .map(building -> city.currentLevel(userId, building.getId()))
                    .orElse(0);
            case COLLECTED_WORDS -> buildingOf(quest.getGoalRef())
                    .map(building -> collectedWords(userId, building))
                    .orElse(0);
            case EXAM_PASSED -> examPassed(userId, quest.getGoalRef()) ? 1 : 0;
            default -> 0;
        };
    }

    private java.util.Optional<Building> buildingOf(String code) {
        return code == null ? java.util.Optional.empty() : buildings.findByCode(code);
    }

    private int collectedWords(UUID userId, Building building) {
        List<Long> words = content.vocabularyIdsOf(building.getId(), 1);
        if (words.isEmpty()) {
            return 0;
        }
        return (int) progress.countByUserIdAndVocabularyIdInAndCollectedAtIsNotNull(userId, words);
    }

    private boolean examPassed(UUID userId, String examCode) {
        return exams.findByCode(examCode)
                .map(Exam::getId)
                .map(examId -> attempts.existsByUserIdAndExamIdAndStatus(
                        userId, examId, ExamAttempt.PASSED))
                .orElse(false);
    }

    // ---------------------------------------------------------------------------------------------
    // Hằng ngày + thưởng hôm nay
    // ---------------------------------------------------------------------------------------------

    private List<QuestDto> dailyView(UUID userId) {
        Map<String, Quest> templates = quests.findByKindOrderBySortOrderAsc(Quest.DAILY).stream()
                .collect(Collectors.toMap(Quest::getCode, Function.identity()));
        return tracker.todayDaily(userId).stream()
                .map(row -> toDto(templates.get(row.getQuestCode()), row.getProgress(),
                        row.isCompleted(), row.isClaimed()))
                .toList();
    }

    private QuestDto bonusView(UUID userId, List<QuestDto> daily) {
        Quest bonus = bonusQuest();
        if (bonus == null) {
            return null;
        }
        int done = (int) daily.stream().filter(QuestDto::completed).count();
        boolean claimed = userQuests.findByUserIdAndQuestCodeAndPeriodDate(
                userId, bonus.getCode(), today()).map(UserQuest::isClaimed).orElse(false);
        boolean completed = !daily.isEmpty() && done == daily.size();
        return toDto(bonus, done, completed, claimed);
    }

    private UserQuest claimDaily(UUID userId, Quest quest, LocalDateTime now) {
        UserQuest row = tracker.todayDaily(userId).stream()
                .filter(candidate -> candidate.getQuestCode().equals(quest.getCode()))
                .findFirst()
                .orElseThrow(() -> ApiException.notFound(
                        "QUEST_NOT_FOUND", "Quest is not one of today's quests"));
        if (row.isClaimed()) {
            throw ApiException.conflict("ALREADY_CLAIMED", "Quest already claimed");
        }
        if (!row.isCompleted()) {
            throw ApiException.conflict("NOT_COMPLETED", "Quest is not completed yet");
        }
        row.setClaimedAt(now);
        return userQuests.save(row);
    }

    private UserQuest claimBonus(UUID userId, Quest quest, LocalDateTime now) {
        LocalDate today = today();
        List<UserQuest> daily = tracker.todayDaily(userId);
        if (daily.isEmpty() || !daily.stream().allMatch(UserQuest::isCompleted)) {
            throw ApiException.conflict("NOT_COMPLETED", "Finish all daily quests first");
        }
        UserQuest row = userQuests.findByUserIdAndQuestCodeAndPeriodDate(
                userId, quest.getCode(), today).orElseGet(UserQuest::new);
        if (row.isClaimed()) {
            throw ApiException.conflict("ALREADY_CLAIMED", "Quest already claimed");
        }
        row.setUserId(userId);
        row.setQuestCode(quest.getCode());
        row.setPeriodDate(today);
        row.setProgress(daily.size());
        row.setCompletedAt(now);
        row.setClaimedAt(now);
        return userQuests.save(row);
    }

    private Quest bonusQuest() {
        List<Quest> list = quests.findByKindOrderBySortOrderAsc(Quest.BONUS);
        return list.isEmpty() ? null : list.get(0);
    }

    // ---------------------------------------------------------------------------------------------

    private static QuestDto toDto(Quest quest, int progress, boolean completed, boolean claimed) {
        return new QuestDto(
                quest.getCode(),
                quest.getKind(),
                quest.getTitle(),
                quest.getDescription(),
                progress,
                quest.getGoalValue(),
                completed,
                claimed,
                quest.getRewardKp(),
                quest.getRewardShards());
    }

    private UserProfile requireUser(UUID userId) {
        return users.findById(userId).orElseThrow(UserProfileNotFoundException::new);
    }

    private LocalDate today() {
        return Times.localDate(Times.nowUtc(clock), balance.zone());
    }

    /** 0h hôm sau theo giờ Việt Nam — lúc nhiệm vụ hằng ngày làm mới. */
    private Instant resetsAt() {
        return Times.toInstant(Times.dayRangeUtc(today(), balance.zone())[1]);
    }
}
