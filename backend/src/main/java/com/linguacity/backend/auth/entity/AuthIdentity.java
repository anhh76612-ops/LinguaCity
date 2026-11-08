package com.linguacity.backend.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/** Một cách đăng nhập (provider + subject) của tài khoản. */
@Entity
@Table(name = "auth_identities", uniqueConstraints = {
        @UniqueConstraint(name = "uq_identity", columnNames = {"provider", "provider_subject"}),
        @UniqueConstraint(
                name = "uq_identity_per_user", columnNames = {"user_profile_id", "provider"})
})
@Getter
@Setter
public class AuthIdentity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_profile_id", nullable = false)
    private UUID userProfileId;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", nullable = false, length = 20)
    private AuthProvider provider;

    /** Google {@code sub}, Facebook user id, hoặc id hồ sơ với PASSWORD. */
    @Column(name = "provider_subject", nullable = false)
    private String providerSubject;

    @Column(name = "email_at_link", length = 254)
    private String emailAtLink;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
