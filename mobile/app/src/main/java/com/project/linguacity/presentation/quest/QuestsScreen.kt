package com.project.linguacity.presentation.quest

import com.project.linguacity.ui.components.*
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.project.linguacity.domain.model.progression.Quest
import com.project.linguacity.domain.model.progression.StreakStatus
import com.project.linguacity.ui.loading.DelayedLoading
import com.project.linguacity.ui.loading.LoadingKind

/** SCR-23 Nhiệm vụ & Chuỗi: tab Chính tuyến / Hằng ngày, thẻ chuỗi ngày, nút Nhận. */
@Composable
fun QuestsScreen(onBack: () -> Unit, viewModel: QuestsViewModel = hiltViewModel()) {
    val state by viewModel.state.collectAsState()
    val snackbar = remember { SnackbarHostState() }
    LaunchedEffect(state.message) {
        state.message?.let { text ->
            snackbar.showSnackbar(text)
            viewModel.messageShown()
        }
    }
    Column(Modifier.fillMaxSize().statusBarsPadding().navigationBarsPadding().padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            CozyTextButton(onClick = onBack) { Text("‹ Quay lại") }
            Text("📜 Nhiệm vụ", style = MaterialTheme.typography.titleLarge)
        }
        val overview = state.overview
        when {
            state.loading -> DelayedLoading(LoadingKind.PROFILE)
            overview == null -> OfflineView(state.offline, viewModel::load)
            else -> {
                StreakCard(overview.streak, overview.streakWeek)
                Spacer(Modifier.padding(4.dp))
                TabRow(selectedTabIndex = if (state.dailyTab) 1 else 0) {
                    Tab(
                        selected = !state.dailyTab,
                        onClick = { viewModel.selectTab(false) },
                        text = { Text("Chính tuyến") }
                    )
                    Tab(
                        selected = state.dailyTab,
                        onClick = { viewModel.selectTab(true) },
                        text = { Text("Hằng ngày") }
                    )
                }
                val quests = if (state.dailyTab) {
                    overview.daily + listOfNotNull(overview.dailyBonus)
                } else {
                    overview.main
                }
                QuestList(quests, state.claiming, viewModel::claim, Modifier.weight(1f))
            }
        }
        SnackbarHost(snackbar)
    }
}

@Composable
private fun OfflineView(offline: Boolean, onRetry: () -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text(if (offline) "Nhiệm vụ cần mạng." else "Chưa tải được nhiệm vụ.")
        CozyButton(onClick = onRetry) { Text("Thử lại") }
    }
}

/** Chuỗi ngày: một ngày được tính khi có cả bài học lẫn nhiệm vụ hằng ngày (BR-STREAK-01). */
@Composable
private fun StreakCard(streak: StreakStatus, week: List<Boolean>) {
    CozyCard(Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
                "🔥 Chuỗi ${streak.days} ngày · kỷ lục ${streak.best}",
                style = MaterialTheme.typography.titleMedium
            )
            if (week.isNotEmpty()) {
                WeekRow(week)
            }
            Text(
                (if (streak.lessonDone) "✅" else "⬜") + " Học 1 bài   " +
                    (if (streak.questDone) "✅" else "⬜") + " Xong 1 nhiệm vụ hằng ngày"
            )
            Text(
                if (streak.todayCounted) {
                    "Hôm nay đã được tính!"
                } else {
                    "Làm đủ hai việc để giữ lửa. Danh hiệu chuỗi sẽ mất nếu đứt chuỗi."
                },
                style = MaterialTheme.typography.bodySmall
            )
        }
    }
}

/** Lịch 7 ngày: 🔥 ngày được tính, ⬜ ngày không; ô cuối là hôm nay. */
@Composable
private fun WeekRow(week: List<Boolean>) {
    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
        week.forEachIndexed { index, counted ->
            val label = if (index == week.lastIndex) "Nay" else "-${week.lastIndex - index}"
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(if (counted) "🔥" else "⬜")
                Text(label, style = MaterialTheme.typography.labelSmall)
            }
        }
    }
}

@Composable
private fun QuestList(
    quests: List<Quest>,
    claiming: String?,
    onClaim: (String) -> Unit,
    modifier: Modifier
) {
    if (quests.isEmpty()) {
        Text("Chưa có nhiệm vụ nào.", modifier = modifier.padding(top = 16.dp))
        return
    }
    LazyColumn(
        modifier.padding(top = 12.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(quests, key = { it.code }) { quest ->
            QuestCard(quest, claiming == quest.code, onClaim)
        }
    }
}

@Composable
private fun QuestCard(quest: Quest, claiming: Boolean, onClaim: (String) -> Unit) {
    CozyCard(Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Text(quest.title, fontWeight = FontWeight.SemiBold)
            Text(quest.description, style = MaterialTheme.typography.bodySmall)
            val goal = quest.goal.coerceAtLeast(1)
            LinearProgressIndicator(
                progress = { quest.progress.coerceAtMost(goal).toFloat() / goal },
                modifier = Modifier.fillMaxWidth()
            )
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("${quest.progress.coerceAtMost(goal)}/$goal · ${rewardText(quest)}")
                Spacer(Modifier.weight(1f))
                QuestAction(quest, claiming, onClaim)
            }
        }
    }
}

@Composable
private fun QuestAction(quest: Quest, claiming: Boolean, onClaim: (String) -> Unit) {
    when {
        quest.claimed -> Text("Đã nhận ✓")
        quest.claimable -> CozyButton(onClick = { onClaim(quest.code) }, enabled = !claiming) {
            Text(if (claiming) "…" else "Nhận")
        }
        else -> Text("Đang làm")
    }
}

private fun rewardText(quest: Quest): String {
    val parts = buildList {
        if (quest.rewardKp > 0) {
            add("+${quest.rewardKp} KP")
        }
        if (quest.rewardShards > 0) {
            add("+${quest.rewardShards} 🧩")
        }
    }
    return parts.joinToString(" ")
}
