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

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    /** ADR-017: Gạch — kiếm từ học từ mới. */
    @Column(name = "bricks", nullable = false)
    private Integer bricks = 0;

    /** ADR-017: Gỗ — kiếm từ ôn tập (luyện tập). */
    @Column(name = "wood", nullable = false)
    private Integer wood = 0;

    @Column(name = "tutorial_completed", nullable = false)
    private boolean tutorialCompleted = false;

    /**
     * Optimistic Locking (FR-SYS-05): hai request cùng cộng/trừ KP thì request sau bị từ chối thay
     * vì ghi đè.
     */
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

    /** Chuỗi ngày hiện tại (ADR-015 §7): ngày có học bài và xong nhiệm vụ hằng ngày. */
    @Column(name = "streak_days", nullable = false)
    private Integer streakDays = 0;

    @Column(name = "best_streak", nullable = false)
    private Integer bestStreak = 0;

    /** Ngày (giờ Việt Nam) cuối cùng được tính vào chuỗi. */
    @Column(name = "streak_last_date")
    private LocalDate streakLastDate;

    /**
     * Thời điểm hồ sơ chuyển sang xác thực bằng token (VS6, ADR-016). Khác null thì header
     * {@code X-Guest-UUID} của app bản cũ không còn dùng được cho hồ sơ này.
     */
    @Column(name = "claimed_at")
    private LocalDateTime claimedAt;
}
