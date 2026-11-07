package com.project.linguacity.presentation.city

import com.project.linguacity.domain.model.UserProfile
import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.CityState
import com.project.linguacity.domain.model.content.BuildingLevelInfo
import com.project.linguacity.domain.model.content.packCode

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
    val levels: List<BuildingLevelInfo> = emptyList(),
    /** Hồ sơ trong Room (KP, danh hiệu đang đeo) cho HUD tạm. HUD đầy đủ ở M9. */
    val profile: UserProfile? = null,
    /** Mã gói (vd "HOUSING:1") → (số từ đã sưu tầm, tổng số từ). Tính từ Room, xem được offline. */
    val collection: Map<String, Pair<Int, Int>> = emptyMap(),
    val building: Boolean = false,
    /** Tên hiển thị của danh hiệu đang đeo (lấy từ danh mục CORE). */
    val equippedTitleName: String? = null
) {
    /** Điều kiện để lên level kế tiếp của [code], hoặc null nếu đã tối đa / chưa có dữ liệu. */
    fun nextLevelInfo(code: BuildingCode, currentLevel: Int): BuildingLevelInfo? =
        levels.firstOrNull { it.buildingCode == code.name && it.level == currentLevel + 1 }

    /** (đã sưu tầm, tổng) của Level [level] ở [code]. */
    fun collectionOf(code: BuildingCode, level: Int): Pair<Int, Int> =
        collection[packCode(code.name, level)] ?: (0 to 0)

    /** Dữ liệu để vẽ (hợp đồng B), tính từ [city] theo giờ server ước lượng. */
    val render: CityRenderState
        get() = city.toRenderState(city.serverNow(deviceNowMillis))
}

/** Mọi hành động đi vào ViewModel: từ bản đồ hoặc từ UI Compose. */
sealed interface CityIntent {
    data class Map(val intent: CityMapIntent) : CityIntent
    data object DismissSelection : CityIntent
    /** Bấm "Xây" trên thẻ công trình (chỉ Lv0→1 — BR-TUT-03). */
    data object BuildSelected : CityIntent
    data object MessageShown : CityIntent
    /** App quay lại foreground: kiểm tra gói nội dung mới + tải lại thành phố (ADR-012, kiểu pull). */
    data object AppForeground : CityIntent
}
