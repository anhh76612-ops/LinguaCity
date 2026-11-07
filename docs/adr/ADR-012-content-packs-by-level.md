# ADR-012: Nội dung tĩnh chia thành gói theo (công trình, Level), tải khi cần, kiểu pull

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | 🟡 Proposed (08/11/2026). Chờ cài đặt ở VS2. |
| **Giai đoạn** | VS2 |
| **Liên quan** | ADR-004 (Offline Read-Only) · FR-SYS-02 · UC_03 · system-design §10.2, §10.4.1 · future-expansion §"Lớp học" |

## Context
- VS2 phải đưa nội dung tĩnh (chủ đề, công trình, cấp, từ vựng, câu hỏi, bài thi) từ Backend xuống Room để đọc offline.
- Chưa có thiết kế endpoint nào cho việc này (system-design §8.2 ghi "⬜ thiết kế ở VS2").
- Hai câu hỏi của người dùng định hướng quyết định:
  1. *"Sau này có vài nghìn từ thì mỗi lần vào game có tải lại hết không?"*
  2. *"Sau này mỗi thành phố là một lớp học, giáo viên (có AI hỗ trợ) đăng bài thì học sinh thấy ngay được không?"*
- Cần phân biệt hai loại dữ liệu:
  - **Nội dung tĩnh**: cuốn từ điển chung, mọi người chơi giống nhau.
  - **Tiến độ học**: riêng từng người (`user_vocab_progress`).
  Tải nội dung tĩnh **không bao giờ** kéo theo "những từ đã học hôm trước".

## Decision
1. **Chia nội dung thành gói:**
   - Gói `CORE` chứa phần nhỏ dùng chung: themes, buildings, building_themes, building_levels, blueprints, danh mục danh hiệu, danh mục cosmetics.
   - Mỗi cặp **(công trình, Level)** là một gói, ví dụ `HOUSING:1`. Gói gồm từ vựng, câu hỏi (không có đáp án), liên kết câu hỏi–từ, bài thi, yêu cầu thi.
2. **Mỗi gói có `version` riêng** (bảng `content_packs`). Sửa nội dung trong gói thì tăng `version` của gói đó.
3. **Tải khi cần, kiểu pull:**
   - Khi mở app hoặc quay lại foreground, app gọi `GET /content/manifest` (vài trăm byte).
   - App chỉ tải `CORE` và các gói **đang cần** (Level hiện tại và Level kế của từng công trình) khi chưa có hoặc `version` khác.
4. **Thiết kế sẵn cho lớp học:** `content_packs.scope` mặc định `'GLOBAL'`. Sau này `scope` là mã lớp, và khoá gói thành `(scope, công trình, Level)`. App không phải đổi cách tải.
5. **Chưa làm push** (FCM) hay WebSocket. Khi có lớp học, thêm FCM làm "chuông báo có gói mới", app vẫn tải bằng đúng API pull này.
6. **Lần đầu không có mạng** thì chặn ở SCR-03 (cần mạng để onboarding và tải gói), có nút Thử lại. Các lần sau đã có cache thì vào thẳng thành phố.
7. Mọi endpoint nội dung đều **bắt buộc `X-Guest-UUID`**, thống nhất với §7.2.

## Reason
| Tiêu chí | Gói theo Level (chọn) | Một gói + version | Delta theo mốc thời gian | Tải hết mỗi lần |
| :--- | :--- | :--- | :--- | :--- |
| Lần cài đầu nhẹ | ✅ Chỉ gói đang cần | 🔴 Tải toàn bộ | 🔴 Tải toàn bộ | 🔴 |
| Sửa 1 từ | 🟡 Tải lại 1 gói nhỏ | 🔴 Tải lại toàn bộ | ✅ Chỉ dòng đổi | 🔴 |
| Hợp với lớp học / giáo viên đăng bài | ✅ Gói = đơn vị đăng bài, thêm `scope` | 🟡 | 🟡 Phải lọc theo lớp ở mỗi bảng | 🔴 |
| Độ phức tạp server | ✅ Một bảng version | ✅ | 🔴 `updated_at` + xoá mềm ở mọi bảng | ✅ |
| Cần mạng khi mở Level mới | 🟡 Có (chấp nhận được, vì học cũng cần mạng) | ✅ | ✅ | ✅ |

## Alternatives
- **Delta theo mốc (`?since=`):** tối ưu băng thông nhất, nhưng mọi bảng nội dung cần `updated_at` và xoá mềm. Có thể kết hợp sau, bên trong từng gói, nếu gói trở nên lớn.
- **WebSocket để giáo viên đăng bài là thấy ngay:** tốn pin và tài nguyên server, và Android cắt kết nối khi app chạy nền. Chỉ đáng dùng cho chat hoặc thi đấu thời gian thực.
- **Đóng gói sẵn nội dung trong APK:** APK nặng hơn và phải phát hành bản mới để sửa nội dung.

## Consequence
- 🟢 Thêm công trình hoặc Level mới không làm chậm lần mở app của người không học tới đó.
- 🟢 Đường nâng cấp lên lớp học rõ ràng: thêm `scope` + FCM, không phải viết lại API.
- 🟡 App phải lưu version của từng gói đã tải (bảng Room `content_pack_state`).
- 🟡 Câu hỏi trong Room không có `answer`, `acceptedAnswers` hay `explanation`. Lời giải thích chỉ có sau khi nộp câu (NFR-01).

## Lesson
Trước khi chọn cách đồng bộ, hãy hỏi **"đơn vị thay đổi tự nhiên của nội dung là gì?"** Ở đây là "một Level của một công trình", hoặc sau này "một bài giáo viên đăng". Nếu đơn vị tải trùng với đơn vị thay đổi, gần như không tải thừa mà thiết kế vẫn đơn giản.
