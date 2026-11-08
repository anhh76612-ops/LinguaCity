package com.project.linguacity.presentation.city

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.FilledTonalButton
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
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.content.BuildingLevelInfo
import com.project.linguacity.presentation.city.web.WebCityRenderer

/**
 * SCR-04 City View. Bản đồ chiếm toàn màn hình; UI Compose (HUD tạm, thẻ công trình, snackbar) nằm đè lên trên.
 * HUD đầy đủ + menu nổi ở M9. Muốn dùng bản dự phòng: truyền renderer = ComposeCityRenderer.
 */
@Composable
fun CityScreen(
    onOpenVocabulary: (BuildingCode, Int) -> Unit = { _, _ -> },
    onStartLesson: (BuildingCode) -> Unit = {},
    onOpenAchievements: () -> Unit = {},
    /** M8: màn Tuỳ biến; houseTab = mở thẳng tab Nhà (từ nút Trang trí trong nhà). */
    onOpenCustomize: (houseTab: Boolean) -> Unit = {},
    renderer: CityRenderer = WebCityRenderer,
    viewModel: CityViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    val snackbar = remember { SnackbarHostState() }

    // Mỗi lần màn City quay lại foreground: tải lại thành phố + kiểm tra gói nội dung mới (ADR-012, kiểu pull).
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

        // M7: phím Back khi đang ở trong công trình = "Ra ngoài" (chưa vào xong thì nuốt phím, chờ hoạt cảnh)
        BackHandler(enabled = state.focus != null || state.inside != null) {
            viewModel.onIntent(CityIntent.ExitBuilding)
        }

        // HUD tạm (M5): KP + danh hiệu đang đeo + nút Danh hiệu.
        Row(
            Modifier.align(Alignment.TopCenter).statusBarsPadding().padding(12.dp).fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            AssistChip(onClick = {}, label = { Text("💡 ${state.profile?.knowledgePoints ?: 0} KP") })
            state.equippedTitleName?.let { AssistChip(onClick = onOpenAchievements, label = { Text("🏅 $it") }) }
            Box(Modifier.weight(1f))
            FilledTonalButton(onClick = { onOpenCustomize(false) }) { Text("🎨") }
            FilledTonalButton(onClick = onOpenAchievements) { Text("🏅 Danh hiệu") }
        }

        Column(
            modifier = Modifier.align(Alignment.BottomCenter).navigationBarsPadding().padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            SnackbarHost(snackbar)
            // M7: đang ở trong nhà → bảng nhiệm vụ trong nhà thay cho thẻ công trình
            state.inside?.let { code ->
                if (state.focus == code) InteriorPanel(
                    code = code,
                    onLearn = { onStartLesson(code) },
                    onVocabulary = { onOpenVocabulary(code, maxOf(1, render.building(code)?.level ?: 1)) },
                    onDecorate = { onOpenCustomize(true) },
                    onExit = { viewModel.onIntent(CityIntent.ExitBuilding) }
                )
            }
            state.selected?.takeIf { state.focus == null }?.let { code -> render.building(code) }?.let { building ->
                val learnLevel = minOf(3, building.level + 1)
                BuildingCard(
                    building = building,
                    next = state.nextLevelInfo(building.code, building.level),
                    collected = state.collectionOf(building.code, learnLevel),
                    busy = state.building,
                    onBuild = { viewModel.onIntent(CityIntent.BuildSelected) },
                    onEnter = { viewModel.onIntent(CityIntent.EnterSelected) },
                    onLearn = { onStartLesson(building.code) },
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
    collected: Pair<Int, Int>,
    busy: Boolean,
    onBuild: () -> Unit,
    onEnter: () -> Unit,
    onLearn: () -> Unit,
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
                building.upgrading && building.progress >= 1f -> Text("Sắp xong — đang chờ máy chủ xác nhận…")
                building.upgrading -> {
                    Text("Đang xây… ${(building.progress * 100).toInt()}%")
                    LinearProgressIndicator(progress = { building.progress }, modifier = Modifier.fillMaxWidth())
                }
                building.isMaxLevel -> Text("Đã đạt level tối đa")
                !building.isBuilt -> Text("Lô đất trống: học từ của công trình này để xây")
            }
            if (collected.second > 0 && !building.isMaxLevel) {
                Text("Bộ sưu tầm Level ${minOf(3, building.level + 1)}: ${collected.first}/${collected.second} thẻ",
                    style = MaterialTheme.typography.bodySmall)
            }
            // Điều kiện Level kế tiếp, đọc từ Room (building_levels, gói CORE).
            if (next != null && !building.upgrading) {
                Text(
                    "Lên Lv ${next.level}: ${next.knowledgeCost} KP · ${formatDuration(next.constructionTimeSeconds)}" +
                        if (next.requiredCollected > 0) " · cần ${next.requiredCollected} từ" else "",
                    style = MaterialTheme.typography.bodySmall
                )
            }
            Row(horizontalArrangement = Arrangement.spacedBy(4.dp), verticalAlignment = Alignment.CenterVertically) {
                // M7: Housing đã xây thì vào được bên trong (nội thất 3D)
                if (building.code == BuildingCode.HOUSING && building.isBuilt) {
                    Button(onClick = onEnter) { Text("Vào nhà") }
                }
                Button(onClick = onLearn, enabled = !building.isMaxLevel) { Text("Học") }
                if (!building.isBuilt) {
                    FilledTonalButton(onClick = onBuild, enabled = !building.upgrading && !busy) { Text("Xây") }
                }
                TextButton(onClick = onVocabulary) { Text("Thẻ từ") }
                TextButton(onClick = onClose) { Text("Đóng") }
            }
        }
    }
}

/** M7: bảng nhiệm vụ khi đang ở trong nhà (UC_15 bước 2). Nút Trang trí (M8) mở tab Nhà của màn Tuỳ biến. */
@Composable
private fun InteriorPanel(
    code: BuildingCode,
    onLearn: () -> Unit,
    onVocabulary: () -> Unit,
    onDecorate: () -> Unit,
    onExit: () -> Unit
) {
    Card(Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("${code.icon} Nhà của bạn", style = MaterialTheme.typography.titleMedium)
            Text("Chạm sàn để đi lại trong nhà.", style = MaterialTheme.typography.bodySmall)
            Row(horizontalArrangement = Arrangement.spacedBy(4.dp), verticalAlignment = Alignment.CenterVertically) {
                Button(onClick = onLearn) { Text("Học") }
                TextButton(onClick = onVocabulary) { Text("Thẻ từ") }
                TextButton(onClick = onDecorate) { Text("Trang trí") }
                Box(Modifier.weight(1f))
                FilledTonalButton(onClick = onExit) { Text("Ra ngoài") }
            }
        }
    }
}

private fun formatDuration(seconds: Long): String = when {
    seconds < 60 -> "$seconds giây"
    seconds < 3600 -> "${seconds / 60} phút"
    else -> "${seconds / 3600} giờ"
}
