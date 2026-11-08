package com.linguacity.backend.auth.repository;

import com.linguacity.backend.auth.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByTokenHash(String tokenHash);

    @Modifying
    @Query("UPDATE RefreshToken t SET t.revokedAt = :now "
            + "WHERE t.familyId = :family AND t.revokedAt IS NULL")
    int revokeFamily(@Param("family") UUID familyId, @Param("now") LocalDateTime now);

    @Modifying
    @Query("UPDATE RefreshToken t SET t.revokedAt = :now "
            + "WHERE t.userProfileId = :user AND t.revokedAt IS NULL")
    int revokeAllForUser(@Param("user") UUID userProfileId, @Param("now") LocalDateTime now);
}
