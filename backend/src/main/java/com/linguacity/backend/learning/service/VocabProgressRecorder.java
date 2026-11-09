package com.linguacity.backend.learning.service;

import com.linguacity.backend.learning.engine.MasteryEngine;
import com.linguacity.backend.learning.entity.UserVocabProgress;
import com.linguacity.backend.learning.repository.UserVocabProgressRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Ghi kết quả một câu trả lời vào tiến độ từ (BR-LEARN-03, 04). Dùng chung cho phiên học,
 * luyện tập, sự kiện và bài thi để mọi nơi chấm Mastery và sưu tầm theo cùng một luật.
 */
@Component
public class VocabProgressRecorder {

    private final UserVocabProgressRepository progress;

    public VocabProgressRecorder(UserVocabProgressRepository progress) {
        this.progress = progress;
    }

    /**
     * Kết quả ghi: dòng tiến độ sau khi lưu, từ có vừa được sưu tầm không, và trước câu này
     * từ đã được sưu tầm chưa (để đếm nhiệm vụ "ôn từ cũ").
     */
    public record Outcome(UserVocabProgress row, boolean collectedNow, boolean wasCollected) {}

    /** Số ngày không trả lời đúng thì Mastery giảm 1 (ADR-017). */
    public static final int DECAY_DAYS = 7;

    /**
     * Mastery v2 (ADR-017) chỉ đổi khi {@code applyMastery} (bài học, sự kiện, bài thi; luyện tập
     * không đổi Mastery): đúng thì lấy điểm đã giảm theo thời gian +1, sai thì giữ nguyên.
     * Sưu tầm luôn được ghi khi trả lời đúng lần đầu (BR-PRAC-04).
     */
    public Outcome record(UUID userId, Long vocabularyId, boolean correct, int maxMastery,
            boolean applyMastery, LocalDateTime now) {
        UserVocabProgress row = progress.findByUserIdAndVocabularyId(userId, vocabularyId)
                .orElseGet(() -> fresh(userId, vocabularyId));
        boolean wasCollected = row.isCollected();

        if (applyMastery && correct) {
            int base = effectiveMastery(row, now);
            int next = MasteryEngine.apply(base, true, maxMastery);
            row.setMasteryScore(next);
            row.setLastCorrectAt(now);
            if (next >= maxMastery && row.getGraduatedAt() == null) {
                row.setGraduatedAt(now);
            }
        }
        if (row.getFirstSeenAt() == null) {
            row.setFirstSeenAt(now);
        }
        row.setLastReviewedAt(now);
        if (correct) {
            row.setLastCorrectAt(now);
        }
        boolean collectedNow = correct && !wasCollected;
        if (collectedNow) {
            row.setCollectedAt(now); // BR-LEARN-04: sưu tầm = lần đầu trả lời đúng
        }
        row.setUpdatedAt(now);
        return new Outcome(progress.save(row), collectedNow, wasCollected);
    }

    /** Mastery hiển thị: điểm lưu trừ phần quên theo thời gian. */
    public static int effectiveMastery(UserVocabProgress row, LocalDateTime now) {
        return MasteryEngine.effective(row.getMasteryScore(), row.getLastCorrectAt(),
                row.getGraduatedAt(), now, DECAY_DAYS);
    }

    private static UserVocabProgress fresh(UUID userId, Long vocabularyId) {
        UserVocabProgress row = new UserVocabProgress();
        row.setUserId(userId);
        row.setVocabularyId(vocabularyId);
        return row;
    }
}
