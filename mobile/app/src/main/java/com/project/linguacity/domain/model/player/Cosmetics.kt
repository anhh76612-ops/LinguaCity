package com.project.linguacity.domain.model.player

/** Một món tuỳ biến trong danh mục (gói CORE, system-design §10.2.3). */
data class CosmeticItem(
    val code: String,
    val category: CosmeticCategory,
    val name: String,
    val unlockType: String,          // FREE | KP | ACHIEVEMENT
    val priceKp: Int,
    val achievementCode: String?,
    /** Giá trị để vẽ: "#rrggbb" hoặc từ khoá kiểu dáng (city-web). */
    val assetKey: String,
    val sortOrder: Int
)

enum class CosmeticCategory(val label: String) {
    SKIN("Màu da"), HAIR_STYLE("Kiểu tóc"), HAIR_COLOR("Màu tóc"), SHIRT_COLOR("Màu áo"),
    PANTS_COLOR("Màu quần"), ACCESSORY("Phụ kiện"), WALL("Tường"), FLOOR("Sàn");

    companion object {
        val AVATAR = listOf(SKIN, HAIR_STYLE, HAIR_COLOR, SHIRT_COLOR, PANTS_COLOR, ACCESSORY)
        val HOUSE = listOf(WALL, FLOOR)
        fun of(raw: String): CosmeticCategory? = entries.firstOrNull { it.name == raw }
    }
}

/** avatar_config: mỗi trường là MÃ cosmetic. */
data class AvatarConfig(
    val skin: String,
    val hairStyle: String,
    val hairColor: String,
    val shirtColor: String,
    val pantsColor: String,
    val accessory: String
) {
    fun codeOf(c: CosmeticCategory): String? = when (c) {
        CosmeticCategory.SKIN -> skin
        CosmeticCategory.HAIR_STYLE -> hairStyle
        CosmeticCategory.HAIR_COLOR -> hairColor
        CosmeticCategory.SHIRT_COLOR -> shirtColor
        CosmeticCategory.PANTS_COLOR -> pantsColor
        CosmeticCategory.ACCESSORY -> accessory
        else -> null
    }

    fun with(c: CosmeticCategory, code: String): AvatarConfig = when (c) {
        CosmeticCategory.SKIN -> copy(skin = code)
        CosmeticCategory.HAIR_STYLE -> copy(hairStyle = code)
        CosmeticCategory.HAIR_COLOR -> copy(hairColor = code)
        CosmeticCategory.SHIRT_COLOR -> copy(shirtColor = code)
        CosmeticCategory.PANTS_COLOR -> copy(pantsColor = code)
        CosmeticCategory.ACCESSORY -> copy(accessory = code)
        else -> this
    }

    companion object {
        /** Trùng AvatarConfig.DEFAULT phía server. */
        val DEFAULT = AvatarConfig("SKIN_2", "HAIR_SHORT", "HAIR_BROWN", "SHIRT_TEAL", "PANTS_NAVY", "ACC_NONE")
    }
}

data class HouseStyleConfig(val wall: String, val floor: String) {
    fun codeOf(c: CosmeticCategory): String? = when (c) {
        CosmeticCategory.WALL -> wall
        CosmeticCategory.FLOOR -> floor
        else -> null
    }

    fun with(c: CosmeticCategory, code: String): HouseStyleConfig = when (c) {
        CosmeticCategory.WALL -> copy(wall = code)
        CosmeticCategory.FLOOR -> copy(floor = code)
        else -> this
    }

    companion object {
        val DEFAULT = HouseStyleConfig("WALL_CREAM", "FLOOR_OAK")
    }
}

/** Mọi thứ màn Tuỳ biến cần, đọc từ Room (xem được offline; đổi/mua thì cần mạng). */
data class CosmeticsState(
    val items: List<CosmeticItem>,
    val unlocked: Set<String>,
    val avatar: AvatarConfig,
    val house: HouseStyleConfig,
    val knowledgePoints: Int
) {
    fun byCode(code: String): CosmeticItem? = items.firstOrNull { it.code == code }
    fun isUnlocked(item: CosmeticItem): Boolean = item.unlockType == "FREE" || item.code in unlocked

    companion object {
        val EMPTY = CosmeticsState(emptyList(), emptySet(), AvatarConfig.DEFAULT, HouseStyleConfig.DEFAULT, 0)
    }
}

/** Kết quả gọi server khi đổi / mua. */
sealed interface CosmeticOutcome {
    data object Done : CosmeticOutcome
    data class NotEnoughKp(val missing: Int) : CosmeticOutcome
    data object Invalid : CosmeticOutcome
    data object Offline : CosmeticOutcome
    data class Failed(val message: String) : CosmeticOutcome
}
