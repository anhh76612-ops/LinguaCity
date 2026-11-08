package com.project.linguacity.domain.model.city

/**
 * Trạng thái thành phố theo góc nhìn nghiệp vụ, mang dữ liệu GIỐNG SERVER
 * (bảng user_buildings, API GET /api/v1/city — system-design §7.2.8).
 * Lớp này KHÔNG biết bản đồ vẽ bằng gì; việc dịch sang dữ liệu để vẽ nằm ở presentation
 * (toRenderState).
 */
data class CityState(
    val buildings: List<BuildingState>,
    val events: List<CityEvent> = emptyList(),
    /**
     * Độ lệch đồng hồ = giờ server − giờ máy, đo lúc đồng bộ (serverTime trong response).
     * Mọi phép tính thời gian xây dùng giờ server ước lượng, không tin giờ máy (FR-SYS-04).
     */
    val serverOffsetMillis: Long = 0
) {
    fun building(code: BuildingCode): BuildingState? = buildings.firstOrNull { it.code == code }

    fun serverNow(deviceNowMillis: Long): Long = deviceNowMillis + serverOffsetMillis
}

data class BuildingState(
    val code: BuildingCode,
    /** 0 = chưa xây (user_buildings.current_level mặc định 0). */
    val level: Int,
    val status: BuildingStatus = BuildingStatus.IDLE,
    /** Mốc thời gian theo giờ server (epoch millis). Chỉ có khi đang xây. */
    val startedAtMillis: Long? = null,
    val finishAtMillis: Long? = null
) {
    val isUpgrading: Boolean get() = status == BuildingStatus.UPGRADING
    val isMaxLevel: Boolean get() = level >= MAX_LEVEL

    /**
     * Tiến độ xây 0..1 tại thời điểm [serverNowMillis].
     * Chỉ để HIỂN THỊ: công trình chỉ thật sự xong khi Backend xác nhận.
     */
    fun progressAt(serverNowMillis: Long): Float {
        if (!isUpgrading) {
            return 0f
        }
        val start = startedAtMillis ?: return 0f
        val finish = finishAtMillis ?: return 0f
        if (finish <= start) {
            return 1f
        }
        return ((serverNowMillis - start).toFloat() / (finish - start)).coerceIn(0f, 1f)
    }

    companion object {
        const val MAX_LEVEL = 3
    }
}

enum class BuildingStatus { IDLE, UPGRADING }

/** 4 công trình của VS5 (GDD §2). Tên enum phải trùng với mã bên city-web (grid.ts). */
enum class BuildingCode(val displayName: String, val icon: String) {
    HOUSING("Housing", "🏠"),
    SCHOOL("School", "🏫"),
    PARK("Park", "🌳"),
    ROAD("Road", "🚌")
}

/** Sự kiện thành phố (GDD §3.1). id là chuỗi "mờ": app không suy luận gì từ nó. */
data class CityEvent(
    val id: String,
    val kind: String = "GRAMMAR"
)
