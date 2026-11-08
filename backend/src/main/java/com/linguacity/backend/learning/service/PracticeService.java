package com.linguacity.backend.learning.service;

import com.linguacity.backend.common.config.BalanceProperties;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.content.entity.Question;
import com.linguacity.backend.content.entity.Theme;
import com.linguacity.backend.content.entity.Vocabulary;
import com.linguacity.backend.content.repository.ThemeRepository;
import com.linguacity.backend.content.repository.VocabularyRepository;
import com.linguacity.backend.event.entity.UserCityEvent;
import com.linguacity.backend.event.service.CityEventService;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.learning.dto.LearningDtos.PracticeRequest;
import com.linguacity.backend.learning.dto.LearningDtos.PracticeStatusDto;
import com.linguacity.backend.learning.dto.LearningDtos.PracticeUsage;
import com.linguacity.backend.learning.dto.LearningDtos.ThemeProgressDto;
import com.linguacity.backend.learning.engine.WordSelector;
import com.linguacity.backend.learning.entity.LearningSession;
import com.linguacity.backend.learning.entity.SessionStatus;
import com.linguacity.backend.learning.entity.SessionType;
import com.linguacity.backend.learning.entity.UserVocabProgress;
import com.linguacity.backend.learning.repository.LearningSessionRepository;
import com.linguacity.backend.learning.repository.UserVocabProgressRepository;
import com.linguacity.backend.learning.service.LearningService.Started;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Luyện tập mọi chủ đề (ADR-015 §6, BR-PRAC-01..04) và phiên giải sự kiện thành phố
 * (ADR-015 §5). Nộp câu và kết thúc dùng chung LearningService.
 */
@Service
@Transactional(noRollbackFor = ApiException.class)
public class PracticeService {

    public static final String REVIEW = "REVIEW";
    public static final String MIXED = "MIXED";
    private static final Set<Integer> WORD_COUNTS = Set.of(10, 20);

    private final UserProfileRepository users;
    private final ThemeRepository themes;
    private final VocabularyRepository vocabularies;
    private final UserVocabProgressRepository progress;
    private final LearningSessionRepository sessions;
    private final SessionFactory factory;
    private final CityEventService cityEvents;
    private final BalanceProperties balance;
    private final Clock clock;

    public PracticeService(
            UserProfileRepository users,
            ThemeRepository themes,
            VocabularyRepository vocabularies,
            UserVocabProgressRepository progress,
            LearningSessionRepository sessions,
            SessionFactory factory,
            CityEventService cityEvents,
            BalanceProperties balance,
            Clock clock) {
        this.users = users;
        this.themes = themes;
        this.vocabularies = vocabularies;
        this.progress = progress;
        this.sessions = sessions;
        this.factory = factory;
        this.cityEvents = cityEvents;
        this.balance = balance;
        this.clock = clock;
    }

    // =============================================================================================
    // Luyện tập
    // =============================================================================================

    /** GET /learning/practice/status — lượt còn lại hôm nay và tiến độ từng chủ đề. */
    @Transactional(readOnly = true)
    public PracticeStatusDto status(UUID userId) {
        requireUser(userId);
        LocalDateTime[] today = todayRange();
        List<Vocabulary> all = vocabularies.findAll();
        Map<Long, UserVocabProgress> known = progressOf(userId, ids(all));
        Map<Long, List<Vocabulary>> byTheme = all.stream()
                .collect(Collectors.groupingBy(Vocabulary::getThemeId));
        List<ThemeProgressDto> themeDtos = themes.findAll().stream()
                .filter(theme -> byTheme.containsKey(theme.getId()))
                .map(theme -> themeProgress(theme, byTheme.get(theme.getId()), known))
                .toList();
        return new PracticeStatusDto(
                usage(userId, SessionType.PRACTICE_REVIEW, today),
                usage(userId, SessionType.PRACTICE_MIXED, today),
                new PracticeUsage(
                        newWordsToday(userId, today), balance.getPracticeNewWordsPerDay()),
                themeDtos,
                Times.toInstant(today[1]));
    }

    /** POST /learning/practice (BR-PRAC-01..04). */
    public Started start(UUID userId, PracticeRequest request) {
        requireUser(userId);
        SessionType type = typeOf(request);
        int wordCount = wordCountOf(request);
        LocalDateTime now = Times.nowUtc(clock);

        Optional<LearningSession> active = factory.activeSession(userId, null, type, now);
        if (active.isPresent()) {
            return new Started(factory.toDto(active.get(), now), false);
        }
        LocalDateTime[] today = todayRange();
        checkDailyLimit(userId, request.mode(), type, today);

        List<Long> chosen = choosePracticeWords(userId, type, request.themeCodes(), wordCount,
                today, now);
        int questionCount = wordCount * 3 / 2;
        List<long[]> all = factory.lessonItems(chosen, questionCount - chosen.size());
        if (all.isEmpty()) {
            throw ApiException.conflict("NO_CONTENT", "No words to practice yet");
        }
        LearningSession session = factory.newSession(userId, null, 0, type, all.size(), now,
                Duration.ofMinutes(balance.getPracticeTtlMinutes()));
        factory.saveItems(session, all);
        return new Started(factory.toDto(session, now), true);
    }

    private void checkDailyLimit(
            UUID userId, String mode, SessionType type, LocalDateTime[] today) {
        PracticeUsage usage = usage(userId, type, today);
        if (usage.used() < usage.limit()) {
            return;
        }
        Map<String, Object> details = new LinkedHashMap<>();
        details.put("mode", mode.toUpperCase(Locale.ROOT));
        details.put("used", usage.used());
        details.put("limit", usage.limit());
        details.put("resetsAt", Times.toInstant(today[1]));
        throw new ApiException(
                HttpStatus.CONFLICT, "DAILY_LIMIT", "No practice runs left today", details);
    }

    /**
     * Ôn: chỉ từ đã sưu tầm. Hỗn hợp: thêm từ mới, tối đa nửa bài và không quá số từ mới còn
     * lại trong ngày (BR-PRAC-02).
     */
    private List<Long> choosePracticeWords(UUID userId, SessionType type, List<String> themeCodes,
            int wordCount, LocalDateTime[] today, LocalDateTime now) {
        List<Long> pool = vocabularyIdsOfThemes(themeCodes);
        Map<Long, UserVocabProgress> known = progressOf(userId, pool);
        List<Long> collected = new ArrayList<>();
        List<Long> fresh = new ArrayList<>();
        for (Long id : pool) {
            UserVocabProgress row = known.get(id);
            (row != null && row.isCollected() ? collected : fresh).add(id);
        }

        int newAllowed = 0;
        if (type == SessionType.PRACTICE_MIXED) {
            long left = balance.getPracticeNewWordsPerDay() - newWordsToday(userId, today);
            newAllowed = (int) Math.max(0, Math.min(wordCount / 2, left));
        }
        Collections.shuffle(fresh, factory.random());
        List<Long> freshTaken = fresh.subList(0, Math.min(newAllowed, fresh.size()));
        if (collected.isEmpty() && freshTaken.isEmpty()) {
            throw ApiException.conflict("NO_CONTENT", "No collected words to practice yet");
        }

        List<WordSelector.Candidate> candidates = new ArrayList<>();
        freshTaken.forEach(id -> candidates.add(candidate(id, false, known.get(id))));
        collected.forEach(id -> candidates.add(candidate(id, true, known.get(id))));
        return WordSelector.select(candidates, wordCount, now, Duration.ZERO, factory.random());
    }

    // =============================================================================================
    // Sự kiện thành phố
    // =============================================================================================

    /** POST /events/{id}/start — 5 câu về từ đã sưu tầm (BR-EVT-02). */
    public Started startEvent(UUID userId, Long eventId) {
        requireUser(userId);
        UserCityEvent event = cityEvents.requireOpen(userId, eventId);
        LocalDateTime now = Times.nowUtc(clock);

        Optional<LearningSession> active =
                factory.activeSession(userId, null, SessionType.EVENT, now);
        if (active.isPresent() && active.get().getId().equals(event.getSessionId())) {
            return new Started(factory.toDto(active.get(), now), false);
        }
        active.ifPresent(factory::expireNow); // phiên của sự kiện khác còn dở

        List<Long> collected = progress.findByUserIdOrderByUpdatedAtAsc(userId).stream()
                .filter(UserVocabProgress::isCollected)
                .map(UserVocabProgress::getVocabularyId)
                .collect(Collectors.toCollection(ArrayList::new));
        if (collected.isEmpty()) {
            throw ApiException.conflict("NO_CONTENT", "No collected words yet");
        }
        Collections.shuffle(collected, factory.random());
        List<Long> chosen = collected.subList(
                0, Math.min(balance.getEventQuestions(), collected.size()));
        List<long[]> all = eventItems(chosen);

        LearningSession session = factory.newSession(userId, null, 0, SessionType.EVENT,
                all.size(), now, Duration.ofMinutes(balance.getEventTtlMinutes()));
        factory.saveItems(session, all);
        cityEvents.attachSession(event, session.getId());
        return new Started(factory.toDto(session, now), true);
    }

    /** Mỗi từ một câu tier 1 hoặc 2 (nhận nghĩa / điền có gợi ý) — đố nhanh, không quá khó. */
    private List<long[]> eventItems(List<Long> chosen) {
        Map<Long, List<Question>> byVocab = factory.targetQuestions(chosen);
        List<long[]> all = new ArrayList<>();
        for (Long vocabId : chosen) {
            List<Question> candidates = byVocab.getOrDefault(vocabId, List.of());
            factory.pick(candidates, question -> question.getTier() <= 2)
                    .ifPresent(question -> all.add(SessionFactory.itemOf(question, vocabId)));
        }
        return all;
    }

    // =============================================================================================
    // Hỗ trợ
    // =============================================================================================

    private static SessionType typeOf(PracticeRequest request) {
        String mode = request == null || request.mode() == null
                ? ""
                : request.mode().toUpperCase(Locale.ROOT);
        return switch (mode) {
            case REVIEW -> SessionType.PRACTICE_REVIEW;
            case MIXED -> SessionType.PRACTICE_MIXED;
            default -> throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_BODY",
                    "mode must be REVIEW or MIXED");
        };
    }

    private static int wordCountOf(PracticeRequest request) {
        Integer count = request.wordCount() == null ? Integer.valueOf(20) : request.wordCount();
        if (!WORD_COUNTS.contains(count)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_BODY",
                    "wordCount must be 10 or 20");
        }
        return count;
    }

    private PracticeUsage usage(UUID userId, SessionType type, LocalDateTime[] today) {
        long used = sessions.countStartedBetween(userId, type, today[0], today[1]);
        int limit = type == SessionType.PRACTICE_REVIEW
                ? balance.getPracticeReviewPerDay()
                : balance.getPracticeMixedPerDay();
        return new PracticeUsage(used, limit);
    }

    private long newWordsToday(UUID userId, LocalDateTime[] today) {
        return sessions.countNewWordsSince(userId, SessionType.PRACTICE_MIXED, today[0]);
    }

    private List<Long> vocabularyIdsOfThemes(List<String> themeCodes) {
        List<Vocabulary> words;
        if (themeCodes == null || themeCodes.isEmpty()) {
            words = vocabularies.findAll();
        } else {
            List<Long> themeIds = themes.findByCodeIn(themeCodes.stream()
                    .map(code -> code.toUpperCase(Locale.ROOT)).toList())
                    .stream().map(Theme::getId).toList();
            words = themeIds.isEmpty() ? List.of() : vocabularies.findByThemeIdIn(themeIds);
        }
        return ids(words);
    }

    private static ThemeProgressDto themeProgress(
            Theme theme, List<Vocabulary> words, Map<Long, UserVocabProgress> known) {
        long collected = words.stream()
                .map(word -> known.get(word.getId()))
                .filter(row -> row != null && row.isCollected())
                .count();
        return new ThemeProgressDto(theme.getCode(), theme.getName(), collected, words.size());
    }

    private Map<Long, UserVocabProgress> progressOf(UUID userId, List<Long> vocabIds) {
        if (vocabIds.isEmpty()) {
            return Map.of();
        }
        return progress.findByUserIdAndVocabularyIdIn(userId, vocabIds).stream()
                .collect(Collectors.toMap(UserVocabProgress::getVocabularyId, Function.identity()));
    }

    private static List<Long> ids(List<Vocabulary> words) {
        return words.stream().map(Vocabulary::getId).collect(Collectors.toList());
    }

    private static WordSelector.Candidate candidate(
            Long id, boolean review, UserVocabProgress row) {
        if (row == null) {
            return new WordSelector.Candidate(id, review, false, 0, null);
        }
        return new WordSelector.Candidate(
                id, review, row.isCollected(), row.getMasteryScore(), row.getLastReviewedAt());
    }

    private LocalDateTime[] todayRange() {
        return Times.dayRangeUtc(Times.nowUtc(clock), balance.zone());
    }

    private void requireUser(UUID userId) {
        if (!users.existsById(userId)) {
            throw new UserProfileNotFoundException();
        }
    }
}
