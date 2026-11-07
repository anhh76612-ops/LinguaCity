package com.linguacity.backend.learning.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

/** Một câu trong phiên. Đã có {@code answeredAt} thì không nộp lại được (BR-LEARN-02). */
@Entity
@Table(name = "learning_session_items")
@Data
public class LearningSessionItem {

    @EmbeddedId
    private LearningSessionItemId id;

    @Column(name = "question_id", nullable = false)
    private Long questionId;

    @Column(name = "vocabulary_id", nullable = false)
    private Long vocabularyId;

    @Column(name = "answer_given")
    private String answerGiven;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    @Column(name = "answered_at")
    private LocalDateTime answeredAt;

    public boolean isAnswered() {
        return answeredAt != null;
    }
}
