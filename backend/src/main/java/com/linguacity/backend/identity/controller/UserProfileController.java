package com.linguacity.backend.identity.controller;

import com.linguacity.backend.identity.dto.OnboardUserResponse;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.service.UserOnboardingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
public class UserProfileController {

    private final UserOnboardingService userOnboardingService;

    public UserProfileController(UserOnboardingService userOnboardingService) {
        this.userOnboardingService = userOnboardingService;
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
                userProfile.getBlueprintShards()
        );

        return ResponseEntity.ok(response);
    }
}
