package com.project.linguacity.presentation.customize

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.project.linguacity.domain.model.player.CosmeticCategory
import com.project.linguacity.domain.model.player.CosmeticItem
import com.project.linguacity.presentation.city.LookResolver
import com.project.linguacity.presentation.city.web.WebCityRenderer

/**
 * SCR-20 Tuỳ biến (UC_14, M8).
 *  - Tab Nhân vật: xem trước 3D (city-web `avatar-preview`) + chọn da, tóc, áo, quần, phụ kiện.
 * Miễn phí.
 *  - Tab Nhà: tường và sàn. Món khoá hiện giá KP (chạm để mua) hoặc danh hiệu cần có.
 * Chọn xong bấm Lưu → server kiểm tra lại (BR-COS-03) rồi mới ghi vào Room.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CustomizeScreen(onBack: () -> Unit, viewModel: CustomizeViewModel = hiltViewModel()) {
    val state by viewModel.state.collectAsState()
    val snackbar = remember { SnackbarHostState() }

    LaunchedEffect(state.message) {
        state.message?.let {
            snackbar.showSnackbar(it)
            viewModel.messageShown()
        }
    }

    state.confirmUnlock?.let { item ->
        val enough = state.cosmetics.knowledgePoints >= item.priceKp
        AlertDialog(
            onDismissRequest = viewModel::dismissUnlock,
            title = { Text("Mở khoá ${item.name}?") },
            text = {
                Text(
                    if (enough) {
                        "Dùng ${item.priceKp} KP (bạn có ${state.cosmetics.knowledgePoints} KP)."
                    }
                    else "Cần ${item.priceKp} KP, bạn mới có ${state.cosmetics.knowledgePoints} KP."
                )
            },
            confirmButton = { TextButton(
                onClick = viewModel::confirmUnlock,
                enabled = enough
            ) { Text("Mở khoá") } },
            dismissButton = { TextButton(onClick = viewModel::dismissUnlock) { Text("Để sau") } }
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Tuỳ biến") },
                navigationIcon = { TextButton(onClick = onBack) { Text("‹ Quay lại") } },
                actions = {
                    Text("💡 ${state.cosmetics.knowledgePoints} KP", Modifier.padding(end = 16.dp))
                }
            )
        },
        snackbarHost = { SnackbarHost(snackbar) },
        bottomBar = {
            Button(
                onClick = viewModel::save,
                enabled = state.dirty && !state.busy,
                modifier = Modifier.fillMaxWidth().padding(16.dp)
            ) { Text(if (state.dirty) "Lưu" else "Đã lưu") }
        }
    ) { padding ->
        Column(Modifier.fillMaxSize().padding(padding)) {
            TabRow(selectedTabIndex = if (state.houseTab) 1 else 0) {
                Tab(
                    selected = !state.houseTab,
                    onClick = { viewModel.selectTab(false) },
                    text = { Text("Nhân vật") }
                )
                Tab(
                    selected = state.houseTab,
                    onClick = { viewModel.selectTab(true) },
                    text = { Text("Nhà") }
                )
            }
            Column(Modifier.fillMaxWidth().verticalScroll(rememberScrollState()).padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)) {
                if (!state.houseTab) {
                    val look = LookResolver.avatar(
                        state.avatar ?: state.cosmetics.avatar,
                        state.cosmetics.items
                    )
                    WebCityRenderer.AvatarPreview(look, Modifier.fillMaxWidth().height(260.dp))
                } else {
                    HousePreview(state)
                }
                val categories =
                    if (state.houseTab) CosmeticCategory.HOUSE else CosmeticCategory.AVATAR
                if (state.cosmetics.items.isEmpty()) {
                    Text("Chưa có danh mục tuỳ biến. Kết nối mạng để tải nội dung mới nhé.",
                        style = MaterialTheme.typography.bodyMedium)
                }
                categories.forEach { c ->
                    val items = state.itemsOf(c)
                    if (items.isNotEmpty()) {
                        CategoryRow(c, items, state, viewModel::pick)
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun CategoryRow(
    c: CosmeticCategory,
    items: List<CosmeticItem>,
    state: CustomizeState,
    onPick: (CosmeticItem) -> Unit
) {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text(c.label, style = MaterialTheme.typography.titleSmall)
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items.forEach { item ->
                val selected = state.selectedCode(c) == item.code
                val unlocked = state.cosmetics.isUnlocked(item)
                val lock = when {
                    unlocked -> null
                    item.unlockType == "KP" -> "🔒 ${item.priceKp} KP"
                    else -> {
                        val title = state.achievementNames[item.achievementCode]
                        "🏅 ${title ?: item.achievementCode}"
                    }
                }
                val color = parseColor(item.assetKey)
                if (color != null) {
                    Swatch(item, color, selected, lock, onPick)
                }
                else FilterChip(
                    selected = selected,
                    onClick = { onPick(item) },
                    label = { Text(if (lock == null) item.name else "${item.name} · $lock") }
                )
            }
        }
    }
}

@Composable
private fun Swatch(
    item: CosmeticItem,
    color: Color,
    selected: Boolean,
    lock: String?,
    onPick: (CosmeticItem) -> Unit
) {
    val borderWidth = if (selected) 3.dp else 1.dp
    val borderColor = if (selected) {
        MaterialTheme.colorScheme.primary
    } else {
        MaterialTheme.colorScheme.outline
    }
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.clickable { onPick(item) }
    ) {
        Box(
            Modifier.size(44.dp).clip(CircleShape).background(color)
                .border(BorderStroke(borderWidth, borderColor), CircleShape),
            contentAlignment = Alignment.Center
        ) {
            if (lock != null) {
                Text("🔒")
            }
        }
        Text(lock
            ?: item.name, style = MaterialTheme.typography.labelSmall, textAlign = TextAlign.Center,
            modifier = Modifier.padding(top = 2.dp).size(width = 64.dp, height = 28.dp))
    }
}

/**
 * Xem trước kiểu nhà đơn giản: mảng tường + tên sàn. Nội thất 3D thật nằm trong cảnh "Vào nhà"
 * (M7).
 */
@Composable
private fun HousePreview(state: CustomizeState) {
    val look = LookResolver.house(state.house ?: state.cosmetics.house, state.cosmetics.items)
    val floorName = state.cosmetics.byCode((state.house ?: state.cosmetics.house).floor)?.name
        ?: look.floor
    Surface(
        shape = RoundedCornerShape(16.dp),
        tonalElevation = 2.dp,
        modifier = Modifier.fillMaxWidth()
    ) {
        Column {
            Box(Modifier.fillMaxWidth().height(110.dp)
                .background(parseColor(look.wall) ?: Color.LightGray),
                contentAlignment = Alignment.Center) {
                Text("🪟", style = MaterialTheme.typography.displaySmall)
            }
            Row(Modifier.fillMaxWidth().background(FLOOR_TINT[look.floor] ?: Color(0xFFD9B07C))
                .padding(12.dp)) {
                Text("Sàn: $floorName", color = Color(0xFF2F3A45))
            }
        }
    }
}

private val FLOOR_TINT = mapOf(
    "oak" to Color(0xFFD9B07C), "walnut" to Color(0xFF8A5F3E), "tile" to Color(0xFFE8ECEE),
    "checker" to Color(0xFFBFC3C7), "carpet" to Color(0xFFC46F7A)
)

private fun parseColor(key: String): Color? =
    if (key.length == 7
        && key.startsWith("#")) runCatching { Color(android.graphics.Color.parseColor(key)) }
        .getOrNull() else null
