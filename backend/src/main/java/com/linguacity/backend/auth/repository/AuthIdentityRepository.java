package com.linguacity.backend.auth.repository;

import com.linguacity.backend.auth.entity.AuthIdentity;
import com.linguacity.backend.auth.entity.AuthProvider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AuthIdentityRepository extends JpaRepository<AuthIdentity, Long> {

    Optional<AuthIdentity> findByProviderAndProviderSubject(
            AuthProvider provider, String providerSubject);

    Optional<AuthIdentity> findByUserProfileIdAndProvider(
            UUID userProfileId, AuthProvider provider);

    List<AuthIdentity> findByUserProfileId(UUID userProfileId);

    void deleteByUserProfileId(UUID userProfileId);
}
