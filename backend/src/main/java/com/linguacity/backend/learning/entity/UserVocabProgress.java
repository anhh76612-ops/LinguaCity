package com.linguacity.backend.learning.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/** Tiến độ một từ của một người chơi (§5.1.14 + §10.2.2). Thời gian lưu UTC. */
@Entity
@Table(name = "user_vocab_progress")
@Data
public class UserVocabProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "vocabulary_id", nullable = false)
    private Long vocabularyId;

    @Column(name = "mastery_score", nullable = false)
    private Integer masteryScore = 0;

    @Column(name = "first_seen_at")
    private LocalDateTime firstSeenAt;

    @Column(name = "last_reviewed_at")
    private LocalDateTime lastReviewedAt;

    /** Lần cuối trả lời đúng (Kho thẻ: độ tươi của thẻ). Câu sai không xoá; null nếu chưa từng đúng. */
    @Column(name = "last_correct_at")
    private LocalDateTime lastCorrectAt;

    /** ADR-013: lần đầu trả lời đúng = "đã sưu tầm". Không bao giờ bị xoá (BR-LEARN-04). */
    @Column(name = "collected_at")
    private LocalDateTime collectedAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public boolean isCollected() {
        return collectedAt != null;
    }

    /** Luyện tập: ngày cuối cùng từ này được thưởng KP / Mastery (BR-PRAC-03). */
    @Column(name = "last_rewarded_on")
    private LocalDate lastRewardedOn;

    /** ADR-017: lần trả lời đúng gần nhất (mốc tính giảm Mastery theo thời gian). */
    @Column(name = "last_correct_at")
    private LocalDateTime lastCorrectAt;

    /** ADR-017: thời điểm chạm max Mastery; khác null thì không bao giờ giảm nữa. */
    @Column(name = "graduated_at")
    private LocalDateTime graduatedAt;
}
