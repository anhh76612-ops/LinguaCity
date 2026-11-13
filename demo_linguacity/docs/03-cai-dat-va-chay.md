# 03. Cài đặt và chạy

## Mở bản đã build

- Mở [bản đồ thị trấn](../index.html) bằng Chrome hoặc Edge có WebGL. Chọn **Chỉ xem địa hình** để mở [địa hình riêng](../preview/terrain.html). Trang địa hình có liên kết tới [địa hình gốc ở bước 1](../preview/terrain.html?dia-hinh=1).
- Mở [bản tham chiếu công trình](../preview/index.html) để xem hai cảnh và 16 mẫu trước đây.
- Mở [demo sắp xếp nhà](../arrange.html) để thử xây, xoay, dời nhà và vào nhà.

Có thể mở trực tiếp các file HTML từ thư mục dự án. Các bundle, font và ảnh đều được tải từ các file đi kèm.

## Cài dependency và build lại

Chạy trong PowerShell từ thư mục gốc LinguaCity. Máy kiểm tra dùng Node.js 24.16.0. Dependency của hai bản nằm trong `city-web`.

```powershell
npm.cmd --prefix .\city-web ci
node .\demo_linguacity\preview\build.cjs
node .\demo_linguacity\build.cjs
node --test .\demo_linguacity\preview\roads.test.cjs
```

- Chạy lệnh thứ hai sau khi sửa mã nguồn trong `preview/` hoặc các mô hình mà bản xem trước import. Lệnh tạo lại cả `terrain.bundle.js` và `preview.bundle.js`.
- Chạy lệnh thứ ba để tạo `index.bundle.js` cho bản đồ thị trấn và `world.bundle.js` cho demo sắp xếp nhà. Khi sửa địa hình hoặc mô hình dùng chung, chạy cả hai lệnh build.
- Sau khi chỉnh HTML hoặc CSS, tải lại trang để xem thay đổi.

Nếu trình duyệt báo lỗi WebGL, thử mở trong Chrome hoặc Edge và kiểm tra khả năng tăng tốc đồ họa của trình duyệt. Nếu bản xem trước vẫn hiển thị bản cũ sau khi sửa mô hình, kiểm tra bạn đã build lại đúng bundle và tải lại đúng trang.
