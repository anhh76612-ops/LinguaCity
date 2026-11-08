package com.project.linguacity.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.project.linguacity.R

/*
 * Chữ "Cozy Toy Town": Baloo 2 (tròn, mập như kẹo dẻo) cho tiêu đề và số; Be Vietnam Pro
 * (thiết kế cho tiếng Việt, dấu không chồng nhau) cho nội dung. Font tải từ Google Fonts (OFL),
 * nằm trong res/font.
 */
val Baloo2 = FontFamily(
    Font(R.font.baloo2_medium, FontWeight.Medium),
    Font(R.font.baloo2_semibold, FontWeight.SemiBold),
    Font(R.font.baloo2_bold, FontWeight.Bold),
    Font(R.font.baloo2_extrabold, FontWeight.ExtraBold)
)

val BeVietnamPro = FontFamily(
    Font(R.font.bevietnampro_regular, FontWeight.Normal),
    Font(R.font.bevietnampro_medium, FontWeight.Medium),
    Font(R.font.bevietnampro_semibold, FontWeight.SemiBold),
    Font(R.font.bevietnampro_bold, FontWeight.Bold)
)

private fun display(size: Int, line: Int, weight: FontWeight = FontWeight.ExtraBold) = TextStyle(
    fontFamily = Baloo2, fontWeight = weight, fontSize = size.sp, lineHeight = line.sp
)

private fun body(size: Int, line: Int, weight: FontWeight = FontWeight.Normal, spacing: Float = 0f) =
    TextStyle(
        fontFamily = BeVietnamPro, fontWeight = weight, fontSize = size.sp,
        lineHeight = line.sp, letterSpacing = spacing.sp
    )

val Typography = Typography(
    displayLarge = display(52, 56),
    displayMedium = display(44, 48),
    displaySmall = display(36, 40),
    headlineLarge = display(32, 36, FontWeight.Bold),
    headlineMedium = display(28, 32, FontWeight.Bold),
    headlineSmall = display(24, 28, FontWeight.Bold),
    titleLarge = display(22, 26, FontWeight.Bold),
    titleMedium = display(18, 22, FontWeight.Bold),
    titleSmall = display(16, 20, FontWeight.SemiBold),
    bodyLarge = body(16, 24),
    bodyMedium = body(14, 21),
    bodySmall = body(12, 17),
    labelLarge = body(14, 18, FontWeight.SemiBold),
    labelMedium = body(12, 16, FontWeight.SemiBold, 0.2f),
    labelSmall = body(11, 14, FontWeight.SemiBold, 0.4f)
)

/** Kiểu chữ riêng ngoài thang Material. */
object LinguaTextStyles {
    /** Chữ trên nút thạch. */
    val button = display(17, 20, FontWeight.Bold)
    val buttonLarge = display(22, 24, FontWeight.ExtraBold)
    /** Số liệu tài nguyên trên HUD: số canh cột. */
    val counter = TextStyle(
        fontFamily = Baloo2, fontWeight = FontWeight.Bold, fontSize = 16.sp,
        lineHeight = 18.sp, fontFeatureSettings = "tnum"
    )
    /** Nhãn viết hoa nhỏ (eyebrow). */
    val eyebrow = body(11, 14, FontWeight.SemiBold, 0.9f)
}
