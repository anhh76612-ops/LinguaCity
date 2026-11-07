package com.linguacity.backend.content.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/**
 * Câu hỏi trong ngân hàng câu hỏi chung.
 * Nội dung tĩnh — chỉ đọc ở server (dữ liệu nạp bằng SQL seed, system-design §5.1, §10.2.1).
 */
@Entity
@Table(name = "questions")
@Data
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content_type", nullable = false)
    private String contentType;

    @Column(name = "skill", nullable = false)
    private String skill;

    @Column(name = "question_type", nullable = false)
    private String questionType;

    @Column(name = "tier", nullable = false)
    private Integer tier;

    @Column(name = "question_text")
    private String questionText;

    /** Đáp án chuẩn — chỉ ở server (NFR-01). Không bao giờ đưa vào DTO trước khi nộp. */
    @Column(name = "answer", nullable = false)
    private String answer;

    /** Các đáp án khác cũng được chấp nhận (ADR-013) — chỉ ở server. */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "accepted_answers")
    private String acceptedAnswers;

    @Column(name = "explanation")
    private String explanation;

    @Column(name = "audio_url")
    private String audioUrl;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "metadata")
    private String metadata;
}
