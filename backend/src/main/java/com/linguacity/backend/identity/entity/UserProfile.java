package com.linguacity.backend.identity.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "user_profiles")
@Data
public class UserProfile {

    @Id
    @Column(nullable = false)
    private UUID id;

    @Column(name = "knowledge_points", nullable = false)
    private Integer knowledgePoints = 0;

    @Column(name = "hourglass_count", nullable = false)
    private Integer hourglassCount = 0;

    @Column(name = "blueprint_shards", nullable = false)
    private Integer blueprintShards = 0;
}
