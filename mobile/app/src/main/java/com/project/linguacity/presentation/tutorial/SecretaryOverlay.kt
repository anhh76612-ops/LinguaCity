package com.project.linguacity.presentation.tutorial

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.BlendMode
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.CompositingStrategy
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay

/**
 * SCR-16 Overlay thư ký Mai (ADR-014): làm tối màn hình, khoanh sáng phần tử [GuideLine.target],
 * chân dung Mai + hộp thoại chữ chạy. Mọi thao tác trong tutorial đi qua nút của Mai, nên overlay
 * chặn chạm
 * ra ngoài (người chơi không lạc bước).
 */
@Composable
fun SecretaryOverlay(state: TutorialUiState, onNext: () -> Unit, onAct: () -> Unit) {
    val script = state.script ?: return
    val line = state.line ?: return
    val registry = LocalSpotlight.current
    val hole = line.target?.let { registry?.rects?.get(it) }

    val pulse by rememberInfiniteTransition(label = "spot").animateFloat(
        0.0f, 1f, infiniteRepeatable(tween(900), RepeatMode.Reverse), label = "pulse"
    )

    BoxWithConstraints(
        Modifier.fillMaxSize()
            .clickable(
                interactionSource = remember { MutableInteractionSource() },
                indication = null
            ) { }
    ) {
        val screenHeightPx = constraints.maxHeight.toFloat()
        Canvas(Modifier.fillMaxSize()
            .graphicsLayer(compositingStrategy = CompositingStrategy.Offscreen)) {
            drawRect(Color.Black.copy(alpha = 0.55f))
            if (hole != null) {
                val pad = 10.dp.toPx()
                val topLeft = Offset(hole.left - pad, hole.top - pad)
                val sz = Size(hole.width + 2 * pad, hole.height + 2 * pad)
                drawRoundRect(
                    Color.Transparent,
                    topLeft,
                    sz,
                    CornerRadius(18.dp.toPx()),
                    blendMode = BlendMode.Clear
                )
                drawRoundRect(Color(0xFFFFD54F).copy(alpha = 0.5f + 0.5f * pulse), topLeft, sz,
                    CornerRadius(18.dp.toPx()),
                    style = Stroke(width = (3 + 2 * pulse).dp.toPx()))
            }
        }

        // Hộp thoại ở nửa màn hình không bị khoanh (tránh che nút đang được chỉ)
        val alignTop = hole != null && hole.center.y > screenHeightPx * 0.5f
        Column(
            Modifier.align(if (alignTop) Alignment.TopCenter else Alignment.BottomCenter)
                .statusBarsPadding().navigationBarsPadding().padding(16.dp)
        ) {
            AnimatedVisibility(
                true,
                enter = fadeIn() + slideInVertically { it / 3 },
                exit = fadeOut()
            ) {
                Row(verticalAlignment = Alignment.Bottom) {
                    MaiPortrait(line.mood, Modifier.size(96.dp))
                    Spacer(Modifier.width(8.dp))
                    DialogBox(script, state, line, onNext, onAct)
                }
            }
        }
    }
}

@Composable
private fun RowScope.DialogBox(
    script: GuideScript,
    state: TutorialUiState,
    line: GuideLine,
    onNext: () -> Unit,
    onAct: () -> Unit
) {
    // Chữ chạy từng ký tự; chạm vào hộp thoại để hiện hết ngay. Tắt hiệu ứng (FR-UI-05) → hiện hết
    // luôn.
    val reduceMotion = com.project.linguacity.ui.motion.LocalReduceMotion.current
    var shown by remember(
        script.id,
        state.lineIndex
    ) { mutableIntStateOf(if (reduceMotion) line.text.length else 0) }
    LaunchedEffect(script.id, state.lineIndex) {
        while (shown < line.text.length) {
            delay(22)
            shown++
        }
    }
    val done = shown >= line.text.length
    Card(
        Modifier.weight(1f).clickable { if (!done) shown = line.text.length },
        shape = RoundedCornerShape(
            topStart = 18.dp,
            topEnd = 18.dp,
            bottomEnd = 18.dp,
            bottomStart = 4.dp
        )
    ) {
        Column(Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Text("Mai · Thư ký thành phố", style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.primary)
            Text(
                line.text.take(shown),
                style = MaterialTheme.typography.bodyLarge,
                modifier = Modifier.heightIn(min = 48.dp)
            )
            Row(
                Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.End,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    "${state.lineIndex + 1}/${script.lines.size}",
                    style = MaterialTheme.typography.labelSmall
                )
                Spacer(Modifier.weight(1f))
                when {
                    !done -> TextButton(onClick = { shown = line.text.length }) {
                        Text("Bỏ qua chữ")
                    }
                    !state.isLastLine -> Button(onClick = onNext) { Text("Tiếp") }
                    script.actionLabel != null -> Button(onClick = onAct, enabled = !state.busy) {
                        Text(if (state.busy) "Đợi chút…" else script.actionLabel)
                    }
                    else -> CircularProgressIndicator(Modifier.size(24.dp), strokeWidth = 3.dp)
                }
            }
        }
    }
}
