package com.linguacity.backend.identity.dto;

import com.linguacity.backend.identity.entity.UserProfile;

/** Tài nguyên hiện tại của người chơi — trả kèm sau mỗi thao tác cộng/trừ để app cập nhật HUD. */
public record ResourcesDto(int knowledgePoints, int hourglassCount, int blueprintShards) {

    public static ResourcesDto of(UserProfile p) {
        return new ResourcesDto(p.getKnowledgePoints(), p.getHourglassCount(), p.getBlueprintShards());
    }
}
