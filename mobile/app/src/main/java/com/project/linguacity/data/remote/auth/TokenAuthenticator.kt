package com.project.linguacity.data.remote.auth

import android.os.Build
import com.project.linguacity.data.local.preferences.TokenStore
import okhttp3.Authenticator
import okhttp3.Request
import okhttp3.Response
import okhttp3.Route
import java.io.IOException
import javax.inject.Inject

/**
 * Access token hết hạn (401) → đổi refresh token lấy cặp mới rồi gửi lại request. Khoá chung để
 * nhiều request cùng gặp 401 chỉ refresh một lần: refresh token xoay vòng, gửi lại token cũ sẽ
 * khiến server thu hồi cả phiên. Refresh hỏng hẳn → xoá phiên, báo {@link SessionEvent.Expired}.
 */
class TokenAuthenticator @Inject constructor(
    private val store: TokenStore,
    private val refreshApi: RefreshApi,
    private val events: SessionEvents
) : Authenticator {

    override fun authenticate(route: Route?, response: Response): Request? {
        val request = response.request
        val sent = request.header(AuthInterceptor.AUTHORIZATION)
            ?.removePrefix("Bearer ")
            ?: return null
        if (!canRefresh(request.url.encodedPath) || priorResponses(response) > 1) {
            return null
        }
        synchronized(LOCK) {
            val current = store.session() ?: return null
            if (current.accessToken != sent) {
                // Request khác vừa refresh xong: dùng token mới
                return request.withToken(current.accessToken)
            }
            val result = try {
                refreshApi.refresh(RefreshDto(current.refreshToken, deviceName())).execute()
            } catch (offline: IOException) {
                return null
            }
            val body = result.body()
            if (result.isSuccessful && body != null) {
                store.save(body)
                return request.withToken(body.accessToken)
            }
            if (result.code() == 401) {
                store.clear()
                events.emit(SessionEvent.Expired)
            }
            return null
        }
    }

    private fun Request.withToken(token: String): Request =
        newBuilder().header(AuthInterceptor.AUTHORIZATION, "Bearer $token").build()

    private fun priorResponses(response: Response): Int {
        var count = 1
        var prior = response.priorResponse
        while (prior != null) {
            count++
            prior = prior.priorResponse
        }
        return count
    }

    companion object {
        private val LOCK = Any()

        /** Các route xác thực tự trả 401 vì sai thông tin, refresh không giúp gì. */
        private val NO_REFRESH = listOf(
            "/api/v1/auth/login",
            "/api/v1/auth/register",
            "/api/v1/auth/google",
            "/api/v1/auth/facebook",
            "/api/v1/auth/refresh",
            "/api/v1/auth/guest",
            "/api/v1/auth/password/",
            "/api/v1/auth/account"
        )

        fun canRefresh(path: String): Boolean = NO_REFRESH.none { path.startsWith(it) }

        fun deviceName(): String = "${Build.MANUFACTURER} ${Build.MODEL}".take(100)
    }
}
