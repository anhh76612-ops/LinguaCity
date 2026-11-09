# Kho thẻ — Thiết kế 2 chế độ đọc thẻ + hướng màn hình toàn app

| | |
|---|---|
| **Ngày** | 09/11/2026 |
| **Trạng thái** | Đã duyệt thiết kế (chưa triển khai). Màn đặt Kho thẻ (thay SCR-06, SCR-07 hay cả hai) **chờ người dùng quyết** |
| **Liên quan** | [cozy-toy-town-concept.md](cozy-toy-town-concept.md) · [character-bible.md](character-bible.md) · [ADR-017](../../adr/ADR-017-economy-v2-mastery-decay.md) · SCR-06, SCR-07, SCR-21 trong [screen-catalog.md](../screen-catalog.md) |
| **Tham khảo hình** | Bản Stitch của người dùng: `linguacity_kho_th_flashcard_b_n_cozy_toy_town_c_s_c_3d` (→ chế độ 1), `linguacity_kho_th_flashcard_landscape_portrait_catalog` (→ chế độ 2), popup chi tiết "utilities"/"landlord" |

Ghi chú: phần đánh dấu *(Claude)* là quyết định của người thiết kế (Claude) mà người dùng chưa trực tiếp chọn; các phần còn lại người dùng đã chốt qua mockup.

---

## 1. Ý định

Người học mở Kho thẻ để **lướt ôn cả bộ từ**. Trang phải cho họ thấy sức khoẻ vốn từ bằng mắt: từ thuộc chắc thì tươi (và ở chế độ Bento thì to), từ lâu không trả lời đúng thì xỉn màu, có vết nứt (và ở Bento thì nhỏ lại). Người học có thể bấm ❤️ để ưu tiên một từ, phóng to/thu nhỏ bằng 2 ngón, lọc và tự kiểm tra.

Vấn đề của bản cũ: thẻ cao theo nội dung chứ không theo quy tắc nên lưới hở; nội dung không hợp kích thước (thẻ to trống, thẻ nhỏ bị cắt "…"); chi tiết hiện ở đầu trang, tách khỏi thẻ.

## 2. Mục tiêu · Không làm · Điều cấm

**Mục tiêu**
- Khe giữa các thẻ cố định 8dp, không có khoảng trắng lộn xộn.
- Thứ tự từ **không bao giờ tự đổi** để lấp chỗ trống (sắp xếp chỉ khi người dùng chọn).
- Nội dung trên thẻ luôn vừa khít kích thước thật của thẻ.
- Hai chế độ đọc thẻ, cả hai chạy tốt ở màn ngang và màn dọc.

**Không làm lần này**
- Chọn màn đặt Kho thẻ — Kho thẻ làm thành composable dùng lại được.
- Phần thưởng Gỗ thật của "Tự kiểm tra" (chờ kinh tế v2 có Gỗ).
- Phân tích của Giáo sư Echo (để đợt sau; chừa chỗ, ẩn).
- Logic giảm Mastery theo tuần (ADR-017). Lần này chỉ **ghi lại thời điểm trả lời đúng** (mục 9).
- Điều chỉnh các màn khác của app cho màn ngang.

**Từ chưa gặp không hiển thị**: Kho thẻ chỉ gồm từ đã có tiến độ (`firstSeenAt` có giá trị).

**Điều cấm** (chạy đúng mà vi phạm vẫn là hỏng)
- Thẻ hàng xóm bị **phóng to theo** hoặc nhảy chỗ khi một thẻ khác to lên hay mở chi tiết.
- Thẻ bị kéo méo quá mức: bề ngang chỉ co/giãn trong khoảng **−20% … +30%** so với chiều cao.
- Chữ bị cắt giữa chừng ở mức nội dung đã chọn; thẻ to mà trống.
- Chi tiết hiển thị thiếu nội dung.

## 3. Hướng màn hình toàn ứng dụng

- Ứng dụng có 2 trạng thái: **ngang** và **dọc**. Cài đặt đã có sẵn: `OrientationSetting` (AUTO/Dọc/Ngang) trong `data/local/preferences/SettingsStore.kt`, áp ở `MainActivity.kt` qua `requestedOrientation` (FR-UI-05, SCR-21).
- Thay đổi: **mặc định đổi từ AUTO sang LANDSCAPE** — người chưa từng chọn vào app ở màn ngang. Vẫn giữ lựa chọn "Tự động" trong Cài đặt *(Claude)*.
- Rủi ro đã biết: các màn khác hiện thiết kế cho màn dọc cũng sẽ mở ngang; chỉnh chúng là việc riêng.

## 4. Kho thẻ — phần chung cho hai chế độ

**Đầu trang**
- Nút về · "Kho thẻ · <khu>" · dòng tóm tắt `x/y đã thuộc · n sắp quên · +g gỗ hôm nay`.
- **Thanh phân bố Mastery** 3 màu: thuộc / đang ôn / sắp quên.
- **Nút chuyển chế độ đọc** (2 biểu tượng: Lưới đều / Bento). **Lần đầu mở: Lưới đều**; sau đó nhớ chế độ chọn gần nhất (DataStore `SettingsStore`).

**Hàng lọc** (cuộn ngang, dính trên khi cuộn)
- Ô tìm (theo từ hoặc nghĩa) · Tất cả · ❤️ Yêu thích · ⏳ Cần ôn · 📝 Có ghi chú · chip nhóm chủ đề (theo `themeCode`/nhóm con trong gói, ví dụ "Hợp đồng & Pháp lý", "Tiện nghi & Nội thất").
- **Cần ôn** = Mastery < 5 hoặc sắp quên *(Claude)*.
- **Che nghĩa**: ẩn nghĩa tiếng Việt trên mọi thẻ (ô mờ). Chạm thẻ lần đầu thì hé nghĩa thẻ đó; tắt thì hiện lại tất cả.
- **Sắp xếp**: Theo bài (mặc định) / Sắp quên trước / Mastery cao.
- Đổi chế độ đọc giữ nguyên bộ lọc, tìm kiếm, sắp xếp và thẻ đang chọn *(Claude)*.

**Trạng thái thẻ**
- Huy hiệu Mastery: `9/10 thuộc` (xanh) / `4/10 cần ôn` (vàng).
- **Sắp quên**: `now − (lastCorrectAt ?: firstSeenAt) > 7 ngày` → xỉn màu (bão hoà ~15%, chữ màu phụ) + **vết nứt nhẹ** gợi độ nứt công trình *(vết nứt: Claude)*.
- **Yêu thích**: viền 2dp hồng, nền hồng nhạt, chữ hồng đậm (đọc được ở sáng và tối) + hiệu ứng nảy (1 → 1,08 → 1) và rung nhẹ. Tim là vùng chạm riêng ≥ 48dp, không mở chi tiết.
- Nút loa phát âm có mặt khi thẻ đủ chỗ; 1 lần chạm là phát.

**Nút đáy "Luyện N từ đang lọc"** (dính đáy, vùng ngón cái): mở bài luyện tập với đúng tập từ đang lọc.

**Màu**: theo sáng/tối của app (design system v2), không theo hướng màn hay chế độ.

**Nội dung chi tiết** (dùng chung cho hộp chi tiết, bảng trái và thẻ mở rộng)
- Từ cỡ lớn · loa · ❤️ · chip `IPA · loại từ`, `chủ đề · nhóm`, huy hiệu Mastery.
- **Ý nghĩa tiếng Việt**: nghĩa (đậm) + một câu giải thích (`explanation`).
- **Ví dụ** (viền trái nhấn), tô đậm từ.
- **Cụm từ** (chip).
- **Ghi chú của bạn**, tự lưu.
- **Tự kiểm tra** (thay nút "Đã thuộc +Gạch +Vàng" của bản Stitch, vì trái kinh tế v2 và dễ bị lạm dụng):
  1. Che nghĩa và ví dụ → "Nghĩa của từ này là gì?" → **Lật thẻ**.
  2. Chọn **Nhớ** / **Chưa nhớ**.
  3. Thưởng **+2 Gỗ**, mỗi từ một lần mỗi ngày, có giới hạn theo ngày *(con số: Claude)*. **Không đổi Mastery** (ADR-017).
  4. Backend chưa có Gỗ: giao diện làm trước, lưu kết quả; phần thưởng bật khi kinh tế v2 có Gỗ *(Claude)*.
- Phần dữ liệu thiếu ở một từ thì ẩn phần đó.

## 5. Chế độ 1 · Lưới đều (theo bản Cozy Toy Town)

- **Mọi thẻ cùng cỡ**, lưới cột đều, khe 8dp. Số cột mặc định: ngang 5, dọc 2 *(Claude)*.
- **Chụm/mở 2 ngón đổi số cột** cả lưới (dọc 1–3, ngang 3–6), bắt nấc, rung nhẹ khi qua nấc *(khoảng: Claude)*.
- **Thẻ** (bố cục cố định, căn giữa):
  - trên: huy hiệu Mastery (trái), ❤️ (phải);
  - giữa: icon minh hoạ, **từ**, IPA · loại từ, **nghĩa tiếng Việt**;
  - vạch chấm;
  - dưới: trích ghi chú (trái), nút loa (phải).
  - Thẻ hẹp (nhiều cột) thì bỏ dần: ghi chú → IPA.
- **Yêu thích**: chỉ đổi màu + nảy, **không đổi cỡ**.
- **Sắp quên**: xỉn + vết nứt, **không đổi cỡ**. Mastery không ảnh hưởng cỡ ở chế độ này.
- **Chạm 1 lần → mở hộp chi tiết** (Che nghĩa bật: lần chạm đầu chỉ hé nghĩa).
- **Hộp chi tiết** (theo popup "utilities"/"landlord"):
  - Nội dung như mục 4; đáy có **Tự kiểm tra** (nút chính) + **Đóng**.
  - Nền mờ phía sau; đóng bằng ✕, Đóng, chạm nền mờ, nút Back.
  - **Vuốt trái/phải** để sang từ trước/sau trong danh sách đang lọc *(Claude)*.
  - Màn ngang: hộp giữa màn, rộng tối đa ~560dp, cao tối đa 90% màn, cuộn bên trong.
  - Màn dọc: **bottom sheet** kéo lên được gần hết màn, dễ dùng một tay *(Claude)*.

## 6. Chế độ 2 · Bento (theo bản Landscape/Portrait catalog)

### 6.1 Kích thước thẻ
Mỗi thẻ có **cỡ gốc vuông** `d × d`. Khi xếp hàng, chiều cao là `d·s` (s = hệ số co đều của hàng, mục 6.2); bề ngang co/giãn thêm hệ số `fx ∈ [0,8; 1,3]` để lấp hàng.

```
d = NW × hệ số Mastery × hệ số sắp quên × hệ số yêu thích × U
```

| Thành phần | Giá trị |
|---|---|
| `NW` thẻ thường, màn dọc | `(6/20)·A`, với `A` = bề rộng vùng lưới (≈ 100–110dp trên điện thoại). Kẹp `[96dp, 180dp]` *(dạng tỷ lệ + kẹp: Claude)* |
| `NW` thẻ thường, màn ngang | `min((4/20)·A, (H_nhìn − 2·gap)/2,5)` để luôn thấy ≥ 2,5 hàng; kẹp như trên *(Claude)* |
| Mastery (quy về thang 10) | 0–4 → ×1 · 5–7 → ×1,2 · 8–10 → ×1,45 *(con số: Claude)* |
| Sắp quên | ×0,72 |
| Yêu thích | ×1,2 |
| `U` người dùng tự phóng | liên tục, mặc định 1; `d` kẹp trong `[48dp, A]` |

### 6.2 Bố cục: hàng chảy + xếp chồng
Hàm thuần `packRows(items, A, gap = 8)` trả về các hàng; duyệt thẻ **đúng thứ tự**:

1. **Thẻ đang mở chi tiết tại chỗ** (chỉ màn dọc): đóng hàng hiện tại; thẻ chiếm **một hàng riêng** rộng `A`, cao bằng chiều cao đo được của nội dung. Thẻ phía trước đứng yên; thẻ phía sau xuống dưới.
2. **Xếp chồng**: nếu cột cuối của hàng chỉ có 1 thẻ, hàng đã có ≥ 2 cột, và `d_cuối + gap + d_mới ≤ chiều cao cột cao nhất` → thẻ mới **chồng dưới** thẻ đó (cột rộng = max hai thẻ). Bề ngang tiết kiệm được kéo các từ phía sau lên.
3. **Thêm cột mới**: `r = (A − gap×(số cột − 1)) / tổng bề rộng gốc các cột`. Thẻ ở lại hàng nếu `r ≥ 0,8 × 0,85`; nếu không thì **xuống hàng mới**.
4. **Dựng hàng** (ưu tiên để hàng xóm thay đổi ít nhất):
   - `r ≥ 1`: nếu giãn ngang mọi thẻ ≤ +30% mà **lấp kín** hàng thì giãn ngang (chiều cao giữ nguyên). Không lấp kín được thì giữ cỡ gốc, căn trái, **chừa khoảng trắng bên phải**.
   - `0,8 ≤ r < 1`: co **bề ngang** `fx = r`, chiều cao giữ nguyên.
   - `r < 0,8`: co ngang 0,8, phần còn lại co đều cả thẻ (tối đa 15%).
   - **Không bao giờ phóng to chiều cao** thẻ hàng xóm. Thẻ căn **mép trên**; dưới thẻ thấp được phép có khoảng trắng.

Ví dụ đã chốt: hàng chỉ có "balcony" + "rent"; phóng "rent" quá chỗ → "rent" xuống hàng sau, "balcony" đứng yên ở cỡ gốc, bên phải để trống.

Các ngưỡng 0,8 / 1,3 / 15% là tham số *(giá trị cụ thể: Claude)*.

### 6.3 Nội dung theo kích thước thật
Lấy mức theo cạnh `min(rộng, cao)` sau khi co/giãn; hạ một mức nếu bề ngang không đủ cho dòng dài nhất. Mỗi mức có bố cục cố định, căn trên; từ dài dùng `maxLines = 1` và co chữ tối đa 1 bậc trước khi ellipsis. Đổi mức có trễ ±4dp để không nhấp nháy khi đang phóng.

| Cạnh thật | Nội dung |
|---|---|
| < 64dp | Chỉ từ tiếng Anh |
| 64–87dp | Từ + nghĩa |
| **88–124dp (thẻ thường)** | **Từ + nghĩa + nút phát âm** (+ huy hiệu Mastery) |
| 125–149dp | + IPA · loại từ |
| 150–184dp | + câu ví dụ |
| ≥ 185dp | + cụm từ, trích ghi chú |

Tim hiện khi cạnh ≥ 64dp.

### 6.4 Yêu thích
Như mục 4, cộng hệ số ×1,2 làm thẻ to ra; các thẻ khác chạy lại bố cục có chuyển động.

### 6.5 Phóng to / thu nhỏ bằng 2 ngón
- **Hai ngón cùng trên một thẻ** → đổi `U` của thẻ đó liên tục; bố cục chạy lại theo thời gian thực. `U` được lưu.
- **Hai ngón trên hai thẻ khác nhau hoặc chỗ trống** → phóng cả lưới: `NW` giữa 3 nấc (×0,75 · chuẩn · ×1,35), bắt nấc khi nhấc tay *(3 nấc: Claude)*.
- **Hết cỡ**:
  - Màn dọc: `d ≥ A` → chế độ **chi tiết do phóng** (thẻ to ra tại chỗ). Chạm 2 lần **không** thu lại; chỉ chụm 2 ngón mới thoát (về ngay dưới hết cỡ).
  - Màn ngang: thẻ dừng ở `d = H_nhìn`, không mở tại chỗ; đồng thời chọn thẻ đó vào bảng trái *(Claude)*.
- Trạng thái hết cỡ **không lưu** qua lần mở sau (`U` lưu tối đa ngay dưới hết cỡ). Chỉ **một** thẻ ở chế độ chi tiết tại một thời điểm *(Claude)*.

### 6.6 Xem chi tiết
- **Màn dọc**: **chạm 2 lần** → thẻ to ra tại chỗ thành hàng riêng (mục 6.2), cuộn để thẻ nằm trong tầm nhìn; **chạm 2 lần nữa** → thu lại. Chạm 1 lần chỉ nảy nhẹ (hoặc hé nghĩa khi Che nghĩa bật) *(Claude)*. Nút bên trong luôn bấm được, không làm thu thẻ.
- **Màn ngang**: **bảng chi tiết bên trái** (~250–320dp, cuộn riêng) + lưới bên phải. Chạm 1 lần vào thẻ → nội dung hiện ở bảng, lưới không xê dịch; thẻ đang chọn có viền nhấn. Mặc định chọn thẻ đầu của bộ lọc; bộ lọc rỗng → bảng hiện lời nhắc đổi bộ lọc.
- Ghi chú trong thẻ mở tại chỗ sửa qua bottom sheet (tránh bàn phím trong danh sách lười) *(Claude)*; trong bảng trái và hộp chi tiết thì sửa trực tiếp.
- Đổi hướng màn khi đang xem: giữ thẻ đang chọn/mở, `U`, vị trí cuộn bám theo thẻ ở giữa màn.

## 7. Chuyển động
- Mọi thay đổi vị trí/kích thước animate ~250ms ease-out; thẻ đổi hàng trượt tới chỗ mới.
- Tôn trọng `LocalReduceMotion` (`ui/motion`): tắt chuyển động thì nhảy thẳng.
- Giữ `Modifier.sharedCard("word-${id}")` (`ui/motion/SharedElements.kt`) để chuyển cảnh từ màn khác vẫn chạy.

## 8. Thẻ ghim, linh vật và những gì đã bỏ khỏi bản Stitch
- Bỏ thẻ ghim cố định ở đáy màn dọc (che lưới).
- Bỏ giao diện tối/sáng theo hướng màn (dọc tối, ngang kem); dùng theo app.
- Bỏ khối "Phân tích của Vẹt Echo" lần này.
- Bỏ "Đã thuộc từ này (+1 Gạch & +15 Vàng)", thay bằng Tự kiểm tra.

## 9. Dữ liệu

| Cần | Hiện trạng | Làm |
|---|---|---|
| Mastery | Có (`VocabProgress.mastery/maxMastery`) | Dùng luôn |
| Lần cuối trả lời đúng | Chưa có ở đâu (ADR-017 còn Proposed); app chỉ có `lastReviewedAtMillis` | Backend: migration thêm `user_vocab_progress.last_correct_at`; ghi mỗi lần trả lời đúng qua `VocabProgressRecorder`; trả `ProgressItemDto.lastCorrectAt`. App: Room migration `lastCorrectAtMillis`. Dữ liệu cũ null → tính từ `firstSeenAt` |
| Từ đã gặp | `ProgressItemDto.firstSeenAt` có, Room chưa lưu | Lưu `firstSeenAtMillis` vào Room |
| Yêu thích, `U`, ghi chú, kết quả Tự kiểm tra | Chưa có | Bảng Room mới trên máy (`user_card_prefs`: vocabularyId, favorite, userScale, note, lastSelfCheckAt, updatedAt); không đồng bộ server lần này *(Claude)* |
| Cụm từ | Chưa có | Trường `collocations` (danh sách chuỗi) trong bảng từ vựng + migration + gói nội dung + Room; viết 2–3 cụm cho mỗi từ Housing cấp 1 (`database/seed/housing_level1.py`) |
| Câu giải thích nghĩa | Chưa có | Trường `explanation`, làm cùng đợt cụm từ *(Claude)* |
| Icon minh hoạ | Chưa có | Trường `iconKey` ánh xạ tới `ui/icons/LinguaIcons.kt`; thiếu thì dùng icon theo chủ đề; vẽ theo style guide |
| Chế độ đọc đã chọn | Chưa có | Khoá mới trong `SettingsStore` |

## 10. Gợi ý triển khai (Compose)
- `packRows` thuần Kotlin + unit test: tràn 2 thẻ, xếp chồng, hàng chi tiết, hàng không lấp kín không giãn, giãn ngang ≤ 30%, co ngang ≤ 20%.
- Bento: `LazyColumn` mỗi item một hàng (ảo hoá khi số từ tăng), hàng là `Layout` tuỳ biến; animate bằng `animateItem()` + `animateBounds`/LookaheadScope.
- Lưới đều: `LazyVerticalGrid` với số cột đổi theo nấc chụm.
- Cử chỉ: `pointerInput` tự viết để biết 2 ngón cùng nằm trên một thẻ hay không.
- Thành phần và token từ design system v2 (`ui/theme`, `ui/components/Clay.kt`).

## 11. Người làm tự quyết
Thời lượng và đường cong chuyển động, kiểu rung, chi tiết vẽ thẻ xỉn và vết nứt, cách đo nội dung chi tiết, cấu trúc composable.
