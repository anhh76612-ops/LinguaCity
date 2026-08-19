package com.linguacity.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_vocabulary_progress")
@Data
public class UserVocabularyProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserProfile user;

    @ManyToOne
    @JoinColumn(name = "vocabulary_id", nullable = false)
    private Vocabulary vocabulary;

    @Column(nullable = false)
    private String status = "NEW"; // Trạng thái: NEW (Chưa học), LEARNING (Đang học), MASTERED (Đã thuộc lòng)

    private LocalDateTime lastReviewed; // Thời gian ôn tập lần cuối (Dùng để tính thanh Progress)
}