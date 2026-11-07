package com.project.linguacity.presentation.achievements

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.model.player.AchievementView
import com.project.linguacity.domain.repository.PlayerRepository
import com.project.linguacity.presentation.common.friendlyNetworkError
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

/** SCR-18 Bộ sưu tập danh hiệu (UC_13) — bản cơ bản; skeleton + hiệu ứng nhận danh hiệu ở M9. */
@HiltViewModel
class AchievementsViewModel @Inject constructor(
    private val player: PlayerRepository
) : ViewModel() {

    val items: StateFlow<List<AchievementView>> =
        player.observeAchievements().stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    private val _message = MutableStateFlow<String?>(null)
    val message: StateFlow<String?> = _message.asStateFlow()

    init {
        viewModelScope.launch { runCatching { player.refresh() } }
    }

    fun equip(code: String?) {
        viewModelScope.launch {
            runCatching { player.equip(code) }.onFailure { _message.value = friendlyNetworkError(it) }
        }
    }

    fun messageShown() {
        _message.value = null
    }
}
