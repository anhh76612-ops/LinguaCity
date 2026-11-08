package com.linguacity.backend.identity;

import com.linguacity.backend.common.exception.ApiExceptionHandler;
import com.linguacity.backend.achievement.service.AchievementService;
import com.linguacity.backend.identity.controller.UserProfileController;
import com.linguacity.backend.identity.entity.TutorialStep;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * TC-VS1-09 → TC-VS1-12 (docs/06-testing/test-plan.md).
 */
class TutorialTests {

    private static final String COMPLETE_TUTORIAL = "/api/v1/users/me/tutorial/complete";

    private final UserProfileRepository repository = mock(UserProfileRepository.class);
    private final TutorialService service = new TutorialService(repository, mock(AchievementService.class), Clock.systemUTC());
    private final MockMvc api = MockMvcBuilders
            .standaloneSetup(new UserProfileController(new UserOnboardingService(repository), service))
            .setControllerAdvice(new ApiExceptionHandler())
            .build();

    // TC-VS1-09
    @Test
    void completesTutorialForExistingGuest() {
        UserProfile existing = guest(false);
        when(repository.findById(existing.getId())).thenReturn(Optional.of(existing));
        when(repository.save(any(UserProfile.class))).thenAnswer(call -> call.getArgument(0));

        UserProfile result = service.completeTutorial(existing.getId());

        assertTrue(result.isTutorialCompleted());
        verify(repository).save(existing);
    }

    // TC-VS1-11: gọi lại nhiều lần vẫn đúng và không ghi DB thừa (BR-USER-06)
    @Test
    void completingTwiceIsIdempotentAndDoesNotSaveAgain() {
        UserProfile existing = guest(true);
        when(repository.findById(existing.getId())).thenReturn(Optional.of(existing));

        UserProfile result = service.completeTutorial(existing.getId());

        assertTrue(result.isTutorialCompleted());
        verify(repository, never()).save(any());
    }

    // TC-VS1-10 (tầng Service)
    @Test
    void unknownGuestIsReportedAsNotFound() {
        UUID unknown = UUID.randomUUID();
        when(repository.findById(unknown)).thenReturn(Optional.empty());

        assertThrows(UserProfileNotFoundException.class, () -> service.completeTutorial(unknown));
        verify(repository, never()).save(any());
    }

    @Test
    void completeEndpointReturnsTutorialCompleted() throws Exception {
        UserProfile existing = guest(false);
        when(repository.findById(existing.getId())).thenReturn(Optional.of(existing));
        when(repository.save(any(UserProfile.class))).thenAnswer(call -> call.getArgument(0));

        api.perform(post(COMPLETE_TUTORIAL).header("X-Guest-UUID", existing.getId().toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tutorialCompleted").value(true));
    }

    // TC-VS1-10 (tầng API): 404 kèm body ErrorResponse
    @Test
    void completeEndpointReturns404WithErrorBodyForUnknownGuest() throws Exception {
        UUID unknown = UUID.randomUUID();
        when(repository.findById(unknown)).thenReturn(Optional.empty());

        api.perform(post(COMPLETE_TUTORIAL).header("X-Guest-UUID", unknown.toString()))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("User profile not found"));
    }

    // TC-VS1-12: lỗi 400 cũng trả cùng định dạng ErrorResponse
    @Test
    void missingGuestHeaderReturns400WithErrorBody() throws Exception {
        api.perform(post(COMPLETE_TUTORIAL))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Missing header X-Guest-UUID"));
        verifyNoInteractions(repository);
    }

    // TC-VS1-12
    @Test
    void malformedGuestUuidReturns400WithErrorBody() throws Exception {
        api.perform(post(COMPLETE_TUTORIAL).header("X-Guest-UUID", "not-a-uuid"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Invalid X-Guest-UUID"));
        verifyNoInteractions(repository);
    }

    /** Hồ sơ đã tới bước cuối TOUR (chưa xong) hoặc đã DONE (BR-TUT-05). */
    private UserProfile guest(boolean tutorialCompleted) {
        UserProfile profile = new UserProfile();
        profile.setId(UUID.randomUUID());
        profile.setTutorialCompleted(tutorialCompleted);
        profile.setTutorialStep(tutorialCompleted ? TutorialStep.DONE : TutorialStep.TOUR);
        return profile;
    }

    // TC-TUT-07: chưa tới bước TOUR thì không được hoàn thành tutorial
    @Test
    void completingBeforeTheTourStepIsRejected() throws Exception {
        UserProfile early = guest(false);
        early.setTutorialStep(TutorialStep.BUILD_HOUSE);
        when(repository.findById(early.getId())).thenReturn(Optional.of(early));

        api.perform(post(COMPLETE_TUTORIAL).header("X-Guest-UUID", early.getId().toString()))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("INVALID_STEP"))
                .andExpect(jsonPath("$.details.current").value("BUILD_HOUSE"));
        verify(repository, never()).save(any());
    }
}
