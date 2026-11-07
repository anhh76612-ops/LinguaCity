package com.project.linguacity.presentation.city

import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.CityState

/** Trạng thái màn hình City (MVI, giống TutorialState). */
data class CityUiState(
    /** Dữ liệu nghiệp vụ, giống server (hợp đồng A). */
    val city: CityState,
    /** Giờ máy lúc tick gần nhất; ViewModel cập nhật mỗi giây khi có công trình đang xây. */
    val deviceNowMillis: Long,
    val mapReady: Boolean = false,
    /** Công trình người chơi vừa chạm: hiện thẻ thông tin ở dưới màn hình. */
    val selected: BuildingCode? = null,
    /** Thông báo ngắn một lần (snackbar), xoá sau khi đã hiện. */
    val message: String? = null
) {
    /** Dữ liệu để vẽ (hợp đồng B), tính từ [city] theo giờ server ước lượng. */
    val render: CityRenderState
        get() = city.toRenderState(city.serverNow(deviceNowMillis))
}

/** Mọi hành động đi vào ViewModel: từ bản đồ hoặc từ UI Compose. */
sealed interface CityIntent {
    data class Map(val intent: CityMapIntent) : CityIntent
    data object DismissSelection : CityIntent
    data object UpgradeSelected : CityIntent
    data object MessageShown : CityIntent
}
