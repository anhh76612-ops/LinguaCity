package com.linguacity.backend.achievement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_achievements")
@Data
public class UserAchievement {

    @EmbeddedId
    private UserAchievementId id;

    @Column(name = "earned_at", nullable = false)
    private LocalDateTime earnedAt;
}
