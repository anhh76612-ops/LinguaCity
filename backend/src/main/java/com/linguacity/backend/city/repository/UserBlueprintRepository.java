package com.linguacity.backend.city.repository;

import com.linguacity.backend.city.entity.UserBlueprint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserBlueprintRepository extends JpaRepository<UserBlueprint, Long> {

    Optional<UserBlueprint> findByUserIdAndBlueprintId(UUID userId, Long blueprintId);

    List<UserBlueprint> findByUserIdAndQuantityGreaterThan(UUID userId, int quantity);
}
