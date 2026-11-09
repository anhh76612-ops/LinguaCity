package com.linguacity.backend.identity;

import com.linguacity.backend.achievement.service.AchievementService;
import com.linguacity.backend.identity.controller.UserProfileController;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.identity.service.TutorialService;
import com.linguacity.backend.identity.service.UserOnboardingService;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.Clock;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import com.linguacity.backend.auth.config.AuthProperties;
import com.linguacity.backend.auth.security.CurrentUserArgumentResolver;
import com.linguacity.backend.auth.security.LegacyGuestResolver;
import com.linguacity.backend.common.exception.ApiExceptionHandler;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserOnboardingTests {

    private final UserProfileRepository repository = mock(UserProfileRepository.class);
    private final UserOnboardingService service = new UserOnboardingService(repository);
    private final MockMvc api = MockMvcBuilders
            .standaloneSetup(new UserProfileController(
                    service,
                    new TutorialService(
                            repository,
                            mock(AchievementService.class),
                            Clock.systemUTC())))
            .setControllerAdvice(new ApiExceptionHandler())
            .setCustomArgumentResolvers(new CurrentUserArgumentResolver(
                    new LegacyGuestResolver(repository, new AuthProperties())))
            .build();

    @Test
    void createsNewGuestWithZeroResources() {
        UUID id = UUID.randomUUID();
        when(repository.findById(id)).thenReturn(Optional.empty());
        when(repository.save(any(UserProfile.class))).thenAnswer(call -> call.getArgument(0));

        UserProfile result = service.onboardUser(id);

        assertEquals(id, result.getId());
        assertEquals(0, result.getKnowledgePoints());
        assertEquals(0, result.getHourglassCount());
        assertEquals(0, result.getBlueprintShards());
        assertFalse(result.isTutorialCompleted());
        verify(repository).save(result);
    }

    @Test
    void existingGuestKeepsResourcesAndIsNotSavedAgain() {
        UserProfile existing = new UserProfile();
        existing.setId(UUID.randomUUID());
        existing.setKnowledgePoints(42);
        existing.setHourglassCount(3);
        existing.setBlueprintShards(7);
        when(repository.findById(existing.getId())).thenReturn(Optional.of(existing));

        UserProfile result = service.onboardUser(existing.getId());

        assertSame(existing, result);
        assertEquals(42, result.getKnowledgePoints());
        assertEquals(3, result.getHourglassCount());
        assertEquals(7, result.getBlueprintShards());
        verify(repository, never()).save(any());
    }

    @Test
    void onboardEndpointPreservesResponseContract() throws Exception {
        UserProfile existing = new UserProfile();
        existing.setId(UUID.randomUUID());
        when(repository.findById(existing.getId())).thenReturn(Optional.of(existing));

        api.perform(post("/api/v1/users/onboard")
                        .header("X-Guest-UUID", existing.getId().toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(existing.getId().toString()))
                .andExpect(jsonPath("$.knowledgePoints").value(0))
                .andExpect(jsonPath("$.hourglassCount").value(0))
                .andExpect(jsonPath("$.blueprintShards").value(0))
                .andExpect(jsonPath("$.tutorialCompleted").value(false));
    }

    @Test
    void missingGuestHeaderIsRejected() throws Exception {
        // Đổi ở VS6 (ADR-016): không có danh tính → 401
        api.perform(post("/api/v1/users/onboard")).andExpect(status().isUnauthorized());
        verifyNoInteractions(repository);
    }

    @Test
    void malformedGuestUuidIsRejected() throws Exception {
        api.perform(post("/api/v1/users/onboard").header("X-Guest-UUID", "not-a-uuid"))
                .andExpect(status().isUnauthorized());
        verifyNoInteractions(repository);
    }
}
