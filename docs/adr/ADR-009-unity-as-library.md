# ADR-009: Kotlin là ứng dụng chủ, Unity nhúng vào làm phần hiển thị thành phố (Unity as a Library)

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | 🟡 **Proposed** — chờ kết quả Tech Spike (TS-UNITY) |
| **Giai đoạn** | Sau VS2, trước VS5 |
| **Liên quan** | ADR-001 · System Design Ch.9 · GDD §5 · 04-ui/screen-catalog.md |

## Context
- Ý tưởng mới: phần game (thành phố, công trình, hiệu ứng) làm bằng **Unity**, các màn hình học tập (flashcard, quiz, thi) làm bằng **Kotlin**. Về sau có thể làm thêm web để theo dõi tiến độ / cộng đồng.
- Toàn bộ thiết kế cũ (SRS, System Design v3, ADR-001) giả định **Jetpack Compose vẽ cả City View**.
- VS1 đã code xong bằng Kotlin (Room, Retrofit, Hilt, DataStore). Dự án do **một người** thực hiện, mục tiêu vừa học vừa làm.

## Decision
1. **Ứng dụng chủ là Android/Kotlin.** Kotlin giữ điều hướng, mọi màn hình học tập, Room, Retrofit, Hilt và **là client duy nhất gọi Backend**.
2. **Unity chỉ là phần hiển thị (renderer) của City View**, được build thành thư viện Android (`unityLibrary`) và nhúng vào app.
3. Unity **không gọi API, không giữ logic tài nguyên, không lưu dữ liệu**. Unity chỉ:
   - nhận `CityState` (JSON) từ Kotlin để vẽ;
   - gửi **ý định (intent)** của người chơi về Kotlin, ví dụ `BuildingTapped(buildingCode)`, `UpgradeRequested(buildingCode)`.
4. Ở Kotlin, City View được truy cập qua interface `CityRenderer`, có hai bản cài đặt:
   - `ComposeCityRenderer`: danh sách/lưới 4 công trình đơn giản, dùng khi phát triển VS2–VS4 và làm đường lui;
   - `UnityCityRenderer`: bản chính sau khi Tech Spike đạt.

## Reason
| Tiêu chí | Kotlin chủ + Unity nhúng (chọn) | Unity chủ + plugin Kotlin | Toàn bộ Unity |
| :--- | :--- | :--- | :--- |
| Màn hình học (chữ, nhập liệu tiếng Việt, danh sách dài) | ✅ Compose làm tốt | 🟡 Phải mở Activity Kotlin từ plugin | 🔴 UI Toolkit/uGUI kém hơn cho form |
| Giữ code VS1 | ✅ Giữ nguyên | 🟡 Một phần | 🔴 Viết lại bằng C# |
| Server Authority (một nơi gọi API) | ✅ Chỉ Kotlin | 🔴 Dễ bị gọi API từ cả hai phía | ✅ Chỉ C# |
| Hình ảnh thành phố, hiệu ứng | ✅ Unity | ✅ Unity | ✅ Unity |
| Ra iOS sau này | 🔴 Phải viết lại host bằng Swift | 🟡 | ✅ |
| Độ khó tích hợp | 🟡 Cao vừa (cần Tech Spike) | 🔴 Cao | ✅ Thấp |
| Giá trị học tập / portfolio | ✅ Android + Spring + Unity | 🟡 | 🟡 Mất phần Android |

Phần học tập là phần nặng nhất của sản phẩm (theo SRS và GDD), nên ứng dụng chủ phải mạnh về giao diện học tập → Kotlin.

## Alternatives đã cân nhắc
- **Chỉ Compose (bỏ Unity):** đơn giản nhất, nhưng thành phố chỉ là lưới 2D tĩnh. Vẫn được giữ làm **đường lui** qua `ComposeCityRenderer`.
- **Unity chủ:** chỉ nên chọn lại nếu ưu tiên ra iOS sớm hoặc phần game trở nên nặng hơn phần học.

## Consequence / Rủi ro cần theo dõi
- 🔴 **Dung lượng APK** tăng thêm khoảng 30–80 MB (Unity runtime).
- 🔴 **Chỉ một Unity instance** trong một process; Unity chạy trong Activity riêng (`UnityPlayerActivity`), chuyển qua lại Compose ↔ Unity cần thiết kế cẩn thận.
- 🟡 **Build pipeline:** Unity export Android project → module `unityLibrary` → thêm vào `mobile/settings.gradle.kts`. Phải khớp phiên bản NDK, Gradle, `minSdk` giữa hai bên.
- 🟡 **Cầu nối:** Kotlin → Unity qua `UnityPlayer.UnitySendMessage(gameObject, method, json)`; Unity → Kotlin qua `AndroidJavaProxy`/`AndroidJavaClass` gọi một interface Kotlin.
- 🟡 Repo cần thêm thư mục `unity/` (project Unity) và cập nhật `.gitignore` (Library/, Temp/, Build/).

## Tiêu chí Tech Spike TS-UNITY (để đổi trạng thái sang Accepted)
- [ ] Mở được một scene Unity (4 khối công trình) từ một nút trong app Compose.
- [ ] Kotlin gửi `CityState` JSON → Unity hiển thị đúng level của 4 công trình.
- [ ] Chạm vào công trình trong Unity → Kotlin nhận được `BuildingTapped` và hiển thị Toast/Log.
- [ ] Quay lại màn hình Compose không crash; mở lại Unity lần 2 không crash.
- [ ] Ghi lại dung lượng APK trước/sau và thời gian build.
- **Giới hạn thời gian:** tối đa 1–2 tuần. Quá thời hạn hoặc không đạt → giữ `ComposeCityRenderer`, đổi ADR sang **Rejected** và ghi bài học.

## Lesson
Quyết định công nghệ lớn nên được **thử nhỏ, có thời hạn** trước khi đưa vào lộ trình chính; luôn giữ một đường lui.
