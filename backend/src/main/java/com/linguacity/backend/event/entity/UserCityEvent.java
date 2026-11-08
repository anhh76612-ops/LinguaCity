package com.linguacity.backend.event.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/** Một sự kiện đã xuất hiện cho người chơi trong một ngày (ADR-015 §5). */
@Entity
@Table(name = "user_city_events")
@Data
public class UserCityEvent {

    public static final String OPEN = "OPEN";
    public static final String RESOLVED = "RESOLVED";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "template_code", nullable = false)
    private String templateCode;

    @Column(name = "spawn_date", nullable = false)
    private LocalDate spawnDate;

    @Column(name = "status", nullable = false, length = 20)
    private String status = OPEN;

    @Column(name = "session_id")
    private UUID sessionId;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;
}
