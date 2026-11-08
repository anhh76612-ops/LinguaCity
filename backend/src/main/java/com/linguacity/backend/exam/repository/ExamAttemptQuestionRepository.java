package com.linguacity.backend.exam.repository;

import com.linguacity.backend.exam.entity.ExamAttemptQuestion;
import com.linguacity.backend.exam.entity.ExamAttemptQuestionId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamAttemptQuestionRepository
        extends JpaRepository<ExamAttemptQuestion, ExamAttemptQuestionId> {

    List<ExamAttemptQuestion> findByIdAttemptIdOrderByQuestionOrderAsc(Long attemptId);
}
