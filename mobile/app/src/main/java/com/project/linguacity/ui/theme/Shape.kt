package com.project.linguacity.ui.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/** Bo góc: 12 (chip, ô nhỏ), 16 (thẻ, nút), 24 (sheet, popup). */
val Shapes = Shapes(
    extraSmall = RoundedCornerShape(8.dp),
    small = RoundedCornerShape(12.dp),
    medium = RoundedCornerShape(16.dp),
    large = RoundedCornerShape(24.dp),
    extraLarge = RoundedCornerShape(32.dp)
)

/** Khoảng cách chuẩn, thay cho các giá trị `16.dp`, `12.dp`… rải rác. */
@Immutable
data class LinguaSpacing(
    val xxs: Dp = 2.dp,
    val xs: Dp = 4.dp,
    val sm: Dp = 8.dp,
    val md: Dp = 12.dp,
    val lg: Dp = 16.dp,
    val xl: Dp = 24.dp,
    val xxl: Dp = 32.dp
)

/** Độ dày (cạnh dưới) của khối đất sét. */
@Immutable
data class LinguaElevation(
    val chip: Dp = 3.dp,
    val card: Dp = 5.dp,
    val button: Dp = 6.dp,
    val buttonLarge: Dp = 8.dp
)

val LocalLinguaSpacing = staticCompositionLocalOf { LinguaSpacing() }
val LocalLinguaElevation = staticCompositionLocalOf { LinguaElevation() }
