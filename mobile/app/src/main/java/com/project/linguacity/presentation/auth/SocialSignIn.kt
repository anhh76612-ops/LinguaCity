package com.project.linguacity.presentation.auth

import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.ui.platform.LocalContext
import androidx.credentials.CredentialManager
import androidx.credentials.CustomCredential
import androidx.credentials.GetCredentialRequest
import androidx.credentials.exceptions.GetCredentialCancellationException
import androidx.credentials.exceptions.GetCredentialException
import com.facebook.CallbackManager
import com.facebook.FacebookCallback
import com.facebook.FacebookException
import com.facebook.login.LoginManager
import com.facebook.login.LoginResult
import com.google.android.libraries.identity.googleid.GetGoogleIdOption
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential
import com.project.linguacity.BuildConfig
import kotlinx.coroutines.launch

/**
 * Đăng nhập Google qua Credential Manager. Trả hàm mở hộp chọn tài khoản; ID token đưa vào
 * {@code onToken} để gửi lên server kiểm tra (ADR-016).
 */
@Composable
fun rememberGoogleSignIn(onToken: (String) -> Unit, onError: (String) -> Unit): () -> Unit {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    val tokenCallback = rememberUpdatedState(onToken)
    val errorCallback = rememberUpdatedState(onError)
    return remember(context) {
        {
            if (BuildConfig.GOOGLE_WEB_CLIENT_ID.isBlank()) {
                errorCallback.value("App chưa cấu hình GOOGLE_WEB_CLIENT_ID.")
            } else {
                scope.launch {
                    try {
                        val option = GetGoogleIdOption.Builder()
                            .setFilterByAuthorizedAccounts(false)
                            .setServerClientId(BuildConfig.GOOGLE_WEB_CLIENT_ID)
                            .build()
                        val request = GetCredentialRequest.Builder()
                            .addCredentialOption(option)
                            .build()
                        val credential = CredentialManager.create(context)
                            .getCredential(context.findActivity() ?: context, request)
                            .credential
                        val isGoogle = credential is CustomCredential && credential.type ==
                            GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL
                        if (isGoogle) {
                            val idToken = GoogleIdTokenCredential.createFrom(credential.data)
                                .idToken
                            tokenCallback.value(idToken)
                        } else {
                            errorCallback.value("Không nhận được tài khoản Google.")
                        }
                    } catch (cancelled: GetCredentialCancellationException) {
                        // Người dùng đóng hộp chọn: không báo lỗi
                    } catch (e: GetCredentialException) {
                        errorCallback.value("Không đăng nhập được Google: ${e.message ?: e.type}")
                    }
                }
            }
        }
    }
}

/** Đăng nhập Facebook bằng Facebook Login SDK; access token đưa vào {@code onToken}. */
@Composable
fun rememberFacebookSignIn(onToken: (String) -> Unit, onError: (String) -> Unit): () -> Unit {
    val callbackManager = remember { CallbackManager.Factory.create() }
    val tokenCallback = rememberUpdatedState(onToken)
    val errorCallback = rememberUpdatedState(onError)
    val launcher = rememberLauncherForActivityResult(
        LoginManager.getInstance().createLogInActivityResultContract(callbackManager, null)
    ) { }
    DisposableEffect(callbackManager) {
        val loginManager = LoginManager.getInstance()
        loginManager.registerCallback(callbackManager, object : FacebookCallback<LoginResult> {
            override fun onSuccess(result: LoginResult) {
                tokenCallback.value(result.accessToken.token)
            }

            override fun onCancel() {
            }

            override fun onError(error: FacebookException) {
                errorCallback.value("Không đăng nhập được Facebook: ${error.message}")
            }
        })
        onDispose { loginManager.unregisterCallback(callbackManager) }
    }
    return remember(launcher) {
        {
            if (BuildConfig.FACEBOOK_CONFIGURED) {
                launcher.launch(listOf("email", "public_profile"))
            } else {
                errorCallback.value("App chưa cấu hình FACEBOOK_APP_ID.")
            }
        }
    }
}

private fun Context.findActivity(): Activity? {
    var current: Context? = this
    while (current is ContextWrapper) {
        if (current is Activity) {
            return current
        }
        current = current.baseContext
    }
    return null
}
