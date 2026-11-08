package com.linguacity.backend.exam.service;

import com.linguacity.backend.city.entity.UserBlueprint;
import com.linguacity.backend.city.repository.UserBlueprintRepository;
import com.linguacity.backend.city.service.CityService;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.content.entity.Blueprint;
import com.linguacity.backend.content.entity.Building;
import com.linguacity.backend.content.entity.Exam;
import com.linguacity.backend.content.entity.ExamRequirement;
import com.linguacity.backend.content.entity.Question;
import com.linguacity.backend.content.entity.Vocabulary;
import com.linguacity.backend.content.repository.BlueprintRepository;
import com.linguacity.backend.content.repository.BuildingRepository;
import com.linguacity.backend.content.repository.ExamQuestionRepository;
import com.linguacity.backend.content.repository.ExamRepository;
import com.linguacity.backend.content.repository.ExamRequirementRepository;
import com.linguacity.backend.content.repository.QuestionRepository;
import com.linguacity.backend.content.repository.QuestionVocabularyRepository;
import com.linguacity.backend.content.repository.VocabularyRepository;
import com.linguacity.backend.content.service.ContentService;
import com.linguacity.backend.exam.dto.ExamDtos.AnswerDto;
import com.linguacity.backend.exam.dto.ExamDtos.AttemptDto;
import com.linguacity.backend.exam.dto.ExamDtos.AttemptQuestionDto;
import com.linguacity.backend.exam.dto.ExamDtos.BlueprintDto;
import com.linguacity.backend.exam.dto.ExamDtos.ExamListDto;
import com.linguacity.backend.exam.dto.ExamDtos.ExamResultDto;
import com.linguacity.backend.exam.dto.ExamDtos.ExamStatusDto;
import com.linguacity.backend.exam.dto.ExamDtos.MissingDto;
import com.linguacity.backend.exam.dto.ExamDtos.ProgressDto;
import com.linguacity.backend.exam.dto.ExamDtos.RequirementDto;
import com.linguacity.backend.exam.dto.ExamDtos.ResultItemDto;
import com.linguacity.backend.exam.entity.ExamAttempt;
import com.linguacity.backend.exam.entity.ExamAttemptQuestion;
import com.linguacity.backend.exam.entity.ExamAttemptQuestionId;
import com.linguacity.backend.exam.repository.ExamAttemptQuestionRepository;
import com.linguacity.backend.exam.repository.ExamAttemptRepository;
import com.linguacity.backend.identity.dto.ResourcesDto;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.learning.engine.AnswerGrader;
import com.linguacity.backend.learning.repository.UserVocabProgressRepository;
import com.linguacity.backend.learning.service.QuestionViews;
import com.linguacity.backend.learning.service.VocabProgressRecorder;
import com.linguacity.backend.common.config.BalanceProperties;
import com.linguacity.backend.quest.service.QuestTracker;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Bài thi lên level của công trình (ADR-015 §2, BR-EXAM-01..07, system-design §11.2).
 * Phí thi trừ khi bắt đầu; nộp một lần cho mọi câu; đậu thì +1 bản vẽ.
 */
@Service
@Transactional
public class ExamService {

    private final ExamRepository exams;
    private final ExamRequirementRepository requirements;
    private final ExamQuestionRepository examQuestions;
    private final ExamAttemptRepository attempts;
    private final ExamAttemptQuestionRepository attemptQuestions;
    private final QuestionRepository questions;
    private final QuestionVocabularyRepository questionVocabularies;
    private final VocabularyRepository vocabularies;
    private final BuildingRepository buildings;
    private final BlueprintRepository blueprints;
    private final UserBlueprintRepository userBlueprints;
    private final UserProfileRepository users;
    private final UserVocabProgressRepository progress;
    private final ContentService content;
    private final CityService city;
    private final VocabProgressRecorder recorder;
    private final QuestionViews views;
    private final QuestTracker tracker;
    private final BalanceProperties balance;
    private final Clock clock;
    private final Random random = new SecureRandom();

    public ExamService(
            ExamRepository exams,
            ExamRequirementRepository requirements,
            ExamQuestionRepository examQuestions,
            ExamAttemptRepository attempts,
            ExamAttemptQuestionRepository attemptQuestions,
            QuestionRepository questions,
            QuestionVocabularyRepository questionVocabularies,
            VocabularyRepository vocabularies,
            BuildingRepository buildings,
            BlueprintRepository blueprints,
            UserBlueprintRepository userBlueprints,
            UserProfileRepository users,
            UserVocabProgressRepository progress,
            ContentService content,
            CityService city,
            VocabProgressRecorder recorder,
            QuestionViews views,
            QuestTracker tracker,
            BalanceProperties balance,
            Clock clock) {
        this.exams = exams;
        this.requirements = requirements;
        this.examQuestions = examQuestions;
        this.attempts = attempts;
        this.attemptQuestions = attemptQuestions;
        this.questions = questions;
        this.questionVocabularies = questionVocabularies;
        this.vocabularies = vocabularies;
        this.buildings = buildings;
        this.blueprints = blueprints;
        this.userBlueprints = userBlueprints;
        this.users = users;
        this.progress = progress;
        this.content = content;
        this.city = city;
        this.recorder = recorder;
        this.views = views;
        this.tracker = tracker;
        this.balance = balance;
        this.clock = clock;
    }

    /** Kết quả bắt đầu: {@code created = false} là trả lại lượt đang dở (BR-EXAM-03). */
    public record Started(AttemptDto attempt, boolean created) {}

    /** GET /exams?building= — các bài thi của công trình kèm trạng thái người chơi. */
    public ExamListDto exams(UUID userId, String buildingCode) {
        UserProfile profile = requireUser(userId);
        Building building = findBuilding(buildingCode);
        List<ExamStatusDto> list = exams.findByBuildingIdOrderByTargetLevelAsc(building.getId())
                .stream()
                .map(exam -> statusOf(profile, exam, building))
                .toList();
        return new ExamListDto(list);
    }

    /** POST /exams/{code}/start (BR-EXAM-01..04). */
    public Started start(UUID userId, String code) {
        UserProfile profile = requireUser(userId);
        Exam exam = findExam(code);
        LocalDateTime now = Times.nowUtc(clock);

        var active = attempts.findFirstByUserIdAndExamIdAndStatus(
                userId, exam.getId(), ExamAttempt.IN_PROGRESS);
        if (active.isPresent()) {
            return new Started(toDto(active.get(), exam, profile, now), false);
        }

        Building building = buildings.findById(exam.getBuildingId()).orElseThrow();
        ExamStatusDto status = statusOf(profile, exam, building);
        if (status.passed()) {
            throw ApiException.conflict("ALREADY_PASSED", "This exam is already passed");
        }
        if (status.missing().any()) {
            Map<String, Object> details = new LinkedHashMap<>();
            details.put("missing", status.missing());
            throw new ApiException(
                    HttpStatus.CONFLICT, "REQUIREMENTS_NOT_MET", "Requirements not met", details);
        }

        // BR-EXAM-02: phí thi trừ ngay, trượt không hoàn
        RequirementDto requirement = status.requirement();
        profile.setKnowledgePoints(profile.getKnowledgePoints() - requirement.requiredKnowledge());
        profile.setBlueprintShards(
                profile.getBlueprintShards() - requirement.requiredBlueprintShards());
        users.saveAndFlush(profile);

        ExamAttempt attempt = createAttempt(userId, exam, now);
        return new Started(toDto(attempt, exam, profile, now), true);
    }

    /** GET /exam-attempts/{id} — vào lại lượt thi (FR-EXAM-04). */
    public AttemptDto attempt(UUID userId, Long attemptId) {
        ExamAttempt attempt = ownAttempt(userId, attemptId);
        Exam exam = exams.findById(attempt.getExamId()).orElseThrow();
        return toDto(attempt, exam, requireUser(userId), Times.nowUtc(clock));
    }

    /** POST /exam-attempts/{id}/submit (BR-EXAM-05, 06). */
    public ExamResultDto submit(UUID userId, Long attemptId, List<AnswerDto> answers) {
        ExamAttempt attempt = ownAttempt(userId, attemptId);
        if (!attempt.isOpen()) {
            throw ApiException.conflict("ATTEMPT_CLOSED", "This attempt is already submitted");
        }
        List<ExamAttemptQuestion> rows =
                attemptQuestions.findByIdAttemptIdOrderByQuestionOrderAsc(attemptId);
        Map<Integer, String> byOrder = answersByOrder(answers);
        requireAllAnswered(rows, byOrder);

        Exam exam = exams.findById(attempt.getExamId()).orElseThrow();
        LocalDateTime now = Times.nowUtc(clock);
        List<ResultItemDto> items = gradeAll(userId, rows, byOrder, now);
        int correct = (int) items.stream().filter(ResultItemDto::isCorrect).count();
        boolean passed = correct * 100 >= exam.getPassPercent() * rows.size();

        attempt.setCorrectCount(correct);
        attempt.setStatus(passed ? ExamAttempt.PASSED : ExamAttempt.FAILED);
        attempt.setCompletedAt(now);
        // @Version: hai lệnh nộp song song thì lệnh sau thất bại tại đây → không cộng bản vẽ đôi
        attempts.saveAndFlush(attempt);

        BlueprintDto blueprint = passed ? grantBlueprint(userId, exam) : null;
        int scorePercent = rows.isEmpty() ? 0 : correct * 100 / rows.size();
        return new ExamResultDto(
                attempt.getId(),
                attempt.getStatus(),
                correct,
                rows.size(),
                scorePercent,
                exam.getPassPercent(),
                items,
                blueprint,
                List.of(),
                ResourcesDto.of(requireUser(userId)));
    }

    // ---------------------------------------------------------------------------------------------
    // Điều kiện thi
    // ---------------------------------------------------------------------------------------------

    private ExamStatusDto statusOf(UserProfile profile, Exam exam, Building building) {
        UUID userId = profile.getId();
        ExamRequirement requirement = requirementOf(exam);
        Long requiredBuildingId = requirement.getRequiredBuildingId();
        int requiredBuildingLevelNow = requiredBuildingId == null
                ? 0
                : city.currentLevel(userId, requiredBuildingId);
        ProgressDto now = new ProgressDto(
                collectedOfBuilding(userId, building, exam.getTargetLevel()),
                profile.getKnowledgePoints(),
                profile.getBlueprintShards(),
                requiredBuildingLevelNow);
        MissingDto missing = missingOf(requirement, now);
        boolean passed = isPassed(userId, exam);
        Long activeAttemptId = attempts.findFirstByUserIdAndExamIdAndStatus(
                userId, exam.getId(), ExamAttempt.IN_PROGRESS).map(ExamAttempt::getId).orElse(null);

        return new ExamStatusDto(
                exam.getCode(),
                building.getCode(),
                exam.getTargetLevel(),
                exam.getQuestionCount(),
                exam.getPassPercent(),
                requirementDto(requirement),
                now,
                missing,
                !passed && activeAttemptId == null && !missing.any(),
                passed,
                activeAttemptId);
    }

    private RequirementDto requirementDto(ExamRequirement requirement) {
        String requiredBuildingCode = requirement.getRequiredBuildingId() == null
                ? null
                : buildings.findById(requirement.getRequiredBuildingId())
                        .map(Building::getCode).orElse(null);
        return new RequirementDto(
                requirement.getRequiredCardCount(),
                requirement.getRequiredKnowledge(),
                requirement.getRequiredBlueprintShards(),
                requiredBuildingCode,
                requirement.getRequiredBuildingLevel());
    }

    /** Còn thiếu bao nhiêu cho từng điều kiện (0 = đã đủ). */
    private static MissingDto missingOf(ExamRequirement requirement, ProgressDto now) {
        return new MissingDto(
                Math.max(0, requirement.getRequiredCardCount() - now.collected()),
                Math.max(0, requirement.getRequiredKnowledge() - now.knowledgePoints()),
                Math.max(0, requirement.getRequiredBlueprintShards() - now.blueprintShards()),
                now.requiredBuildingLevel() < requirement.getRequiredBuildingLevel());
    }

    /** BR-EXAM-01: từ đã sưu tầm thuộc công trình, gói level 1..targetLevel. */
    private long collectedOfBuilding(UUID userId, Building building, int targetLevel) {
        List<Long> words = new ArrayList<>();
        for (int level = 1; level <= targetLevel; level++) {
            words.addAll(content.vocabularyIdsOf(building.getId(), level));
        }
        if (words.isEmpty()) {
            return 0;
        }
        return progress.countByUserIdAndVocabularyIdInAndCollectedAtIsNotNull(userId, words);
    }

    /** BR-EXAM-07: đã có bản vẽ còn dùng được, hoặc công trình đã đạt level đích. */
    private boolean isPassed(UUID userId, Exam exam) {
        if (city.currentLevel(userId, exam.getBuildingId()) >= exam.getTargetLevel()) {
            return true;
        }
        return userBlueprints.findByUserIdAndBlueprintId(userId, exam.getRewardBlueprintId())
                .map(owned -> owned.getQuantity() > 0)
                .orElse(false);
    }

    private ExamRequirement requirementOf(Exam exam) {
        return requirements.findByExamIdIn(List.of(exam.getId())).stream().findFirst()
                .orElseGet(() -> {
                    ExamRequirement none = new ExamRequirement();
                    none.setRequiredCardCount(0);
                    none.setRequiredKnowledge(0);
                    none.setRequiredBlueprintShards(0);
                    return none;
                });
    }

    // ---------------------------------------------------------------------------------------------
    // Đề thi và chấm
    // ---------------------------------------------------------------------------------------------

    /** BR-EXAM-04: rút ngẫu nhiên {@code question_count} câu từ pool, chốt thứ tự. */
    private ExamAttempt createAttempt(UUID userId, Exam exam, LocalDateTime now) {
        List<Long> pool = examQuestions.findByIdExamIdIn(List.of(exam.getId())).stream()
                .map(link -> link.getId().getQuestionId())
                .collect(Collectors.toCollection(ArrayList::new));
        if (pool.isEmpty()) {
            throw ApiException.conflict("NO_CONTENT", "This exam has no questions yet");
        }
        Collections.shuffle(pool, random);
        List<Long> chosen = pool.subList(0, Math.min(exam.getQuestionCount(), pool.size()));
        Map<Long, Long> vocabOf = targetVocabularies(chosen);

        ExamAttempt attempt = new ExamAttempt();
        attempt.setUserId(userId);
        attempt.setExamId(exam.getId());
        attempt.setTotalCount(chosen.size());
        attempt.setStartedAt(now);
        attempt = attempts.save(attempt);

        List<ExamAttemptQuestion> rows = new ArrayList<>();
        for (int i = 0; i < chosen.size(); i++) {
            ExamAttemptQuestion row = new ExamAttemptQuestion();
            row.setId(new ExamAttemptQuestionId(attempt.getId(), chosen.get(i)));
            row.setVocabularyId(vocabOf.get(chosen.get(i)));
            row.setQuestionOrder(i + 1);
            rows.add(row);
        }
        attemptQuestions.saveAll(rows);
        return attempt;
    }

    private Map<Long, Long> targetVocabularies(List<Long> questionIds) {
        return questionVocabularies.findByIdQuestionIdIn(questionIds).stream()
                .filter(link -> "TARGET".equals(link.getRelationType()))
                .collect(Collectors.toMap(
                        link -> link.getId().getQuestionId(),
                        link -> link.getId().getVocabularyId(),
                        (first, second) -> first));
    }

    private static Map<Integer, String> answersByOrder(List<AnswerDto> answers) {
        Map<Integer, String> byOrder = new LinkedHashMap<>();
        if (answers == null) {
            return byOrder;
        }
        for (AnswerDto answer : answers) {
            if (answer != null && answer.answer() != null && !answer.answer().isBlank()) {
                byOrder.put(answer.order(), answer.answer());
            }
        }
        return byOrder;
    }

    private static void requireAllAnswered(
            List<ExamAttemptQuestion> rows, Map<Integer, String> byOrder) {
        List<Integer> missing = rows.stream()
                .map(ExamAttemptQuestion::getQuestionOrder)
                .filter(order -> !byOrder.containsKey(order))
                .toList();
        if (!missing.isEmpty()) {
            throw new ApiException(HttpStatus.CONFLICT, "INCOMPLETE",
                    "Some questions are not answered", Map.of("missingOrders", missing));
        }
    }

    /** Chấm từng câu và áp Mastery cho từ TARGET (BR-EXAM-05, BR-LEARN-03, 04). */
    private List<ResultItemDto> gradeAll(UUID userId, List<ExamAttemptQuestion> rows,
            Map<Integer, String> byOrder, LocalDateTime now) {
        Map<Long, Question> byId = questions.findAllById(rows.stream()
                .map(row -> row.getId().getQuestionId()).toList())
                .stream().collect(Collectors.toMap(Question::getId, Function.identity()));
        List<ResultItemDto> items = new ArrayList<>();
        for (ExamAttemptQuestion row : rows) {
            Question question = byId.get(row.getId().getQuestionId());
            String given = byOrder.get(row.getQuestionOrder());
            boolean correct = AnswerGrader.isCorrect(
                    given, question.getAnswer(), views.acceptedAnswers(question));
            row.setAnswerGiven(given);
            row.setIsCorrect(correct);
            row.setAnsweredAt(now);
            recordMastery(userId, row.getVocabularyId(), correct, now);
            items.add(new ResultItemDto(
                    row.getQuestionOrder(),
                    question.getQuestionText(),
                    views.sentenceOf(question),
                    given,
                    question.getAnswer(),
                    correct,
                    question.getExplanation()));
        }
        attemptQuestions.saveAll(rows);
        return items;
    }

    private void recordMastery(UUID userId, Long vocabularyId, boolean correct, LocalDateTime now) {
        if (vocabularyId == null) {
            return;
        }
        Vocabulary vocabulary = vocabularies.findById(vocabularyId).orElseThrow();
        int max = balance.maxMastery(vocabulary.getDifficultyRank());
        var outcome = recorder.record(userId, vocabularyId, correct, max, true, now);
        if (outcome.collectedNow()) {
            tracker.record(userId, QuestTracker.NEW_WORDS, 1);
        }
    }

    /** BR-EXAM-06: đậu → +1 bản vẽ (công trình, level đích). */
    private BlueprintDto grantBlueprint(UUID userId, Exam exam) {
        Blueprint blueprint = blueprints.findById(exam.getRewardBlueprintId()).orElseThrow();
        UserBlueprint owned = userBlueprints.findByUserIdAndBlueprintId(userId, blueprint.getId())
                .orElseGet(() -> {
                    UserBlueprint fresh = new UserBlueprint();
                    fresh.setUserId(userId);
                    fresh.setBlueprintId(blueprint.getId());
                    return fresh;
                });
        owned.setQuantity(owned.getQuantity() + 1);
        userBlueprints.save(owned);
        String buildingCode = buildings.findById(blueprint.getBuildingId())
                .map(Building::getCode).orElse(null);
        return new BlueprintDto(
                blueprint.getCode(), buildingCode, blueprint.getTargetLevel(), owned.getQuantity());
    }

    // ---------------------------------------------------------------------------------------------

    private AttemptDto toDto(
            ExamAttempt attempt, Exam exam, UserProfile profile, LocalDateTime now) {
        List<ExamAttemptQuestion> rows =
                attemptQuestions.findByIdAttemptIdOrderByQuestionOrderAsc(attempt.getId());
        Map<Long, Question> byId = questions.findAllById(rows.stream()
                .map(row -> row.getId().getQuestionId()).toList())
                .stream().collect(Collectors.toMap(Question::getId, Function.identity()));
        List<AttemptQuestionDto> list = rows.stream()
                .map(row -> new AttemptQuestionDto(
                        row.getQuestionOrder(),
                        row.getId().getQuestionId(),
                        views.viewOf(byId.get(row.getId().getQuestionId()))))
                .toList();
        return new AttemptDto(
                attempt.getId(),
                exam.getCode(),
                attempt.getStatus(),
                Times.toInstant(attempt.getStartedAt()),
                Times.toInstant(now),
                exam.getPassPercent(),
                list,
                ResourcesDto.of(profile));
    }

    private ExamAttempt ownAttempt(UUID userId, Long attemptId) {
        return attempts.findById(attemptId)
                .filter(attempt -> attempt.getUserId().equals(userId))
                .orElseThrow(() -> ApiException.notFound(
                        "ATTEMPT_NOT_FOUND", "No attempt " + attemptId));
    }

    private Exam findExam(String code) {
        return exams.findByCode(code.toUpperCase(Locale.ROOT))
                .orElseThrow(() -> ApiException.notFound("EXAM_NOT_FOUND", "No exam " + code));
    }

    private Building findBuilding(String code) {
        String normalized = code == null ? "" : code.toUpperCase(Locale.ROOT);
        return buildings.findByCode(normalized)
                .orElseThrow(() -> ApiException.notFound(
                        "BUILDING_NOT_FOUND", "Unknown building " + code));
    }

    private UserProfile requireUser(UUID userId) {
        return users.findById(userId).orElseThrow(UserProfileNotFoundException::new);
    }
}
