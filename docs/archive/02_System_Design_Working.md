# LINGUACITY — 02. SYSTEM DESIGN

**Tên dự án:** LinguaCity (Thành phố Ngôn ngữ)  
**Loại tài liệu:** System Design / Architecture Design  
**Giai đoạn:** Giai đoạn 2 — Thiết kế Hệ thống  
**Trạng thái:** Đang thực hiện  
**Phiên bản:** 0.1 — Baseline lưu trữ quyết định 2.1 và 2.1.5  
**Ngày cập nhật:** 22/08/2026  

---

# 1. Mục đích tài liệu

File này là tài liệu trung tâm của **Giai đoạn 2 — System Design**.

Mục tiêu của tài liệu là chuyển các yêu cầu đã được chốt trong `01_Requirements_Analysis.md` thành thiết kế kỹ thuật có thể triển khai được, đồng thời lưu lại toàn bộ các quyết định kiến trúc đã được thống nhất trong quá trình phân tích.

Tài liệu được xây dựng theo hướng:

```text
Requirements
      ↓
System Design
      ↓
Implementation
      ↓
Testing
```

Trong đó:

- File 01 trả lời: **Hệ thống phải làm gì?**
- File 02 trả lời: **Hệ thống sẽ được thiết kế như thế nào?**
- File 03 sẽ ghi lại: **Thiết kế đã được triển khai thành code như thế nào?**

File này hiện chưa phải bản System Design hoàn chỉnh. Trước mắt, tài liệu lưu giữ toàn bộ nội dung đã được chốt ở **2.1 — Domain & Data Model** và **2.1.5 — Freeze Data Dictionary + Vocabulary Card System**, tránh thất thoát quyết định khi tiếp tục phát triển.

---

# 2. Trạng thái Giai đoạn 2

## 2.1. Tiến độ hiện tại

| Hạng mục | Trạng thái |
|---|---|
| 2.1 Domain Entities | ✅ Đã chốt |
| 2.1.5 Data Dictionary + Vocabulary Card System | ✅ Đã chốt |
| 2.2 ERD + Constraints | 🟡 Đang hoàn thiện |
| 2.3 Data Flow & Sequence Diagram | ⏳ Chưa bắt đầu |
| 2.4 PostgreSQL / JPA Target Schema | ⏳ Chưa bắt đầu |
| 2.5 API Contract | ⏳ Chưa bắt đầu |
| 2.6 Room Schema + DAO | ⏳ Chưa bắt đầu |
| 2.7 Repository + Sync Design | ⏳ Chưa bắt đầu |
| 2.8 MVI + Navigation Design | ⏳ Chưa bắt đầu |
| 2.9 UI/UX Wireframe | ⏳ Chưa bắt đầu |

---

### 2.2.1. ERD chính thức
- Toàn bộ Entity.
- Cardinality.
- PK/FK.
- Junction table.

### 2.2.2. Referential Integrity
- `ON DELETE`.
- `ON UPDATE`.
- Cascade / Restrict.

### 2.2.3. Unique Constraints
- `UNIQUE(user_id, building_id)`.
- `UNIQUE(user_id, vocabulary_id)`.
- Các mã `code` unique.

### 2.2.4. Index Design
Dự kiến cần đánh giá index cho:
- `Vocabulary(theme_id, level)`.
- `UserVocabProgress(user_id, vocabulary_id)`.
- `UserBuilding(user_id, building_id)`.
- `Question(content_type, skill, question_type)`.
- `Exam(building_id, required_level)`.

### 2.2.5. Data Normalization
Kiểm tra việc tách:
- Static Content.
- Player State.
- Question payload.
- Junction relationships.

### 2.2.6. PostgreSQL/JPA Mapping
Chuyển ERD thành:
- Entity relation.
- `@ManyToOne`.
- `@OneToMany`.
- `@EmbeddedId` hoặc composite key cho junction table nếu cần.
- Enum strategy.
- JSONB mapping.

### 2.2.7. Transaction Boundaries
Xác định các thao tác phải atomic, ví dụ:

```text
Pass Exam
   ↓
Validate
   ↓
Grant Blueprint
   ↓
Update User State
```

Không được xảy ra trạng thái:

```text
Blueprint đã cộng
nhưng Building/Exam state chưa cập nhật
```

### 2.2.8. Derived State
Xác định cái gì:
- Lưu trực tiếp.
- Tính động.

Ví dụ:

```text
Collection Count → Derived
Level Mastery → Derived
Exam Unlock → Derived
Weight → Derived
```

Trong khi:

```text
mastery_score → Stored
first_seen_at → Stored
current_level → Stored
resources → Stored
```

---

# 34. Trạng thái hiện tại của Giai đoạn 2

```text
                    GIAI ĐOẠN 2
                         │
             ┌───────────┴───────────┐
             │                       │
       2.1 Domain Model        2.1.5 Freeze
             │                       │
             └───────────┬───────────┘
                         ↓
                      ✅ DONE
                         │
                         ↓
                  2.2 ERD + DB
                         │
                         ↓
                  🟡 IN PROGRESS
                         │
                         ↓
             2.3 Data Flow / Sequence
                         ↓
             2.4 PostgreSQL/JPA Schema
                         ↓
                  2.5 API Contract
                         ↓
              2.6 Room + DAO Design
                         ↓
               2.7 Repository + Sync
                         ↓
                2.8 MVI + Navigation
                         ↓
                    2.9 UI/UX
```

