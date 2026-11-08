# LinguaCity — Thiết kế lại UI/UX "Cozy Toy Town"

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | 🟡 Proposed (08/11/2026) |
| **Phạm vi** | Toàn bộ app mobile, city-web, một phần backend (kinh tế, Mastery, AI) |
| **Tài liệu đi kèm** | [character-bible.md](character-bible.md) · [ADR-017](../../adr/ADR-017-economy-v2-mastery-decay.md) · [ADR-018](../../adr/ADR-018-ai-characters-content-pipeline.md) · Style guide (Artifact HTML, bản nguồn [style-guide.html](style-guide.html)) |
| **Thay thế** | Theme template Material 3 ở `mobile/.../ui/theme/`, menu vòng cung SCR-22, icon emoji |

## 1. Vấn đề và mục tiêu

**Hiện trạng** (khảo sát ngày 08/11/2026):
- Theme là template Android Studio (Purple80/Pink, dynamic color). Không có font riêng, không có spacing token, màu `Color(0x…)` hard-code rải rác ở từng màn.
- Không có thư viện component dùng chung. Icon toàn bộ là emoji.
- Home (`CityScreen.kt`) gồm map, chip HUD và menu vòng cung 7 mục ngang hàng nhau, nên người chơi không biết nên làm gì tiếp.
- Bản đồ 3D (city-web) đẹp nhưng chưa phản ánh tiến độ học.

**Mục tiêu:**
1. Có **bản sắc riêng**: phong cách, màu, font, logo, icon, nhân vật.
2. **Bản đồ là giao diện**: nhân vật người chơi đi tới nơi cần đến, công trình phản ánh việc học.
3. **Vòng lặp học → lương → xây** rõ ràng, có động lực quay lại mỗi ngày nhưng không gây quá tải.
4. **Khả thi cho một người làm**: dùng hệ thống sinh nội dung (LLM, game AI, procedural) thay vì làm tay (§10).

## 2. Nguyên tắc trải nghiệm

1. **Học là đi làm, thành phố là tiền lương.** Mọi tài nguyên đều sinh ra từ học hoặc ôn. Không có đường tắt nào bỏ qua việc học.
2. **Sai không bị phạt, chỉ "cần bảo trì".** Không dùng màu đỏ chói, không ghi "SAI RỒI". Trả lời sai không trừ Mastery và không trừ năng lượng.
3. **Bản đồ là giao diện.** Menu chỉ là đường tắt.
4. **Vừa đủ, không quá tải.** Năng lượng giới hạn số từ mới mỗi ngày. Hết năng lượng vẫn còn việc có ích để làm.
5. **Tôn trọng người dùng.** Hiệu ứng, âm thanh và rung đều tắt được. Reduced motion đã có (`ui/motion/Motion.kt`). Không dark pattern. AI có giới hạn lượt và có lọc an toàn.

## 3. Cốt truyện: "Thị trưởng nghèo và 7749 nghề tay trái"

- Người chơi là **thị trưởng nghèo vừa nhận chức** ở một thị trấn hoang sơ, ngân sách gần như bằng 0.
- Để có tiền, Thị trưởng **làm thêm đủ nghề** theo các ngành có trong đề TOEIC: phục vụ nhà hàng, lễ tân khách sạn, nhân viên văn phòng, bán vé nhà ga, giao dịch viên ngân hàng, trợ lý phòng khám, công nhân nhà máy…
- **Mỗi nghề là một nhóm bài học nhập vai**: người chơi đứng ở vị trí người nói (nghe khách gọi món, trả lời email của sếp, xử lý khiếu nại).
- Nghề gắn với công trình tương ứng (nghề phục vụ ↔ Nhà hàng). Làm nghề nào nhiều thì được **thăng chức** trong nghề đó.
- Nội dung bài nhập vai được sinh bằng **pipeline LLM** từ danh sách từ của content pack, sau đó duyệt (ADR-018).

## 4. Kinh tế và học tập

Chi tiết dữ liệu và API nằm ở **ADR-017**. Phần này tóm tắt trải nghiệm.

### 4.1 Tài nguyên

| Tài nguyên | Dựa trên hệ thống cũ | Kiếm từ | Dùng để |
| :--- | :--- | :--- | :--- |
| 🪙 Vàng | KP (đổi tên hiển thị) | Lương bài học, thuế, nhiệm vụ | Khởi công, khai hoang, trang trí, mua trà sữa cho Mai |
| 🧱 Gạch | mới | Bài học **từ mới** | Xây, nâng cấp |
| 🪵 Gỗ | mới | **Ôn tập**: flashcard, luyện tập, Xưởng | Xây, khai hoang |
| 📐 Bản vẽ công trình | `user_blueprints` (đã có) | **Chỉ khi thi đạt**, gắn với công trình + Lv | Bắt buộc để thi công Lv đó |
| 🧩 Mảnh bản vẽ | `blueprint_shards` (đã có) | Sự kiện, nhiệm vụ, lên cấp thị trấn | Vật liệu tiêu hao khi thi công |
| ⏳ Đồng hồ cát | giữ nguyên | Điểm danh, nhiệm vụ | Tăng tốc xây |
| ⚡ Năng lượng | thay giới hạn luyện tập/ngày | Hồi đầy mỗi sáng, +1 khi điểm danh | Mỗi bài học từ mới tốn 1 |
| ⭐ XP → Town Level | mới | Mọi hoạt động học | Nới bán kính đất được khai hoang, mở danh mục công trình |

- **Công thức thi công** (Lv*n* → Lv*n+1*): `📐 bản vẽ (công trình, n+1)` + `🧩` + `🪵` + `🧱` + `🪙`. Thi đạt chỉ cho *quyền* xây; vật liệu phải tự tích luỹ thêm.
- **Tách Gạch / Gỗ**: một công trình cần cả hai, nên người chơi buộc phải vừa học mới vừa ôn cũ. Đây là spaced repetition được "ngụy trang" thành kinh tế.
- **Năng lượng** (5 ⚡/ngày, mỗi bài khoảng 8 từ mới, tối đa khoảng 40 từ mới/ngày):
  - Trừ ⚡ khi hoàn thành bài, hoặc khi bỏ giữa chừng sau khi đã gặp từ 50% số từ mới.
  - Trả lời sai không trừ ⚡.
  - Hết ⚡ vẫn làm được flashcard, luyện tập, Xưởng, nhiệm vụ, thi. Các việc này cho Gỗ và Vàng, không cho Gạch.
  - Hồi theo ngày chứ không theo bộ đếm giờ, để tránh tạo cảm giác phải canh đồng hồ.

### 4.2 Mastery v2 (đã chốt)

| Luật | Hiện tại | Mới |
| :--- | :--- | :--- |
| Trả lời đúng | +1 | +1, **không giới hạn số lần mỗi ngày**, chỉ trong bài học và bài thi |
| Trả lời sai | −1 | **Giữ nguyên** |
| Luyện tập | đổi Mastery một lần mỗi từ mỗi ngày | **Không đổi Mastery** |
| Theo thời gian | không có | **−1 cho mỗi 7 ngày liền không trả lời đúng**, kẹp ở 0 |
| Đạt max | — | **"Tốt nghiệp"**: không bao giờ bị giảm nữa |
| Nhiệm vụ ngày | — | Chỉ dùng công trình đã mở và từ đã học. Từ mới hiếm khi xuất hiện; nếu gặp thì tính là "đã gặp" và +1 |

**FSRS** chạy ngầm để tính `due_at` cho từng từ, phục vụ độ nứt công trình, thuế và việc chọn từ. Mastery là con số hiển thị cho người chơi.

### 4.3 Thuế và độ nứt

| Tình trạng ôn (từ của công trình quá hạn `due_at`) | Thuế | Hình ảnh |
| :--- | :--- | :--- |
| Vững chắc | 100% | sạch, cửa sổ sáng |
| Quá hạn từ 1 ngày | 75% | phủ bụi |
| Quá hạn từ 3 ngày | 50% | nứt nhẹ, biển 🛠, **Fixy bắt đầu nhắc** |
| Quá hạn từ 7 ngày | 25% (tối thiểu) | nứt nặng, dây leo |

- Thuế có trần và thu mỗi 4 giờ. Ôn xong (kể cả ôn ở Xưởng) thì công trình về 100% ngay.
- **Chuỗi nhắc**:
  - Người chơi online: Fixy chạy tới công trình đó nhắc.
  - Người chơi offline: Fixy báo Mai, Mai gửi push notification.

## 5. Bản đồ thị trấn (city-web)

### 5.1 Công trình theo chủ đề TOEIC

| Khu | Công trình |
| :--- | :--- |
| Trung tâm | 🏛 Toà thị chính (Mai) · 📬 Bưu điện · 🧰 Xưởng bảo trì · 🎓 Trung tâm thi · nhà của Fixy |
| Dân cư | 🏠 Nhà ở (`HOUSING`) · 🌳 Công viên (`PARK`) |
| Học đường | 🏫 Trường (`SCHOOL`) · 📚 Thư viện |
| Thương mại | 🥐 Tiệm bánh · 🍜 Nhà hàng · 🛒 Siêu thị · 🏦 Ngân hàng · 🧋 Quán trà sữa |
| Công sở | 🏢 Văn phòng · 🏥 Phòng khám · 📰 Toà soạn báo |
| Giao thông | 🚌 Bến xe (`ROAD`) · 🚉 Nhà ga |
| Công nghiệp | 🏭 Nhà máy |

Mỗi công trình × Lv là một content pack (ADR-012). Thêm công trình mới thì cần thêm content.

### 5.2 Đất, sương mù và xây tự do

- **Sương mù** che phần đất chưa khai hoang.
  - Đất chia thành chunk. Bấm vào ô sương thì hiện giá khai hoang (🪙 + 🪵), giá tăng dần theo từng ô.
  - Town Level quyết định *bán kính* đất được phép khai hoang.
  - Khai hoang xong thì sương tan theo kiểu lốc gió nhẹ, cỏ mọc lên.
- **Nút 🏗 Xây dựng** mở danh mục công trình, trang trí, đường và cây.
  - Kéo thả vào đất đã khai hoang.
  - Món chưa đủ Town Level hiện khoá `dust-gray`. Món có nhãn "Fixy đề xuất" dựa trên chủ đề người chơi đang yếu.
  - Món còn thiếu vật liệu thì hiện cách kiếm.
- **Kỹ thuật**: mở rộng `city-web/src/world/grid.ts` (24×24, 4 lô cố định) thành lưới chunk có thể đặt tự do. Kéo thả xử lý trong city-web, kết quả gửi qua bridge.

### 5.3 Cư dân gắn với công trình

- **Nhà ở** tạo *chỗ ở*. Cư dân mới chỉ dọn tới khi còn chỗ.
- **Nơi làm việc** tạo *việc làm*. Có đủ người làm thì công trình mới chạy hết công suất và sinh đủ thuế.
- **Công viên, trang trí** tăng *độ hạnh phúc*: cư dân làm việc tốt hơn, tạo nhiều tình huống tích cực hơn.
- Thông báo khi xây xong đổi theo loại công trình: "Nhà mới: +4 chỗ ở, 2 gia đình sắp dọn tới", hoặc "Tiệm bánh tuyển 2 thợ làm bánh".

### 5.4 Cư dân sống thật (game AI)

- **Hồ sơ**: tên, nghề, tính cách, nhà, nơi làm, quan hệ (bạn, thù, người yêu).
- **Lịch theo giờ thật** + **utility AI** theo nhu cầu (đói, mệt, chán, giao tiếp, tiền).
- **Tương tác giữa cư dân**: chào, trò chuyện (bong bóng tiếng Anh ngắn, dùng từ người chơi đã học), cãi nhau, đánh nhau kiểu hoạt hình, hẹn hò, mua bán, tập thể dục, viết báo.
- **Tình huống cho người chơi** (mở rộng sự kiện HELP, ADR-015 §5): hoà giải hai người cãi nhau bằng một câu hội thoại, chỉ đường cho cư dân lạc.
- **📰 Báo Thị trấn**: mỗi ngày backend lấy log sự kiện mô phỏng, nhờ LLM viết thành bài báo tiếng Anh mức TOEIC Part 7, kèm câu hỏi đọc hiểu.
- **Chạm vào cư dân**: xem hồ sơ, nghe câu nói hiện tại kèm phát âm.
- **Hiệu năng**: chỉ mô phỏng đầy đủ cư dân trong khung hình, cư dân ngoài màn hình chạy dạng tóm tắt. Khoảng 30–60 cư dân, tuỳ Town Level.

### 5.5 Hiệu ứng trên bản đồ

- Lv1 nhà gỗ → Lv2 nhà gạch → Lv3 ban công và đèn. Số cửa sổ sáng đèn theo % Mastery.
- **Marker thống nhất** (khác nhau cả hình dạng lẫn màu, để người mù màu vẫn phân biệt được): `!` sự kiện · `?` nhiệm vụ · `⬆` nâng cấp được · `🎓` đủ điều kiện thi · vòng đếm ngược khi đang xây · `🪙` có thuế · nứt 3 mức.
- **Ngày/đêm theo giờ thật**, cũng chính là dark mode của app.
- **Mùa và lễ hội Việt**: tuyết mùa đông, lễ hội hoa mùa hè, đèn lồng Trung thu, hoa mai/đào Tết.
- **Mây bão** che một khu khi mất chuỗi từ 7 ngày trở lên. Hoàn thành bài "Chiến dịch giải cứu đô thị" thì mây tan.
- **Camera**: pinch zoom, pan có giới hạn, double-tap về toàn cảnh.

**Bridge** (`cityState.ts` ↔ `CityBridgeJson.kt`) cần thêm: `mastery`, `crackLevel`, `taxRate`, `fogChunks`, `weather`, `season`, `townLevel`, `residents`, `playerTarget`, `quests[].location`.

## 6. Màn Home

```
+--------------------------------------------------------------+
| [🧑⭐5] ⚡▮▮▮▮▯ 4/5 🔥12            🪙1,250 🧱15 🪵8  [⚙]   |
| ┌ Nhiệm vụ ──────[‹]┐                                        |
| │ ▸ Giao 3 kiện hàng │   🏛Mai!     📬?        🏫 Lv2       |
| │   (Bưu điện) 1/3   │        🧍 Thị trưởng → → 🥐🛠        |
| │ ▸ Sửa Tiệm bánh    │   ☁ sương (khai hoang: 🪙300 🪵20)   |
| │ ▸ Thi Trường Lv3   │                         🤖 Bíp       |
| └────────────────────┘                                       |
| [📬]                                           [🧰] [🏗]    |
+--------------------------------------------------------------+
```

| Vùng | Nội dung | Thay cho |
| :--- | :--- | :--- |
| Trên trái | Avatar viền gỗ (hồ sơ, danh hiệu, tủ đồ cosmetic) · sao Town Level · pin ⚡ · 🔥 chuỗi (lịch 7 ngày) | chip 🔥 và 🏅 cũ |
| Trên phải | 🪙 · pill 🧱/🪵 (bấm mở kho gồm ⏳ 📐 🧩) · 📒 Sổ sách của Mai · ⚙ | chip 💡 ⏳ 🧩 cũ |
| Trái | **Bảng nhiệm vụ** thu gọn được, xếp theo ưu tiên, nút **"Đi tới"** | lối vào Quests |
| Giữa | Bản đồ, nhân vật người chơi, Bíp | — |
| Dưới trái | 📬 bung ra: Hộp thư · Nhiệm vụ · Sự kiện · Báo Thị trấn · Bạn bè (khoá) | — |
| Dưới phải | 🧰 Xưởng (sổ bảo trì, bản vẽ chưa xây, thẻ từ) · 🏗 Xây dựng | `FloatingMenu.kt` |

- **Thứ tự ưu tiên trong bảng nhiệm vụ**: điểm danh → công trình có thuế dưới 50% → đủ điều kiện thi → nhiệm vụ ngày → nhiệm vụ chính.
- **Nhân vật người chơi** (mở rộng player sẵn có ở `city-web/src/world/people/`):
  - Chạm vào mặt đất thì đi tới đó.
  - Chạm vào công trình thì đi tới cửa và mở **sheet thông tin 3 nấc**:
    - Peek: tên, Lv, thanh gạch.
    - Half: Mastery, thuế, độ nứt, chi phí nâng cấp và các nút Học, Thẻ từ, Thi, Nâng cấp, Vào trong.
    - Full: danh sách từ và cư dân làm việc ở đó.
  - Bấm "Đi tới" trong bảng nhiệm vụ thì tự tìm đường (A* trên lưới), camera đi theo.

## 7. Hành trình một ngày

1. **Splash**: bảng gỗ "Chào mừng Thị trưởng trở lại!", Fixy quét đường, tiếng chim và nhạc acoustic (tắt được).
2. **Điểm danh ở Toà thị chính**: Mai đưa sổ, bấm nút thạch "Ký tên" (+1 ⚡, +50 🪙). Mai đọc lịch hôm nay và tình hình tài chính.
3. **Nhận việc**: bảng nhiệm vụ cập nhật, bấm "Đi tới Bưu điện".
4. **Đi học tại địa điểm**:
   - Nền đổi theo nơi học: lớp học (Trường), thư viện, góc phố, quầy nhà hàng (bài nhập vai), văn phòng.
   - Echo đứng ở bảng hoặc bục (khu câu hỏi), Bơ ngồi ở bàn (khu đáp án). Đáp án là khối thạch.
   - Thanh tiến trình là **hàng gạch được xếp lên** sau mỗi câu đúng.
5. **Trả lời sai**:
   - Nút lắc 2 nhịp, đổi sang cam đất `#E27D60`, kèm tiếng "boing" và rung kép khẽ.
   - Sheet chiếm khoảng 30% màn hình: Echo giải thích ngắn, Bơ an ủi. Hai nút: *Lưu vào sổ tay*, *Tiếp tục*.
   - Câu sai quay lại ở cuối bài.
6. **Sau câu đúng** (khoảng 1 trên 3–4 câu): đoạn hội thoại giữa Echo, Bơ và người chơi, có nút Bỏ qua (character-bible §Echo).
7. **Nhận lương**: confetti, Bơ giơ ngón cái. Thẻ thưởng bay vào HUD; `FlyToHud` đồng bộ ngầm trong lúc bay.
8. **Thi lên Lv** ở Trung tâm thi:
   - Echo làm giám khảo, Bơ che mắt, không được nhắc.
   - Đạt thì đóng tem "ĐẠT" và nhận 📐 bản vẽ, bản vẽ bay vào Xưởng.
9. **Xây**:
   - Mở 🏗 hoặc chạm vào công trình, kéo vào đất, xem yêu cầu, bấm "Khởi công".
   - Giàn giáo dựng lên, có đếm ngược, Fixy gõ búa. Muốn xong sớm thì làm **Bài tập tăng tốc** (5 câu ôn) hoặc dùng ⏳.
10. **Khánh thành**: cắt băng. Nhà mới thì có cư dân dọn đến; nơi làm việc thì tuyển người.
11. **Lên cấp thị trấn**:
    - Camera lùi ra toàn cảnh, cả thị trấn nhún nhảy 2 nhịp.
    - Popup gỗ hiện chữ "LEVEL UP" (`CozyBubbleText`), phần thưởng dạng sticker, nút "Thu hoạch ngay" làm phần thưởng bay vào HUD.
    - Bán kính khai hoang nới ra.
    - Không cho bỏ qua trong 1,5 giây đầu. Ở reduced motion chỉ hiện popup tĩnh. Nền bản đồ phía sau được làm mờ và tối đi 30%.

## 8. Xưởng bảo trì (Sổ tay câu sai)

- **Dữ liệu**: lịch sử trả lời sai (`learning_session_items.is_correct = false`) và các từ quá hạn `due_at`.
- **Giao diện**:
  - Cuốn sổ da trên bàn gỗ, nền `paper`.
  - Bảng hiệu treo dây "XƯỞNG BẢO TRÌ THỊ TRẤN", Fixy cầm cờ-lê nháy mắt.
  - Thanh "Độ vững chắc thị trấn %" dạng đường ống nước.
- **Thẻ cần trùng tu**: icon nhà nứt, tên công trình, câu ví dụ có chỗ trống, đáp án đã chọn sai. Hai nút:
  - *Xem gợi ý*: Echo nhắc mẹo, không lộ đáp án.
  - *Sửa chữa ngay*: mini-game đập búa.
- **Kết quả sửa**:
  - Đúng: vết nứt biến mất, tiếng "cộc cộc ting", thẻ cuộn lại bay đi, nhận 🪵 và 🪙.
  - Sai: Fixy gãi đầu, thẻ ở lại để sửa lần sau.
- **Lọc theo công trình**, cùng nút "Chiến dịch trùng tu" gom 5–10 câu. Sau nhiều chiến dịch, Xưởng được nâng từ chòi gỗ lên văn phòng kiến trúc.
- **Mastery**: đây là luyện tập nên không đổi Mastery. Làm đúng thì cập nhật FSRS `due_at`, nên công trình hết nứt.

## 9. Design system

Bản xem trước trực quan nằm trong style guide HTML. Token được viết thành code ở S1.

### 9.1 Màu

| Token | Light (ngày) | Dark (đêm) | Dùng cho |
| :--- | :--- | :--- | :--- |
| `cream` | `#FFF6E9` | `#1F2A44` | nền app |
| `paper` | `#F9F6F0` | `#2A3756` | nền bài học, sổ, thẻ |
| `ink` | `#2D3F66` | `#F3EBDD` | chữ chính |
| `sky` | `#8EC9F2` | `#6FB2E0` | thông tin, ⏳ |
| `grass` / `jelly` | `#9FD486` / `#7CC66B` | `#7CC66B` | thành công, ⚡ |
| `cta` (cạnh `cta-edge`) | `#F4A261` (`#C9783A`) | `#F4A261` (`#B5682E`) | nút chính |
| `clay-error` | `#E27D60` | `#E8907A` | sai (dịu, không đỏ) |
| `gold` | `#F4B740` | `#FFD27A` | vàng, phần thưởng, đèn lồng |
| `wood` / `wood-dark` | `#C99A6B` / `#8B5E3C` | `#A97C52` / `#6E4A2E` | bảng gỗ, viền avatar, ⚙ |
| `brick` | `#D9654B` | `#E07A60` | gạch (khớp `roofRed` của city-web) |
| `white-glow` | `#FFFFFF` @ 40% | `#FFFFFF` @ 18% | highlight cạnh trên |
| `clay-shadow` | `#2D3F66` @ 15% | `#000000` @ 35% | bóng đổ dưới khối |
| `dust-gray` | `#BCC5D3` | `#56627A` | khoá, disabled, chưa đủ tài nguyên |

- Tắt dynamic color.
- Dọn `res/values/colors.xml` và `themes.xml` (còn sót tím/teal của template).
- Palette của city-web (`city-web/src/core/palette.ts`) đồng bộ theo token trên.

### 9.2 Chữ, hình khối, claymorphism

- **Font**:
  - **Baloo 2** (500/700) cho tiêu đề, số liệu và chữ bong bóng.
  - **Be Vietnam Pro** (400/500/600) cho nội dung.
  - Cả hai hỗ trợ đầy đủ dấu tiếng Việt, đặt trong `res/font`.
- **`CozyBubbleText`**: `TextStyle` của Compose không vẽ viền dày được, nên ta chồng hai `Text`:
  - Lớp dưới vẽ viền `ink` 2–4dp bằng `TextStyle(drawStyle = Stroke(width, join = StrokeJoin.Round))`.
  - Lớp trên là chữ fill màu.
- **Bo góc**: 12dp (chip, ô nhỏ), 16dp (thẻ, nút), 24dp (sheet, popup).
- **`Modifier.clay(elevation, color)`** gồm 4 lớp:
  1. fill;
  2. highlight `white-glow` ở mép trên trong;
  3. cạnh dưới đậm (`elevation` = 4–6dp, màu tối hơn fill);
  4. bóng `clay-shadow` mềm bên ngoài.

### 9.3 Micro-interaction

| Hành động | Animation | Rung | Âm thanh |
| :--- | :--- | :--- | :--- |
| Nhấn nút chính | lún 70% chiều cao 3D, phình ngang 4%, `tween(90, EaseInQuad)` | `HEAVY_CLICK` | pop trầm |
| Thả nút chính | `spring(dampingRatio = 0.45f, stiffness = Medium)` ≈ 250ms, overshoot, bung hạt | — | — |
| Chọn đáp án | lún và nảy nhanh, viền vàng, chữ lắc nhẹ | `CLOCK_TICK` | click |
| Sai | lắc 2 nhịp, tổng 150ms linear, xẹp xuống | `REJECT` | boing |
| Kéo thả công trình | phóng 110%, bóng tách, nghiêng theo quán tính, thả thì nảy 2 nhịp và tung bụi | rung nhẹ liên tục | thịch |

- **Âm thanh**: `SoundPool`, file `.ogg` ngắn dưới 500ms trong `res/raw`, preload khi mở app. Lấy từ thư viện CC0.
- **Reduced motion**: mọi hiệu ứng lún, bay và nhún đổi thành fade tối đa 100ms.
- **Giấu thời gian chờ**:
  - `BrickProgressBar` / `PipeProgressBar` khi tải dữ liệu: chạy nhanh tới 60%, chậm dần, dừng khi có dữ liệu, lúc dừng nảy nhẹ bằng spring. Thay cho `ui/loading/DestinationLoading.kt`.
  - `FlyToHud`: icon bay theo đường cong 400–500ms trong lúc app gọi API lưu. Số trên HUD chỉ cộng khi icon chạm tới (optimistic update, lỗi thì thử lại ngầm).

### 9.4 Component (`ui/components/`)

`JellyButton` (primary, success, secondary, ghost, icon) · `AnswerBrick` · `ResourcePill` · `StaminaBattery` · `MayorAvatar` + `LevelStar` · `QuestPanel` · `CornerMenu` · `BrickProgressBar` · `PipeProgressBar` · `WoodSign` · `CozyBubbleText` · `StickerRewardTile` · `RepairCard` · `BuildingSheet` · `LetterCard` · `StampBadge` · `SpeechBubble` · `ChatBubbleAI` · `MascotView` · `ConfettiLayer` · `FlyToHud`.

### 9.5 Logo và icon

- **Logo**: chữ "L" ghép từ 2 khối gạch đất sét isometric, ô cửa sổ là bong bóng thoại (ngôn ngữ + xây dựng).
  - Wordmark "LinguaCity" dùng Baloo 2, chấm chữ "i" là viên gạch.
  - App icon dạng adaptive (khối L trên nền kem), thay `res/mipmap-*/ic_launcher*` và `res/drawable/ic_splash.xml`.
- **Icon set** (khoảng 50 icon `ImageVector`, đất sét duotone, lưới 24dp, trong `ui/icons/`):
  - **Tài nguyên**: Vàng, Gạch, Gỗ, Bản vẽ, Mảnh bản vẽ, Đồng hồ cát, Năng lượng, Sao XP.
  - **Học tập**: `IcBookOpen`, `IcStreak` (lửa chuyển màu từ gold sang brick), `IcTarget`, `IcCheckRound`.
  - **Đô thị**: `IcHammer`, `IcCrane`, `IcRoad`, `IcLocked`, `IcFog`, `IcTax`, các công trình.
  - **Hệ thống**: `IcHomeTown`, `IcBackWood`, `IcMail`, `IcToolbox`, `IcBuild`, `IcSettings`, `IcLedger`, `IcNewspaper`.
  - **Trạng thái**: nứt ×3, `!`, `?`, ⬆, 🎓, zZz.

## 10. Khả năng triển khai

Làm tay toàn bộ thì không khả thi với một người. Cách làm là viết **hệ thống sinh nội dung** thay vì viết sẵn từng nội dung:

| Hạng mục | Cách làm | Phần cần người |
| :--- | :--- | :--- |
| Design system, component, icon, theme | Code Compose | Duyệt thẩm mỹ |
| Home, bảng nhiệm vụ, nhân vật đi trên map | Compose + Three.js (đã có `people/`, interior) | Test trên máy thật |
| Map chunk, sương mù, kéo thả, nứt, ngày/đêm, mùa | Procedural Three.js | — |
| Cư dân sống thật | Game AI: utility AI, lịch sinh hoạt, quan hệ | Ý tưởng tình huống |
| Lời thoại nhân vật, persona Bơ, chuyện cư dân | LLM đóng vai theo character bible + RAG (ADR-018) | API key, ngân sách, duyệt giọng văn |
| Bài nhập vai, Báo Thị trấn, câu ví dụ | Pipeline LLM offline + kiểm tra tự động (ADR-018) | Duyệt mẫu khoảng 10% |
| Mastery, độ nứt, chọn từ, độ chính xác khi Bơ nhắc | ML: FSRS + mô hình xác suất trả lời đúng (ADR-017) | Dữ liệu thật để tinh chỉnh |
| Hình nhân vật | Rig vector Compose + chibi procedural Three.js | Họa sĩ hoặc Rive nếu muốn nâng chất lượng |
| Âm thanh | Thư viện CC0 + `SoundPool` | Chọn âm |

## 11. Lộ trình

**Bước 0** (tài liệu): file này, [character-bible.md](character-bible.md), ADR-017, ADR-018, style guide.

**Lát cắt 1 — "Một ngày ở Trường học"** (MVP, mỗi mục một PR):

| Mục | Nội dung |
| :--- | :--- |
| S1 Design system + brand | `ui/theme/` mới, font, `Modifier.clay`, component lõi, icon, logo, launcher, splash |
| S2 Home mới | HUD 4 góc, `QuestPanel`, nhân vật người chơi (tap-to-move, A*, "Đi tới"), `BuildingSheet`, 🧰/🏗 tối thiểu; bỏ `FloatingMenu.kt` |
| S3 Mastery v2 + kinh tế tối thiểu | ADR-017: luật Mastery, `last_correct_at`, decay, ⚡, 🧱/🪵, công thức thi công |
| S4 Bài học tại Trường | nền lớp học, `AnswerBrick`, sheet khi sai, câu sai quay lại, nhận lương, `FlyToHud` |
| S5 Echo + Bơ | rig Compose (look, handsUp, success, fail, ngáp), gợi ý 3 kiểu, persona cổ trang |
| S6 AI v1 | ADR-018: module `ai`, chat sau câu đúng, cache, giới hạn lượt, fallback |

**Các lát cắt sau**: Mai (sổ sách, làm nũng, push) và Fixy (lịch sinh hoạt, nhắc nhở) · Xưởng, thuế, nứt, FSRS · map chunk, sương mù, xây tự do · cư dân sống thật, Báo Thị trấn · pipeline nội dung, nghề tay trái, persona Bơ mới · Bíp · lên cấp thị trấn, mùa và lễ hội · xã hội.

## 12. Xã hội (giai đoạn sau, cần đăng nhập, xem ADR-008)

- **Thăm nhà**: tưới cây hoặc sửa đèn giúp bạn để rút ngắn thời gian xây. Tối đa 3 lần mỗi ngày, cả hai cùng nhận vàng.
- **Hợp tác xã** 5–10 người góp tài nguyên xây Kỳ quan chung.
- **Tàu hữu nghị**: đường ray nối rìa bản đồ hai thị trấn, chở thùng tri thức (lời chúc, câu đố).
- **Chợ đầu mối**: đổi Gạch lấy Gỗ.
- **Rủi ro cần xử lý trước khi làm**:
  - Chợ dễ bị lạm dụng để cày tài nguyên. Cần tỉ giá cố định và giới hạn mỗi ngày.
  - Câu đố người dùng tự soạn cần kiểm duyệt.
  - Cần chống spam lượt giúp.
- Ô *Bạn bè* trong 📬 đã có sẵn vị trí (đang khoá).

## 13. Điểm còn mở (đang dùng giá trị đề xuất)

1. Làm đúng ở Xưởng có làm hết nứt không? **Có**: cập nhật `due_at`, Mastery giữ nguyên.
2. Bơ chỉ bài đúng với xác suất bao nhiêu? **Theo độ khó**, dùng mô hình dự đoán; trước khi có dữ liệu thì dùng 75%.
3. Giới hạn chat AI mỗi ngày? **Khoảng 20 lượt**, chỉnh qua `BalanceProperties`.
4. API key Claude đặt trong biến môi trường của backend, không bao giờ nằm trong app.
