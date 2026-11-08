package com.project.linguacity.presentation.city.compose

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Card
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import com.project.linguacity.domain.model.city.BuildingCode
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.project.linguacity.presentation.city.BuildingView
import com.project.linguacity.presentation.city.CityMapIntent
import com.project.linguacity.presentation.city.CityRenderState
import com.project.linguacity.presentation.city.CityRenderer

/**
 * Đường lui đơn giản (ADR-009/010): lưới 2×2 công trình bằng Compose.
 * Cùng interface với WebCityRenderer nên màn hình không cần biết đang dùng bản nào.
 */
object ComposeCityRenderer : CityRenderer {

    @Composable
    override fun Render(
        state: CityRenderState,
        onIntent: (CityMapIntent) -> Unit,
        modifier: Modifier
    ) {
        // Bản Compose sẵn sàng ngay khi được vẽ.
        LaunchedEffect(Unit) { onIntent(CityMapIntent.Ready) }
        // Không có hoạt cảnh: "vào/ra" công trình xong ngay lập tức (M7).
        var shownFocus by remember { mutableStateOf<BuildingCode?>(null) }
        LaunchedEffect(state.focus) {
            val focus = state.focus
            if (focus == shownFocus) {
                return@LaunchedEffect
            }
            shownFocus?.let { onIntent(CityMapIntent.BuildingExited(it)) }
            focus?.let { onIntent(CityMapIntent.BuildingEntered(it)) }
            shownFocus = focus
        }

        Column(
            modifier = modifier.statusBarsPadding().padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            state.events.forEach { event ->
                AssistChip(
                    onClick = { onIntent(CityMapIntent.CityEventTapped(event.id)) },
                    label = { Text("(!) Sự kiện thành phố") }
                )
            }
            state.buildings.chunked(2).forEach { row ->
                Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    row.forEach { b ->
                        BuildingTile(
                            b,
                            Modifier.weight(1f)
                        ) { onIntent(CityMapIntent.BuildingTapped(b.code)) }
                    }
                }
            }
        }
    }

    @Composable
    private fun BuildingTile(b: BuildingView, modifier: Modifier, onClick: () -> Unit) {
        Card(modifier = modifier.aspectRatio(1f).clickable(onClick = onClick)) {
            Column(
                modifier = Modifier.fillMaxWidth().padding(12.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(b.code.icon, style = MaterialTheme.typography.displayMedium)
                Text(b.code.displayName, style = MaterialTheme.typography.titleMedium)
                Text(if (b.isBuilt) "Lv ${b.level}" else "Chưa xây")
                if (b.upgrading) {
                    LinearProgressIndicator(
                        progress = { b.progress },
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            }
        }
    }
}
