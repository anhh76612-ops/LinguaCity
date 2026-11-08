package com.project.linguacity.presentation.city

import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.BuildingState
import com.project.linguacity.domain.model.city.CityEvent
import com.project.linguacity.domain.model.city.CityState

/**
 * Hợp đồng (B) — dữ liệu ĐỂ VẼ, gửi cho renderer (bản đồ web hoặc Compose). Xem system-design §9.2,
 * ADR-011.
 * Không có giờ, không có tài nguyên: chỉ level, đang xây hay không và tiến độ.
 */
data class CityRenderState(
    val buildings: List<BuildingView>,
    val events: List<CityEvent>,
    /** M7: ngoại hình nhân vật + kiểu nhà (trường tuỳ chọn của v1). */
    val avatar: AvatarLook = AvatarLook.DEFAULT,
    val house: HouseLook = HouseLook.DEFAULT,
    /**
     * M7: công trình app muốn "đang ở trong" (null = ngoài phố). KHÔNG nằm trong JSON state:
     * renderer so với lần trước rồi gọi lệnh enterBuilding(code) / exitBuilding() của bản đồ,
     * bản đồ chạy hoạt cảnh xong thì báo lại BuildingEntered / BuildingExited.
     */
    val focus: BuildingCode? = null,
    /**
     * S2: lệnh "đi bộ tới công trình" mới nhất (nút "Đi tới"). Như [focus], KHÔNG nằm trong JSON:
     * renderer thấy [WalkRequest.id] đổi thì gọi walkTo(code) của bản đồ một lần.
     */
    val walk: WalkRequest? = null
) {
    fun building(code: BuildingCode): BuildingView? = buildings.firstOrNull { it.code == code }
}

/** Lệnh đi bộ; [id] tăng mỗi lần bấm để bấm lại cùng công trình vẫn gửi lệnh mới. */
data class WalkRequest(val code: BuildingCode, val id: Long)

data class BuildingView(
    val code: BuildingCode,
    val level: Int,
    val upgrading: Boolean,
    val progress: Float
) {
    val isBuilt: Boolean get() = level > 0
    val isMaxLevel: Boolean get() = level >= BuildingState.MAX_LEVEL
}

/** Lớp dịch (A) → (B): nơi DUY NHẤT tính tiến độ từ startedAt/finishAt. */
fun CityState.toRenderState(
    serverNowMillis: Long,
    avatar: AvatarLook = AvatarLook.DEFAULT,
    house: HouseLook = HouseLook.DEFAULT,
    focus: BuildingCode? = null,
    walk: WalkRequest? = null
): CityRenderState = CityRenderState(
    buildings = buildings.map {
        BuildingView(
            code = it.code,
            level = it.level.coerceIn(0, BuildingState.MAX_LEVEL),
            upgrading = it.isUpgrading,
            progress = it.progressAt(serverNowMillis)
        )
    },
    events = events,
    avatar = avatar,
    house = house,
    focus = focus,
    walk = walk
)
