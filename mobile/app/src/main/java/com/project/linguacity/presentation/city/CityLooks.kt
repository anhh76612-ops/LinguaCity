package com.project.linguacity.presentation.city

/**
 * Ngoại hình nhân vật và kiểu nhà ĐỂ VẼ (hợp đồng B, M7). Giá trị là asset_key của `cosmetic_items`
 * (system-design §10.2.3): màu "#rrggbb", kiểu dáng là từ khoá city-web hiểu
 * (hairStyle: short|long|bun|spiky · accessory: none|hat|glasses · floor:
 * oak|walnut|tile|checker|carpet).
 * Lớp dịch mã cosmetic (HAIR_SHORT…) → asset_key nằm ở M8; bản đồ không biết mã cosmetic.
 */
data class AvatarLook(
    val skin: String,
    val hairStyle: String,
    val hairColor: String,
    val shirt: String,
    val pants: String,
    val accessory: String
) {
    companion object {
        /** Trùng DEFAULT_APPEARANCE trong city-web/src/bridge/cityState.ts. */
        val DEFAULT = AvatarLook(
            skin = "#f1c7a5", hairStyle = "short", hairColor = "#4a3426",
            shirt = "#4db6ac", pants = "#3949ab", accessory = "none"
        )
    }
}

data class HouseLook(val wall: String, val floor: String) {
    companion object {
        /** Trùng DEFAULT_HOUSE_STYLE trong cityState.ts. */
        val DEFAULT = HouseLook(wall = "#f3e7d3", floor = "oak")
    }
}
