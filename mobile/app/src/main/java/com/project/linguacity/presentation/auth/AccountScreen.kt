package com.project.linguacity.presentation.auth

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel

/**
 * SCR-26 Tài khoản (trong Cài đặt): email, trạng thái xác minh, cách đăng nhập đã gắn, gắn thêm
 * Google/Facebook/mật khẩu, đăng xuất, xoá tài khoản.
 */
@Composable
fun AccountScreen(
    onBack: () -> Unit,
    onVerifyEmail: () -> Unit,
    onSignedOut: () -> Unit,
    viewModel: AuthViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    var linkPassword by remember { mutableStateOf(false) }
    var confirmLogout by remember { mutableStateOf(false) }
    var confirmDelete by remember { mutableStateOf(false) }
    LaunchedEffect(Unit) { viewModel.loadMe() }
    LaunchedEffect(state.done) {
        if (state.done == AuthDone.SignedOut) {
            viewModel.consumeDone()
            onSignedOut()
        }
    }
    val me = state.me
    val providers = me?.providers.orEmpty()

    AuthScaffold(title = "Tài khoản", onBack = onBack) {
        Card(Modifier.fillMaxWidth()) {
            Column(Modifier.padding(16.dp)) {
                Text(me?.displayName ?: "Người chơi", style = MaterialTheme.typography.titleMedium)
                Text(me?.email ?: "Chưa có email")
                if (me?.email != null) {
                    Text(if (me.emailVerified) "Email đã xác minh" else "Email chưa xác minh")
                }
                Text("Đăng nhập bằng: " + providers.joinToString { providerLabel(it) })
            }
        }
        if (me?.email != null && !me.emailVerified) {
            OutlinedButton(
                onClick = {
                    viewModel.sendVerifyEmail()
                    onVerifyEmail()
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Xác minh email")
            }
        }
        val missingSocial = listOf("GOOGLE", "FACEBOOK").filter { it !in providers }
        if (missingSocial.isNotEmpty()) {
            Text("Gắn thêm cách đăng nhập", style = MaterialTheme.typography.titleSmall)
            SocialButtons(!state.loading, viewModel::linkSocial, viewModel::showError)
        }
        if ("PASSWORD" !in providers && me != null) {
            OutlinedButton(onClick = { linkPassword = true }, modifier = Modifier.fillMaxWidth()) {
                Text("Đặt mật khẩu đăng nhập")
            }
        }
        AuthMessages(state)
        OutlinedButton(onClick = { confirmLogout = true }, modifier = Modifier.fillMaxWidth()) {
            Text("Đăng xuất")
        }
        TextButton(onClick = { confirmDelete = true }, modifier = Modifier.fillMaxWidth()) {
            Text("Xoá tài khoản", color = MaterialTheme.colorScheme.error)
        }
    }

    if (linkPassword) {
        LinkPasswordDialog(
            needsEmail = me?.email == null,
            onConfirm = { email, password ->
                linkPassword = false
                viewModel.linkPassword(email, password)
            },
            onDismiss = { linkPassword = false }
        )
    }
    if (confirmLogout) {
        AlertDialog(
            onDismissRequest = { confirmLogout = false },
            title = { Text("Đăng xuất?") },
            text = { Text("Thành phố vẫn được lưu trong tài khoản. Đăng nhập lại để chơi tiếp.") },
            confirmButton = {
                TextButton(onClick = {
                    confirmLogout = false
                    viewModel.logout()
                }) { Text("Đăng xuất") }
            },
            dismissButton = { TextButton(onClick = { confirmLogout = false }) { Text("Huỷ") } }
        )
    }
    if (confirmDelete) {
        DeleteAccountDialog(
            hasPassword = "PASSWORD" in providers,
            onPassword = { password ->
                confirmDelete = false
                viewModel.deleteAccount(password, null, null)
            },
            onProvider = { provider, token ->
                confirmDelete = false
                viewModel.deleteAccount(null, provider, token)
            },
            onError = viewModel::showError,
            onDismiss = { confirmDelete = false }
        )
    }
}

@Composable
private fun LinkPasswordDialog(
    needsEmail: Boolean,
    onConfirm: (email: String?, password: String) -> Unit,
    onDismiss: () -> Unit
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Đặt mật khẩu") },
        text = {
            Column {
                if (needsEmail) {
                    EmailField(email) { email = it }
                }
                PasswordField(password, { password = it })
            }
        },
        confirmButton = {
            TextButton(onClick = { onConfirm(email.ifBlank { null }, password) }) { Text("Lưu") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Huỷ") } }
    )
}

/** Xoá tài khoản cần xác thực lại: mật khẩu, hoặc đăng nhập lại Google/Facebook. */
@Composable
private fun DeleteAccountDialog(
    hasPassword: Boolean,
    onPassword: (String) -> Unit,
    onProvider: (provider: String, token: String) -> Unit,
    onError: (String) -> Unit,
    onDismiss: () -> Unit
) {
    var password by remember { mutableStateOf("") }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Xoá tài khoản?") },
        text = {
            Column {
                Text(
                    "Mọi cách đăng nhập sẽ bị gỡ và không khôi phục được thành phố. " +
                        "Xác nhận lại để tiếp tục."
                )
                if (hasPassword) {
                    PasswordField(password, { password = it })
                } else {
                    SocialButtons(true, onProvider, onError)
                }
            }
        },
        confirmButton = {
            if (hasPassword) {
                TextButton(onClick = { onPassword(password) }) {
                    Text("Xoá", color = MaterialTheme.colorScheme.error)
                }
            }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Huỷ") } }
    )
}
