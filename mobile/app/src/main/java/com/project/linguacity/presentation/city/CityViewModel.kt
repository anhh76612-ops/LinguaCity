package com.project.linguacity.presentation.city

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.domain.repository.CityRepository
import com.project.linguacity.domain.repository.ContentRepository
import com.project.linguacity.domain.usecase.SyncContentUseCase
import android.util.Log
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Bộ não của màn City: nhận intent từ bản đồ và từ UI, quyết định làm gì.
 * Bản đồ (WebView) chỉ hiển thị; mọi nghiệp vụ nằm ở đây và ở Repository.
 */
@HiltViewModel
class CityViewModel @Inject constructor(
    private val cityRepository: CityRepository,
    contentRepository: ContentRepository,
    private val syncContent: SyncContentUseCase
) : ViewModel() {

    private val _state = MutableStateFlow(
        CityUiState(city = cityRepository.city.value, deviceNowMillis = System.currentTimeMillis())
    )
    val state: StateFlow<CityUiState> = _state.asStateFlow()

    init {
        // Dữ liệu thành phố đổi → cập nhật state → Compose vẽ lại → bản đồ nhận state mới.
        viewModelScope.launch {
            cityRepository.city.collect { city ->
                _state.update { it.copy(city = city, deviceNowMillis = System.currentTimeMillis()) }
            }
        }
        // Chi phí xây/nâng cấp từng Level: đọc từ Room (gói CORE).
        viewModelScope.launch {
            contentRepository.observeBuildingLevels().collect { levels ->
                _state.update { it.copy(levels = levels) }
            }
        }
        // Đồng hồ hiển thị: khi có công trình đang xây, mỗi giây tính lại tiến độ (bản đồ tự làm mượt ở giữa).
        viewModelScope.launch {
            while (isActive) {
                delay(TICK_MILLIS)
                if (_state.value.city.buildings.any { it.isUpgrading }) {
                    _state.update { it.copy(deviceNowMillis = System.currentTimeMillis()) }
                }
            }
        }
    }

    fun onIntent(intent: CityIntent) {
        when (intent) {
            is CityIntent.Map -> onMapIntent(intent.intent)
            CityIntent.DismissSelection -> _state.update { it.copy(selected = null) }
            CityIntent.UpgradeSelected -> upgradeSelected()
            CityIntent.MessageShown -> _state.update { it.copy(message = null) }
            CityIntent.AppForeground -> syncQuietly()
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

    /** Đồng bộ im lặng: có gói mới thì tải, lỗi mạng thì bỏ qua vì đã có cache (UC_03 E2). */
    private fun syncQuietly() {
        viewModelScope.launch {
            runCatching { syncContent() }
                .onSuccess { if (it.downloaded.isNotEmpty()) Log.i(TAG, "Đã tải gói mới: ${it.downloaded}") }
                .onFailure { Log.w(TAG, "Bỏ qua đồng bộ nền: ${it.message}") }
        }
    }

    private companion object {
        const val TAG = "CityViewModel"
        const val TICK_MILLIS = 1_000L
    }
}
