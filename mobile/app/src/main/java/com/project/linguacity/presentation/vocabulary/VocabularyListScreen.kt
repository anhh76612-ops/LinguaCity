package com.project.linguacity.presentation.vocabulary

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.project.linguacity.domain.model.city.BuildingCode

/**
 * SCR-06 Danh sách từ của một (công trình, Level). Bản cơ bản: skeleton/shimmer và shared element ở M9;
 * dấu ✓ sưu tầm + thanh Mastery ở M5 (khi có user_vocab_progress).
 */
@Composable
fun VocabularyListScreen(
    onBack: () -> Unit,
    onOpenCard: (index: Int) -> Unit,
    viewModel: VocabularyViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    val building = BuildingCode.entries.firstOrNull { it.name == state.buildingCode }

    Column(Modifier.fillMaxSize().statusBarsPadding().padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            TextButton(onClick = onBack) { Text("‹ Thành phố") }
        }
        Text(
            "${building?.icon ?: ""} ${building?.displayName ?: state.buildingCode} · Level ${state.level}",
            style = MaterialTheme.typography.titleLarge
        )
        Text("${state.words.size} từ", style = MaterialTheme.typography.bodySmall)

        when {
            state.loading -> Box(Modifier.fillMaxSize(), Alignment.Center) { CircularProgressIndicator() }
            state.words.isEmpty() -> Box(Modifier.fillMaxSize(), Alignment.Center) {
                Text(
                    "Level này chưa có thẻ từ trong máy.\nMở khoá khi xây công trình tới Level ${state.level - 1} và có mạng để tải.",
                    textAlign = TextAlign.Center
                )
            }
            else -> LazyColumn(
                modifier = Modifier.padding(top = 12.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                itemsIndexed(state.words, key = { _, w -> w.id }) { index, word ->
                    Card(Modifier.fillMaxWidth().clickable { onOpenCard(index) }) {
                        Row(
                            Modifier.padding(horizontal = 16.dp, vertical = 12.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column(Modifier.weight(1f)) {
                                Text(word.word, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                                Text(word.meaning, style = MaterialTheme.typography.bodyMedium)
                            }
                            Text(word.ipa ?: "", style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }
            }
        }
    }
}
