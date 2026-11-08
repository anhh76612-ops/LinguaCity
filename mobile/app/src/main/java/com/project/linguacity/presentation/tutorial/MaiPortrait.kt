package com.project.linguacity.presentation.tutorial

import androidx.compose.foundation.Canvas
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.StrokeCap

/**
 * Chân dung 2D của Mai, vẽ bằng code (không dùng asset ngoài — giống quy ước city-web, GDD §6.2).
 * 4 biểu cảm: chào, vui, động viên, ngạc nhiên (ADR-014).
 */
@Composable
fun MaiPortrait(mood: MaiMood, modifier: Modifier = Modifier) {
    Canvas(modifier) {
        val w = size.width
        val h = size.height
        val cx = w / 2
        // nền tròn
        drawCircle(Color(0xFFFFE6C7), radius = w * 0.5f, center = Offset(cx, h * 0.5f))
        // áo vest xanh + cổ áo trắng + bảng tên
        drawOval(Color(0xFF3F5A8F), topLeft = Offset(w * 0.12f, h * 0.70f), size = Size(w * 0.76f, h * 0.55f))
        val collar = Path().apply {
            moveTo(cx - w * 0.14f, h * 0.72f); lineTo(cx, h * 0.86f); lineTo(cx + w * 0.14f, h * 0.72f); close()
        }
        drawPath(collar, Color.White)
        drawRoundRect(Color(0xFFF2C94C), topLeft = Offset(cx + w * 0.12f, h * 0.80f), size = Size(w * 0.13f, h * 0.07f),
            cornerRadius = androidx.compose.ui.geometry.CornerRadius(w * 0.02f))
        // cổ
        drawRect(Color(0xFFF3C9A8), topLeft = Offset(cx - w * 0.07f, h * 0.60f), size = Size(w * 0.14f, h * 0.13f))
        // tóc phía sau
        drawOval(Color(0xFF4A2E22), topLeft = Offset(w * 0.20f, h * 0.14f), size = Size(w * 0.60f, h * 0.60f))
        // mặt
        drawOval(Color(0xFFF8D7BC), topLeft = Offset(w * 0.27f, h * 0.22f), size = Size(w * 0.46f, h * 0.48f))
        // mái tóc
        val bangs = Path().apply {
            moveTo(w * 0.25f, h * 0.40f)
            quadraticTo(w * 0.30f, h * 0.12f, cx, h * 0.15f)
            quadraticTo(w * 0.72f, h * 0.14f, w * 0.75f, h * 0.40f)
            quadraticTo(w * 0.62f, h * 0.26f, w * 0.46f, h * 0.30f)
            quadraticTo(w * 0.36f, h * 0.32f, w * 0.25f, h * 0.40f)
            close()
        }
        drawPath(bangs, Color(0xFF5A3726))
        // búi tóc
        drawCircle(Color(0xFF4A2E22), radius = w * 0.09f, center = Offset(cx, h * 0.12f))
        // má hồng
        drawCircle(Color(0x55FF7F7F), radius = w * 0.045f, center = Offset(cx - w * 0.13f, h * 0.53f))
        drawCircle(Color(0x55FF7F7F), radius = w * 0.045f, center = Offset(cx + w * 0.13f, h * 0.53f))
        face(mood, cx, w, h)
    }
}

private fun DrawScope.face(mood: MaiMood, cx: Float, w: Float, h: Float) {
    val ink = Color(0xFF3B2A25)
    val stroke = Stroke(width = w * 0.025f, cap = StrokeCap.Round)
    val eyeY = h * 0.45f
    val dx = w * 0.10f
    // lông mày
    val browLift = when (mood) { MaiMood.SURPRISED -> -h * 0.05f; MaiMood.ENCOURAGE -> -h * 0.02f; else -> 0f }
    for (side in listOf(-1f, 1f)) {
        drawLine(ink, Offset(cx + side * dx - w * 0.05f, eyeY - h * 0.07f + browLift),
            Offset(cx + side * dx + w * 0.05f, eyeY - h * 0.075f + browLift), strokeWidth = w * 0.018f, cap = StrokeCap.Round)
    }
    // mắt
    when (mood) {
        MaiMood.HAPPY -> for (side in listOf(-1f, 1f)) { // mắt cười ^^
            drawArc(ink, 200f, 140f, false, topLeft = Offset(cx + side * dx - w * 0.04f, eyeY - h * 0.02f),
                size = Size(w * 0.08f, h * 0.06f), style = stroke)
        }
        MaiMood.GREET -> { // nháy mắt phải
            drawCircle(ink, radius = w * 0.028f, center = Offset(cx - dx, eyeY))
            drawArc(ink, 200f, 140f, false, topLeft = Offset(cx + dx - w * 0.04f, eyeY - h * 0.02f),
                size = Size(w * 0.08f, h * 0.06f), style = stroke)
        }
        MaiMood.SURPRISED -> for (side in listOf(-1f, 1f)) {
            drawCircle(Color.White, radius = w * 0.042f, center = Offset(cx + side * dx, eyeY))
            drawCircle(ink, radius = w * 0.026f, center = Offset(cx + side * dx, eyeY))
        }
        MaiMood.ENCOURAGE -> for (side in listOf(-1f, 1f)) {
            drawCircle(ink, radius = w * 0.03f, center = Offset(cx + side * dx, eyeY))
            drawCircle(Color.White, radius = w * 0.01f, center = Offset(cx + side * dx + w * 0.01f, eyeY - h * 0.01f))
        }
    }
    // miệng
    val mouthY = h * 0.58f
    when (mood) {
        MaiMood.SURPRISED -> drawOval(Color(0xFFB34A4A), topLeft = Offset(cx - w * 0.035f, mouthY - h * 0.02f),
            size = Size(w * 0.07f, h * 0.06f))
        MaiMood.HAPPY -> {
            val p = Path().apply {
                moveTo(cx - w * 0.08f, mouthY - h * 0.01f)
                quadraticTo(cx, mouthY + h * 0.08f, cx + w * 0.08f, mouthY - h * 0.01f)
                close()
            }
            drawPath(p, Color(0xFFB34A4A))
        }
        else -> drawArc(ink, 20f, 140f, false, topLeft = Offset(cx - w * 0.07f, mouthY - h * 0.05f),
            size = Size(w * 0.14f, h * 0.07f), style = stroke)
    }
}
