package com.project.linguacity.ui.components

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.offset
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.project.linguacity.ui.theme.Baloo2
import com.project.linguacity.ui.theme.Brand

/**
 * Chữ bong bóng có viền dày (LEVEL UP, bảng hiệu gỗ, số cấp). `TextStyle` thường không vẽ được
 * viền dày, nên chồng 3 lớp: bóng cạnh dưới, viền `Stroke` và chữ fill.
 */
@Composable
fun CozyBubbleText(
    text: String,
    modifier: Modifier = Modifier,
    fontSize: TextUnit = 44.sp,
    fill: Color = Brand.Gold,
    depth: Color = Brand.GoldEdge,
    outline: Color = Brand.Ink,
    outlineWidth: Dp = 6.dp,
    depthOffset: Dp = 4.dp
) {
    val stroke = with(LocalDensity.current) { outlineWidth.toPx() }
    val base = TextStyle(
        fontFamily = Baloo2, fontWeight = FontWeight.ExtraBold, fontSize = fontSize,
        lineHeight = fontSize * 1.1f, textAlign = TextAlign.Center
    )
    Box(modifier) {
        // bóng cạnh dưới (độ dày khối)
        Text(
            text, Modifier.offset(y = depthOffset),
            style = base.copy(color = outline, drawStyle = Stroke(stroke, join = StrokeJoin.Round))
        )
        Text(text, Modifier.offset(y = depthOffset), style = base.copy(color = depth))
        // viền
        Text(text, style = base.copy(color = outline, drawStyle = Stroke(stroke, join = StrokeJoin.Round)))
        // chữ
        Text(text, style = base.copy(color = fill))
    }
}
