package com.linguacity.backend.exam.repository;

import com.linguacity.backend.exam.entity.ExamAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ExamAttemptRepository extends JpaRepository<ExamAttempt, Long> {

    Optional<ExamAttempt> findFirstByUserIdAndExamIdAndStatus(
            UUID userId, Long examId, String status);

    boolean existsByUserIdAndExamIdAndStatus(UUID userId, Long examId, String status);

    List<ExamAttempt> findByUserIdAndStatus(UUID userId, String status);
}
