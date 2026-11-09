package com.project.linguacity.ui.components

import android.view.HapticFeedbackConstants
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.ButtonColors
import androidx.compose.material3.CardColors
import androidx.compose.material3.CardElevation
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.LocalTextStyle
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.dp
import com.project.linguacity.ui.theme.LinguaTextStyles
import com.project.linguacity.ui.theme.LinguaTheme

/*
 * Mục 8–9: bản thay thế có CÙNG cách gọi với Button / FilledTonalButton / OutlinedButton / Card của
 * Material 3, để chuyển cả loạt màn cũ sang nút thạch và thẻ đất sét mà không viết lại bố cục.
 * Tham số colors / shape / elevation của Material được nhận nhưng bỏ qua: màu đi theo token.
 * Màn mới nên dùng thẳng JellyButton / ClayCard.
 */

@Composable
fun CozyButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    variant: JellyVariant = JellyVariant.Primary,
    shape: Shape? = null,
    colors: ButtonColors? = null,
    contentPadding: PaddingValues? = null,
    content: @Composable RowScope.() -> Unit
) {
    val c = LinguaTheme.colors
    val palette = c.paletteFor(variant, enabled)
    val interaction = remember { MutableInteractionSource() }
    val press = rememberPressProgress(interaction, if (enabled) HapticFeedbackConstants.KEYBOARD_TAP else null)
    Box(
        modifier
            .defaultMinSize(minHeight = 46.dp)
            .clay(
                palette.face, palette.edge, c.whiteGlow, c.clayShadow, 5.dp, 16.dp,
                border = if (variant == JellyVariant.Secondary) c.line else Color.Transparent,
                press = press
            )
            .clickable(interactionSource = interaction, indication = null, enabled = enabled,
                role = Role.Button, onClick = onClick)
            .padding(contentPadding ?: PaddingValues(horizontal = 18.dp, vertical = 10.dp)),
        contentAlignment = Alignment.Center
    ) {
        CompositionLocalProvider(
            LocalContentColor provides palette.content,
            LocalTextStyle provides LinguaTextStyles.button
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp, Alignment.CenterHorizontally),
                verticalAlignment = Alignment.CenterVertically,
                content = content
            )
        }
    }
}

@Composable
fun CozyTonalButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape? = null,
    colors: ButtonColors? = null,
    contentPadding: PaddingValues? = null,
    content: @Composable RowScope.() -> Unit
) = CozyButton(onClick, modifier, enabled, JellyVariant.Info, shape, colors, contentPadding, content)

@Composable
fun CozyOutlinedButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape? = null,
    colors: ButtonColors? = null,
    contentPadding: PaddingValues? = null,
    content: @Composable RowScope.() -> Unit
) = CozyButton(onClick, modifier, enabled, JellyVariant.Secondary, shape, colors, contentPadding, content)

/** Nút chữ (liên kết): chữ cam đậm đọc rõ trên nền kem thay cho primary nhạt của Material. */
@Composable
fun CozyTextButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape? = null,
    colors: ButtonColors? = null,
    contentPadding: PaddingValues? = null,
    content: @Composable RowScope.() -> Unit
) {
    val c = LinguaTheme.colors
    Row(
        modifier
            .defaultMinSize(minHeight = 44.dp)
            .clickable(enabled = enabled, role = Role.Button, onClick = onClick)
            .padding(contentPadding ?: PaddingValues(horizontal = 10.dp, vertical = 8.dp)),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically
    ) {
        CompositionLocalProvider(
            LocalContentColor provides when {
                !enabled -> c.dustEdge
                c.isDark -> c.gold
                else -> c.ctaEdge
            },
            LocalTextStyle provides LinguaTextStyles.button.copy(fontSize = MaterialTheme.typography.labelLarge.fontSize)
        ) { content() }
    }
}

@Composable
fun CozyCard(
    modifier: Modifier = Modifier,
    shape: Shape? = null,
    colors: CardColors? = null,
    elevation: CardElevation? = null,
    content: @Composable ColumnScope.() -> Unit
) = CozyCardImpl(modifier, null, content)

@Composable
private fun CozyCardImpl(
    modifier: Modifier,
    onClick: (() -> Unit)?,
    content: @Composable ColumnScope.() -> Unit
) {
    val c = LinguaTheme.colors
    Box(
        modifier
            .clay(c.board, c.line, c.whiteGlow, c.clayShadow, 4.dp, 18.dp)
            .then(if (onClick != null) Modifier.clickable(role = Role.Button, onClick = onClick) else Modifier)
    ) {
        CompositionLocalProvider(LocalContentColor provides c.ink) {
            Column(content = content)
        }
    }
}

/** Card(onClick = …) của Material đặt onClick ở tham số đầu tiên. */
@Composable
fun CozyCard(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape? = null,
    colors: CardColors? = null,
    elevation: CardElevation? = null,
    content: @Composable ColumnScope.() -> Unit
) = CozyCardImpl(modifier, if (enabled) onClick else null, content)
