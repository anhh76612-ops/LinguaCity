package com.project.linguacity.presentation.city.web

import android.annotation.SuppressLint
import android.content.Context
import android.content.pm.ApplicationInfo
import android.net.Uri
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewCompat
import androidx.webkit.WebViewFeature
import com.project.linguacity.domain.model.city.CityState
import com.project.linguacity.presentation.city.CityMapIntent
import com.project.linguacity.presentation.city.CityRenderer
import org.json.JSONObject

/**
 * Bản đồ 3D city-web chạy trong WebView (ADR-010).
 *
 *   Kotlin ──setState(json)──▶ WebView (Three.js)          chiều vào: evaluateJavascript
 *   Kotlin ◀──postMessage(json)── window.AndroidBridge      chiều ra : WebMessageListener
 *
 * Bản build city-web/dist được Gradle chép vào assets/city/ (xem app/build.gradle.kts).
 */
object WebCityRenderer : CityRenderer {

    private const val TAG = "WebCityRenderer"

    /**
     * Tên miền "giả" mà WebViewAssetLoader phục vụ file trong assets.
     * Không mở bằng file:// vì trình duyệt chặn ES module từ file://.
     */
    private const val ORIGIN = "https://appassets.androidplatform.net"
    private const val START_URL = "$ORIGIN/assets/city/index.html"

    @Composable
    override fun Render(
        state: CityState,
        onIntent: (CityMapIntent) -> Unit,
        modifier: Modifier
    ) {
        // Luôn gọi lambda MỚI NHẤT, dù WebView chỉ được tạo một lần.
        val currentOnIntent by rememberUpdatedState(onIntent)
        // Bản đồ chỉ nhận state sau khi nó báo Ready (trước đó window.LinguaCity chưa có).
        var mapReady by remember { mutableStateOf(false) }
        val stateJson = remember(state) { CityBridgeJson.encodeState(state) }

        AndroidView(
            modifier = modifier,
            factory = { context ->
                createWebView(context) { raw ->
                    when (val intent = CityBridgeJson.decodeIntent(raw)) {
                        null -> Log.w(TAG, "Bỏ qua intent không hợp lệ: $raw")
                        CityMapIntent.Ready -> {
                            mapReady = true
                            currentOnIntent(intent)
                        }
                        else -> currentOnIntent(intent)
                    }
                }
            },
            // Chạy lại mỗi khi stateJson đổi hoặc mapReady chuyển sang true.
            update = { webView -> if (mapReady) webView.pushState(stateJson) },
            onRelease = { webView -> webView.destroy() }
        )
    }

    private fun WebView.pushState(json: String) {
        // JSONObject.quote biến chuỗi JSON thành một chuỗi JavaScript an toàn (thoát dấu nháy, xuống dòng…).
        evaluateJavascript("window.LinguaCity && LinguaCity.setState(${JSONObject.quote(json)})", null)
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun createWebView(context: Context, onMessage: (String) -> Unit): WebView {
        val debuggable = context.applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE != 0
        // Bản debug: mở chrome://inspect trên máy tính để xem console của bản đồ.
        WebView.setWebContentsDebuggingEnabled(debuggable)

        val assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(context))
            .build()

        return WebView(context).apply {
            settings.javaScriptEnabled = true
            settings.allowFileAccess = false   // chỉ đọc file qua assetLoader
            settings.allowContentAccess = false
            setBackgroundColor(0xFFCFE8F3.toInt()) // màu trời, tránh chớp trắng khi đang tải

            webViewClient = object : WebViewClient() {
                override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? =
                    assetLoader.shouldInterceptRequest(request.url)

                // Bản đồ không bao giờ cần đi tới trang khác: chặn mọi điều hướng.
                override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean = true
            }

            attachBridge(this, onMessage)
            loadUrl(START_URL)
        }
    }

    /**
     * Tạo đối tượng window.AndroidBridge với hàm postMessage(json) — đúng tên mà city-web/src/bridge/bridge.ts gọi.
     *
     * Ưu tiên WebMessageListener: chỉ trang từ [ORIGIN] mới thấy đối tượng này, và callback chạy trên main thread.
     * WebView quá cũ không hỗ trợ thì lùi về addJavascriptInterface (callback chạy trên luồng khác → post về main).
     */
    private fun attachBridge(webView: WebView, onMessage: (String) -> Unit) {
        if (WebViewFeature.isFeatureSupported(WebViewFeature.WEB_MESSAGE_LISTENER)) {
            WebViewCompat.addWebMessageListener(webView, "AndroidBridge", setOf(ORIGIN)) { _, message, sourceOrigin, isMainFrame, _ ->
                if (isMainFrame && sourceOrigin == Uri.parse(ORIGIN)) message.data?.let(onMessage)
            }
        } else {
            webView.addJavascriptInterface(object {
                @JavascriptInterface
                fun postMessage(json: String) {
                    webView.post { onMessage(json) }
                }
            }, "AndroidBridge")
        }
    }
}
