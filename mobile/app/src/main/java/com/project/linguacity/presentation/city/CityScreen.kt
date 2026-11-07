package com.project.linguacity.presentation.city

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.unit.dp
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.content.BuildingLevelInfo
import androidx.hilt.navigation.compose.hiltViewModel
import com.project.linguacity.presentation.city.web.WebCityRenderer

/**
 * SCR-04 City View. Bản đồ chiếm toàn màn hình; UI Compose (thẻ công trình, snackbar) nằm đè lên trên.
 * Muốn dùng bản dự phòng: truyền renderer = ComposeCityRenderer.
 */
@Composable
fun CityScreen(
    onOpenVocabulary: (BuildingCode, Int) -> Unit = { _, _ -> },
    renderer: CityRenderer = WebCityRenderer,
    viewModel: CityViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    val snackbar = remember { SnackbarHostState() }

    // Mỗi lần màn City quay lại foreground: kiểm tra gói nội dung mới (ADR-012, kiểu pull).
    val lifecycleOwner = LocalLifecycleOwner.current
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_START) viewModel.onIntent(CityIntent.AppForeground)
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
    }

    LaunchedEffect(state.message) {
        state.message?.let {
            snackbar.showSnackbar(it)
            viewModel.onIntent(CityIntent.MessageShown)
        }
    }

    val render = state.render // dữ liệu để vẽ (hợp đồng B), tính lại mỗi lần state đổi

    Box(Modifier.fillMaxSize()) {
        renderer.Render(
            state = render,
            onIntent = { viewModel.onIntent(CityIntent.Map(it)) },
            modifier = Modifier.fillMaxSize()
        )

        if (!state.mapReady) CircularProgressIndicator(Modifier.align(Alignment.Center))

        Column(
            modifier = Modifier.align(Alignment.BottomCenter).navigationBarsPadding().padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            SnackbarHost(snackbar)
            state.selected?.let { code -> render.building(code) }?.let { building ->
                BuildingCard(
                    building = building,
                    next = state.nextLevelInfo(building.code, building.level),
                    onUpgrade = { viewModel.onIntent(CityIntent.UpgradeSelected) },
                    onVocabulary = { onOpenVocabulary(building.code, maxOf(1, building.level)) },
                    onClose = { viewModel.onIntent(CityIntent.DismissSelection) }
                )
            }
        }
    }
}

@Composable
private fun BuildingCard(
    building: BuildingView,
    next: BuildingLevelInfo?,
    onUpgrade: () -> Unit,
    onVocabulary: () -> Unit,
    onClose: () -> Unit
) {
    Card(Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            val levelText = if (building.isBuilt) "Lv ${building.level}" else "Chưa xây"
            Text(
                "${building.code.icon} ${building.code.displayName} · $levelText",
                style = MaterialTheme.typography.titleMedium
            )
            when {
                building.upgrading && building.progress >= 1f -> Text("Đang chờ máy chủ xác nhận hoàn tất…")
                building.upgrading -> {
                    Text("Đang nâng cấp… ${(building.progress * 100).toInt()}%")
                    LinearProgressIndicator(progress = { building.progress }, modifier = Modifier.fillMaxWidth())
                }
                building.isMaxLevel -> Text("Đã đạt level tối đa")
                !building.isBuilt -> Text("Lô đất trống: xây để mở công trình")
            }
            // Điều kiện Level kế tiếp, đọc từ Room (building_levels, gói CORE).
            if (next != null && !building.upgrading) {
                Text(
                    "Lên Lv ${next.level}: ${next.knowledgeCost} KP · ${formatDuration(next.constructionTimeSeconds)}" +
                        if (next.requiredCollected > 0) " · cần ${next.requiredCollected} từ" else "",
                    style = MaterialTheme.typography.bodySmall
                )
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                // Giả lập: bản thật sẽ cần Bản vẽ + KP và gọi Backend (VS5).
                Button(onClick = onUpgrade, enabled = !building.upgrading && !building.isMaxLevel) {
                    Text(if (building.isBuilt) "Nâng cấp (giả lập)" else "Xây (giả lập)")
                }
                TextButton(onClick = onVocabulary) { Text("Thẻ từ") }
                TextButton(onClick = onClose) { Text("Đóng") }
            }
        }
    }
}

private fun formatDuration(seconds: Long): String = when {
    seconds < 60 -> "$seconds giây"
    seconds < 3600 -> "${seconds / 60} phút"
    else -> "${seconds / 3600} giờ"
}
