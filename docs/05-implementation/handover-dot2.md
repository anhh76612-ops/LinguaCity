# Phiếu bàn giao đợt 2: chat code → chat test

Kế hoạch: [plans/2026-11-08-m11-progression.md](plans/2026-11-08-m11-progression.md).

**Chat code (ổ C)**
- Viết code, migration, nội dung, tài liệu thiết kế.
- Chỉ biên dịch và chạy `check_style.py`, không viết hay chạy test.

**Chat test (ổ D)**
- Viết test và chạy test; định nghĩa TC trong `docs/06-testing/test-plan.md` và ghi kết quả thật vào đó.
- Review code theo [coding-style.md](coding-style.md).
- Không sửa code ứng dụng. Lỗi tìm được thì ghi lại, người dùng chuyển cho chat code.

Mỗi mốc có một mục bên dưới, mục mới nhất ở cuối.

---

## M11: Quy ước trình bày code (08/11/2026)

**Nhánh:** `feat/m11-code-style` (tách từ `main` @ `a6ff6d0`)

**Commit:**

| Commit | Nội dung |
| --- | --- |
| `44a8b28` | `coding-style.md`, `.editorconfig`, `tools/check_style.py`, kế hoạch đợt 2 |
| `de3c121` | A: chỉ khoảng trắng (tab → 4 dấu cách, city-web thụt lề 2 → 4) |
| `4a2d1fd` | B: ngắt dòng ≤ 100, mỗi dòng một lệnh, `if/for/else` luôn có ngoặc |
| `e269edc` | C1: đổi tên biến mơ hồ |
| `88faf03` | C2: tách hàm dài, thụt lề nối tiếp bội của 4, `check_style --functions` |

**Phạm vi:** khoảng 230 file Java / Kotlin / TS.
- Không đổi API, không đổi tên trường JSON / DTO / cột DB, không đổi hợp đồng bản đồ.
- Chủ ý không đổi hành vi.

### Chat code đã kiểm

- Biên dịch qua: `backend` (`compileJava compileTestJava`), `mobile` (`compileDebugKotlin compileDebugUnitTestKotlin`), `city-web` (`npm run typecheck`).
- `python tools/check_style.py` → **0 lỗi** trên 234 file.
- `python database/seed/housing_level1.py` sinh ra SQL giống hệt bản cũ (so bằng `cmp`).
- **Chưa chạy test nào.**

### Việc của chat test

1. **Chạy lại toàn bộ test hiện có.** Kỳ vọng: không test nào đổi kết quả.
   - `cd backend; .\gradlew.bat test` (trước M11: 48/48 đạt)
   - `cd mobile; .\gradlew.bat testDebugUnitTest assembleDebug`
   - `cd city-web; npm run build`
2. **Commit A chỉ đổi khoảng trắng:** `git diff -w --ignore-blank-lines 44a8b28 de3c121` phải rỗng.
3. **Review theo `coding-style.md`:** đọc lướt diff B / C1 / C2, chú ý chỗ ngắt dòng khó đọc hoặc tên mới chưa rõ nghĩa.
4. **Soi kỹ 3 chỗ thay đổi có thể ảnh hưởng hành vi:**
   - **`LearningSessionRepository.countCompletedBetween`** thay cho phương thức derived query tên dài, giờ là `@Query` JPQL viết tay.
     - Lỗi JPQL sẽ làm **Spring context không khởi động** (mọi test backend đều đỏ).
     - Nếu context khởi động được, cần kiểm hệ số KP theo số phiên trong ngày (`dailySessionIndex`, `dailyMultiplier`): bài thứ 6 trong ngày phải có ×0.2.
   - **`LearningService`** được tách hàm.
     - Thứ tự gọi `random` giữ nguyên (chọn từ → chọn câu đọc → chọn câu viết từng từ → xáo câu viết).
     - Cần kiểm lại luồng học, bài kiểm tra trình độ, nộp đáp án, kết thúc phiên (gồm gọi kết thúc lần hai và phiên hết hạn).
   - **`LessonScreen.QuestionBody`** (giờ là public) và **`CityScreen.BuildingCard`** được tách composable.
     - Giao diện không đổi.
     - Nếu có emulator: mở một bài học (trắc nghiệm + điền từ), màn kết quả, thẻ công trình (Học / Xây / Thẻ từ / Vào nhà).
5. **Gợi ý thêm** (không bắt buộc): một test cho `tools/check_style.py`, ví dụ chạy trên file mẫu có lỗi rồi kiểm mã thoát là 1.

### Ghi chú

- Còn khoảng 30 hàm dài hơn giới hạn, phần lớn là hàm dựng hình 3D ở city-web. Danh sách ở `coding-style.md` §8; chạy `python tools/check_style.py --functions` để xem. Đây là nợ kỹ thuật đã ghi nhận, chưa phải lỗi.
- Script ngắt dòng tự động có thể để lại vài chỗ đúng cú pháp nhưng khó đọc. Ghi lại file:dòng để chat code sửa.
