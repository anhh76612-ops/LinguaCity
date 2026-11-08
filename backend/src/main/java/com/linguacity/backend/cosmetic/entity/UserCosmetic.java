package com.linguacity.backend.cosmetic.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

/** Món người chơi đã MUA bằng KP. Món FREE / ACHIEVEMENT không lưu ở đây (BR-COS-02). */
@Entity
@Table(name = "user_cosmetics")
@Data
public class UserCosmetic {

    @EmbeddedId
    private UserCosmeticId id;

    @Column(name = "unlocked_at", nullable = false)
    private LocalDateTime unlockedAt;
}
