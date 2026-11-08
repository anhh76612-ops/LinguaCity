package com.project.linguacity.ui.theme

import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color

/*
 * Token màu "Cozy Toy Town" (docs/04-ui/redesign/cozy-toy-town-concept.md §9.1).
 * Light = thị trấn ban ngày, Dark = thị trấn ban đêm. Màn hình nên đọc màu qua
 * `LinguaTheme.colors` (token thương hiệu) hoặc `MaterialTheme.colorScheme` (component M3),
 * không hard-code `Color(0x…)`.
 */
@Immutable
data class LinguaColors(
    /** Nền app. */
    val cream: Color,
    /** Nền bài học, sổ, thẻ. */
    val paper: Color,
    /** Bề mặt nổi nhất (bong bóng thoại, ô trong thẻ). */
    val board: Color,
    /** Chữ chính. */
    val ink: Color,
    /** Chữ phụ. */
    val inkSoft: Color,
    /** Đường kẻ, viền nhạt, cạnh dưới của khối trung tính. */
    val line: Color,
    val sky: Color,
    val skyEdge: Color,
    val grass: Color,
    val jelly: Color,
    val jellyEdge: Color,
    /** Nút chính. */
    val cta: Color,
    val ctaEdge: Color,
    /** Trả lời sai: cam đất sét, không dùng đỏ chói. */
    val clayError: Color,
    val clayErrorEdge: Color,
    val clayErrorBg: Color,
    val gold: Color,
    val goldEdge: Color,
    val wood: Color,
    val woodDark: Color,
    val brick: Color,
    val brickEdge: Color,
    /** Highlight mép trên của khối đất sét. */
    val whiteGlow: Color,
    /** Bóng đổ mềm dưới khối. */
    val clayShadow: Color,
    /** Khoá, disabled, chưa đủ tài nguyên. */
    val dustGray: Color,
    val dustEdge: Color,
    /** Chữ trên các khối màu (cam, xanh, vàng…): luôn navy ở cả hai theme. */
    val onFill: Color,
    /** Chữ trên khối gỗ đậm. */
    val onWood: Color,
    val isDark: Boolean
)

/** Màu cố định của thương hiệu, không đổi theo theme (icon, logo, nhân vật). */
object Brand {
    val Ink = Color(0xFF2D3F66)
    val Cream = Color(0xFFFFF6E9)
    val Paper = Color(0xFFF9F6F0)
    val Cta = Color(0xFFF4A261)
    val CtaEdge = Color(0xFFC9783A)
    val Jelly = Color(0xFF7CC66B)
    val JellyEdge = Color(0xFF4E9A40)
    val Sky = Color(0xFF8EC9F2)
    val SkyEdge = Color(0xFF5A9CC8)
    val SkyPale = Color(0xFFCDE8F8)
    val Gold = Color(0xFFF4B740)
    val GoldEdge = Color(0xFFC48A1C)
    val Wood = Color(0xFFC99A6B)
    val WoodDark = Color(0xFF8B5E3C)
    val WoodPale = Color(0xFFE9C9A0)
    val Brick = Color(0xFFD9654B)
    val BrickEdge = Color(0xFFA8432F)
    val BrickLight = Color(0xFFE8826A)
    val Dust = Color(0xFFBCC5D3)
    val DustEdge = Color(0xFF97A2B4)
    val Slate = Color(0xFF6B7A99)
    val SlateDeep = Color(0xFF56627A)
    val ClayError = Color(0xFFE27D60)
}

val LightLinguaColors = LinguaColors(
    cream = Brand.Cream,
    paper = Brand.Paper,
    board = Color(0xFFFFFFFF),
    ink = Brand.Ink,
    inkSoft = Color(0xFF5B6B8C),
    line = Color(0x242D3F66),
    sky = Brand.Sky,
    skyEdge = Brand.SkyEdge,
    grass = Color(0xFF9FD486),
    jelly = Brand.Jelly,
    jellyEdge = Brand.JellyEdge,
    cta = Brand.Cta,
    ctaEdge = Brand.CtaEdge,
    clayError = Brand.ClayError,
    clayErrorEdge = Color(0xFFB5543A),
    clayErrorBg = Color(0xFFFBE3DA),
    gold = Brand.Gold,
    goldEdge = Brand.GoldEdge,
    wood = Brand.Wood,
    woodDark = Brand.WoodDark,
    brick = Brand.Brick,
    brickEdge = Brand.BrickEdge,
    whiteGlow = Color(0x73FFFFFF),
    clayShadow = Color(0x262D3F66),
    dustGray = Brand.Dust,
    dustEdge = Brand.DustEdge,
    onFill = Brand.Ink,
    onWood = Brand.Cream,
    isDark = false
)

val DarkLinguaColors = LinguaColors(
    cream = Color(0xFF1F2A44),
    paper = Color(0xFF2A3756),
    board = Color(0xFF25314D),
    ink = Color(0xFFF3EBDD),
    inkSoft = Color(0xFFB9C0D3),
    line = Color(0x24F3EBDD),
    sky = Color(0xFF6FB2E0),
    skyEdge = Color(0xFF3F7FAE),
    grass = Color(0xFF7CC66B),
    jelly = Brand.Jelly,
    jellyEdge = Color(0xFF3D7F32),
    cta = Brand.Cta,
    ctaEdge = Color(0xFFB5682E),
    clayError = Color(0xFFE8907A),
    clayErrorEdge = Color(0xFFB5543A),
    clayErrorBg = Color(0xFF4A3240),
    gold = Color(0xFFFFD27A),
    goldEdge = Color(0xFFC9962E),
    wood = Color(0xFFA97C52),
    woodDark = Color(0xFF6E4A2E),
    brick = Color(0xFFE07A60),
    brickEdge = Color(0xFFA8432F),
    whiteGlow = Color(0x33FFFFFF),
    clayShadow = Color(0x66000000),
    dustGray = Color(0xFF56627A),
    dustEdge = Color(0xFF3E4960),
    onFill = Brand.Ink,
    onWood = Brand.Cream,
    isDark = true
)

val LocalLinguaColors = staticCompositionLocalOf { LightLinguaColors }
