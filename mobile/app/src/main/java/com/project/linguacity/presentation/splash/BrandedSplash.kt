package com.project.linguacity.presentation.splash

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.project.linguacity.ui.motion.LocalReduceMotion

private val Sky = Color(0xFFCFE8F3)
private val Ground = Color(0xFF8FC27A)

/**
 * SCR-14 Splash Compose (FR-UI-01): sau splash hệ thống (core-splashscreen), hiện bóng thành phố mọc lên
 * và tên game trong lúc khởi tạo người chơi (onboarding).
 */
@Composable
fun BrandedSplash(modifier: Modifier = Modifier) {
    val reduce = LocalReduceMotion.current
    var started by remember { mutableStateOf(reduce) }
    LaunchedEffect(Unit) { started = true }
    val rise by animateFloatAsState(if (started) 1f else 0f, tween(if (reduce) 0 else 900), label = "rise")
    val textAlpha by animateFloatAsState(if (started) 1f else 0f, tween(if (reduce) 0 else 700, delayMillis = if (reduce) 0 else 450), label = "title")

    Column(
        modifier.fillMaxSize().background(Sky).padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(20.dp, Alignment.CenterVertically)
    ) {
        Canvas(Modifier.fillMaxWidth(0.8f).height(150.dp)) {
            val heights = listOf(0.45f, 0.7f, 0.95f, 0.6f, 0.8f, 0.5f)
            val bw = size.width / heights.size
            heights.forEachIndexed { i, hMax ->
                val grow = (rise * 1.4f - i * 0.07f).coerceIn(0f, 1f)
                val h = size.height * 0.85f * hMax * grow
                val color = if (i == 2) Color(0xFF3F5A8F) else Color(0xFF5B7BB5).copy(alpha = 0.55f + 0.08f * i)
                drawRect(color, Offset(i * bw + bw * 0.1f, size.height * 0.88f - h), Size(bw * 0.8f, h))
                if (i == 2 && grow > 0.8f) { // mái nhà đỏ trên toà giữa
                    val roof = Path().apply {
                        moveTo(i * bw, size.height * 0.88f - h)
                        lineTo(i * bw + bw / 2, size.height * 0.88f - h - bw * 0.5f)
                        lineTo(i * bw + bw, size.height * 0.88f - h)
                        close()
                    }
                    drawPath(roof, Color(0xFFE2725B))
                }
            }
            drawRect(Ground, Offset(0f, size.height * 0.88f), Size(size.width, size.height * 0.12f))
        }
        Text("LinguaCity", style = MaterialTheme.typography.displaySmall, fontWeight = FontWeight.Bold,
            color = Color(0xFF2D3F66), modifier = Modifier.graphicsLayer { alpha = textAlpha })
        Text("Học một từ — xây một viên gạch", style = MaterialTheme.typography.bodyLarge, color = Color(0xFF2D3F66),
            modifier = Modifier.graphicsLayer { alpha = textAlpha })
        LinearProgressIndicator(Modifier.fillMaxWidth(0.5f).graphicsLayer { alpha = textAlpha })
    }
}
