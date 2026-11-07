package com.project.linguacity.presentation.city

import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.CityState
import com.project.linguacity.domain.model.content.BuildingLevelInfo

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
    val message: String? = null,
    /** Chi phí/điều kiện từng Level, đọc từ Room (gói CORE, VS2). Rỗng nếu chưa đồng bộ. */
    val levels: List<BuildingLevelInfo> = emptyList()
) {
    /** Điều kiện để lên level kế tiếp của [code], hoặc null nếu đã tối đa / chưa có dữ liệu. */
    fun nextLevelInfo(code: BuildingCode, currentLevel: Int): BuildingLevelInfo? =
        levels.firstOrNull { it.buildingCode == code.name && it.level == currentLevel + 1 }

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
    /** App quay lại foreground: kiểm tra gói nội dung mới (ADR-012, kiểu pull). */
    data object AppForeground : CityIntent
}
