package com.linguacity.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "buildings")
@Data
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Liên kết: Một User có nhiều Building
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserProfile user;

    @Column(nullable = false)
    private String buildingType; // HOUSING, SCHOOL, ROAD, PARK

    @Column(nullable = false)
    private Integer currentLevel = 1; // Mặc định xây xong là Level 1

    @Column(nullable = false)
    private String status = "IDLE"; // Trạng thái: IDLE (Đang rảnh), UPGRADING (Đang nâng cấp)

    // Lưu mốc thời gian hoàn thành nếu đang trong trạng thái UPGRADING
    private LocalDateTime finishTime;
}