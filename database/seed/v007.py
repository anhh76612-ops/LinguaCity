"""Sinh database/migration/V007__content_house2_school1.sql (ADR-015 §8, đợt 2 M13).

Chạy:  python database/seed/v007.py
Sửa nội dung trong housing_level2.py / school_level1.py hoặc các bảng dưới đây rồi chạy lại.
Khi V007 đã chạy trên DB thật: KHÔNG sinh lại đè lên — tạo migration mới và tăng
content_packs.version của gói bị đổi.
"""
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import content_lib as lib  # noqa: E402
import housing_level2  # noqa: E402
import school_level1  # noqa: E402

OUTPUT = HERE.parent / "migration" / "V007__content_house2_school1.sql"

# V003 đã dùng từ 1..30 và câu hỏi 1..90 (HOUSING:1)
HOUSING2_FIRST_VOCAB = 31
HOUSING2_FIRST_QUESTION = 91
SCHOOL1_FIRST_VOCAB = 61
SCHOOL1_FIRST_QUESTION = 181

HEADER = """\
-- Đợt 2 (M13) · ADR-015 §8 · Nội dung HOUSING:2 + SCHOOL:1, bài thi House Lv2, nâng cấp,
-- nhiệm vụ, sự kiện thành phố, danh hiệu chuỗi.
-- FILE SINH TỰ ĐỘNG bởi database/seed/v007.py — sửa ở đó rồi chạy lại, đừng sửa tay.
-- Cần V006 chạy trước.
""" + (
    "-- Chạy:  psql -U postgres -d linguacity_db -v ON_ERROR_STOP=1 "
    "-f database/migration/V007__content_house2_school1.sql\n"
) + """
BEGIN;

"""

WORLD = """\
-- ===== Gói mới + tăng version gói đổi nội dung (ADR-012) =====
INSERT INTO content_packs (code, scope, building_id, level, version)
SELECT 'HOUSING:2', 'GLOBAL', id, 2, 1 FROM buildings WHERE code = 'HOUSING';
INSERT INTO content_packs (code, scope, building_id, level, version)
SELECT 'SCHOOL:1', 'GLOBAL', id, 1, 1 FROM buildings WHERE code = 'SCHOOL';
-- CORE: building_levels.required_shards + danh hiệu mới; HOUSING:1: điều kiện + pool bài thi Lv2
UPDATE content_packs SET version = version + 1, updated_at = now()
WHERE code IN ('CORE', 'HOUSING:1');

-- ===== Nâng cấp (BR-UPG-01): mảnh cần cho Lv2, Lv3 =====
UPDATE building_levels SET required_shards = 3 WHERE level = 2;
UPDATE building_levels SET required_shards = 6 WHERE level = 3;

"""

EXAM = """\
-- ===== Bài thi House Lv2 (BR-EXAM-01..07) =====
-- 45/60 từ House (Lv1 + Lv2), phí 200 KP, cần School Lv1 (nhiệm vụ chính tuyến)
UPDATE exam_requirements
SET required_card_count = 45,
    required_knowledge = 200,
    required_blueprint_shards = 0,
    required_building_id = (SELECT id FROM buildings WHERE code = 'SCHOOL'),
    required_building_level = 1
WHERE exam_id = (SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2');
UPDATE exams SET pass_percent = 80, question_count = 10 WHERE code = 'EXAM_HOUSING_LV2';
"""

QUESTS = [
    # code, kind, title, description, goal_type, goal_ref, goal_value, kp, shards, prerequisite
    ("MAIN_BUILD_HOUSE", "MAIN", "Ngôi nhà đầu tiên",
     "Xây House lên Lv1 — nơi bạn bắt đầu cuộc sống ở LinguaCity.",
     "BUILDING_LEVEL", "HOUSING", 1, 30, 0, None),
    ("MAIN_LEARN_SCHOOL", "MAIN", "Đến trường",
     "Sưu tầm 20 từ của School để đủ điều kiện xây trường học.",
     "COLLECTED_WORDS", "SCHOOL", 20, 40, 1, "MAIN_BUILD_HOUSE"),
    ("MAIN_BUILD_SCHOOL", "MAIN", "Ngôi trường của thành phố",
     "Xây School lên Lv1. Trường học mở đường cho các bài thi nâng cấp.",
     "BUILDING_LEVEL", "SCHOOL", 1, 50, 1, "MAIN_LEARN_SCHOOL"),
    ("MAIN_PASS_HOUSE_EXAM", "MAIN", "Bản vẽ nhà mới",
     "Thi đậu bài thi lên House Lv2 để nhận bản vẽ.",
     "EXAM_PASSED", "EXAM_HOUSING_LV2", 1, 60, 1, "MAIN_BUILD_SCHOOL"),
    ("MAIN_UPGRADE_HOUSE", "MAIN", "Nhà to hơn",
     "Nâng House lên Lv2 bằng bản vẽ, mảnh bản vẽ và KP.",
     "BUILDING_LEVEL", "HOUSING", 2, 100, 2, "MAIN_PASS_HOUSE_EXAM"),
    ("DAILY_LESSON", "DAILY", "Học một bài",
     "Hoàn thành 1 bài học hoặc 1 lượt luyện tập.",
     "LESSON_COMPLETED", None, 1, 10, 1, None),
    ("DAILY_NEW_WORDS", "DAILY", "Thẻ từ mới",
     "Sưu tầm 5 từ mới.",
     "NEW_WORDS", None, 5, 10, 1, None),
    ("DAILY_EVENT", "DAILY", "Giúp một cư dân",
     "Giải 1 sự kiện \"!\" trong thành phố.",
     "EVENT_RESOLVED", None, 1, 10, 1, None),
    ("DAILY_STREAK10", "DAILY", "Liền mạch",
     "Trả lời đúng liên tiếp 10 câu trong một bài.",
     "STREAK_CORRECT", None, 10, 10, 1, None),
    ("DAILY_REVIEW", "DAILY", "Ôn bài cũ",
     "Trả lời 10 câu về những từ bạn đã sưu tầm.",
     "REVIEW_WORDS", None, 10, 10, 1, None),
    ("DAILY_BONUS", "BONUS", "Thưởng hôm nay",
     "Xong cả 3 nhiệm vụ hằng ngày.",
     "DAILY_ALL", None, 3, 20, 1, None),
]

EVENTS = [
    # code, building, resident, situation
    ("EVT_LEASE_HELP", "HOUSING", "Bà Lan",
     "Bà Lan vừa nhận hợp đồng thuê nhà mới nhưng còn vài từ chưa hiểu. Bạn đọc giúp bà nhé?"),
    ("EVT_LOST_RECEIPT", "HOUSING", "Anh Tuấn",
     "Anh Tuấn muốn đổi cái máy xay bị hỏng nhưng lạc mất biên lai. Giúp anh viết thư cho "
     "cửa hàng!"),
    ("EVT_NEW_NEIGHBOR", "HOUSING", "Chị Hoa",
     "Gia đình người nước ngoài vừa dọn đến cạnh nhà chị Hoa. Chị muốn chào hỏi bằng tiếng Anh."),
    ("EVT_LIBRARY_CARD", "SCHOOL", "Bé Na",
     "Bé Na muốn làm thẻ thư viện nhưng tờ đơn toàn tiếng Anh. Bạn giải thích giúp nhé!"),
    ("EVT_HOMEWORK", "SCHOOL", "Cậu Khang",
     "Khang sắp tới hạn nộp bài tập mà còn vài từ chưa hiểu. Ôn cùng cậu ấy một chút?"),
    ("EVT_PARK_SIGN", "PARK", "Ông Bảy",
     "Ông Bảy thấy tấm biển mới dựng ở công viên nhưng không biết nó ghi gì."),
    ("EVT_PICNIC_PLAN", "PARK", "Nhóm bạn trẻ",
     "Nhóm bạn trẻ lên kế hoạch đi dã ngoại cuối tuần và cần từ để viết thông báo."),
    ("EVT_BUS_DELAY", "ROAD", "Cô Mai Anh",
     "Xe buýt bị trễ, cô Mai Anh cần đọc thông báo đổi lịch trên bảng điện tử."),
    ("EVT_DELIVERY", "ROAD", "Shipper Long",
     "Anh Long giao hàng cho khách nước ngoài và cần hỏi lại địa chỉ cho đúng."),
    ("EVT_MARKET_PRICE", "PARK", "Cô bán hoa",
     "Cô bán hoa có khách du lịch hỏi giá và giảm giá. Bạn phiên dịch giúp cô!"),
]

STREAK_TITLES = [
    # code, name, description, tier, threshold, sort
    ("STREAK_3", "Người giữ lửa", "Giữ chuỗi học 3 ngày liền. Mất danh hiệu khi đứt chuỗi.",
     "EASY", 3, 8),
    ("STREAK_10", "Ngọn đuốc bền bỉ", "Giữ chuỗi học 10 ngày liền. Mất danh hiệu khi đứt chuỗi.",
     "HARD", 10, 9),
    ("STREAK_20", "Lò rèn không nghỉ",
     "Giữ chuỗi học 20 ngày liền. Mất danh hiệu khi đứt chuỗi.", "HARD", 20, 10),
    ("STREAK_30", "Ngọn hải đăng", "Giữ chuỗi học 30 ngày liền. Mất danh hiệu khi đứt chuỗi.",
     "HIDDEN", 30, 11),
]


def sql_value(value):
    if value is None:
        return "NULL"
    if isinstance(value, int):
        return str(value)
    return lib.q(value)


def write_exam_pool(w):
    """Pool bài thi = 10 câu tier 3 cũ (Lv1) + 10 câu tier 3 của Lv2 (mỗi từ thứ 3)."""
    w("-- Pool: thêm 10 câu tier 3 của House Lv2 (từ thứ 1, 4, 7, …, 28 của gói)\n")
    for index in range(0, 30, 3):
        question = lib.question_id(HOUSING2_FIRST_QUESTION, index, 3)
        w("INSERT INTO exam_questions (exam_id, question_id) VALUES "
          f"((SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2'), {question});\n")
    w("\n")


def write_quests(w):
    w("-- ===== Nhiệm vụ (BR-QUEST-01..05) — thứ tự chèn theo prerequisite =====\n")
    for sort, quest in enumerate(QUESTS, start=1):
        code, kind, title, description, goal_type, goal_ref, goal, kp, shards, prereq = quest
        values = [code, kind, title, description, goal_type, goal_ref, goal, kp, shards, prereq,
                  sort]
        w("INSERT INTO quests (code, kind, title, description, goal_type, goal_ref, goal_value, "
          "reward_kp, reward_shards, prerequisite_code, sort_order) VALUES ("
          + ", ".join(sql_value(value) for value in values) + ");\n")
    w("\n")


def write_events(w):
    w("-- ===== Mẫu sự kiện thành phố (BR-EVT-01..04) =====\n")
    for sort, (code, building, resident, situation) in enumerate(EVENTS, start=1):
        w("INSERT INTO city_event_templates (code, building_code, resident_name, situation, "
          f"sort_order) VALUES ({lib.q(code)}, {lib.q(building)}, {lib.q(resident)}, "
          f"{lib.q(situation)}, {sort});\n")
    w("\n")


def write_titles(w):
    w("-- ===== Danh hiệu chuỗi (BR-STREAK-03, BR-ACH-05): thu hồi khi đứt chuỗi =====\n")
    for code, name, description, tier, threshold, sort in STREAK_TITLES:
        w("INSERT INTO achievements (code, name, description, tier, condition_type, threshold, "
          f"sort_order, revocable) VALUES ({lib.q(code)}, {lib.q(name)}, {lib.q(description)}, "
          f"{lib.q(tier)}, 'STREAK_DAYS', {threshold}, {sort}, TRUE);\n")
    w("\n")


def build():
    lib.check_words(housing_level2.WORDS, 30)
    lib.check_words(school_level1.WORDS, 30)
    words = {entry[0] for entry in housing_level2.WORDS + school_level1.WORDS}
    assert len(words) == 60, "trùng từ giữa hai gói"

    parts = []
    w = parts.append
    w(HEADER)
    w(WORLD)
    lib.write_pack(w, "House Level 2 (HOUSING:2)", housing_level2.WORDS,
                   HOUSING2_FIRST_VOCAB, HOUSING2_FIRST_QUESTION, level=2)
    lib.write_pack(w, "School Level 1 (SCHOOL:1)", school_level1.WORDS,
                   SCHOOL1_FIRST_VOCAB, SCHOOL1_FIRST_QUESTION, level=1)
    lib.set_sequences(w)
    w("\n")
    w(EXAM)
    write_exam_pool(w)
    write_quests(w)
    write_events(w)
    write_titles(w)
    w("COMMIT;\n")
    return "".join(parts)


if __name__ == "__main__":
    OUTPUT.write_text(build(), encoding="utf-8", newline="\n")
    print(f"Đã ghi {OUTPUT.relative_to(HERE.parent.parent)}")
