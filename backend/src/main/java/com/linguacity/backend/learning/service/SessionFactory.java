package com.linguacity.backend.learning.service;

import com.linguacity.backend.content.entity.Building;
import com.linguacity.backend.content.entity.Question;
import com.linguacity.backend.content.repository.BuildingRepository;
import com.linguacity.backend.content.repository.QuestionRepository;
import com.linguacity.backend.content.repository.QuestionVocabularyRepository;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.learning.dto.LearningDtos.ItemDto;
import com.linguacity.backend.learning.dto.LearningDtos.SessionDto;
import com.linguacity.backend.learning.entity.LearningSession;
import com.linguacity.backend.learning.entity.LearningSessionItem;
import com.linguacity.backend.learning.entity.LearningSessionItemId;
import com.linguacity.backend.learning.entity.SessionStatus;
import com.linguacity.backend.learning.entity.SessionType;
import com.linguacity.backend.learning.repository.LearningSessionItemRepository;
import com.linguacity.backend.learning.repository.LearningSessionRepository;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * Tạo và đọc phiên học dùng chung cho bài học, bài kiểm tra trình độ, luyện tập và sự kiện:
 * phiên đang dở, hết hạn, chọn câu hỏi TARGET cho từ, lưu đề, chuyển sang DTO (ADR-013).
 */
@Component
public class SessionFactory {

    private final LearningSessionRepository sessions;
    private final LearningSessionItemRepository items;
    private final QuestionRepository questions;
    private final QuestionVocabularyRepository questionVocabularies;
    private final BuildingRepository buildings;
    private final QuestionViews views;
    private final Random random = new SecureRandom();

    public SessionFactory(
            LearningSessionRepository sessions,
            LearningSessionItemRepository items,
            QuestionRepository questions,
            QuestionVocabularyRepository questionVocabularies,
            BuildingRepository buildings,
            QuestionViews views) {
        this.sessions = sessions;
        this.items = items;
        this.questions = questions;
        this.questionVocabularies = questionVocabularies;
        this.buildings = buildings;
        this.views = views;
    }

    public Random random() {
        return random;
    }

    /** Phiên ACTIVE còn hạn của kiểu này (gắn công trình hoặc không). */
    public Optional<LearningSession> activeSession(
            UUID userId, Long buildingId, SessionType type, LocalDateTime now) {
        Optional<LearningSession> active = buildingId == null
                ? sessions.findFirstByUserIdAndTypeAndStatus(userId, type, SessionStatus.ACTIVE)
                : sessions.findFirstByUserIdAndBuildingIdAndTypeAndStatus(
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
    public boolean expireIfNeeded(LearningSession session, LocalDateTime now) {
        if (session.getStatus() == SessionStatus.ACTIVE && now.isAfter(session.getExpiresAt())) {
            session.setStatus(SessionStatus.EXPIRED);
            sessions.saveAndFlush(session);
            return true;
        }
        return session.getStatus() == SessionStatus.EXPIRED;
    }

    /** Cho phiên ACTIVE hết hạn ngay (ví dụ bắt đầu sự kiện khác khi sự kiện cũ còn dở). */
    public void expireNow(LearningSession session) {
        session.setStatus(SessionStatus.EXPIRED);
        sessions.saveAndFlush(session);
    }

    public LearningSession newSession(
            UUID userId,
            Long buildingId,
            int level,
            SessionType type,
            int total,
            LocalDateTime now,
            Duration ttl) {
        LearningSession session = new LearningSession();
        session.setId(UUID.randomUUID());
        session.setUserId(userId);
        session.setBuildingId(buildingId);
        session.setVocabLevel(level);
        session.setType(type);
        session.setStatus(SessionStatus.ACTIVE);
        session.setStartedAt(now);
        session.setExpiresAt(now.plus(ttl));
        session.setTotalCount(total);
        return sessions.save(session);
    }

    public void saveItems(LearningSession session, List<long[]> pairs) {
        List<LearningSessionItem> list = new ArrayList<>();
        for (int i = 0; i < pairs.size(); i++) {
            LearningSessionItem item = new LearningSessionItem();
            item.setId(new LearningSessionItemId(session.getId(), i + 1));
            item.setQuestionId(pairs.get(i)[0]);
            item.setVocabularyId(pairs.get(i)[1]);
            list.add(item);
        }
        items.saveAll(list);
    }

    /**
     * Mỗi từ một câu đọc; {@code writingCount} từ đầu danh sách (ưu tiên cao nhất) có thêm câu
     * viết. Câu trắc nghiệm trước, câu điền từ xáo sau (§10.3.2, ADR-015 §1).
     */
    public List<long[]> lessonItems(List<Long> chosen, int writingCount) {
        Map<Long, List<Question>> byVocab = targetQuestions(chosen);
        List<long[]> readingItems = new ArrayList<>();
        List<long[]> writingItems = new ArrayList<>();
        int writing = Math.max(0, Math.min(writingCount, chosen.size()));
        for (int i = 0; i < chosen.size(); i++) {
            Long vocabId = chosen.get(i);
            List<Question> candidates = byVocab.getOrDefault(vocabId, List.of());
            pick(candidates, question -> "READING".equals(question.getSkill()))
                    .ifPresent(question -> readingItems.add(itemOf(question, vocabId)));
            if (i < writing) {
                pick(candidates, question -> "WRITING".equals(question.getSkill()))
                        .ifPresent(question -> writingItems.add(itemOf(question, vocabId)));
            }
        }
        Collections.shuffle(writingItems, random);
        List<long[]> all = new ArrayList<>(readingItems);
        all.addAll(writingItems);
        return all;
    }

    /** Thêm một câu ở {@code tier} cho từ; không có câu tier đó thì lấy câu bất kỳ của từ. */
    public void addTier(
            List<long[]> out, Map<Long, List<Question>> byVocab, Long vocabId, int tier) {
        List<Question> candidates = byVocab.getOrDefault(vocabId, List.of());
        pick(candidates, question -> question.getTier() == tier)
                .or(() -> pick(candidates, question -> true))
                .ifPresent(question -> out.add(itemOf(question, vocabId)));
    }

    public Optional<Question> pick(List<Question> candidates, Predicate<Question> filter) {
        List<Question> match = candidates.stream().filter(filter).toList();
        if (match.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(match.get(random.nextInt(match.size())));
    }

    public static long[] itemOf(Question question, Long vocabId) {
        return new long[]{question.getId(), vocabId};
    }

    /** Câu hỏi TARGET của các từ, nhóm theo từ. */
    public Map<Long, List<Question>> targetQuestions(Collection<Long> vocabIds) {
        if (vocabIds.isEmpty()) {
            return Map.of();
        }
        Map<Long, Long> vocabOfQuestion = questionVocabularies.findByIdVocabularyIdIn(vocabIds)
                .stream()
                .filter(link -> "TARGET".equals(link.getRelationType()))
                .collect(Collectors.toMap(
                        link -> link.getId().getQuestionId(),
                        link -> link.getId().getVocabularyId(),
                        (first, second) -> first));
        return questions.findAllById(vocabOfQuestion.keySet()).stream()
                .collect(Collectors.groupingBy(question -> vocabOfQuestion.get(question.getId())));
    }

    public SessionDto toDto(LearningSession session, LocalDateTime now) {
        List<LearningSessionItem> list = items.findByIdSessionIdOrderByIdItemNoAsc(session.getId());
        Map<Long, Question> byId = questions.findAllById(list.stream()
                .map(LearningSessionItem::getQuestionId).toList())
                .stream().collect(Collectors.toMap(Question::getId, Function.identity()));
        List<ItemDto> dtos = list.stream()
                .map(item -> new ItemDto(
                        item.getId().getItemNo(),
                        item.getVocabularyId(),
                        item.isAnswered(),
                        item.getIsCorrect(),
                        views.viewOf(byId.get(item.getQuestionId()))))
                .toList();
        return new SessionDto(
                session.getId(),
                session.getType().name(),
                buildingCode(session.getBuildingId()),
                session.getVocabLevel(),
                session.getStatus().name(),
                Times.toInstant(session.getStartedAt()),
                Times.toInstant(session.getExpiresAt()),
                Times.toInstant(now),
                session.getTotalCount(),
                session.getCorrectCount(),
                dtos);
    }

    /** Mã công trình; phiên luyện tập / sự kiện không gắn công trình thì null. */
    public String buildingCode(Long buildingId) {
        if (buildingId == null) {
            return null;
        }
        return buildings.findById(buildingId).map(Building::getCode).orElse("?");
    }
}
