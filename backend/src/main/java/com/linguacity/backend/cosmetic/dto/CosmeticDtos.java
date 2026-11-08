package com.linguacity.backend.cosmetic.dto;

import java.util.List;

public final class CosmeticDtos {

    private CosmeticDtos() {
    }

    /** Một món trong danh mục (gói CORE). */
    public record CosmeticItemDto(String code, String category, String name, String unlockType,
            int priceKp,
                                  String achievementCode, String assetKey, int sortOrder) {}

    /** avatar_config — mỗi trường là MÃ cosmetic (không phải asset_key). */
    public record AvatarConfig(String skin, String hairStyle, String hairColor, String shirtColor,
                               String pantsColor, String accessory) {
        public static final AvatarConfig DEFAULT =
                new AvatarConfig(
                        "SKIN_2",
                        "HAIR_SHORT",
                        "HAIR_BROWN",
                        "SHIRT_TEAL",
                        "PANTS_NAVY",
                        "ACC_NONE");
    }

    /** house_style — mã cosmetic của tường và sàn. */
    public record HouseStyleConfig(String wall, String floor) {
        public static final HouseStyleConfig DEFAULT = new HouseStyleConfig(
                "WALL_CREAM", "FLOOR_OAK");
    }

    /** GET /users/me/cosmetics và kết quả các lệnh đổi / mở khoá. */
    public record CosmeticsDto(List<String> unlocked, AvatarConfig avatar,
            HouseStyleConfig houseStyle,
                               int knowledgePoints) {}
}
