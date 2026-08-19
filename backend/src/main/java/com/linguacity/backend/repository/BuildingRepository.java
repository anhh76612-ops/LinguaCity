package com.linguacity.backend.repository;
import com.linguacity.backend.entity.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {
    List<Building> findByUserId(Long userId); // Lấy danh sách nhà của 1 user
}