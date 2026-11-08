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

---

## M12: Thiết kế (08/11/2026)

**Nhánh:** `feat/m12-progression`, tách từ `feat/m11-code-style`. Merge PR M11 trước PR này.

### Tài liệu đã viết

| Tài liệu | Nội dung |
| --- | --- |
| [ADR-015](../adr/ADR-015-progression-after-level-one.md) | Quyết định của đợt 2: bài học 20/30, sửa lỗi kẹt, thi, nâng cấp, nhiệm vụ, sự kiện, luyện tập, chuỗi, nội dung mới |
| [system-design §11](../03-architecture/system-design.md) | Bảng V006, API (body JSON + mã lỗi), cấu hình `linguacity.balance.*`, Room v6, traceability. §4.1–4.3 và §7.2.4–7.2.6 được đánh dấu "thay bởi §11" |
| [use-cases](../01-requirements/use-cases.md) | Đặc tả UC_06/07/08/10 + UC_16..UC_20 (§4.9–4.17). Luật **BR-EXAM-01..07, BR-UPG-01..03, BR-QUEST-01..05, BR-EVT-01..04, BR-PRAC-01..04, BR-STREAK-01..03, BR-ACH-05, BR-LEARN-09**. BR-LEARN-01 đổi thành 20 từ / 30 câu |
| [requirements-catalog](../01-requirements/requirements-catalog.md) | FR-EXAM / CITY-03 / CITY-06 → Specified; thêm FR-QUEST-01..03, FR-PRAC-01..03, FR-STREAK-01..02 |
| [screen-catalog](../04-ui/screen-catalog.md) | Mô tả SCR-10/11/12/23/24/25 (§3.4–3.9) |

### Việc của chat test

1. **Viết TC vào `test-plan.md`** từ các luật BR và mã lỗi trong system-design §11. Gợi ý nhóm:
   - TC-EXAM (đủ / thiếu điều kiện, resume, nộp thiếu, nộp đôi, đậu / trượt, Mastery, `ALREADY_PASSED`);
   - TC-UPG (thiếu bản vẽ / mảnh / KP, `MAX_LEVEL`, `BUSY`, hoàn tất theo giờ server);
   - TC-QUEST (chính tuyến suy ra từ trạng thái, nhận đôi, hằng ngày làm mới 0h, thưởng hôm nay);
   - TC-EVT (sinh ≤ 3 mỗi ngày, chỉ từ đã sưu tầm, 4/5 đậu, trượt vẫn mở);
   - TC-PRAC (giới hạn lượt, giới hạn từ mới, thưởng một lần mỗi ngày mỗi từ);
   - TC-STREAK (cộng, về 1, về 0, trao / thu hồi danh hiệu, gỡ khi đang đeo);
   - TC-LEARN (30 câu, hết lỗi kẹt: người xây lúc có 25/30 từ vẫn học được 5 từ Lv1 còn thiếu).
2. **Review tài liệu:** chỗ nào mâu thuẫn hoặc chưa đủ để viết test thì ghi lại cho chat code.

### Ghi chú

ADR-015 đang ở trạng thái **Proposed**. Người dùng duyệt bảng cân bằng (ADR-015 §8, system-design §11.7). Chat code làm tiếp M13 theo bảng này; số liệu nào đổi thì chỉ cần sửa dữ liệu hoặc cấu hình.
