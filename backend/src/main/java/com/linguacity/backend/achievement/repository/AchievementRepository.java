package com.linguacity.backend.achievement.repository;

import com.linguacity.backend.achievement.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AchievementRepository extends JpaRepository<Achievement, String> {

    List<Achievement> findAllByOrderBySortOrderAsc();
}
