package com.linguacity.backend.content.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/**
 * Thẻ từ vựng. {@code examples} là mảng JSON chuỗi.
 * Nội dung tĩnh — chỉ đọc ở server (dữ liệu nạp bằng SQL seed, system-design §5.1, §10.2.1).
 */
@Entity
@Table(name = "vocabularies")
@Data
public class Vocabulary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "word", nullable = false)
    private String word;

    @Column(name = "meaning", nullable = false)
    private String meaning;

    @Column(name = "word_type", nullable = false)
    private String wordType;

    @Column(name = "ipa")
    private String ipa;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "examples")
    private String examples;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "theme_id", nullable = false)
    private Long themeId;

    @Column(name = "level", nullable = false)
    private Integer level;

    @Column(name = "difficulty_rank", nullable = false)
    private String difficultyRank;
}
