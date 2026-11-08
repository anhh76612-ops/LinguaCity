package com.linguacity.backend.achievement.entity;

import jakarta.persistence.*;
import lombok.Data;

/** Danh mục danh hiệu (nội dung tĩnh, gói CORE — system-design §10.5). */
@Entity
@Table(name = "achievements")
@Data
public class Achievement {

    @Id
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    /** EASY | HARD | HIDDEN */
    @Column(name = "tier", nullable = false)
    private String tier;

    @Column(name = "condition_type", nullable = false)
    private String conditionType;

    @Column(name = "threshold", nullable = false)
    private Integer threshold;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    public boolean isHidden() {
        return "HIDDEN".equals(tier);
    }

    /** Danh hiệu thu hồi được khi điều kiện mất đi, ví dụ danh hiệu chuỗi (BR-ACH-05). */
    @Column(name = "revocable", nullable = false)
    private boolean revocable = false;
}
