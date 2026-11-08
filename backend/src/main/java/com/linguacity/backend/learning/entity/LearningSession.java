package com.linguacity.backend.learning.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

/** Một phiên học / bài kiểm tra trình độ (ADR-013, §10.2.2). Thời gian lưu UTC. */
@Entity
@Table(name = "learning_sessions")
@Data
public class LearningSession {

    @Id
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    /** NULL với phiên luyện tập và sự kiện — không gắn với một công trình (ADR-015). */
    @Column(name = "building_id")
    private Long buildingId;

    @Column(name = "vocab_level", nullable = false)
    private Integer vocabLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 20)
    private SessionType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private SessionStatus status = SessionStatus.ACTIVE;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt;

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "total_count", nullable = false)
    private Integer totalCount;

    @Column(name = "correct_count", nullable = false)
    private Integer correctCount = 0;

    @Column(name = "current_streak", nullable = false)
    private Integer currentStreak = 0;

    @Column(name = "best_streak", nullable = false)
    private Integer bestStreak = 0;

    @Column(name = "kp_awarded")
    private Integer kpAwarded;

    /** Hai lệnh complete song song: lệnh sau bị từ chối → KP không bị cộng hai lần (TC-VS3-14). */
    @Version
    @Column(name = "version", nullable = false)
    private Long version;
}
