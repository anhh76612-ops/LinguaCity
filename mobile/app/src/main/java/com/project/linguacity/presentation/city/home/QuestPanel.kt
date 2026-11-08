package com.project.linguacity.presentation.city.home

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.expandHorizontally
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.shrinkHorizontally
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
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
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.CityState
import com.project.linguacity.domain.model.progression.Quest
import com.project.linguacity.presentation.quest.QuestsUiState
import com.project.linguacity.ui.components.ClayCard
import com.project.linguacity.ui.components.JellyButton
import com.project.linguacity.ui.components.JellySize
import com.project.linguacity.ui.components.JellyVariant
import com.project.linguacity.ui.components.LinguaIcon
import com.project.linguacity.ui.icons.LinguaIcons
import com.project.linguacity.ui.motion.LocalReduceMotion
import com.project.linguacity.ui.theme.LinguaTextStyles
import com.project.linguacity.ui.theme.LinguaTheme

/** Nơi một nhiệm vụ dẫn tới: nút "Đi tới" dùng để quyết định nhân vật đi đâu hoặc mở màn nào. */
sealed interface QuestTarget {
    data class Building(val code: BuildingCode) : QuestTarget
    /** Sự kiện "!" đang có trên bản đồ: mở thẳng thẻ cư dân. */
    data class Event(val eventId: String) : QuestTarget
    data object Practice : QuestTarget
}

/**
 * Suy nơi cần tới từ mã nhiệm vụ (V006/V007: MAIN_BUILD_HOUSE, DAILY_EVENT…). Nhiệm vụ học chung
 * chung đưa tới công trình đang xây dở thấp nhất, mặc định là Nhà ở.
 */
fun questTarget(quest: Quest, city: CityState): QuestTarget {
    val code = quest.code
    return when {
        "HOUSE" in code || "HOUSING" in code -> QuestTarget.Building(BuildingCode.HOUSING)
        "SCHOOL" in code -> QuestTarget.Building(BuildingCode.SCHOOL)
        "PARK" in code -> QuestTarget.Building(BuildingCode.PARK)
        "ROAD" in code -> QuestTarget.Building(BuildingCode.ROAD)
        "EVENT" in code -> city.events.firstOrNull()?.let { QuestTarget.Event(it.id) }
            ?: QuestTarget.Building(BuildingCode.HOUSING)
        "REVIEW" in code -> QuestTarget.Practice
        else -> QuestTarget.Building(
            city.buildings.filter { it.level in 1 until 3 }.minByOrNull { it.level }?.code
                ?: BuildingCode.HOUSING
        )
    }
}

/** Thứ tự trong bảng: nhận thưởng được → nhiệm vụ ngày chưa xong → nhiệm vụ chính chưa xong. */
private fun QuestsUiState.panelItems(): List<Quest> {
    val o = overview ?: return emptyList()
    val claimable = (o.daily + o.main + listOfNotNull(o.dailyBonus)).filter { it.claimable }
    val daily = o.daily.filter { !it.completed }
    val main = o.main.filter { !it.completed }.take(1)
    return (claimable + daily + main).distinctBy { it.code }.take(3)
}

/**
 * S2: bảng "Việc hôm nay" bên trái màn Home, thu gọn thành một tab nhỏ khi không cần.
 * Mỗi dòng: tên, tiến độ và một nút: Nhận (xong rồi) hoặc Đi tới (nhân vật tự đi tới nơi làm).
 */
@Composable
fun QuestPanel(
    quests: QuestsUiState,
    city: CityState,
    onGo: (QuestTarget) -> Unit,
    onClaim: (String) -> Unit,
    onOpenAll: () -> Unit,
    modifier: Modifier = Modifier
) {
    val c = LinguaTheme.colors
    val reduce = LocalReduceMotion.current
    var open by rememberSaveable { mutableStateOf(true) }
    val items = quests.panelItems()
    val pending = items.size

    Box(modifier) {
        // tab thu gọn
        AnimatedVisibility(
            visible = !open,
            enter = if (reduce) fadeIn() else fadeIn() + expandHorizontally(),
            exit = fadeOut()
        ) {
            ClayCard(
                Modifier
                    .clickable(role = Role.Button) { open = true }
                    .semantics { contentDescription = "Mở bảng nhiệm vụ, còn $pending việc" },
                corner = 16.dp,
                contentPadding = androidx.compose.foundation.layout.PaddingValues(8.dp)
            ) {
                Box {
                    LinguaIcon(LinguaIcons.Quest, null, Modifier.size(30.dp))
                    if (pending > 0) Badge(pending, Modifier.align(Alignment.TopEnd))
                }
            }
        }
        AnimatedVisibility(
            visible = open,
            enter = if (reduce) fadeIn() else fadeIn() + expandHorizontally(expandFrom = Alignment.Start),
            exit = if (reduce) fadeOut() else fadeOut() + shrinkHorizontally(shrinkTowards = Alignment.Start)
        ) {
            ClayCard(
                Modifier.width(232.dp),
                corner = 18.dp,
                contentPadding = androidx.compose.foundation.layout.PaddingValues(10.dp)
            ) {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        LinguaIcon(LinguaIcons.Quest, null, Modifier.size(22.dp))
                        Text(
                            "Việc hôm nay",
                            Modifier.weight(1f).padding(start = 6.dp),
                            style = MaterialTheme.typography.titleSmall, color = c.ink
                        )
                        Box(
                            Modifier
                                .size(28.dp)
                                .clip(RoundedCornerShape(8.dp))
                                .background(c.cream)
                                .clickable(role = Role.Button) { open = false }
                                .semantics { contentDescription = "Thu gọn bảng nhiệm vụ" },
                            contentAlignment = Alignment.Center
                        ) { Text("‹", style = MaterialTheme.typography.titleMedium, color = c.ink) }
                    }
                    when {
                        quests.loading && quests.overview == null -> Hint("Đang tải nhiệm vụ…")
                        quests.overview == null -> Hint("Nhiệm vụ cần mạng. Kết nối rồi mở lại nhé.")
                        items.isEmpty() -> Hint("Xong hết việc hôm nay rồi!")
                        else -> items.forEach { quest ->
                            QuestRow(
                                quest = quest,
                                claiming = quests.claiming == quest.code,
                                onGo = { onGo(questTarget(quest, city)) },
                                onClaim = { onClaim(quest.code) }
                            )
                        }
                    }
                    Text(
                        "Xem tất cả ›",
                        Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .clickable(role = Role.Button, onClick = onOpenAll)
                            .padding(4.dp),
                        style = MaterialTheme.typography.labelLarge,
                        color = if (c.isDark) c.gold else c.ctaEdge
                    )
                }
            }
        }
    }
}

@Composable
private fun QuestRow(quest: Quest, claiming: Boolean, onGo: () -> Unit, onClaim: () -> Unit) {
    val c = LinguaTheme.colors
    Row(
        Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(c.board)
            .padding(start = 8.dp, end = 6.dp, top = 6.dp, bottom = 6.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(6.dp)
    ) {
    Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) {
        Text(
            quest.title, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.SemiBold),
            color = c.ink, maxLines = 1, overflow = TextOverflow.Ellipsis
        )
        Row(verticalAlignment = Alignment.CenterVertically) {
            val fraction = if (quest.goal > 0) quest.progress.toFloat() / quest.goal else 0f
            Box(
                Modifier.weight(1f).height(8.dp).clip(RoundedCornerShape(4.dp)).background(c.dustGray)
            ) {
                Box(
                    Modifier
                        .fillMaxWidth(fraction.coerceIn(0f, 1f))
                        .height(8.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .background(c.jelly)
                )
            }
            Text(
                "${quest.progress}/${quest.goal}",
                Modifier.padding(start = 6.dp),
                style = LinguaTextStyles.counter.copy(fontSize = MaterialTheme.typography.labelSmall.fontSize),
                color = c.inkSoft
            )
        }
    }
        if (quest.claimable) {
            JellyButton(
                if (claiming) "…" else "Nhận", onClaim,
                variant = JellyVariant.Gold, size = JellySize.Mini, enabled = !claiming
            )
        } else {
            JellyButton("Đi tới", onGo, size = JellySize.Mini)
        }
    }
}

@Composable
private fun Hint(text: String) {
    Text(text, style = MaterialTheme.typography.bodySmall, color = LinguaTheme.colors.inkSoft)
}

@Composable
internal fun Badge(count: Int, modifier: Modifier = Modifier) {
    Box(
        modifier
            .size(18.dp)
            .clip(RoundedCornerShape(9.dp))
            .background(LinguaTheme.colors.brick),
        contentAlignment = Alignment.Center
    ) {
        Text(
            "$count",
            style = LinguaTextStyles.counter.copy(fontSize = MaterialTheme.typography.labelSmall.fontSize),
            color = androidx.compose.ui.graphics.Color.White
        )
    }
}

