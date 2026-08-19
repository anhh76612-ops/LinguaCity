package com.linguacity.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "vocabularies")
@Data
public class Vocabulary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String word;

    @Column(nullable = false)
    private String meaning;

    private String wordType; // Noun, Verb, Adj...

    private String ipa; // Phiên âm

    private String imageUrl; // Đường dẫn ảnh

    @Column(columnDefinition = "TEXT")
    private String examples; // Chuỗi JSON chứa danh sách câu ví dụ

    @Column(nullable = false)
    private String buildingType; // HOUSING, SCHOOL, ROAD, PARK

    @Column(nullable = false)
    private Integer levelRequired; // 1, 2, 3, 4
}