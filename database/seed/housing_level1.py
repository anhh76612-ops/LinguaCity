"""
Nội dung House Level 1 (30 từ, 90 câu hỏi) và trình sinh phần seed của V003.

Chạy:  python database/seed/housing_level1.py   (in ra phần seed; dán thay phần seed trong V003)
(V003__content_packs.sql đã chứa sẵn kết quả. Sửa nội dung ở đây rồi sinh lại,
và nhớ tăng content_packs.version của gói HOUSING:1 trong migration mới.)

Mỗi từ có 3 câu (ADR-013, ADR-014):
  tier 1  MULT_CHOICE  READING  nhận nghĩa
  tier 2  FILL_BLANK   WRITING  điền từ, có gợi ý nghĩa + chữ cái
  tier 3  FILL_BLANK   WRITING  điền từ trong ngữ cảnh, không gợi ý; có từ gần nghĩa dễ nhầm
"""
import json
import sys

# (word, ipa, word_type, meaning, rank, theme, examples, tier2_sentence, tier2_tip,
#  tier3_sentence, tier3_explanation, extra_accepted)
WORDS = [
    ("rent", "/rent/", "NOUN", "tiền thuê nhà", "D", "HOUSE",
     ["My rent is due on the first day of every month.", "The rent includes water but not electricity."],
     "I pay the ___ to my landlord every month.",
     "\"Rent\" là khoản bạn trả đều đặn để được ở nhà người khác — nhớ là trả hằng tháng nhé.",
     "The ___ for this two-bedroom apartment is $900 a month.",
     "Đáp án là \"rent\": khoản trả hằng tháng để ở. Đừng nhầm với \"deposit\" — tiền cọc chỉ đưa một lần lúc dọn vào.",
     []),
    ("landlord", "/ˈlændlɔːd/", "NOUN", "chủ nhà (người cho thuê)", "D", "HOUSE",
     ["Our landlord fixed the heater in one day.", "Call the landlord if the roof leaks."],
     "The ___ owns the building and rents it out to us.",
     "\"Landlord\" là người sở hữu và cho thuê nhà. Người đi thuê thì gọi là \"tenant\".",
     "If the sink breaks, you should contact the ___ because he owns the apartment.",
     "Người sở hữu căn hộ và chịu trách nhiệm sửa chữa là \"landlord\". \"Tenant\" là phía đi thuê, nên không hợp ở đây.",
     ["landlady"]),
    ("tenant", "/ˈtenənt/", "NOUN", "người thuê nhà", "C", "HOUSE",
     ["The new tenant moved in last week.", "Tenants must give one month's notice before leaving."],
     "A ___ is a person who pays rent to live in a place.",
     "\"Tenant\" là người đi thuê. Mẹo nhớ: tenant ở trong \"ten\"-ant — người \"ở\" chứ không phải người \"sở hữu\".",
     "Every ___ in the building received a letter about the new parking rules.",
     "Lá thư gửi cho những người đang ở thuê trong toà nhà, nên là \"tenant\". Nếu là \"landlord\" thì chỉ có một người thôi.",
     ["tenants"]),
    ("lease", "/liːs/", "NOUN", "hợp đồng thuê", "C", "HOUSE",
     ["We signed a one-year lease.", "Read the lease carefully before you sign it."],
     "Before moving in, you must sign a ___ with the owner.",
     "\"Lease\" là hợp đồng thuê nhà có thời hạn, ví dụ \"a one-year lease\".",
     "Our ___ ends in June, so we need to decide whether to renew it.",
     "Thứ có ngày hết hạn và có thể \"renew\" (gia hạn) là hợp đồng thuê — \"lease\". \"Rent\" là số tiền, không \"hết hạn\" được.",
     []),
    ("deposit", "/dɪˈpɒzɪt/", "NOUN", "tiền đặt cọc", "C", "HOUSE",
     ["You will get your deposit back when you leave.", "The deposit is equal to one month's rent."],
     "We paid a ___ before we got the keys to the apartment.",
     "\"Deposit\" là tiền cọc, trả một lần và thường được hoàn lại khi trả nhà.",
     "The landlord kept part of the ___ because the carpet was damaged.",
     "Khoản tiền bị giữ lại vì làm hỏng đồ là tiền cọc — \"deposit\". Tiền thuê hằng tháng (\"rent\") thì đã trả rồi, không bị \"giữ lại\".",
     []),
    ("utilities", "/juːˈtɪlətiz/", "NOUN", "các dịch vụ tiện ích (điện, nước, ga)", "C", "HOUSE",
     ["The rent does not include utilities.", "Utilities cost about $100 a month."],
     "Electricity, water and gas are called ___.",
     "\"Utilities\" gom chung điện, nước, ga… — thường dùng số nhiều.",
     "Is the internet included in the ___, or do I pay for it separately?",
     "Câu này hỏi các dịch vụ đi kèm nhà như điện, nước, internet — đó là \"utilities\". \"Appliances\" là máy móc trong nhà, không phải dịch vụ.",
     ["utility"]),
    ("furniture", "/ˈfɜːnɪtʃə(r)/", "NOUN", "đồ nội thất", "D", "HOUSE",
     ["The apartment comes with furniture.", "We bought some new furniture for the living room."],
     "Tables, chairs and beds are all ___.",
     "\"Furniture\" là danh từ không đếm được: nói \"some furniture\" hoặc \"a piece of furniture\", không nói \"furnitures\".",
     "We need to buy some ___ because the apartment is completely empty.",
     "Căn hộ trống trơn thì cần mua bàn ghế, giường tủ — \"furniture\". Lưu ý không thêm \"s\" nhé.",
     []),
    ("appliance", "/əˈplaɪəns/", "NOUN", "thiết bị gia dụng", "C", "HOUSE",
     ["The kitchen has new appliances.", "Turn off all appliances before you leave."],
     "A washing machine is a household ___.",
     "\"Appliance\" là máy móc dùng điện trong nhà: tủ lạnh, máy giặt, lò vi sóng…",
     "The refrigerator is the most expensive ___ in our kitchen.",
     "Tủ lạnh là một thiết bị điện gia dụng — \"appliance\". \"Furniture\" là bàn ghế, giường tủ, không chạy bằng điện.",
     ["appliances"]),
    ("neighbor", "/ˈneɪbə(r)/", "NOUN", "hàng xóm", "D", "HOUSE",
     ["Our neighbor has a friendly dog.", "I borrowed a ladder from my neighbor."],
     "The person who lives next door is your ___.",
     "\"Neighbor\" (Anh-Mỹ) hay \"neighbour\" (Anh-Anh) đều đúng — người sống cạnh nhà bạn.",
     "My ___ always waters my plants when I go on vacation.",
     "Người sống gần và giúp tưới cây khi bạn đi vắng — \"neighbor\". Cách viết \"neighbour\" cũng được chấp nhận.",
     ["neighbour"]),
    ("apartment", "/əˈpɑːtmənt/", "NOUN", "căn hộ", "D", "HOUSE",
     ["She lives in a small apartment downtown.", "The apartment is on the fifth floor."],
     "We live in an ___ on the third floor of a big building.",
     "\"Apartment\" là căn hộ trong một toà nhà nhiều tầng. Người Anh hay nói \"flat\".",
     "Their new ___ has two bedrooms and a balcony with a view of the river.",
     "Một căn có hai phòng ngủ và ban công trong toà nhà — \"apartment\" (hoặc \"flat\").",
     ["flat"]),
    ("repair", "/rɪˈpeə(r)/", "VERB", "sửa chữa", "D", "HOUSE",
     ["Can you repair the broken window?", "It took two days to repair the roof."],
     "The plumber came to ___ the leaking pipe.",
     "\"Repair\" là sửa cái đang hỏng cho dùng lại được, giống \"fix\".",
     "It is cheaper to ___ the old washing machine than to buy a new one.",
     "So sánh giữa sửa cái cũ và mua cái mới → \"repair\" (hoặc \"fix\"). \"Renovate\" là cải tạo cả căn phòng, không dùng cho một cái máy.",
     ["fix"]),
    ("renovate", "/ˈrenəveɪt/", "VERB", "cải tạo, tân trang", "C", "HOUSE",
     ["They plan to renovate the kitchen next year.", "The old hotel was renovated in 2024."],
     "We want to ___ the old bathroom and make it look modern.",
     "\"Renovate\" là cải tạo cho mới lại cả một không gian — lớn hơn \"repair\" nhiều.",
     "The owners decided to ___ the whole house before selling it.",
     "Làm mới cả ngôi nhà trước khi bán — \"renovate\". \"Repair\" chỉ là sửa chỗ hỏng.",
     []),
    ("spacious", "/ˈspeɪʃəs/", "ADJECTIVE", "rộng rãi", "C", "HOUSE",
     ["The living room is bright and spacious.", "We need a more spacious car for the family."],
     "The room is very ___, so we can fit a big sofa in it.",
     "\"Spacious\" đi từ \"space\" (không gian) — nhiều không gian tức là rộng rãi.",
     "After living in a tiny studio, the new three-bedroom house felt very ___.",
     "So với căn studio chật, nhà ba phòng ngủ cho cảm giác \"spacious\" — rộng rãi. \"Convenient\" là tiện lợi, không nói về kích thước.",
     []),
    ("maintenance", "/ˈmeɪntənəns/", "NOUN", "sự bảo trì", "C", "HOUSE",
     ["The building is closed for maintenance.", "Regular maintenance keeps the elevator safe."],
     "The elevator is not working today because of ___.",
     "\"Maintenance\" là việc bảo trì định kỳ để mọi thứ không hỏng — khác với \"repair\" là sửa khi đã hỏng.",
     "The monthly fee covers cleaning and ___ of the shared areas.",
     "Phí hằng tháng trả cho việc giữ gìn khu vực chung luôn tốt — \"maintenance\". Chú ý chính tả: main-te-nance.",
     []),
    ("relocate", "/ˌriːləʊˈkeɪt/", "VERB", "chuyển đến nơi ở/làm việc mới", "C", "HOUSE",
     ["The company will relocate to Da Nang.", "We relocated last spring for my new job."],
     "My family had to ___ to another city for my father's job.",
     "\"Relocate\" = move to a new place, thường dùng khi chuyển nhà hoặc chuyển văn phòng vì công việc.",
     "Many employees did not want to ___ when the office moved overseas.",
     "Chuyển cả nơi sống sang nước khác theo văn phòng — \"relocate\". \"Renovate\" là sửa sang, không phải chuyển đi.",
     ["move"]),
    ("groceries", "/ˈɡrəʊsəriz/", "NOUN", "thực phẩm, hàng tạp hoá", "D", "DAILY_LIFE",
     ["I buy groceries every Saturday.", "Can you help me carry the groceries?"],
     "I need to buy ___ like milk, eggs and bread.",
     "\"Groceries\" là đồ ăn và đồ dùng mua ở siêu thị, thường dùng số nhiều.",
     "We spend about $60 a week on ___ for the whole family.",
     "Tiền mua thực phẩm hằng tuần cho cả nhà — \"groceries\". \"Bills\" là hoá đơn phải trả như điện nước.",
     ["grocery"]),
    ("laundry", "/ˈlɔːndri/", "NOUN", "quần áo cần giặt; việc giặt giũ", "D", "DAILY_LIFE",
     ["I do the laundry on Sundays.", "There is a laundry room in the basement."],
     "I have to do the ___ because I have no clean clothes.",
     "\"Do the laundry\" = giặt đồ. Đây là cụm cố định rất hay gặp.",
     "There is a pile of dirty ___ next to the washing machine.",
     "Đống quần áo bẩn cạnh máy giặt — \"laundry\". Từ này không đếm được nên không thêm \"s\".",
     []),
    ("commute", "/kəˈmjuːt/", "VERB", "đi lại hằng ngày (giữa nhà và nơi làm)", "C", "DAILY_LIFE",
     ["I commute to work by bus.", "She commutes for an hour every day."],
     "Many people ___ to the city center by train every morning.",
     "\"Commute\" là chuyến đi lặp lại mỗi ngày giữa nhà và chỗ làm/chỗ học.",
     "Living near the office means I only ___ for ten minutes each way.",
     "Thời gian đi lại mỗi chiều giữa nhà và công ty — \"commute\". \"Relocate\" là chuyển hẳn đến nơi mới, chỉ làm một lần.",
     []),
    ("schedule", "/ˈʃedjuːl/", "NOUN", "lịch trình", "D", "DAILY_LIFE",
     ["My schedule is very busy this week.", "Check the bus schedule before you leave."],
     "Let me check my ___ to see if I am free on Friday.",
     "\"Schedule\" là danh sách việc theo giờ. Người Mỹ đọc /ˈskedʒuːl/, người Anh đọc /ˈʃedjuːl/.",
     "The train is running ten minutes behind ___ because of the rain.",
     "\"Behind schedule\" = trễ so với lịch. Đây là cụm cố định — \"routine\" không đi với \"behind\".",
     []),
    ("errand", "/ˈerənd/", "NOUN", "việc vặt (đi mua đồ, gửi thư…)", "C", "DAILY_LIFE",
     ["I have a few errands to run this afternoon.", "He went out to do some errands."],
     "I need to run an ___: go to the post office and the bank.",
     "\"Run an errand\" là đi làm một việc vặt nhỏ bên ngoài, như ra bưu điện hay ngân hàng.",
     "She left work early to run a few ___ before the shops closed.",
     "Đi làm vài việc lặt vặt trước khi cửa hàng đóng — \"errands\". \"Chores\" là việc nhà làm trong nhà.",
     ["errands"]),
    ("recipe", "/ˈresəpi/", "NOUN", "công thức nấu ăn", "D", "DAILY_LIFE",
     ["This recipe needs three eggs.", "My grandmother gave me her soup recipe."],
     "Follow the ___ carefully if you want the cake to be good.",
     "\"Recipe\" đọc là /ˈresəpi/ (3 âm tiết) — đừng nhầm với \"receipt\" (hoá đơn).",
     "Can you share the ___ for this soup? I want to cook it at home.",
     "Muốn tự nấu lại món canh thì cần công thức — \"recipe\". \"Receipt\" là tờ hoá đơn, nghe giống nhưng nghĩa khác hẳn.",
     []),
    ("receipt", "/rɪˈsiːt/", "NOUN", "hoá đơn, biên lai (sau khi trả tiền)", "D", "DAILY_LIFE",
     ["Keep the receipt in case you want to return it.", "The cashier forgot to give me a receipt."],
     "Please keep your ___ if you want to return the shirt.",
     "\"Receipt\" là tờ giấy chứng nhận bạn **đã** trả tiền. Chữ \"p\" câm: /rɪˈsiːt/.",
     "I can't get a refund because I lost the ___.",
     "Muốn hoàn tiền thì cần bằng chứng đã mua — \"receipt\". \"Bill\" là hoá đơn bạn **cần** trả, chưa trả.",
     []),
    ("budget", "/ˈbʌdʒɪt/", "NOUN", "ngân sách", "D", "DAILY_LIFE",
     ["We have a small budget for the trip.", "Make a monthly budget to save money."],
     "Our ___ for food is $300 a month.",
     "\"Budget\" là số tiền bạn dự định chi cho một việc.",
     "The new sofa was too expensive, so it was outside our ___.",
     "\"Outside our budget\" = vượt quá số tiền định chi. Còn \"bill\" là hoá đơn cụ thể, không có nghĩa này.",
     []),
    ("chore", "/tʃɔː(r)/", "NOUN", "việc nhà", "D", "DAILY_LIFE",
     ["Washing dishes is my least favorite chore.", "The children help with the chores."],
     "Cleaning the bathroom is my least favorite ___.",
     "\"Chore\" là việc nhà nhàm chán phải làm thường xuyên: rửa bát, lau nhà…",
     "On weekends the whole family shares the household ___ like cooking and cleaning.",
     "Việc nhà chia nhau làm — \"chores\". \"Errands\" là việc vặt phải ra ngoài làm.",
     ["chores"]),
    ("routine", "/ruːˈtiːn/", "NOUN", "thói quen hằng ngày", "D", "DAILY_LIFE",
     ["Exercise is part of my morning routine.", "Babies need a regular routine."],
     "My morning ___ is: wake up, shower, and have breakfast.",
     "\"Routine\" là chuỗi việc bạn làm theo cùng một thứ tự mỗi ngày.",
     "Going for a run before work has become part of my daily ___.",
     "Việc làm đều đặn mỗi ngày, trở thành nếp sống — \"routine\". \"Schedule\" thiên về lịch hẹn theo giờ cụ thể.",
     []),
    ("convenient", "/kənˈviːniənt/", "ADJECTIVE", "tiện lợi, thuận tiện", "D", "DAILY_LIFE",
     ["The supermarket is very convenient.", "Is 3 p.m. a convenient time for you?"],
     "The apartment is ___ because it is close to the bus stop.",
     "\"Convenient\" = tiện lợi, dễ dàng cho bạn. Trái nghĩa là \"inconvenient\".",
     "Online banking is ___ because you can pay bills without leaving home.",
     "Làm việc mà không cần ra khỏi nhà → thuận tiện — \"convenient\". \"Spacious\" nói về độ rộng, không hợp ngữ cảnh.",
     []),
    ("purchase", "/ˈpɜːtʃəs/", "VERB", "mua (trang trọng)", "C", "DAILY_LIFE",
     ["You can purchase tickets online.", "We purchased a new fridge last week."],
     "You can ___ tickets at the front desk or online.",
     "\"Purchase\" = buy, nhưng trang trọng hơn — rất hay gặp trong thông báo và bài thi TOEIC.",
     "Customers who ___ two items will receive a third one for free.",
     "Mua hai món được tặng món thứ ba → \"purchase\" (hoặc \"buy\"). \"Subscribe\" là đăng ký dùng định kỳ, không phải mua từng món.",
     ["buy"]),
    ("bill", "/bɪl/", "NOUN", "hoá đơn (cần thanh toán)", "D", "DAILY_LIFE",
     ["The electricity bill was high this month.", "Can we have the bill, please?"],
     "I have to pay the water ___ before Friday.",
     "\"Bill\" là hoá đơn ghi số tiền bạn cần trả: điện, nước, nhà hàng…",
     "The phone ___ is due on the 15th, so don't forget to pay it.",
     "Hoá đơn có hạn thanh toán ngày 15 — \"bill\". \"Receipt\" là giấy nhận sau khi đã trả xong.",
     []),
    ("appointment", "/əˈpɔɪntmənt/", "NOUN", "cuộc hẹn", "D", "DAILY_LIFE",
     ["I have a dentist appointment at 10.", "Please call to make an appointment."],
     "I made an ___ with the doctor for Tuesday morning.",
     "\"Make an appointment\" = đặt lịch hẹn, thường với bác sĩ, ngân hàng, cơ quan.",
     "Please arrive ten minutes early for your ___ with the bank manager.",
     "Cuộc gặp đã đặt giờ với giám đốc ngân hàng — \"appointment\". \"Schedule\" là cả lịch trình, không phải một cuộc hẹn.",
     []),
    ("subscribe", "/səbˈskraɪb/", "VERB", "đăng ký (dùng dịch vụ định kỳ)", "C", "DAILY_LIFE",
     ["I subscribe to a music streaming service.", "Subscribe to our newsletter for updates."],
     "I ___ to a magazine that arrives every month.",
     "\"Subscribe to\" = đăng ký nhận/đều đặn trả tiền cho một dịch vụ. Nhớ đi với giới từ \"to\".",
     "If you ___ to our newsletter, you will get a 10% discount code.",
     "Đăng ký nhận bản tin định kỳ — \"subscribe\". \"Purchase\" là mua một lần, không đi với \"to our newsletter\".",
     []),
]

assert len(WORDS) == 30, len(WORDS)

def q(s):
    return "'" + s.replace("'", "''") + "'"

def hint_of(word):
    return " ".join([word[0]] + ["_"] * (len(word) - 2) + [word[-1]]) if len(word) > 2 else word

def main(out):
    w = out.write
    w("-- ===== Seed: từ vựng House Level 1 (sinh bởi database/seed/housing_level1.py) =====\n")
    meanings = [x[3] for x in WORDS]
    for i, x in enumerate(WORDS, start=1):
        word, ipa, wtype, meaning, rank, theme, ex = x[:7]
        w("INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES "
          f"({i}, {q(word)}, {q(meaning)}, {q(wtype)}, {q(ipa)}, {q(json.dumps(ex, ensure_ascii=False))}::jsonb, NULL, "
          f"(SELECT id FROM themes WHERE code = {q(theme)}), 1, {q(rank)});\n")
    w("SELECT setval(pg_get_serial_sequence('vocabularies', 'id'), (SELECT MAX(id) FROM vocabularies));\n\n")

    w("-- ===== Câu hỏi: 3 câu mỗi từ (tier 1 trắc nghiệm, tier 2 điền có gợi ý, tier 3 điền theo ngữ cảnh) =====\n")
    qid = 0
    for i, x in enumerate(WORDS, start=1):
        word, ipa, wtype, meaning, rank, theme, ex, s2, tip2, s3, exp3, extra = x
        # tier 1: 3 phương án nhiễu lấy nghĩa của các từ kế cạnh (cố định để seed ổn định)
        distract = [meanings[(i - 1 + k) % 30] for k in (3, 11, 19)]
        opts = [meaning] + distract
        rot = i % 4  # xoay vị trí đáp án đúng
        opts = opts[-rot:] + opts[:-rot] if rot else opts
        exp1 = f"\"{word}\" {ipa} nghĩa là {meaning}. Ví dụ: {ex[0]}"
        for tier, qtype, skill, text, answer, accepted, expl, meta in (
            (1, "MULT_CHOICE", "READING", f"What does \"{word}\" mean?", meaning, [], exp1, {"options": opts}),
            (2, "FILL_BLANK", "WRITING", f"Điền từ còn thiếu (gợi ý: {meaning})", word, extra, tip2,
             {"sentence": s2, "hint": hint_of(word)}),
            (3, "FILL_BLANK", "WRITING", "Điền một từ phù hợp vào chỗ trống", word, extra, exp3, {"sentence": s3}),
        ):
            qid += 1
            w("INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES "
              f"({qid}, 'VOCABULARY', '{skill}', '{qtype}', {tier}, {q(text)}, {q(answer)}, "
              f"{q(json.dumps(accepted, ensure_ascii=False))}::jsonb, {q(expl)}, NULL, {q(json.dumps(meta, ensure_ascii=False))}::jsonb);\n")
            w(f"INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES ({qid}, {i}, 'TARGET');\n")
    w("SELECT setval(pg_get_serial_sequence('questions', 'id'), (SELECT MAX(id) FROM questions));\n\n")

    w("-- ===== Bài thi Housing Lv2 (VS4 mới chấm; ở đây chỉ để gói đủ phạm vi DoD): 10 câu tier 3 =====\n")
    w("INSERT INTO exams (code, building_id, target_level, reward_blueprint_id, question_count) VALUES "
      "('EXAM_HOUSING_LV2', (SELECT id FROM buildings WHERE code = 'HOUSING'), 2, "
      "(SELECT id FROM blueprints WHERE code = 'BLUEPRINT_HOUSING_LV2'), 10);\n")
    w("INSERT INTO exam_requirements (exam_id, required_card_count, required_knowledge, required_blueprint_shards) VALUES "
      "((SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2'), 30, 200, 0);\n")
    for i in range(1, 31, 3):
        w("INSERT INTO exam_questions (exam_id, question_id) VALUES "
          f"((SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2'), {i * 3});\n")

if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main(sys.stdout)
