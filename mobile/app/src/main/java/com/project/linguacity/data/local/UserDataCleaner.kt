package com.project.linguacity.data.local

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import javax.inject.Inject

/**
 * Xoá dữ liệu riêng của người chơi trong Room khi đổi người dùng (đăng xuất, đăng nhập tài khoản
 * khác). Nội dung tĩnh (từ vựng, câu hỏi, gói) được giữ để khỏi tải lại.
 */
class UserDataCleaner @Inject constructor(private val database: AppDatabase) {

    suspend fun clear() = withContext(Dispatchers.IO) {
        val db = database.openHelper.writableDatabase
        USER_TABLES.forEach { table -> db.execSQL("DELETE FROM $table") }
    }

    private companion object {
        val USER_TABLES = listOf(
            "user_profiles",
            "user_vocab_progress",
            "user_buildings",
            "user_achievements",
            "unlocked_cosmetics"
        )
    }
}
