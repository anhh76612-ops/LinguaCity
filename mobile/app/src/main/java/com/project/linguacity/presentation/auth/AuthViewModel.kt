package com.project.linguacity.presentation.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.data.remote.apiError
import com.project.linguacity.data.remote.auth.MeDto
import com.project.linguacity.domain.repository.AuthRepository
import com.project.linguacity.domain.repository.AuthResult
import com.project.linguacity.presentation.common.friendlyNetworkError
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import retrofit2.HttpException
import javax.inject.Inject

/** Việc vừa hoàn tất, màn hình đọc để điều hướng rồi gọi {@link AuthViewModel.consumeDone}. */
sealed interface AuthDone {
    data class SignedIn(val result: AuthResult) : AuthDone
    data object Finished : AuthDone
    data object SignedOut : AuthDone
}

/** Đăng nhập Google/Facebook đang chờ người dùng đồng ý bỏ tiến trình khách trên máy. */
data class PendingSocial(val provider: String, val token: String)

data class AuthUiState(
    val loading: Boolean = false,
    val error: String? = null,
    val info: String? = null,
    val done: AuthDone? = null,
    val confirmDiscard: PendingSocial? = null,
    val me: MeDto? = null,
    val codeSent: Boolean = false
)

/** Dùng chung cho các màn SCR-20…SCR-26 (VS6, ADR-016). */
@HiltViewModel
class AuthViewModel @Inject constructor(
    private val repository: AuthRepository
) : ViewModel() {

    private val _state = MutableStateFlow(AuthUiState())
    val state: StateFlow<AuthUiState> = _state.asStateFlow()

    /** Đang là khách chưa gắn tài khoản: đăng nhập tài khoản khác sẽ bỏ tiến trình khách. */
    val isUnlinkedGuest: Boolean get() = repository.session()?.isGuest == true

    fun playAsGuest() = launchTask {
        repository.playAsGuest()
        AuthDone.SignedIn(AuthResult(switchedUser = true, type = "GUEST", emailVerified = false))
    }

    fun login(email: String, password: String) = launchTask {
        if (email.isBlank() || password.isBlank()) {
            throw UserError("Nhập email và mật khẩu nhé.")
        }
        AuthDone.SignedIn(repository.login(email, password))
    }

    fun register(email: String, password: String, confirm: String, name: String) = launchTask {
        if (password != confirm) {
            throw UserError("Hai mật khẩu chưa khớp.")
        }
        AuthDone.SignedIn(repository.register(email, password, name.ifBlank { null }))
    }

    fun social(provider: String, token: String, confirmDiscardGuest: Boolean = false) {
        viewModelScope.launch {
            _state.update { it.copy(loading = true, error = null, confirmDiscard = null) }
            try {
                val result = repository.social(provider, token, confirmDiscardGuest)
                _state.update { it.copy(loading = false, done = AuthDone.SignedIn(result)) }
            } catch (e: Exception) {
                if (e.apiError()?.code == "IDENTITY_LINKED_ELSEWHERE") {
                    _state.update {
                        it.copy(loading = false, confirmDiscard = PendingSocial(provider, token))
                    }
                } else {
                    _state.update { it.copy(loading = false, error = authMessage(e)) }
                }
            }
        }
    }

    fun confirmSocial() {
        val pending = _state.value.confirmDiscard ?: return
        social(pending.provider, pending.token, confirmDiscardGuest = true)
    }

    fun dismissConfirm() = _state.update { it.copy(confirmDiscard = null) }

    fun loadMe() = launchTask(finish = false) {
        val me = repository.me()
        _state.update { it.copy(me = me) }
        null
    }

    fun sendVerifyEmail() = launchTask(finish = false) {
        repository.sendVerifyEmail()
        _state.update { it.copy(codeSent = true, info = "Đã gửi mã 6 số tới email của bạn.") }
        null
    }

    fun verifyEmail(code: String) = launchTask {
        val me = repository.verifyEmail(code)
        _state.update { it.copy(me = me) }
        AuthDone.Finished
    }

    fun forgotPassword(email: String) = launchTask(finish = false) {
        repository.forgotPassword(email)
        _state.update {
            it.copy(
                codeSent = true,
                info = "Nếu email đã đăng ký và xác minh, mã sẽ tới trong ít phút."
            )
        }
        null
    }

    fun resetPassword(email: String, code: String, password: String, confirm: String) = launchTask {
        if (password != confirm) {
            throw UserError("Hai mật khẩu chưa khớp.")
        }
        repository.resetPassword(email, code, password)
        AuthDone.Finished
    }

    fun linkSocial(provider: String, token: String) = launchTask(finish = false) {
        val me = repository.linkSocial(provider, token)
        _state.update { it.copy(me = me, info = "Đã gắn ${providerLabel(provider)}.") }
        null
    }

    fun linkPassword(email: String?, password: String) = launchTask(finish = false) {
        val me = repository.linkPassword(email, password)
        _state.update { it.copy(me = me, info = "Đã đặt mật khẩu cho tài khoản.") }
        null
    }

    fun logout() = launchTask {
        repository.logout()
        AuthDone.SignedOut
    }

    fun deleteAccount(password: String?, provider: String?, providerToken: String?) = launchTask {
        repository.deleteAccount(password, provider, providerToken)
        AuthDone.SignedOut
    }

    fun showError(message: String) = _state.update { it.copy(error = message, loading = false) }

    fun consumeDone() = _state.update { it.copy(done = null) }

    fun clearMessages() = _state.update { it.copy(error = null, info = null) }

    /** Chạy một việc: bật loading, bắt lỗi thành câu dễ hiểu, đặt {@code done} khi xong. */
    private fun launchTask(finish: Boolean = true, block: suspend () -> AuthDone?) {
        viewModelScope.launch {
            _state.update { it.copy(loading = true, error = null, info = null) }
            try {
                val done = block()
                _state.update { it.copy(loading = false, done = if (finish) done else it.done) }
            } catch (e: Exception) {
                _state.update { it.copy(loading = false, error = authMessage(e)) }
            }
        }
    }
}

/** Lỗi kiểm tra ở máy, hiện nguyên văn. */
class UserError(message: String) : Exception(message)

fun providerLabel(provider: String): String = when (provider) {
    "GOOGLE" -> "Google"
    "FACEBOOK" -> "Facebook"
    else -> "email và mật khẩu"
}

/** Đổi mã lỗi của server (ADR-016) thành câu tiếng Việt. */
fun authMessage(e: Throwable): String {
    if (e is UserError) {
        return e.message ?: ""
    }
    if (e !is HttpException) {
        return friendlyNetworkError(e)
    }
    return when (e.apiError()?.code) {
        "INVALID_EMAIL" -> "Email chưa đúng định dạng."
        "WEAK_PASSWORD" -> "Mật khẩu cần 8–72 ký tự, có cả chữ và số."
        "EMAIL_TAKEN" -> "Email này đã có tài khoản. Hãy đăng nhập."
        "INVALID_CREDENTIALS" -> "Email hoặc mật khẩu chưa đúng."
        "TOO_MANY_ATTEMPTS" -> "Sai quá nhiều lần. Thử lại sau 15 phút nhé."
        "OTP_INVALID" -> "Mã chưa đúng."
        "OTP_EXPIRED" -> "Mã đã hết hạn. Gửi lại mã mới nhé."
        "OTP_TOO_SOON" -> "Đợi một phút rồi gửi lại mã nhé."
        "EMAIL_ALREADY_VERIFIED" -> "Email đã được xác minh."
        "EMAIL_BELONGS_TO_OTHER_ACCOUNT" ->
            "Email này đã có tài khoản. Đăng nhập cách cũ rồi gắn thêm trong Tài khoản."
        "IDENTITY_LINKED_ELSEWHERE" -> "Tài khoản này đã gắn với người chơi khác."
        "IDENTITY_ALREADY_LINKED" -> "Cách đăng nhập này đã được gắn rồi."
        "PROVIDER_TOKEN_INVALID" -> "Đăng nhập không thành công. Thử lại nhé."
        "PROVIDER_NOT_CONFIGURED" -> "Máy chủ chưa bật cách đăng nhập này."
        "REAUTH_REQUIRED" -> "Cần xác nhận lại trước khi xoá tài khoản."
        "ACCOUNT_REQUIRED" -> "Cần đăng nhập tài khoản trước."
        else -> friendlyNetworkError(e)
    }
}
