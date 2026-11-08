package com.project.linguacity.presentation.auth

import androidx.lifecycle.ViewModel
import com.project.linguacity.data.remote.auth.SessionEvent
import com.project.linguacity.data.remote.auth.SessionEvents
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharedFlow
import javax.inject.Inject

/** Đưa sự kiện phiên (hết hạn, cần tài khoản) từ lớp mạng lên AppNavHost. */
@HiltViewModel
class SessionViewModel @Inject constructor(sessionEvents: SessionEvents) : ViewModel() {

    val events: SharedFlow<SessionEvent> = sessionEvents.events
}
