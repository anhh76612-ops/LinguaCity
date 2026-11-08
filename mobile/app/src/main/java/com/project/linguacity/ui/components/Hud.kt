package com.project.linguacity.ui.components

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.project.linguacity.ui.icons.LinguaIcons
import com.project.linguacity.ui.motion.LocalReduceMotion
import com.project.linguacity.ui.theme.LinguaTextStyles
import com.project.linguacity.ui.theme.LinguaTheme

/** Icon duotone của LinguaCity: giữ màu gốc, không tint theo theme. */
@Composable
fun LinguaIcon(icon: ImageVector, contentDescription: String?, modifier: Modifier = Modifier) {
    Image(icon, contentDescription, modifier)
}

/**
 * Viên tài nguyên trên HUD (🪙 1.250). Khi [value] đổi, viên phình lên rồi nảy về (bump),
 * dùng cùng `FlyToHud` sau này.
 */
@Composable
fun ResourcePill(
    icon: ImageVector,
    value: String,
    contentDescription: String,
    modifier: Modifier = Modifier,
    onClick: (() -> Unit)? = null
) {
    val c = LinguaTheme.colors
    val reduce = LocalReduceMotion.current
    val bump = remember { Animatable(1f) }
    // không nảy ở lần hiển thị đầu, chỉ khi giá trị đổi
    val previous = remember { arrayOf(value) }
    LaunchedEffect(value) {
        if (previous[0] == value) return@LaunchedEffect
        previous[0] = value
        if (!reduce) {
            bump.animateTo(1.18f, tween(110))
            bump.animateTo(1f, spring(dampingRatio = 0.4f, stiffness = Spring.StiffnessMedium))
        }
    }
    Row(
        modifier
            .graphicsLayer { scaleX = bump.value; scaleY = bump.value }
            .clay(c.paper, c.line, c.whiteGlow, Color.Transparent, elevation = 3.dp, corner = 999.dp)
            .then(if (onClick != null) Modifier.clickable(onClick = onClick) else Modifier)
            .semantics(mergeDescendants = true) { this.contentDescription = "$contentDescription: $value" }
            .padding(start = 4.dp, end = 12.dp, top = 4.dp, bottom = 4.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(6.dp)
    ) {
        LinguaIcon(icon, null, Modifier.size(24.dp))
        Text(value, style = LinguaTextStyles.counter, color = c.ink)
    }
}

/** Pin năng lượng đất sét ⚡ 4/5. */
@Composable
fun StaminaBattery(current: Int, max: Int, modifier: Modifier = Modifier) {
    val c = LinguaTheme.colors
    Row(
        modifier.semantics(mergeDescendants = true) { contentDescription = "Năng lượng $current trên $max" },
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(6.dp)
    ) {
        LinguaIcon(LinguaIcons.Bolt, null, Modifier.size(22.dp))
        Row(
            Modifier
                .clay(c.paper, c.line, c.whiteGlow, Color.Transparent, 3.dp, 8.dp)
                .padding(3.dp),
            horizontalArrangement = Arrangement.spacedBy(3.dp)
        ) {
            repeat(max) { i ->
                Box(
                    Modifier
                        .size(10.dp, 16.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .background(if (i < current) c.jelly else c.dustGray)
                )
            }
        }
        Text("$current/$max", style = LinguaTextStyles.counter, color = c.ink)
    }
}

/** Nhãn nhỏ (Thuế 100%, Nứt mức 2…). [warn] = tông cam đất sét. */
@Composable
fun CozyTag(text: String, modifier: Modifier = Modifier, warn: Boolean = false, icon: ImageVector? = null) {
    val c = LinguaTheme.colors
    Row(
        modifier
            .clip(PillShape)
            .background(if (warn) c.clayErrorBg else c.cream)
            .padding(horizontal = 10.dp, vertical = 4.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        if (icon != null) LinguaIcon(icon, null, Modifier.size(16.dp))
        Text(
            text,
            style = androidx.compose.material3.MaterialTheme.typography.labelMedium,
            color = if (warn) (if (c.isDark) c.clayError else c.clayErrorEdge) else c.ink
        )
    }
}

/**
 * Thanh tiến trình là hàng gạch (bài học: mỗi câu đúng xếp thêm một viên). Viên mới rơi xuống
 * và nảy.
 */
@Composable
fun BrickProgressBar(
    filled: Int,
    total: Int,
    modifier: Modifier = Modifier,
    brickWidth: Dp = 22.dp,
    brickHeight: Dp = 12.dp
) {
    val c = LinguaTheme.colors
    val reduce = LocalReduceMotion.current
    Row(
        modifier.semantics(mergeDescendants = true) { contentDescription = "Tiến trình $filled trên $total" },
        horizontalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        repeat(total) { i ->
            val on = i < filled
            val drop = remember(on) { Animatable(if (on && !reduce) -14f else 0f) }
            LaunchedEffect(on) {
                if (on && !reduce) drop.animateTo(0f, spring(dampingRatio = 0.45f, stiffness = Spring.StiffnessMediumLow))
            }
            Box(
                Modifier
                    .graphicsLayer { translationY = drop.value * density }
                    .width(brickWidth)
                    .height(brickHeight)
                    .clip(RoundedCornerShape(3.dp))
                    .background(if (on) c.brick else c.dustGray)
            )
        }
    }
}

/** Chữ thường dùng cho eyebrow (nhãn nhỏ viết hoa trên tiêu đề). */
@Composable
fun Eyebrow(text: String, modifier: Modifier = Modifier, style: TextStyle = LinguaTextStyles.eyebrow) {
    val c = LinguaTheme.colors
    Text(text.uppercase(), modifier, style = style, color = if (c.isDark) c.wood else c.woodDark)
}
