package com.linguacity.backend.identity.controller;

import com.linguacity.backend.auth.security.CurrentUser;
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

    public UserProfileController(
            UserOnboardingService userOnboardingService, TutorialService tutorialService) {
        this.userOnboardingService = userOnboardingService;
        this.tutorialService = tutorialService;
    }

    /**
     * Lấy (hoặc tạo, với app bản cũ) hồ sơ của người gọi. Từ VS6 app gửi Bearer token và hồ sơ đã
     * có sẵn; header {@code X-Guest-UUID} chỉ còn cho app bản cũ khi cờ legacy bật (ADR-016).
     */
    @PostMapping("/onboard")
    public ResponseEntity<OnboardUserResponse> onboardUser(
            @CurrentUser UUID userId
    ) {
        UserProfile userProfile =
                userOnboardingService.onboardUser(userId);

        OnboardUserResponse response = new OnboardUserResponse(
                userProfile.getId(),
                userProfile.getKnowledgePoints(),
                userProfile.getHourglassCount(),
                userProfile.getBlueprintShards(),
                userProfile.isTutorialCompleted(),
                userProfile.getTutorialStep()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/me/tutorial/complete")
    public ResponseEntity<CompleteTutorialResponse> completeTutorial(
            @CurrentUser UUID guestUuid
    ) {
        UserProfile userProfile = tutorialService.completeTutorial(guestUuid);

        CompleteTutorialResponse response =
                new CompleteTutorialResponse(userProfile.isTutorialCompleted());

        return ResponseEntity.ok(response);
    }
}
