package com.linguacity.backend.content.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuildingLevelId implements Serializable {

    @Column(name = "building_id", nullable = false)
    private Long buildingId;

    @Column(name = "level", nullable = false)
    private Integer level;
}
