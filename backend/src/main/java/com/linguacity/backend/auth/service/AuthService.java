package com.linguacity.backend.auth.service;

import com.linguacity.backend.auth.dto.AuthDtos.DeleteAccountRequest;
import com.linguacity.backend.auth.dto.AuthDtos.LinkIdentityRequest;
import com.linguacity.backend.auth.dto.AuthDtos.MeResponse;
import com.linguacity.backend.auth.dto.AuthDtos.RegisterRequest;
import com.linguacity.backend.auth.dto.AuthDtos.TokenResponse;
import com.linguacity.backend.auth.entity.AuthIdentity;
import com.linguacity.backend.auth.entity.AuthProvider;
import com.linguacity.backend.auth.entity.OtpPurpose;
import com.linguacity.backend.auth.entity.UserAccount;
import com.linguacity.backend.auth.repository.AuthIdentityRepository;
import com.linguacity.backend.auth.repository.UserAccountRepository;
import com.linguacity.backend.auth.security.AuthUser;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.identity.service.UserOnboardingService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

/**
 * Đăng ký, đăng nhập, gắn tài khoản cho khách (ADR-016). Tiến trình luôn nằm ở
 * {@code user_profiles}: gắn tài khoản chỉ thêm dòng {@code user_accounts} trỏ vào hồ sơ khách.
 */
@Service
public class AuthService {

    private final UserProfileRepository profiles;
    private final UserOnboardingService onboarding;
    private final UserAccountRepository accounts;
    private final AuthIdentityRepository identities;
    private final TokenService tokens;
    private final OtpService otp;
    private final LoginRateLimiter limiter;
    private final PasswordEncoder encoder;
    private final List<SocialTokenVerifier> verifiers;
    private final Clock clock;
    /** So mật khẩu với hash giả khi email không tồn tại, để thời gian phản hồi như nhau. */
    private final String dummyHash;

    public AuthService(
            UserProfileRepository profiles,
            UserOnboardingService onboarding,
            UserAccountRepository accounts,
            AuthIdentityRepository identities,
            TokenService tokens,
            OtpService otp,
            LoginRateLimiter limiter,
            PasswordEncoder encoder,
            List<SocialTokenVerifier> verifiers,
            Clock clock) {
        this.profiles = profiles;
        this.onboarding = onboarding;
        this.accounts = accounts;
        this.identities = identities;
        this.tokens = tokens;
        this.otp = otp;
        this.limiter = limiter;
        this.encoder = encoder;
        this.verifiers = verifiers;
        this.clock = clock;
        this.dummyHash = encoder.encode("dummy-password-1");
    }

    // ---------- Khách ----------

    /** Nút "Chơi ngay": tạo hồ sơ khách mới do server sinh id. */
    @Transactional
    public TokenResponse guest(String deviceName) {
        return tokens.issue(newGuestProfile(), deviceName);
    }

    /** Khách của app bản trước VS6 đổi Guest UUID lấy token, đúng một lần. */
    @Transactional
    public TokenResponse claim(UUID guestUuid, String deviceName) {
        if (guestUuid == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_BODY", "guestUuid is required");
        }
        UserProfile profile = profiles.findById(guestUuid)
                .orElseThrow(() -> ApiException.notFound("USER_NOT_FOUND", "Guest not found"));
        if (profile.getClaimedAt() != null || accounts.existsById(guestUuid)) {
            throw ApiException.conflict("GUEST_ALREADY_CLAIMED", "This guest was already claimed");
        }
        profile.setClaimedAt(Times.nowUtc(clock));
        profiles.save(profile);
        return tokens.issue(guestUuid, deviceName);
    }

    // ---------- Email + mật khẩu ----------

    /** Đăng ký; có token khách thì gắn vào hồ sơ khách đó, không thì tạo hồ sơ mới. */
    @Transactional
    public TokenResponse register(AuthUser current, RegisterRequest request) {
        String email = Credentials.normalizeEmail(request.email());
        Credentials.requireStrongPassword(request.password());
        if (accounts.findByEmailAndDeletedAtIsNull(email).isPresent()) {
            throw ApiException.conflict("EMAIL_TAKEN", "Email is already registered");
        }
        UUID profileId = guestProfileOrNew(current);
        UserAccount account = newAccount(profileId, email, false, request.displayName());
        account.setPasswordHash(encoder.encode(request.password()));
        accounts.save(account);
        addIdentity(profileId, AuthProvider.PASSWORD, profileId.toString(), email);
        otp.send(profileId, OtpPurpose.VERIFY_EMAIL, email);
        return tokens.issue(profileId, request.deviceName());
    }

    @Transactional(noRollbackFor = ApiException.class)
    public TokenResponse login(String rawEmail, String password, String ip, String deviceName) {
        String email = Credentials.normalizeEmail(rawEmail);
        limiter.check(email, ip);
        Optional<UserAccount> account = accounts.findByEmailAndDeletedAtIsNull(email);
        String hash = account.map(UserAccount::getPasswordHash).orElse(null);
        boolean matches = encoder.matches(
                password == null ? "" : password, hash == null ? dummyHash : hash);
        if (hash == null || !matches) {
            limiter.recordFailure(email, ip);
            throw new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS",
                    "Email or password is incorrect");
        }
        limiter.reset(email);
        UserAccount found = account.get();
        found.setLastLoginAt(Times.nowUtc(clock));
        accounts.save(found);
        return tokens.issue(found.getUserProfileId(), deviceName);
    }

    // ---------- Google / Facebook ----------

    @Transactional
    public TokenResponse social(
            AuthProvider provider,
            String token,
            AuthUser current,
            boolean confirmDiscardGuest,
            String deviceName) {
        SocialProfile social = verifier(provider).verify(token);

        Optional<AuthIdentity> existing =
                identities.findByProviderAndProviderSubject(provider, social.subject());
        if (existing.isPresent()) {
            UUID owner = existing.get().getUserProfileId();
            guardDiscardGuest(current, owner, confirmDiscardGuest);
            return loginAs(owner, deviceName);
        }

        if (social.email() != null) {
            Optional<UserAccount> byEmail = accounts.findByEmailAndDeletedAtIsNull(social.email());
            if (byEmail.isPresent()) {
                if (!social.emailVerified()) {
                    throw ApiException.conflict("EMAIL_BELONGS_TO_OTHER_ACCOUNT",
                            "Sign in with your existing method, then link this one in Settings");
                }
                UserAccount account = byEmail.get();
                guardDiscardGuest(current, account.getUserProfileId(), confirmDiscardGuest);
                addIdentity(account.getUserProfileId(), provider, social.subject(),
                        social.email());
                if (!account.isEmailVerified()) {
                    account.setEmailVerifiedAt(Times.nowUtc(clock));
                }
                return loginAs(account.getUserProfileId(), deviceName);
            }
        }

        UUID profileId = guestProfileOrNew(current);
        UserAccount account =
                newAccount(profileId, social.email(), social.emailVerified(), social.name());
        accounts.save(account);
        addIdentity(profileId, provider, social.subject(), social.email());
        return tokens.issue(profileId, deviceName);
    }

    // ---------- Tài khoản đã đăng nhập ----------

    @Transactional(readOnly = true)
    public MeResponse me(AuthUser current) {
        Optional<UserAccount> account =
                accounts.findByUserProfileIdAndDeletedAtIsNull(current.userId());
        if (account.isEmpty()) {
            return new MeResponse(current.userId(), AuthUser.Type.GUEST.name(), null, false, null,
                    List.of());
        }
        UserAccount found = account.get();
        List<String> providers = identities.findByUserProfileId(current.userId()).stream()
                .map(identity -> identity.getProvider().name())
                .sorted()
                .toList();
        return new MeResponse(current.userId(), AuthUser.Type.ACCOUNT.name(), found.getEmail(),
                found.isEmailVerified(), found.getDisplayName(), providers);
    }

    @Transactional
    public void sendVerifyEmail(AuthUser current) {
        UserAccount account = requireAccount(current);
        if (account.getEmail() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "NO_EMAIL", "Account has no email");
        }
        if (account.isEmailVerified()) {
            throw ApiException.conflict("EMAIL_ALREADY_VERIFIED", "Email is already verified");
        }
        otp.send(account.getUserProfileId(), OtpPurpose.VERIFY_EMAIL, account.getEmail());
    }

    @Transactional(noRollbackFor = ApiException.class)
    public MeResponse verifyEmail(AuthUser current, String code) {
        UserAccount account = requireAccount(current);
        if (!account.isEmailVerified()) {
            otp.verify(account.getUserProfileId(), OtpPurpose.VERIFY_EMAIL, code);
            account.setEmailVerifiedAt(Times.nowUtc(clock));
            accounts.save(account);
        }
        return me(current);
    }

    /** Luôn trả thành công để không lộ email nào đã đăng ký. */
    @Transactional(noRollbackFor = ApiException.class)
    public void forgotPassword(String rawEmail) {
        String email = Credentials.normalizeEmail(rawEmail);
        Optional<UserAccount> account = accounts.findByEmailAndDeletedAtIsNull(email)
                .filter(UserAccount::isEmailVerified);
        if (account.isEmpty()) {
            return;
        }
        try {
            otp.send(account.get().getUserProfileId(), OtpPurpose.RESET_PASSWORD, email);
        } catch (ApiException tooSoon) {
            // Không báo "gửi quá nhanh" để không lộ email tồn tại
        }
    }

    /** Đặt lại mật khẩu bằng OTP rồi đăng xuất mọi máy. */
    @Transactional(noRollbackFor = ApiException.class)
    public void resetPassword(String rawEmail, String code, String newPassword) {
        String email = Credentials.normalizeEmail(rawEmail);
        Credentials.requireStrongPassword(newPassword);
        UserAccount account = accounts.findByEmailAndDeletedAtIsNull(email)
                .filter(UserAccount::isEmailVerified)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.BAD_REQUEST, "OTP_INVALID", "Code is invalid"));
        UUID userId = account.getUserProfileId();
        otp.verify(userId, OtpPurpose.RESET_PASSWORD, code);
        account.setPasswordHash(encoder.encode(newPassword));
        accounts.save(account);
        if (identities.findByUserProfileIdAndProvider(userId, AuthProvider.PASSWORD).isEmpty()) {
            addIdentity(userId, AuthProvider.PASSWORD, userId.toString(), email);
        }
        tokens.revokeAll(userId);
        limiter.reset(email);
    }

    /** Gắn thêm Google/Facebook, hoặc đặt email + mật khẩu cho tài khoản chỉ có mạng xã hội. */
    @Transactional
    public MeResponse linkIdentity(
            AuthUser current, AuthProvider provider, LinkIdentityRequest request) {
        UserAccount account = requireAccount(current);
        UUID userId = account.getUserProfileId();
        if (identities.findByUserProfileIdAndProvider(userId, provider).isPresent()) {
            throw ApiException.conflict("IDENTITY_ALREADY_LINKED", "This method is already linked");
        }

        if (provider == AuthProvider.PASSWORD) {
            Credentials.requireStrongPassword(request.password());
            if (account.getEmail() == null) {
                String email = Credentials.normalizeEmail(request.email());
                if (accounts.findByEmailAndDeletedAtIsNull(email).isPresent()) {
                    throw ApiException.conflict("EMAIL_TAKEN", "Email is already registered");
                }
                account.setEmail(email);
            }
            account.setPasswordHash(encoder.encode(request.password()));
            accounts.save(account);
            addIdentity(userId, AuthProvider.PASSWORD, userId.toString(), account.getEmail());
            if (!account.isEmailVerified()) {
                otp.send(userId, OtpPurpose.VERIFY_EMAIL, account.getEmail());
            }
            return me(current);
        }

        SocialProfile social = verifier(provider).verify(request.token());
        identities.findByProviderAndProviderSubject(provider, social.subject()).ifPresent(other -> {
            throw ApiException.conflict("IDENTITY_LINKED_ELSEWHERE",
                    "This account is already linked to another player");
        });
        addIdentity(userId, provider, social.subject(), social.email());
        if (account.getEmail() == null && social.email() != null && social.emailVerified()
                && accounts.findByEmailAndDeletedAtIsNull(social.email()).isEmpty()) {
            account.setEmail(social.email());
            account.setEmailVerifiedAt(Times.nowUtc(clock));
            accounts.save(account);
        }
        return me(current);
    }

    /**
     * Xoá tài khoản (Google Play yêu cầu). Cần xác thực lại. Hồ sơ chơi được giữ ở dạng ẩn danh,
     * không còn cách đăng nhập nào trỏ tới.
     */
    @Transactional
    public void deleteAccount(AuthUser current, DeleteAccountRequest request) {
        UserAccount account = requireAccount(current);
        UUID userId = account.getUserProfileId();
        reauthenticate(account, request);

        identities.deleteByUserProfileId(userId);
        account.setDeletedAt(Times.nowUtc(clock));
        account.setEmail(null);
        account.setPasswordHash(null);
        account.setDisplayName(null);
        accounts.save(account);
        tokens.revokeAll(userId);
    }

    // ---------- Nội bộ ----------

    private void reauthenticate(UserAccount account, DeleteAccountRequest request) {
        if (request == null) {
            throw reauthRequired();
        }
        if (request.password() != null) {
            String hash = account.getPasswordHash();
            if (hash == null || !encoder.matches(request.password(), hash)) {
                throw new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS",
                        "Password is incorrect");
            }
            return;
        }
        if (request.provider() != null && request.providerToken() != null) {
            AuthProvider provider = parseSocial(request.provider());
            SocialProfile social = verifier(provider).verify(request.providerToken());
            boolean mine = identities
                    .findByProviderAndProviderSubject(provider, social.subject())
                    .map(identity -> identity.getUserProfileId().equals(account.getUserProfileId()))
                    .orElse(false);
            if (!mine) {
                throw SocialErrors.invalidToken();
            }
            return;
        }
        throw reauthRequired();
    }

    /**
     * Đăng nhập vào tài khoản có sẵn trên máy đang có khách chưa gắn: phải được người dùng
     * đồng ý.
     */
    private void guardDiscardGuest(AuthUser current, UUID owner, boolean confirmed) {
        boolean unlinkedGuest = current != null
                && current.isGuest()
                && !current.userId().equals(owner)
                && accounts.findByUserProfileIdAndDeletedAtIsNull(current.userId()).isEmpty();
        if (unlinkedGuest && !confirmed) {
            throw new ApiException(HttpStatus.CONFLICT, "IDENTITY_LINKED_ELSEWHERE",
                    "This sign-in belongs to another account; the guest progress on this device "
                            + "would be left behind",
                    Map.of("canDiscardGuest", true));
        }
    }

    private TokenResponse loginAs(UUID userId, String deviceName) {
        accounts.findByUserProfileIdAndDeletedAtIsNull(userId).ifPresent(account -> {
            account.setLastLoginAt(Times.nowUtc(clock));
            accounts.save(account);
        });
        return tokens.issue(userId, deviceName);
    }

    /** Hồ sơ khách hiện tại nếu chưa gắn tài khoản; ngược lại tạo hồ sơ mới. */
    private UUID guestProfileOrNew(AuthUser current) {
        if (current != null && current.isGuest()
                && profiles.existsById(current.userId())
                && !accounts.existsById(current.userId())) {
            return current.userId();
        }
        return newGuestProfile();
    }

    private UUID newGuestProfile() {
        UserProfile profile = onboarding.onboardUser(UUID.randomUUID());
        profile.setClaimedAt(Times.nowUtc(clock));
        profiles.save(profile);
        return profile.getId();
    }

    private UserAccount newAccount(
            UUID profileId, String email, boolean emailVerified, String displayName) {
        UserAccount account = new UserAccount();
        account.setUserProfileId(profileId);
        account.setEmail(email);
        account.setEmailVerifiedAt(emailVerified ? Times.nowUtc(clock) : null);
        account.setDisplayName(trimName(displayName));
        account.setCreatedAt(Times.nowUtc(clock));
        account.setLastLoginAt(Times.nowUtc(clock));
        return account;
    }

    private void addIdentity(UUID userId, AuthProvider provider, String subject, String email) {
        AuthIdentity identity = new AuthIdentity();
        identity.setUserProfileId(userId);
        identity.setProvider(provider);
        identity.setProviderSubject(subject);
        identity.setEmailAtLink(email);
        identity.setCreatedAt(Times.nowUtc(clock));
        identities.save(identity);
    }

    private UserAccount requireAccount(AuthUser current) {
        return Optional.ofNullable(current)
                .flatMap(user -> accounts.findByUserProfileIdAndDeletedAtIsNull(user.userId()))
                .orElseThrow(() -> new ApiException(HttpStatus.FORBIDDEN, "ACCOUNT_REQUIRED",
                        "Sign in with an account first"));
    }

    private SocialTokenVerifier verifier(AuthProvider provider) {
        return verifiers.stream()
                .filter(verifier -> verifier.provider() == provider)
                .findFirst()
                .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PROVIDER",
                        "Unsupported provider " + provider));
    }

    public static AuthProvider parseSocial(String raw) {
        try {
            AuthProvider provider = AuthProvider.valueOf(raw.trim().toUpperCase());
            if (provider == AuthProvider.PASSWORD) {
                throw new IllegalArgumentException();
            }
            return provider;
        } catch (RuntimeException exception) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PROVIDER",
                    "Provider must be GOOGLE or FACEBOOK");
        }
    }

    private static String trimName(String name) {
        if (name == null || name.isBlank()) {
            return null;
        }
        String trimmed = name.trim();
        return trimmed.length() > 50 ? trimmed.substring(0, 50) : trimmed;
    }

    private static ApiException reauthRequired() {
        return new ApiException(HttpStatus.BAD_REQUEST, "REAUTH_REQUIRED",
                "Confirm with your password or sign in again with your provider");
    }
}
