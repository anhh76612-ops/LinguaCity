package com.project.linguacity.presentation.practice

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
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
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.compose.LifecycleEventEffect
import com.project.linguacity.domain.model.progression.PracticeMode
import com.project.linguacity.domain.model.progression.PracticeStatus
import com.project.linguacity.ui.loading.DelayedLoading
import com.project.linguacity.ui.loading.LoadingKind

/**
 * SCR-24 Luyện tập. [onStart] nhận (kiểu, mã chủ đề nối bằng dấu phẩy, số từ) và mở LessonRoute;
 * server kiểm giới hạn ngày lần nữa (409 DAILY_LIMIT, BR-PRAC-02/03).
 */
@Composable
fun PracticeScreen(
    onBack: () -> Unit,
    onStart: (mode: String, themes: String, wordCount: Int) -> Unit,
    viewModel: PracticeViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    val snackbar = remember { SnackbarHostState() }
    LifecycleEventEffect(Lifecycle.Event.ON_RESUME) { viewModel.load() }
    LaunchedEffect(state.message) {
        state.message?.let { text ->
            snackbar.showSnackbar(text)
            viewModel.messageShown()
        }
    }
    Column(Modifier.fillMaxSize().statusBarsPadding().navigationBarsPadding().padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            TextButton(onClick = onBack) { Text("‹ Quay lại") }
            Text("🎯 Luyện tập", style = MaterialTheme.typography.titleLarge)
        }
        val status = state.status
        when {
            state.loading -> DelayedLoading(LoadingKind.LESSON)
            status == null -> Button(onClick = viewModel::load) { Text("Thử lại") }
            else -> PracticeForm(state, status, viewModel)
        }
        Button(
            onClick = {
                onStart(state.mode.name, state.themes.joinToString(","), state.wordCount)
            },
            enabled = state.canStart,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(if (state.status != null && state.usesLeft == 0) "Hết lượt hôm nay" else "Bắt đầu")
        }
        SnackbarHost(snackbar)
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ColumnScope.PracticeForm(
    state: PracticeUiState,
    status: PracticeStatus,
    vm: PracticeViewModel
) {
    Column(
        Modifier.weight(1f).verticalScroll(rememberScrollState()).padding(vertical = 8.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text("Kiểu luyện tập", fontWeight = FontWeight.SemiBold)
        ModeCard(
            title = "📖 Ôn từ đã học",
            detail = "Chỉ từ đã sưu tầm. Còn ${status.review.left}/${status.review.limit} lượt " +
                "hôm nay.",
            selected = state.mode == PracticeMode.REVIEW,
            onClick = { vm.selectMode(PracticeMode.REVIEW) }
        )
        ModeCard(
            title = "🔀 Hỗn hợp",
            detail = "Từ đã học + từ mới. Còn ${status.mixed.left}/${status.mixed.limit} lượt, " +
                "${status.newWords.left}/${status.newWords.limit} từ mới hôm nay. Từ cũ chỉ " +
                "được thưởng lần đầu trong ngày.",
            selected = state.mode == PracticeMode.MIXED,
            onClick = { vm.selectMode(PracticeMode.MIXED) }
        )
        Text("Chủ đề", fontWeight = FontWeight.SemiBold)
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterChip(
                selected = state.themes.isEmpty(),
                onClick = vm::clearThemes,
                label = { Text("Tất cả") }
            )
            status.themes.forEach { theme ->
                FilterChip(
                    selected = theme.code in state.themes,
                    onClick = { vm.toggleTheme(theme.code) },
                    label = { Text("${theme.name} ${theme.collected}/${theme.total}") }
                )
            }
        }
        Text("Cỡ bài", fontWeight = FontWeight.SemiBold)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            PracticeViewModel.WORD_COUNTS.forEach { count ->
                FilterChip(
                    selected = state.wordCount == count,
                    onClick = { vm.selectWordCount(count) },
                    label = { Text("$count từ · ${count * 3 / 2} câu") }
                )
            }
        }
    }
}

@Composable
private fun ModeCard(title: String, detail: String, selected: Boolean, onClick: () -> Unit) {
    Card(onClick = onClick, modifier = Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text((if (selected) "● " else "○ ") + title, fontWeight = FontWeight.SemiBold)
            Text(detail, style = MaterialTheme.typography.bodySmall)
        }
    }
}
