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

    /**
     * Mastery ±1 chỉ khi {@code applyMastery} (luyện tập: mỗi từ một lần mỗi ngày, BR-PRAC-03).
     * Sưu tầm luôn được ghi khi trả lời đúng lần đầu, kể cả khi không áp Mastery (BR-PRAC-04).
     */
    public Outcome record(UUID userId, Long vocabularyId, boolean correct, int maxMastery,
            boolean applyMastery, LocalDateTime now) {
        UserVocabProgress row = progress.findByUserIdAndVocabularyId(userId, vocabularyId)
                .orElseGet(() -> fresh(userId, vocabularyId));
        boolean wasCollected = row.isCollected();

        if (applyMastery) {
            row.setMasteryScore(MasteryEngine.apply(row.getMasteryScore(), correct, maxMastery));
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

    private static UserVocabProgress fresh(UUID userId, Long vocabularyId) {
        UserVocabProgress row = new UserVocabProgress();
        row.setUserId(userId);
        row.setVocabularyId(vocabularyId);
        return row;
    }
}
