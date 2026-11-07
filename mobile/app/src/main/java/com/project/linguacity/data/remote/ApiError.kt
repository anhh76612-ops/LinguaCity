package com.project.linguacity.data.remote

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonPrimitive
import retrofit2.HttpException

/** Body lỗi chung của server: {code, message, details?} (FR-SYS-06, system-design §10.4). */
@Serializable
data class ApiErrorDto(val code: String? = null, val message: String? = null, val details: JsonObject? = null) {
    fun detailInt(key: String): Int? = details?.get(key)?.jsonPrimitive?.intOrNull
}

private val errorJson = Json { ignoreUnknownKeys = true }

/** Đọc ErrorResponse từ một HttpException (null nếu không phải lỗi HTTP hoặc body không đọc được). */
fun Throwable.apiError(): ApiErrorDto? {
    val http = this as? HttpException ?: return null
    val raw = runCatching { http.response()?.errorBody()?.string() }.getOrNull() ?: return ApiErrorDto(code = "HTTP_${http.code()}")
    return runCatching { errorJson.decodeFromString(ApiErrorDto.serializer(), raw) }.getOrNull()
        ?: ApiErrorDto(code = "HTTP_${http.code()}")
}
