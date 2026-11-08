package com.linguacity.backend.event.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

/** Mẫu sự kiện thành phố: cư dân + tình huống, gắn với một công trình (V007). */
@Entity
@Table(name = "city_event_templates")
@Data
public class CityEventTemplate {

    @Id
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "building_code", nullable = false)
    private String buildingCode;

    @Column(name = "resident_name", nullable = false)
    private String residentName;

    @Column(name = "situation", nullable = false)
    private String situation;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder = 0;
}
