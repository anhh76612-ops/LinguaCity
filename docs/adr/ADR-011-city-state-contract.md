# ADR-011: Hai hợp đồng cho City View: API (A) và Bridge (B), Kotlin tính tiến độ

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | 🟡 Proposed. Đã cài đặt ở `city-web` và `mobile` (dữ liệu giả lập); chờ VS5 dùng với API thật. |
| **Giai đoạn** | Trước VS5 |
| **Liên quan** | ADR-010 · system-design §7.2.7, §7.2.8, §9.2 · FR-SYS-04 · `city-web/src/bridge/cityState.ts` · `mobile/.../presentation/city/CityRenderState.kt`, `web/CityBridgeJson.kt` |

## Context
Có ba bản mô tả dữ liệu thành phố không khớp nhau:
- system-design §9.2 cũ (viết cho Unity): `status`, `upgradeFinishAt`, `serverTime`, `cityEvents{id:number,x,y}`, 4 intent viết HOA.
- Code city-web + Kotlin: `upgrading`, `progress`, `events{id:string,kind}`, 3 intent PascalCase.
- DB `user_buildings`: có `current_level = 0` (chưa xây). Không bản nào ở trên hỗ trợ trường hợp này.

Ngoài ra chưa có API để **lấy** trạng thái thành phố, chỉ có `POST /upgrade`.

Gốc rễ: bản nháp cũ trộn **dữ liệu nghiệp vụ** với **dữ liệu để vẽ** làm một.

## Decision
1. **Tách hai hợp đồng.**
   - (A) API Backend → Kotlin: giống DB, có giờ server.
   - (B) Bridge Kotlin → bản đồ: chỉ có những gì để vẽ.
   - Lớp dịch duy nhất là `CityState.toRenderState(serverNow)`.
2. **Bản đồ nhận `progress` 0..1, không nhận giờ.**
   - Kotlin tính `progress` từ `startedAt`/`finishAt` theo giờ server ước lượng (giờ máy + độ lệch đo từ `serverTime`).
   - Khi có công trình đang xây, Kotlin gửi lại khoảng 1 giây/lần.
3. **`level: 0` = chưa xây.** Bản đồ vẽ lô đất trống có biển "COMING SOON", chạm vẫn phát `BuildingTapped`.
4. **Event id là chuỗi mờ, không có toạ độ.** Bản đồ tự chọn người dân mang dấu (!).
5. **Chỉ 3 intent:** `Ready`, `BuildingTapped`, `CityEventTapped`.
   - Nâng cấp được kích hoạt từ UI Compose.
   - Phím Back do Navigation xử lý.
6. **Có phiên bản `v: 1`.** Chỉ thêm trường tuỳ chọn, bỏ qua trường lạ. Đổi nghĩa một trường thì tăng `v`.
7. **Thêm `GET /api/v1/city`** (§7.2.8): hoàn tất công trình theo kiểu lazy completion bằng giờ server. Thêm `serverTime` vào response của `POST /upgrade`.

## Reason
| Tiêu chí | Kotlin tính progress (chọn) | Bản đồ tự tính từ giờ |
| :--- | :--- | :--- |
| Chống chỉnh giờ máy (FR-SYS-04) | ✅ Một chỗ, có unit test | 🟡 Phải viết lại ở mỗi renderer (web, Compose, iOS…) |
| Độ phức tạp bridge | ✅ 4 trường mỗi công trình | 🔴 Thêm giờ, độ lệch, định dạng ISO |
| Mượt | 🟡 Gửi 1 lần/giây, bản đồ tự nội suy | ✅ Mượt từng khung hình |
| Đổi renderer | ✅ Renderer chỉ "vẽ số" | 🔴 Logic thời gian bị nhân bản |

## Alternatives
- **Giữ một hợp đồng chung giống DB:** đơn giản lúc đầu, nhưng bản đồ phải hiểu nghiệp vụ. Như vậy phạm nguyên tắc "renderer chỉ hiển thị" của ADR-009/010.
- **Thêm trường `locked` thay vì `level: 0`:** hai trường có thể mâu thuẫn nhau (`locked: true, level: 2`). Dùng `level: 0` khớp thẳng với DB.

## Consequence
- 🟢 Mỗi renderer mới chỉ cần đọc 4 trường. Logic thời gian có test (`CityRenderStateTest`).
- 🟢 Tên trường được khoá bằng test chuỗi JSON (`CityBridgeJsonTest`). Đổi một bên mà quên bên kia thì test báo đỏ.
- 🟡 Mỗi giây sinh một lần recomposition và một lần `evaluateJavascript` khi đang xây. Chi phí nhỏ, nhưng cần đo trên máy thật cùng với ADR-010.
- 🟡 Backend (VS5) phải cài lazy completion trong `GET /city` và `POST /upgrade`.

## Lesson
Khi hai hệ thống nói chuyện với nhau, hãy hỏi trước: **"dữ liệu này dùng để quyết định hay để hiển thị?"** Dữ liệu dùng để quyết định thì đi theo nguồn sự thật (server). Dữ liệu dùng để hiển thị nên được dịch thành dạng đơn giản nhất cho bên vẽ.
