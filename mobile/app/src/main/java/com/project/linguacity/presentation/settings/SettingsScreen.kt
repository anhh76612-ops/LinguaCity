package com.project.linguacity.presentation.settings

import com.project.linguacity.ui.components.*
import android.content.pm.ApplicationInfo
import androidx.compose.ui.platform.LocalContext
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.selection.selectable
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.data.local.preferences.AppSettings
import com.project.linguacity.data.local.preferences.OrientationSetting
import com.project.linguacity.data.local.preferences.SettingsStore
import com.project.linguacity.ui.motion.staggeredAppear
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SettingsViewModel @Inject constructor(private val store: SettingsStore) : ViewModel() {
    val settings: StateFlow<AppSettings> = store.settings.stateIn(
        viewModelScope,
        SharingStarted.Eagerly,
        AppSettings()
    )
    fun orientation(setting: OrientationSetting) = viewModelScope.launch {
        store.setOrientation(setting)
    }
    fun reduceMotion(enabled: Boolean) = viewModelScope.launch { store.setReduceMotion(enabled) }
    fun replayTour() = viewModelScope.launch { store.setReplayTour(true) }
}

/** SCR-21 Cài đặt (FR-UI-05): xoay màn hình, giảm hiệu ứng, xem lại hướng dẫn. */
@Composable
fun SettingsScreen(
    onBack: () -> Unit,
    onReplayTour: () -> Unit,
    onOpenAccount: () -> Unit,
    onOpenDesignGallery: () -> Unit = {},
    viewModel: SettingsViewModel = hiltViewModel()
) {
    val settings by viewModel.settings.collectAsState()
    Column(Modifier.fillMaxSize().statusBarsPadding().navigationBarsPadding().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)) {
        CozyTextButton(onClick = onBack) { Text("‹ Thành phố") }
        Text("Cài đặt", style = MaterialTheme.typography.titleLarge)

        // SCR-26 (VS6): tài khoản, đăng xuất, xoá tài khoản
        CozyCard(Modifier.fillMaxWidth().staggeredAppear(0)) {
            Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) {
                    Text("Tài khoản", style = MaterialTheme.typography.titleMedium)
                    Text(
                        "Email, cách đăng nhập, đăng xuất.",
                        style = MaterialTheme.typography.bodySmall
                    )
                }
                CozyTonalButton(onClick = onOpenAccount) { Text("Mở") }
            }
        }

        CozyCard(Modifier.fillMaxWidth().staggeredAppear(0)) {
            Column(Modifier.padding(16.dp)) {
                Text("Xoay màn hình", style = MaterialTheme.typography.titleMedium)
                OrientationSetting.entries.forEach { o ->
                    Row(Modifier.fillMaxWidth().selectable(
                        selected = settings.orientation == o,
                        onClick = { viewModel.orientation(o) }
                    )
                        .padding(vertical = 6.dp), verticalAlignment = Alignment.CenterVertically) {
                        RadioButton(
                            selected = settings.orientation == o,
                            onClick = { viewModel.orientation(o) }
                        )
                        Text(o.label)
                    }
                }
            }
        }
        CozyCard(Modifier.fillMaxWidth().staggeredAppear(1)) {
            Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) {
                    Text("Giảm hiệu ứng chuyển động", style = MaterialTheme.typography.titleMedium)
                    Text(
                        "Tắt chuyển cảnh, chữ chạy và ánh sáng chạy trên khung chờ.",
                        style = MaterialTheme.typography.bodySmall
                    )
                }
                Switch(checked = settings.reduceMotion, onCheckedChange = viewModel::reduceMotion)
            }
        }
        CozyCard(Modifier.fillMaxWidth().staggeredAppear(2)) {
            Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) {
                    Text("Xem lại hướng dẫn", style = MaterialTheme.typography.titleMedium)
                    Text(
                        "Mai giới thiệu lại các chức năng chính.",
                        style = MaterialTheme.typography.bodySmall
                    )
                }
                CozyTonalButton(
                    onClick = {
                        viewModel.replayTour()
                        onReplayTour()
                    }
                ) {
                    Text("Xem")
                }
            }
        }
        // S1: màn xem bộ giao diện, chỉ hiện ở bản debug (cờ debuggable của ứng dụng)
        val context = LocalContext.current
        val debuggable = (context.applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE) != 0
        if (debuggable) {
            CozyCard(Modifier.fillMaxWidth().staggeredAppear(3)) {
                Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                    Column(Modifier.weight(1f)) {
                        Text("Bộ giao diện (debug)", style = MaterialTheme.typography.titleMedium)
                        Text(
                            "Màu, chữ, nút thạch, icon của Cozy Toy Town.",
                            style = MaterialTheme.typography.bodySmall
                        )
                    }
                    CozyTonalButton(onClick = onOpenDesignGallery) { Text("Mở") }
                }
            }
        }
    }
}
