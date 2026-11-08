package com.project.linguacity.presentation.designsystem

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.project.linguacity.ui.components.BrickProgressBar
import com.project.linguacity.ui.components.ClayCard
import com.project.linguacity.ui.components.CozyBubbleText
import com.project.linguacity.ui.components.CozyTag
import com.project.linguacity.ui.components.Eyebrow
import com.project.linguacity.ui.components.JellyButton
import com.project.linguacity.ui.components.JellyIconButton
import com.project.linguacity.ui.components.JellySize
import com.project.linguacity.ui.components.JellyVariant
import com.project.linguacity.ui.components.LinguaIcon
import com.project.linguacity.ui.components.ResourcePill
import com.project.linguacity.ui.components.StaminaBattery
import com.project.linguacity.ui.icons.LinguaIcons
import com.project.linguacity.ui.icons.LinguaWordmark
import com.project.linguacity.ui.theme.LinguaCityTheme
import com.project.linguacity.ui.theme.LinguaTheme

/**
 * Màn "Bộ giao diện" (chỉ bản debug, mở từ Cài đặt): hiển thị toàn bộ token và component S1
 * để kiểm tra trên máy thật, cả ngày lẫn đêm. Không phải màn của người chơi.
 */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun DesignGalleryScreen(onBack: () -> Unit) {
    val c = LinguaTheme.colors
    val s = LinguaTheme.spacing
    var coins by remember { mutableIntStateOf(1250) }
    var bricks by remember { mutableIntStateOf(3) }

    Column(
        Modifier
            .fillMaxSize()
            .background(c.cream)
            .verticalScroll(rememberScrollState())
            .statusBarsPadding()
            .navigationBarsPadding()
            .padding(s.lg),
        verticalArrangement = Arrangement.spacedBy(s.xl)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            JellyIconButton(LinguaIcons.BackWood, "Quay lại", onBack, diameter = 44.dp)
            Box(Modifier.width(s.md))
            Text("Bộ giao diện", style = MaterialTheme.typography.headlineSmall, color = c.ink)
        }
        LinguaWordmark()

        Section("Màu") {
            FlowRow(horizontalArrangement = Arrangement.spacedBy(s.sm), verticalArrangement = Arrangement.spacedBy(s.sm)) {
                listOf(
                    "cream" to c.cream, "paper" to c.paper, "ink" to c.ink, "cta" to c.cta,
                    "jelly" to c.jelly, "sky" to c.sky, "gold" to c.gold, "brick" to c.brick,
                    "wood" to c.wood, "clay-error" to c.clayError, "dust-gray" to c.dustGray
                ).forEach { (name, color) -> Swatch(name, color) }
            }
        }

        Section("Chữ") {
            Text("Xưởng bảo trì", style = MaterialTheme.typography.displaySmall, color = c.ink)
            Text("Trường học · Lv 2", style = MaterialTheme.typography.titleLarge, color = c.ink)
            Text(
                "Thị trưởng ơi~ hôm nay còn 12 từ cần ôn và một sự kiện ở Tiệm bánh. Ặc, ợ, ữ, ỹ, ẫ.",
                style = MaterialTheme.typography.bodyLarge, color = c.ink
            )
            Eyebrow("Độ vững chắc thị trấn")
            CozyBubbleText("LEVEL UP!", fontSize = 40.sp)
        }

        Section("Nút thạch") {
            FlowRow(horizontalArrangement = Arrangement.spacedBy(s.md), verticalArrangement = Arrangement.spacedBy(s.md)) {
                JellyButton("Khởi công", { coins += 50 }, size = JellySize.Large)
                JellyButton("Tiếp tục", {}, variant = JellyVariant.Success)
                JellyButton("Xem gợi ý", {}, variant = JellyVariant.Info)
                JellyButton("Để sau", {}, variant = JellyVariant.Secondary)
                JellyButton("Ký tên", {}, variant = JellyVariant.Wood)
                JellyButton("Sửa chữa", {}, variant = JellyVariant.Danger, leadingIcon = LinguaIcons.Hammer)
                JellyButton("Cần Lv 5", {}, enabled = false, leadingIcon = LinguaIcons.Locked)
                JellyIconButton(LinguaIcons.Settings, "Cài đặt", {}, variant = JellyVariant.Gold)
                JellyIconButton(LinguaIcons.Mail, "Bưu điện", {})
                JellyIconButton(LinguaIcons.Toolbox, "Xưởng", {})
                JellyIconButton(LinguaIcons.Build, "Xây dựng", {})
            }
        }

        Section("HUD") {
            FlowRow(horizontalArrangement = Arrangement.spacedBy(s.sm), verticalArrangement = Arrangement.spacedBy(s.sm)) {
                ResourcePill(LinguaIcons.Coin, "%,d".format(coins).replace(',', '.'), "Vàng")
                ResourcePill(LinguaIcons.Brick, "15", "Gạch")
                ResourcePill(LinguaIcons.Wood, "8", "Gỗ")
                ResourcePill(LinguaIcons.Flame, "12", "Chuỗi ngày")
                StaminaBattery(4, 5)
            }
            Text("Bấm \"Khởi công\" để thấy viên vàng nảy khi số đổi.", style = MaterialTheme.typography.bodySmall, color = c.inkSoft)
        }

        Section("Thẻ") {
            ClayCard(Modifier.fillMaxWidth()) {
                Column(verticalArrangement = Arrangement.spacedBy(s.sm)) {
                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(s.sm)) {
                        LinguaIcon(LinguaIcons.BookOpen, null, Modifier.size(26.dp))
                        Text("Trường học · Lv 2", style = MaterialTheme.typography.titleMedium, color = c.ink)
                    }
                    BrickProgressBar(bricks, 8, brickWidth = 28.dp)
                    FlowRow(horizontalArrangement = Arrangement.spacedBy(6.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        CozyTag("Thuế 100%", icon = LinguaIcons.Tax)
                        CozyTag("Nứt mức 2", warn = true, icon = LinguaIcons.Crack)
                    }
                    Row(horizontalArrangement = Arrangement.spacedBy(s.sm)) {
                        JellyButton("Xếp gạch", { bricks = if (bricks >= 8) 0 else bricks + 1 }, size = JellySize.Small)
                        JellyButton("Học", {}, variant = JellyVariant.Secondary, size = JellySize.Small)
                    }
                }
            }
        }

        Section("Icon") {
            FlowRow(horizontalArrangement = Arrangement.spacedBy(s.sm), verticalArrangement = Arrangement.spacedBy(s.sm)) {
                LinguaIcons.all.forEach { (name, icon) ->
                    Column(
                        Modifier.width(72.dp).clip(RoundedCornerShape(14.dp)).background(c.paper).padding(vertical = 8.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        LinguaIcon(icon, null, Modifier.size(36.dp))
                        Text(name, style = MaterialTheme.typography.labelSmall, color = c.inkSoft, textAlign = TextAlign.Center)
                    }
                }
            }
        }
        Box(Modifier.height(s.xxl))
    }
}

@Composable
private fun Section(title: String, content: @Composable () -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(LinguaTheme.spacing.md)) {
        Eyebrow(title)
        content()
    }
}

@Composable
private fun Swatch(name: String, color: Color) {
    val c = LinguaTheme.colors
    Column(Modifier.width(76.dp).clip(RoundedCornerShape(12.dp)).background(c.paper)) {
        Box(Modifier.fillMaxWidth().height(40.dp).background(color))
        Text(name, Modifier.padding(6.dp), style = MaterialTheme.typography.labelSmall, color = c.ink)
    }
}

@Preview(showBackground = true, heightDp = 1800)
@Composable
private fun DesignGalleryLightPreview() = LinguaCityTheme(darkTheme = false) { DesignGalleryScreen {} }

@Preview(showBackground = true, heightDp = 1800)
@Composable
private fun DesignGalleryDarkPreview() = LinguaCityTheme(darkTheme = true) { DesignGalleryScreen {} }
