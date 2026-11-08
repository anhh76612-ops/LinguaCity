package com.linguacity.backend.auth.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.linguacity.backend.auth.config.AuthProperties;
import com.linguacity.backend.auth.entity.AuthProvider;
import com.linguacity.backend.common.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

/**
 * Kiểm tra ID token từ Credential Manager: chữ ký bằng khoá công khai của Google, {@code iss},
 * hạn dùng, và {@code aud} phải là client id loại Web của LinguaCity.
 */
@Service
public class GoogleTokenVerifier implements SocialTokenVerifier {

    private final List<String> clientIds;
    private volatile GoogleIdTokenVerifier verifier;

    public GoogleTokenVerifier(AuthProperties properties) {
        this.clientIds = properties.getGoogleClientIds().stream()
                .filter(id -> id != null && !id.isBlank())
                .toList();
    }

    @Override
    public AuthProvider provider() {
        return AuthProvider.GOOGLE;
    }

    @Override
    public SocialProfile verify(String token) {
        if (clientIds.isEmpty()) {
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "PROVIDER_NOT_CONFIGURED",
                    "Google sign-in is not configured");
        }
        GoogleIdToken idToken;
        try {
            idToken = token == null ? null : verifier().verify(token);
        } catch (GeneralSecurityException | IOException | IllegalArgumentException exception) {
            idToken = null;
        }
        if (idToken == null) {
            throw SocialErrors.invalidToken();
        }
        GoogleIdToken.Payload payload = idToken.getPayload();
        String email = payload.getEmail() == null ? null : payload.getEmail().toLowerCase();
        boolean verified = Boolean.TRUE.equals(payload.getEmailVerified());
        return new SocialProfile(AuthProvider.GOOGLE, payload.getSubject(), email, verified,
                (String) payload.get("name"));
    }

    private GoogleIdTokenVerifier verifier() {
        if (verifier == null) {
            verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), GsonFactory.getDefaultInstance())
                    .setAudience(clientIds)
                    .build();
        }
        return verifier;
    }
}
