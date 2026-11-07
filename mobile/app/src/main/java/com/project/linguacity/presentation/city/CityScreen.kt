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
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.project.linguacity.domain.model.city.BuildingState
import com.project.linguacity.presentation.city.web.WebCityRenderer

/**
 * SCR-04 City View. Bản đồ chiếm toàn màn hình; UI Compose (thẻ công trình, snackbar) nằm đè lên trên.
 * Muốn dùng bản dự phòng: truyền renderer = ComposeCityRenderer.
 */
@Composable
fun CityScreen(
    renderer: CityRenderer = WebCityRenderer,
    viewModel: CityViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    val snackbar = remember { SnackbarHostState() }

    LaunchedEffect(state.message) {
        state.message?.let {
            snackbar.showSnackbar(it)
            viewModel.onIntent(CityIntent.MessageShown)
        }
    }

    Box(Modifier.fillMaxSize()) {
        renderer.Render(
            state = state.city,
            onIntent = { viewModel.onIntent(CityIntent.Map(it)) },
            modifier = Modifier.fillMaxSize()
        )

        if (!state.mapReady) CircularProgressIndicator(Modifier.align(Alignment.Center))

        Column(
            modifier = Modifier.align(Alignment.BottomCenter).navigationBarsPadding().padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            SnackbarHost(snackbar)
            state.selected?.let { code -> state.city.building(code) }?.let { building ->
                BuildingCard(
                    building = building,
                    onUpgrade = { viewModel.onIntent(CityIntent.UpgradeSelected) },
                    onClose = { viewModel.onIntent(CityIntent.DismissSelection) }
                )
            }
        }
    }
}

@Composable
private fun BuildingCard(building: BuildingState, onUpgrade: () -> Unit, onClose: () -> Unit) {
    Card(Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(
                "${building.code.icon} ${building.code.displayName} · Lv ${building.level}",
                style = MaterialTheme.typography.titleMedium
            )
            when {
                building.upgrading -> {
                    Text("Đang nâng cấp… ${(building.progress * 100).toInt()}%")
                    LinearProgressIndicator(progress = { building.progress }, modifier = Modifier.fillMaxWidth())
                }
                building.isMaxLevel -> Text("Đã đạt level tối đa")
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                // Giả lập: bản thật sẽ cần Bản vẽ + KP và gọi Backend (VS5).
                Button(onClick = onUpgrade, enabled = !building.upgrading && !building.isMaxLevel) {
                    Text("Nâng cấp (giả lập)")
                }
                TextButton(onClick = onClose) { Text("Đóng") }
            }
        }
    }
}
