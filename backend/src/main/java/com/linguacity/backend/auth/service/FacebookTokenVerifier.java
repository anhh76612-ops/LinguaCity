package com.linguacity.backend.auth.service;

import com.linguacity.backend.auth.config.AuthProperties;
import com.linguacity.backend.auth.entity.AuthProvider;
import com.linguacity.backend.common.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.Map;

/**
 * Kiểm tra access token của Facebook Login: gọi Graph {@code debug_token} bằng app token để chắc
 * token còn hiệu lực và cấp cho đúng app, rồi đọc {@code /me}. Facebook chỉ trả email đã xác minh.
 */
@Service
public class FacebookTokenVerifier implements SocialTokenVerifier {

    private static final String GRAPH = "https://graph.facebook.com/v19.0";

    private final AuthProperties properties;
    private final RestClient http;

    public FacebookTokenVerifier(AuthProperties properties) {
        this.properties = properties;
        this.http = RestClient.create(GRAPH);
    }

    @Override
    public AuthProvider provider() {
        return AuthProvider.FACEBOOK;
    }

    @Override
    @SuppressWarnings("unchecked")
    public SocialProfile verify(String token) {
        String appId = properties.getFacebookAppId();
        String secret = properties.getFacebookAppSecret();
        if (appId == null || appId.isBlank() || secret == null || secret.isBlank()) {
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "PROVIDER_NOT_CONFIGURED",
                    "Facebook sign-in is not configured");
        }
        if (token == null || token.isBlank()) {
            throw SocialErrors.invalidToken();
        }
        try {
            Map<String, Object> debug = http.get()
                    .uri(uri -> uri.path("/debug_token")
                            .queryParam("input_token", token)
                            .queryParam("access_token", appId + "|" + secret)
                            .build())
                    .retrieve()
                    .body(Map.class);
            Map<String, Object> data = debug == null
                    ? Map.of()
                    : (Map<String, Object>) debug.getOrDefault("data", Map.of());
            boolean valid = Boolean.TRUE.equals(data.get("is_valid"))
                    && appId.equals(String.valueOf(data.get("app_id")));
            if (!valid) {
                throw SocialErrors.invalidToken();
            }
            Map<String, Object> me = http.get()
                    .uri(uri -> uri.path("/me")
                            .queryParam("fields", "id,name,email")
                            .queryParam("access_token", token)
                            .build())
                    .retrieve()
                    .body(Map.class);
            if (me == null || me.get("id") == null
                    || !String.valueOf(me.get("id")).equals(String.valueOf(data.get("user_id")))) {
                throw SocialErrors.invalidToken();
            }
            Object rawEmail = me.get("email");
            String email = rawEmail == null ? null : rawEmail.toString().toLowerCase();
            return new SocialProfile(AuthProvider.FACEBOOK, me.get("id").toString(), email,
                    email != null, me.get("name") == null ? null : me.get("name").toString());
        } catch (RestClientException exception) {
            throw SocialErrors.invalidToken();
        }
    }
}
