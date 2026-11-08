# ADR-015: Tiến trình sau House Lv1: thi, nâng cấp, nhiệm vụ, sự kiện, luyện tập, chuỗi

- **Trạng thái:** Proposed (08/11/2026, M12). Accepted khi người dùng duyệt bảng cân bằng §3.
- **Thay thế một phần:**
  - ADR-005: ngưỡng thi tính bằng từ đã sưu tầm *của công trình*, ví dụ cũ 40/40 bỏ.
  - GDD §6.1: điểm đậu.
  - system-design §4.1–4.3 và §7.2.4–7.2.6: lỗi dùng 409 kèm `code`, không dùng 400; có resume; có Mastery khi nộp.
- **Liên quan:** ADR-003 (bản vẽ / lượt thi), ADR-012 (gói theo level), ADR-013 (phiên học trên server), ADR-014 (tutorial).

## Context

Sau tutorial (ADR-014), người chơi có House Lv1 và **vòng chơi bị đứt**:

1. **Chưa có bài thi** (VS4) và chưa có nâng cấp (VS5). `POST /buildings/{code}/build` trả `409 ALREADY_BUILT` từ Lv1 trở lên.
2. **Có lỗi kẹt tiến độ.** Khi House đạt Lv1, phiên học chuyển sang **Level 2** (BR-LEARN-08). Lúc đó gói HOUSING:2 chưa có, và phần Level 1 chỉ ôn lại những từ *đã sưu tầm*. Người chơi xây nhà khi mới có 20–29/30 từ nên không bao giờ đủ 30 từ để thi.
3. **Không có lý do quay lại mỗi ngày.** Chưa có nhiệm vụ, sự kiện hay chuỗi ngày. `blueprint_shards` không có nguồn nào.

Người dùng chốt gộp VS4 + VS5 vào đợt này, thêm:
- nhiệm vụ chính tuyến và ngoại tuyến;
- chế độ luyện tập mọi chủ đề;
- chuỗi ngày kèm danh hiệu;
- bài học cỡ 20 từ / 30 câu;
- nội dung HOUSING:2 và SCHOOL:1.

## Decision

### 1. Bài học 20 từ / 30 câu

- **Cỡ bài:** mọi phiên LEARNING (kể cả bài học bắt buộc trong tutorial) có **20 từ, 30 câu**:
  - 20 câu đọc (trắc nghiệm nghĩa), mỗi từ một câu;
  - 10 câu viết (điền từ), cho 10 từ ưu tiên cao nhất mà `WordSelector` chọn.
- **Cấu hình:** `words-per-session`, `questions-per-session`.
- **Sửa lỗi kẹt:** level học vẫn là `level công trình + 1`.
  - Pool từ = mọi từ **chưa sưu tầm** ở level ≤ level học (từ mới), cộng từ đã sưu tầm để ôn.
  - Từ Level 1 chưa sưu tầm vẫn tiếp tục xuất hiện sau khi House lên Lv1.
- **Bài kiểm tra trình độ:** giữ nguyên (20 từ / 30 câu, ADR-014).

### 2. Bài thi lên level (Exam, VS4)

- **Điều kiện mở thi** (`exam_requirements`, kiểm tra lúc bắt đầu):
  - `required_card_count`: số từ **đã sưu tầm thuộc công trình đó**, tức từ trong các gói `(công trình, 1..target_level)`;
  - `required_knowledge` (KP) và `required_blueprint_shards`: là **phí thi**, trừ khi bắt đầu, trượt không hoàn;
  - `required_building_code` + `required_building_level` (mới): công trình khác phải đạt level đó, đây là nhiệm vụ chính tuyến.
- **Đề thi:**
  - Mỗi lượt rút ngẫu nhiên `question_count` câu từ pool `exam_questions`, có thứ tự, lưu snapshot `exam_attempt_questions`.
  - Câu hỏi gửi xuống app **không có đáp án** (NFR-01).
  - **Không giới hạn giờ.** Lượt dở được vào lại: `start` trả lượt `IN_PROGRESS` đang có với mã 200.
- **Nộp bài một lần** cho mọi câu.
  - Server chấm bằng `AnswerGrader` và áp Mastery ±1 cho từ TARGET (MasteryEngine, như phiên học).
  - Đậu khi `đúng / tổng ≥ exams.pass_percent` (mặc định **80%**).
- **Kết quả:**
  - Đậu: `user_blueprints.quantity + 1` cho bản vẽ `(công trình, target_level)`.
  - Trượt: không hoàn phí, giữ tiến độ từ, thi lại được ngay với phí mới.
- **Đã có bản vẽ** hoặc công trình đã đạt `target_level` thì không cho thi nữa: 409 `ALREADY_PASSED`.

### 3. Nâng cấp công trình (VS5)

- **API:** `POST /buildings/{code}/build` dùng chung cho mọi cấp.
  - Lv0 → Lv1: như cũ, cần từ đã sưu tầm + KP (ADR-014).
  - Lv*n* → Lv*n+1*, với *n* ≥ 1, cần:
    - 1 bản vẽ `(công trình, n+1)`;
    - `building_levels.required_shards` mảnh (mới);
    - `knowledge_cost` KP.
- **Khi bắt đầu xây:** trừ cả ba khoản, trạng thái UPGRADING theo giờ server, hoàn tất lười (FR-SYS-04).
- **Lỗi:**
  - 409 `NEEDS_BLUEPRINT`;
  - 409 `REQUIREMENTS_NOT_MET` với `missingShards`, `missingKnowledge`;
  - 409 `MAX_LEVEL`, 409 `BUSY`.

### 4. Nhiệm vụ

- **Chính tuyến (MAIN):** chuỗi bước cố định trong bảng `quests` (`prerequisite_code`).
  - Tiến độ **suy ra từ trạng thái**: level công trình, số từ đã sưu tầm, lượt thi đã đậu. Không đếm sự kiện.
  - Mỗi bước có thưởng KP và mảnh, bấm **Nhận**.
  - Đợt này có 5 bước: xây House Lv1 → sưu tầm 20 từ School → xây School Lv1 → thi đậu House Lv2 → nâng House Lv2.
- **Hằng ngày (DAILY):**
  - Mỗi ngày (giờ Việt Nam) server chọn **3 nhiệm vụ** từ các mẫu `kind = DAILY`. Cách chọn cố định theo `(người chơi, ngày)` để gọi lại vẫn ra cùng kết quả.
  - Tiến độ được đếm khi có sự kiện tương ứng (`QuestTracker`).
  - Mỗi nhiệm vụ cho mảnh + KP. Xong cả 3 thì được nhận thêm thưởng `DAILY_BONUS`.
- **Nguồn mảnh:** `blueprint_shards` chỉ đến từ nhiệm vụ và sự kiện.

### 5. Sự kiện thành phố (dấu "!")

- **Sinh sự kiện:** sau tutorial (bước `DONE`), mỗi ngày server sinh lười **tối đa 3 sự kiện** khi app gọi `GET /city`. Mỗi sự kiện chọn từ `city_event_templates` (cư dân + tình huống), gắn vào một công trình để bản đồ vẽ dấu "!".
- **Giải sự kiện:** là một phiên học kiểu `EVENT`:
  - 5 câu, chỉ hỏi **từ đã sưu tầm**;
  - không có KP từng câu, nhưng vẫn có Mastery.
  - Đúng ≥ 4/5: +1 mảnh, +15 KP, sự kiện thành RESOLVED.
  - Trượt: sự kiện vẫn mở, làm lại được.
- **Chưa đủ từ:** người chơi có dưới 5 từ đã sưu tầm thì không sinh sự kiện.

### 6. Luyện tập mọi chủ đề

- **API:** `POST /learning/practice {mode, themeCodes[], wordCount}`. `wordCount` ∈ {10, 20}, số câu = 1,5 × số từ.
- **Hai chế độ:**
  - **REVIEW (Ôn)**: chỉ từ đã sưu tầm. **1 lượt mỗi ngày**.
  - **MIXED (Hỗn hợp)**: từ đã học + từ mới của mọi gói (kể cả công trình chưa xây).
    - Tối đa **3 lượt mỗi ngày**.
    - Tối đa **20 từ mới mỗi ngày** cho toàn bộ chế độ luyện tập.
- **Chống cày:** một từ chỉ được thưởng KP và tăng Mastery **lần đầu trong ngày** qua luyện tập (`user_vocab_progress.last_rewarded_on`).
  - Trả lời đúng từ đó lần thứ hai trong ngày vẫn được chấm đúng/sai, nhưng không có KP và không đổi Mastery.
  - Từ mới trả lời đúng vẫn được **sưu tầm** và tính cho điều kiện thi của công trình chứa từ đó.
- **Vượt giới hạn:** 409 `DAILY_LIMIT` với `{mode, used, limit, resetsAt}`.

### 7. Chuỗi ngày và danh hiệu chuỗi

- **Một ngày được tính vào chuỗi** khi trong ngày đó có cả:
  - ≥ 1 phiên LEARNING hoặc PRACTICE hoàn thành;
  - ≥ 1 nhiệm vụ hằng ngày hoàn thành.
- **Cập nhật:**
  - Ngày được tính mà hôm qua cũng được tính: `streak_days + 1`. Nếu không: `streak_days = 1`. Đồng thời cập nhật `best_streak`.
  - Đứt chuỗi (ngày cuối được tính trước hôm qua): `streak_days = 0`. Server kiểm khi đọc `GET /users/me`, `GET /quests`, `GET /city`.
- **Danh hiệu chuỗi:** `STREAK_3` "Người giữ lửa", `STREAK_10`, `STREAK_20`, `STREAK_30`.
  - `condition_type = STREAK_DAYS`, `revocable = true`.
  - Được trao khi chuỗi đạt mốc. **Bị thu hồi khi đứt chuỗi**, nếu đang đeo thì gỡ.
  - Mốc nằm trong bảng `achievements`, nên đổi được hằng tuần chỉ bằng migration dữ liệu, không sửa code.
- **DILIGENT:** giữ là danh hiệu vĩnh viễn như cũ.

### 8. Nội dung mới

| Gói | Số từ | Chủ đề | Dùng cho |
| --- | --- | --- | --- |
| HOUSING:2 | 30 | HOUSE, DAILY_LIFE level 2 | học khi House ở Lv1; thi lên Lv2 |
| SCHOOL:1 | 30 | EDUCATION level 1 | xây School Lv1 (nhiệm vụ chính tuyến) |

- **Mỗi từ có:**
  - IPA, nghĩa, 2 câu ví dụ;
  - 3 câu hỏi: tier 1 trắc nghiệm, tier 2 điền có mẹo nhớ, tier 3 điền theo ngữ cảnh có giải thích từ dễ nhầm.
- **Pool thi `EXAM_HOUSING_LV2`:** 20 câu (10 câu tier 3 cũ của Lv1 + 10 câu tier 3 của Lv2).
- **Yêu cầu thi:**
  - 45 từ House đã sưu tầm;
  - 200 KP;
  - School Lv1.
- **Nâng House lên Lv2:** 1 bản vẽ, 3 mảnh, 300 KP, xây 1 giờ.

## Reason

- **Đếm từ theo công trình:** buộc người chơi học sâu chủ đề của công trình trước khi lên level. Chế độ luyện tập vẫn góp vào đó, vì từ mới học ở đâu cũng được sưu tầm.
- **Nộp bài một lần, không chấm từng câu:** đúng nghĩa "bài thi" và giữ được NFR-01. Bài học vẫn chấm từng câu để phản hồi ngay.
- **Tiến độ chính tuyến suy ra từ trạng thái:** không phải đồng bộ thêm bộ đếm, và tự đúng cả với người chơi cũ.
- **Nhiệm vụ hằng ngày dùng bộ đếm:** vì là sự kiện trong ngày, không suy ra được từ trạng thái.
- **Giới hạn hằng ngày đặt ở server:** chống cày KP (FR-SYS-01, NFR-02). Thưởng mỗi từ một lần mỗi ngày đơn giản hơn chặn cứng số lượt.
- **Sự kiện dùng lại engine phiên học (ADR-013):** đã có sẵn hết hạn, chấm, Mastery, `@Version`.

## Alternatives

- **Hạ ngưỡng thi xuống 20 từ:** bị loại. Bài thi mất ý nghĩa và không sửa được lỗi kẹt cho các level sau.
- **Bắt buộc vào thi qua School:** bị loại cho đợt này, vì School mới Lv0. Lối vào là nút "Thi lên Lv2" trên thẻ công trình. School vẫn là điều kiện qua nhiệm vụ chính tuyến.
- **Thi dùng chung bảng `learning_sessions`:** bị loại. ADR-003 đã thiết kế `exam_attempts` / `exam_attempt_questions`, và bài thi khác phiên học ở chỗ nộp một lần, có phí và có bản vẽ.
- **Đếm tiến độ chính tuyến bằng bộ đếm:** bị loại. Dễ lệch với trạng thái thật, và người chơi cũ phải chạy lại từ đầu.

## Consequence

- **Migration:**
  - V006 (schema): `exam_attempts`, `exam_attempt_questions`, `user_blueprints`, `quests`, `user_quests`, `city_event_templates`, `user_city_events`, cùng các cột mới.
  - V007 (nội dung): HOUSING:2, SCHOOL:1, pool thi, nhiệm vụ, mẫu sự kiện, danh hiệu chuỗi.
- **`learning_sessions`:**
  - Thêm kiểu `PRACTICE_REVIEW`, `PRACTICE_MIXED`, `EVENT`.
  - `building_id` được phép NULL, vì luyện tập và sự kiện không thuộc một công trình.
- **App:**
  - Room v6, thêm màn SCR-10/11/12/23/24/25.
  - Bridge v1 không đổi. `events[]` đã có trong hợp đồng, nay mang dữ liệu thật.
- **Tài liệu:** system-design §11 là đặc tả chi tiết của ADR này. Các đoạn cũ ở §4.1–4.3 và §7.2.4–7.2.6 được đánh dấu "thay bởi §11".
- **Cách làm việc:** test do chat kiểm tra viết, theo các luật BR-EXAM / UPG / QUEST / EVT / PRAC / STREAK trong `use-cases.md` §5.

## Lesson

Khi đổi một luật đếm (level học = level công trình + 1, ở VS3), phải kiểm cả trạng thái *đang dở* của người chơi, tức người đã xây với 20–29 từ. Nếu không, luật mới tạo ra ngõ cụt mà test luồng chuẩn không bắt được.
