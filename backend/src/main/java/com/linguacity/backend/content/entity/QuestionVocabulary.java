package com.linguacity.backend.content.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Liên kết câu hỏi ↔ từ (TARGET/CONTEXT).
 * Nội dung tĩnh — chỉ đọc ở server (dữ liệu nạp bằng SQL seed, system-design §5.1, §10.2.1).
 */
@Entity
@Table(name = "question_vocabularies")
@Data
public class QuestionVocabulary {

    @EmbeddedId
    private QuestionVocabularyId id;

    @Column(name = "relation_type", nullable = false)
    private String relationType;
}
