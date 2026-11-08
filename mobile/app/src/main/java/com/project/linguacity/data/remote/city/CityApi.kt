package com.project.linguacity.data.remote.city

import com.project.linguacity.data.remote.learning.ResourcesDto
import kotlinx.serialization.Serializable
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path

/** Hợp đồng (A) — system-design §7.2.8 và §10.4.3. */
interface CityApi {

    @GET("api/v1/city")
    suspend fun city(@Header("X-Guest-UUID") guest: String): CityDto

    @POST("api/v1/buildings/{code}/build")
    suspend fun build(
        @Header("X-Guest-UUID") guest: String,
        @Path("code") code: String
    ): BuildResultDto
}

@Serializable
data class BuildingStateDto(
    val buildingId: Long,
    val code: String,
    val currentLevel: Int,
    val targetLevel: Int? = null,
    val maxLevel: Int,
    val status: String,
    val startedAt: String? = null,
    val finishAt: String? = null
)

@Serializable
data class CityDto(
    val serverTime: String,
    val buildings: List<BuildingStateDto>,
    val tutorialStep: String? = null
)

@Serializable
data class BuildResultDto(
    val building: BuildingStateDto,
    val serverTime: String,
    val profile: ResourcesDto
)
