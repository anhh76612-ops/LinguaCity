# ADR-010: City View bằng Three.js (web), nhúng qua WebView

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | 🟡 **Proposed**. Prototype `city-web/` đã chạy; chờ thử nhúng vào Android trước khi chuyển sang Accepted |
| **Giai đoạn** | Sau VS2, trước VS5 |
| **Liên quan** | ADR-001 · ADR-009 (nếu ADR này được chấp nhận, ADR-009 chuyển sang *Superseded by ADR-010*) · GDD §5, §6.2 · `city-web/README.md` |

## Context
- ADR-009 đề xuất vẽ City View bằng **Unity** nhúng vào app Kotlin (*Unity as a Library*) và đang chờ Tech Spike.
- Yêu cầu mới: phong cách **isometric 3D low-poly** (giống game xây thành phố), có công trình đổi theo level và **người dân đi lại**.
- Định hướng dài hạn: **đa nền tảng** (web theo dõi tiến độ, app di động, có thể có PC).
- Dự án do một người làm, mục tiêu vừa học vừa làm. Cần mã dễ đọc, dễ hiểu.

## Decision
1. City View là một **dự án web độc lập** `city-web/` (Three.js + TypeScript + Vite). Mọi mô hình được dựng bằng code, không dùng asset ngoài.
2. Trên Android, bản build `dist/` được đóng gói trong `assets` và hiển thị bằng **WebView** (`WebViewAssetLoader`). Trên web thì chạy trực tiếp; iOS dùng `WKWebView`; desktop dùng Tauri/Electron.
3. Giữ nguyên nguyên tắc của ADR-009: **bản đồ chỉ hiển thị**. Nó nhận `CityState` (JSON) và gửi *intent* (`BuildingTapped`, `CityEventTapped`, `Ready`). Ứng dụng chủ vẫn là nơi duy nhất gọi Backend.
4. Interface `CityRenderer` ở Kotlin (theo ADR-009) vẫn dùng được. Bản cài đặt chính đổi thành `WebCityRenderer`, còn `ComposeCityRenderer` giữ làm đường lui.

## Reason
| Tiêu chí | Three.js + WebView (chọn) | Unity nhúng (ADR-009) |
| :--- | :--- | :--- |
| Dung lượng thêm vào APK | ✅ ≈ 0.6 MB (157 KB gzip) | 🔴 +30–80 MB |
| Web | ✅ Chạy thẳng, tải nhanh | 🟡 WebGL build nặng, chậm trên điện thoại |
| Android / iOS / PC | ✅ Một mã nguồn, mỗi nền tảng chỉ cần lớp vỏ mỏng | ✅ Tốt, nhưng mỗi nền tảng một bản build lớn |
| Độ khó tích hợp | ✅ WebView + JS bridge là API chuẩn | 🔴 Một instance/process, khớp NDK/Gradle, Activity riêng |
| Công cụ | ✅ Trình soạn code, hot reload | 🟡 Cần Unity Editor, dựng scene thủ công |
| Đồ hoạ phức tạp (vật lý, hàng trăm model) | 🟡 Phải tự làm | ✅ Mạnh nhất |
| Giá trị học tập | ✅ Đọc hiểu từng dòng: camera, ánh sáng, hoạt ảnh, tìm đường | 🟡 Nhiều thứ ẩn trong Editor |

Phần học tập vẫn là phần nặng nhất của sản phẩm. Bản đồ chỉ có 4 công trình và vài chục đối tượng chuyển động, nên không cần sức mạnh của một game engine đầy đủ.

## Alternatives đã cân nhắc
- **Unity (ADR-009):** chỉ chọn lại nếu phần game trở nên nặng hơn phần học (vật lý, nhiều cảnh, hiệu ứng hạt phức tạp).
- **SceneView/Filament (native Android):** nhẹ, thuần Kotlin, nhưng chỉ chạy trên Android, ít tài liệu, tự làm hoạt ảnh khó hơn.
- **Compose Canvas 2.5D:** đơn giản nhất nhưng không phải 3D thật, nhân vật là sprite; vẫn giữ làm đường lui.

## Consequence / Rủi ro cần theo dõi
- 🟡 **Hiệu năng WebView trên máy yếu.** Đã giảm bằng: bóng tĩnh, bóng giả cho người/xe, gộp draw call (khoảng 200 lần vẽ/khung), pixelRatio ≤ 1.75 trên thiết bị cảm ứng. Cần đo trên máy Android tầm trung thật.
- 🟡 **Nạp file:** không mở `index.html` bằng `file://` (module ES bị chặn). Phải dùng `WebViewAssetLoader`.
- 🟡 **Cầu nối là chuỗi JSON:** phía Kotlin cần kiểm tra dữ liệu đầu vào, giống như bản đồ đã làm với `normalizeState()`.
- 🟢 Repo thêm thư mục `city-web/` (Node). `node_modules/` và `dist/` được bỏ qua trong `.gitignore`.

## Tiêu chí chuyển sang Accepted
- [x] Bản đồ có 4 công trình × 3 level, trạng thái đang xây, người dân đi lại, dấu (!).
- [x] Chạm công trình và dấu (!) phát đúng intent (đã kiểm tra trên trình duyệt).
- [x] Hiển thị đúng ở khung điện thoại 375×812.
- [ ] Nhúng `dist/` vào app Android qua WebView, Kotlin gửi `CityState` và nhận `BuildingTapped`.
- [ ] Đo FPS và bộ nhớ trên một máy Android thật.

## Lesson
Khi một quyết định công nghệ còn ở trạng thái *Proposed*, hãy làm prototype nhỏ cho từng phương án. Chọn phương án hợp với **phạm vi thật** của sản phẩm, không phải phương án mạnh nhất.
