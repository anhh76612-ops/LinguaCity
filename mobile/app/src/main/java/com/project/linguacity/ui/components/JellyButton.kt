package com.project.linguacity.ui.components

import android.view.HapticFeedbackConstants
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.EaseInQuad
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.project.linguacity.ui.motion.LocalReduceMotion
import com.project.linguacity.ui.theme.LinguaColors
import com.project.linguacity.ui.theme.LinguaTextStyles
import com.project.linguacity.ui.theme.LinguaTheme

/** Kiểu nút thạch. Mỗi màn chỉ nên có một nút [Primary]. */
enum class JellyVariant { Primary, Success, Info, Gold, Wood, Secondary, Danger }

/** Mini: nút gọn trong danh sách (bảng nhiệm vụ), vùng chạm tối thiểu vẫn 40dp. */
enum class JellySize { Mini, Small, Medium, Large }

internal data class ClayPalette(val face: Color, val edge: Color, val content: Color)

internal fun LinguaColors.paletteFor(variant: JellyVariant, enabled: Boolean): ClayPalette =
    if (!enabled) {
        ClayPalette(dustGray, dustEdge, onFill)
    } else {
        when (variant) {
            JellyVariant.Primary -> ClayPalette(cta, ctaEdge, onFill)
            JellyVariant.Success -> ClayPalette(jelly, jellyEdge, onFill)
            JellyVariant.Info -> ClayPalette(sky, skyEdge, onFill)
            JellyVariant.Gold -> ClayPalette(gold, goldEdge, onFill)
            JellyVariant.Wood -> ClayPalette(wood, woodDark, onWood)
            JellyVariant.Secondary -> ClayPalette(board, line, ink)
            JellyVariant.Danger -> ClayPalette(clayError, clayErrorEdge, onFill)
        }
    }

/**
 * Trạng thái lún của nút (0 = nghỉ, 1 = lún hết). Nhấn: 90ms EaseInQuad. Thả: spring
 * dampingRatio 0.45 nên nảy vượt lên một chút (concept §9.3). Reduced motion: không lún.
 */
@Composable
internal fun rememberPressProgress(
    interaction: MutableInteractionSource,
    haptic: Int?
): () -> Float {
    val reduce = LocalReduceMotion.current
    val pressed by interaction.collectIsPressedAsState()
    val anim = remember { Animatable(0f) }
    val view = LocalView.current
    LaunchedEffect(pressed, reduce) {
        if (pressed && haptic != null) view.performHapticFeedback(haptic)
        when {
            reduce -> anim.snapTo(0f)
            pressed -> anim.animateTo(1f, tween(90, easing = EaseInQuad))
            else -> anim.animateTo(
                0f,
                spring(dampingRatio = 0.45f, stiffness = Spring.StiffnessMedium)
            )
        }
    }
    return { anim.value }
}

/**
 * Nút thạch 3D (S1). Ấn xuống thì lún và phình ngang, thả ra thì nảy. Khi [enabled] = false,
 * nút đổi sang `dustGray` (khoá) và không bấm được.
 */
@Composable
fun JellyButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    variant: JellyVariant = JellyVariant.Primary,
    size: JellySize = JellySize.Medium,
    enabled: Boolean = true,
    leadingIcon: ImageVector? = null
) {
    val c = LinguaTheme.colors
    val palette = c.paletteFor(variant, enabled)
    val interaction = remember { MutableInteractionSource() }
    val haptic = if (variant == JellyVariant.Primary || size == JellySize.Large) {
        HapticFeedbackConstants.VIRTUAL_KEY
    } else {
        HapticFeedbackConstants.KEYBOARD_TAP
    }
    val press = rememberPressProgress(interaction, if (enabled) haptic else null)
    val (elevation, padding, style) = when (size) {
        JellySize.Mini -> Triple(
            3.dp, PaddingValues(12.dp, 5.dp), LinguaTextStyles.button.copy(fontSize = 14.sp, lineHeight = 16.sp)
        )
        JellySize.Small -> Triple(4.dp, PaddingValues(14.dp, 8.dp), LinguaTextStyles.button)
        JellySize.Medium -> Triple(6.dp, PaddingValues(22.dp, 12.dp), LinguaTextStyles.button)
        JellySize.Large -> Triple(8.dp, PaddingValues(32.dp, 16.dp), LinguaTextStyles.buttonLarge)
    }
    Box(
        modifier
            .defaultMinSize(minHeight = if (size == JellySize.Mini) 34.dp else 48.dp)
            .clay(
                color = palette.face, edge = palette.edge, glow = c.whiteGlow,
                shadow = c.clayShadow, elevation = elevation, corner = 16.dp,
                border = if (variant == JellyVariant.Secondary) c.line else Color.Transparent,
                press = press
            )
            .clickable(
                interactionSource = interaction,
                indication = null,
                enabled = enabled,
                role = Role.Button,
                onClick = onClick
            )
            .padding(padding),
        contentAlignment = Alignment.Center
    ) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            if (leadingIcon != null) {
                LinguaIcon(leadingIcon, null, Modifier.size(if (size == JellySize.Mini) 16.dp else 22.dp))
            }
            Text(text, style = style, color = palette.content, textAlign = TextAlign.Center)
        }
    }
}

/** Nút tròn chỉ có icon (⚙, 📬, 🧰…). Luôn truyền [contentDescription] cho TalkBack. */
@Composable
fun JellyIconButton(
    icon: ImageVector,
    contentDescription: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    variant: JellyVariant = JellyVariant.Secondary,
    diameter: Dp = 52.dp,
    enabled: Boolean = true
) {
    val c = LinguaTheme.colors
    val palette = c.paletteFor(variant, enabled)
    val interaction = remember { MutableInteractionSource() }
    val press = rememberPressProgress(
        interaction,
        if (enabled) HapticFeedbackConstants.KEYBOARD_TAP else null
    )
    Box(
        modifier
            .size(diameter, diameter + 5.dp)
            .clay(
                color = palette.face, edge = palette.edge, glow = c.whiteGlow,
                shadow = c.clayShadow, elevation = 5.dp, corner = diameter / 2,
                border = if (variant == JellyVariant.Secondary) c.line else Color.Transparent,
                press = press
            )
            .clickable(
                interactionSource = interaction, indication = null, enabled = enabled,
                role = Role.Button, onClick = onClick
            )
            .semantics { this.contentDescription = contentDescription },
        contentAlignment = Alignment.Center
    ) {
        LinguaIcon(icon, null, Modifier.size(diameter * 0.55f))
    }
}

/** Khối đất sét tĩnh làm nền cho thẻ (BuildingSheet, RepairCard…). */
@Composable
fun ClayCard(
    modifier: Modifier = Modifier,
    color: Color = LinguaTheme.colors.paper,
    edge: Color = LinguaTheme.colors.line,
    elevation: Dp = 5.dp,
    corner: Dp = 20.dp,
    contentPadding: PaddingValues = PaddingValues(16.dp),
    content: @Composable () -> Unit
) {
    val c = LinguaTheme.colors
    Box(
        modifier
            .clay(color, edge, c.whiteGlow, c.clayShadow, elevation, corner)
            .padding(contentPadding)
    ) { content() }
}

internal val PillShape = RoundedCornerShape(percent = 50)
