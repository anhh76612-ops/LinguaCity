package com.linguacity.backend.auth.repository;

import com.linguacity.backend.auth.entity.OneTimeCode;
import com.linguacity.backend.auth.entity.OtpPurpose;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface OneTimeCodeRepository extends JpaRepository<OneTimeCode, Long> {

    Optional<OneTimeCode> findFirstByUserProfileIdAndPurposeOrderByCreatedAtDesc(
            UUID userProfileId, OtpPurpose purpose);
}
