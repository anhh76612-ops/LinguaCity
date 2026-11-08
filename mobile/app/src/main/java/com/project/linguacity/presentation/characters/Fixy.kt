package com.project.linguacity.presentation.characters

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.Canvas
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.rotate
import com.project.linguacity.presentation.city.BuildingView
import com.project.linguacity.ui.motion.LocalReduceMotion

/**
 * Biểu cảm của Fixy (character bible §2). Điểm nhấn là cặp lông mày dày chuyển động độc lập:
 * SLY hếch một bên, SURPRISED nhướng cao, WORRIED rũ chữ bát, FOCUSED nhíu sâu, SMUG nhảy lên,
 * SLEEPY cụp xuống.
 */
enum class FixyMood { SLY, SURPRISED, WORRIED, FOCUSED, SMUG, SLEEPY }

/** Góc độ (độ) và độ nâng (đơn vị lưới) của lông mày trái/phải cho từng biểu cảm. */
private fun FixyMood.brows(): FloatArray = when (this) {
    FixyMood.SLY -> floatArrayOf(10f, 2f, -22f, -5f)
    FixyMood.SURPRISED -> floatArrayOf(0f, -8f, 0f, -8f)
    FixyMood.WORRIED -> floatArrayOf(-22f, 2f, 22f, 2f)
    FixyMood.FOCUSED -> floatArrayOf(18f, 3f, -18f, 3f)
    FixyMood.SMUG -> floatArrayOf(-6f, -5f, 6f, -5f)
    FixyMood.SLEEPY -> floatArrayOf(-8f, 4f, 8f, 4f)
}

private val Ink = Color(0xFF2D3F66)

/** Cáo kỹ sư Fixy: mũ bảo hộ, yếm jean, mắt hẹp "gian" nhưng tốt bụng. */
@Composable
fun FixyPortrait(mood: FixyMood, modifier: Modifier = Modifier) {
    val reduce = LocalReduceMotion.current
    val target = mood.brows()
    val spec = if (reduce) spring<Float>(1f, 10_000f) else spring(0.45f)
    val lr by animateFloatAsState(target[0], spec, label = "lr")
    val ly by animateFloatAsState(target[1], spec, label = "ly")
    val rr by animateFloatAsState(target[2], spec, label = "rr")
    val ry by animateFloatAsState(target[3], spec, label = "ry")
    Canvas(modifier) {
        val u = size.minDimension / 120f
        fun p(x: Float, y: Float) = Offset(x * u, y * u)
        val fur = Color(0xFFE8823A)
        val line = Stroke(2f * u)
        // yếm jean
        drawPath(Path().apply {
            moveTo(20f * u, 124f * u); quadraticTo(26f * u, 104f * u, 60f * u, 104f * u)
            quadraticTo(94f * u, 104f * u, 100f * u, 124f * u); close()
        }, Color(0xFF3E6FB0))
        // tai
        for (sx in listOf(-1f, 1f)) {
            drawPath(Path().apply {
                moveTo((60f + sx * 34f) * u, 40f * u); lineTo((60f + sx * 26f) * u, 8f * u)
                lineTo((60f + sx * 10f) * u, 32f * u); close()
            }, fur)
        }
        // đầu + má trắng
        drawOval(fur, topLeft = p(24f, 32f), size = Size(72f * u, 64f * u))
        drawOval(Ink, topLeft = p(24f, 32f), size = Size(72f * u, 64f * u), style = line)
        drawPath(Path().apply {
            moveTo(30f * u, 74f * u); quadraticTo(60f * u, 104f * u, 90f * u, 74f * u)
            quadraticTo(82f * u, 94f * u, 60f * u, 96f * u); quadraticTo(38f * u, 94f * u, 30f * u, 74f * u); close()
        }, Color(0xFFFFF6E9))
        // mũ bảo hộ
        drawArc(Color(0xFFF4B740), 180f, 180f, true, topLeft = p(24f, 22f), size = Size(72f * u, 36f * u))
        drawRoundRect(Color(0xFFC48A1C), topLeft = p(20f, 38f), size = Size(80f * u, 6f * u), cornerRadius = CornerRadius(3f * u))
        // mắt hẹp
        val sleepy = mood == FixyMood.SLEEPY
        for (x in listOf(46f, 74f)) {
            if (sleepy) {
                drawLine(Ink, p(x - 6f, 63f), p(x + 6f, 63f), strokeWidth = 3f * u)
            } else {
                drawOval(Ink, topLeft = p(x - 5f, 58f), size = Size(10f * u, if (mood == FixyMood.SURPRISED) 12f * u else 7f * u))
            }
        }
        // lông mày
        rotate(lr, pivot = p(45f, 51f)) {
            drawRoundRect(Color(0xFF7A3E12), topLeft = p(36f, 48f + ly), size = Size(18f * u, 6f * u), cornerRadius = CornerRadius(3f * u))
        }
        rotate(rr, pivot = p(75f, 51f)) {
            drawRoundRect(Color(0xFF7A3E12), topLeft = p(66f, 48f + ry), size = Size(18f * u, 6f * u), cornerRadius = CornerRadius(3f * u))
        }
        // mũi + miệng
        drawOval(Ink, topLeft = p(55f, 72f), size = Size(10f * u, 7f * u))
        when (mood) {
            FixyMood.WORRIED -> drawArc(Ink, 200f, 140f, false, topLeft = p(52f, 84f), size = Size(16f * u, 6f * u), style = Stroke(2.5f * u))
            FixyMood.SURPRISED -> drawCircle(Ink, radius = 3.5f * u, center = p(60f, 86f))
            FixyMood.SMUG -> drawArc(Ink, 10f, 160f, false, topLeft = p(48f, 78f), size = Size(24f * u, 12f * u), style = Stroke(2.5f * u))
            else -> drawLine(Ink, p(52f, 84f), p(68f, 80f), strokeWidth = 2.5f * u) // nhếch mép
        }
    }
}

/** Fixy nói gì về một công trình (mục 11: báo tiến độ, nhắc nâng cấp). */
fun fixyLineFor(b: BuildingView, hasBlueprint: Boolean): Pair<FixyMood, String> = when {
    b.upgrading && b.progress >= 1f -> FixyMood.SMUG to "Xong rồi đó sếp, chờ máy chủ ký biên bản thôi!"
    b.upgrading -> FixyMood.FOCUSED to "Đang gõ búa đây sếp, ${(b.progress * 100).toInt()}% rồi!"
    !b.isBuilt -> FixyMood.SLY to "Đất đẹp đấy sếp. Gom đủ từ là tui xây ngay, giá hữu nghị~"
    b.isMaxLevel -> FixyMood.SMUG to "Công trình đẹp nhất phố rồi, khỏi sửa gì nữa!"
    hasBlueprint -> FixyMood.SURPRISED to "Có bản vẽ rồi kìa! Bấm nâng cấp là tui làm liền."
    else -> FixyMood.SLY to "Muốn lên level thì thi lấy bản vẽ trước nha sếp."
}
