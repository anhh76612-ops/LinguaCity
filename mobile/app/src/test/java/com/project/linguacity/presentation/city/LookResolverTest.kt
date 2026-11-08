package com.project.linguacity.presentation.city

import com.project.linguacity.data.mapper.CosmeticJson
import com.project.linguacity.domain.model.player.AvatarConfig
import com.project.linguacity.domain.model.player.CosmeticCategory
import com.project.linguacity.domain.model.player.CosmeticItem
import com.project.linguacity.domain.model.player.CosmeticsState
import com.project.linguacity.domain.model.player.HouseStyleConfig
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/** Mã cosmetic (nghiệp vụ) → giá trị để vẽ (hợp đồng B, M8). */
class LookResolverTest {

    private fun item(code: String, c: CosmeticCategory, asset: String, unlock: String = "FREE") =
        CosmeticItem(code, c, code, unlock, if (unlock == "KP") 60 else 0, null, asset, 1)

    private val catalog = listOf(
        item("SKIN_4", CosmeticCategory.SKIN, "#c98f66"),
        item("HAIR_SPIKY", CosmeticCategory.HAIR_STYLE, "spiky"),
        item("HAIR_BLONDE", CosmeticCategory.HAIR_COLOR, "#e6c27a"),
        item("SHIRT_RED", CosmeticCategory.SHIRT_COLOR, "#e57373"),
        item("PANTS_NAVY", CosmeticCategory.PANTS_COLOR, "#3949ab"),
        item("ACC_HAT", CosmeticCategory.ACCESSORY, "hat"),
        item("WALL_SKY", CosmeticCategory.WALL, "#cfe0f0", unlock = "KP"),
        item("FLOOR_CHECKER", CosmeticCategory.FLOOR, "checker", unlock = "KP")
    )

    @Test
    fun avatar_dichDungAssetKey() {
        val look = LookResolver.avatar(
            AvatarConfig("SKIN_4", "HAIR_SPIKY", "HAIR_BLONDE", "SHIRT_RED", "PANTS_NAVY", "ACC_HAT"), catalog
        )
        assertEquals(AvatarLook("#c98f66", "spiky", "#e6c27a", "#e57373", "#3949ab", "hat"), look)
    }

    @Test
    fun avatar_maLaHoacSaiNhom_dungMacDinhCuaTruongDo() {
        // SKIN_9 không có; HAIR_BLONDE đặt nhầm vào shirtColor
        val look = LookResolver.avatar(AvatarConfig.DEFAULT.copy(skin = "SKIN_9", shirtColor = "HAIR_BLONDE"), catalog)
        assertEquals(AvatarLook.DEFAULT.skin, look.skin)
        assertEquals(AvatarLook.DEFAULT.shirt, look.shirt)
    }

    @Test
    fun avatar_danhMucRong_vanVeDuoc() {
        assertEquals(AvatarLook.DEFAULT, LookResolver.avatar(AvatarConfig.DEFAULT, emptyList()))
        assertEquals(HouseLook.DEFAULT, LookResolver.house(HouseStyleConfig.DEFAULT, emptyList()))
    }

    @Test
    fun house_dichTuongVaSan() {
        assertEquals(HouseLook("#cfe0f0", "checker"), LookResolver.house(HouseStyleConfig("WALL_SKY", "FLOOR_CHECKER"), catalog))
    }

    @Test
    fun cosmeticJson_hongHoacThieu_traVeMacDinh() {
        assertEquals(AvatarConfig.DEFAULT, CosmeticJson.decodeAvatar(null))
        assertEquals(AvatarConfig.DEFAULT, CosmeticJson.decodeAvatar("khong phai json"))
        assertEquals(HouseStyleConfig.DEFAULT, CosmeticJson.decodeHouse("{\"wall\":\"WALL_SKY\"}")) // thiếu floor
        assertEquals(
            HouseStyleConfig("WALL_SKY", "FLOOR_TILE"),
            CosmeticJson.decodeHouse("{\"wall\":\"WALL_SKY\",\"floor\":\"FLOOR_TILE\",\"x\":1}")
        )
    }

    @Test
    fun cosmeticsState_monFreeLuonMo_monKpCanCoTrongDanhSach() {
        val st = CosmeticsState(catalog, unlocked = setOf("WALL_SKY"), AvatarConfig.DEFAULT, HouseStyleConfig.DEFAULT, 0)
        assertTrue(st.isUnlocked(catalog.first { it.code == "SKIN_4" }))
        assertTrue(st.isUnlocked(catalog.first { it.code == "WALL_SKY" }))
        assertFalse(st.isUnlocked(catalog.first { it.code == "FLOOR_CHECKER" }))
    }
}
