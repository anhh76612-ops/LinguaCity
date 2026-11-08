package com.project.linguacity.presentation.city.home

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.project.linguacity.domain.model.UserProfile
import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.presentation.city.AvatarLook
import com.project.linguacity.presentation.tutorial.SpotKeys
import com.project.linguacity.presentation.tutorial.spotlightTarget
import com.project.linguacity.ui.components.JellyIconButton
import com.project.linguacity.ui.components.JellyVariant
import com.project.linguacity.ui.components.LinguaIcon
import com.project.linguacity.ui.components.ResourcePill
import com.project.linguacity.ui.icons.LinguaIcons
import com.project.linguacity.ui.theme.Brand
import com.project.linguacity.ui.theme.LinguaTextStyles
import com.project.linguacity.ui.theme.LinguaTheme

/** Tên tiếng Việt của công trình trên màn Home (enum giữ tên tiếng Anh vì trùng mã city-web). */
val BuildingCode.viName: String
    get() = when (this) {
        BuildingCode.HOUSING -> "Nhà ở"
        BuildingCode.SCHOOL -> "Trường học"
        BuildingCode.PARK -> "Công viên"
        BuildingCode.ROAD -> "Bến xe"
    }

/** Icon đất sét của công trình (thay emoji 🏠🏫🌳🚌). */
val BuildingCode.iconVector: ImageVector
    get() = when (this) {
        BuildingCode.HOUSING -> LinguaIcons.HomeTown
        BuildingCode.SCHOOL -> LinguaIcons.BookOpen
        BuildingCode.PARK -> LinguaIcons.Tree
        BuildingCode.ROAD -> LinguaIcons.Bus
    }

/** Số có dấu chấm ngăn hàng nghìn: 1250 → "1.250". */
internal fun Int.grouped(): String = "%,d".format(this).replace(',', '.')

/**
 * S2: HUD 4 góc phía trên (concept §6).
 * - Trái: avatar Thị trưởng viền gỗ + sao cấp thị trấn (mở Hồ sơ), chuỗi ngày (mở Nhiệm vụ),
 *   danh hiệu đang đeo (mở Bộ sưu tập).
 * - Phải: ví tài nguyên (KP = vàng, đồng hồ cát, mảnh bản vẽ) và nút cài đặt màu gỗ.
 *
 * [townLevel] tạm tính bằng tổng level công trình cho tới khi có Town Level thật (ADR-017).
 */
@Composable
fun HomeHud(
    profile: UserProfile?,
    avatar: AvatarLook,
    townLevel: Int,
    streakDays: Int,
    titleName: String?,
    onOpenProfile: () -> Unit,
    onOpenQuests: () -> Unit,
    onOpenAchievements: () -> Unit,
    onOpenSettings: () -> Unit,
    modifier: Modifier = Modifier
) {
    Row(
        modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.Top
    ) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            MayorAvatar(avatar, townLevel, onOpenProfile)
            Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                ResourcePill(
                    LinguaIcons.Flame, "$streakDays", "Chuỗi ngày học",
                    onClick = onOpenQuests
                )
                titleName?.let { TitleChip(it, onOpenAchievements) }
            }
        }
        Column(
            horizontalAlignment = Alignment.End,
            verticalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                ResourcePill(
                    LinguaIcons.Coin,
                    (profile?.knowledgePoints ?: 0).grouped(),
                    "Điểm tri thức",
                    modifier = Modifier.spotlightTarget(SpotKeys.KP),
                    onClick = onOpenProfile
                )
                JellyIconButton(
                    LinguaIcons.Settings, "Cài đặt", onOpenSettings,
                    variant = JellyVariant.Secondary, diameter = 40.dp
                )
            }
            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                ResourcePill(
                    LinguaIcons.Hourglass, "${profile?.hourglassCount ?: 0}", "Đồng hồ cát",
                    onClick = onOpenProfile
                )
                ResourcePill(
                    LinguaIcons.BlueprintShard, "${profile?.blueprintShards ?: 0}",
                    "Mảnh bản vẽ", onClick = onOpenProfile
                )
            }
        }
    }
}

/**
 * Avatar tròn viền gỗ vẽ từ chính ngoại hình nhân vật (màu da, tóc, áo của AvatarLook), kèm huy
 * hiệu ngôi sao ghi cấp thị trấn đè lên góc.
 */
@Composable
private fun MayorAvatar(look: AvatarLook, townLevel: Int, onClick: () -> Unit) {
    val c = LinguaTheme.colors
    val skin = look.skin.toColorOr(Color(0xFFF1C7A5))
    val hair = look.hairColor.toColorOr(Color(0xFF4A3426))
    val shirt = look.shirt.toColorOr(Brand.Sky)
    Box(
        Modifier
            .size(62.dp)
            .clickable(role = Role.Button, onClick = onClick)
            .semantics { contentDescription = "Hồ sơ Thị trưởng, cấp thị trấn $townLevel" }
    ) {
        Box(
            Modifier
                .size(58.dp)
                .clip(CircleShape)
                .background(Brand.SkyPale)
                .border(5.dp, c.wood, CircleShape)
        ) {
            Canvas(Modifier.size(58.dp)) {
                val w = size.width
                // áo
                drawRoundRect(
                    shirt, topLeft = Offset(w * 0.2f, w * 0.66f), size = Size(w * 0.6f, w * 0.5f),
                    cornerRadius = androidx.compose.ui.geometry.CornerRadius(w * 0.2f)
                )
                // mặt + tóc
                drawCircle(hair, radius = w * 0.23f, center = Offset(w * 0.5f, w * 0.4f))
                drawCircle(skin, radius = w * 0.2f, center = Offset(w * 0.5f, w * 0.45f))
                drawArc(
                    hair, 180f, 180f, useCenter = true,
                    topLeft = Offset(w * 0.28f, w * 0.2f), size = Size(w * 0.44f, w * 0.3f)
                )
                drawCircle(Brand.Ink, radius = w * 0.022f, center = Offset(w * 0.43f, w * 0.47f))
                drawCircle(Brand.Ink, radius = w * 0.022f, center = Offset(w * 0.57f, w * 0.47f))
            }
        }
        // sao cấp thị trấn
        Box(
            Modifier.align(Alignment.BottomEnd).offset(x = 6.dp, y = 4.dp).size(28.dp),
            contentAlignment = Alignment.Center
        ) {
            LinguaIcon(LinguaIcons.Star, null, Modifier.size(28.dp))
            Text(
                "$townLevel",
                style = LinguaTextStyles.counter.copy(fontSize = 11.sp),
                color = Brand.Ink,
                modifier = Modifier.padding(top = 2.dp)
            )
        }
    }
}

@Composable
private fun TitleChip(name: String, onClick: () -> Unit) {
    val c = LinguaTheme.colors
    Row(
        Modifier
            .clip(RoundedCornerShape(10.dp))
            .background(c.paper.copy(alpha = 0.92f))
            .clickable(role = Role.Button, onClick = onClick)
            .padding(horizontal = 8.dp, vertical = 3.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        LinguaIcon(LinguaIcons.Star, null, Modifier.size(14.dp))
        Text(
            name, style = MaterialTheme.typography.labelMedium, color = c.ink,
            maxLines = 1, overflow = TextOverflow.Ellipsis,
            modifier = Modifier.semantics { contentDescription = "Danh hiệu đang đeo: $name" }
        )
    }
}

private fun String.toColorOr(fallback: Color): Color =
    runCatching { Color(android.graphics.Color.parseColor(this)) }.getOrDefault(fallback)
