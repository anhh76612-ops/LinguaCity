package com.linguacity.backend.city.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

/** Trạng thái công trình của một người chơi (§5.1.12). Thời gian lưu UTC. */
@Entity
@Table(name = "user_buildings")
@Data
public class UserBuilding {

    public static final String IDLE = "IDLE";
    public static final String UPGRADING = "UPGRADING";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "building_id", nullable = false)
    private Long buildingId;

    @Column(name = "current_level", nullable = false)
    private Integer currentLevel = 0;

    @Column(name = "target_level")
    private Integer targetLevel;

    @Column(name = "is_unlocked", nullable = false)
    private boolean unlocked = false;

    @Column(name = "status", nullable = false, length = 20)
    private String status = IDLE;

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "finish_at")
    private LocalDateTime finishAt;
}
