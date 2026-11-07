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
public class QuestionVocabularyId implements Serializable {

    @Column(name = "question_id", nullable = false)
    private Long questionId;

    @Column(name = "vocabulary_id", nullable = false)
    private Long vocabularyId;
}
