package com.linguacity.backend.content.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Bảng nối công trình ↔ chủ đề (n-n, v3.3).
 * Nội dung tĩnh — chỉ đọc ở server (dữ liệu nạp bằng SQL seed, system-design §5.1, §10.2.1).
 */
@Entity
@Table(name = "building_themes")
@Data
public class BuildingTheme {

    @EmbeddedId
    private BuildingThemeId id;
}
