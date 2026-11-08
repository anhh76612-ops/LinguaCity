# ADR-018: AI cho nhân vật (chat trực tuyến) và pipeline sinh nội dung bằng LLM

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | 🟡 Proposed (08/11/2026) |
| **Giai đoạn** | Redesign "Cozy Toy Town", lát cắt S6 trở đi |
| **Liên quan** | [character-bible.md](../04-ui/redesign/character-bible.md) · ADR-004 (offline read-only) · ADR-008 (guest-first) · ADR-012 (content pack) · ADR-017 (mô hình dự đoán) |

## Context

Bản thiết kế lại có 5 nhân vật (Mai, Fixy, Echo, Bơ, Bíp), mỗi nhân vật có tính cách riêng; Bơ còn đổi persona theo giai đoạn. Ngoài ra còn hội thoại sau câu trả lời đúng, bài nhập vai theo hàng chục nghề, cư dân nói chuyện và Báo Thị trấn hằng ngày.

**Viết tay toàn bộ là không khả thi**: hàng nghìn từ × nhiều kiểu hội thoại × 5 nhân vật × nhiều persona.

Người dùng chốt hướng **kết hợp**: phần lớn nội dung **sinh sẵn** bằng LLM (rẻ, chạy offline, có duyệt); chỉ câu hỏi tự do của người chơi mới gọi LLM **trực tuyến**.

## Decision

### 1. Pipeline sinh nội dung offline

- **Vị trí**: `tools/content-gen/`, script Python (giống `database/seed/v007.py`). Chạy trên máy dev, không chạy trong app.
- **Đầu vào**: danh sách từ của từng content pack, character bible, persona.
- **Đầu ra**: JSON theo schema, được nạp vào seed hoặc migration dữ liệu. Các loại nội dung:

| Loại | Ví dụ |
| :--- | :--- |
| `dialogue.after_correct` | 3 kiểu (người chơi hỏi gợi ý / Bơ hỏi Echo / Echo hỏi vặn Bơ), cho mỗi từ |
| `hint.echo` | mẹo nhớ không lộ đáp án (dùng ở Xưởng) |
| `mistake.bo` | câu trả lời sai có chủ đích, kiểu cẩu thả hợp lý |
| `persona_lines.bo` | câu đặc trưng của mỗi persona theo từng tình huống (đúng, sai, gợi ý, bị chọc) |
| `roleplay.job` | bài nhập vai theo nghề: bối cảnh, lượt thoại, câu hỏi |
| `resident.chatter` | câu ngắn của cư dân dùng từ đã học |

- **Model**: Claude Sonnet 5.5 (`claude-sonnet-5-5`) cho chất lượng. Chạy theo lô (Batch API) để giảm chi phí.
- **Kiểm tra tự động**:
  - đúng JSON schema;
  - từ mục tiêu có xuất hiện;
  - độ dài trong giới hạn;
  - xưng hô đúng persona;
  - không có đáp án trong `hint`;
  - danh sách từ cấm.
- **Duyệt người**: lấy mẫu ngẫu nhiên khoảng 10% mỗi lô. Lô nào có trên 5% mẫu lỗi thì sinh lại.
- **Báo Thị trấn**:
  - Job backend hằng ngày lấy log sự kiện mô phỏng của người chơi (gửi lên khi sync), sinh 1 bài báo tiếng Anh mức TOEIC Part 7 kèm 3 câu hỏi đọc hiểu.
  - Cache theo (người chơi, ngày).
  - Không có log thì dùng bài chung của ngày đó.

### 2. Chat trực tuyến

- **Kiến trúc**: app → `POST /ai/chat` (module mới `backend/.../ai/`) → Claude API.
  - **API key chỉ nằm ở backend** (biến môi trường `ANTHROPIC_API_KEY`), không bao giờ nằm trong app.
  - Dùng Anthropic Java SDK.
- **Model**: Claude Haiku 5.5 (`claude-haiku-5-5`), vì nhanh và rẻ, đủ cho câu trả lời ngắn. Bật streaming.
- **Prompt**:
  - `system` = prompt card của nhân vật (lấy từ character bible) + luật chung:
    - trả lời dưới N từ;
    - giải thích tiếng Việt, ví dụ tiếng Anh;
    - không đưa đáp án khi `mode = EXAM`;
    - chỉ dựa vào context;
    - từ chối lịch sự khi bị hỏi ngoài chủ đề.
  - **Context (RAG từ DB, không dùng vector DB)**: từ đang học (nghĩa, IPA, ví dụ), câu hỏi hiện tại, đáp án người chơi, Mastery, persona của Bơ, số liệu tài nguyên (cho Mai).
    - Phạm vi dữ liệu nhỏ và có cấu trúc, nên truy vấn SQL là đủ.
  - Phần system và character card được đánh dấu cho **prompt caching**.
- **Kiểm soát**:
  - **Giới hạn**: `ai.daily-chat-limit` (mặc định 20 lượt mỗi người mỗi ngày), cộng rate limit theo IP và thiết bị.
  - **Cache câu trả lời** theo `(nhân vật, vocabulary_id, intent)` cho các câu hỏi gợi ý sẵn, để nhiều người hỏi cùng câu không gọi lại LLM.
  - **Lọc**: input dài quá 300 ký tự bị cắt. Có kiểm tra chủ đề đơn giản. Output kiểm độ dài và chặn đáp án khi thi.
  - **Báo cáo**: nút "Câu trả lời sai" lưu log để duyệt và sửa prompt.
- **Fallback (ADR-004)**: khi offline, hết lượt, hoặc API lỗi:
  - ẩn ô nhập tự do;
  - chỉ hiện câu hỏi gợi ý có sẵn, trả lời bằng nội dung đã sinh sẵn trong content pack.
  - Trải nghiệm học không bao giờ bị chặn vì AI.
- **Quyền riêng tư**:
  - Không gửi định danh người dùng (email, tên thật) vào prompt, chỉ dùng tên hiển thị trong game.
  - Log chat giữ 30 ngày.
  - Có ghi chú trong màn Cài đặt rằng câu hỏi được xử lý bởi AI.

### 3. Mô hình dự đoán (ML nhẹ, phục vụ gợi ý của Bơ và chọn từ)

- `p_correct(user, word)` = logistic regression trên các đặc trưng: Mastery/max, retrievability FSRS, độ khó từ, tỉ lệ đúng gần đây của người chơi.
- **Giai đoạn đầu**: hệ số đặt tay. Khi có log thì huấn luyện offline (scikit-learn), xuất hệ số vào `BalanceProperties`.
- **Bơ chỉ đúng** với xác suất `clamp(p_correct + 0,1; 0,55; 0,9)`, nên từ khó thì Bơ dễ "nhìn nhầm" hơn.

## Reason

- **Sinh sẵn + duyệt** cho chất lượng ổn định, chạy offline được (ADR-004), chi phí cố định theo lô, và không phụ thuộc mạng khi học.
- **Chat trực tuyến chỉ cho câu hỏi tự do**: là phần duy nhất không thể sinh trước. Giới hạn lượt giữ chi phí đoán trước được.
- **Prompt card nằm trong character bible**: một nguồn sự thật cho cả họa sĩ, người viết và LLM.
- **RAG bằng SQL**: dữ liệu nhỏ, có cấu trúc. Vector DB là thừa ở quy mô này.

## Alternatives

- **Chỉ nội dung sinh sẵn**: rẻ nhất, nhưng mất tính năng hỏi tự do mà người dùng muốn.
- **Chat trực tuyến cho mọi lời thoại**: linh hoạt nhất, nhưng chi phí, độ trễ và rủi ro nội dung đều cao nhất; không chạy được offline.
- **Model chạy trên máy (on-device)**: model nhỏ chạy trên Android chưa đủ tốt cho tiếng Việt kèm giọng nhân vật, và làm app nặng thêm. Để xem xét lại sau.

## Consequence

- **Backend**: module `ai` (controller, service, prompt builder, cache, rate limit), bảng `ai_chat_logs` và `ai_answer_cache` (migration V009).
- **Hạ tầng**: cần `ANTHROPIC_API_KEY` và ngân sách hằng tháng do người dùng cấp. Có cấu hình `ai.enabled = false` để tắt hẳn.
- **Content pack**: thêm các bảng hoặc cột cho nội dung sinh sẵn (`vocabulary_dialogues`, `persona_lines`, `job_roleplays`). Room thêm bảng tương ứng để chạy offline.
- **App**: `ChatBubbleAI` hỗ trợ streaming, trạng thái "Echo đang suy nghĩ…", bộ đếm lượt còn lại, và fallback.
- **Kiểm thử**: bộ câu hỏi mẫu cho mỗi nhân vật, kiểm giọng, độ dài, không lộ đáp án khi thi, và hành vi khi tắt mạng hoặc hết lượt.

## Lesson

Khi đưa LLM vào sản phẩm học tập, **luật sư phạm phải nằm ở server** (prompt + kiểm output), không tin vào việc client tự giấu đáp án. Giống nguyên tắc server authority của NFR-01.
