package com.linguacity.backend.content.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Bài thi nâng cấp (chấm ở VS4).
 * Nội dung tĩnh — chỉ đọc ở server (dữ liệu nạp bằng SQL seed, system-design §5.1, §10.2.1).
 */
@Entity
@Table(name = "exams")
@Data
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "building_id", nullable = false)
    private Long buildingId;

    @Column(name = "target_level", nullable = false)
    private Integer targetLevel;

    @Column(name = "reward_blueprint_id", nullable = false)
    private Long rewardBlueprintId;

    @Column(name = "question_count", nullable = false)
    private Integer questionCount;
}
