package com.project.linguacity.ui.components

import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.layout.layout
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Khối đất sét (claymorphism, concept §9.2): 4 lớp vẽ từ dưới lên:
 * 1. bóng mềm [shadow] lệch xuống dưới;
 * 2. cạnh dưới [edge] dày [elevation] (độ dày của khối);
 * 3. mặt khối [color];
 * 4. vệt sáng [glow] ở mép trên.
 *
 * Modifier tự chừa [elevation] ở đáy (layout cao thêm [elevation]); mặt khối có đúng kích thước nội dung. Khi [press] = 1, mặt khối lún
 * xuống 70% độ dày và phình ngang 4%, cạnh dưới đứng yên. Nội dung đi theo mặt khối.
 *
 * [press] là lambda để đọc giá trị animation ở pha vẽ, không recompose mỗi khung hình.
 */
fun Modifier.clay(
    color: Color,
    edge: Color,
    glow: Color,
    shadow: Color,
    elevation: Dp = 6.dp,
    corner: Dp = 16.dp,
    border: Color = Color.Transparent,
    press: () -> Float = { 0f }
): Modifier = this
    // chừa chỗ cho độ dày ở đáy: nội dung giữ kích thước gốc, khối cao thêm `elevation`
    .layout { measurable, constraints ->
        val extra = elevation.roundToPx()
        val placeable = measurable.measure(
            constraints.copy(
                minHeight = (constraints.minHeight - extra).coerceAtLeast(0),
                maxHeight = if (constraints.hasBoundedHeight) {
                    (constraints.maxHeight - extra).coerceAtLeast(0)
                } else {
                    constraints.maxHeight
                }
            )
        )
        layout(placeable.width, placeable.height + extra) { placeable.place(0, 0) }
    }
    .drawBehind {
        val e = elevation.toPx()
        val r = CornerRadius(corner.toPx())
        val p = press().coerceIn(0f, 1f) // bóng không cần overshoot
        // các modifier sau `layout` có kích thước của mặt khối; phần dày vẽ tràn xuống vùng chừa sẵn
        val faceH = size.height
        // 1. bóng mềm: thu lại khi nhấn
        val shadowDrop = e * (1f - p) + 6.dp.toPx() * (1f - p * 0.6f)
        drawRoundRect(
            shadow,
            topLeft = Offset(2.dp.toPx(), shadowDrop),
            size = Size(size.width - 4.dp.toPx(), faceH),
            cornerRadius = r
        )
        // 2. cạnh dưới
        drawRoundRect(edge, topLeft = Offset(0f, e), size = Size(size.width, faceH), cornerRadius = r)
    }
    .graphicsLayer {
        // cho phép âm một chút: spring khi thả tay nảy vượt lên trên vị trí nghỉ (overshoot)
        val p = press().coerceIn(-0.4f, 1f)
        translationY = elevation.toPx() * 0.7f * p
        scaleX = 1f + 0.04f * p.coerceAtLeast(0f)
        transformOrigin = androidx.compose.ui.graphics.TransformOrigin(0.5f, 1f)
    }
    .drawBehind {
        val r = CornerRadius(corner.toPx())
        val faceH = size.height
        // 3. mặt khối
        drawRoundRect(color, size = Size(size.width, faceH), cornerRadius = r)
        // 4. vệt sáng mép trên
        val g = 3.dp.toPx()
        drawRoundRect(
            glow,
            topLeft = Offset(corner.toPx() * 0.6f, g * 0.6f),
            size = Size(size.width - corner.toPx() * 1.2f, g),
            cornerRadius = CornerRadius(g)
        )
        if (border != Color.Transparent) {
            drawRoundRect(
                border, size = Size(size.width, faceH), cornerRadius = r,
                style = Stroke(1.5.dp.toPx())
            )
        }
    }
