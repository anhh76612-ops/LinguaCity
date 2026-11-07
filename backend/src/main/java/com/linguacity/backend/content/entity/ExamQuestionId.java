package com.linguacity.backend.content.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamQuestionId implements Serializable {

    @Column(name = "exam_id", nullable = false)
    private Long examId;

    @Column(name = "question_id", nullable = false)
    private Long questionId;
}
