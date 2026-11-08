package com.linguacity.backend.quest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

/** Mẫu nhiệm vụ (nội dung tĩnh, V007). kind: MAIN | DAILY | BONUS — system-design §11.4. */
@Entity
@Table(name = "quests")
@Data
public class Quest {

    public static final String MAIN = "MAIN";
    public static final String DAILY = "DAILY";
    public static final String BONUS = "BONUS";

    @Id
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "kind", nullable = false)
    private String kind;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "goal_type", nullable = false)
    private String goalType;

    @Column(name = "goal_ref")
    private String goalRef;

    @Column(name = "goal_value", nullable = false)
    private Integer goalValue;

    @Column(name = "reward_kp", nullable = false)
    private Integer rewardKp = 0;

    @Column(name = "reward_shards", nullable = false)
    private Integer rewardShards = 0;

    @Column(name = "prerequisite_code")
    private String prerequisiteCode;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder = 0;
}
