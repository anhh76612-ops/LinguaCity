package com.linguacity.backend.learning.service;

import com.linguacity.backend.achievement.service.AchievementService;
import com.linguacity.backend.city.service.CityService;
import com.linguacity.backend.common.config.BalanceProperties;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.content.entity.Building;
import com.linguacity.backend.content.entity.Question;
import com.linguacity.backend.content.entity.Vocabulary;
import com.linguacity.backend.content.repository.BuildingRepository;
import com.linguacity.backend.content.repository.QuestionRepository;
import com.linguacity.backend.content.repository.VocabularyRepository;
import com.linguacity.backend.content.service.ContentService;
import com.linguacity.backend.event.service.CityEventService;
import com.linguacity.backend.identity.dto.ResourcesDto;
import com.linguacity.backend.identity.entity.TutorialStep;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.learning.dto.LearningDtos.AnswerResultDto;
import com.linguacity.backend.learning.dto.LearningDtos.CollectionDto;
import com.linguacity.backend.learning.dto.LearningDtos.CompleteResultDto;
import com.linguacity.backend.learning.dto.LearningDtos.ProgressDto;
import com.linguacity.backend.learning.dto.LearningDtos.ProgressItemDto;
import com.linguacity.backend.learning.dto.LearningDtos.SessionDto;
import com.linguacity.backend.learning.engine.AnswerGrader;
import com.linguacity.backend.learning.engine.WordSelector;
import com.linguacity.backend.learning.entity.LearningSession;
import com.linguacity.backend.learning.entity.LearningSessionItem;
import com.linguacity.backend.learning.entity.LearningSessionItemId;
import com.linguacity.backend.learning.entity.SessionStatus;
import com.linguacity.backend.learning.entity.SessionType;
import com.linguacity.backend.learning.entity.UserVocabProgress;
import com.linguacity.backend.learning.repository.LearningSessionItemRepository;
import com.linguacity.backend.learning.repository.LearningSessionRepository;
import com.linguacity.backend.learning.repository.UserVocabProgressRepository;
import com.linguacity.backend.player.service.StreakService;
import com.linguacity.backend.quest.service.QuestTracker;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Phiên học, bài kiểm tra trình độ, và phần nộp / kết thúc chung cho mọi kiểu phiên (luyện tập,
 * sự kiện) — ADR-013, ADR-014, ADR-015; system-design §10.3, §11.5, §11.6.
 * <p>
 * {@code noRollbackFor = ApiException}: khi phát hiện phiên quá hạn, server lưu trạng thái
 * EXPIRED rồi mới báo 410 — không để rollback xoá mất trạng thái đó. Mọi ApiException khác đều
 * được ném TRƯỚC khi ghi dữ liệu.
 */
@Service
@Transactional(noRollbackFor = ApiException.class)
public class LearningService {

    public static final String HOUSING = "HOUSING";

    private final UserProfileRepository users;
    private final BuildingRepository buildings;
    private final VocabularyRepository vocabularies;
    private final QuestionRepository questions;
    private final LearningSessionRepository sessions;
    private final LearningSessionItemRepository items;
    private final UserVocabProgressRepository progress;
    private final ContentService content;
    private final CityService city;
    private final AchievementService achievements;
    private final SessionFactory factory;
    private final VocabProgressRecorder recorder;
    private final QuestionViews views;
    private final QuestTracker tracker;
    private final StreakService streak;
    private final CityEventService cityEvents;
    private final BalanceProperties balance;
    private final Clock clock;

    public LearningService(
            UserProfileRepository users,
            BuildingRepository buildings,
            VocabularyRepository vocabularies,
            QuestionRepository questions,
            LearningSessionRepository sessions,
            LearningSessionItemRepository items,
            UserVocabProgressRepository progress,
            ContentService content,
            CityService city,
            AchievementService achievements,
            SessionFactory factory,
            VocabProgressRecorder recorder,
            QuestionViews views,
            QuestTracker tracker,
            StreakService streak,
            CityEventService cityEvents,
            BalanceProperties balance,
            Clock clock) {
        this.users = users;
        this.buildings = buildings;
        this.vocabularies = vocabularies;
        this.questions = questions;
        this.sessions = sessions;
        this.items = items;
        this.progress = progress;
        this.content = content;
        this.city = city;
        this.achievements = achievements;
        this.factory = factory;
        this.recorder = recorder;
        this.views = views;
        this.tracker = tracker;
        this.streak = streak;
        this.cityEvents = cityEvents;
        this.balance = balance;
        this.clock = clock;
    }

    /**
     * Kết quả tạo phiên: {@code created = false} nghĩa là trả lại phiên ACTIVE đang dở (UC_05 1a).
     */
    public record Started(SessionDto session, boolean created) {}

    /** KP của một phiên: phần cơ bản, thưởng, và hệ số giảm theo số phiên trong ngày (§10.6). */
    private record KpBreakdown(int base, int bonus, int dailyIndex, double multiplier) {

        int total() {
            return (int) Math.round((base + bonus) * multiplier);
        }
    }

    // =============================================================================================
    // Tạo phiên
    // =============================================================================================

    /** POST /learning/sessions — bài học 20 từ / 30 câu ở một công trình (ADR-015 §1). */
    public Started start(UUID userId, String buildingCode) {
        requireUser(userId);
        Building building = findBuilding(buildingCode);
        LocalDateTime now = Times.nowUtc(clock);

        Optional<LearningSession> active = factory.activeSession(
                userId, building.getId(), SessionType.LEARNING, now);
        if (active.isPresent()) {
            return new Started(factory.toDto(active.get(), now), false);
        }

        int level = Math.min(
                building.getMaxLevel(), city.currentLevel(userId, building.getId()) + 1);
        List<Long> chosen = chooseLessonWords(userId, building, level, now);
        int writingCount = balance.getQuestionsPerSession() - chosen.size();
        List<long[]> all = factory.lessonItems(chosen, writingCount);
        if (all.isEmpty()) {
            throw ApiException.conflict("NO_CONTENT", "This building has no questions yet");
        }

        LearningSession session = factory.newSession(
                userId, building.getId(), level, SessionType.LEARNING, all.size(), now,
                Duration.ofMinutes(balance.getSessionTtlMinutes()));
        factory.saveItems(session, all);
        return new Started(factory.toDto(session, now), true);
    }

    /**
     * POST /tutorial/placement — chỉ ở bước PLACEMENT (ADR-014): 30 câu từ 20 từ House Lv1,
     * tier 1 → 2 → 3.
     */
    public Started startPlacement(UUID userId) {
        UserProfile profile = requireUser(userId);
        if (profile.getTutorialStep() != TutorialStep.PLACEMENT) {
            throw new ApiException(HttpStatus.CONFLICT, "INVALID_STEP",
                    "Placement test is only available at step PLACEMENT",
                    Map.of("current", profile.getTutorialStep().name()));
        }
        Building housing = buildings.findByCode(HOUSING)
                .orElseThrow(() -> ApiException.notFound(
                        "BUILDING_NOT_FOUND", "HOUSING is missing"));
        LocalDateTime now = Times.nowUtc(clock);
        Optional<LearningSession> active = factory.activeSession(
                userId, housing.getId(), SessionType.PLACEMENT, now);
        if (active.isPresent()) {
            return new Started(factory.toDto(active.get(), now), false);
        }

        List<Long> words = new ArrayList<>(content.vocabularyIdsOf(housing.getId(), 1));
        if (words.isEmpty()) {
            throw ApiException.conflict("NO_CONTENT", "HOUSING level 1 has no words");
        }
        Collections.shuffle(words, factory.random());
        words = new ArrayList<>(words.subList(
                0, Math.min(balance.getPlacementWords(), words.size())));
        List<long[]> all = placementItems(words);

        LearningSession session = factory.newSession(
                userId, housing.getId(), 1, SessionType.PLACEMENT, all.size(), now,
                Duration.ofHours(balance.getPlacementTtlHours()));
        factory.saveItems(session, all);
        return new Started(factory.toDto(session, now), true);
    }

    // =============================================================================================
    // Xem, nộp, kết thúc (mọi kiểu phiên)
    // =============================================================================================

    @Transactional(readOnly = true)
    public SessionDto get(UUID userId, UUID sessionId) {
        LearningSession session = own(userId, sessionId);
        return factory.toDto(session, Times.nowUtc(clock));
    }

    /** Bơ chỉ đúng với xác suất này (S5, character bible: "thiên tài cẩu thả"). */
    static final double HINT_POINT_ACCURACY = 0.75;

    /**
     * S5: gợi ý của Bơ. Không dùng được trong bài kiểm tra trình độ. Trắc nghiệm: chỉ vào một
     * phương án (đúng với xác suất {@link #HINT_POINT_ACCURACY}); điền từ: hé chữ cái đầu và nghĩa.
     * Không lộ đáp án trước khi hỏi: chỉ trả về khi người chơi chủ động xin gợi ý.
     */
    @Transactional(readOnly = true)
    public com.linguacity.backend.learning.dto.LearningDtos.HintDto hint(
            UUID userId, UUID sessionId, int itemNo) {
        LearningSession session = own(userId, sessionId);
        ensureOpen(session, Times.nowUtc(clock));
        if (session.getType() == SessionType.PLACEMENT) {
            throw ApiException.conflict("HINT_NOT_ALLOWED", "No hints in placement");
        }
        LearningSessionItem item = items.findById(new LearningSessionItemId(sessionId, itemNo))
                .orElseThrow(() -> ApiException.notFound("ITEM_NOT_FOUND", "No item " + itemNo));
        if (item.isAnswered()) {
            throw ApiException.conflict("ALREADY_ANSWERED", "Item " + itemNo + " was already answered");
        }
        Question question = questions.findById(item.getQuestionId()).orElseThrow();
        String meaning = vocabularies.findById(item.getVocabularyId()).map(Vocabulary::getMeaning).orElse(null);
        String answer = question.getAnswer();
        java.util.List<String> options = new java.util.ArrayList<>();
        var meta = views.metadataOf(question);
        if (meta != null && meta.has("options")) {
            meta.get("options").forEach(o -> options.add(o.asString()));
        }
        if (options != null && options.size() > 1) {
            java.util.Random random = new java.util.Random();
            String pick = answer;
            if (random.nextDouble() >= HINT_POINT_ACCURACY) {
                java.util.List<String> wrong = options.stream().filter(o -> !o.equalsIgnoreCase(answer)).toList();
                if (!wrong.isEmpty()) {
                    pick = wrong.get(random.nextInt(wrong.size()));
                }
            }
            return new com.linguacity.backend.learning.dto.LearningDtos.HintDto("POINT", pick, null, null);
        }
        String letter = answer == null || answer.isBlank() ? null : answer.substring(0, 1);
        return new com.linguacity.backend.learning.dto.LearningDtos.HintDto("LETTER", null, letter, meaning);
    }

    public AnswerResultDto answer(UUID userId, UUID sessionId, int itemNo, String answer) {
        LearningSession session = own(userId, sessionId);
        LocalDateTime now = Times.nowUtc(clock);
        ensureOpen(session, now);
        LearningSessionItem item = items.findById(new LearningSessionItemId(sessionId, itemNo))
                .orElseThrow(() -> ApiException.notFound("ITEM_NOT_FOUND", "No item " + itemNo));
        if (item.isAnswered()) {
            throw ApiException.conflict(
                    "ALREADY_ANSWERED", "Item " + itemNo + " was already answered");
        }
        Question question = questions.findById(item.getQuestionId()).orElseThrow();
        boolean correct = AnswerGrader.isCorrect(
                answer, question.getAnswer(), views.acceptedAnswers(question));

        item.setAnswerGiven(answer);
        item.setIsCorrect(correct);
        item.setAnsweredAt(now);
        items.save(item);
        updateStreak(session, correct);

        // Mastery Engine — chỉ cho từ TARGET của câu (item.vocabularyId) (BR-LEARN-03)
        Vocabulary vocabulary = vocabularies.findById(item.getVocabularyId()).orElseThrow();
        int max = balance.maxMastery(vocabulary.getDifficultyRank());
        VocabProgressRecorder.Outcome outcome =
                recordProgress(session, userId, vocabulary.getId(), correct, max, now);

        return new AnswerResultDto(
                itemNo,
                correct,
                question.getAnswer(),
                question.getExplanation(),
                vocabulary.getId(),
                VocabProgressRecorder.effectiveMastery(outcome.row(), now),
                max,
                outcome.collectedNow(),
                session.getCurrentStreak());
    }

    /** Mastery + sưu tầm, thưởng luyện tập (một lần mỗi từ mỗi ngày), tiến độ nhiệm vụ. */
    private VocabProgressRecorder.Outcome recordProgress(LearningSession session, UUID userId,
            Long vocabularyId, boolean correct, int max, LocalDateTime now) {
        boolean rewarded = isRewardable(session, userId, vocabularyId, now);
        // ADR-017: luyện tập không đổi Mastery; bài học / sự kiện thì có
        boolean practice = session.getType().isPractice();
        VocabProgressRecorder.Outcome outcome =
                recorder.record(userId, vocabularyId, correct, max, !practice, now);
        if (practice && rewarded) {
            rewardPracticeAnswer(session, outcome.row(), correct, now);
        }
        awardMaterials(userId, practice, rewarded, correct, outcome);
        trackAnswer(userId, session, outcome);
        return outcome;
    }

    public CompleteResultDto complete(UUID userId, UUID sessionId) {
        LearningSession session = own(userId, sessionId);
        LocalDateTime now = Times.nowUtc(clock);
        UserProfile profile = requireUser(userId);
        String buildingCode = factory.buildingCode(session.getBuildingId());

        // idempotent: trả lại kết quả cũ, không cộng KP lần nữa
        if (session.getStatus() == SessionStatus.COMPLETED) {
            return previousResult(session, profile, buildingCode);
        }
        if (factory.expireIfNeeded(session, now)) {
            throw new ApiException(HttpStatus.GONE, "SESSION_EXPIRED", "Session expired");
        }
        if (items.countByIdSessionIdAndAnsweredAtIsNull(sessionId) > 0) {
            throw ApiException.conflict("INCOMPLETE", "Some items are not answered yet");
        }

        KpBreakdown kp = kpFor(session, userId, now);
        boolean eventPassed = session.getType() == SessionType.EVENT
                && session.getCorrectCount() >= balance.getEventPassCorrect();
        int shards = eventPassed ? balance.getEventRewardShards() : 0;
        session.setStatus(SessionStatus.COMPLETED);
        session.setCompletedAt(now);
        session.setKpAwarded(kp.total());
        // @Version: complete song song thì lệnh sau thất bại tại đây → không cộng KP đôi
        sessions.saveAndFlush(session);

        profile.setKnowledgePoints(profile.getKnowledgePoints() + kp.total());
        profile.setBlueprintShards(profile.getBlueprintShards() + shards);
        advanceTutorial(profile, session.getType(), buildingCode);
        users.save(profile);

        CollectionDto collection = collectionOf(session, buildingCode);
        List<String> granted = grantedAfter(session, collection, eventPassed, now);
        return resultOf(session, kp, collection, granted, profile, shards, eventPassed);
    }

    /** Danh hiệu xét sau phiên + danh hiệu chuỗi (nếu hôm nay vừa được tính vào chuỗi). */
    private List<String> grantedAfter(LearningSession session, CollectionDto collection,
            boolean eventPassed, LocalDateTime now) {
        boolean levelFullyCollected = collection != null && collection.total() > 0
                && collection.collected() >= collection.total();
        List<String> granted = new ArrayList<>(achievements.evaluateAfterSession(
                session,
                items.findByIdSessionIdOrderByIdItemNoAsc(session.getId()),
                levelFullyCollected,
                now));
        granted.addAll(afterComplete(session.getUserId(), session, eventPassed, now));
        return granted;
    }

    /** GET /users/me/vocab-progress?since= — để app xem Mastery/sưu tầm khi offline (ADR-004). */
    @Transactional(readOnly = true)
    public ProgressDto progressSince(UUID userId, LocalDateTime sinceUtc) {
        requireUser(userId);
        List<UserVocabProgress> list = sinceUtc == null
                ? progress.findByUserIdOrderByUpdatedAtAsc(userId)
                : progress.findByUserIdAndUpdatedAtAfterOrderByUpdatedAtAsc(userId, sinceUtc);
        Map<Long, String> rank = vocabularies.findAllById(list.stream()
                .map(UserVocabProgress::getVocabularyId).toList())
                .stream().collect(Collectors.toMap(
                        Vocabulary::getId, Vocabulary::getDifficultyRank));
        List<ProgressItemDto> dtos = list.stream()
                .map(row -> new ProgressItemDto(
                        row.getVocabularyId(),
                        VocabProgressRecorder.effectiveMastery(row, Times.nowUtc(clock)),
                        balance.maxMastery(rank.get(row.getVocabularyId())),
                        row.isCollected(),
                        Times.toInstant(row.getFirstSeenAt()),
                        Times.toInstant(row.getLastReviewedAt())))
                .toList();
        return new ProgressDto(Times.toInstant(Times.nowUtc(clock)), dtos);
    }

    // =============================================================================================
    // Chọn từ, chọn câu
    // =============================================================================================

    /**
     * BR-LEARN-08/09: từ chưa sưu tầm ở mọi level ≤ level học là từ mới; từ đã sưu tầm để ôn.
     * Người xây nhà khi chưa sưu tầm đủ từ Level 1 vẫn tiếp tục gặp những từ còn thiếu.
     */
    private List<Long> chooseLessonWords(
            UUID userId, Building building, int level, LocalDateTime now) {
        List<Long> all = new ArrayList<>();
        for (int lower = 1; lower <= level; lower++) {
            all.addAll(content.vocabularyIdsOf(building.getId(), lower));
        }
        if (all.isEmpty()) {
            throw ApiException.conflict("NO_CONTENT", "This building has no lessons yet");
        }
        Map<Long, UserVocabProgress> known = progressOf(userId, all);
        List<WordSelector.Candidate> pool = new ArrayList<>();
        for (Long id : all) {
            UserVocabProgress row = known.get(id);
            boolean collected = row != null && row.isCollected();
            pool.add(candidate(id, collected, row));
        }
        return WordSelector.select(pool, balance.getWordsPerSession(), now,
                Duration.ofMinutes(balance.getReviewCooldownMinutes()), factory.random());
    }

    /** Nửa đầu số từ ở tier 1, nửa sau tier 2, rồi thêm câu tier 3 cho đủ số câu (ADR-014). */
    private List<long[]> placementItems(List<Long> words) {
        Map<Long, List<Question>> byVocab = factory.targetQuestions(words);
        int half = (words.size() + 1) / 2;
        int hardCount = Math.max(0, balance.getPlacementQuestions() - words.size());
        List<long[]> all = new ArrayList<>();
        for (int i = 0; i < words.size(); i++) {
            int tier = i < half ? 1 : 2;
            factory.addTier(all, byVocab, words.get(i), tier);
        }
        List<Long> hard = new ArrayList<>(words);
        Collections.shuffle(hard, factory.random());
        hard.stream().limit(hardCount)
                .forEach(vocabId -> factory.addTier(all, byVocab, vocabId, 3));
        return all;
    }

    // =============================================================================================
    // Hỗ trợ nộp câu
    // =============================================================================================

    private void updateStreak(LearningSession session, boolean correct) {
        if (correct) {
            session.setCorrectCount(session.getCorrectCount() + 1);
            session.setCurrentStreak(session.getCurrentStreak() + 1);
            session.setBestStreak(Math.max(session.getBestStreak(), session.getCurrentStreak()));
        } else {
            session.setCurrentStreak(0);
        }
        sessions.save(session);
    }

    /** Luyện tập: mỗi từ chỉ được thưởng KP / Mastery một lần mỗi ngày (BR-PRAC-03). */
    private boolean isRewardable(
            LearningSession session, UUID userId, Long vocabularyId, LocalDateTime now) {
        if (!session.getType().isPractice()) {
            return true;
        }
        LocalDate today = Times.localDate(now, balance.zone());
        return progress.findByUserIdAndVocabularyId(userId, vocabularyId)
                .map(row -> !today.equals(row.getLastRewardedOn()))
                .orElse(true);
    }

    /**
     * Câu đầu tiên trong ngày của từ (đúng hay sai) đã đổi Mastery, nên ghi ngày để các câu sau
     * cùng ngày không đổi nữa (BR-PRAC-03, lỗi B2). KP chỉ cộng khi câu đó đúng.
     */
    private void rewardPracticeAnswer(
            LearningSession session, UserVocabProgress row, boolean correct, LocalDateTime now) {
        row.setLastRewardedOn(Times.localDate(now, balance.zone()));
        progress.save(row);
        if (!correct) {
            return;
        }
        int kpSoFar = session.getKpAwarded() == null ? 0 : session.getKpAwarded();
        session.setKpAwarded(kpSoFar + balance.getPracticeKpPerCorrect());
        sessions.save(session);
    }

    /**
     * ADR-017 kinh tế v2: học từ mới (sưu tầm lần đầu trong bài học/sự kiện) ra 1 Gạch; ôn đúng
     * trong luyện tập (lần đầu trong ngày của từ) ra 1 Gỗ.
     */
    private void awardMaterials(UUID userId, boolean practice, boolean rewarded, boolean correct,
            VocabProgressRecorder.Outcome outcome) {
        int bricks = !practice && outcome.collectedNow() ? 1 : 0;
        int wood = practice && rewarded && correct ? 1 : 0;
        if (bricks == 0 && wood == 0) {
            return;
        }
        UserProfile profile = requireUser(userId);
        profile.setBricks(profile.getBricks() + bricks);
        profile.setWood(profile.getWood() + wood);
        users.save(profile);
    }

    /** Tiến độ nhiệm vụ hằng ngày theo từng câu trả lời (system-design §11.4). */
    private void trackAnswer(
            UUID userId, LearningSession session, VocabProgressRecorder.Outcome outcome) {
        if (outcome.collectedNow()) {
            tracker.record(userId, QuestTracker.NEW_WORDS, 1);
        }
        if (outcome.wasCollected()) {
            tracker.record(userId, QuestTracker.REVIEW_WORDS, 1);
        }
        tracker.recordMax(userId, QuestTracker.STREAK_CORRECT, session.getCurrentStreak());
    }

    // =============================================================================================
    // Hỗ trợ kết thúc phiên
    // =============================================================================================

    private KpBreakdown kpFor(LearningSession session, UUID userId, LocalDateTime now) {
        int correct = session.getCorrectCount();
        return switch (session.getType()) {
            case PLACEMENT -> new KpBreakdown(
                    correct * balance.getPlacementKpPerCorrect(),
                    balance.getPlacementWelcomeKp(),
                    0,
                    1.0);
            // KP luyện tập đã cộng dồn từng câu được thưởng (BR-PRAC-03)
            case PRACTICE_REVIEW, PRACTICE_MIXED -> new KpBreakdown(
                    session.getKpAwarded() == null ? 0 : session.getKpAwarded(), 0, 0, 1.0);
            case EVENT -> new KpBreakdown(
                    correct >= balance.getEventPassCorrect() ? balance.getEventRewardKp() : 0,
                    0,
                    0,
                    1.0);
            case LEARNING -> learningKp(session, userId, now);
        };
    }

    /** BR-LEARN-05: đúng × KP mỗi câu, thưởng khi ≥ tỉ lệ, giảm từ phiên thứ N trong ngày. */
    private KpBreakdown learningKp(LearningSession session, UUID userId, LocalDateTime now) {
        int correct = session.getCorrectCount();
        int total = session.getTotalCount();
        int base = correct * balance.getKpPerCorrect();
        boolean bonusEarned = total > 0 && (double) correct / total >= balance.getKpBonusRatio();
        int bonus = bonusEarned ? balance.getKpBonus() : 0;
        LocalDateTime[] day = Times.dayRangeUtc(now, balance.zone());
        long completedToday = sessions.countCompletedBetween(
                userId, SessionType.LEARNING, SessionStatus.COMPLETED, day[0], day[1]);
        int dailyIndex = (int) completedToday + 1;
        double multiplier = dailyIndex <= balance.getKpFullSessionsPerDay()
                ? 1.0
                : balance.getKpReducedMultiplier();
        return new KpBreakdown(base, bonus, dailyIndex, multiplier);
    }

    /** Sự kiện được giải, nhiệm vụ "học một bài", chuỗi ngày. Trả danh hiệu mới (chuỗi). */
    private List<String> afterComplete(
            UUID userId, LearningSession session, boolean eventPassed, LocalDateTime now) {
        if (eventPassed && cityEvents.resolveBySession(session.getId(), now)) {
            tracker.record(userId, QuestTracker.EVENT_RESOLVED, 1);
        }
        boolean lesson = session.getType() == SessionType.LEARNING
                || session.getType().isPractice();
        if (!lesson) {
            return List.of();
        }
        // Nhiệm vụ "học một bài" xong có thể đã tính ngày và trao danh hiệu ở trong tracker;
        // gộp cả hai kết quả để không mất danh hiệu (lỗi B3).
        List<String> titles = new ArrayList<>(
                tracker.record(userId, QuestTracker.LESSON_COMPLETED, 1));
        titles.addAll(streak.recordActivity(userId));
        return titles;
    }

    /** Bước tutorial do server chuyển khi xong phiên (ADR-014). */
    private static void advanceTutorial(
            UserProfile profile, SessionType type, String buildingCode) {
        TutorialStep step = profile.getTutorialStep();
        if (type == SessionType.PLACEMENT && step == TutorialStep.PLACEMENT) {
            profile.setTutorialStep(TutorialStep.LEARN_HOUSE);
        } else if (type == SessionType.LEARNING && HOUSING.equals(buildingCode)
                && step == TutorialStep.LEARN_HOUSE) {
            profile.setTutorialStep(TutorialStep.BUILD_HOUSE);
        }
    }

    /** Kết quả của phiên đã hoàn thành trước đó (gọi complete lần hai không cộng KP lần nữa). */
    private CompleteResultDto previousResult(
            LearningSession session, UserProfile profile, String buildingCode) {
        int kp = Optional.ofNullable(session.getKpAwarded()).orElse(0);
        return new CompleteResultDto(
                session.getId(),
                session.getType().name(),
                session.getCorrectCount(),
                session.getTotalCount(),
                kp,
                null,
                null,
                null,
                null,
                collectionOf(session, buildingCode),
                List.of(),
                ResourcesDto.of(profile),
                profile.getTutorialStep(),
                null,
                null);
    }

    private static CompleteResultDto resultOf(LearningSession session, KpBreakdown kp,
            CollectionDto collection, List<String> granted, UserProfile profile, int shards,
            boolean eventPassed) {
        // Hệ số trong ngày chỉ có nghĩa với phiên học thường
        boolean learning = session.getType() == SessionType.LEARNING;
        boolean event = session.getType() == SessionType.EVENT;
        return new CompleteResultDto(
                session.getId(),
                session.getType().name(),
                session.getCorrectCount(),
                session.getTotalCount(),
                kp.total(),
                kp.base(),
                kp.bonus(),
                learning ? kp.dailyIndex() : null,
                learning ? kp.multiplier() : null,
                collection,
                granted,
                ResourcesDto.of(profile),
                profile.getTutorialStep(),
                event ? shards : null,
                event ? eventPassed : null);
    }

    /** Bộ sưu tầm của (công trình, level) — phiên không gắn công trình thì không có. */
    private CollectionDto collectionOf(LearningSession session, String buildingCode) {
        if (session.getBuildingId() == null) {
            return null;
        }
        int level = session.getVocabLevel();
        List<Long> ids = content.vocabularyIdsOf(session.getBuildingId(), level);
        long collected = ids.isEmpty()
                ? 0
                : progress.countByUserIdAndVocabularyIdInAndCollectedAtIsNotNull(
                        session.getUserId(), ids);
        return new CollectionDto(buildingCode, level, collected, ids.size());
    }

    // =============================================================================================
    // Truy vấn chung
    // =============================================================================================

    private UserProfile requireUser(UUID userId) {
        return users.findById(userId).orElseThrow(UserProfileNotFoundException::new);
    }

    private LearningSession own(UUID userId, UUID sessionId) {
        return sessions.findById(sessionId)
                .filter(session -> session.getUserId().equals(userId))
                .orElseThrow(() -> ApiException.notFound("SESSION_NOT_FOUND", "Session not found"));
    }

    private void ensureOpen(LearningSession session, LocalDateTime now) {
        if (factory.expireIfNeeded(session, now)) {
            throw new ApiException(HttpStatus.GONE, "SESSION_EXPIRED", "Session expired");
        }
        if (session.getStatus() != SessionStatus.ACTIVE) {
            throw ApiException.conflict("SESSION_CLOSED", "Session is already completed");
        }
    }

    private Building findBuilding(String buildingCode) {
        return buildings.findByCode(buildingCode.toUpperCase(Locale.ROOT))
                .orElseThrow(() -> ApiException.notFound(
                        "BUILDING_NOT_FOUND", "Unknown building " + buildingCode));
    }

    private Map<Long, UserVocabProgress> progressOf(UUID userId, Collection<Long> vocabIds) {
        if (vocabIds.isEmpty()) {
            return Map.of();
        }
        return progress.findByUserIdAndVocabularyIdIn(userId, vocabIds).stream()
                .collect(Collectors.toMap(UserVocabProgress::getVocabularyId, Function.identity()));
    }

    private static WordSelector.Candidate candidate(
            Long id, boolean review, UserVocabProgress vocabProgress) {
        if (vocabProgress == null) {
            return new WordSelector.Candidate(id, review, false, 0, null);
        }
        return new WordSelector.Candidate(
                id,
                review,
                vocabProgress.isCollected(),
                VocabProgressRecorder.effectiveMastery(vocabProgress,
                        LocalDateTime.now(java.time.ZoneOffset.UTC)),
                vocabProgress.getLastReviewedAt());
    }
}
