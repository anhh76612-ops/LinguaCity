package com.project.linguacity.ui.icons

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.project.linguacity.ui.theme.Baloo2
import com.project.linguacity.ui.theme.BeVietnamPro
import com.project.linguacity.ui.theme.Brand
import com.project.linguacity.ui.theme.LinguaTheme

/**
 * Logo: chữ "L" ghép từ hai khối gạch đất sét isometric; ô cửa sổ là bong bóng thoại
 * (ngôn ngữ + xây dựng). Cùng hình với `res/drawable/ic_launcher_foreground.xml`.
 */
val LinguaLogoMark: ImageVector by lazy {
    icon("LinguaLogo", viewport = 64f) {
        // khối đứng
        polygon(12f, 14f, 24f, 8f, 36f, 14f, 24f, 20f, fill = Brand.BrickLight)
        polygon(12f, 14f, 24f, 20f, 24f, 52f, 12f, 46f, fill = Brand.Brick)
        polygon(24f, 20f, 36f, 14f, 36f, 46f, 24f, 52f, fill = Brand.BrickEdge)
        // khối nằm
        polygon(24f, 44f, 40f, 36f, 56f, 44f, 40f, 52f, fill = Brand.BrickLight)
        polygon(24f, 44f, 40f, 52f, 40f, 60f, 24f, 52f, fill = Brand.Brick)
        polygon(40f, 52f, 56f, 44f, 56f, 52f, 40f, 60f, fill = Brand.BrickEdge)
        // cửa sổ bong bóng thoại
        path("M15.5,24h6a2,2 0 0 1 2,2v6a2,2 0 0 1 -2,2h-2l-3,3v-3h-1a2,2 0 0 1 -2,-2v-6a2,2 0 0 1 2,-2Z", Brand.Cream)
        circle(17f, 29f, 1f, Brand.Ink)
        circle(20f, 29f, 1f, Brand.Ink)
        path("M13,15.5L21,12", stroke = Color(0x8CFFFFFF), width = 1.6f)
    }
}

/** Logo + wordmark "LinguaCity" + khẩu hiệu. */
@Composable
fun LinguaWordmark(
    modifier: Modifier = Modifier,
    markSize: Dp = 64.dp,
    showTagline: Boolean = true,
    color: Color = LinguaTheme.colors.ink
) {
    Row(
        modifier,
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Image(LinguaLogoMark, contentDescription = null, modifier = Modifier.size(markSize))
        Column {
            Text(
                "LinguaCity",
                style = TextStyle(
                    fontFamily = Baloo2, fontWeight = FontWeight.ExtraBold,
                    fontSize = (markSize.value * 0.6f).sp, lineHeight = (markSize.value * 0.66f).sp
                ),
                color = color
            )
            if (showTagline) {
                Text(
                    "Học một từ, xây một viên gạch",
                    style = TextStyle(fontFamily = BeVietnamPro, fontSize = 14.sp, lineHeight = 18.sp),
                    color = LinguaTheme.colors.inkSoft
                )
            }
        }
    }
}
