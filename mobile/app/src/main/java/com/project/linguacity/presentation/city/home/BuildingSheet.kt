package com.project.linguacity.presentation.city.home

import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.spring
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectVerticalDragGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.unit.dp
import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.CityEvent
import com.project.linguacity.domain.model.content.BuildingLevelInfo
import com.project.linguacity.presentation.city.BuildingView
import com.project.linguacity.presentation.tutorial.SpotKeys
import com.project.linguacity.presentation.tutorial.spotlightTarget
import com.project.linguacity.ui.components.BrickProgressBar
import com.project.linguacity.ui.components.ClayCard
import com.project.linguacity.ui.components.CozyTag
import com.project.linguacity.ui.components.JellyButton
import com.project.linguacity.ui.components.JellySize
import com.project.linguacity.ui.components.JellyVariant
import com.project.linguacity.ui.components.LinguaIcon
import com.project.linguacity.ui.icons.LinguaIcons
import com.project.linguacity.ui.motion.LocalReduceMotion
import com.project.linguacity.ui.theme.LinguaTheme

/** Ba nấc của sheet công trình. */
enum class SheetLevel { PEEK, HALF, FULL }

private const val DRAG_STEP_PX = 48f

/**
 * S2: thẻ thông tin công trình dạng sheet 3 nấc, thay BuildingCard (concept §6).
 * - PEEK: tên, level, hàng gạch bộ sưu tầm.
 * - HALF (mặc định khi mở): trạng thái + các nút chính Học / Xây / Thẻ từ / Vào nhà.
 * - FULL: thêm điều kiện lên level và nút Nâng cấp / Thi lên Lv.
 * Vuốt tay cầm lên/xuống để đổi nấc (vuốt xuống ở PEEK thì đóng), chạm tay cầm để xoay vòng.
 */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun BuildingSheet(
    building: BuildingView,
    next: BuildingLevelInfo?,
    collected: Pair<Int, Int>,
    busy: Boolean,
    hasBlueprint: Boolean,
    onBuild: () -> Unit,
    onEnter: () -> Unit,
    onLearn: () -> Unit,
    onVocabulary: () -> Unit,
    onExam: () -> Unit,
    onClose: () -> Unit,
    modifier: Modifier = Modifier
) {
    val c = LinguaTheme.colors
    val reduce = LocalReduceMotion.current
    var level by rememberSaveable(building.code) { mutableStateOf(SheetLevel.HALF) }

    ClayCard(
        modifier
            .fillMaxWidth()
            .spotlightTarget(SpotKeys.CARD)
            .then(if (reduce) Modifier else Modifier.animateContentSize(spring(dampingRatio = 0.8f))),
        color = c.paper,
        corner = 24.dp,
        contentPadding = androidx.compose.foundation.layout.PaddingValues(
            start = 16.dp, end = 16.dp, top = 6.dp, bottom = 16.dp
        )
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            // tay cầm: vuốt hoặc chạm
            Box(
                Modifier
                    .fillMaxWidth()
                    .height(22.dp)
                    .pointerInput(building.code) {
                        var drag = 0f
                        detectVerticalDragGestures(
                            onDragStart = { drag = 0f },
                            onDragEnd = {
                                when {
                                    drag < -DRAG_STEP_PX -> level = level.up()
                                    drag > DRAG_STEP_PX && level == SheetLevel.PEEK -> onClose()
                                    drag > DRAG_STEP_PX -> level = level.down()
                                }
                            },
                            onVerticalDrag = { _, dy -> drag += dy }
                        )
                    }
                    .clickable(role = Role.Button) { level = level.cycle() }
                    .semantics {
                        contentDescription = "Tay cầm thẻ công trình"
                        stateDescription = when (level) {
                            SheetLevel.PEEK -> "thu nhỏ"
                            SheetLevel.HALF -> "vừa"
                            SheetLevel.FULL -> "mở rộng"
                        }
                    },
                contentAlignment = Alignment.Center
            ) {
                Box(Modifier.width(44.dp).height(5.dp).clip(RoundedCornerShape(3.dp)).background(c.dustGray))
            }

            // ---- PEEK ----
            Row(verticalAlignment = Alignment.CenterVertically) {
                LinguaIcon(building.code.iconVector, null, Modifier.size(36.dp))
                Column(Modifier.weight(1f).padding(start = 10.dp)) {
                    Text(building.code.viName, style = MaterialTheme.typography.titleLarge, color = c.ink)
                    Text(
                        when {
                            building.upgrading -> "Đang xây lên Lv ${building.level + 1}"
                            building.isBuilt -> "Lv ${building.level}"
                            else -> "Lô đất trống"
                        },
                        style = MaterialTheme.typography.bodySmall, color = c.inkSoft
                    )
                }
                Box(
                    Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .background(c.cream)
                        .clickable(role = Role.Button, onClick = onClose)
                        .semantics { contentDescription = "Đóng" },
                    contentAlignment = Alignment.Center
                ) { Text("✕", style = MaterialTheme.typography.titleSmall, color = c.ink) }
            }
            CollectionBricks(building, collected)

            // ---- HALF ----
            if (level != SheetLevel.PEEK) {
                StatusLine(building)
                FlowRow(
                    horizontalArrangement = Arrangement.spacedBy(10.dp),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    JellyButton(
                        "Học", onLearn,
                        enabled = !building.isMaxLevel,
                        leadingIcon = LinguaIcons.BookOpen,
                        modifier = Modifier.spotlightTarget(SpotKeys.LEARN)
                    )
                    if (!building.isBuilt) {
                        JellyButton(
                            "Xây", onBuild,
                            variant = JellyVariant.Success,
                            enabled = !building.upgrading && !busy,
                            leadingIcon = LinguaIcons.Hammer,
                            modifier = Modifier.spotlightTarget(SpotKeys.BUILD)
                        )
                    }
                    if (building.code == BuildingCode.HOUSING && building.isBuilt) {
                        JellyButton(
                            "Vào nhà", onEnter, variant = JellyVariant.Wood,
                            leadingIcon = LinguaIcons.HomeTown
                        )
                    }
                    JellyButton(
                        "Thẻ từ", onVocabulary, variant = JellyVariant.Secondary,
                        modifier = Modifier.spotlightTarget(SpotKeys.VOCAB)
                    )
                }
                if (level == SheetLevel.HALF && building.isBuilt && !building.isMaxLevel && !building.upgrading) {
                    Text(
                        "Vuốt lên để xem cách lên Lv ${building.level + 1}",
                        style = MaterialTheme.typography.labelSmall, color = c.inkSoft
                    )
                }
            }

            // ---- FULL ----
            if (level == SheetLevel.FULL) {
                // mục 11: Fixy báo tiến độ / nhắc cách lên level
                val (fixyMood, fixyLine) = com.project.linguacity.presentation.characters.fixyLineFor(building, hasBlueprint)
                Row(verticalAlignment = Alignment.CenterVertically) {
                    com.project.linguacity.presentation.characters.FixyPortrait(fixyMood, Modifier.size(56.dp))
                    Text(
                        "Fixy: $fixyLine",
                        Modifier.padding(start = 10.dp).weight(1f),
                        style = MaterialTheme.typography.bodySmall, color = c.ink
                    )
                }
                NextLevelBlock(building, next, hasBlueprint, busy, onBuild, onExam)
            }
        }
    }
}

private fun SheetLevel.up() = when (this) {
    SheetLevel.PEEK -> SheetLevel.HALF
    else -> SheetLevel.FULL
}

private fun SheetLevel.down() = when (this) {
    SheetLevel.FULL -> SheetLevel.HALF
    else -> SheetLevel.PEEK
}

private fun SheetLevel.cycle() = when (this) {
    SheetLevel.PEEK -> SheetLevel.HALF
    SheetLevel.HALF -> SheetLevel.FULL
    SheetLevel.FULL -> SheetLevel.PEEK
}

/** Hàng gạch: bộ sưu tầm từ của level kế tiếp (mỗi viên ~ 1/10 số từ). */
@Composable
private fun CollectionBricks(building: BuildingView, collected: Pair<Int, Int>) {
    val c = LinguaTheme.colors
    if (collected.second <= 0 || building.isMaxLevel) {
        return
    }
    val bricks = 10
    val filled = (collected.first * bricks / collected.second).coerceIn(0, bricks)
    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
        BrickProgressBar(filled, bricks, brickWidth = 24.dp)
        Text(
            "Bộ sưu tầm Lv ${minOf(3, building.level + 1)}: ${collected.first}/${collected.second} từ",
            style = MaterialTheme.typography.bodySmall, color = c.inkSoft
        )
    }
}

@Composable
private fun StatusLine(building: BuildingView) {
    val c = LinguaTheme.colors
    when {
        building.upgrading && building.progress >= 1f ->
            CozyTag("Sắp xong, chờ máy chủ xác nhận…", icon = LinguaIcons.Crane)
        building.upgrading -> Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            CozyTag("Đang xây ${(building.progress * 100).toInt()}%", icon = LinguaIcons.Crane)
            Box(Modifier.fillMaxWidth().height(10.dp).clip(RoundedCornerShape(5.dp)).background(c.dustGray)) {
                Box(
                    Modifier.fillMaxWidth(building.progress.coerceIn(0f, 1f)).height(10.dp)
                        .clip(RoundedCornerShape(5.dp)).background(c.gold)
                )
            }
        }
        building.isMaxLevel -> CozyTag("Đã đạt level tối đa", icon = LinguaIcons.Star)
        !building.isBuilt -> Text(
            "Học từ của công trình này để đủ điều kiện xây.",
            style = MaterialTheme.typography.bodySmall, color = c.inkSoft
        )
    }
}

/** Điều kiện lên level (building_levels, gói CORE) và nút Nâng cấp / Thi lên Lv (ADR-015 §2–3). */
@Composable
private fun NextLevelBlock(
    building: BuildingView,
    next: BuildingLevelInfo?,
    hasBlueprint: Boolean,
    busy: Boolean,
    onUpgrade: () -> Unit,
    onExam: () -> Unit
) {
    val c = LinguaTheme.colors
    Column(
        Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp)).background(c.board).padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        if (next == null || building.isMaxLevel) {
            Text("Không còn level nào để lên.", style = MaterialTheme.typography.bodySmall, color = c.inkSoft)
            return@Column
        }
        Text("Lên Lv ${next.level}", style = MaterialTheme.typography.titleSmall, color = c.ink)
        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            CozyTag("${next.knowledgeCost} KP", icon = LinguaIcons.Coin)
            CozyTag(formatDuration(next.constructionTimeSeconds), icon = LinguaIcons.Hourglass)
            if (next.requiredCollected > 0) CozyTag("${next.requiredCollected} từ", icon = LinguaIcons.BookOpen)
        }
        if (building.isBuilt && !building.upgrading) {
            if (hasBlueprint) {
                JellyButton(
                    "Nâng cấp lên Lv ${next.level}", onUpgrade,
                    variant = JellyVariant.Success, enabled = !busy, leadingIcon = LinguaIcons.Blueprint
                )
            } else {
                JellyButton(
                    "Thi lên Lv ${next.level}", onExam,
                    variant = JellyVariant.Info, leadingIcon = LinguaIcons.Target
                )
                Text(
                    "Thi đạt để nhận bản vẽ công trình.",
                    style = MaterialTheme.typography.labelSmall, color = c.inkSoft
                )
            }
        }
    }
}

/** SCR-25: cư dân nhờ việc dạng "lá thư" (ADR-015 §5). */
@Composable
fun EventLetter(event: CityEvent, onHelp: () -> Unit, onClose: () -> Unit, modifier: Modifier = Modifier) {
    val c = LinguaTheme.colors
    ClayCard(modifier.fillMaxWidth(), corner = 22.dp) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                LinguaIcon(LinguaIcons.Event, null, Modifier.size(32.dp))
                Text(
                    event.residentName.ifBlank { "Một cư dân" },
                    Modifier.padding(start = 10.dp),
                    style = MaterialTheme.typography.titleMedium, color = c.ink
                )
            }
            Text(event.situation, style = MaterialTheme.typography.bodyMedium, color = c.ink)
            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                CozyTag("+1 mảnh bản vẽ", icon = LinguaIcons.BlueprintShard)
                CozyTag("+15 KP", icon = LinguaIcons.Coin)
            }
            Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                JellyButton("Giúp", onHelp, variant = JellyVariant.Success, size = JellySize.Medium)
                JellyButton("Để sau", onClose, variant = JellyVariant.Secondary)
            }
        }
    }
}

/** M7: bảng khi đang ở trong nhà. Trang trí (M8) mở tab Nhà của màn Tuỳ biến. */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun InteriorPanel(
    onLearn: () -> Unit,
    onVocabulary: () -> Unit,
    onDecorate: () -> Unit,
    onExit: () -> Unit,
    modifier: Modifier = Modifier
) {
    val c = LinguaTheme.colors
    ClayCard(modifier.fillMaxWidth(), corner = 22.dp) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                LinguaIcon(LinguaIcons.HomeTown, null, Modifier.size(32.dp))
                Column(Modifier.padding(start = 10.dp)) {
                    Text("Nhà của bạn", style = MaterialTheme.typography.titleMedium, color = c.ink)
                    Text("Chạm sàn để đi lại trong nhà.", style = MaterialTheme.typography.bodySmall, color = c.inkSoft)
                }
            }
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(10.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                JellyButton("Học", onLearn, leadingIcon = LinguaIcons.BookOpen)
                JellyButton("Thẻ từ", onVocabulary, variant = JellyVariant.Secondary)
                JellyButton("Trang trí", onDecorate, variant = JellyVariant.Secondary)
                JellyButton("Ra ngoài", onExit, variant = JellyVariant.Wood, leadingIcon = LinguaIcons.BackWood)
            }
        }
    }
}

internal fun formatDuration(seconds: Long): String = when {
    seconds < 60 -> "$seconds giây"
    seconds < 3600 -> "${seconds / 60} phút"
    else -> "${seconds / 3600} giờ"
}
