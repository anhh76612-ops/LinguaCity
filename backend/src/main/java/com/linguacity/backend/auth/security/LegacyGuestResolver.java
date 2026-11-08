package com.linguacity.backend.auth.security;

import com.linguacity.backend.auth.config.AuthProperties;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Optional;
import java.util.UUID;

/**
 * Nhận header {@code X-Guest-UUID} của app bản trước VS6 khi cờ {@code legacy-guest-header} bật.
 * Hồ sơ đã đổi sang token (claimed) thì không nhận nữa.
 */
public class LegacyGuestResolver {

    public static final String HEADER = "X-Guest-UUID";

    private final UserProfileRepository profiles;
    private final AuthProperties properties;

    public LegacyGuestResolver(UserProfileRepository profiles, AuthProperties properties) {
        this.profiles = profiles;
        this.properties = properties;
    }

    public Optional<AuthUser> resolve(HttpServletRequest request) {
        String legacy = request.getHeader(HEADER);
        if (legacy == null || !properties.isLegacyGuestHeader()) {
            return Optional.empty();
        }
        UUID id;
        try {
            id = UUID.fromString(legacy.trim());
        } catch (IllegalArgumentException exception) {
            return Optional.empty();
        }
        boolean claimed = profiles.findById(id)
                .map(UserProfile::getClaimedAt)
                .isPresent();
        if (claimed) {
            return Optional.empty();
        }
        return Optional.of(new AuthUser(id, AuthUser.Type.LEGACY));
    }
}
