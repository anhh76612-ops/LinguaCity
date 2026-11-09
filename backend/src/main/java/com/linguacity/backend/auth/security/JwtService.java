package com.linguacity.backend.auth.security;

import com.linguacity.backend.auth.config.AuthProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

/**
 * Ký và kiểm tra access token (JWT HS256, ADR-016). Claim: {@code sub} = id hồ sơ, {@code typ} =
 * GUEST/ACCOUNT, {@code ev} = email đã xác minh.
 */
@Service
public class JwtService {

    private static final Logger LOG = LoggerFactory.getLogger(JwtService.class);
    private static final String ISSUER = "linguacity";

    private final SecretKey key;
    private final Duration ttl;
    private final Clock clock;

    public JwtService(AuthProperties properties, Clock clock) {
        this.key = buildKey(properties.getJwtSecret());
        this.ttl = Duration.ofMinutes(properties.getAccessTtlMinutes());
        this.clock = clock;
    }

    public String issue(UUID userId, AuthUser.Type type, boolean emailVerified) {
        Instant now = clock.instant();
        return Jwts.builder()
                .issuer(ISSUER)
                .subject(userId.toString())
                .claim("typ", type.name())
                .claim("ev", emailVerified)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(ttl)))
                .signWith(key)
                .compact();
    }

    public long ttlSeconds() {
        return ttl.toSeconds();
    }

    /** Token hợp lệ thì trả người dùng; sai chữ ký, hết hạn hay hỏng thì trả rỗng. */
    public Optional<AuthUser> parse(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .requireIssuer(ISSUER)
                    .clock(() -> Date.from(clock.instant()))
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            AuthUser.Type type = AuthUser.Type.valueOf(claims.get("typ", String.class));
            if (type == AuthUser.Type.LEGACY) {
                return Optional.empty();
            }
            return Optional.of(new AuthUser(UUID.fromString(claims.getSubject()), type));
        } catch (JwtException | IllegalArgumentException | NullPointerException exception) {
            return Optional.empty();
        }
    }

    private static SecretKey buildKey(String secret) {
        if (secret == null || secret.isBlank()) {
            LOG.warn("linguacity.auth.jwt-secret is empty: using a random key, "
                    + "tokens become invalid after restart (dev only)");
            byte[] random = new byte[32];
            new SecureRandom().nextBytes(random);
            return Keys.hmacShaKeyFor(random);
        }
        byte[] bytes = secret.getBytes(StandardCharsets.UTF_8);
        if (bytes.length < 32) {
            throw new IllegalStateException("linguacity.auth.jwt-secret must be at least 32 bytes");
        }
        return Keys.hmacShaKeyFor(bytes);
    }
}
