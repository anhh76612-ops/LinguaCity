# LinguaCity · Demo bản đồ

Mở [index.html](index.html) bằng Chrome hoặc Edge có WebGL để xem thị trấn và thử công cụ đường. [index.js](index.js) ghép địa hình, đường và công trình thành bản đồ chính.

[Chỉ xem địa hình của thị trấn](preview/terrain.html) · [Địa hình gốc](preview/terrain.html?dia-hinh=1) · [Quy hoạch cũ](preview/terrain.html?quy-hoach=1) · [Mẫu công trình](preview/index.html) · [Hướng dẫn cài đặt và chạy](docs/03-cai-dat-va-chay.md)

[Cách thử vẽ đường, bắc cầu và san nền](docs/06-ve-duong-cau-va-san-nen.md)

## Demo sắp xếp nhà

Mở [arrange.html](arrange.html) để tiếp tục thử xây, xoay, đặt và đi vào nhà trên bản nền phẳng.

- Bấm **Xây nhà Lv1** để hoàn thành bước đầu của thị trưởng. Trong chế độ **Chọn**, bấm vào đất để thị trưởng đi tới đó hoặc bấm nhà để hiện tên và thử hiệu ứng nhấn.
- Sau khi chọn nhà, bấm **Vào nhà** để thị trưởng đi đến cửa, mở cửa và chuyển cảnh. Bấm vào sàn để đi trong phòng. Bấm **Ra ngoài** để trở lại thị trấn.
- **Lv1 / Lv3** đổi mẫu. **Xoay 90°** đổi mặt nhà. Trong **Sắp xếp**, bấm vào một ô để ghim bản xem trước, rồi chọn **Đặt** hoặc **Hủy**.
- **Vẽ đường** cho phép kéo để đặt đất, đá lát hoặc nhựa. Chọn **Xóa** để xóa đoạn đường. Ô nước, ô ngoài vùng xây dựng và lô công trình chặn nét vẽ. Xe tính lại tuyến khi mạng đường thay đổi.

Bố cục của bản thử lưu trong phiên hiện tại. Tải lại trang để trở về vị trí ban đầu.

Chạy `node build.cjs` trong thư mục demo để đóng gói lại bản đồ chính và demo sắp xếp nhà. Lệnh dùng các dependency đã cài trong `city-web/node_modules`.
