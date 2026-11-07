package com.linguacity.backend.content.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * Một gói nội dung (CORE hoặc công trình:Level) và version của nó (ADR-012).
 * Nội dung tĩnh — chỉ đọc ở server (dữ liệu nạp bằng SQL seed, system-design §5.1, §10.2.1).
 */
@Entity
@Table(name = "content_packs")
@Data
public class ContentPack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "scope", nullable = false)
    private String scope;

    @Column(name = "building_id")
    private Long buildingId;

    @Column(name = "level")
    private Integer level;

    @Column(name = "version", nullable = false)
    private Integer version;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
