package com.linguacity.backend.city.repository;

import com.linguacity.backend.city.entity.UserBuilding;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserBuildingRepository extends JpaRepository<UserBuilding, Long> {

    List<UserBuilding> findByUserId(UUID userId);

    Optional<UserBuilding> findByUserIdAndBuildingId(UUID userId, Long buildingId);
}
