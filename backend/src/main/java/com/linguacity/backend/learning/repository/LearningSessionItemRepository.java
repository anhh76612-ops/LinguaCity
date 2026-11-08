package com.linguacity.backend.learning.repository;

import com.linguacity.backend.learning.entity.LearningSessionItem;
import com.linguacity.backend.learning.entity.LearningSessionItemId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LearningSessionItemRepository
        extends JpaRepository<LearningSessionItem, LearningSessionItemId> {

    List<LearningSessionItem> findByIdSessionIdOrderByIdItemNoAsc(UUID sessionId);

    long countByIdSessionIdAndAnsweredAtIsNull(UUID sessionId);
}
