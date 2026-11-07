package com.linguacity.backend.identity.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity
@Table(name = "user_profiles")
@Data
public class UserProfile {

    @Id
    @Column(nullable = false)
    private UUID id;

    @Column(name = "knowledge_points", nullable = false)
    private Integer knowledgePoints = 0;

    @Column(name = "hourglass_count", nullable = false)
    private Integer hourglassCount = 0;

    @Column(name = "blueprint_shards", nullable = false)
    private Integer blueprintShards = 0;

    @Column(name = "tutorial_completed", nullable = false)
    private boolean tutorialCompleted = false;

    /** Optimistic Locking (FR-SYS-05): hai request cùng cộng/trừ KP thì request sau bị từ chối thay vì ghi đè. */
    @Version
    @Column(name = "version", nullable = false)
    private Long version;

    /** Bước tutorial hiện tại (ADR-014) — lưu ở server để thoát app vẫn làm tiếp đúng chỗ. */
    @Enumerated(EnumType.STRING)
    @Column(name = "tutorial_step", nullable = false, length = 30)
    private TutorialStep tutorialStep = TutorialStep.INTRO;

    @Column(name = "equipped_achievement_code")
    private String equippedAchievementCode;

    /** Cấu hình ngoại hình (JSON) — dùng ở M8. */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "avatar_config")
    private String avatarConfig;

    /** Kiểu tường/sàn (JSON) — dùng ở M8. */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "house_style")
    private String houseStyle;
}
