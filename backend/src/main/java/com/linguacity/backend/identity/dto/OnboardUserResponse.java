package com.linguacity.backend.identity.dto;

import com.linguacity.backend.identity.entity.TutorialStep;

import java.util.UUID;

/** §7.2.1; v3.3 thêm {@code tutorialStep} (ADR-014) — app cũ bỏ qua trường lạ. */
public record OnboardUserResponse(
        UUID userId,
        Integer knowledgePoints,
        Integer hourglassCount,
        Integer blueprintShards,
        Boolean tutorialCompleted,
        TutorialStep tutorialStep
) {
}
