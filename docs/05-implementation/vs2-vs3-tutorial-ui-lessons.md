# Bài học: VS2 → VS3 → Tutorial thư ký → Giao diện (M0–M10)

> Liên quan: [ADR-012](../adr/ADR-012-content-packs-by-level.md) (gói nội dung) · [ADR-013](../adr/ADR-013-server-learning-session.md) (phiên học) · [ADR-014](../adr/ADR-014-secretary-tutorial-placement.md) (tutorial) · [system-design chương 10](../03-architecture/system-design.md) · [kế hoạch](plans/2026-11-08-vs2-vs3-tutorial.md) · [test-plan §4–§6](../06-testing/test-plan.md)
>
> M7 (avatar, nội thất House 3D) và M8 (tuỳ biến nhân vật/nhà) làm ở nhánh riêng. Hai bước tutorial `ENTER_HOUSE` / `CUSTOMIZE` hiện chỉ có lời Mai, chờ ghép.

## 1. Bức tranh toàn cảnh

```text
                 ┌──────────── Backend (Spring Boot, Server Authority) ────────────┐
 PostgreSQL ◀──▶ │ content  : manifest / core / packs/{b}/{l}       (ADR-012)       │
 V003, V004      │ learning : sessions → answer → complete           (ADR-013)       │
                 │ city     : GET /city (lazy completion), build Lv0→1               │
                 │ achievement, player (/users/me…), identity (tutorial step)        │
                 └───────────────▲───────────────────────────────────────────────────┘
                                 │ Retrofit (X-Guest-UUID)
 ┌──────────────── Android ──────┴────────────────────────────────────────────────────┐
 │ data/remote/*Api ─▶ *RepositoryImpl ─▶ Room v4 (bản sao: nội dung + Player State)    │
 │                          ▲                         │ Flow                            │
 │                          │ chỉ GHI LẠI kết quả     ▼                                 │
 │ ViewModel (MVI) ◀── UseCase / Repository ──▶ Compose: City · Lesson · Mai overlay   │
 └─────────────────────────────────────────────────────────────────────────────────────┘
```

**Ba nguyên tắc xuyên suốt:**
1. **Server quyết định, app ghi lại.** Điểm, Mastery, KP, sưu tầm, bước tutorial đều do server tính; app chỉ lưu kết quả vào Room để hiện và để xem offline.
2. **Đọc được khi offline, ghi thì cần mạng** (ADR-004). Danh sách từ, flashcard, Mastery, thành phố lần đồng bộ cuối đều đọc từ Room.
3. **Logic thuần tách khỏi framework** để test trên JVM: `PackSelector`, `WordSelector`, `MasteryEngine`, `AnswerGrader`, `TutorialGuide`, `MaiLines`, `arcOffset`, `IsoTime`.

## 2. Đọc code theo thứ tự

| # | File | Học được gì |
|---|---|---|
| 1 | `database/migration/V003__content_packs.sql`, `database/seed/housing_level1.py` | Schema là nguồn sự thật; seed sinh từ dữ liệu, không viết tay 400 dòng SQL |
| 2 | `backend/.../content/service/ContentService.java` | Gói (công trình, Level); DTO **không** có đáp án (NFR-01) |
| 3 | `mobile/.../domain/content/PackSelector.kt` + test | Hàm thuần quyết định tải gói nào |
| 4 | `mobile/.../data/repository/ContentRepositoryImpl.kt` | `withTransaction`: xoá dòng cũ của gói → upsert → lưu version |
| 5 | `backend/.../learning/engine/*` + `LearningEngineTests` | Mastery, chấm câu, chọn từ — không cần Spring để test |
| 6 | `backend/.../learning/service/LearningService.java` | Phiên trên server, `@Version`, `noRollbackFor`, partial unique index |
| 7 | `backend/.../achievement/service/AchievementService.java` | Xét danh hiệu, phần trăm có ngưỡng mẫu |
| 8 | `backend/.../city/service/CityService.java` | Lazy completion theo giờ server |
| 9 | `mobile/.../data/repository/LearningRepositoryImpl.kt`, `CityRepositoryImpl.kt` | Đổi lỗi HTTP thành lỗi nghiệp vụ; offset đồng hồ |
| 10 | `mobile/.../presentation/lesson/*` | MVI một màn có nhiều pha: câu hỏi → phản hồi → kết quả → lỗi |
| 11 | `mobile/.../presentation/tutorial/*` | Kịch bản thuần + overlay + spotlight đăng ký vị trí |
| 12 | `mobile/.../ui/motion/*`, `ui/loading/*`, `presentation/menu/FloatingMenu.kt` | Hiệu ứng dùng chung, tôn trọng "giảm hiệu ứng" |

## 3. Câu hỏi theo 5 tầng

Tự trả lời trước khi mở gợi ý.

### Gói nội dung (VS2)
1. **Cái gì:** gói `HOUSING:1` gồm những bảng nào? Vì sao bài thi `EXAM_HOUSING_LV2` lại nằm trong gói Level **1**?
   <details><summary>Gợi ý</summary>Từ vựng Level 1 thuộc các chủ đề của House, câu hỏi TARGET của các từ đó, và bài thi để lên Level 2 — người chơi cần nó khi đang ở Level 1.</details>
2. **Tại sao:** vì sao không tải hết nội dung một lần? (đọc bảng Reason của ADR-012)
   <details><summary>Gợi ý</summary>Lần cài đầu nhẹ; sửa một từ chỉ tải lại một gói nhỏ; sau này "lớp học" chỉ là thêm `scope`.</details>
3. **Nếu… thì sao:** bỏ dòng `deleteVocabularies(code)` trong `savePack` rồi server gỡ một từ khỏi gói?
   <details><summary>Gợi ý</summary>Từ đó vẫn nằm mãi trong Room vì upsert chỉ thêm/sửa, không xoá.</details>

### Phiên học (VS3)
4. **Như thế nào:** chạy tay một câu trả lời: từ nút "Kiểm tra" tới khi thanh Mastery đổi màu.
   <details><summary>Gợi ý</summary>`LessonIntent.Submit` → `LearningRepository.answer` → `POST …/answer` → `AnswerGrader` + `MasteryEngine` → lưu `user_vocab_progress` → DTO → Room `upsertProgress` → `state.feedback` → `FeedbackPanel`.</details>
5. **Tại sao** item chỉ nộp được một lần, và vì sao cần phiên thay vì API "nộp một câu"?
   <details><summary>Gợi ý</summary>Không có đơn vị giao dịch thì server không phân biệt "câu mới" với "câu gửi lại" → cày điểm vô hạn (ADR-013).</details>
6. **Nếu… thì sao:** bỏ `@Version` ở `LearningSession` rồi hai lệnh `complete` đến cùng lúc?
   <details><summary>Gợi ý</summary>Cả hai đọc ACTIVE, cả hai cộng KP → KP bị cộng đôi. Có `@Version` thì lệnh sau thất bại (TC-VS3-14).</details>
7. **Như thế nào:** vì sao `LearningService` có `noRollbackFor = ApiException.class`?
   <details><summary>Gợi ý</summary>Khi phát hiện hết hạn, server lưu `EXPIRED` rồi mới ném 410. Rollback sẽ xoá mất trạng thái đó.</details>

### Tutorial thư ký
8. **Cái gì:** những bước nào app được tự chuyển, bước nào chỉ server chuyển? Vì sao?
   <details><summary>Gợi ý</summary>App: INTRO→PLACEMENT, ENTER_HOUSE→CUSTOMIZE, CUSTOMIZE→TOUR. Server: những bước phụ thuộc kết quả học/xây (BR-TUT-02) — không để app tự nhận "đã xây xong".</details>
9. **Tại sao** `TutorialGuide` là hàm thuần chứ không viết thẳng trong Composable?
   <details><summary>Gợi ý</summary>Test được (TutorialGuideTest) và đổi lời thoại không đụng UI.</details>
10. **Nếu… thì sao:** đổi `id` của kịch bản mỗi lần KP thay đổi?
    <details><summary>Gợi ý</summary>Overlay quay về câu 1 mỗi lần KP cập nhật — người chơi bị đọc lại từ đầu.</details>

### Giao diện
11. **Như thế nào:** spotlight biết vị trí nút "Xây" bằng cách nào?
    <details><summary>Gợi ý</summary>`Modifier.spotlightTarget(key)` ghi `boundsInRoot` vào `SpotlightRegistry` (CompositionLocal); overlay đục lỗ bằng `BlendMode.Clear` trên lớp `Offscreen`.</details>
12. **Tại sao** loading chỉ hiện sau 150 ms?
    <details><summary>Gợi ý</summary>Dữ liệu từ Room thường về ngay; hiện loading rồi tắt ngay gây nháy, cảm giác chậm hơn.</details>
13. **Thiết kế:** muốn thêm mục "Bảng xếp hạng" vào menu nổi phải sửa những gì?
    <details><summary>Gợi ý</summary>Một `MenuEntry` trong `CityScreen`, một route trong `AppNavHost`, một màn mới. `arcOffset` tự chia lại cung cho 5 mục.</details>

## 4. Bài tập thực hành
1. Thêm 10 từ cho Park Level 1 vào `database/seed/` (chủ đề ENVIRONMENT / SOCIAL), sinh SQL thành `V005__seed_park_level1.sql`, tăng version gói `PARK:1`. Mở app — gói mới có tự tải không? Chạm Park → "Học" có bài không?
2. Đổi `kp-full-sessions-per-day` thành 2 trong `application.properties`, viết lại kỳ vọng của `sixthSessionOfTheDayGivesReducedKp`.
3. Thêm danh hiệu ẩn `NIGHT_OWL` (hoàn thành bài sau 23:00 giờ Việt Nam): một dòng V-migration + một nhánh trong `AchievementService` + test.
4. Bật "Giảm hiệu ứng chuyển động", tìm một animation còn chạy và nối nó với `LocalReduceMotion`.

## 5. Bài học rút ra (cho phần Kết luận báo cáo)
- **Một nguồn sự thật cho schema** (troubleshooting #10): để Hibernate `update` chạy song song với migration viết tay là hai bên ghi đè nhau.
- **Test H2 không chứng minh schema thật đúng** (troubleshooting #9): mỗi migration cần một lần chạy trên PostgreSQL thật.
- **Mọi thao tác cộng điểm cần đơn vị giao dịch có trạng thái** (phiên, lượt thi).
- **Kiểm thử E2E bằng script tìm ra lỗi mà unit test không thấy**: onboarding chặn offline (M3), HUD hiện mã danh hiệu thay vì tên (M5), nhãn menu không bấm được (M9), câu "30/20 thẻ" (M6).

## 6. Việc còn lại
- M7 (avatar đi vào nhà, nội thất House 3D) và M8 (tuỳ biến) — nhánh riêng, ghép vào bước `ENTER_HOUSE` / `CUSTOMIZE` (`GuideAction.ENTER_HOUSE`, `FINISH_CUSTOMIZE` trong `TutorialViewModel`).
- VS4 Exam (bài thi `EXAM_HOUSING_LV2` đã có trong gói) và VS5 nâng cấp Lv1→Lv2.
- Đo FPS, bộ nhớ trên máy thật (ADR-010); Flyway; nội dung cho Road / Park / School.
