package com.linguacity.backend.identity.service;

import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserOnboardingService {

    private final UserProfileRepository userProfileRepository;

    public UserOnboardingService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    public UserProfile onboardUser(UUID guestUuid) {
        return userProfileRepository.findById(guestUuid)
                .orElseGet(() -> {
                    UserProfile userProfile = new UserProfile();

                    userProfile.setId(guestUuid);
                    userProfile.setKnowledgePoints(0);
                    userProfile.setHourglassCount(0);
                    userProfile.setBlueprintShards(0);

                    return userProfileRepository.save(userProfile);
                });
    }
}
