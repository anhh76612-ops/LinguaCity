package com.project.linguacity.presentation.auth

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp

/** Khung chung: nút quay lại (tuỳ chọn), tiêu đề, nội dung cuộn được. */
@Composable
fun AuthScaffold(
    title: String,
    subtitle: String? = null,
    onBack: (() -> Unit)? = null,
    content: @Composable ColumnScope.() -> Unit
) {
    Column(
        Modifier
            .fillMaxSize()
            .statusBarsPadding()
            .navigationBarsPadding()
            .verticalScroll(rememberScrollState())
            .padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        if (onBack != null) {
            TextButton(onClick = onBack) { Text("‹ Quay lại") }
        }
        Text(title, style = MaterialTheme.typography.headlineSmall)
        if (subtitle != null) {
            Text(subtitle, style = MaterialTheme.typography.bodyMedium)
        }
        content()
    }
}

@Composable
fun AuthMessages(state: AuthUiState) {
    state.error?.let {
        Text(it, color = MaterialTheme.colorScheme.error)
    }
    state.info?.let {
        Text(it, color = MaterialTheme.colorScheme.primary)
    }
}

@Composable
fun EmailField(value: String, onChange: (String) -> Unit) {
    OutlinedTextField(
        value = value,
        onValueChange = onChange,
        label = { Text("Email") },
        singleLine = true,
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
        modifier = Modifier.fillMaxWidth()
    )
}

@Composable
fun PasswordField(value: String, onChange: (String) -> Unit, label: String = "Mật khẩu") {
    OutlinedTextField(
        value = value,
        onValueChange = onChange,
        label = { Text(label) },
        singleLine = true,
        visualTransformation = PasswordVisualTransformation(),
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
        modifier = Modifier.fillMaxWidth()
    )
}

@Composable
fun CodeField(value: String, onChange: (String) -> Unit) {
    OutlinedTextField(
        value = value,
        onValueChange = { text -> onChange(text.filter(Char::isDigit).take(6)) },
        label = { Text("Mã 6 số") },
        singleLine = true,
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.NumberPassword),
        modifier = Modifier.fillMaxWidth()
    )
}

@Composable
fun PrimaryButton(text: String, loading: Boolean, onClick: () -> Unit) {
    Button(onClick = onClick, enabled = !loading, modifier = Modifier.fillMaxWidth()) {
        if (loading) {
            CircularProgressIndicator(Modifier.padding(2.dp), strokeWidth = 2.dp)
        } else {
            Text(text)
        }
    }
}

/** Nút Google + Facebook; token nhận được chuyển cho {@code onToken(provider, token)}. */
@Composable
fun SocialButtons(
    enabled: Boolean,
    onToken: (provider: String, token: String) -> Unit,
    onError: (String) -> Unit
) {
    val google = rememberGoogleSignIn({ onToken("GOOGLE", it) }, onError)
    val facebook = rememberFacebookSignIn({ onToken("FACEBOOK", it) }, onError)
    OutlinedButton(onClick = google, enabled = enabled, modifier = Modifier.fillMaxWidth()) {
        Text("Tiếp tục với Google")
    }
    OutlinedButton(onClick = facebook, enabled = enabled, modifier = Modifier.fillMaxWidth()) {
        Text("Tiếp tục với Facebook")
    }
}

/** Hỏi trước khi vào tài khoản có sẵn và bỏ tiến trình khách trên máy. */
@Composable
fun DiscardGuestDialog(onConfirm: () -> Unit, onDismiss: () -> Unit) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Vào tài khoản có sẵn?") },
        text = {
            Text(
                "Tài khoản này đã có thành phố riêng. Tiến trình khách trên máy này sẽ không " +
                    "được gộp vào. Bạn vẫn muốn tiếp tục?"
            )
        },
        confirmButton = { TextButton(onClick = onConfirm) { Text("Tiếp tục") } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Huỷ") } }
    )
}
