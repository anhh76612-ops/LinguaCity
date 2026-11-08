package com.project.linguacity.ui.loading

import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
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
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.drawscope.rotate
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.project.linguacity.ui.motion.LocalReduceMotion
import kotlinx.coroutines.delay

/** Mỗi điểm đến một kiểu loading riêng (FR-UI-02, SCR-15). */
enum class LoadingKind(val title: String) {
    CITY("Mai đang dựng thành phố…"),
    SYNC("Đang chuẩn bị nội dung học…"),
    CARDS("Đang xếp thẻ từ…"),
    MEDAL("Đang mở tủ danh hiệu…"),
    PROFILE("Đang mở hồ sơ…"),
    LESSON("Mai đang soạn bài cho bạn…")
}

/** Mẹo của Mai hiện kèm màn loading — biến thời gian chờ thành thời gian học. */
object MaiTips {
    val all = listOf(
        "Thẻ từ xem được cả khi không có mạng đó.",
        "Từ chưa sưu tầm luôn được ưu tiên trong bài học.",
        "5 bài đầu mỗi ngày nhận đủ KP — học đều mỗi ngày lợi hơn học dồn.",
        "Bài học được giữ 30 phút, lỡ thoát ra vẫn làm tiếp được.",
        "Có những danh hiệu chỉ xuất hiện khi bạn vô tình làm được…",
        "Câu điền từ không phân biệt chữ hoa, chữ thường đâu, cứ yên tâm."
    )
    fun pick(seed: Int) = all[Math.floorMod(seed, all.size)]
}

/** Chỉ hiện loading nếu chờ lâu hơn [delayMillis] — tránh nháy màn hình khi dữ liệu về ngay. */
@Composable
fun DelayedLoading(kind: LoadingKind, modifier: Modifier = Modifier, delayMillis: Long = 150) {
    var show by remember { mutableStateOf(false) }
    LaunchedEffect(Unit) {
        delay(delayMillis)
        show = true
    }
    if (show) {
        DestinationLoading(kind, modifier)
    }
}

@Composable
fun DestinationLoading(kind: LoadingKind, modifier: Modifier = Modifier) {
    val tip = remember { MaiTips.pick((System.currentTimeMillis() / 1000).toInt()) }
    Column(
        modifier.fillMaxSize().padding(32.dp),
        verticalArrangement = Arrangement.spacedBy(18.dp, Alignment.CenterVertically),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Box(Modifier.size(120.dp), contentAlignment = Alignment.Center) { LoadingArt(kind) }
        Text(kind.title, style = MaterialTheme.typography.titleMedium)
        Text("Mẹo của Mai: $tip", style = MaterialTheme.typography.bodyMedium,
            textAlign = TextAlign.Center,
            color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

@Composable
private fun LoadingArt(kind: LoadingKind) {
    val reduce = LocalReduceMotion.current
    val t by rememberInfiniteTransition(label = "loading").animateFloat(
        0f, 1f, infiniteRepeatable(
            tween(if (reduce) 1 else 900, easing = FastOutSlowInEasing),
            RepeatMode.Reverse
        ),
        label = "t"
    )
    val phase = if (reduce) 0.5f else t
    val primary = MaterialTheme.colorScheme.primary
    val soft = MaterialTheme.colorScheme.primaryContainer
    when (kind) {
        LoadingKind.CITY, LoadingKind.SYNC -> Canvas(Modifier.size(110.dp)) {
            // ba toà nhà mọc lên lần lượt
            val w = size.width / 4
            listOf(0.55f, 0.85f, 0.7f).forEachIndexed { i, hMax ->
                val grow = ((phase * 1.6f - i * 0.25f).coerceIn(0.15f, 1f))
                val h = size.height * hMax * grow
                drawRoundRect(if (i == 1) primary else soft, Offset(
                    w * 0.4f + i * w * 1.1f,
                    size.height - h
                ),
                    Size(w * 0.9f, h), CornerRadius(8f))
            }
        }
        LoadingKind.CARDS -> Canvas(Modifier.size(110.dp)) {
            // chồng thẻ xoè ra
            for (i in 0..2) {
                rotate((i - 1) * 18f * phase, Offset(size.width / 2, size.height * 0.9f)) {
                    drawRoundRect(if (i == 1) primary else soft, Offset(
                        size.width * 0.3f,
                        size.height * 0.15f
                    ),
                        Size(size.width * 0.4f, size.height * 0.62f), CornerRadius(14f))
                }
            }
        }
        LoadingKind.MEDAL -> Text("🏅", style = MaterialTheme.typography.displayLarge,
            modifier = Modifier.graphicsLayer { rotationY = 360f * phase })
        LoadingKind.PROFILE -> Canvas(Modifier.size(100.dp)) {
            drawCircle(soft.copy(alpha = 0.4f + 0.6f * phase))
            drawCircle(
                primary,
                radius = size.minDimension * 0.18f,
                center = Offset(size.width / 2, size.height * 0.4f)
            )
            drawRoundRect(
                primary,
                topLeft = Offset(size.width * 0.25f, size.height * 0.62f),
                size = Size(size.width * 0.5f, size.height * 0.25f),
                cornerRadius = CornerRadius(30f)
            )
        }
        LoadingKind.LESSON -> Text(
            "📖",
            style = MaterialTheme.typography.displayLarge,
            modifier = Modifier.graphicsLayer {
                translationY = -24f * phase
                scaleX = 0.9f + 0.1f * phase
                scaleY = 0.9f + 0.1f * phase
            }
        )
    }
}
