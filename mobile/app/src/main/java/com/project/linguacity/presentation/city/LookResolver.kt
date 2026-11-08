package com.project.linguacity.presentation.city

import com.project.linguacity.domain.model.player.AvatarConfig
import com.project.linguacity.domain.model.player.CosmeticCategory
import com.project.linguacity.domain.model.player.CosmeticItem
import com.project.linguacity.domain.model.player.HouseStyleConfig

/**
 * Lớp dịch DUY NHẤT từ mã cosmetic (dữ liệu nghiệp vụ) sang giá trị để vẽ (hợp đồng B) — cùng tinh thần ADR-011.
 * Mã không có trong danh mục hoặc sai nhóm → dùng giá trị mặc định của trường đó, bản đồ không bao giờ nhận mã lạ.
 */
object LookResolver {

    fun avatar(config: AvatarConfig, catalog: List<CosmeticItem>): AvatarLook {
        val byCode = catalog.associateBy { it.code }
        fun asset(code: String, c: CosmeticCategory, fallback: String) =
            byCode[code]?.takeIf { it.category == c }?.assetKey ?: fallback
        val d = AvatarLook.DEFAULT
        return AvatarLook(
            skin = asset(config.skin, CosmeticCategory.SKIN, d.skin),
            hairStyle = asset(config.hairStyle, CosmeticCategory.HAIR_STYLE, d.hairStyle),
            hairColor = asset(config.hairColor, CosmeticCategory.HAIR_COLOR, d.hairColor),
            shirt = asset(config.shirtColor, CosmeticCategory.SHIRT_COLOR, d.shirt),
            pants = asset(config.pantsColor, CosmeticCategory.PANTS_COLOR, d.pants),
            accessory = asset(config.accessory, CosmeticCategory.ACCESSORY, d.accessory)
        )
    }

    fun house(config: HouseStyleConfig, catalog: List<CosmeticItem>): HouseLook {
        val byCode = catalog.associateBy { it.code }
        val d = HouseLook.DEFAULT
        return HouseLook(
            wall = byCode[config.wall]?.takeIf { it.category == CosmeticCategory.WALL }?.assetKey ?: d.wall,
            floor = byCode[config.floor]?.takeIf { it.category == CosmeticCategory.FLOOR }?.assetKey ?: d.floor
        )
    }
}
