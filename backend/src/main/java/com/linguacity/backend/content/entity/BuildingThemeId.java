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
public class BuildingThemeId implements Serializable {

    @Column(name = "building_id", nullable = false)
    private Long buildingId;

    @Column(name = "theme_id", nullable = false)
    private Long themeId;
}
