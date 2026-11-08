package com.linguacity.backend.quest.repository;

import com.linguacity.backend.quest.entity.UserQuest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserQuestRepository extends JpaRepository<UserQuest, Long> {

    List<UserQuest> findByUserIdAndPeriodDate(UUID userId, LocalDate periodDate);

    List<UserQuest> findByUserIdAndPeriodDateIsNull(UUID userId);

    Optional<UserQuest> findByUserIdAndQuestCodeAndPeriodDate(
            UUID userId, String questCode, LocalDate periodDate);

    Optional<UserQuest> findByUserIdAndQuestCodeAndPeriodDateIsNull(UUID userId, String questCode);
}
