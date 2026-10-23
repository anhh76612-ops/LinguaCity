package com.linguacity.backend.identity.service;

import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;
import com.linguacity.backend.identity.repository.UserProfileRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class TutorialService {

    private final UserProfileRepository userProfileRepository;

    public TutorialService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    /**
     * BR-USER-06: hoàn thành tutorial là thao tác idempotent —
     * gọi nhiều lần vẫn trả về true và chỉ ghi DB ở lần đầu.
     */
    @Transactional
    public UserProfile completeTutorial(UUID userId) {
        UserProfile userProfile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new UserProfileNotFoundException());

        if (userProfile.isTutorialCompleted()) {
            return userProfile;
        }

        userProfile.setTutorialCompleted(true);
        return userProfileRepository.save(userProfile);
    }
}
