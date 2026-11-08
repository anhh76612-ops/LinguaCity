package com.linguacity.backend.achievement.repository;

import com.linguacity.backend.achievement.entity.UserAchievement;
import com.linguacity.backend.achievement.entity.UserAchievementId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserAchievementRepository
        extends JpaRepository<UserAchievement, UserAchievementId> {

    List<UserAchievement> findByIdUserIdOrderByEarnedAtAsc(UUID userId);
}
