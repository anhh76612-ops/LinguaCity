package com.linguacity.backend.content.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Bản vẽ của một công trình ở một Level đích.
 * Nội dung tĩnh — chỉ đọc ở server (dữ liệu nạp bằng SQL seed, system-design §5.1, §10.2.1).
 */
@Entity
@Table(name = "blueprints")
@Data
public class Blueprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "building_id", nullable = false)
    private Long buildingId;

    @Column(name = "target_level", nullable = false)
    private Integer targetLevel;
}
