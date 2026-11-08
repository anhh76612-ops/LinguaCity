package com.linguacity.backend.city.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

/** Bản vẽ người chơi đang giữ (§5.1.13). Thi đậu +1, nâng cấp −1. */
@Entity
@Table(name = "user_blueprints")
@Data
public class UserBlueprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "blueprint_id", nullable = false)
    private Long blueprintId;

    @Column(name = "quantity", nullable = false)
    private Integer quantity = 0;
}
