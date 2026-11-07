package com.project.linguacity.presentation.city

import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.CityState

/** Trạng thái màn hình City (MVI, giống TutorialState). */
data class CityUiState(
    val city: CityState,
    val mapReady: Boolean = false,
    /** Công trình người chơi vừa chạm: hiện thẻ thông tin ở dưới màn hình. */
    val selected: BuildingCode? = null,
    /** Thông báo ngắn một lần (snackbar), xoá sau khi đã hiện. */
    val message: String? = null
)

/** Mọi hành động đi vào ViewModel: từ bản đồ hoặc từ UI Compose. */
sealed interface CityIntent {
    data class Map(val intent: CityMapIntent) : CityIntent
    data object DismissSelection : CityIntent
    data object UpgradeSelected : CityIntent
    data object MessageShown : CityIntent
}
