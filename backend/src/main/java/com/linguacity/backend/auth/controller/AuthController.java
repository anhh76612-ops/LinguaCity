package com.linguacity.backend.auth.controller;

import com.linguacity.backend.auth.dto.AuthDtos.ClaimRequest;
import com.linguacity.backend.auth.dto.AuthDtos.DeleteAccountRequest;
import com.linguacity.backend.auth.dto.AuthDtos.ForgotPasswordRequest;
import com.linguacity.backend.auth.dto.AuthDtos.GuestRequest;
import com.linguacity.backend.auth.dto.AuthDtos.LinkIdentityRequest;
import com.linguacity.backend.auth.dto.AuthDtos.LoginRequest;
import com.linguacity.backend.auth.dto.AuthDtos.LogoutRequest;
import com.linguacity.backend.auth.dto.AuthDtos.MeResponse;
import com.linguacity.backend.auth.dto.AuthDtos.RefreshRequest;
import com.linguacity.backend.auth.dto.AuthDtos.RegisterRequest;
import com.linguacity.backend.auth.dto.AuthDtos.ResetPasswordRequest;
import com.linguacity.backend.auth.dto.AuthDtos.SocialRequest;
import com.linguacity.backend.auth.dto.AuthDtos.TokenResponse;
import com.linguacity.backend.auth.dto.AuthDtos.VerifyEmailRequest;
import com.linguacity.backend.auth.entity.AuthProvider;
import com.linguacity.backend.auth.security.AuthUser;
import com.linguacity.backend.auth.security.CurrentUser;
import com.linguacity.backend.auth.service.AuthService;
import com.linguacity.backend.auth.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** UC_13–UC_19 (ADR-016). */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService auth;
    private final TokenService tokens;

    public AuthController(AuthService auth, TokenService tokens) {
        this.auth = auth;
        this.tokens = tokens;
    }

    @PostMapping("/guest")
    public TokenResponse guest(@RequestBody(required = false) GuestRequest request) {
        return auth.guest(request == null ? null : request.deviceName());
    }

    @PostMapping("/guest/claim")
    public TokenResponse claim(@RequestBody ClaimRequest request) {
        return auth.claim(request.guestUuid(), request.deviceName());
    }

    @PostMapping("/register")
    public TokenResponse register(
            @CurrentUser(required = false) AuthUser current,
            @RequestBody RegisterRequest request) {
        return auth.register(current, request);
    }

    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest request, HttpServletRequest http) {
        return auth.login(
                request.email(), request.password(), http.getRemoteAddr(), request.deviceName());
    }

    @PostMapping("/google")
    public TokenResponse google(
            @CurrentUser(required = false) AuthUser current,
            @RequestBody SocialRequest request) {
        return auth.social(AuthProvider.GOOGLE, request.token(), current,
                Boolean.TRUE.equals(request.confirmDiscardGuest()), request.deviceName());
    }

    @PostMapping("/facebook")
    public TokenResponse facebook(
            @CurrentUser(required = false) AuthUser current,
            @RequestBody SocialRequest request) {
        return auth.social(AuthProvider.FACEBOOK, request.token(), current,
                Boolean.TRUE.equals(request.confirmDiscardGuest()), request.deviceName());
    }

    @PostMapping("/refresh")
    public TokenResponse refresh(@RequestBody RefreshRequest request) {
        return tokens.refresh(request.refreshToken(), request.deviceName());
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody(required = false) LogoutRequest request) {
        if (request != null) {
            tokens.revoke(request.refreshToken());
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public MeResponse me(@CurrentUser AuthUser current) {
        return auth.me(current);
    }

    @PostMapping("/email/verify/send")
    public ResponseEntity<Void> sendVerifyEmail(@CurrentUser AuthUser current) {
        auth.sendVerifyEmail(current);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/email/verify")
    public MeResponse verifyEmail(
            @CurrentUser AuthUser current, @RequestBody VerifyEmailRequest request) {
        return auth.verifyEmail(current, request.code());
    }

    @PostMapping("/password/forgot")
    public ResponseEntity<Void> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        auth.forgotPassword(request.email());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/password/reset")
    public ResponseEntity<Void> resetPassword(@RequestBody ResetPasswordRequest request) {
        auth.resetPassword(request.email(), request.code(), request.newPassword());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/identities/{provider}")
    public MeResponse linkIdentity(
            @CurrentUser AuthUser current,
            @PathVariable String provider,
            @RequestBody LinkIdentityRequest request) {
        AuthProvider parsed = "PASSWORD".equalsIgnoreCase(provider)
                ? AuthProvider.PASSWORD
                : AuthService.parseSocial(provider);
        return auth.linkIdentity(current, parsed, request);
    }

    @DeleteMapping("/account")
    public ResponseEntity<Void> deleteAccount(
            @CurrentUser AuthUser current,
            @RequestBody(required = false) DeleteAccountRequest request) {
        auth.deleteAccount(current, request);
        return ResponseEntity.noContent().build();
    }
}
