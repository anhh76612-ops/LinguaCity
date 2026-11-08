package com.linguacity.backend.auth;

import com.jayway.jsonpath.JsonPath;
import com.linguacity.backend.auth.entity.AuthProvider;
import com.linguacity.backend.auth.service.GoogleTokenVerifier;
import com.linguacity.backend.auth.service.MailGateway;
import com.linguacity.backend.auth.service.SocialProfile;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * TC-VS6 (ADR-016): token khách, xoay vòng refresh, bắt buộc tài khoản sau tutorial, gắn tài
 * khoản, OTP, chống dò mật khẩu, header cũ, đăng nhập Google. Chạy đủ filter chain của Spring
 * Security.
 */
@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:linguacity_auth;DB_CLOSE_DELAY=-1",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect",
        "spring.jpa.show-sql=false",
        "linguacity.auth.jwt-secret=test-secret-test-secret-test-secret-123",
        "linguacity.auth.otp-resend-seconds=0"
})
class AuthFlowTests {

    private static final Pattern OTP = Pattern.compile("(\\d{6})");

    @Autowired private WebApplicationContext context;
    @Autowired private UserProfileRepository profiles;
    @MockitoBean private MailGateway mail;
    @MockitoBean private GoogleTokenVerifier google;

    private MockMvc api;

    @BeforeEach
    void setUp() {
        api = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
        when(google.provider()).thenReturn(AuthProvider.GOOGLE);
    }

    @Test
    void protectedApiNeedsAToken() throws Exception {
        api.perform(get("/api/v1/auth/me"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("UNAUTHENTICATED"));
        api.perform(get("/api/v1/auth/me").header("Authorization", "Bearer not-a-jwt"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void guestTokenWorksAndRefreshRotates() throws Exception {
        MvcResult guest = postOk("/api/v1/auth/guest", "{}");
        String access = read(guest, "$.accessToken");
        String refresh = read(guest, "$.refreshToken");

        api.perform(get("/api/v1/auth/me").header("Authorization", "Bearer " + access))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.type").value("GUEST"));

        MvcResult rotated =
                postOk("/api/v1/auth/refresh", "{\"refreshToken\":\"" + refresh + "\"}");
        String next = read(rotated, "$.refreshToken");
        assertNotEquals(refresh, next);

        // Gửi lại token cũ → bị coi là đánh cắp, cả họ bị thu hồi
        postStatus("/api/v1/auth/refresh", "{\"refreshToken\":\"" + refresh + "\"}", 401);
        postStatus("/api/v1/auth/refresh", "{\"refreshToken\":\"" + next + "\"}", 401);
    }

    @Test
    void guestMustLinkAfterTutorialAndKeepsProgress() throws Exception {
        MvcResult guest = postOk("/api/v1/auth/guest", "{}");
        String access = read(guest, "$.accessToken");
        UUID userId = UUID.fromString(read(guest, "$.userId"));

        var profile = profiles.findById(userId).orElseThrow();
        profile.setTutorialCompleted(true);
        profile.setKnowledgePoints(77);
        profiles.saveAndFlush(profile);

        api.perform(get("/api/v1/city").header("Authorization", "Bearer " + access))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.code").value("ACCOUNT_REQUIRED"));

        MvcResult account = api.perform(post("/api/v1/auth/register")
                        .header("Authorization", "Bearer " + access)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerBody("linked@example.com")))
                .andExpect(status().isOk())
                .andReturn();
        assertEquals(userId.toString(), read(account, "$.userId"));
        assertEquals("ACCOUNT", read(account, "$.type"));
        assertEquals(77, profiles.findById(userId).orElseThrow().getKnowledgePoints());

        int status = api.perform(get("/api/v1/city")
                        .header("Authorization", "Bearer " + read(account, "$.accessToken")))
                .andReturn().getResponse().getStatus();
        assertNotEquals(403, status);
        assertNotEquals(401, status);
    }

    @Test
    void registerVerifyEmailAndLogin() throws Exception {
        MvcResult account = postOk("/api/v1/auth/register", registerBody("Verify@Example.com"));
        String access = read(account, "$.accessToken");
        String code = lastOtp("verify@example.com");

        api.perform(post("/api/v1/auth/email/verify")
                        .header("Authorization", "Bearer " + access)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"code\":\"" + code + "\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.emailVerified").value(true))
                .andExpect(jsonPath("$.email").value("verify@example.com"));

        MvcResult login = postOk("/api/v1/auth/login",
                "{\"email\":\"verify@example.com\",\"password\":\"secret123\"}");
        assertEquals(read(account, "$.userId"), read(login, "$.userId"));
        assertEquals(Boolean.TRUE, JsonPath.read(body(login), "$.emailVerified"));

        postStatus("/api/v1/auth/register", registerBody("verify@example.com"), 409);
    }

    @Test
    void tooManyWrongPasswordsAreBlocked() throws Exception {
        postOk("/api/v1/auth/register", registerBody("brute@example.com"));
        String wrong = "{\"email\":\"brute@example.com\",\"password\":\"wrong1234\"}";
        for (int i = 0; i < 5; i++) {
            postStatus("/api/v1/auth/login", wrong, 401);
        }
        postStatus("/api/v1/auth/login",
                "{\"email\":\"brute@example.com\",\"password\":\"secret123\"}", 429);
    }

    @Test
    void resetPasswordLogsOutEveryDevice() throws Exception {
        MvcResult account = postOk("/api/v1/auth/register", registerBody("reset@example.com"));
        String access = read(account, "$.accessToken");
        String refresh = read(account, "$.refreshToken");
        api.perform(post("/api/v1/auth/email/verify")
                        .header("Authorization", "Bearer " + access)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"code\":\"" + lastOtp("reset@example.com") + "\"}"))
                .andExpect(status().isOk());

        postStatus("/api/v1/auth/password/forgot", "{\"email\":\"reset@example.com\"}", 204);
        postStatus("/api/v1/auth/password/forgot", "{\"email\":\"nobody@example.com\"}", 204);
        String code = lastOtp("reset@example.com");
        postStatus("/api/v1/auth/password/reset",
                "{\"email\":\"reset@example.com\",\"code\":\"000000x\",\"newPassword\":\"newpass99\"}",
                400);
        postStatus("/api/v1/auth/password/reset",
                "{\"email\":\"reset@example.com\",\"code\":\"" + code
                        + "\",\"newPassword\":\"newpass99\"}",
                204);

        postStatus("/api/v1/auth/refresh", "{\"refreshToken\":\"" + refresh + "\"}", 401);
        postOk("/api/v1/auth/login",
                "{\"email\":\"reset@example.com\",\"password\":\"newpass99\"}");
    }

    @Test
    void legacyHeaderStopsWorkingAfterClaim() throws Exception {
        UUID old = UUID.randomUUID();
        api.perform(post("/api/v1/users/onboard").header("X-Guest-UUID", old.toString()))
                .andExpect(status().isOk());
        api.perform(get("/api/v1/auth/me").header("X-Guest-UUID", old.toString()))
                .andExpect(status().isOk());

        postOk("/api/v1/auth/guest/claim", "{\"guestUuid\":\"" + old + "\"}");
        postStatus("/api/v1/auth/guest/claim", "{\"guestUuid\":\"" + old + "\"}", 409);
        api.perform(get("/api/v1/auth/me").header("X-Guest-UUID", old.toString()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void googleSignInOnAnotherDeviceAsksBeforeLeavingTheGuest() throws Exception {
        when(google.verify("google-token")).thenReturn(new SocialProfile(
                AuthProvider.GOOGLE, "google-sub-1", "g@example.com", true, "G User"));

        MvcResult first = postOk("/api/v1/auth/google", "{\"token\":\"google-token\"}");
        String owner = read(first, "$.userId");
        assertEquals("ACCOUNT", read(first, "$.type"));

        String otherGuest = read(postOk("/api/v1/auth/guest", "{}"), "$.accessToken");
        api.perform(post("/api/v1/auth/google")
                        .header("Authorization", "Bearer " + otherGuest)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"token\":\"google-token\"}"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("IDENTITY_LINKED_ELSEWHERE"));

        MvcResult confirmed = api.perform(post("/api/v1/auth/google")
                        .header("Authorization", "Bearer " + otherGuest)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"token\":\"google-token\",\"confirmDiscardGuest\":true}"))
                .andExpect(status().isOk())
                .andReturn();
        assertEquals(owner, read(confirmed, "$.userId"));
    }

    // ---------- tiện ích ----------

    private static String registerBody(String email) {
        return "{\"email\":\"" + email + "\",\"password\":\"secret123\",\"displayName\":\"An\"}";
    }

    private MvcResult postOk(String path, String json) throws Exception {
        return api.perform(post(path).contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk())
                .andReturn();
    }

    private void postStatus(String path, String json, int expected) throws Exception {
        api.perform(post(path).contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().is(expected));
    }

    private static String body(MvcResult result) throws Exception {
        return result.getResponse().getContentAsString();
    }

    private static String read(MvcResult result, String path) throws Exception {
        return JsonPath.read(body(result), path).toString();
    }

    private String lastOtp(String email) {
        ArgumentCaptor<String> text = ArgumentCaptor.forClass(String.class);
        verify(mail, atLeastOnce()).send(eq(email), anyString(), text.capture());
        Matcher matcher = OTP.matcher(text.getValue());
        assertTrue(matcher.find(), "mail phải chứa mã 6 số");
        return matcher.group(1);
    }
}
