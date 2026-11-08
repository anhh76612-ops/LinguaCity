"""Thư viện sinh SQL cho gói từ vựng (dùng chung cho mọi gói từ đợt 2).

Một từ là một tuple 12 phần tử:
    (word, ipa, word_type, meaning, rank, theme, examples, tier2_sentence, tier2_tip,
     tier3_sentence, tier3_explanation, extra_accepted)

Mỗi từ sinh 3 câu hỏi (ADR-013, ADR-014):
    tier 1  MULT_CHOICE  READING  nhận nghĩa (3 phương án nhiễu lấy từ nghĩa của từ khác cùng gói)
    tier 2  FILL_BLANK   WRITING  điền từ, có gợi ý nghĩa + chữ cái đầu/cuối
    tier 3  FILL_BLANK   WRITING  điền từ trong ngữ cảnh, không gợi ý; giải thích từ dễ nhầm
"""
import json

VOCAB_INSERT = (
    "INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, "
    "theme_id, level, difficulty_rank) VALUES "
)
QUESTION_INSERT = (
    "INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, "
    "accepted_answers, explanation, audio_url, metadata) VALUES "
)
LINK_INSERT = (
    "INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES "
)
QUESTIONS_PER_WORD = 3


def q(text):
    """Chuỗi SQL có nháy đơn đã thoát."""
    return "'" + text.replace("'", "''") + "'"


def hint_of(word):
    """Gợi ý chữ cái: giữ chữ đầu và chữ cuối, ví dụ "r _ _ t"."""
    if len(word) <= 2:
        return word
    return " ".join([word[0]] + ["_"] * (len(word) - 2) + [word[-1]])


def check_words(words, expected):
    """Kiểm tra dữ liệu trước khi sinh SQL: đủ số từ, không trùng, chỗ trống đúng định dạng."""
    assert len(words) == expected, f"cần {expected} từ, có {len(words)}"
    seen = set()
    for entry in words:
        assert len(entry) == 12, entry[0]
        word = entry[0]
        assert word not in seen, f"trùng từ {word}"
        seen.add(word)
        assert entry[4] in ("A", "B", "C", "D"), word
        assert len(entry[6]) == 2, f"{word}: cần đúng 2 câu ví dụ"
        assert entry[7].count("___") == 1, f"{word}: câu tier 2 phải có đúng một chỗ trống"
        assert entry[9].count("___") == 1, f"{word}: câu tier 3 phải có đúng một chỗ trống"


def question_id(first_question_id, word_index, tier):
    """Id câu hỏi của từ thứ word_index (đếm từ 0) ở tier 1..3."""
    return first_question_id + word_index * QUESTIONS_PER_WORD + (tier - 1)


def write_vocabularies(w, words, first_id, level):
    for index, entry in enumerate(words):
        word, ipa, word_type, meaning, rank, theme, examples = entry[:7]
        examples_json = json.dumps(examples, ensure_ascii=False)
        w(VOCAB_INSERT
          + f"({first_id + index}, {q(word)}, {q(meaning)}, {q(word_type)}, {q(ipa)}, "
          + f"{q(examples_json)}::jsonb, NULL, "
          + f"(SELECT id FROM themes WHERE code = {q(theme)}), {level}, {q(rank)});\n")


def questions_of(index, entry, meanings):
    """3 câu hỏi của một từ, theo thứ tự tier 1, 2, 3."""
    (word, ipa, _type, meaning, _rank, _theme, examples, sentence2, tip2,
     sentence3, explanation3, extra) = entry
    count = len(meanings)
    distractors = [meanings[(index + step) % count] for step in (3, 11, 19)]
    options = [meaning] + distractors
    rotation = (index + 1) % 4  # xoay vị trí đáp án đúng cho đều
    if rotation:
        options = options[-rotation:] + options[:-rotation]
    explanation1 = f"\"{word}\" {ipa} nghĩa là {meaning}. Ví dụ: {examples[0]}"
    return (
        (1, "MULT_CHOICE", "READING", f"What does \"{word}\" mean?", meaning, [],
         explanation1, {"options": options}),
        (2, "FILL_BLANK", "WRITING", f"Điền từ còn thiếu (gợi ý: {meaning})", word, extra, tip2,
         {"sentence": sentence2, "hint": hint_of(word)}),
        (3, "FILL_BLANK", "WRITING", "Điền một từ phù hợp vào chỗ trống", word, extra,
         explanation3, {"sentence": sentence3}),
    )


def write_questions(w, words, first_vocab_id, first_question_id):
    meanings = [entry[3] for entry in words]
    for index, entry in enumerate(words):
        vocab_id = first_vocab_id + index
        for tier, qtype, skill, text, answer, accepted, explanation, meta in questions_of(
                index, entry, meanings):
            qid = question_id(first_question_id, index, tier)
            accepted_json = json.dumps(accepted, ensure_ascii=False)
            meta_json = json.dumps(meta, ensure_ascii=False)
            w(QUESTION_INSERT
              + f"({qid}, 'VOCABULARY', '{skill}', '{qtype}', {tier}, {q(text)}, {q(answer)}, "
              + f"{q(accepted_json)}::jsonb, {q(explanation)}, NULL, {q(meta_json)}::jsonb);\n")
            w(LINK_INSERT + f"({qid}, {vocab_id}, 'TARGET');\n")


def write_pack(w, title, words, first_vocab_id, first_question_id, level):
    """Từ + câu hỏi + liên kết TARGET của một gói."""
    w(f"-- ===== {title}: {len(words)} từ, {len(words) * QUESTIONS_PER_WORD} câu hỏi =====\n")
    write_vocabularies(w, words, first_vocab_id, level)
    write_questions(w, words, first_vocab_id, first_question_id)
    w("\n")


def set_sequences(w):
    """Đưa sequence của các bảng về MAX(id) sau khi chèn id cố định."""
    for table in ("vocabularies", "questions"):
        w(f"SELECT setval(pg_get_serial_sequence('{table}', 'id'), "
          f"(SELECT MAX(id) FROM {table}));\n")
