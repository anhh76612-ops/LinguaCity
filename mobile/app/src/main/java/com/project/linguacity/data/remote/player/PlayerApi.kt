package com.project.linguacity.data.remote.player

import com.project.linguacity.data.remote.learning.ProgressDto
import kotlinx.serialization.Serializable
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

/** Thông tin của chính người chơi (system-design §10.4.3, §10.4.4). */
interface PlayerApi {

    @GET("api/v1/users/me")
    suspend fun me(@Header("X-Guest-UUID") guest: String): PlayerDto

    @PUT("api/v1/users/me/tutorial/step")
    suspend fun step(@Header("X-Guest-UUID") guest: String, @Body body: StepRequestDto): PlayerDto

    @GET("api/v1/users/me/vocab-progress")
    suspend fun progress(
        @Header("X-Guest-UUID") guest: String,
        @Query("since") since: String? = null
    ): ProgressDto

    @GET("api/v1/users/me/achievements")
    suspend fun achievements(@Header("X-Guest-UUID") guest: String): AchievementsDto

    @PUT("api/v1/users/me/equipped-title")
    suspend fun equip(@Header("X-Guest-UUID") guest: String, @Body body: EquipRequestDto): PlayerDto

    // ---------- Tuỳ biến (M8, §10.4.4) ----------
    @GET("api/v1/users/me/cosmetics")
    suspend fun cosmetics(@Header("X-Guest-UUID") guest: String): CosmeticsDto

    @POST("api/v1/cosmetics/{code}/unlock")
    suspend fun unlock(
        @Header("X-Guest-UUID") guest: String,
        @Path("code") code: String
    ): CosmeticsDto

    @PUT("api/v1/users/me/avatar")
    suspend fun saveAvatar(
        @Header("X-Guest-UUID") guest: String,
        @Body body: AvatarConfigDto
    ): CosmeticsDto

    @PUT("api/v1/users/me/house-style")
    suspend fun saveHouseStyle(
        @Header("X-Guest-UUID") guest: String,
        @Body body: HouseStyleDto
    ): CosmeticsDto
}

@Serializable
data class AvatarConfigDto(
    val skin: String,
    val hairStyle: String,
    val hairColor: String,
    val shirtColor: String,
    val pantsColor: String,
    val accessory: String
)

@Serializable
data class HouseStyleDto(val wall: String, val floor: String)

@Serializable
data class CosmeticsDto(
    val unlocked: List<String>,
    val avatar: AvatarConfigDto,
    val houseStyle: HouseStyleDto,
    val knowledgePoints: Int
)

@Serializable
data class StatsDto(val collectedWords: Int, val streakDays: Int)

@Serializable
data class PlayerDto(
    val userId: String,
    val knowledgePoints: Int,
    val hourglassCount: Int,
    val blueprintShards: Int,
    /** ADR-017; server cũ không gửi thì 0. */
    val bricks: Int = 0,
    val wood: Int = 0,
    val tutorialStep: String,
    val tutorialCompleted: Boolean,
    val equippedTitle: String? = null,
    val avatar: AvatarConfigDto? = null,
    val houseStyle: HouseStyleDto? = null,
    val stats: StatsDto
)

@Serializable
data class StepRequestDto(val step: String)

@Serializable
data class EarnedDto(val code: String, val earnedAt: String)

@Serializable
data class AchievementsDto(val equipped: String? = null, val items: List<EarnedDto>)

/** Không có giá trị mặc định → luôn được gửi, kể cả {"code": null} (tháo danh hiệu). */
@Serializable
data class EquipRequestDto(val code: String?)
