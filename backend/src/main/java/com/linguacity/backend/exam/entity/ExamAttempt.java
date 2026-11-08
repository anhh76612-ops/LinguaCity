package com.linguacity.backend.exam.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

/** Một lượt thi (system-design §11.1). Thời gian lưu UTC. */
@Entity
@Table(name = "exam_attempts")
@Data
public class ExamAttempt {

    public static final String IN_PROGRESS = "IN_PROGRESS";
    public static final String PASSED = "PASSED";
    public static final String FAILED = "FAILED";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "exam_id", nullable = false)
    private Long examId;

    @Column(name = "status", nullable = false, length = 20)
    private String status = IN_PROGRESS;

    @Column(name = "correct_count", nullable = false)
    private Integer correctCount = 0;

    @Column(name = "total_count", nullable = false)
    private Integer totalCount;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    /** Hai lệnh nộp song song: lệnh sau bị từ chối, bản vẽ không bị cộng hai lần. */
    @Version
    @Column(name = "version", nullable = false)
    private Long version;

    public boolean isOpen() {
        return IN_PROGRESS.equals(status);
    }
}
