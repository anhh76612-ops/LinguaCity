package com.linguacity.backend.exam.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

/** Một câu trong đề đã chốt của lượt thi (snapshot, BR-EXAM-04). */
@Entity
@Table(name = "exam_attempt_questions")
@Data
public class ExamAttemptQuestion {

    @EmbeddedId
    private ExamAttemptQuestionId id;

    @Column(name = "vocabulary_id", nullable = false)
    private Long vocabularyId;

    @Column(name = "question_order", nullable = false)
    private Integer questionOrder;

    @Column(name = "answer_given")
    private String answerGiven;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    @Column(name = "answered_at")
    private LocalDateTime answeredAt;
}
