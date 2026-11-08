package com.project.linguacity.presentation.sync

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.project.linguacity.ui.loading.DestinationLoading
import com.project.linguacity.ui.loading.LoadingKind

/**
 * SCR-03: tải CORE + các gói cần (UC_03). Bản cơ bản; hiệu ứng Loading theo điểm đến làm ở mốc giao diện (M9).
 */
@Composable
fun SyncScreen(
    onFinished: () -> Unit,
    viewModel: SyncViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()

    LaunchedEffect(Unit) { viewModel.onIntent(SyncIntent.Start) }
    LaunchedEffect(state.finished) { if (state.finished) onFinished() }

    Box(Modifier.fillMaxSize().padding(24.dp), contentAlignment = Alignment.Center) {
        val error = state.error
        if (error != null) {
            Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(16.dp)) {
                Text("Chưa tải được nội dung học", style = MaterialTheme.typography.titleMedium)
                Text(error, textAlign = TextAlign.Center)
                Button(onClick = { viewModel.onIntent(SyncIntent.Retry) }) { Text("Thử lại") }
            }
        } else {
            Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(12.dp)) {
                DestinationLoading(LoadingKind.SYNC, Modifier.weight(1f, fill = false))
                if (state.total > 0) {
                    LinearProgressIndicator(
                        progress = { state.done.toFloat() / state.total },
                        modifier = Modifier.fillMaxWidth(0.7f)
                    )
                    Text(
                        state.currentPack?.let { "Gói $it (${state.done + 1}/${state.total})" } ?: "Xong!",
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        }
    }
}
