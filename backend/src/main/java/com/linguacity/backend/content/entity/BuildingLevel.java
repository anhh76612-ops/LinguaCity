package com.linguacity.backend.content.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Chi phí, thời gian xây (giây) và số từ cần sưu tầm để lên Level này.
 * Nội dung tĩnh — chỉ đọc ở server (dữ liệu nạp bằng SQL seed, system-design §5.1, §10.2.1).
 */
@Entity
@Table(name = "building_levels")
@Data
public class BuildingLevel {

    @EmbeddedId
    private BuildingLevelId id;

    @Column(name = "knowledge_cost", nullable = false)
    private Integer knowledgeCost;

    @Column(name = "construction_time", nullable = false)
    private Long constructionTime;

    @Column(name = "required_collected", nullable = false)
    private Integer requiredCollected;

    /** Mảnh bản vẽ cần để nâng lên level này (BR-UPG-01). */
    @Column(name = "required_shards", nullable = false)
    private Integer requiredShards = 0;
}
