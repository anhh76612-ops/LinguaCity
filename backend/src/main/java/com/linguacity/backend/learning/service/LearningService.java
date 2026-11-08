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
import com.linguacity.backend.content.repository.QuestionVocabularyRepository;
import com.linguacity.backend.content.repository.VocabularyRepository;
import com.linguacity.backend.content.service.ContentService;
import com.linguacity.backend.identity.dto.ResourcesDto;
import com.linguacity.backend.identity.entity.TutorialStep;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.learning.dto.LearningDtos.*;
import com.linguacity.backend.learning.engine.AnswerGrader;
import com.linguacity.backend.learning.engine.MasteryEngine;
import com.linguacity.backend.learning.engine.WordSelector;
import com.linguacity.backend.learning.entity.*;
import com.linguacity.backend.learning.repository.LearningSessionItemRepository;
import com.linguacity.backend.learning.repository.LearningSessionRepository;
import com.linguacity.backend.learning.repository.UserVocabProgressRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.security.SecureRandom;
import java.time.Clock;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Phiên học và bài kiểm tra trình độ (ADR-013, ADR-014; system-design §10.3.2–§10.3.3).
 * <p>
 * {@code noRollbackFor = ApiException}: khi phát hiện phiên quá hạn, server lưu trạng thái EXPIRED
 * rồi mới báo 410 —
 * không để rollback xoá mất trạng thái đó. Mọi ApiException khác đều được ném TRƯỚC khi ghi dữ
 * liệu.
 */
@Service
@Transactional(noRollbackFor = ApiException.class)
public class LearningService {

    public static final String HOUSING = "HOUSING";

    private final UserProfileRepository users;
    private final BuildingRepository buildings;
    private final VocabularyRepository vocabularies;
    private final QuestionRepository questions;
    private final QuestionVocabularyRepository questionVocabularies;
    private final LearningSessionRepository sessions;
    private final LearningSessionItemRepository items;
    private final UserVocabProgressRepository progress;
    private final ContentService content;
    private final CityService city;
    private final AchievementService achievements;
    private final BalanceProperties balance;
    private final ObjectMapper json;
    private final Clock clock;
    private final Random random = new SecureRandom();

    public LearningService(
            UserProfileRepository users,
            BuildingRepository buildings,
            VocabularyRepository vocabularies,
            QuestionRepository questions,
            QuestionVocabularyRepository questionVocabularies,
            LearningSessionRepository sessions,
            LearningSessionItemRepository items,
            UserVocabProgressRepository progress,
            ContentService content,
            CityService city,
            AchievementService achievements,
            BalanceProperties balance,
            ObjectMapper json,
            Clock clock) {
        this.users = users;
        this.buildings = buildings;
        this.vocabularies = vocabularies;
        this.questions = questions;
        this.questionVocabularies = questionVocabularies;
        this.sessions = sessions;
        this.items = items;
        this.progress = progress;
        this.content = content;
        this.city = city;
        this.achievements = achievements;
        this.balance = balance;
        this.json = json;
        this.clock = clock;
    }

    /**
     * Kết quả tạo phiên: {@code created = false} nghĩa là trả lại phiên ACTIVE đang dở (UC_05 1a).
     */
    public record Started(SessionDto session, boolean created) {}

    // =============================================================================================
    // Tạo phiên
    // =============================================================================================

    public Started start(UUID userId, String buildingCode) {
        requireUser(userId);
        Building building = buildings.findByCode(buildingCode.toUpperCase(Locale.ROOT))
                .orElseThrow(() -> ApiException.notFound(
                        "BUILDING_NOT_FOUND", "Unknown building " + buildingCode));
        LocalDateTime now = Times.nowUtc(clock);

        Optional<LearningSession> active = activeSession(
                userId, building.getId(), SessionType.LEARNING, now);
        if (active.isPresent()) {
            return new Started(toDto(active.get(), now), false);
        }

        int level = Math.min(
                building.getMaxLevel(), city.currentLevel(userId, building.getId()) + 1);
        List<Long> primary = content.vocabularyIdsOf(building.getId(), level);
        List<Long> review = new ArrayList<>();
        for (int l = 1; l < level; l++) {
            review.addAll(content.vocabularyIdsOf(building.getId(), l));
        }
        Map<Long, UserVocabProgress> known = progressOf(userId, union(primary, review));
        // chỉ ôn từ đã sưu tầm
        review.removeIf(id -> !known.containsKey(id) || !known.get(id).isCollected());
        if (primary.isEmpty() && review.isEmpty()) {
            throw ApiException.conflict("NO_CONTENT", "This building has no lessons yet");
        }

        List<WordSelector.Candidate> pool = new ArrayList<>();
        primary.forEach(id -> pool.add(candidate(id, false, known.get(id))));
        review.forEach(id -> pool.add(candidate(id, true, known.get(id))));
        List<Long> chosen = WordSelector.select(pool, balance.getWordsPerSession(), now,
                Duration.ofMinutes(balance.getReviewCooldownMinutes()), random);

        Map<Long, List<Question>> byVocab = targetQuestions(chosen);
        List<long[]> readingItems = new ArrayList<>();
        List<long[]> writingItems = new ArrayList<>();
        for (Long vocabId : chosen) {
            List<Question> qs = byVocab.getOrDefault(vocabId, List.of());
            pick(
                    qs,
                    q -> "READING".equals(q.getSkill())).ifPresent(q -> readingItems.add(new long[]{
                        q.getId(),
                        vocabId
                    }));
            pick(
                    qs,
                    q -> "WRITING".equals(q.getSkill())).ifPresent(q -> writingItems.add(new long[]{
                        q.getId(),
                        vocabId
                    }));
        }
        // câu 1–10 trắc nghiệm, 11–20 điền từ theo thứ tự khác (§10.3.2)
        Collections.shuffle(writingItems, random);
        List<long[]> all = new ArrayList<>(readingItems);
        all.addAll(writingItems);
        if (all.isEmpty()) {
            throw ApiException.conflict("NO_CONTENT", "This building has no questions yet");
        }

        LearningSession session = newSession(userId, building.getId(), level, SessionType.LEARNING,
                all.size(), now,
                Duration.ofMinutes(balance.getSessionTtlMinutes()));
        saveItems(session, all);
        return new Started(toDto(session, now), true);
    }

    /**
     * POST /tutorial/placement — chỉ ở bước PLACEMENT (ADR-014): 30 câu từ 20 từ House Lv1, tier 1
     * → 2 → 3.
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
        Optional<LearningSession> active = activeSession(
                userId, housing.getId(), SessionType.PLACEMENT, now);
        if (active.isPresent()) {
            return new Started(toDto(active.get(), now), false);
        }

        List<Long> words = new ArrayList<>(content.vocabularyIdsOf(housing.getId(), 1));
        if (words.isEmpty()) {
            throw ApiException.conflict("NO_CONTENT", "HOUSING level 1 has no words");
        }
        Collections.shuffle(words, random);
        words = new ArrayList<>(words.subList(
                0, Math.min(balance.getPlacementWords(), words.size())));
        Map<Long, List<Question>> byVocab = targetQuestions(words);

        int half = (words.size() + 1) / 2;
        int hardCount = Math.max(0, balance.getPlacementQuestions() - words.size());
        List<long[]> all = new ArrayList<>();
        for (int i = 0; i < words.size(); i++) {
            int tier = i < half ? 1 : 2;
            addTier(all, byVocab, words.get(i), tier);
        }
        List<Long> hard = new ArrayList<>(words);
        Collections.shuffle(hard, random);
        hard.stream().limit(hardCount).forEach(v -> addTier(all, byVocab, v, 3));

        LearningSession session = newSession(userId, housing.getId(), 1, SessionType.PLACEMENT,
                all.size(), now,
                Duration.ofHours(balance.getPlacementTtlHours()));
        saveItems(session, all);
        return new Started(toDto(session, now), true);
    }

    // =============================================================================================
    // Xem, nộp, kết thúc
    // =============================================================================================

    @Transactional(readOnly = true)
    public SessionDto get(UUID userId, UUID sessionId) {
        LearningSession s = own(userId, sessionId);
        LocalDateTime now = Times.nowUtc(clock);
        return toDto(s, now);
    }

    public AnswerResultDto answer(UUID userId, UUID sessionId, int itemNo, String answer) {
        LearningSession s = own(userId, sessionId);
        LocalDateTime now = Times.nowUtc(clock);
        ensureOpen(s, now);
        LearningSessionItem item = items.findById(new LearningSessionItemId(sessionId, itemNo))
                .orElseThrow(() -> ApiException.notFound("ITEM_NOT_FOUND", "No item " + itemNo));
        if (item.isAnswered()) {
            throw ApiException.conflict(
                    "ALREADY_ANSWERED", "Item " + itemNo + " was already answered");
        }
        Question q = questions.findById(item.getQuestionId()).orElseThrow();
        boolean correct = AnswerGrader.isCorrect(
                answer, q.getAnswer(), stringList(q.getAcceptedAnswers()));

        item.setAnswerGiven(answer);
        item.setIsCorrect(correct);
        item.setAnsweredAt(now);
        items.save(item);

        if (correct) {
            s.setCorrectCount(s.getCorrectCount() + 1);
            s.setCurrentStreak(s.getCurrentStreak() + 1);
            s.setBestStreak(Math.max(s.getBestStreak(), s.getCurrentStreak()));
        } else {
            s.setCurrentStreak(0);
        }
        sessions.save(s);

        // Mastery Engine — chỉ cho từ TARGET của câu (item.vocabularyId) (BR-LEARN-03)
        Vocabulary v = vocabularies.findById(item.getVocabularyId()).orElseThrow();
        int max = balance.maxMastery(v.getDifficultyRank());
        UserVocabProgress p = progress.findByUserIdAndVocabularyId(
                userId, v.getId()).orElseGet(() -> {
            UserVocabProgress fresh = new UserVocabProgress();
            fresh.setUserId(userId);
            fresh.setVocabularyId(v.getId());
            return fresh;
        });
        p.setMasteryScore(MasteryEngine.apply(p.getMasteryScore(), correct, max));
        if (p.getFirstSeenAt() == null) {
            p.setFirstSeenAt(now);
        }
        p.setLastReviewedAt(now);
        boolean collectedNow = correct && p.getCollectedAt() == null;
        if (collectedNow) {
            p.setCollectedAt(now); // BR-LEARN-04: sưu tầm = lần đầu trả lời đúng
        }
        p.setUpdatedAt(now);
        progress.save(p);

        return new AnswerResultDto(itemNo, correct, q.getAnswer(), q.getExplanation(), v.getId(),
                p.getMasteryScore(), max, collectedNow, s.getCurrentStreak());
    }

    public CompleteResultDto complete(UUID userId, UUID sessionId) {
        LearningSession s = own(userId, sessionId);
        LocalDateTime now = Times.nowUtc(clock);
        UserProfile profile = requireUser(userId);
        String buildingCode = buildingCode(s.getBuildingId());

        // idempotent: trả lại kết quả cũ, không cộng KP lần nữa
        if (s.getStatus() == SessionStatus.COMPLETED) {
            return new CompleteResultDto(s.getId(), s.getType().name(), s.getCorrectCount(),
                    s.getTotalCount(),
                    Optional.ofNullable(s.getKpAwarded()).orElse(0), null, null, null, null,
                    collection(
                            userId, s.getBuildingId(), buildingCode, s.getVocabLevel()), List.of(),
                    ResourcesDto.of(profile), profile.getTutorialStep());
        }
        if (expireIfNeeded(s, now)) {
            throw new ApiException(HttpStatus.GONE, "SESSION_EXPIRED", "Session expired");
        }
        if (items.countByIdSessionIdAndAnsweredAtIsNull(sessionId) > 0) {
            throw ApiException.conflict("INCOMPLETE", "Some items are not answered yet");
        }

        int correct = s.getCorrectCount();
        int total = s.getTotalCount();
        int base;
        int bonus;
        int dailyIndex = 0;
        double multiplier = 1.0;
        if (s.getType() == SessionType.PLACEMENT) {
            base = correct * balance.getPlacementKpPerCorrect();
            bonus = balance.getPlacementWelcomeKp();
        } else {
            base = correct * balance.getKpPerCorrect();
            boolean bonusEarned = total > 0
                    && (double) correct / total >= balance.getKpBonusRatio();
            bonus = bonusEarned ? balance.getKpBonus() : 0;
            LocalDateTime[] day = Times.dayRangeUtc(now, balance.zone());
            long completedToday = sessions.countCompletedBetween(
                    userId, SessionType.LEARNING, SessionStatus.COMPLETED, day[0], day[1]);
            dailyIndex = (int) completedToday + 1;
            multiplier = dailyIndex <= balance.getKpFullSessionsPerDay() ? 1.0
                    : balance.getKpReducedMultiplier();
        }
        int kp = (int) Math.round((base + bonus) * multiplier);

        s.setStatus(SessionStatus.COMPLETED);
        s.setCompletedAt(now);
        s.setKpAwarded(kp);
        // @Version: complete song song thì lệnh sau thất bại tại đây → không cộng KP đôi
        sessions.saveAndFlush(s);

        profile.setKnowledgePoints(profile.getKnowledgePoints() + kp);
        if (s.getType() == SessionType.PLACEMENT
                && profile.getTutorialStep() == TutorialStep.PLACEMENT) {
            profile.setTutorialStep(TutorialStep.LEARN_HOUSE);
        } else if (s.getType() == SessionType.LEARNING && HOUSING.equals(buildingCode)
                && profile.getTutorialStep() == TutorialStep.LEARN_HOUSE) {
            profile.setTutorialStep(TutorialStep.BUILD_HOUSE);
        }
        users.save(profile);

        CollectionDto collection = collection(
                userId, s.getBuildingId(), buildingCode, s.getVocabLevel());
        List<LearningSessionItem> answered = items.findByIdSessionIdOrderByIdItemNoAsc(sessionId);
        List<String> granted = achievements.evaluateAfterSession(s, answered,
                collection.total() > 0 && collection.collected() >= collection.total(), now);

        return new CompleteResultDto(s.getId(), s.getType().name(), correct, total, kp, base, bonus,
                s.getType() == SessionType.LEARNING ? dailyIndex : null,
                s.getType() == SessionType.LEARNING ? multiplier : null,
                collection, granted, ResourcesDto.of(profile), profile.getTutorialStep());
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
        return new ProgressDto(Times.toInstant(Times.nowUtc(clock)), list.stream()
                .map(p -> new ProgressItemDto(
                        p.getVocabularyId(),
                        p.getMasteryScore(),
                        balance.maxMastery(rank.get(p.getVocabularyId())),
                        p.isCollected(),
                        Times.toInstant(p.getFirstSeenAt()),
                        Times.toInstant(p.getLastReviewedAt())))
                .toList());
    }

    // =============================================================================================
    // Hỗ trợ
    // =============================================================================================

    private UserProfile requireUser(UUID userId) {
        return users.findById(userId).orElseThrow(UserProfileNotFoundException::new);
    }

    private LearningSession own(UUID userId, UUID sessionId) {
        return sessions.findById(sessionId)
                .filter(s -> s.getUserId().equals(userId))
                .orElseThrow(() -> ApiException.notFound("SESSION_NOT_FOUND", "Session not found"));
    }

    private Optional<LearningSession> activeSession(
            UUID userId, Long buildingId, SessionType type, LocalDateTime now) {
        Optional<LearningSession> active = sessions.findFirstByUserIdAndBuildingIdAndTypeAndStatus(
                userId, buildingId, type, SessionStatus.ACTIVE);
        if (active.isPresent() && expireIfNeeded(active.get(), now)) {
            return Optional.empty();
        }
        return active;
    }

    /**
     * Hết hạn → lưu EXPIRED ngay (flush trước khi chèn phiên mới vì có partial unique index
     * ACTIVE).
     */
    private boolean expireIfNeeded(LearningSession s, LocalDateTime now) {
        if (s.getStatus() == SessionStatus.ACTIVE && now.isAfter(s.getExpiresAt())) {
            s.setStatus(SessionStatus.EXPIRED);
            sessions.saveAndFlush(s);
            return true;
        }
        return s.getStatus() == SessionStatus.EXPIRED;
    }

    private void ensureOpen(LearningSession s, LocalDateTime now) {
        if (expireIfNeeded(s, now)) {
            throw new ApiException(HttpStatus.GONE, "SESSION_EXPIRED", "Session expired");
        }
        if (s.getStatus() != SessionStatus.ACTIVE) {
            throw ApiException.conflict("SESSION_CLOSED", "Session is already completed");
        }
    }

    private LearningSession newSession(UUID userId, Long buildingId, int level, SessionType type,
            int total,
                                       LocalDateTime now, Duration ttl) {
        LearningSession s = new LearningSession();
        s.setId(UUID.randomUUID());
        s.setUserId(userId);
        s.setBuildingId(buildingId);
        s.setVocabLevel(level);
        s.setType(type);
        s.setStatus(SessionStatus.ACTIVE);
        s.setStartedAt(now);
        s.setExpiresAt(now.plus(ttl));
        s.setTotalCount(total);
        return sessions.save(s);
    }

    private void saveItems(LearningSession s, List<long[]> pairs) {
        List<LearningSessionItem> list = new ArrayList<>();
        for (int i = 0; i < pairs.size(); i++) {
            LearningSessionItem item = new LearningSessionItem();
            item.setId(new LearningSessionItemId(s.getId(), i + 1));
            item.setQuestionId(pairs.get(i)[0]);
            item.setVocabularyId(pairs.get(i)[1]);
            list.add(item);
        }
        items.saveAll(list);
    }

    private void addTier(
            List<long[]> out, Map<Long, List<Question>> byVocab, Long vocabId, int tier) {
        List<Question> qs = byVocab.getOrDefault(vocabId, List.of());
        pick(qs, q -> q.getTier() == tier).or(() -> pick(qs, q -> true))
                .ifPresent(q -> out.add(new long[]{q.getId(), vocabId}));
    }

    private Optional<Question> pick(
            List<Question> qs, java.util.function.Predicate<Question> filter) {
        List<Question> match = qs.stream().filter(filter).toList();
        return match.isEmpty() ? Optional.empty()
                : Optional.of(match.get(random.nextInt(match.size())));
    }

    private Map<Long, List<Question>> targetQuestions(Collection<Long> vocabIds) {
        if (vocabIds.isEmpty()) {
            return Map.of();
        }
        Map<Long, Long> vocabOfQuestion = questionVocabularies.findByIdVocabularyIdIn(vocabIds)
                .stream()
                .filter(qv -> "TARGET".equals(qv.getRelationType()))
                .collect(Collectors.toMap(
                        qv -> qv.getId().getQuestionId(),
                        qv -> qv.getId().getVocabularyId(),
                        (a, b) -> a));
        return questions.findAllById(vocabOfQuestion.keySet()).stream()
                .collect(Collectors.groupingBy(q -> vocabOfQuestion.get(q.getId())));
    }

    private Map<Long, UserVocabProgress> progressOf(UUID userId, Collection<Long> vocabIds) {
        if (vocabIds.isEmpty()) {
            return Map.of();
        }
        return progress.findByUserIdAndVocabularyIdIn(userId, vocabIds).stream()
                .collect(Collectors.toMap(UserVocabProgress::getVocabularyId, Function.identity()));
    }

    private static WordSelector.Candidate candidate(Long id, boolean review, UserVocabProgress p) {
        return new WordSelector.Candidate(id, review, p != null && p.isCollected(),
                p == null ? 0 : p.getMasteryScore(), p == null ? null : p.getLastReviewedAt());
    }

    private static List<Long> union(List<Long> a, List<Long> b) {
        List<Long> all = new ArrayList<>(a);
        all.addAll(b);
        return all;
    }

    private CollectionDto collection(UUID userId, Long buildingId, String buildingCode, int level) {
        List<Long> ids = content.vocabularyIdsOf(buildingId, level);
        long collected = ids.isEmpty() ? 0
                : progress.countByUserIdAndVocabularyIdInAndCollectedAtIsNotNull(userId, ids);
        return new CollectionDto(buildingCode, level, collected, ids.size());
    }

    private String buildingCode(Long buildingId) {
        return buildings.findById(buildingId).map(Building::getCode).orElse("?");
    }

    private SessionDto toDto(LearningSession s, LocalDateTime now) {
        List<LearningSessionItem> list = items.findByIdSessionIdOrderByIdItemNoAsc(s.getId());
        Map<Long, Question> qs = questions.findAllById(list.stream()
                .map(LearningSessionItem::getQuestionId).toList())
                .stream().collect(Collectors.toMap(Question::getId, Function.identity()));
        List<ItemDto> dtos = list.stream().map(i -> {
            Question q = qs.get(i.getQuestionId());
            // Cố ý KHÔNG đưa answer / acceptedAnswers / explanation vào (NFR-01)
            QuestionView view = new QuestionView(q.getId(), q.getSkill(), q.getQuestionType(),
                    q.getTier(),
                    q.getQuestionText(), q.getMetadata() == null ? null
                            : json.readTree(q.getMetadata()));
            return new ItemDto(
                    i.getId().getItemNo(),
                    i.getVocabularyId(),
                    i.isAnswered(),
                    i.getIsCorrect(),
                    view);
        }).toList();
        return new SessionDto(
                s.getId(),
                s.getType().name(),
                buildingCode(s.getBuildingId()),
                s.getVocabLevel(),
                s.getStatus().name(),
                Times.toInstant(s.getStartedAt()),
                Times.toInstant(s.getExpiresAt()),
                Times.toInstant(now),
                s.getTotalCount(),
                s.getCorrectCount(),
                dtos);
    }

    private List<String> stringList(String raw) {
        if (raw == null || raw.isBlank()) {
            return List.of();
        }
        return json.readValue(raw, new TypeReference<List<String>>() {
        });
    }
}
