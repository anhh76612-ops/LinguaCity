package com.linguacity.backend.cosmetic.entity;

import jakarta.persistence.*;
import lombok.Data;

/** Danh mục món tuỳ biến (nội dung tĩnh, gói CORE — system-design §10.2.3). */
@Entity
@Table(name = "cosmetic_items")
@Data
public class CosmeticItem {

    public static final String FREE = "FREE";
    public static final String KP = "KP";
    public static final String ACHIEVEMENT = "ACHIEVEMENT";

    @Id
    @Column(name = "code", nullable = false)
    private String code;

    /** SKIN | HAIR_STYLE | HAIR_COLOR | SHIRT_COLOR | PANTS_COLOR | ACCESSORY | WALL | FLOOR */
    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "name", nullable = false)
    private String name;

    /** FREE | KP | ACHIEVEMENT */
    @Column(name = "unlock_type", nullable = false)
    private String unlockType;

    @Column(name = "price_kp", nullable = false)
    private Integer priceKp = 0;

    @Column(name = "achievement_code")
    private String achievementCode;

    /** Giá trị city-web dùng để vẽ: "#rrggbb" hoặc từ khoá kiểu dáng. */
    @Column(name = "asset_key", nullable = false)
    private String assetKey;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder = 0;
}
