-- Kho thẻ · cột user_vocab_progress.last_correct_at; cột collocations/explanation/icon_key
-- của vocabularies và nội dung của chúng cho 30 từ HOUSING:1.
-- FILE SINH TỰ ĐỘNG bởi database/seed/v008.py — sửa ở đó rồi chạy lại, đừng sửa tay.
-- Chạy:  psql -U postgres -d linguacity_db -v ON_ERROR_STOP=1 -f database/migration/V008__kho_the.sql

BEGIN;

-- ===== Cột mới =====
ALTER TABLE user_vocab_progress ADD COLUMN last_correct_at TIMESTAMP NULL;
ALTER TABLE vocabularies
    ADD COLUMN collocations JSONB NULL,
    ADD COLUMN explanation TEXT NULL,
    ADD COLUMN icon_key VARCHAR(40) NULL;

-- ===== Nội dung HOUSING:1: cụm từ, giải thích, icon =====
UPDATE vocabularies SET collocations = '["pay the rent", "monthly rent", "rent is due"]'::jsonb, explanation = 'Khoản tiền bạn trả đều đặn mỗi tháng để được ở nhà.', icon_key = 'coin' WHERE id = 1 AND word = 'rent';
UPDATE vocabularies SET collocations = '["call the landlord", "a friendly landlord", "an absent landlord"]'::jsonb, explanation = 'Người sở hữu căn nhà và cho bạn thuê lại.', icon_key = 'key' WHERE id = 2 AND word = 'landlord';
UPDATE vocabularies SET collocations = '["a new tenant", "a long-term tenant", "tenants and landlords"]'::jsonb, explanation = 'Người trả tiền để ở nhà của người khác.', icon_key = 'person' WHERE id = 3 AND word = 'tenant';
UPDATE vocabularies SET collocations = '["sign a lease", "a one-year lease", "renew the lease"]'::jsonb, explanation = 'Tờ hợp đồng ghi rõ bạn được thuê nhà trong bao lâu.', icon_key = 'document' WHERE id = 4 AND word = 'lease';
UPDATE vocabularies SET collocations = '["pay a deposit", "security deposit", "get the deposit back"]'::jsonb, explanation = 'Khoản tiền cọc trả một lần, thường được hoàn lại khi bạn trả nhà.', icon_key = 'wallet' WHERE id = 5 AND word = 'deposit';
UPDATE vocabularies SET collocations = '["pay the utilities", "utilities are included"]'::jsonb, explanation = 'Các dịch vụ như điện, nước, ga mà nhà nào cũng cần.', icon_key = 'bolt' WHERE id = 6 AND word = 'utilities';
UPDATE vocabularies SET collocations = '["a piece of furniture", "buy new furniture", "move the furniture"]'::jsonb, explanation = 'Những món đồ lớn trong nhà như bàn, ghế, giường, tủ.', icon_key = 'sofa' WHERE id = 7 AND word = 'furniture';
UPDATE vocabularies SET collocations = '["a kitchen appliance", "household appliances", "turn off the appliance"]'::jsonb, explanation = 'Máy móc dùng trong nhà như tủ lạnh, máy giặt, lò vi sóng.', icon_key = 'appliance' WHERE id = 8 AND word = 'appliance';
UPDATE vocabularies SET collocations = '["next-door neighbor", "a friendly neighbor", "meet the neighbors"]'::jsonb, explanation = 'Người sống ngay cạnh nhà bạn.', icon_key = 'people' WHERE id = 9 AND word = 'neighbor';
UPDATE vocabularies SET collocations = '["rent an apartment", "a two-bedroom apartment", "apartment building"]'::jsonb, explanation = 'Một căn nhà nằm trong một tòa nhà có nhiều căn khác.', icon_key = 'home' WHERE id = 10 AND word = 'apartment';
UPDATE vocabularies SET collocations = '["repair the roof", "in need of repair", "repair shop"]'::jsonb, explanation = 'Sửa lại thứ đang bị hỏng để dùng được như cũ.', icon_key = 'tools' WHERE id = 11 AND word = 'repair';
UPDATE vocabularies SET collocations = '["renovate the kitchen", "renovate an old house", "newly renovated"]'::jsonb, explanation = 'Làm mới và nâng cấp một căn nhà cũ.', icon_key = 'tools' WHERE id = 12 AND word = 'renovate';
UPDATE vocabularies SET collocations = '["a spacious room", "spacious and bright", "a spacious apartment"]'::jsonb, explanation = 'Rộng rãi, đứng trong đó thấy thoáng chứ không chật.', icon_key = 'ruler' WHERE id = 13 AND word = 'spacious';
UPDATE vocabularies SET collocations = '["regular maintenance", "maintenance fee", "building maintenance"]'::jsonb, explanation = 'Việc chăm sóc, kiểm tra thường xuyên để mọi thứ không bị hỏng.', icon_key = 'tools' WHERE id = 14 AND word = 'maintenance';
UPDATE vocabularies SET collocations = '["relocate to another city", "relocate the office", "plan to relocate"]'::jsonb, explanation = 'Chuyển đến sống hoặc làm việc ở một nơi khác.', icon_key = 'box' WHERE id = 15 AND word = 'relocate';
UPDATE vocabularies SET collocations = '["buy groceries", "a bag of groceries", "grocery shopping"]'::jsonb, explanation = 'Thực phẩm và đồ dùng hằng ngày bạn mua ở siêu thị.', icon_key = 'cart' WHERE id = 16 AND word = 'groceries';
UPDATE vocabularies SET collocations = '["do the laundry", "a load of laundry", "fold the laundry"]'::jsonb, explanation = 'Quần áo cần giặt, hoặc việc giặt quần áo.', icon_key = 'basket' WHERE id = 17 AND word = 'laundry';
UPDATE vocabularies SET collocations = '["a long commute", "commute to work", "daily commute"]'::jsonb, explanation = 'Việc đi lại đều đặn giữa nhà và nơi làm việc hoặc học.', icon_key = 'bus' WHERE id = 18 AND word = 'commute';
UPDATE vocabularies SET collocations = '["a busy schedule", "on schedule", "make a schedule"]'::jsonb, explanation = 'Bảng ghi giờ giấc cho những việc bạn sẽ làm.', icon_key = 'calendar' WHERE id = 19 AND word = 'schedule';
UPDATE vocabularies SET collocations = '["run an errand", "run errands", "a quick errand"]'::jsonb, explanation = 'Việc vặt phải ra ngoài làm, như gửi thư hay mua đồ.', icon_key = 'checklist' WHERE id = 20 AND word = 'errand';
UPDATE vocabularies SET collocations = '["follow a recipe", "a recipe for soup", "family recipe"]'::jsonb, explanation = 'Cách nấu một món ăn, gồm nguyên liệu và các bước làm.', icon_key = 'document' WHERE id = 21 AND word = 'recipe';
UPDATE vocabularies SET collocations = '["keep the receipt", "ask for a receipt", "a receipt for the purchase"]'::jsonb, explanation = 'Tờ giấy chứng minh bạn đã trả tiền cho món hàng.', icon_key = 'receipt' WHERE id = 22 AND word = 'receipt';
UPDATE vocabularies SET collocations = '["a tight budget", "stay within budget", "monthly budget"]'::jsonb, explanation = 'Số tiền bạn dự tính sẽ chi trong một khoảng thời gian.', icon_key = 'wallet' WHERE id = 23 AND word = 'budget';
UPDATE vocabularies SET collocations = '["do the chores", "household chores", "a daily chore"]'::jsonb, explanation = 'Việc nhà lặt vặt như rửa chén, quét nhà, đổ rác.', icon_key = 'broom' WHERE id = 24 AND word = 'chore';
UPDATE vocabularies SET collocations = '["a daily routine", "morning routine", "follow a routine"]'::jsonb, explanation = 'Những việc bạn làm đều đặn theo cùng một thứ tự mỗi ngày.', icon_key = 'clock' WHERE id = 25 AND word = 'routine';
UPDATE vocabularies SET collocations = '["a convenient location", "convenient for me", "at a convenient time"]'::jsonb, explanation = 'Tiện lợi, làm cho mọi việc dễ dàng và đỡ mất công.', icon_key = 'star' WHERE id = 26 AND word = 'convenient';
UPDATE vocabularies SET collocations = '["make a purchase", "proof of purchase", "purchase a ticket"]'::jsonb, explanation = 'Việc mua một món đồ, hoặc chính món đồ bạn đã mua.', icon_key = 'bag' WHERE id = 27 AND word = 'purchase';
UPDATE vocabularies SET collocations = '["pay the bill", "electricity bill", "split the bill"]'::jsonb, explanation = 'Tờ giấy ghi số tiền bạn phải trả cho dịch vụ hoặc bữa ăn.', icon_key = 'bill' WHERE id = 28 AND word = 'bill';
UPDATE vocabularies SET collocations = '["make an appointment", "dentist appointment", "cancel an appointment"]'::jsonb, explanation = 'Cuộc hẹn gặp ai đó vào một giờ đã định trước.', icon_key = 'calendar' WHERE id = 29 AND word = 'appointment';
UPDATE vocabularies SET collocations = '["subscribe to a channel", "subscribe to the newsletter", "subscribe online"]'::jsonb, explanation = 'Đăng ký để nhận dịch vụ hoặc nội dung đều đặn.', icon_key = 'bell' WHERE id = 30 AND word = 'subscribe';

-- ===== Tăng version gói đổi nội dung (ADR-012) =====
UPDATE content_packs SET version = version + 1, updated_at = now() WHERE code = 'HOUSING:1';

COMMIT;
