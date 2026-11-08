package com.linguacity.backend.cosmetic.repository;

import com.linguacity.backend.cosmetic.entity.UserCosmetic;
import com.linguacity.backend.cosmetic.entity.UserCosmeticId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserCosmeticRepository extends JpaRepository<UserCosmetic, UserCosmeticId> {

    List<UserCosmetic> findByIdUserId(UUID userId);
}
