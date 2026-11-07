package com.project.linguacity.domain.model.city

/**
 * Trạng thái thành phố theo góc nhìn nghiệp vụ (domain).
 * Lớp này KHÔNG biết bản đồ vẽ bằng gì (WebView, Compose hay Unity) — xem CityRenderer.
 */
data class CityState(
    val buildings: List<BuildingState>,
    val events: List<CityEvent> = emptyList()
) {
    fun building(code: BuildingCode): BuildingState? = buildings.firstOrNull { it.code == code }
}

data class BuildingState(
    val code: BuildingCode,
    val level: Int,
    val upgrading: Boolean = false,
    /** 0..1 — tiến độ xây khi [upgrading] = true. */
    val progress: Float = 0f
) {
    val isMaxLevel: Boolean get() = level >= MAX_LEVEL

    companion object {
        const val MAX_LEVEL = 3
    }
}

/** 4 công trình của VS5 (GDD §2). Tên enum phải trùng với mã bên city-web (grid.ts). */
enum class BuildingCode(val displayName: String, val icon: String) {
    HOUSING("Housing", "🏠"),
    SCHOOL("School", "🏫"),
    PARK("Park", "🌳"),
    ROAD("Road", "🚌")
}

/** Sự kiện thành phố (GDD §3.1): dấu (!) trên đầu người dân, chạm vào để làm bài ngữ pháp. */
data class CityEvent(
    val id: String,
    val kind: String = "GRAMMAR"
)
