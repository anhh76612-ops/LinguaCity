package com.project.linguacity.presentation.splash

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.unit.dp
import com.project.linguacity.ui.components.BrickProgressBar
import com.project.linguacity.ui.components.CozyBubbleText
import com.project.linguacity.ui.icons.LinguaLogoMark
import com.project.linguacity.ui.motion.LocalReduceMotion
import com.project.linguacity.ui.theme.Brand
import com.project.linguacity.ui.theme.LinguaTheme
import kotlinx.coroutines.delay

private const val BRICKS = 8

/**
 * SCR-14 Splash Compose (FR-UI-01): sau splash hệ thống (logo trên nền kem), khối logo nảy lên,
 * tên game hiện ra và hàng gạch được xếp dần trong lúc khởi tạo người chơi (onboarding).
 */
@Composable
fun BrandedSplash(modifier: Modifier = Modifier) {
    val reduce = LocalReduceMotion.current
    val c = LinguaTheme.colors
    val logoScale = remember { Animatable(if (reduce) 1f else 0.6f) }
    var started by remember { mutableStateOf(reduce) }
    var bricks by remember { mutableIntStateOf(if (reduce) BRICKS / 2 else 0) }

    LaunchedEffect(Unit) {
        started = true
        if (!reduce) {
            logoScale.animateTo(1f, spring(dampingRatio = 0.45f, stiffness = Spring.StiffnessMediumLow))
        }
    }
    // Chờ không biết trước bao lâu: xếp gạch từng viên, đủ hàng thì xếp lại từ đầu.
    LaunchedEffect(reduce) {
        if (reduce) return@LaunchedEffect
        while (true) {
            delay(220)
            bricks = if (bricks >= BRICKS) 0 else bricks + 1
        }
    }
    val textAlpha by animateFloatAsState(
        if (started) 1f else 0f,
        tween(if (reduce) 0 else 600, delayMillis = if (reduce) 0 else 300),
        label = "title"
    )

    Column(
        modifier.fillMaxSize().background(c.cream).padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(20.dp, Alignment.CenterVertically)
    ) {
        Image(
            LinguaLogoMark,
            contentDescription = null,
            modifier = Modifier
                .size(132.dp)
                .graphicsLayer { scaleX = logoScale.value; scaleY = logoScale.value }
        )
        CozyBubbleText(
            "LinguaCity",
            modifier = Modifier.graphicsLayer { alpha = textAlpha },
            // màu cố định: chữ kem viền navy đọc rõ trên cả nền ngày lẫn đêm
            fill = Brand.Cream,
            depth = Brand.Brick,
            outline = Brand.Ink
        )
        Text(
            "Học một từ, xây một viên gạch",
            style = androidx.compose.material3.MaterialTheme.typography.bodyLarge,
            color = c.inkSoft,
            modifier = Modifier.graphicsLayer { alpha = textAlpha }
        )
        BrickProgressBar(bricks, BRICKS, Modifier.graphicsLayer { alpha = textAlpha })
    }
}
