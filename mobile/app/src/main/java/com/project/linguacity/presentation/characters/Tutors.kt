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
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.rotate
import com.project.linguacity.ui.motion.LocalReduceMotion

/*
 * S5: rig vector của Giáo sư Echo (vẹt) và Gấu Bơ, vẽ bằng Canvas trên lưới 120×124 giống bản phác
 * trong style guide. Input theo character bible: look (hướng mắt -1..1), mood, handsUp (che mắt).
 * Sau này có file Rive thì thay phần vẽ, giữ nguyên tham số.
 */

private val Ink = Color(0xFF2D3F66)

enum class EchoMood { READ, YAWN, PLEASED, STERN }

enum class BoMood { IDLE, HINT, CHEER, SORRY }

/** Persona hiện tại của Bơ (character bible §4). Bản đầu: mặc định và cổ trang. */
enum class BoPersona { DEFAULT, CO_TRANG }

@Composable
private fun animatedLook(look: Offset): Offset {
    val reduce = LocalReduceMotion.current
    val x by animateFloatAsState(if (reduce) 0f else look.x, spring(0.6f), label = "lookX")
    val y by animateFloatAsState(if (reduce) 0f else look.y, spring(0.6f), label = "lookY")
    return Offset(x, y)
}

private fun DrawScope.eye(c: Offset, r: Float, u: Float, look: Offset, closed: Boolean) {
    if (closed) {
        drawArc(Ink, 200f, 140f, false, topLeft = Offset(c.x - r, c.y - r * 0.5f),
            size = Size(r * 2, r), style = Stroke(2.4f * u))
        return
    }
    drawOval(Color.White, topLeft = Offset(c.x - r, c.y - r * 1.15f), size = Size(r * 2, r * 2.3f))
    drawOval(Ink, topLeft = Offset(c.x - r, c.y - r * 1.15f), size = Size(r * 2, r * 2.3f),
        style = Stroke(2f * u))
    val p = Offset(c.x + look.x * r * 0.4f, c.y + look.y * r * 0.4f)
    drawCircle(Ink, radius = r * 0.55f, center = p)
    drawCircle(Color.White, radius = r * 0.2f, center = Offset(p.x + r * 0.2f, p.y - r * 0.25f))
}

/** Giáo sư Echo: vẹt xanh lá, kính tròn to, gile len nâu, ôm sách. */
@Composable
fun EchoPortrait(mood: EchoMood, modifier: Modifier = Modifier, look: Offset = Offset.Zero) {
    val l = animatedLook(look)
    Canvas(modifier) {
        val u = size.minDimension / 120f
        fun p(x: Float, y: Float) = Offset(x * u, y * u)
        val line = Stroke(2f * u)
        // gile
        drawPath(Path().apply {
            moveTo(24f * u, 122f * u); quadraticTo(30f * u, 96f * u, 60f * u, 96f * u)
            quadraticTo(90f * u, 96f * u, 96f * u, 122f * u); close()
        }, Color(0xFF9C6B3E))
        // cánh đỏ
        drawOval(Color(0xFFD9654B), topLeft = p(16f, 66f), size = Size(18f * u, 38f * u))
        drawOval(Color(0xFFD9654B), topLeft = p(86f, 66f), size = Size(18f * u, 38f * u))
        // đầu
        drawOval(Color(0xFF4CAF6A), topLeft = p(26f, 24f), size = Size(68f * u, 72f * u))
        drawOval(Ink, topLeft = p(26f, 24f), size = Size(68f * u, 72f * u), style = line)
        drawPath(Path().apply { moveTo(50f * u, 24f * u); quadraticTo(60f * u, 8f * u, 70f * u, 24f * u); close() },
            Color(0xFF7CC66B))
        // mắt + kính
        val closed = mood == EchoMood.YAWN
        eye(p(46f, 56f), 7f * u, u, l, closed)
        eye(p(74f, 56f), 7f * u, u, l, closed)
        drawCircle(Ink, radius = 11f * u, center = p(46f, 56f), style = Stroke(3f * u))
        drawCircle(Ink, radius = 11f * u, center = p(74f, 56f), style = Stroke(3f * u))
        drawLine(Ink, p(57f, 56f), p(63f, 56f), strokeWidth = 3f * u)
        // lông mày
        val tilt = when (mood) {
            EchoMood.STERN -> 10f
            EchoMood.PLEASED -> -6f
            else -> 0f
        }
        val lift = if (mood == EchoMood.PLEASED) -3f else 0f
        rotate(tilt, pivot = p(45f, 41f)) {
            drawRoundRect(Color(0xFF2E7A47), topLeft = p(36f, 39f + lift), size = Size(18f * u, 4f * u),
                cornerRadius = CornerRadius(2f * u))
        }
        rotate(-tilt, pivot = p(75f, 41f)) {
            drawRoundRect(Color(0xFF2E7A47), topLeft = p(66f, 39f + lift), size = Size(18f * u, 4f * u),
                cornerRadius = CornerRadius(2f * u))
        }
        // mỏ: ngáp thì há to
        val open = when (mood) {
            EchoMood.YAWN -> 18f
            EchoMood.PLEASED -> 8f
            else -> 10f
        }
        drawPath(Path().apply {
            moveTo(52f * u, 70f * u); quadraticTo(60f * u, 66f * u, 68f * u, 70f * u)
            quadraticTo(60f * u, (70f + open * 1.4f) * u, 52f * u, 70f * u); close()
        }, Color(0xFFF4A261))
        // sách
        drawRoundRect(Color(0xFF8B5E3C), topLeft = p(34f, 98f), size = Size(52f * u, 20f * u),
            cornerRadius = CornerRadius(3f * u))
        drawRect(Color(0xFFF9F6F0), topLeft = p(38f, 100f), size = Size(44f * u, 14f * u))
        drawLine(Color(0xFF8B5E3C), p(60f, 100f), p(60f, 114f), strokeWidth = 1.5f * u)
    }
}

/** Gấu Bơ: gấu mật ong, hoodie kem; persona cổ trang thêm áo đỏ đất và búi tóc. */
@Composable
fun BoPortrait(
    mood: BoMood,
    modifier: Modifier = Modifier,
    look: Offset = Offset.Zero,
    persona: BoPersona = BoPersona.CO_TRANG,
    handsUp: Boolean = false
) {
    val l = animatedLook(look)
    val reduce = LocalReduceMotion.current
    val hands by animateFloatAsState(if (handsUp) 1f else 0f,
        if (reduce) spring(1f, 10_000f) else spring(0.5f), label = "hands")
    Canvas(modifier) {
        val u = size.minDimension / 120f
        fun p(x: Float, y: Float) = Offset(x * u, y * u)
        val line = Stroke(2f * u)
        val fur = Color(0xFFC98A4B)
        val body = if (persona == BoPersona.CO_TRANG) Color(0xFFB5543A) else Color(0xFFFFF6E9)
        // tai
        for (x in listOf(30f, 90f)) {
            drawCircle(fur, radius = 12f * u, center = p(x, 30f))
            drawCircle(Ink, radius = 12f * u, center = p(x, 30f), style = line)
            drawCircle(Color(0xFFE9B98A), radius = 5f * u, center = p(x, 30f))
        }
        // thân
        drawPath(Path().apply {
            moveTo(24f * u, 124f * u); quadraticTo(30f * u, 100f * u, 60f * u, 100f * u)
            quadraticTo(90f * u, 100f * u, 96f * u, 124f * u); close()
        }, body)
        // đầu
        drawCircle(fur, radius = 36f * u, center = p(60f, 62f))
        drawCircle(Ink, radius = 36f * u, center = p(60f, 62f), style = line)
        drawOval(Color(0xFFE9B98A), topLeft = p(44f, 66f), size = Size(32f * u, 24f * u))
        // mắt
        val happy = mood == BoMood.CHEER
        eye(p(46f, 58f), 8f * u, u, l, happy)
        eye(p(74f, 58f), 8f * u, u, l, happy)
        // lông mày
        val sad = mood == BoMood.SORRY
        rotate(if (sad) -14f else 0f, pivot = p(45f, 44f)) {
            drawLine(Color(0xFF7A4A2A), p(38f, 44f), p(52f, 44f), strokeWidth = 3f * u)
        }
        rotate(if (sad) 14f else 0f, pivot = p(75f, 44f)) {
            drawLine(Color(0xFF7A4A2A), p(68f, 44f), p(82f, 44f), strokeWidth = 3f * u)
        }
        // mũi + miệng
        drawOval(Ink, topLeft = p(55f, 70f), size = Size(10f * u, 7f * u))
        when (mood) {
            BoMood.SORRY -> drawArc(Ink, 200f, 140f, false, topLeft = p(52f, 82f), size = Size(16f * u, 8f * u), style = Stroke(2.5f * u))
            BoMood.HINT -> drawCircle(Ink, radius = 3f * u, center = p(60f, 84f))
            else -> drawArc(Ink, 20f, 140f, false, topLeft = p(52f, 76f), size = Size(16f * u, 9f * u), style = Stroke(2.5f * u))
        }
        // persona cổ trang: búi tóc + trâm vàng
        if (persona == BoPersona.CO_TRANG) {
            drawOval(Ink, topLeft = p(50f, 16f), size = Size(20f * u, 16f * u))
            drawRect(Color(0xFFC48A1C), topLeft = p(57f, 6f), size = Size(6f * u, 10f * u))
        }
        // tay: nghỉ / giơ ngón cái / che mắt
        val restY = 108f
        val upY = 58f
        val y = restY + (upY - restY) * hands
        val cheer = mood == BoMood.CHEER && !handsUp
        for (x in listOf(42f, 78f)) {
            val hy = if (cheer) 92f else y
            drawCircle(fur, radius = 10f * u, center = p(x, hy))
            drawCircle(Ink, radius = 10f * u, center = p(x, hy), style = line)
            if (cheer) {
                drawRoundRect(fur, topLeft = p(x - 3f, hy - 18f), size = Size(6f * u, 12f * u), cornerRadius = CornerRadius(3f * u))
                drawRoundRect(Ink, topLeft = p(x - 3f, hy - 18f), size = Size(6f * u, 12f * u), cornerRadius = CornerRadius(3f * u), style = Stroke(1.5f * u))
            }
        }
    }
}
