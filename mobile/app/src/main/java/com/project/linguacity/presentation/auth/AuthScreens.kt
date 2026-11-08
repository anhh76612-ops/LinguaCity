package com.project.linguacity.presentation.auth

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.project.linguacity.domain.repository.AuthResult

/** Gọi {@code onDone} một lần khi ViewModel báo xong việc. */
@Composable
private fun OnDone(viewModel: AuthViewModel, onDone: (AuthDone) -> Unit) {
    val state by viewModel.state.collectAsState()
    LaunchedEffect(state.done) {
        state.done?.let {
            viewModel.consumeDone()
            onDone(it)
        }
    }
}

@Composable
private fun SocialConfirm(viewModel: AuthViewModel) {
    val state by viewModel.state.collectAsState()
    if (state.confirmDiscard != null) {
        DiscardGuestDialog(viewModel::confirmSocial, viewModel::dismissConfirm)
    }
}

/** SCR-20 Màn chào: đăng nhập / đăng ký / Google / Facebook / chơi ngay (khách). */
@Composable
fun WelcomeScreen(
    onSignedIn: (AuthResult) -> Unit,
    onLogin: () -> Unit,
    onRegister: () -> Unit,
    viewModel: AuthViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    OnDone(viewModel) { done -> if (done is AuthDone.SignedIn) onSignedIn(done.result) }
    SocialConfirm(viewModel)

    AuthScaffold(
        title = "Chào mừng tới LinguaCity",
        subtitle = "Đăng nhập để lưu thành phố và chơi tiếp trên máy khác."
    ) {
        Spacer(Modifier.height(8.dp))
        SocialButtons(!state.loading, viewModel::social, viewModel::showError)
        PrimaryButton("Đăng nhập bằng email", state.loading, onLogin)
        TextButton(onClick = onRegister, modifier = Modifier.fillMaxWidth()) {
            Text("Chưa có tài khoản? Đăng ký")
        }
        HorizontalDivider()
        TextButton(
            onClick = viewModel::playAsGuest,
            enabled = !state.loading,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Chơi ngay (khách)")
        }
        Text(
            "Khách chơi được phần hướng dẫn; sau đó cần tạo tài khoản để giữ tiến trình.",
            style = MaterialTheme.typography.bodySmall
        )
        AuthMessages(state)
    }
}

/** SCR-23 Lưu tiến trình: khách xong tutorial bắt buộc gắn tài khoản, không có nút bỏ qua. */
@Composable
fun SaveProgressScreen(
    onSignedIn: (AuthResult) -> Unit,
    onLogin: () -> Unit,
    onRegister: () -> Unit,
    viewModel: AuthViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    BackHandler { }
    OnDone(viewModel) { done -> if (done is AuthDone.SignedIn) onSignedIn(done.result) }
    SocialConfirm(viewModel)

    AuthScaffold(
        title = "Lưu thành phố của bạn",
        subtitle = "Bạn đã xong phần hướng dẫn. Tạo tài khoản để giữ nhà, từ vựng và danh hiệu, " +
            "rồi chơi tiếp."
    ) {
        SocialButtons(!state.loading, viewModel::social, viewModel::showError)
        PrimaryButton("Đăng ký bằng email", state.loading, onRegister)
        TextButton(onClick = onLogin, modifier = Modifier.fillMaxWidth()) {
            Text("Tôi đã có tài khoản")
        }
        AuthMessages(state)
    }
}

/** SCR-22 Đăng nhập bằng email. */
@Composable
fun LoginScreen(
    onBack: () -> Unit,
    onSignedIn: (AuthResult) -> Unit,
    onForgot: () -> Unit,
    viewModel: AuthViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    var email by rememberSaveable { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var askDiscard by remember { mutableStateOf(false) }
    OnDone(viewModel) { done -> if (done is AuthDone.SignedIn) onSignedIn(done.result) }

    if (askDiscard) {
        DiscardGuestDialog(
            onConfirm = {
                askDiscard = false
                viewModel.login(email, password)
            },
            onDismiss = { askDiscard = false }
        )
    }

    AuthScaffold(title = "Đăng nhập", onBack = onBack) {
        EmailField(email) { email = it }
        PasswordField(password, { password = it })
        PrimaryButton("Đăng nhập", state.loading) {
            if (viewModel.isUnlinkedGuest) {
                askDiscard = true
            } else {
                viewModel.login(email, password)
            }
        }
        TextButton(onClick = onForgot) { Text("Quên mật khẩu?") }
        AuthMessages(state)
    }
}

/** SCR-21 Đăng ký bằng email; khách đang chơi thì tài khoản gắn vào tiến trình hiện có. */
@Composable
fun RegisterScreen(
    onBack: () -> Unit,
    onRegistered: (AuthResult) -> Unit,
    viewModel: AuthViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    var name by rememberSaveable { mutableStateOf("") }
    var email by rememberSaveable { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var confirm by remember { mutableStateOf("") }
    OnDone(viewModel) { done -> if (done is AuthDone.SignedIn) onRegistered(done.result) }

    AuthScaffold(
        title = "Tạo tài khoản",
        subtitle = "Mật khẩu 8–72 ký tự, có cả chữ và số.",
        onBack = onBack
    ) {
        OutlinedTextField(
            value = name,
            onValueChange = { name = it.take(50) },
            label = { Text("Tên hiển thị (tuỳ chọn)") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )
        EmailField(email) { email = it }
        PasswordField(password, { password = it })
        PasswordField(confirm, { confirm = it }, label = "Nhập lại mật khẩu")
        PrimaryButton("Đăng ký", state.loading) {
            viewModel.register(email, password, confirm, name)
        }
        AuthMessages(state)
    }
}

/** SCR-24 Nhập mã OTP xác minh email (mã đã được gửi khi đăng ký). */
@Composable
fun VerifyEmailScreen(
    onDone: () -> Unit,
    viewModel: AuthViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    var code by rememberSaveable { mutableStateOf("") }
    OnDone(viewModel) { onDone() }

    AuthScaffold(
        title = "Xác minh email",
        subtitle = "Nhập mã 6 số vừa gửi tới email của bạn. Email đã xác minh mới dùng được " +
            "chức năng quên mật khẩu."
    ) {
        CodeField(code) { code = it }
        PrimaryButton("Xác minh", state.loading) { viewModel.verifyEmail(code) }
        TextButton(onClick = viewModel::sendVerifyEmail, enabled = !state.loading) {
            Text("Gửi lại mã")
        }
        TextButton(onClick = onDone) { Text("Để sau") }
        AuthMessages(state)
    }
}

/** SCR-25 Quên mật khẩu: nhập email → nhận mã → đặt mật khẩu mới. */
@Composable
fun ForgotPasswordScreen(
    onBack: () -> Unit,
    onDone: () -> Unit,
    viewModel: AuthViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    var email by rememberSaveable { mutableStateOf("") }
    var code by rememberSaveable { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var confirm by remember { mutableStateOf("") }
    OnDone(viewModel) { onDone() }

    AuthScaffold(
        title = "Quên mật khẩu",
        subtitle = "Chỉ dùng được với email đã xác minh.",
        onBack = onBack
    ) {
        EmailField(email) { email = it }
        if (!state.codeSent) {
            PrimaryButton("Gửi mã", state.loading) { viewModel.forgotPassword(email) }
        } else {
            CodeField(code) { code = it }
            PasswordField(password, { password = it }, label = "Mật khẩu mới")
            PasswordField(confirm, { confirm = it }, label = "Nhập lại mật khẩu mới")
            PrimaryButton("Đặt lại mật khẩu", state.loading) {
                viewModel.resetPassword(email, code, password, confirm)
            }
            TextButton(onClick = { viewModel.forgotPassword(email) }) { Text("Gửi lại mã") }
        }
        AuthMessages(state)
    }
}
