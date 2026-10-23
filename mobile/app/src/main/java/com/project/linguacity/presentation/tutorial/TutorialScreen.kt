package com.project.linguacity.presentation.tutorial

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel

@Composable
fun TutorialScreen(
    viewModel: TutorialViewModel = hiltViewModel(),
    onTutorialCompleted: () -> Unit
) {
    val state by viewModel.state.collectAsState()

    LaunchedEffect(state.isCompleted) {
        if (state.isCompleted) {
            onTutorialCompleted()
        }
    }

    val (title, description) = TutorialSteps.all[state.currentStep]

    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp)
    ) {
        Text(
            text = "${state.currentStep + 1}/${TutorialSteps.all.size}",
            style = MaterialTheme.typography.labelLarge
        )

        Spacer(modifier = Modifier.height(16.dp))

        Text(text = title, style = MaterialTheme.typography.headlineMedium)

        Spacer(modifier = Modifier.height(8.dp))

        Text(text = description, textAlign = TextAlign.Center)

        Spacer(modifier = Modifier.height(32.dp))

        when {
            state.isSubmitting -> CircularProgressIndicator()

            state.isLastStep -> Button(
                onClick = { viewModel.onIntent(TutorialIntent.Complete) }
            ) {
                Text(text = if (state.error == null) "Bắt đầu" else "Thử lại")
            }

            else -> Button(
                onClick = { viewModel.onIntent(TutorialIntent.Next) }
            ) {
                Text(text = "Tiếp")
            }
        }

        state.error?.let { error ->
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = "Không thể lưu tiến trình: $error",
                color = MaterialTheme.colorScheme.error,
                textAlign = TextAlign.Center
            )
        }
    }
}
