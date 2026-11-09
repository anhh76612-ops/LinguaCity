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
 * Chân dung 2D của Mai theo character bible "Cozy Toy Town" (docs/04-ui/redesign/character-bible.md):
 * tóc nâu búi hai bên, kẹp tóc viên gạch chữ L, sơ mi kem, gile navy, nơ cổ cam đất, má hồng.
 * Vẽ bằng code trên lưới 120×124 (khớp bản phác trong style guide). Biểu cảm: [MaiMood].
 */
@Composable
fun MaiPortrait(mood: MaiMood, modifier: Modifier = Modifier) {
    Canvas(modifier) {
        val u = size.minDimension / 120f
        fun p(x: Float, y: Float) = Offset(x * u, y * u)
        val ink = Color(0xFF2D3F66)
        val hair = Color(0xFF7A4A2A)
        val skin = Color(0xFFFFE3C4)
        val line = Stroke(width = 2f * u)
        // nền tròn kem
        drawCircle(Color(0xFFFFF6E9), radius = 60f * u, center = p(60f, 60f))
        // thân: sơ mi kem + gile navy + nơ cam
        drawRoundRect(Color(0xFFFFF6E9), topLeft = p(34f, 88f), size = Size(52f * u, 40f * u),
            cornerRadius = androidx.compose.ui.geometry.CornerRadius(16f * u))
        drawRoundRect(ink, topLeft = p(34f, 88f), size = Size(52f * u, 40f * u),
            cornerRadius = androidx.compose.ui.geometry.CornerRadius(16f * u), style = line)
        drawRect(ink, topLeft = p(40f, 96f), size = Size(40f * u, 30f * u))
        drawPath(Path().apply { moveTo(52f * u, 88f * u); lineTo(60f * u, 98f * u); lineTo(68f * u, 88f * u); close() },
            Color(0xFFFFF6E9))
        for (sx in listOf(-1f, 1f)) {
            drawPath(Path().apply {
                moveTo(60f * u, 95f * u); lineTo((60f + sx * 10f) * u, 89f * u)
                lineTo((60f + sx * 10f) * u, 101f * u); close()
            }, Color(0xFFE0784F))
        }
        drawCircle(Color(0xFFC9783A), radius = 3f * u, center = p(60f, 95f))
        // búi tóc hai bên
        drawCircle(hair, radius = 14f * u, center = p(32f, 28f))
        drawCircle(hair, radius = 14f * u, center = p(88f, 28f))
        drawCircle(ink, radius = 14f * u, center = p(32f, 28f), style = line)
        drawCircle(ink, radius = 14f * u, center = p(88f, 28f), style = line)
        // mặt
        drawCircle(skin, radius = 32f * u, center = p(60f, 58f))
        drawCircle(ink, radius = 32f * u, center = p(60f, 58f), style = line)
        // mái tóc
        drawPath(Path().apply {
            moveTo(28f * u, 56f * u)
            cubicTo(28f * u, 34f * u, 42f * u, 24f * u, 60f * u, 24f * u)
            cubicTo(78f * u, 24f * u, 92f * u, 34f * u, 92f * u, 56f * u)
            cubicTo(84f * u, 46f * u, 72f * u, 42f * u, 60f * u, 42f * u)
            cubicTo(48f * u, 42f * u, 36f * u, 46f * u, 28f * u, 56f * u)
            close()
        }, hair)
        // kẹp tóc viên gạch chữ L
        drawRoundRect(Color(0xFFD9654B), topLeft = p(73f, 31f), size = Size(12f * u, 7f * u),
            cornerRadius = androidx.compose.ui.geometry.CornerRadius(2f * u))
        drawRoundRect(Color(0xFFA8432F), topLeft = p(73f, 31f), size = Size(12f * u, 7f * u),
            cornerRadius = androidx.compose.ui.geometry.CornerRadius(2f * u), style = Stroke(1f * u))
        // má hồng
        drawOval(Color(0xCCF4A3A3), topLeft = p(34f, 68f), size = Size(12f * u, 7f * u))
        drawOval(Color(0xCCF4A3A3), topLeft = p(74f, 68f), size = Size(12f * u, 7f * u))
        face(mood, 60f * u, 120f * u, 116f * u)
    }
}

private fun DrawScope.face(mood: MaiMood, cx: Float, w: Float, h: Float) {
    val ink = Color(0xFF2D3F66)
    val stroke = Stroke(width = w * 0.025f, cap = StrokeCap.Round)
    val eyeY = h * 0.54f
    val dx = w * 0.11f
    // lông mày
    val browLift = when (mood) {
        MaiMood.SURPRISED -> -h * 0.05f
        MaiMood.ENCOURAGE -> -h * 0.02f
        MaiMood.POUT -> h * 0.02f
        else -> 0f
    }
    // lông mày nghiêng: lo lắng thì rũ chữ bát, giận dỗi thì chau lại
    val browTilt = when (mood) {
        MaiMood.WORRIED -> -h * 0.025f
        MaiMood.POUT -> h * 0.025f
        else -> 0f
    }
    for (side in listOf(-1f, 1f)) {
        drawLine(ink, Offset(cx + side * dx - w * 0.05f, eyeY - h * 0.07f + browLift - side * browTilt),
            Offset(
                cx + side * dx + w * 0.05f,
                eyeY - h * 0.075f + browLift + side * browTilt
            ), strokeWidth = w * 0.018f, cap = StrokeCap.Round)
    }
    // mắt
    when (mood) {
        MaiMood.HAPPY -> for (side in listOf(-1f, 1f)) { // mắt cười ^^
            drawArc(ink, 200f, 140f, false, topLeft = Offset(
                cx + side * dx - w * 0.04f,
                eyeY - h * 0.02f
            ),
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
        MaiMood.SLEEPY, MaiMood.SLY -> for (side in listOf(-1f, 1f)) { // mắt lim dim / híp
            drawLine(ink, Offset(cx + side * dx - w * 0.04f, eyeY), Offset(cx + side * dx + w * 0.04f, eyeY),
                strokeWidth = w * 0.022f, cap = StrokeCap.Round)
        }
        else -> for (side in listOf(-1f, 1f)) {
            drawCircle(ink, radius = w * 0.04f, center = Offset(cx + side * dx, eyeY))
            drawCircle(
                Color.White,
                radius = w * 0.01f,
                center = Offset(cx + side * dx + w * 0.01f, eyeY - h * 0.01f)
            )
        }
    }
    // miệng
    val mouthY = h * 0.66f
    when (mood) {
        MaiMood.SURPRISED -> drawOval(Color(0xFFB34A4A), topLeft = Offset(
            cx - w * 0.035f,
            mouthY - h * 0.02f
        ),
            size = Size(w * 0.07f, h * 0.06f))
        MaiMood.HAPPY -> {
            val path = Path().apply {
                moveTo(cx - w * 0.08f, mouthY - h * 0.01f)
                quadraticTo(cx, mouthY + h * 0.08f, cx + w * 0.08f, mouthY - h * 0.01f)
                close()
            }
            drawPath(path, Color(0xFFB34A4A))
        }
        MaiMood.POUT -> {
            // phồng má + miệng chu
            drawCircle(Color(0x88F4A3A3), radius = w * 0.07f, center = Offset(cx - w * 0.17f, mouthY - h * 0.02f))
            drawCircle(Color(0x88F4A3A3), radius = w * 0.07f, center = Offset(cx + w * 0.17f, mouthY - h * 0.02f))
            drawCircle(ink, radius = w * 0.018f, center = Offset(cx, mouthY), style = stroke)
        }
        MaiMood.SLY -> drawArc(ink, 10f, 120f, false, topLeft = Offset(cx - w * 0.02f, mouthY - h * 0.05f),
            size = Size(w * 0.1f, h * 0.06f), style = stroke)
        MaiMood.WORRIED -> drawArc(ink, 200f, 140f, false, topLeft = Offset(cx - w * 0.06f, mouthY),
            size = Size(w * 0.12f, h * 0.05f), style = stroke)
        MaiMood.SLEEPY -> drawOval(Color(0xFFB34A4A), topLeft = Offset(cx - w * 0.02f, mouthY - h * 0.01f),
            size = Size(w * 0.04f, h * 0.04f))
        else -> drawArc(ink, 20f, 140f, false, topLeft = Offset(cx - w * 0.07f, mouthY - h * 0.05f),
            size = Size(w * 0.14f, h * 0.07f), style = stroke)
    }
}
