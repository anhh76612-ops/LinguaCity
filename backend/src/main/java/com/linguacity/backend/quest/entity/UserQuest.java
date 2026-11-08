package com.linguacity.backend.quest.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/** Tiến độ nhiệm vụ của người chơi. MAIN: periodDate NULL; DAILY / BONUS: một dòng mỗi ngày. */
@Entity
@Table(name = "user_quests")
@Data
public class UserQuest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "quest_code", nullable = false)
    private String questCode;

    @Column(name = "period_date")
    private LocalDate periodDate;

    @Column(name = "progress", nullable = false)
    private Integer progress = 0;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "claimed_at")
    private LocalDateTime claimedAt;

    public boolean isCompleted() {
        return completedAt != null;
    }

    public boolean isClaimed() {
        return claimedAt != null;
    }
}
