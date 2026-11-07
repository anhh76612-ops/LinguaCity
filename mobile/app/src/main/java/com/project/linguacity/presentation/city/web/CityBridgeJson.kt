package com.project.linguacity.presentation.city.web

import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.presentation.city.CityMapIntent
import com.project.linguacity.presentation.city.CityRenderState
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

/**
 * Chuyển đổi giữa model Kotlin và chuỗi JSON đi qua cầu nối WebView.
 * Các DTO ở đây là "hợp đồng" với city-web/src/bridge/cityState.ts: đổi một bên phải đổi bên kia.
 * Tách riêng khỏi WebView để unit test chạy được trên JVM (không cần máy Android).
 */
internal object CityBridgeJson {

    /** Phiên bản hợp đồng (B). Trùng với CONTRACT_VERSION trong cityState.ts. */
    const val CONTRACT_VERSION = 1

    private val json = Json {
        ignoreUnknownKeys = true // bản đồ thêm trường mới cũng không làm app lỗi
        encodeDefaults = true
    }

    @Serializable
    private data class StateDto(val v: Int, val buildings: List<BuildingDto>, val events: List<EventDto>)

    @Serializable
    private data class BuildingDto(val code: String, val level: Int, val upgrading: Boolean, val progress: Float)

    @Serializable
    private data class EventDto(val id: String, val kind: String)

    @Serializable
    private data class IntentDto(val type: String, val buildingCode: String? = null, val eventId: String? = null)

    fun encodeState(state: CityRenderState): String = json.encodeToString(
        StateDto.serializer(),
        StateDto(
            v = CONTRACT_VERSION,
            buildings = state.buildings.map { BuildingDto(it.code.name, it.level, it.upgrading, it.progress) },
            events = state.events.map { EventDto(it.id, it.kind) }
        )
    )

    /** Dữ liệu từ WebView là dữ liệu bên ngoài: sai định dạng thì trả null, không làm app crash. */
    fun decodeIntent(raw: String): CityMapIntent? {
        val dto = runCatching { json.decodeFromString(IntentDto.serializer(), raw) }.getOrNull() ?: return null
        return when (dto.type) {
            "Ready" -> CityMapIntent.Ready
            "BuildingTapped" -> BuildingCode.entries
                .firstOrNull { it.name == dto.buildingCode }
                ?.let { CityMapIntent.BuildingTapped(it) }
            "CityEventTapped" -> dto.eventId
                ?.takeIf { it.isNotBlank() }
                ?.let { CityMapIntent.CityEventTapped(it) }
            else -> null
        }
    }
}
