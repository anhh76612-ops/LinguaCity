package com.linguacity.backend.content.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Điều kiện mở bài thi.
 * Nội dung tĩnh — chỉ đọc ở server (dữ liệu nạp bằng SQL seed, system-design §5.1, §10.2.1).
 */
@Entity
@Table(name = "exam_requirements")
@Data
public class ExamRequirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "exam_id", nullable = false)
    private Long examId;

    @Column(name = "required_card_count", nullable = false)
    private Integer requiredCardCount;

    @Column(name = "required_knowledge", nullable = false)
    private Integer requiredKnowledge;

    @Column(name = "required_blueprint_shards", nullable = false)
    private Integer requiredBlueprintShards;

    /** Công trình phải đạt level nào trước khi thi (nhiệm vụ chính tuyến, ADR-015 §2). */
    @Column(name = "required_building_id")
    private Long requiredBuildingId;

    @Column(name = "required_building_level", nullable = false)
    private Integer requiredBuildingLevel = 0;
}
