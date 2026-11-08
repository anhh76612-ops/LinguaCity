package com.project.linguacity.presentation.city.home

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.expandVertically
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.draw.clip
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.presentation.city.BuildingView
import com.project.linguacity.ui.components.ClayCard
import com.project.linguacity.ui.components.JellyButton
import com.project.linguacity.ui.components.JellyIconButton
import com.project.linguacity.ui.components.JellySize
import com.project.linguacity.ui.components.JellyVariant
import com.project.linguacity.ui.components.LinguaIcon
import com.project.linguacity.ui.icons.LinguaIcons
import com.project.linguacity.ui.motion.LocalReduceMotion
import com.project.linguacity.ui.theme.LinguaTheme

/** Ngăn đang mở của dock (chỉ mở một ngăn một lúc). */
enum class DockTray { MAIL, WORKSHOP, BUILD }

/** Một lối tắt trong ngăn dock. [enabled] = false: hiện ổ khoá, bấm thì báo "sắp ra mắt". */
data class DockAction(
    val label: String,
    val icon: ImageVector,
    val enabled: Boolean = true,
    val onClick: () -> Unit
)

/**
 * S2: dock phía dưới, thay menu vòng cung (SCR-22).
 * - Trái 📬 Bưu điện: nhiệm vụ, danh hiệu, hồ sơ, bạn bè (khoá, chờ phần xã hội).
 * - Phải 🧰 Xưởng: thẻ từ, luyện tập, tuỳ biến; 🏗 Xây dựng: danh sách công trình, "Đi tới".
 * Bấm một nút thì ngăn tương ứng bung lên phía trên dock; bấm lại để đóng.
 */
@Composable
fun HomeDock(
    open: DockTray?,
    onToggle: (DockTray) -> Unit,
    mailActions: List<DockAction>,
    workshopActions: List<DockAction>,
    buildings: List<BuildingView>,
    onGoBuilding: (BuildingCode) -> Unit,
    mailBadge: Int,
    modifier: Modifier = Modifier,
    dockModifier: Modifier = Modifier
) {
    val reduce = LocalReduceMotion.current
    Column(modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        AnimatedVisibility(
            visible = open != null,
            enter = if (reduce) fadeIn() else fadeIn() + expandVertically(expandFrom = Alignment.Bottom),
            exit = if (reduce) fadeOut() else fadeOut() + shrinkVertically(shrinkTowards = Alignment.Bottom)
        ) {
            when (open) {
                DockTray.MAIL -> ActionTray("Bưu điện", mailActions)
                DockTray.WORKSHOP -> ActionTray("Xưởng", workshopActions)
                DockTray.BUILD -> BuildTray(buildings, onGoBuilding)
                null -> Box(Modifier)
            }
        }
        Row(
            dockModifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.Bottom
        ) {
            DockButton(
                LinguaIcons.Mail, "Bưu điện", open == DockTray.MAIL, mailBadge
            ) { onToggle(DockTray.MAIL) }
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                DockButton(LinguaIcons.Toolbox, "Xưởng", open == DockTray.WORKSHOP) {
                    onToggle(DockTray.WORKSHOP)
                }
                DockButton(LinguaIcons.Build, "Xây dựng", open == DockTray.BUILD) {
                    onToggle(DockTray.BUILD)
                }
            }
        }
    }
}

@Composable
private fun DockButton(
    icon: ImageVector,
    label: String,
    selected: Boolean,
    badge: Int = 0,
    onClick: () -> Unit
) {
    val c = LinguaTheme.colors
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Box {
            JellyIconButton(
                icon, label, onClick,
                variant = if (selected) JellyVariant.Gold else JellyVariant.Secondary,
                diameter = 56.dp
            )
            if (badge > 0) Badge(badge, Modifier.align(Alignment.TopEnd))
        }
        // nhãn nằm trên nền bản đồ: lót viên kem để đọc rõ
        Text(
            label,
            style = MaterialTheme.typography.labelSmall,
            color = c.ink,
            modifier = Modifier
                .padding(top = 2.dp)
                .clip(RoundedCornerShape(8.dp))
                .background(c.paper.copy(alpha = 0.9f))
                .padding(horizontal = 6.dp, vertical = 1.dp)
        )
    }
}

@Composable
private fun ActionTray(title: String, actions: List<DockAction>) {
    ClayCard(Modifier.fillMaxWidth(), corner = 20.dp) {
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(title, style = MaterialTheme.typography.titleSmall, color = LinguaTheme.colors.ink)
            Row(
                Modifier.horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                actions.forEach { a ->
                    JellyButton(
                        a.label, a.onClick,
                        variant = JellyVariant.Secondary,
                        size = JellySize.Small,
                        leadingIcon = if (a.enabled) a.icon else LinguaIcons.Locked
                    )
                }
            }
        }
    }
}

/** Danh mục 🏗 (bản tối thiểu của S2): 4 công trình hiện có, chạm "Đi tới" để nhân vật tới đó. */
@Composable
private fun BuildTray(buildings: List<BuildingView>, onGo: (BuildingCode) -> Unit) {
    val c = LinguaTheme.colors
    ClayCard(Modifier.fillMaxWidth(), corner = 20.dp) {
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("Xây dựng", style = MaterialTheme.typography.titleSmall, color = c.ink)
            Row(
                Modifier.horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                buildings.forEach { b ->
                    Column(
                        Modifier.size(width = 92.dp, height = 122.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        LinguaIcon(b.code.iconVector, null, Modifier.size(34.dp))
                        Text(
                            b.code.viName, style = MaterialTheme.typography.labelMedium,
                            color = c.ink, textAlign = TextAlign.Center
                        )
                        Text(
                            when {
                                b.upgrading -> "Đang xây"
                                b.isBuilt -> "Lv ${b.level}"
                                else -> "Đất trống"
                            },
                            style = MaterialTheme.typography.labelSmall, color = c.inkSoft
                        )
                        JellyButton("Đi tới", { onGo(b.code) }, size = JellySize.Small)
                    }
                }
            }
            Text(
                "Kéo thả công trình mới lên đất trống sẽ có ở bản sau.",
                style = MaterialTheme.typography.bodySmall, color = c.inkSoft
            )
        }
    }
}
