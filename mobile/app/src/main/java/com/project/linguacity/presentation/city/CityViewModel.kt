package com.project.linguacity.presentation.city

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.repository.CityRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Bộ não của màn City: nhận intent từ bản đồ và từ UI, quyết định làm gì.
 * Bản đồ (WebView) chỉ hiển thị; mọi nghiệp vụ nằm ở đây và ở Repository.
 */
@HiltViewModel
class CityViewModel @Inject constructor(
    private val cityRepository: CityRepository
) : ViewModel() {

    private val _state = MutableStateFlow(CityUiState(city = cityRepository.city.value))
    val state: StateFlow<CityUiState> = _state.asStateFlow()

    init {
        // Dữ liệu thành phố đổi (ví dụ đang xây) → cập nhật state → Compose vẽ lại → bản đồ nhận state mới.
        viewModelScope.launch {
            cityRepository.city.collect { city -> _state.update { it.copy(city = city) } }
        }
    }

    fun onIntent(intent: CityIntent) {
        when (intent) {
            is CityIntent.Map -> onMapIntent(intent.intent)
            CityIntent.DismissSelection -> _state.update { it.copy(selected = null) }
            CityIntent.UpgradeSelected -> upgradeSelected()
            CityIntent.MessageShown -> _state.update { it.copy(message = null) }
        }
    }

    private fun onMapIntent(intent: CityMapIntent) {
        when (intent) {
            CityMapIntent.Ready -> _state.update { it.copy(mapReady = true) }
            is CityMapIntent.BuildingTapped -> _state.update { it.copy(selected = intent.code) }
            is CityMapIntent.CityEventTapped -> {
                // Bài ngữ pháp (SCR sự kiện) làm ở slice sau; tạm thời coi như đã hoàn thành.
                cityRepository.resolveEvent(intent.eventId)
                _state.update { it.copy(message = "Sự kiện thành phố: bài ngữ pháp sẽ có ở bản sau") }
            }
        }
    }

    private fun upgradeSelected() {
        val code = _state.value.selected ?: return
        viewModelScope.launch {
            val ok = cityRepository.startUpgrade(code)
            if (!ok) _state.update { it.copy(message = "${code.displayName} đang xây hoặc đã đạt level tối đa") }
        }
    }
}
