package com.linguacity.backend.identity.service;

import com.linguacity.backend.achievement.service.AchievementService;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.identity.entity.TutorialStep;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;
import com.linguacity.backend.identity.repository.UserProfileRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.util.Map;
import java.util.UUID;

@Service
public class TutorialService {

    /** BR-TUT-02: những bước app được tự chuyển. Các bước còn lại do server chuyển khi đạt điều kiện. */
    static final Map<TutorialStep, TutorialStep> CLIENT_TRANSITIONS = Map.of(
            TutorialStep.INTRO, TutorialStep.PLACEMENT,
            TutorialStep.ENTER_HOUSE, TutorialStep.CUSTOMIZE,
            TutorialStep.CUSTOMIZE, TutorialStep.TOUR
    );

    private final UserProfileRepository userProfileRepository;
    private final AchievementService achievements;
    private final Clock clock;

    public TutorialService(UserProfileRepository userProfileRepository, AchievementService achievements, Clock clock) {
        this.userProfileRepository = userProfileRepository;
        this.achievements = achievements;
        this.clock = clock;
    }

    /**
     * BR-USER-06: hoàn thành tutorial là thao tác idempotent —
     * gọi nhiều lần vẫn trả về true và chỉ ghi DB ở lần đầu.
     * <p>
     * ⚠️ Tạm thời (M4→M6) chưa bắt buộc bước TOUR (BR-TUT-05) vì app vẫn dùng tutorial 3 trang cũ;
     * bật kiểm tra này ở M6 cùng lúc với tutorial thư ký.
     */
    @Transactional
    public UserProfile completeTutorial(UUID userId) {
        UserProfile userProfile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new UserProfileNotFoundException());

        if (userProfile.isTutorialCompleted()) {
            return userProfile;
        }

        userProfile.setTutorialCompleted(true);
        userProfile.setTutorialStep(TutorialStep.DONE);
        UserProfile saved = userProfileRepository.save(userProfile);
        achievements.grant(userId, AchievementService.NEW_RESIDENT, Times.nowUtc(clock));
        return saved;
    }

    /** PUT /users/me/tutorial/step — chỉ cho các bước trong {@link #CLIENT_TRANSITIONS}; gọi lại cùng bước thì bỏ qua. */
    @Transactional
    public UserProfile advanceByClient(UUID userId, TutorialStep to) {
        UserProfile profile = userProfileRepository.findById(userId)
                .orElseThrow(UserProfileNotFoundException::new);
        TutorialStep from = profile.getTutorialStep();
        if (from == to) {
            return profile;
        }
        if (CLIENT_TRANSITIONS.get(from) != to) {
            throw new ApiException(HttpStatus.CONFLICT, "INVALID_STEP",
                    "Cannot move tutorial from " + from + " to " + to, Map.of("current", from.name()));
        }
        profile.setTutorialStep(to);
        return userProfileRepository.save(profile);
    }
}
