package com.project.linguacity.presentation.profile

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.model.UserProfile
import com.project.linguacity.domain.model.player.PlayerStats
import com.project.linguacity.domain.repository.LearningRepository
import com.project.linguacity.domain.repository.PlayerRepository
import com.project.linguacity.ui.motion.SkeletonBlock
import com.project.linguacity.ui.motion.staggeredAppear
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

data class ProfileState(
    val profile: UserProfile? = null,
    val titleName: String? = null,
    val stats: PlayerStats? = null,
    /** Số từ đã sưu tầm đếm trong Room — dùng khi offline chưa có stats từ server. */
    val collectedOffline: Int = 0
)

@HiltViewModel
class ProfileViewModel @Inject constructor(player: PlayerRepository, learning: LearningRepository) : ViewModel() {
    val state: StateFlow<ProfileState> = combine(
        player.observeProfile(), player.observeAchievements(), player.stats, learning.observeProgress()
    ) { profile, achievements, stats, progress ->
        ProfileState(profile, achievements.firstOrNull { it.equipped }?.name, stats, progress.values.count { it.collected })
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), ProfileState())

    init {
        viewModelScope.launch { runCatching { player.refresh() } }
    }
}

/** SCR-19 Hồ sơ: ngoại hình (M8), danh hiệu, tài nguyên, thống kê học. */
@Composable
fun ProfileScreen(onBack: () -> Unit, onOpenAchievements: () -> Unit, viewModel: ProfileViewModel = hiltViewModel()) {
    val s by viewModel.state.collectAsState()
    Column(Modifier.fillMaxSize().statusBarsPadding().navigationBarsPadding().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)) {
        TextButton(onClick = onBack) { Text("‹ Thành phố") }
        val p = s.profile
        if (p == null) {
            // Skeleton có hình dáng giống màn hồ sơ
            Row(verticalAlignment = Alignment.CenterVertically) {
                SkeletonBlock(Modifier.size(72.dp), 72.dp)
                Spacer(Modifier.width(16.dp))
                Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    SkeletonBlock(Modifier.fillMaxWidth(0.5f), 20.dp)
                    SkeletonBlock(Modifier.fillMaxWidth(0.7f), 14.dp)
                }
            }
            repeat(3) { SkeletonBlock(Modifier.fillMaxWidth(), 64.dp) }
            return@Column
        }
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.staggeredAppear(0)) {
            Box(Modifier.size(72.dp).clip(CircleShape).background(MaterialTheme.colorScheme.primaryContainer),
                contentAlignment = Alignment.Center) { Text("🙂", style = MaterialTheme.typography.headlineLarge) }
            Spacer(Modifier.width(16.dp))
            Column {
                Text("Cư dân #${p.id.take(4).uppercase()}", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                Text(s.titleName?.let { "🏅 $it" } ?: "Chưa đeo danh hiệu", style = MaterialTheme.typography.bodyMedium)
                Text("Ngoại hình nhân vật: sắp có", style = MaterialTheme.typography.labelSmall)
            }
        }
        StatCard(1, "Tài nguyên", "💡 ${p.knowledgePoints} KP   ⏳ ${p.hourglassCount}   🧩 ${p.blueprintShards}")
        StatCard(2, "Từ đã sưu tầm", "${s.stats?.collectedWords ?: s.collectedOffline} từ")
        StatCard(3, "Chuỗi ngày học", s.stats?.let { "🔥 ${it.streakDays} ngày liên tiếp" } ?: "Cần mạng để cập nhật")
        Button(onClick = onOpenAchievements, modifier = Modifier.fillMaxWidth().staggeredAppear(4)) { Text("🏅 Bộ sưu tập danh hiệu") }
    }
}

@Composable
private fun StatCard(index: Int, title: String, value: String) {
    Card(Modifier.fillMaxWidth().staggeredAppear(index)) {
        Column(Modifier.padding(16.dp)) {
            Text(title, style = MaterialTheme.typography.labelLarge)
            Text(value, style = MaterialTheme.typography.titleMedium)
        }
    }
}
