package com.linguacity.backend.identity.controller;

import com.linguacity.backend.identity.dto.OnboardUserResponse;
import com.linguacity.backend.identity.dto.CompleteTutorialResponse;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.service.TutorialService;
import com.linguacity.backend.identity.service.UserOnboardingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
public class UserProfileController {

    private final UserOnboardingService userOnboardingService;
    private final TutorialService tutorialService;

    public UserProfileController(UserOnboardingService userOnboardingService, TutorialService tutorialService) {
        this.userOnboardingService = userOnboardingService;
        this.tutorialService = tutorialService;
    }

    @PostMapping("/onboard")
    public ResponseEntity<OnboardUserResponse> onboardUser(
            @RequestHeader("X-Guest-UUID") UUID guestUuid
    ) {
        UserProfile userProfile =
                userOnboardingService.onboardUser(guestUuid);

        OnboardUserResponse response = new OnboardUserResponse(
                userProfile.getId(),
                userProfile.getKnowledgePoints(),
                userProfile.getHourglassCount(),
                userProfile.getBlueprintShards(),
                userProfile.isTutorialCompleted()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/me/tutorial/complete")
    public ResponseEntity<CompleteTutorialResponse> completeTutorial(
            @RequestHeader("X-Guest-UUID") UUID guestUuid
    ) {
        UserProfile userProfile = tutorialService.completeTutorial(guestUuid);

        CompleteTutorialResponse response =
                new CompleteTutorialResponse(userProfile.isTutorialCompleted());

        return ResponseEntity.ok(response);
    }
}
