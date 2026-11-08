package com.linguacity.backend.learning.repository;

import com.linguacity.backend.learning.entity.UserVocabProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserVocabProgressRepository extends JpaRepository<UserVocabProgress, Long> {

    Optional<UserVocabProgress> findByUserIdAndVocabularyId(UUID userId, Long vocabularyId);

    List<UserVocabProgress> findByUserIdAndVocabularyIdIn(
            UUID userId, Collection<Long> vocabularyIds);

    long countByUserIdAndVocabularyIdInAndCollectedAtIsNotNull(
            UUID userId, Collection<Long> vocabularyIds);

    long countByUserIdAndCollectedAtIsNotNull(UUID userId);

    List<UserVocabProgress> findByUserIdAndUpdatedAtAfterOrderByUpdatedAtAsc(
            UUID userId, LocalDateTime since);

    List<UserVocabProgress> findByUserIdOrderByUpdatedAtAsc(UUID userId);
}
