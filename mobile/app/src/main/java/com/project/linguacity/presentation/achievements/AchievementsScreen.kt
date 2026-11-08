package com.project.linguacity.presentation.achievements

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.project.linguacity.domain.model.player.AchievementView
import com.project.linguacity.ui.motion.SkeletonList
import com.project.linguacity.ui.motion.staggeredAppear

/** SCR-18 (UC_13): Dễ / Khó / Ẩn; danh hiệu Ẩn chưa có hiện "???" (BR-ACH-02). */
@Composable
fun AchievementsScreen(onBack: () -> Unit, viewModel: AchievementsViewModel = hiltViewModel()) {
    val items by viewModel.items.collectAsState()
    val message by viewModel.message.collectAsState()
    val snackbar = remember { SnackbarHostState() }
    LaunchedEffect(message) {
        message?.let { text ->
            snackbar.showSnackbar(text)
            viewModel.messageShown()
        }
    }

    Scaffold(snackbarHost = { SnackbarHost(snackbar) }) { padding ->
        Column(Modifier.fillMaxSize().padding(padding).padding(16.dp)) {
            TextButton(onClick = onBack) { Text("‹ Thành phố") }
            Text("Danh hiệu", style = MaterialTheme.typography.titleLarge)
            Text(
                "${items.count { it.earned }}/${items.size} đã có",
                style = MaterialTheme.typography.bodySmall
            )
            if (items.isEmpty()) {
                SkeletonList(rows = 6, modifier = Modifier.padding(top = 12.dp), withAvatar = true)
            } else LazyColumn(
                Modifier.padding(top = 12.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                var order = 0
                listOf("EASY" to "Dễ", "HARD" to "Khó", "HIDDEN" to "Ẩn").forEach { (tier, label) ->
                    val group = items.filter { it.tier == tier }
                    if (group.isNotEmpty()) {
                        val headerIndex = order++
                        item(key = tier) {
                            Text(label, style = MaterialTheme.typography.titleMedium,
                                modifier = Modifier.padding(top = 8.dp)
                                    .staggeredAppear(headerIndex))
                        }
                        group.forEach { a ->
                            val i = order++
                            item(key = a.code) { Box(Modifier.staggeredAppear(i)) {
                                AchievementRow(a, onEquip = viewModel::equip)
                            } }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun AchievementRow(a: AchievementView, onEquip: (String?) -> Unit) {
    Card(Modifier.fillMaxWidth().alpha(if (a.earned) 1f else 0.55f)) {
        Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
            Text(if (a.earned) "🏅" else "🔒", style = MaterialTheme.typography.headlineSmall)
            Column(Modifier.weight(1f).padding(horizontal = 12.dp)) {
                Text(a.displayName, fontWeight = FontWeight.SemiBold)
                Text(
                    when {
                        a.hidden
                            && !a.earned -> "Danh hiệu ẩn — chỉ lộ diện khi bạn vô tình đạt được."
                        else -> a.description ?: ""
                    },
                    style = MaterialTheme.typography.bodySmall
                )
                if (a.revocable) {
                    Text(
                        "🔥 Mất khi đứt chuỗi ngày",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.error
                    )
                }
            }
            if (a.earned) {
                if (a.equipped) {
                    TextButton(onClick = { onEquip(null) }) { Text("Tháo") }
                }
                else TextButton(onClick = { onEquip(a.code) }) { Text("Đeo") }
            }
        }
    }
}
