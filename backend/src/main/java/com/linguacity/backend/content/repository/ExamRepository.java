package com.linguacity.backend.content.repository;

import com.linguacity.backend.content.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ExamRepository extends JpaRepository<Exam, Long> {

    List<Exam> findByBuildingIdAndTargetLevel(Long buildingId, Integer targetLevel);

    Optional<Exam> findByCode(String code);

    List<Exam> findByBuildingIdOrderByTargetLevelAsc(Long buildingId);
}
