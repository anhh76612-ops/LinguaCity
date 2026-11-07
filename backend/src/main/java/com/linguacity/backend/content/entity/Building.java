package com.linguacity.backend.content.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Loại công trình. v3.3: không còn theme_id, chủ đề nằm ở {@link BuildingTheme}.
 * Nội dung tĩnh — chỉ đọc ở server (dữ liệu nạp bằng SQL seed, system-design §5.1, §10.2.1).
 */
@Entity
@Table(name = "buildings")
@Data
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "max_level", nullable = false)
    private Integer maxLevel;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;
}
