"""Kiểm tra quy ước trình bày code (docs/05-implementation/coding-style.md).

Chạy từ thư mục gốc repo:
    python tools/check_style.py                 # quét toàn bộ phạm vi
    python tools/check_style.py --summary       # chỉ in số lỗi theo loại và theo file
    python tools/check_style.py --files a.kt b.java

Trả mã thoát 1 nếu còn lỗi, để dùng được trong checklist trước khi commit.
"""
import argparse
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MAX_LINE = 100

# Thư mục và đuôi file thuộc phạm vi quy ước (mục 6 của coding-style.md)
SCOPES = [
    ("backend/src", (".java",)),
    ("backend", (".kts",)),
    ("mobile/app/src", (".kt",)),
    ("mobile", (".kts",)),
    ("city-web/src", (".ts", ".css")),
    ("city-web", (".ts",)),
    ("tools", (".py",)),
    ("database/seed", (".py",)),
]
SKIPPED_PARTS = {"build", "node_modules", "dist", ".gradle", "schemas"}

BRACE_LANGUAGES = {".java", ".ts"}
CONTROL_PATTERN = re.compile(r"^\s*(?:\}\s*)?(if|else if|for|while)\s*\(")
ELSE_PATTERN = re.compile(r"^\s*(?:\}\s*)?else\s+(?!if\b)(?!\{)\S")
KOTLIN_IF_PATTERN = re.compile(r"^\s*(?:\}\s*)?(if|else if)\s*\(")
URL_PATTERN = re.compile(r"https?://")
IMPORT_PATTERN = re.compile(r"^\s*(import|package)\b")
SEED_DATA_PATTERN = re.compile(r"^\s*[(\[\"']")
TEST_DATA_PATTERN = re.compile(r'^\s*(\"|\+\s*\")')

def collect_files():
    """Liệt kê các file thuộc phạm vi, bỏ thư mục build và file sinh tự động."""
    files = set()
    for folder, suffixes in SCOPES:
        base = ROOT / folder
        if not base.exists():
            continue
        pattern = "**/*" if folder.endswith("src") or folder in ("tools", "database/seed") else "*"
        for path in base.glob(pattern):
            if not path.is_file() or path.suffix not in suffixes:
                continue
            if SKIPPED_PARTS.intersection(path.relative_to(ROOT).parts):
                continue
            files.add(path)
    return sorted(files)

def strip_code(line, state):
    """Bỏ nội dung chuỗi và comment để các kiểm tra cú pháp không bị đánh lừa.

    `state` giữ trạng thái giữa các dòng: đang ở trong chuỗi nhiều dòng (\"\"\" hoặc `)
    hay trong comment khối.
    """
    result = []
    i = 0
    while i < len(line):
        if state["block_comment"]:
            end = line.find("*/", i)
            if end < 0:
                return "".join(result)
            state["block_comment"] = False
            i = end + 2
            continue
        if state["raw_string"]:
            end = line.find(state["raw_string"], i)
            if end < 0:
                return "".join(result)
            i = end + len(state["raw_string"])
            state["raw_string"] = None
            result.append('""')
            continue
        if line.startswith("//", i) or (state["python"] and line[i] == "#"):
            break
        if line.startswith("/*", i):
            state["block_comment"] = True
            i += 2
            continue
        if line.startswith('"""', i):
            state["raw_string"] = '"""'
            i += 3
            continue
        if line[i] == "`":
            state["raw_string"] = "`"
            i += 1
            continue
        if line[i] in "\"'":
            quote = line[i]
            i += 1
            while i < len(line) and line[i] != quote:
                i += 2 if line[i] == "\\" else 1
            i += 1
            result.append('""')
            continue
        result.append(line[i])
        i += 1
    return "".join(result)

def condition_end(code, start):
    """Trả vị trí ngay sau dấu ')' đóng điều kiện bắt đầu từ `start`, hoặc -1 nếu chưa đóng."""
    depth = 0
    for index in range(start, len(code)):
        if code[index] == "(":
            depth += 1
        elif code[index] == ")":
            depth -= 1
            if depth == 0:
                return index + 1
    return -1

TYPE_MEMBER = re.compile(r"^\s*(readonly\s+)?[\w$]+\??\s*(\([^)]*\))?\s*:\s*\S.*$")


def mask_type_literals(code):
    """Xoá các khối `{ a: T; b(): U }` (kiểu đối tượng của TS): dấu `;` trong đó không phải lệnh."""
    result = code
    while True:
        changed = False
        for match in re.finditer(r"\{([^{}]*)\}", result):
            members = [m for m in match.group(1).split(";") if m.strip()]
            if members and all(TYPE_MEMBER.match(m) and "=" not in m for m in members):
                result = result[:match.start()] + "T" + result[match.end():]
                changed = True
                break
        if not changed:
            return result


def has_multiple_statements(code):
    """Có `;` mà phía sau còn lệnh khác trên cùng dòng (trừ vòng for kiểu C)."""
    if re.match(r"^\s*for\s*\(", code):
        return False
    code = mask_type_literals(code)
    stripped = code.rstrip()
    if stripped.endswith(";"):
        stripped = stripped[:-1]
    return ";" in stripped

def check_file(path):
    """Trả danh sách (số dòng, mã lỗi, mô tả) của một file."""
    problems = []
    suffix = path.suffix
    try:
        lines = path.read_text(encoding="utf-8").split("\n")
    except UnicodeDecodeError:
        return [(0, "ENCODING", "file không phải UTF-8")]
    if lines and lines[-1] == "":
        lines = lines[:-1]

    state = {"block_comment": False, "raw_string": None, "python": suffix == ".py"}
    # Dòng dữ liệu (chuỗi câu ví dụ, giải thích) trong script seed được phép dài
    is_seed_data = "database/seed" in path.as_posix()
    # Dữ liệu mẫu (JSON) trong test cũng được phép dài, tách ra sẽ khó so với dữ liệu thật
    is_test = "/src/test/" in path.as_posix()
    blank_run = 0
    codes = []
    for number, raw in enumerate(lines, start=1):
        line = raw.rstrip("\r")
        if "\t" in line:
            problems.append((number, "TAB", "có ký tự tab"))
        if line != line.rstrip():
            problems.append((number, "TRAILING", "khoảng trắng cuối dòng"))
        too_long = len(line) > MAX_LINE
        allowed_long = (
            IMPORT_PATTERN.match(line)
            or URL_PATTERN.search(line)
            or (is_seed_data and SEED_DATA_PATTERN.match(line))
            or (is_test and (state["raw_string"] or TEST_DATA_PATTERN.match(line)))
        )
        if too_long and not allowed_long:
            problems.append((number, "LONG", f"dài {len(line)} ký tự (> {MAX_LINE})"))

        blank_run = blank_run + 1 if line.strip() == "" else 0
        if blank_run == 2 and suffix != ".py":  # Python theo PEP 8: 2 dòng trống giữa các hàm
            problems.append((number, "BLANKS", "quá 1 dòng trống liên tiếp"))

        was_in_string = state["raw_string"] is not None
        code = strip_code(line, state)
        codes.append(code)
        if was_in_string or suffix in (".py", ".css"):
            continue
        if has_multiple_statements(code):
            problems.append((number, "MULTI", "nhiều lệnh trên một dòng"))

    if suffix in BRACE_LANGUAGES:
        problems.extend(check_braces(codes, kotlin=False))
    elif suffix in (".kt", ".kts"):
        problems.extend(check_braces(codes, kotlin=True))
    return problems

def check_braces(codes, kotlin):
    """`if/for/while/else` dạng câu lệnh phải có `{` (Kotlin: chỉ xét `if` đứng đầu dòng)."""
    problems = []
    pattern = KOTLIN_IF_PATTERN if kotlin else CONTROL_PATTERN
    for index, code in enumerate(codes):
        number = index + 1
        if not kotlin and ELSE_PATTERN.match(code):
            problems.append((number, "BRACES", "`else` không có ngoặc {}"))
        match = pattern.match(code)
        if not match:
            continue
        end = condition_end(code, code.index("(", match.start(1)))
        if end < 0:
            continue  # điều kiện kéo sang dòng sau: bỏ qua, ít gặp
        rest = code[end:].strip()
        if rest.startswith("{") or rest.startswith("->"):
            continue
        if kotlin and re.search(r"\belse\b", rest):
            continue  # Kotlin: `if (…) a else b` là biểu thức, được viết một dòng
        if rest == "":
            following = next((c.strip() for c in codes[index + 1:] if c.strip()), "")
            if following.startswith("{"):
                continue
        problems.append((number, "BRACES", f"`{match.group(1)}` không có ngoặc {{}}"))
    return problems

def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--files", nargs="*", help="chỉ kiểm tra các file này")
    parser.add_argument("--summary", action="store_true", help="chỉ in số lỗi")
    args = parser.parse_args()

    if args.files:
        files = [Path(name).resolve() for name in args.files]
    else:
        files = collect_files()

    by_kind = Counter()
    by_file = Counter()
    for path in files:
        relative = path.relative_to(ROOT).as_posix()
        for number, kind, message in check_file(path):
            by_kind[kind] += 1
            by_file[relative] += 1
            if not args.summary:
                print(f"{relative}:{number}: [{kind}] {message}")

    total = sum(by_kind.values())
    if args.summary:
        for relative, count in by_file.most_common():
            print(f"{count:5d}  {relative}")
    print(f"\n{len(files)} file, {total} lỗi", dict(by_kind) if total else "")
    return 1 if total else 0

if __name__ == "__main__":
    sys.exit(main())
