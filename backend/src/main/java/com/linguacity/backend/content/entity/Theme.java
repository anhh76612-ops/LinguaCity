package com.linguacity.backend.content.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Chủ đề từ vựng (DAILY_LIFE, HOUSE…).
 * Nội dung tĩnh — chỉ đọc ở server (dữ liệu nạp bằng SQL seed, system-design §5.1, §10.2.1).
 */
@Entity
@Table(name = "themes")
@Data
public class Theme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;
}
