# city-web — City View của LinguaCity

Bản đồ thành phố 3D phong cách **isometric low-poly**: 4 công trình (Housing, School, Park, Road) đổi hình theo level, người dân chibi tự đi lại, xe cộ dừng đèn đỏ và nhường người đi bộ, dấu (!) cho Sự kiện thành phố.

Viết bằng **Three.js + TypeScript + Vite**, không dùng file mô hình hay ảnh nào: mọi thứ được dựng bằng code. Cùng một bản build chạy được trên trình duyệt, nhúng vào WebView của Android/iOS, hoặc đóng gói desktop (Tauri/Electron). Quyết định này được ghi tại [ADR-010](../docs/adr/ADR-010-city-view-threejs-webview.md).

## Chạy thử

```powershell
cd city-web
npm install
npm run dev        # mở http://localhost:5173, có bảng "CityState (giả lập)" ở góc phải
```

`npm run dev` chạy với `--host`, nên điện thoại cùng mạng Wi-Fi có thể mở địa chỉ LAN mà Vite in ra để thử cảm ứng thật.

| Lệnh | Việc |
| --- | --- |
| `npm run dev` | Server phát triển, tự tải lại khi sửa code |
| `npm run typecheck` | Kiểm tra kiểu TypeScript |
| `npm run build` | Tạo `dist/` (≈ 157 KB gzip), đường dẫn tương đối để chép vào assets của app |
| `npm run preview` | Chạy thử bản `dist/` |

Thêm `?debug=0` vào URL để ẩn bảng giả lập.

**Thao tác:** kéo để di chuyển bản đồ · lăn chuột hoặc chụm hai ngón để phóng to (phóng vào đúng chỗ con trỏ) · chạm công trình → `BuildingTapped` · chạm dấu (!) → `CityEventTapped` · chạm người dân → họ vẫy tay.

## Luồng dữ liệu

```text
 Ứng dụng chủ (Kotlin / web / iOS)
        │  LinguaCity.setState(json)                 ▲  emit(intent): BuildingTapped, CityEventTapped, Ready
        ▼                                            │
 bridge/cityState.ts  normalizeState() ── làm sạch, kẹp level 1..3
        │
        ▼
 main.ts apply(state) ──▶ world/city.ts      dựng lại lô nào đổi level / đổi trạng thái xây
                     ──▶ people/citizens.ts  số dân = 3 + 2 × level Housing, gắn dấu (!) theo events
        │
        ▼
 core/loop.ts  mỗi khung hình: update() của từng hệ ─▶ renderer.render()
```

Bản đồ **chỉ hiển thị**. Nó không gọi API và không tính tài nguyên. Muốn nâng cấp, ứng dụng chủ gọi backend rồi gửi `CityState` mới vào bản đồ.

### Hợp đồng `CityState`

```json
{
  "buildings": [
    { "code": "HOUSING", "level": 2 },
    { "code": "SCHOOL",  "level": 2, "upgrading": true, "progress": 0.4 },
    { "code": "PARK",    "level": 2 },
    { "code": "ROAD",    "level": 3 }
  ],
  "events": [{ "id": "evt-grammar-1", "kind": "GRAMMAR" }]
}
```

Intent gửi ra (JSON):

- `{"type":"Ready"}`
- `{"type":"BuildingTapped","buildingCode":"SCHOOL"}`
- `{"type":"CityEventTapped","eventId":"evt-grammar-1"}`

Kênh gửi được dò theo thứ tự: `window.AndroidBridge.postMessage` (Android), `webkit.messageHandlers.linguaCity` (iOS), sự kiện DOM `linguacity:intent` (web). Chi tiết ở `src/bridge/bridge.ts`.

## Đọc code theo thứ tự nào

| # | File | Học được gì |
| --- | --- | --- |
| 1 | `src/main.ts` | Toàn cảnh: khởi tạo, nối các phần, xử lý chạm |
| 2 | `src/core/renderer.ts` | **Phong cách isometric**: camera trực giao, ánh sáng bán cầu + mặt trời, bóng mềm, tone mapping ACES |
| 3 | `src/core/loop.ts` | Vòng lặp khung hình, `dt`, đăng ký `onUpdate` |
| 4 | `src/core/controls.ts` | Pointer Events: kéo, chụm, chạm; raycast để biết chạm trúng gì; zoom vào con trỏ |
| 5 | `src/world/grid.ts` | Bố cục bản đồ bằng hằng số: đường, khối nhà, lô đất |
| 6 | `src/core/shapes.ts` | "Viên gạch" dựng hình; **bake** (gộp khối cùng màu) và **mergeColored** (gộp bằng màu đỉnh) để giảm số lần vẽ |
| 7 | `src/world/buildings/*.ts` | Mỗi công trình là `build(level) → Group`; phần chuyển động đánh dấu `dynamic` |
| 8 | `src/world/city.ts` | Áp `CityState`: chỉ dựng lại phần thay đổi, nhãn HTML (CSS2D), hiệu ứng nảy |
| 9 | `src/people/chibi.ts` | Nhân vật dựng từ khối, nối thành cây khớp như bộ xương |
| 10 | `src/people/poses.ts` | **Hoạt ảnh bằng công thức** sin/cos + nội suy mượt |
| 11 | `src/people/nav.ts` | Đồ thị đường đi + **Dijkstra**; các điểm đến (ghế, trạm xe…) |
| 12 | `src/people/citizens.ts` | **Máy trạng thái** của người dân: think → walk → do / inside |
| 13 | `src/world/buildings/road.ts` | Xe cộ: đèn giao thông, nhường người đi bộ, quay vòng ở mép bản đồ |
| 14 | `src/bridge/*.ts` | Hợp đồng dữ liệu, cầu nối native, bảng giả lập |

## Các kỹ thuật đáng chú ý

- **Bóng tĩnh + bóng giả.** `shadowMap.autoUpdate = false`: bóng nhà cửa chỉ tính lại khi `CityState` thay đổi. Người và xe dùng một hình tròn mờ dưới chân (`blobShadow`), nên không tốn shadow map mỗi khung hình.
- **Gộp draw call.** Mỗi công trình được `bake()` thành vài mesh, mỗi màu một mesh. Cây và đèn dùng `InstancedMesh`. Mỗi người dân còn khoảng 10 lần vẽ thay vì 21. Bảng debug có mục *Hiệu năng* hiển thị FPS, số lần vẽ và số tam giác.
- **Ngẫu nhiên có hạt giống** (`seeded`): cây và ngoại hình người dân giữ nguyên giữa các lần tải.
- **Chữ trong cảnh 3D**: vẽ lên `<canvas>` rồi dùng làm texture (`sign()`, dấu (!)).

## Mở rộng

- **Thêm level 4:** tăng `MAX_LEVEL` trong `bridge/cityState.ts`, thêm nhánh `level >= 4` trong file công trình tương ứng.
- **Thêm công trình mới:** thêm mã vào `BuildingCode`/`LOTS` (`world/grid.ts`), viết `buildXxx(level)`, đăng ký trong `BUILDERS` (`world/city.ts`). Nếu người dân cần tới công trình đó thì thêm nút và spot trong `people/nav.ts`.
- **Thêm hoạt ảnh:** thêm một `case` trong `poseFor()` (`people/poses.ts`), rồi dùng trong một `Spot`.
- **Nhúng vào Android:** đã làm. `npm run build` xong thì Gradle (task `syncCityWeb`) tự chép `dist/` vào APK. Phía Kotlin xem `WebCityRenderer.kt` và bài học [city-webview-integration.md](../docs/05-implementation/city-webview-integration.md).
