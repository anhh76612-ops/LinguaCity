package com.project.linguacity.presentation.menu

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.offset
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SmallFloatingActionButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import com.project.linguacity.ui.motion.LocalReduceMotion
import kotlinx.coroutines.delay
import kotlin.math.cos
import kotlin.math.roundToInt
import kotlin.math.sin

data class MenuEntry(val key: String, val icon: String, val label: String, val onClick: () -> Unit)

/**
 * Toạ độ của mục thứ [index] trên cung 1/4 (từ thẳng lên tới ngang sang trái) quanh nút ở góc phải dưới.
 * Hàm thuần — có test (FloatingMenuTest).
 */
fun arcOffset(index: Int, count: Int, radius: Float): Pair<Float, Float> {
    val start = 90.0
    val end = 180.0
    val angle = if (count <= 1) start else start + (end - start) * index / (count - 1)
    val rad = Math.toRadians(angle)
    return (radius * cos(rad)).toFloat() to (-radius * sin(rad)).toFloat()
}

/**
 * SCR-22 Nút menu nổi (FR-UI-03): chạm → nút xoay 45°, các mục bung theo cung tròn lần lượt (~40 ms/mục)
 * kèm rung nhẹ; chọn một mục thì menu thu lại rồi mới điều hướng.
 */
@Composable
fun FloatingMenu(entries: List<MenuEntry>, modifier: Modifier = Modifier, fabModifier: Modifier = Modifier) {
    var open by remember { mutableStateOf(false) }
    val haptic = LocalHapticFeedback.current
    val reduce = LocalReduceMotion.current
    val rotation by animateFloatAsState(if (open) 45f else 0f, tween(if (reduce) 0 else 220), label = "fabRotation")

    Box(modifier, contentAlignment = Alignment.BottomEnd) {
        entries.forEachIndexed { index, entry ->
            val progress = remember { Animatable(0f) }
            LaunchedEffect(open) {
                if (open) {
                    if (!reduce) delay(index * 40L)
                    if (reduce) progress.snapTo(1f) else progress.animateTo(1f, spring(dampingRatio = Spring.DampingRatioMediumBouncy))
                } else {
                    if (reduce) progress.snapTo(0f) else progress.animateTo(0f, tween(150))
                }
            }
            if (progress.value > 0.01f) {
                val (dx, dy) = arcOffset(index, entries.size, 135f)
                val select = {
                    haptic.performHapticFeedback(HapticFeedbackType.TextHandleMove)
                    open = false
                    entry.onClick()
                }
                Column(
                    Modifier
                        .offset { IntOffset((dx * progress.value * density).roundToInt(), (dy * progress.value * density).roundToInt()) }
                        .graphicsLayer { alpha = progress.value; scaleX = progress.value; scaleY = progress.value }
                        .clickable(onClickLabel = entry.label) { select() }, // chạm cả nhãn cũng được
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    SmallFloatingActionButton(onClick = select) { Text(entry.icon, style = MaterialTheme.typography.titleMedium) }
                    Surface(shape = MaterialTheme.shapes.small, tonalElevation = 2.dp) {
                        Text(entry.label, style = MaterialTheme.typography.labelSmall,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp))
                    }
                }
            }
        }
        FloatingActionButton(
            onClick = {
                haptic.performHapticFeedback(HapticFeedbackType.LongPress)
                open = !open
            },
            modifier = fabModifier
        ) {
            Text("＋", style = MaterialTheme.typography.headlineSmall, modifier = Modifier.graphicsLayer { rotationZ = rotation })
        }
    }
}
