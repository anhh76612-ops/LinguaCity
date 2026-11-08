package com.project.linguacity.data.mapper

import com.project.linguacity.data.local.player.CosmeticItemEntity
import com.project.linguacity.data.remote.player.AvatarConfigDto
import com.project.linguacity.data.remote.player.HouseStyleDto
import com.project.linguacity.domain.model.player.AvatarConfig
import com.project.linguacity.domain.model.player.CosmeticCategory
import com.project.linguacity.domain.model.player.CosmeticItem
import com.project.linguacity.domain.model.player.HouseStyleConfig
import kotlinx.serialization.json.Json

/**
 * avatar_config / house_style lưu trong Room dạng JSON (giống server). Hỏng hoặc thiếu → mặc định.
 */
object CosmeticJson {

    private val json = Json { ignoreUnknownKeys = true }

    fun encodeAvatar(dto: AvatarConfigDto): String = json.encodeToString(
        AvatarConfigDto.serializer(),
        dto
    )
    fun encodeHouse(dto: HouseStyleDto): String = json.encodeToString(
        HouseStyleDto.serializer(),
        dto
    )

    fun decodeAvatar(raw: String?): AvatarConfig =
        raw?.let { runCatching {
            json.decodeFromString(AvatarConfigDto.serializer(), it)
        }.getOrNull() }?.toDomain()
            ?: AvatarConfig.DEFAULT

    fun decodeHouse(raw: String?): HouseStyleConfig =
        raw?.let { runCatching {
            json.decodeFromString(HouseStyleDto.serializer(), it)
        }.getOrNull() }?.toDomain()
            ?: HouseStyleConfig.DEFAULT
}

fun AvatarConfigDto.toDomain() = AvatarConfig(
    skin,
    hairStyle,
    hairColor,
    shirtColor,
    pantsColor,
    accessory
)
fun AvatarConfig.toDto() = AvatarConfigDto(
    skin,
    hairStyle,
    hairColor,
    shirtColor,
    pantsColor,
    accessory
)
fun HouseStyleDto.toDomain() = HouseStyleConfig(wall, floor)
fun HouseStyleConfig.toDto() = HouseStyleDto(wall, floor)

/** Món có nhóm lạ (server mới hơn app) bị bỏ qua. */
fun CosmeticItemEntity.toDomain(): CosmeticItem? = CosmeticCategory.of(category)?.let {
    CosmeticItem(code, it, name, unlockType, priceKp, achievementCode, assetKey, sortOrder)
}
