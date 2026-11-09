package com.linguacity.backend.auth.repository;

import com.linguacity.backend.auth.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserAccountRepository extends JpaRepository<UserAccount, UUID> {

    Optional<UserAccount> findByEmailAndDeletedAtIsNull(String email);

    Optional<UserAccount> findByUserProfileIdAndDeletedAtIsNull(UUID userProfileId);
}
