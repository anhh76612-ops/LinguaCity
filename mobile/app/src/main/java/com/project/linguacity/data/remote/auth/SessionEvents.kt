package com.project.linguacity.data.remote.auth

import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import javax.inject.Inject
import javax.inject.Singleton

/** Sự kiện phiên mà lớp mạng báo lên giao diện. */
sealed interface SessionEvent {

    /** Refresh token hết hạn hoặc bị thu hồi: về màn chào. */
    data object Expired : SessionEvent

    /** Khách đã xong tutorial: server trả 403 ACCOUNT_REQUIRED, mở màn "Lưu tiến trình". */
    data object AccountRequired : SessionEvent
}

@Singleton
class SessionEvents @Inject constructor() {

    private val flow = MutableSharedFlow<SessionEvent>(extraBufferCapacity = 8)

    val events: SharedFlow<SessionEvent> = flow.asSharedFlow()

    fun emit(event: SessionEvent) {
        flow.tryEmit(event)
    }
}
