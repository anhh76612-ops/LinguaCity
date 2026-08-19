package com.linguacity.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_profiles")
@Data
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username; // Tên định danh của người chơi (VD: player123)

    // Các tài nguyên cốt lõi (Mặc định khi tạo acc là 0)
    private Integer knowledgePoints = 0; // Điểm Tri Thức
    private Integer hourglassCount = 0;  // Đồng hồ cát
    private Integer blueprintShards = 0; // Mảnh ghép bản vẽ
    private Integer fullBlueprints = 0;  // Bản vẽ nguyên vẹn
}