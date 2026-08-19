package com.linguacity.backend.repository;

import com.linguacity.backend.entity.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VocabularyRepository extends JpaRepository<Vocabulary, Long> {

    // Hàm truy vấn: Tìm danh sách từ vựng theo loại công trình và level
    List<Vocabulary> findByBuildingTypeAndLevelRequired(String buildingType, Integer levelRequired);
}