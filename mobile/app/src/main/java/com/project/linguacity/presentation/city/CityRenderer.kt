package com.project.linguacity.presentation.city

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.project.linguacity.domain.model.city.BuildingCode

/**
 * "Ổ cắm" vẽ bản đồ (ADR-009, ADR-010): màn hình chỉ biết interface này.
 *  - WebCityRenderer     : bản đồ 3D city-web (Three.js) trong WebView — cài đặt chính.
 *  - ComposeCityRenderer : lưới 4 ô bằng Compose — đường lui khi WebView lỗi / máy quá yếu.
 *
 * Quy tắc: renderer CHỈ hiển thị [CityRenderState] và báo lại [CityMapIntent].
 * Nó không gọi API, không quyết định nghiệp vụ, không tính thời gian.
 */
interface CityRenderer {
    @Composable
    fun Render(
        state: CityRenderState,
        onIntent: (CityMapIntent) -> Unit,
        modifier: Modifier
    )
}

/** Những gì người chơi làm trên bản đồ, gửi ngược về app. Khớp với CityIntent của city-web (hợp đồng B v1). */
sealed interface CityMapIntent {
    data object Ready : CityMapIntent
    data class BuildingTapped(val code: BuildingCode) : CityMapIntent
    data class CityEventTapped(val eventId: String) : CityMapIntent
    /** M7: hoạt cảnh vào công trình đã xong (sau lệnh enterBuilding). */
    data class BuildingEntered(val code: BuildingCode) : CityMapIntent
    /** M7: đã ra lại ngoài phố (sau lệnh exitBuilding). */
    data class BuildingExited(val code: BuildingCode) : CityMapIntent
}
