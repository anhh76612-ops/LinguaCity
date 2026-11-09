"""Sinh database/migration/V008__kho_the.sql (Kho thẻ: cột mới + nội dung bổ sung HOUSING:1).

Chạy:  python database/seed/v008.py
Sửa nội dung trong housing_level1_extras.py rồi chạy lại.
Khi V008 đã chạy trên DB thật: KHÔNG sinh lại đè lên — tạo migration mới và tăng
content_packs.version của gói bị đổi.
"""
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import content_lib as lib  # noqa: E402
import housing_level1  # noqa: E402
import housing_level1_extras  # noqa: E402

OUTPUT = HERE.parent / "migration" / "V008__kho_the.sql"

# V003 đã dùng từ 1..30 cho HOUSING:1, theo thứ tự housing_level1.WORDS
HOUSING1_FIRST_VOCAB = 1

HEADER = """\
-- Kho thẻ · cột user_vocab_progress.last_correct_at; cột collocations/explanation/icon_key
-- của vocabularies và nội dung của chúng cho 30 từ HOUSING:1.
-- FILE SINH TỰ ĐỘNG bởi database/seed/v008.py — sửa ở đó rồi chạy lại, đừng sửa tay.
-- Chạy:  psql -U postgres -d linguacity_db -v ON_ERROR_STOP=1 -f database/migration/V008__kho_the.sql

BEGIN;

"""

SCHEMA = """\
-- ===== Cột mới =====
ALTER TABLE user_vocab_progress ADD COLUMN last_correct_at TIMESTAMP NULL;
ALTER TABLE vocabularies
    ADD COLUMN collocations JSONB NULL,
    ADD COLUMN explanation TEXT NULL,
    ADD COLUMN icon_key VARCHAR(40) NULL;

"""

PACK_BUMP = """\

-- ===== Tăng version gói đổi nội dung (ADR-012) =====
UPDATE content_packs SET version = version + 1, updated_at = now() WHERE code = 'HOUSING:1';

COMMIT;
"""


def validate(words, extras, icon_keys):
    """Dừng với thông báo rõ nếu nội dung bổ sung thiếu/thừa hoặc sai định dạng."""
    expected = [entry[0] for entry in words]
    errors = []
    missing = [word for word in expected if word not in extras]
    extra = [word for word in extras if word not in expected]
    if missing:
        errors.append(f"thiếu {len(missing)} từ: {', '.join(missing)}")
    if extra:
        errors.append(f"thừa {len(extra)} từ không có trong WORDS: {', '.join(extra)}")
    for word in expected:
        if word not in extras:
            continue
        collocations, explanation, icon_key = extras[word]
        if not 2 <= len(collocations) <= 3:
            errors.append(f"{word}: cần 2–3 cụm từ, có {len(collocations)}")
        if any(not phrase.strip() for phrase in collocations):
            errors.append(f"{word}: có cụm từ rỗng")
        if not explanation.strip():
            errors.append(f"{word}: explanation rỗng")
        if icon_key not in icon_keys:
            errors.append(f"{word}: icon_key '{icon_key}' không thuộc ICON_KEYS")
    if errors:
        raise SystemExit("housing_level1_extras không hợp lệ:\n  " + "\n  ".join(errors))


def build():
    words = housing_level1.WORDS
    extras = housing_level1_extras.EXTRAS
    validate(words, extras, housing_level1_extras.ICON_KEYS)

    parts = [HEADER, SCHEMA]
    w = parts.append
    w("-- ===== Nội dung HOUSING:1: cụm từ, giải thích, icon =====\n")
    for index, entry in enumerate(words):
        word = entry[0]
        collocations, explanation, icon_key = extras[word]
        collocations_json = json.dumps(collocations, ensure_ascii=False)
        w("UPDATE vocabularies SET "
          f"collocations = {lib.q(collocations_json)}::jsonb, "
          f"explanation = {lib.q(explanation)}, icon_key = {lib.q(icon_key)} "
          f"WHERE id = {HOUSING1_FIRST_VOCAB + index} AND word = {lib.q(word)};\n")
    w(PACK_BUMP)
    return "".join(parts)


if __name__ == "__main__":
    OUTPUT.write_text(build(), encoding="utf-8", newline="\n")
    print(f"Đã ghi {OUTPUT.relative_to(HERE.parent.parent)}")
