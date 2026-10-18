package com.linguacity.backend.identity.dto;

import java.util.UUID;

public record OnboardUserResponse(
        UUID userId,
        Integer knowledgePoints,
        Integer hourglassCount,
        Integer blueprintShards
) {
}
