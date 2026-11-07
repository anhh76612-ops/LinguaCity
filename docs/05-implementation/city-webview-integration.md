# Bài học: nhúng bản đồ city-web vào app Android (WebView)

> Liên quan: [ADR-010](../adr/ADR-010-city-view-threejs-webview.md) · [ADR-011](../adr/ADR-011-city-state-contract.md) (hai hợp đồng A/B, `toRenderState`) · [system-design §9.2](../03-architecture/system-design.md) · [city-web/README.md](../../city-web/README.md) · code tại `mobile/app/src/main/java/com/project/linguacity/presentation/city/`
>
> **Cập nhật sau Bước 3:** renderer nhận `CityRenderState` (dữ liệu để vẽ), không nhận `CityState` (dữ liệu giống server) nữa. Câu hỏi thêm: *vì sao `progress` được tính ở `CityRenderState.kt` chứ không ở `cityState.ts`?* (gợi ý: đọc bảng Reason của ADR-011).

## 1. Bức tranh toàn cảnh

```text
FakeCityRepository ──StateFlow<CityState>──▶ CityViewModel ──CityUiState──▶ CityScreen (Compose)
        ▲                                         ▲                               │
        │ startUpgrade / resolveEvent             │ CityIntent.Map(...)           │ renderer.Render(state, onIntent)
        │                                         │                               ▼
        └───────────── nghiệp vụ ─────────────────┘                 WebCityRenderer (AndroidView + WebView)
                                                                       │ evaluateJavascript("LinguaCity.setState(json)")
                                                                       ▼
                                                              city-web (Three.js) ──AndroidBridge.postMessage(json)──▶ lên trên
```

**Nguyên tắc:** bản đồ chỉ **hiển thị** và **báo lại** người chơi đã chạm vào đâu. Còn quyết định được nâng cấp hay không (và sau này là gọi Backend) thì nằm ở ViewModel và Repository.

## 2. Đọc code theo thứ tự

| # | File | Loại | Học được gì |
|---|---|---|---|
| 1 | `domain/model/city/City.kt` | A | Model nghiệp vụ, không phụ thuộc Android |
| 2 | `presentation/city/CityRenderer.kt` | A | **Interface làm "ổ cắm"**: đổi cách vẽ mà không phải sửa màn hình |
| 3 | `presentation/city/web/CityBridgeJson.kt` | A | Hợp đồng JSON; không tin dữ liệu từ bên ngoài |
| 4 | `presentation/city/web/WebCityRenderer.kt` | A | WebView, WebViewAssetLoader, cầu nối 2 chiều, vòng đời |
| 5 | `presentation/city/CityViewModel.kt`, `CityContract.kt` | A | MVI: Intent → State |
| 6 | `presentation/city/CityScreen.kt` | B | UI Compose chồng lên bản đồ |
| 7 | `data/repository/FakeCityRepository.kt`, `di/RepositoryModule.kt` | B | Dữ liệu giả lập; Hilt `@Binds` để sau này thay bằng bản thật |
| 8 | `presentation/city/compose/ComposeCityRenderer.kt` | B | Đường lui khi không dùng được WebView |
| 9 | `app/build.gradle.kts` (task `syncCityWeb`) | C | Gradle chép `city-web/dist` vào assets |

## 3. Câu hỏi theo 5 tầng

Hãy tự trả lời trước khi xem gợi ý.

### WebViewAssetLoader (`WebCityRenderer.createWebView`)
1. **Cái gì:** URL `https://appassets.androidplatform.net/assets/city/index.html` thật ra trỏ tới đâu?
   <details><summary>Gợi ý</summary>Không đi ra Internet. `shouldInterceptRequest` chặn mọi request và `AssetsPathHandler` trả file trong `assets/` của APK.</details>
2. **Tại sao:** vì sao không dùng `file:///android_asset/city/index.html`?
   <details><summary>Gợi ý</summary>Trình duyệt chặn ES module (`<script type="module">`) nạp từ `file://` (lỗi CORS). Ngoài ra bật quyền đọc file cũng là một lỗ hổng bảo mật.</details>
3. **Nếu… thì sao:** xoá dòng `shouldOverrideUrlLoading = true` rồi bản đồ có một link `https://evil.com` thì sao?
   <details><summary>Gợi ý</summary>WebView sẽ mở trang đó. Nếu dùng `addJavascriptInterface`, trang lạ còn gọi được `AndroidBridge`. `addWebMessageListener` với `setOf(ORIGIN)` thì chỉ mở cho đúng một origin.</details>

### Cầu nối 2 chiều
4. **Như thế nào:** chạy tay. Người chơi chạm School thì những hàm nào chạy, theo thứ tự nào, cho đến khi thẻ Compose hiện lên?
   <details><summary>Gợi ý</summary>`emit()` trong bridge.ts → `AndroidBridge.postMessage(json)` → listener → `CityBridgeJson.decodeIntent` → `onIntent` → `CityViewModel.onMapIntent` → `_state.update(selected = SCHOOL)` → Compose vẽ lại `BuildingCard`.</details>
5. **Tại sao** phải đợi `Ready` rồi mới `setState`?
   <details><summary>Gợi ý</summary>`window.LinguaCity` chỉ tồn tại sau khi script của bản đồ chạy xong. Gọi sớm thì lệnh bị bỏ qua và bản đồ hiện dữ liệu giả lập thay vì dữ liệu thật.</details>
6. **Nếu… thì sao:** bỏ `JSONObject.quote()` và nối thẳng chuỗi JSON vào lệnh JavaScript, rồi tên sự kiện có dấu `'` thì sao?
   <details><summary>Gợi ý</summary>Lệnh JavaScript bị gãy, hoặc tệ hơn là chạy mã lạ. Đây chính là lỗi *injection*.</details>
7. **Như thế nào:** `addJavascriptInterface` gọi callback trên luồng nào? Vì sao trong nhánh fallback phải có `webView.post { }`?
   <details><summary>Gợi ý</summary>Callback chạy trên luồng nền "JavaBridge". Compose state và View chỉ được sửa trên main thread.</details>

### Compose ⇄ View (`AndroidView`)
8. **Cái gì:** `factory`, `update` và `onRelease` lần lượt chạy khi nào?
9. **Nếu… thì sao:** tạo WebView trong `update` thay vì trong `factory` thì sao?
   <details><summary>Gợi ý</summary>Mỗi lần state đổi lại tạo một WebView mới, nạp lại toàn bộ bản đồ và rò bộ nhớ.</details>
10. **Tại sao** cần `rememberUpdatedState(onIntent)`?
    <details><summary>Gợi ý</summary>Listener được gắn một lần trong `factory`. Nếu bắt thẳng `onIntent`, nó sẽ giữ mãi lambda của lần vẽ đầu tiên.</details>

### Thiết kế
11. Muốn đổi sang Unity hay bản Compose thì phải sửa những file nào?
    <details><summary>Gợi ý</summary>Chỉ cần viết thêm một class cài đặt `CityRenderer` rồi truyền `renderer = ...` cho `CityScreen`. ViewModel và Repository giữ nguyên. Thử ngay bằng `ComposeCityRenderer`.</details>
12. Đến VS5, khi có Backend thật, phải sửa những gì?
    <details><summary>Gợi ý</summary>Viết `CityRepositoryImpl` gọi API, rồi đổi một dòng `@Binds` trong `RepositoryModule`. Phần hợp đồng `CityState` thì xem Bước 3 của lộ trình.</details>
13. Vì sao `CityBridgeJson` được tách riêng khỏi `WebCityRenderer`?
    <details><summary>Gợi ý</summary>Để test được trên JVM mà không cần máy Android (`CityBridgeJsonTest`, 4 test).</details>

## 4. Bài tập thực hành
1. Trong `CityScreen`, đổi `renderer = WebCityRenderer` thành `ComposeCityRenderer`, chạy lại app, rồi giải thích vì sao ViewModel không cần sửa.
2. Thêm intent `BuildingLongPressed` ở cả hai phía: TypeScript (`cityState.ts`, `main.ts`) và Kotlin (`CityMapIntent`, `CityBridgeJson`, test).
3. Mở `chrome://inspect` trên máy tính khi app debug đang chạy, rồi gõ `LinguaCity.getState()` trong console.
4. Gửi `{"type":"BuildingTapped","buildingCode":"CASTLE"}` qua console và đọc Logcat. Dòng nào bảo vệ app?

## 5. Cách chạy

```bash
cd city-web && npm install && npm run build
```

Sau đó mở `mobile/` bằng Android Studio và bấm Run. Gradle tự chép `dist/` vào APK (task `syncCityWeb`). Nếu quên build city-web, log Gradle sẽ có cảnh báo và màn City sẽ trống.

> Muốn vào thẳng màn City mà không cần Backend: tạm đổi `startDestination = HomeRoute` trong `AppNavHost.kt`, nhưng **nhớ đổi lại** trước khi commit.

## 6. Đã kiểm chứng và còn thiếu
- ✅ Emulator Pixel 5 (API 34+):
  - Bản đồ hiện, lấy level từ Kotlin.
  - Chạm School mở thẻ Compose.
  - Bấm Nâng cấp thì thấy giàn giáo và tiến độ, rồi lên Lv 2.
  - `CityEventTapped` làm mất dấu (!) và hiện snackbar.
  - JSON rác bị bỏ qua, có log.
- ✅ `CityBridgeJsonTest`: 4/4 test qua.
- ⬜ Đo FPS và bộ nhớ trên **máy Android thật** (emulator không đại diện cho hiệu năng). Đây là điều kiện cuối để ADR-010 chuyển sang *Accepted*.
- ⬜ Khi WebView bị hệ thống kill (`onRenderProcessGone`) thì cần tạo lại. Chưa xử lý.
