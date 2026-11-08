# Quy ước trình bày code LinguaCity

Dựa trên phong cách **"đơn giản – tuần tự – dễ đoán"** của Murach, chỉnh lại cho ba ngôn ngữ của
dự án: **Java** (backend), **Kotlin** (mobile) và **TypeScript** (city-web).
Chỗ nào chuẩn của ngôn ngữ khác sách (ví dụ tên hàm), dự án theo chuẩn ngôn ngữ và ghi rõ lý do.

Kiểm tra tự động: `python tools/check_style.py` (xem [mục 7](#7-công-cụ-và-checklist-trước-khi-commit)).

---

## 1. Thụt lề và khoảng trắng

| Quy tắc | Áp dụng |
| --- | --- |
| Thụt lề **4 dấu cách** mỗi cấp, **không dùng tab** | Java, Kotlin, TS, SQL, CSS, Gradle KTS. JSON / YAML / HTML giữ 2 dấu cách |
| Dòng nối tiếp (một lệnh ngắt thành nhiều dòng) thụt thêm **4** (Kotlin, TS) hoặc **8** (Java) | |
| Dấu `{` **cùng dòng** với câu lệnh mở khối (kiểu K&R) — chuẩn chung của cả Java, Kotlin và TS | `} else {`, `} catch (e) {` cùng dòng với `}` |
| Cách đều quanh toán tử `=`, `+`, `-`, `*`, `/`, `==`, `&&`, `->`, `?:` … và **sau** dấu phẩy | Ngoại lệ: `i++`, `!flag`, `a..b`, `obj.field`, `a?.b` |
| Dòng trống tách các **khối logic**: khai báo → kiểm tra điều kiện → xử lý → trả kết quả | Tối đa **1** dòng trống liên tiếp; 1 dòng trống giữa hai thành viên của lớp |
| Không để khoảng trắng cuối dòng; file kết thúc bằng một dòng trống | |

```java
// Đúng: mỗi khối logic tách bằng một dòng trống
public BuildResultDto build(UUID userId, String code) {
    UserProfile profile = users.findById(userId).orElseThrow(UserProfileNotFoundException::new);
    Building building = findBuilding(code);

    if (UserBuilding.UPGRADING.equals(userBuilding.getStatus())) {
        throw ApiException.conflict("BUSY", "Building is under construction");
    }

    profile.setKnowledgePoints(profile.getKnowledgePoints() - levelOne.getKnowledgeCost());
    users.save(profile);

    return new BuildResultDto(
            toDto(userBuilding, building), Times.toInstant(now), ResourcesDto.of(profile));
}
```

## 2. Đặt tên

| Thành phần | Quy ước | Ví dụ |
| --- | --- | --- |
| Biến, tham số | camelCase | `knowledgePoints`, `buildingCode` |
| Hàm / phương thức | **camelCase** (chuẩn Java/Kotlin/TS — sách dùng PascalCase vì là C#) | `completeIfDue()`, `normalizeState()` |
| Lớp, interface, enum, record | PascalCase | `CityService`, `CosmeticRepository` |
| Hàm `@Composable` | PascalCase (quy ước bắt buộc của Jetpack Compose) | `BuildingCard()`, `QuestionView()` |
| Hằng số | UPPER_SNAKE_CASE | Java `static final int MAX_LEVEL`, Kotlin `const val START_URL`, TS `const ROOM_W` |
| Giá trị enum | UPPER_SNAKE_CASE | `SessionType.PLACEMENT`, `LoadingKind.CITY` |
| Package / thư mục | chữ thường | `com.linguacity.backend.cosmetic` |

**Tên phải nói đúng mục đích.** Không dùng tên mơ hồ như `a`, `b`, `tmp`, `ub`, `lv1`, `st`, `r`, `c`, `p`.

Được phép:
- `i`, `j`, `k` cho biến đếm vòng lặp ngắn;
- `e` trong `catch`;
- `it` trong lambda Kotlin **một dòng**;
- `x`, `y`, `z` cho toạ độ;
- viết tắt nghiệp vụ đã thành thuật ngữ: `id`, `dto`, `kp`, `uuid`, `api`, `url`, `ndc`.

**Không được đổi tên** những thứ sau chỉ để hợp quy ước, vì đổi là hỏng hợp đồng giữa các phần:
- tên trường JSON / DTO;
- tên bảng, cột DB và entity / cột Room;
- đường dẫn API;
- trường của hợp đồng bản đồ (`LinguaCity.setState`);
- khoá `SavedStateHandle` và thuộc tính của route `@Serializable`.

## 3. Câu lệnh và độ dài dòng

- **Mỗi dòng một lệnh.** Không viết `a(); b()` hay `x = 1; y = 2` trên cùng một dòng.
- **`if` / `for` / `while` trong Java và TS luôn có ngoặc `{}`**, thân khối xuống dòng — kể cả khi chỉ có một lệnh.
- Kotlin được dùng `if` **dạng biểu thức** ngắn trên một dòng (`val label = if (built) "Lv $level" else "Chưa xây"`).
  Còn `if` dạng câu lệnh thì theo quy tắc như Java.
- **Tối đa 100 ký tự mỗi dòng** (Murach: 78–100).
  Ngoại lệ: dòng `import` / `package`, URL dài trong comment, chuỗi dữ liệu trong file seed / migration.
- Cách ngắt dòng dài:
  - ngắt **sau** dấu phẩy;
  - ngắt **trước** toán tử (`&&`, `+`, `?:`, `.`);
  - mỗi tham số một dòng khi danh sách tham số không vừa.

```kotlin
// Sai: hai lệnh trên một dòng, dài quá 100 ký tự
guide.message?.let { snackbar.showSnackbar(it); tutorial.messageShown() }

// Đúng
guide.message?.let { message ->
    snackbar.showSnackbar(message)
    tutorial.messageShown()
}
```

## 4. Comment

- Comment giải thích **vì sao** và **ý tưởng**, không lặp lại **cái gì** mà tên hàm, tên biến đã nói.
- Đầu lớp và đầu hàm phức tạp có comment tóm tắt mục đích:
  - Java dùng `/** … */` (Javadoc);
  - Kotlin dùng `/** … */` (KDoc);
  - TS dùng `/** … */` (JSDoc).
- Trong thân hàm dùng `//` cho một dòng, `/* … */` cho nhiều dòng.
- Mã định danh tài liệu (`BR-…`, `FR-…`, `ADR-…`, `TC-…`) nên ghi trong comment để truy vết.
- **Không để code bị comment-out**, vì Git đã giữ lịch sử.
- Comment viết bằng tiếng Việt như phần còn lại của dự án.

## 5. Tổ chức mã nguồn

**Thứ tự thành phần trong lớp**

| Java | Kotlin | TypeScript |
| --- | --- | --- |
| 1. Hằng `static final` | 1. Thuộc tính và khối `init` (giữ nguyên thứ tự tương đối — đổi là đổi thứ tự khởi tạo) | 1. Field |
| 2. Field | 2. Constructor phụ | 2. `constructor` |
| 3. Constructor | 3. Hàm public | 3. Phương thức public |
| 4. Phương thức public | 4. Hàm private | 4. Phương thức private |
| 5. Phương thức private (helper) | 5. `companion object` | |
| 6. Lớp / record lồng bên trong | | |

**Trong một file Kotlin có nhiều khai báo cấp cao**, sắp theo thứ tự:
1. hằng `private const val` ở đầu file;
2. lớp, hàm hoặc composable public;
3. lớp, hàm hoặc composable private.

**Hàm gọn**
- Mỗi hàm làm **một việc**.
- Hướng tới tối đa **~40 dòng**; hàm `@Composable` dựng giao diện tối đa **~60 dòng**. Dài hơn thì tách hàm con có tên rõ nghĩa.
- Lồng `if` / vòng lặp **tối đa 3 cấp**. Ưu tiên **guard clause**: kiểm tra điều kiện sai rồi `return` / `throw` sớm, phần chính để ở cấp ngoài cùng.

```java
// Đúng: guard clause, phần chính không bị lồng
if (userBuilding.getCurrentLevel() >= 1) {
    throw ApiException.conflict("ALREADY_BUILT", "Building already built");
}
if (missingWords > 0 || missingKp > 0) {
    throw requirementsNotMet(...);
}
startConstruction(userBuilding, levelOne, now);
```

## 6. Phạm vi áp dụng

**Áp dụng cho:**
- `backend/src/**` (Java, cả test);
- `mobile/app/src/**` (Kotlin, cả test);
- `city-web/src/**` (TS, CSS);
- script trong `tools/` và `database/seed/` (Python, theo PEP 8, cùng giới hạn 100 ký tự).

**Không áp dụng:**
- `database/migration/V001…V005` — đã chạy trên DB, không sửa;
- `mobile/app/schemas/*.json` — Room tự sinh;
- `package-lock.json`;
- `dist/`, `build/`, `node_modules/`;
- `docs/archive/`.

## 7. Công cụ và checklist trước khi commit

- **`.editorconfig`** ở gốc repo đặt sẵn thụt lề, giới hạn 100 ký tự, xoá khoảng trắng cuối dòng.
  IntelliJ IDEA, Android Studio và VS Code đọc file này tự động.
- **`python tools/check_style.py`** quét các file trong phạm vi và báo:
  - dòng dài quá 100 ký tự;
  - tab;
  - khoảng trắng cuối dòng;
  - nhiều lệnh trên một dòng;
  - `if` không ngoặc (Java, TS);
  - quá 1 dòng trống liên tiếp.

  Thêm `--files a.kt b.java` để chỉ quét vài file.

**Checklist trước khi commit:**
1. `python tools/check_style.py` → 0 lỗi.
2. Biên dịch được:
   - `backend`: `gradlew compileJava compileTestJava`
   - `mobile`: `gradlew compileDebugKotlin`
   - `city-web`: `npm run typecheck`
3. Tên mới rõ nghĩa; không đổi tên trường hợp đồng (mục 2).
4. Comment chỉ giải thích *vì sao*; không còn code bị comment-out.
5. Không hàm mới nào dài quá ~40 dòng hoặc lồng quá 3 cấp.
