package com.project.linguacity.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.ColorScheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.ui.graphics.Color

/*
 * Theme "Cozy Toy Town" (S1). Không dùng dynamic color: bản sắc phải giống nhau trên mọi máy.
 * ColorScheme của Material được ánh xạ từ token để các component M3 có sẵn (Button, Card,
 * Switch…) đổi màu theo ngay, trước khi từng màn được chuyển sang component riêng.
 */

private val LightScheme = lightColorScheme(
    primary = Brand.Cta,
    onPrimary = Brand.Ink,
    primaryContainer = Color(0xFFFCE3CC),
    onPrimaryContainer = Color(0xFF6B3A12),
    secondary = Brand.Jelly,
    onSecondary = Brand.Ink,
    secondaryContainer = Color(0xFFDDF0D3),
    onSecondaryContainer = Color(0xFF24501A),
    tertiary = Brand.Sky,
    onTertiary = Brand.Ink,
    tertiaryContainer = Color(0xFFD9EDFB),
    onTertiaryContainer = Color(0xFF1E4A6E),
    background = LightLinguaColors.cream,
    onBackground = LightLinguaColors.ink,
    surface = Color(0xFFFFFBF5),
    onSurface = LightLinguaColors.ink,
    surfaceVariant = Color(0xFFF1E6D6),
    onSurfaceVariant = LightLinguaColors.inkSoft,
    surfaceTint = Brand.Cta,
    surfaceContainerLowest = Color(0xFFFFFFFF),
    surfaceContainerLow = Color(0xFFFFF9F0),
    surfaceContainer = Color(0xFFF9F1E4),
    surfaceContainerHigh = Color(0xFFF4EAD9),
    surfaceContainerHighest = Color(0xFFEFE3D0),
    surfaceBright = Color(0xFFFFFBF5),
    surfaceDim = Color(0xFFEBDFCC),
    inverseSurface = Brand.Ink,
    inverseOnSurface = Brand.Cream,
    inversePrimary = Color(0xFF8A4B1C),
    error = Color(0xFFB5543A),
    onError = Color(0xFFFFFFFF),
    errorContainer = Color(0xFFFBE3DA),
    onErrorContainer = Color(0xFF6E2A17),
    outline = Color(0xFF9AA3B8),
    outlineVariant = Color(0xFFE3D6C2),
    scrim = Color(0xFF000000)
)

private val DarkScheme = darkColorScheme(
    primary = Brand.Cta,
    onPrimary = Brand.Ink,
    primaryContainer = Color(0xFF6B3F1C),
    onPrimaryContainer = Color(0xFFFCE3CC),
    secondary = Brand.Jelly,
    onSecondary = Color(0xFF1B3512),
    secondaryContainer = Color(0xFF2F5A27),
    onSecondaryContainer = Color(0xFFDDF0D3),
    tertiary = Brand.Sky,
    onTertiary = Color(0xFF0F2E47),
    tertiaryContainer = Color(0xFF1E4A6E),
    onTertiaryContainer = Color(0xFFD9EDFB),
    background = DarkLinguaColors.cream,
    onBackground = DarkLinguaColors.ink,
    surface = Color(0xFF25314D),
    onSurface = DarkLinguaColors.ink,
    surfaceVariant = Color(0xFF34415F),
    onSurfaceVariant = DarkLinguaColors.inkSoft,
    surfaceTint = Brand.Cta,
    surfaceContainerLowest = Color(0xFF1A2338),
    surfaceContainerLow = Color(0xFF222D48),
    surfaceContainer = Color(0xFF2A3756),
    surfaceContainerHigh = Color(0xFF313F60),
    surfaceContainerHighest = Color(0xFF38476A),
    surfaceBright = Color(0xFF3A4970),
    surfaceDim = Color(0xFF1F2A44),
    inverseSurface = DarkLinguaColors.ink,
    inverseOnSurface = Color(0xFF1F2A44),
    inversePrimary = Color(0xFFC9783A),
    error = Color(0xFFE8907A),
    onError = Color(0xFF3A1208),
    errorContainer = Color(0xFF6E2A17),
    onErrorContainer = Color(0xFFFBE3DA),
    outline = Color(0xFF7A85A0),
    outlineVariant = Color(0xFF3E4960),
    scrim = Color(0xFF000000)
)

@Composable
fun LinguaCityTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colors = if (darkTheme) DarkLinguaColors else LightLinguaColors
    val scheme: ColorScheme = if (darkTheme) DarkScheme else LightScheme
    CompositionLocalProvider(
        LocalLinguaColors provides colors,
        LocalLinguaSpacing provides LinguaSpacing(),
        LocalLinguaElevation provides LinguaElevation()
    ) {
        MaterialTheme(
            colorScheme = scheme,
            typography = Typography,
            shapes = Shapes,
            content = content
        )
    }
}

/** Lối vào token thương hiệu: `LinguaTheme.colors.cta`, `LinguaTheme.spacing.lg`… */
object LinguaTheme {
    val colors: LinguaColors
        @Composable @ReadOnlyComposable get() = LocalLinguaColors.current
    val spacing: LinguaSpacing
        @Composable @ReadOnlyComposable get() = LocalLinguaSpacing.current
    val elevation: LinguaElevation
        @Composable @ReadOnlyComposable get() = LocalLinguaElevation.current
}
