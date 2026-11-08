package com.project.linguacity.domain.repository

import com.project.linguacity.domain.model.player.AvatarConfig
import com.project.linguacity.domain.model.player.CosmeticOutcome
import com.project.linguacity.domain.model.player.CosmeticsState
import com.project.linguacity.domain.model.player.HouseStyleConfig
import kotlinx.coroutines.flow.Flow

/** Tuỳ biến nhân vật và nhà (UC_14). Đọc từ Room; đổi/mua đi qua server rồi ghi lại vào Room. */
interface CosmeticRepository {
    fun observe(): Flow<CosmeticsState>

    /** GET /users/me/cosmetics → Room. */
    suspend fun refresh()
    suspend fun unlock(code: String): CosmeticOutcome
    suspend fun saveAvatar(config: AvatarConfig): CosmeticOutcome
    suspend fun saveHouse(config: HouseStyleConfig): CosmeticOutcome
}
