package com.linguacity.backend.content.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Bể câu hỏi của bài thi.
 * Nội dung tĩnh — chỉ đọc ở server (dữ liệu nạp bằng SQL seed, system-design §5.1, §10.2.1).
 */
@Entity
@Table(name = "exam_questions")
@Data
public class ExamQuestion {

    @EmbeddedId
    private ExamQuestionId id;
}
