package com.project.linguacity.presentation.city

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.CityState

/**
 * "Ổ cắm" vẽ bản đồ (ADR-009, ADR-010): màn hình chỉ biết interface này.
 *  - WebCityRenderer     : bản đồ 3D city-web (Three.js) trong WebView — cài đặt chính.
 *  - ComposeCityRenderer : lưới 4 ô bằng Compose — đường lui khi WebView lỗi / máy quá yếu.
 *
 * Quy tắc: renderer CHỈ hiển thị [CityState] và báo lại [CityMapIntent].
 * Nó không gọi API, không quyết định nghiệp vụ.
 */
interface CityRenderer {
    @Composable
    fun Render(
        state: CityState,
        onIntent: (CityMapIntent) -> Unit,
        modifier: Modifier
    )
}

/** Những gì người chơi làm trên bản đồ, gửi ngược về app. Khớp với CityIntent của city-web. */
sealed interface CityMapIntent {
    data object Ready : CityMapIntent
    data class BuildingTapped(val code: BuildingCode) : CityMapIntent
    data class CityEventTapped(val eventId: String) : CityMapIntent
}
