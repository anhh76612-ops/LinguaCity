package com.project.linguacity.data.remote.auth

import com.project.linguacity.data.local.preferences.TokenStore
import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject

/**
 * Gắn {@code Authorization: Bearer} cho mọi request khi đã có phiên, và bỏ header
 * {@code X-Guest-UUID} cũ mà các API còn khai báo (ADR-016). Báo
 * {@link SessionEvent.AccountRequired} khi server trả 403 ACCOUNT_REQUIRED.
 */
class AuthInterceptor @Inject constructor(
    private val store: TokenStore,
    private val events: SessionEvents
) : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {
        val original = chain.request()
        val session = store.session()
        val builder = original.newBuilder()
        if (session != null) {
            builder.removeHeader(LEGACY_HEADER)
            if (original.header(AUTHORIZATION) == null) {
                builder.header(AUTHORIZATION, "Bearer ${session.accessToken}")
            }
        }
        val response = chain.proceed(builder.build())
        if (response.code == 403) {
            val body = runCatching { response.peekBody(2048).string() }.getOrNull()
            if (body?.contains("\"ACCOUNT_REQUIRED\"") == true) {
                events.emit(SessionEvent.AccountRequired)
            }
        }
        return response
    }

    companion object {
        const val AUTHORIZATION = "Authorization"
        const val LEGACY_HEADER = "X-Guest-UUID"
    }
}
