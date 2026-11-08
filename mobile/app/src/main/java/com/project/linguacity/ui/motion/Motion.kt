package com.project.linguacity.ui.motion

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay

/*
 * Hiệu ứng dùng chung (FR-UI-04). Tất cả tôn trọng cài đặt "Giảm hiệu ứng chuyển động" (FR-UI-05):
 * khi bật, mọi animation có thời lượng 0 và skeleton không chạy shimmer.
 */

/** true = người chơi tắt hiệu ứng chuyển động (SettingsStore.reduceMotion). */
val LocalReduceMotion = compositionLocalOf { false }

/** Thời lượng animation sau khi tính cài đặt giảm hiệu ứng. */
@Composable
fun motionMillis(base: Int): Int = if (LocalReduceMotion.current) 0 else base

/**
 * Motion choreography: phần tử thứ [index] mờ dần + trượt lên, trễ [stepMillis] × index so với phần tử trước.
 * Giới hạn trễ tối đa ~12 phần tử để danh sách dài không phải chờ lâu.
 */
fun Modifier.staggeredAppear(index: Int, stepMillis: Int = 50): Modifier = composed {
    val reduce = LocalReduceMotion.current
    var visible by remember { mutableStateOf(reduce) }
    LaunchedEffect(Unit) {
        if (!reduce) {
            delay((index.coerceIn(0, 12) * stepMillis).toLong())
            visible = true
        }
    }
    val duration = if (reduce) 0 else 320
    val alpha by animateFloatAsState(if (visible) 1f else 0f, tween(duration), label = "appearAlpha")
    val offsetDp by animateFloatAsState(if (visible) 0f else 18f, tween(duration), label = "appearOffset")
    graphicsLayer {
        this.alpha = alpha
        translationY = offsetDp * density
    }
}

/** Skeleton screen: dải sáng chạy ngang (shimmer) thay cho vòng xoay loading. */
fun Modifier.shimmer(): Modifier = composed {
    val reduce = LocalReduceMotion.current
    val base = MaterialTheme.colorScheme.surfaceVariant
    val highlight = MaterialTheme.colorScheme.surface
    val x by rememberInfiniteTransition(label = "shimmer").animateFloat(
        -1f, 2f, infiniteRepeatable(tween(1200, easing = LinearEasing)), label = "shimmerX"
    )
    drawWithContent {
        val w = size.width
        val pos = if (reduce) 0.5f else x
        drawRect(
            Brush.linearGradient(
                colors = listOf(base, highlight, base),
                start = Offset(w * pos - w * 0.6f, 0f),
                end = Offset(w * pos, size.height)
            )
        )
    }
}

@Composable
fun SkeletonBlock(modifier: Modifier = Modifier, height: Dp = 16.dp) {
    Box(modifier.height(height).clip(RoundedCornerShape(8.dp)).background(MaterialTheme.colorScheme.surfaceVariant).shimmer())
}

/** Bộ khung có hình dáng giống một danh sách thẻ (dòng tiêu đề + 2 dòng chữ). */
@Composable
fun SkeletonList(rows: Int = 6, modifier: Modifier = Modifier, withAvatar: Boolean = false) {
    Column(modifier, verticalArrangement = Arrangement.spacedBy(10.dp)) {
        repeat(rows) {
            Row(
                Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp))
                    .background(MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.35f)).padding(14.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                if (withAvatar) Box(Modifier.size(40.dp).clip(CircleShape).background(Color.Transparent).shimmer())
                Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    SkeletonBlock(Modifier.fillMaxWidth(0.45f), 18.dp)
                    SkeletonBlock(Modifier.fillMaxWidth(0.8f), 12.dp)
                }
            }
        }
    }
}
