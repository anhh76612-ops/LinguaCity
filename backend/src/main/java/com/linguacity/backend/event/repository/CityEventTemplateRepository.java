package com.linguacity.backend.event.repository;

import com.linguacity.backend.event.entity.CityEventTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityEventTemplateRepository extends JpaRepository<CityEventTemplate, String> {

    List<CityEventTemplate> findAllByOrderBySortOrderAsc();
}
