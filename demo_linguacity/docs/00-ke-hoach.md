# Kế hoạch nâng cấp đô thị và tương tác công trình LinguaCity

**Trạng thái** — Đã chốt địa hình demo ở bước 1. Bản quy hoạch bước 2 đang chờ duyệt các lô, đường xe lên đồi và cầu ven suối.

**Mục tiêu** — Tạo một đô thị isometric 3D low-poly liền mạch, nơi có thể quan sát cư dân sinh hoạt ngoài trời, công trình phát triển qua các cấp và cảnh quan thay đổi giữa ngày và đêm.

**Thứ tự đã chốt** — Bước 1 dựng bản đồ tự nhiên. Bước 2 quy hoạch khu xây dựng và đường. Chủ dự án duyệt báo cáo ở cuối mỗi bước trước khi bắt đầu bước tiếp theo. Mô hình công trình sẽ do chủ dự án thiết kế lại. Các yêu cầu về công trình, sinh hoạt, ngày đêm và nội thất ở dưới là tham chiếu cho những giai đoạn tiếp theo.

## 1. Tóm tắt yêu cầu

1. Quan sát sinh hoạt ở bên ngoài công trình. Một số cư dân đi dọc đường, ngồi ghế công viên, chuyền bóng trên sân hoặc chờ xe ở bến ngay cả khi người chơi đứng yên. Khi bấm công trình trên bản đồ, hiện tên của công trình.
2. Dùng camera trực giao nhìn xiên từ trên cao, thấy mái và hai mặt đứng. Thành phố, đất và cảnh quan phủ kín khung hình. Đường và cảnh quan tiếp tục ra ngoài bốn cạnh, với cảm giác đang nhìn một phần của đô thị lớn hơn.
3. Mỗi nhóm công trình có dáng nhà, mái, mặt tiền, lối vào và không gian phục vụ riêng. Người chơi nhận ra công năng từ xa kể cả khi biển tên bị ẩn. Địa hình và mô hình có lớp lồi lõm rõ ở nơi cần tạo chiều sâu, như bờ suối, hàng ngói, hốc cửa sổ, ban công và tán cây.
4. Phân cấp chi tiết theo zoom. Xa thấy đường bao và mảng màu lớn. Vừa thấy các lớp hình khối, cổng, sân, mái hiên và bậc thềm. Gần thấy mạch ngói, độ chuyển vật liệu và vật dụng nhỏ đúng công năng quanh các miniđiểm có hoạt động.
5. Tạo biến thể cùng loại bằng chiều cao, độ dốc mái, nhịp cửa sổ, màu tường, mái hiên và khoảng sân. Giữ dấu hiệu nhận diện chính của từng nhóm.
6. Ban ngày dùng nắng ấm chiếu xiên, có thể chỉnh hướng nắng. Mặt khuất mát hơn và bóng đổ đổi theo hướng sáng. Ban đêm, đèn ở nhà ở, công trình và dọc đường bật lên. Giữ tường kem, đường xám ấm, thảm cỏ ô liu đến xanh vàng, mái cam đất xen mái nâu và xanh xám. Dùng vật liệu lì và tương phản tập trung ở đặc điểm cần đọc từ xa.
7. Vẽ đường rộng từ 1 đến tối đa 4 ô bằng cách ghép các dải song song. Đường 1× dành riêng cho người đi bộ và có hai luồng ngược chiều. Xe chỉ đi trên mạng từ 2× trở lên. Bến xe Lv1–Lv3 mở khóa vật liệu và trang bị theo cấp để người chơi nâng từng tuyến. Các đoạn khác vật liệu hoặc bề rộng vẫn nối liền tại đầu nối, góc cua và giao lộ.
8. Giữ vị trí thị trưởng dễ theo dõi khi công trình chắn tầm nhìn. Ở zoom xa, hiện avatar và mũi tên chỉ vào vị trí nhân vật. Ở zoom gần, làm mờ công trình đang che để nhìn thấy nhân vật trên đường.
9. Tách nhà thị trưởng và nhà dân. Bấm nhà dân hiện **Nhà dân**. Lô thị trưởng hiện **House Lv0 (chưa xây)** hoặc **House Lv1** sau khi xây. Bản thiết kế sau dành quyền vào và chỉnh nhà riêng cho thị trưởng.
10. Tạo đủ **House, School, Park và Bus Station** từ Lv0 đến Lv3. Có hai cảnh xem thử. **Thị trấn nghèo** có ba nhà dân đơn sơ, năm cư dân, trường học xập xệ và lô nhà thị trưởng Lv0 có thể chuyển sang xem Lv1. **Đô thị phát triển** dùng mẫu Lv3 và có thêm bệnh viện, chợ, dãy cửa hàng, sân thể thao.

## 2. Hiện trạng và hướng kỹ thuật

- [world.js](../world.js) đã có camera trực giao, chuyển cảnh ở nhà, hoạt ảnh cửa, cư dân đi lại và xe chạy theo mạng đường demo.
- [app.js](../app.js) điều phối Chọn, Sắp xếp và Vẽ đường. Bản demo hiện cho chọn lô nhà thị trưởng và bấm đất để di chuyển.
- [model.js](../model.js) tìm đường theo ô và quản lý kiểm tra vùng chiếm chỗ. [road.ts](../../city-web/src/world/buildings/road.ts) của bản chính có mẫu xe, vạch qua đường và chu kỳ tín hiệu cho bố cục cố định.
- [Bản đồ thị trấn](../index.html) đặt công trình mẫu và đường đất lên [địa hình của thị trấn](../preview/terrain.html). [Địa hình bước 1](../preview/terrain.html?dia-hinh=1), [bản quy hoạch cũ](../preview/terrain.html?quy-hoach=1) và [bản xem trước công trình](../preview/index.html) vẫn mở được để đối chiếu.

### Đề xuất tổ chức dữ liệu

Mỗi địa điểm có ID, loại, vùng chiếm chỗ, vùng chọn và danh sách hành động. Nhà riêng có thêm ID chủ nhà. Mỗi hành động khai báo ai được dùng, điểm tiếp cận ngoài phố, điểm ngưỡng cửa hoặc cổng, các mốc trong lô, hướng đứng và hoạt ảnh tại chỗ. Cửa là một phần riêng của mô hình để xoay hoặc trượt. Tọa độ mốc thuộc hệ tọa độ cục bộ của công trình, được đổi sang tọa độ bản đồ sau khi đặt hoặc xoay.

Dùng luồng **chọn công trình → hiện tên** cho thao tác của người xem. Cư dân đi tới các mốc hoạt động ngoài trời như ghế, sân thể thao và điểm chờ. Khi tích hợp vào demo, mô hình, đường đi và trạng thái hoạt động dùng chung ID địa điểm để cập nhật cùng nhau khi bản đồ thay đổi.

## 3. Thiết kế theo loại công trình

| Loại | Dấu hiệu nhận diện khi nhìn xa | Chi tiết tại lối vào khi nhìn gần | Tương tác đề xuất |
| --- | --- | --- | --- |
| **Trường học** | Lv0 có mái cũ khuyết ngói. Các cấp sửa chữa giữ khối nhà dài, cổng và sân | Bậc thềm, giá xe đạp có xe, dải lát từ cổng tới cửa | Quan sát người đi qua sân và bấm xem tên |
| **Bệnh viện** | Sảnh lớn, mái che đón trả khách, dấu thập nổi rõ | Lối xe tấp vào, lối đi bộ, ghế chờ dưới mái che | Quan sát khu đón khách và bấm xem tên |
| **Chợ** | Mái nhịp rộng, nhiều quầy mở, mảng mái bạt | Sọt hàng, lối giữa các quầy, mép đường giao hàng | Đi vào khu chợ và dừng xem một quầy |
| **Dãy cửa hàng** | Các mặt tiền hẹp lặp theo nhịp, cửa kính và mái hiên hướng phố | Bậc cửa, quầy trước, cửa giao hàng bên hông hoặc phía sau | Quan sát mặt phố và bấm xem tên |
| **Nhà thị trưởng** | Lô trống Lv0, nhà một tầng Lv1, gian phụ Lv2, hai tầng và ban công Lv3 | Lối vào riêng, bậc cửa, đèn hiên và chi tiết ngoại thất | Bấm xem tên. Thị trấn nghèo cho thử xây House Lv1 |
| **Nhà dân** | Cụm nhà nhỏ với mái, màu tường và khoảng sân khác nhau | Bậc cửa, lối qua vườn hoặc hàng rào, cửa sổ có đèn | Bấm hiện **Nhà dân**. Cư dân đi lại quanh khu ở |
| **Công trình thể thao** | Sân lớn, mảng màu và vạch sân rõ, khán đài thấy từ xa | Cổng, hàng rào, ghế chờ và hai rổ | Quan sát cư dân chuyền bóng trên sân và bấm xem tên |
| **Công viên** | Không gian xanh mở, đường dạo, cụm cây và ghế | Lối qua cổng hoặc dải cỏ, ghế hướng về đường dạo | Đi tới ghế, ngồi, đứng dậy và tiếp tục di chuyển |
| **Bến xe** | Biển nhận diện xe buýt, khu chờ cạnh đường và vị trí xe đón khách | Lv1 có biển và ghế. Lv2 có mái che và sàn chờ. Lv3 có mái lớn, vịnh đón trả và lối nối sang vỉa | Thị trưởng hoặc cư dân đi tới khu chờ, đứng hoặc ngồi. Xe đến đón khi tuyến đủ rộng và có lối vào, ra phù hợp |

Đề xuất tạo hai biến thể cho mỗi nhóm kiến trúc ở bản duyệt cuối. Dùng chung mô-đun cửa, bậc, cửa sổ và mái hiên khi phù hợp. Ví dụ, trường có thể đổi từ khối một tầng dài sang khối hai tầng có cánh phụ, nhưng cả hai vẫn có cổng rộng, sân và khu xe đạp. Các mẫu vẫn theo cùng quy ước về đoạn chuyển từ cửa ra bậc, sân hoặc lối đi rồi tới vỉa hè, hàng rào hay dải cỏ.

### Chiều sâu và điểm nhấn của mô hình

| Khu vực | Hình khối nhìn thấy ở tầm vừa | Chi tiết thêm ở tầm gần |
| --- | --- | --- |
| **Địa hình** | Gò thấp, bờ suối có đoạn dốc và đoạn thoải, sân cao hơn mặt đường, bậc hoặc dốc nối từ vỉa vào cổng | Mép đất lở nhẹ ven nước, đá chìm một phần, cụm cỏ và ranh giới giữa đất, đá, cỏ |
| **Mái** | Mái đua có độ dày, hàng ngói chồng nhẹ, sống mái và ống khói. Mái bằng có viền chắn mái | Gờ ngói, mạch nối so le, vài viên lệch nhẹ, máng xối hoặc ống thoát nước tùy loại mái |
| **Mặt tiền** | Hốc cửa sổ lõm có thành bên và bậu nhô. Ban công đua ra có bóng dưới sàn, còn ban công âm nằm lùi vào khối nhà | Chớp cửa, lan can, tay nắm, đèn hiên, chậu cây hoặc vài viên gạch lộ ở chân tường |
| **Tán cây và bụi** | Tán phân tầng theo dáng từng loại, cành có thể thấy ở cây tán thoáng, cây bụi có nhiều chiều cao | Cụm lá nhỏ tập trung ở rìa tán và đầu cành, sắc lá thay đổi nhẹ. Tán cam giữ khối liền và có gợn mềm |
| **Vùng quanh công trình** | Bậc, sân, viền cỏ, rãnh thoát nước hoặc hàng rào tạo lớp chuyển từ tòa nhà ra phố | Đồ đúng công năng như giá xe đạp cạnh cổng trường, sọt hàng dưới mái chợ, cột đỡ và ghế chờ ở bệnh viện hoặc bến xe |

- **Mỗi công trình có một điểm nhấn chính.** Nhà dân Lv1 có mái ngói và bậc cửa rõ. Nhà thị trưởng Lv3 có thể có hiên sâu và ban công. Trường nhấn cổng và nhịp cửa sổ lõm. Bệnh viện nhấn mái che và khoảng lùi đón khách. Chợ nhấn nhiều lớp mái bạt và quầy mở. Đặt đồ trang trí gần các điểm sinh hoạt, chừa các mảng mái, tường và sân đủ thoáng.
- **Dùng hình khối thật cho chi tiết đổi dáng hoặc tạo bóng rõ.** Bờ dốc, bậc, hốc cửa, sàn ban công và gờ mái cần có chiều sâu trong mô hình. Mạch ngói, vết đổi màu và hạt vật liệu có thể dùng lớp màu nhẹ ở tầm gần. So cùng một mặt tiền khi đổi hướng nắng để thấy bóng dưới phần nhô và trong phần lõm.
- **Tạo khác biệt có chủ đích giữa các mẫu cùng loại.** Đổi nhịp cửa, độ sâu hiên, vị trí ban công, cụm ngói hoặc cách bố trí chậu cây. Giữ biến thể ổn định theo ID lô để chi tiết xuất hiện lại đúng chỗ khi tải lại hoặc chuyển zoom. Dùng chung các chi tiết lặp lại phù hợp với loại công trình và cấp phát triển của khu.
- **Cho địa hình và lối đi khớp nhau.** Tạo lồi lõm rõ nhất ở bờ suối, rìa đất và khoảng xanh. Dành nền tương đối phẳng dưới công trình và tuyến xe. Ở chỗ nhân vật đi qua dốc hoặc bậc, mặt đường, chân nhân vật và mốc cửa dùng cùng cao độ. Đá, cỏ và chậu cây trang trí nằm ngoài bề rộng lối đi hữu dụng.

### Duyệt từng mô hình trước khi ghép vào demo

1. Dựng và chạy thử từng công trình mới hoặc bản sửa của công trình hiện có trong cảnh xem trước riêng. Dùng chính mô hình 3D dự kiến đưa vào demo, với một nhân vật và mẫu đường hoặc sân bên cạnh để đối chiếu tỷ lệ và lối tiếp cận.
2. Gửi bản xem trước của **từng công trình**. Có góc isometric đúng tỷ lệ bản đồ để xem dáng, kèm góc gần để thấy mặt tiền, cửa, mái và khoảng sân. Nếu sửa công trình cũ, so trước và sau ở cùng góc và ánh sáng. Hiện các cấp hoặc biến thể được tạo hay chỉnh sửa. Với mô hình có cửa động, đèn hoặc chỗ ngồi, cho xem trạng thái tương ứng.
3. Chờ chủ dự án duyệt mẫu cụ thể. Nếu có yêu cầu chỉnh, cập nhật rồi gửi lại bản xem trước. Mẫu đã duyệt mới được đặt hoặc thay thế trên bản đồ demo.
4. Sau khi ghép, kiểm tra lại tỷ lệ với công trình lân cận, lối từ vỉa đến cửa và khoảng trống cho nhân vật. Nếu cần sửa hình dáng, lối vào hoặc chi tiết mô hình đã duyệt, gửi lại bản xem trước của công trình đó.

### Thiết kế và cách vẽ đường

**Ký hiệu** — 1× đến 4× là bề rộng tính theo ô. `4×1` là đoạn dài bốn ô, rộng một ô. Hai dải `4×1` sát nhau và song song ghép thành `4×2`. Có thể tiếp tục tới `4×3` và `4×4`. Chỉ phần trùng chiều dài được mở rộng. Khi một đầu dừng sớm hơn, sinh đoạn thu hẹp. Bản xem trước báo phần sẽ ghép và chỗ bị chặn nếu vượt 4 ô, gặp nước hoặc lô đã xây.

| Bề rộng | Công năng và luồng đi | Dấu hiệu nhận diện và trang trí |
| --- | --- | --- |
| **1× · Lối đi bộ** | Hai luồng đi bộ ngược chiều cùng trên mặt lối. Nối nhà ở, công viên và lối tắt. Xe không vào được. | Mép cỏ hoặc viền đá thấp, mặt lối thoáng. Dùng đèn thấp, bảng gỗ hoặc bụi nhỏ ở mép ngoài khi có chỗ. Hai luồng được dẫn bằng vị trí di chuyển, mặt lối có thể để liền hoặc phân nhẹ bằng hoa văn vật liệu. |
| **2× · Đường khu ở** | Một làn xe mỗi chiều, một lối đi bộ ở mỗi bên. Xe chỉ rẽ vào các nhánh đủ bề rộng. | Mép đường rõ hơn lối 1×. Bậc lề thấp hoặc dải cỏ hẹp, bảng tên đường và vài cột đèn ở vị trí đủ thoáng. Đoạn nhựa có thể có vạch giữa. |
| **3× · Đường gom** | Giữ một làn xe mỗi chiều. Phần rộng thêm dành cho vỉa hè, chỗ chờ và khoảng đón trả khách ở những đoạn đủ diện tích. | Vỉa rộng, cây trồng thưa theo nhịp, ghế chờ hoặc giá xe đạp gần trường. Có thể làm vịnh xe buýt ở gần bến khi đủ khoảng quay và lối đi bộ vẫn thông. |
| **4× · Trục chính** | Đề xuất đường đất và đá có một làn xe mỗi chiều và lề rộng. Đoạn nhựa đủ khoảng hở và có chỗ nhập làn dùng hai làn mỗi chiều. Đoạn ngắn giữ một làn mỗi chiều, phần dư làm lề rộng. | Khối đường rộng và liên tục, vỉa hai bên. Có thể thêm dải cây hoặc đảo chờ tại đoạn đủ chỗ, đèn ở giao lộ chính và vạch sang đường. Ưu tiên giữ thoáng mặt tiền công trình công cộng. |

#### Quy tắc di chuyển và xử lý xung đột

- **Hai người tránh nhau trên lối 1×.** Đặt hai tim đi bộ lệch hai phía, mỗi hướng giữ bên phải theo chiều đi. Mốc thử với ô rộng 1 đơn vị là mặt lối thông thoáng rộng 0,8 và tim hai luồng cách nhau 0,4. Đo bề ngang lớn nhất của nhân vật cả khi vung tay và mang phụ kiện. Nếu chật, thu mô hình ngoài phố tới bề ngang khoảng 0,25–0,28 đơn vị rồi kiểm tra lại tư thế ngồi, lối vào và chuyển cảnh. Giữ tỷ lệ nhân vật nhất quán khi chuyển tuyến.
- **Giữ khoảng cách và nhường ở chỗ nhập.** Trên 1×, người đi sau giảm tốc hoặc chờ sau người trước, không vượt. Ở góc khuất, cổng, đoạn nhập và điểm đổi bên, mỗi nhóm đường dẫn giao nhau chỉ cho một lượt đi qua khi vùng xung đột đang trống. Người chờ lâu hơn được ưu tiên. Người đứng chờ ngoài phần lối đang có người đi qua.
- **Tách mạng xe và mạng đi bộ.** Đường xe chỉ sinh trên các đoạn rộng 2× trở lên. Đo bề ngang xe và góc quay trước khi cho xe vào một loại tuyến. Nút 1× nối vào 2×–4× chỉ nối người đi bộ tới vỉa. Khi cần sang bên kia, dùng điểm qua đường của nút. Với đoạn 4× thu về 3× hay 2×, kết thúc làn ngoài trước nút và cho xe nhập vào làn tiếp tục khi có khoảng trống.
- **Nhận dạng giao lộ theo nhánh nối.** Tính loại nút từ hướng các dải đi vào. Cụm nhiều ô dùng chung một nút để tránh trùng biển và đèn. Khối `2×2` đi thẳng vẫn là đoạn đường. Khi có nút xe và điểm sang đường, xe dừng trước vạch hoặc chỗ nhường đã đặt. Người đi bộ chỉ qua khi đến pha cho phép hoặc xe đã nhường.
- **Sửa tuyến khi đang có người hoặc xe.** Tính lại đường đi trên mạng mới. Nếu xóa đường hoặc thu đoạn 2× thành 1× khi xe đang chiếm chỗ, báo đang chờ, chặn xe mới vào và áp dụng nét sửa sau khi vùng đó trống. Nếu chưa có đường thay thế cho người đi bộ, nhân vật chờ ở vị trí an toàn và vẫn nhận được lệnh mới.
- **Nối cửa và giữ lề thông thoáng.** Lối từ cửa, cổng, sân và điểm chờ xe buýt nối vào lề gần nhất có thể tiếp cận. Dời hay xoay công trình sẽ tính lại đoạn nối. Cây, ghế, cột và biển đặt ngoài bề rộng đi hữu dụng, ngoài góc cua, vùng chờ và lối mở cửa. Khu đón khách bệnh viện, lối giao hàng và vịnh xe buýt dùng khoảng sân riêng khi vỉa quá hẹp.

#### Nâng cấp từng tuyến theo cấp bến xe

| Cấp mở khóa và vật liệu | Lối đi bộ 1× | Đường xe 2×–4× | Ngã ba và ngã tư |
| --- | --- | --- | --- |
| **Lv1 · Đất** | Đất nén, rìa cỏ mềm và cọc gỗ nhỏ ở điểm nối | Đất nén rộng, vệt bánh xe, lề cỏ hoặc rãnh thoát nước nhỏ | Bảng gỗ, cọc dẫn hướng và khoảng đất nén đánh dấu chỗ qua. Giao thông dùng quy tắc nhường. |
| **Lv2 · Đá lát** | Viên đá nhỏ, viền thấp. Có thể đổi hướng lát ở lối rẽ. | Mảng lát lớn hơn, dải mép đá và vỉa tách rõ. Có chỗ chờ trên đường 3×–4×. | Dải đá khác màu chỉ điểm sang đường, biển nhường hoặc chỉ hướng. |
| **Lv3 · Nhựa** | Nhựa xám ấm, viền đá thấp và biển chỉ lối đi bộ | Mặt nhựa xám ấm, vạch phân làn, bó vỉa. Trục chính có thể thêm đảo chờ và vịnh xe buýt. | Vạch dừng và vạch sang đường ở nút cần thiết. Đèn ở ngã ba hoặc ngã tư chính có đường 3×–4×. Nút khu ở dùng biển nhường. |

**Quyết định đã chốt** — Nâng từng tuyến. Bến xe Lv1 cho dùng đất, Lv2 mở đá lát, Lv3 mở nhựa. Người chơi có thể chọn các vật liệu đã mở khóa khi vẽ. Khi nâng cấp, đề xuất chọn một đoạn giữa hai nút hoặc tới đầu cụt, xem trước phạm vi rồi áp dụng vật liệu đã mở khóa. Mỗi đoạn lưu vật liệu và bề rộng riêng. Màu mặt đường vẫn dùng chung bảng màu ấm của bản đồ.

#### Nối các đoạn khác vật liệu hoặc bề rộng

- **Đất ↔ đá, đất ↔ nhựa và đá ↔ nhựa.** Hai mặt đường gặp nhau tại cùng cao độ và dùng chung mép nối. Đất gặp đá có thể kết thúc bằng một hàng đá lề thấp. Đất gặp nhựa có thể dùng một dải sỏi nén mỏng. Đá gặp nhựa có thể dùng một đường viền hoặc mạch ngang gọn. Những chi tiết này nằm trong vùng nối, dùng để nhận ra ranh giới vật liệu khi nhìn gần. Mặt đi qua liền nhau và vạch sơn kết thúc trong phần nhựa.
- **2× ↔ 3× ↔ 4×.** Nối theo trục đường đã vẽ, vuốt lề dần về bề rộng mới. Nếu số làn giảm, kết thúc làn ngoài trước vùng thu hẹp và cho xe nhập làn khi có khoảng trống. Ở đầu nối quá ngắn, bố trí cùng số làn tại hai đầu và dùng phần rộng thêm làm lề hoặc vỉa.
- **1× ↔ 2×–4×.** Nối hai luồng của lối đi bộ vào vỉa qua mép hạ thấp. Nếu đích ở bên kia, dẫn người tới điểm sang đường. Đường dẫn xe dừng ở mạng từ 2× trở lên. Đồ trang trí nằm ngoài lối nối và vùng đứng chờ.
- **Ngã ba, ngã tư có nhiều loại mặt đường.** Dùng mặt của tuyến chính cho vùng giao nhau. Ưu tiên tuyến rộng hơn, sau đó đến trục đi thẳng nếu cùng bề rộng. Nếu vẫn ngang nhau, chọn theo quy tắc ổn định của nút để giao lộ giữ hình dáng khi tải lại. Mỗi nhánh nối tiếp vật liệu riêng tại mép nút. Vạch và đèn chỉ xuất hiện ở phần nhựa phù hợp. Nhánh đất hoặc đá dùng bảng chỉ đường, biển nhường và dấu sang đường theo vật liệu.
- **Giữ đường đi liên tục sau khi nâng cấp.** Nếu người chơi chỉ đổi mặt đường, dùng lại mốc nối xe và người đi bộ. Nếu thay bề rộng hoặc đổi cách nhập làn, tính lại đường dẫn ở các nút liền kề. Chỗ đổi vật liệu đơn thuần có thể điều chỉnh tốc độ xe phù hợp với mặt đường.

### Nguồn mô hình và mã tham khảo

- **Kenney City Kit (Roads)** có bộ mô hình đường phố, biển báo và đèn giao thông theo CC0. Phù hợp để thử hình học và phụ kiện ở Lv3. [Bộ asset chính thức](https://kenney.nl/assets/city-kit-roads)
- **Procedural City Generator** là dự án Three.js trên GitHub có ghép nút giao, vỉa hè và vạch đường. Có thể tham khảo cách tách mạng đường và phần hiển thị. [Kho mã nguồn](https://github.com/thepearson/procedural-city)
- **SlimCity** minh họa nhiều cấp đường, góc bo, vạch giao lộ và xe chạy theo làn. Dùng làm tham khảo thiết kế. [Kho mã nguồn](https://github.com/rbenzing/SlimCityGame)

**Phương án đề xuất** — Dựng mặt đường bằng Three.js từ lưới hiện tại, rồi thử riêng một vài mô hình biển và đèn nếu hợp tỷ lệ. Lưu hướng nét vẽ để biết khi nào hai dải cần ghép. Từ cùng dữ liệu đó, sinh mặt đường, đường dẫn xe và lối đi bộ. Cấp bến xe xác định vật liệu được chọn. Vật liệu thực tế của đoạn và các nhánh liền kề quyết định cách dựng đầu nối, đồ ven đường và giao lộ.

## 4. Các mốc triển khai và nghiệm thu

### Bước 1 — Bản đồ địa hình trống

**Tệp chính** — [terrain.html](../preview/terrain.html), [terrain-preview.js](../preview/terrain-preview.js) và [terrain.js](../preview/terrain.js).

- [x] Dựng một vùng địa hình liên tục gồm suối uốn qua thung lũng, đồi thấp, bờ đá, cụm cây, bụi, cỏ và trang trí tự nhiên. Giữ một dải đất thoải liền mạch ở một bên bờ để sau này đặt lõi thị trấn gọn quanh mạng đường.
- [x] Thêm ghềnh thấp, lòng suối rộng hơn dưới ghềnh, mỏm đá phân lớp, lau sậy và hoa dại ven bờ. Giữ khoảng đất thoải giữa thung lũng.
- [x] Dựng dãy núi sát rìa trái và kéo dài lên góc trên, hai thềm lệch cao độ ở cùng một bờ, thác đầu suối ở góc trên bên phải và cửa suối đổ ra vịnh ở mép dưới. Thêm góc xem thác, sườn núi và vịnh biển.
- [x] Dời các đỉnh núi xa hơn về rìa trái. Làm rõ thềm chân núi ở bờ đối diện vùng được đánh dấu trong ảnh tham chiếu.
- [x] Cho xem toàn cảnh, xem gần ven suối và ghềnh đá, kéo và thu phóng bằng camera trực giao. Bản địa hình chỉ gồm cảnh quan tự nhiên.
- [x] **Nghiệm thu bước 1** — Chủ dự án chốt địa hình này làm địa hình demo và cho chuyển sang bước 2.

### Bước 2 — Khu xây dựng và quy tắc vẽ đường

**Tệp chính** — [planning-preview.js](../preview/planning-preview.js), [planning-layout.js](../preview/planning-layout.js), [roads.js](../preview/roads.js) và [streets.js](../preview/streets.js). [hill-road.js](../preview/hill-road.js) và [west-bank.js](../preview/west-bank.js) khai báo các tuyến cong được đặt theo địa hình.

- [x] Dựng lớp vùng xây, khu mở rộng, vùng chuyển cao độ, vùng dốc lớn và vùng đệm. Đặt các đoạn hàng rào gỗ dùng chung mẫu ở mép vách đồi và lề đường trên dốc.
- [x] Đặt tuyến chính và các nhánh qua lõi thị trấn, với đường đất 1×–4× ở Lv1 và đường xe 2× tới thềm ven suối. Duyệt lô trống theo ranh giới, kích thước và lối vào. Chọn vị trí từng loại công trình ở bước đặt công trình.
- [x] Dựng lối 1× men thềm và cầu đi bộ qua suối. Đường xe 2× vòng chân vách rồi lên đỉnh đồi. Báo cao độ và độ dốc của các tuyến trong bản xem trước.
- [x] Ghi hướng dải vẽ, xem trước phần mở rộng và giới hạn 4 ô. Chặn ô nước, lô công trình và hành lang các tuyến cố định.
- [x] Chọn đoạn để nâng cấp riêng. Bến xe Lv1 mở đất, Lv2 mở đá và Lv3 mở nhựa.
- [ ] Sinh đoạn thẳng, đầu cụt, góc cua, chỗ thu hẹp, ngã ba và ngã tư. Dựng lề, mặt chuyển tiếp và đồ ven đường theo vật liệu và bề rộng thực tế của từng nhánh.
- [ ] Sinh hai luồng đi bộ trên 1× và mạng xe riêng trên 2×–4×. Kiểm tra khoảng hở nhân vật và xe. Áp dụng nhường lượt, nhập làn, dừng đèn, điểm sang đường và chờ vùng sửa trống.
- [ ] **Nghiệm thu hình học và trang trí** — Vẽ `2×1`, `3×1`, `4×1` rồi ghép tới 4×. Thử dải ngắn hơn ở cả hai trục, xóa một dải, từ chối dải thứ năm và ô chặn. Thử góc cua, ngã ba, ngã tư, đoạn thu hẹp và khối `2×2` đi thẳng. Kiểm tra cả bốn bề rộng và các bộ trang trí của đường đất, đá, nhựa. Kiểm tra cây, đèn, ghế và biển chừa đủ lối đi.
- [ ] **Nghiệm thu nâng cấp và đầu nối** — Mở khóa nhựa rồi chỉ nâng một đoạn giữa mạng đất và đá. Kiểm tra cả ba cặp vật liệu, đoạn 2× đất nối 4× nhựa và hẻm 1× nối vỉa đường 3×. So tuyến trước và sau để xác nhận phạm vi đã chọn đổi mặt, các đoạn lân cận giữ vật liệu riêng, mặt nối liền và xe qua được khi đủ bề rộng. Thử ngã ba có nhánh đất gặp trục nhựa và kiểm tra vạch dừng, đèn và điểm sang đường đặt đúng vùng.
- [ ] **Nghiệm thu di chuyển** — Hai người đi ngược chiều trên 1× qua được cả đoạn thẳng lẫn góc cua. Người đi sau chờ khi có người đứng trước. Thử xe tìm đích qua nhánh 1× để xác nhận xe chọn đường khác hoặc dừng tại tuyến hợp lệ. Thử nhập làn khi thu 4× xuống 2×, qua đường lúc có xe và thu 2× xuống 1× khi xe đang chạy. Kiểm tra nhân vật khớp với bậc nhà, ghế và lối vào sân.
- [ ] **Duyệt bước 2** — Gửi báo cáo kèm góc toàn cảnh khu xây dựng, ảnh lưới và một đoạn đường mẫu có chỗ chuyển bề rộng và vật liệu. Chờ chủ dự án xác nhận bố cục, vùng xây và quy tắc đường.

### Yêu cầu bản đồ và ánh sáng cho các bước tiếp theo

**Tệp chính** — `demo_linguacity/world.js`, `model.js`, `app.js`, `index.html`, `styles.css`.

- [ ] Mở rộng địa hình và mạng phố khỏi vùng khung hình, nối tiếp mặt đất, đường và cảnh quan qua các cạnh. Chừa vùng đệm có nội dung ngoài khung và giới hạn kéo theo vùng đã dựng. Mở rộng các mảng phố cùng lưới đường đi để khu có thể tiếp cận khớp với phần nhìn thấy.
- [ ] Dựng gò thấp, bờ suối và các lớp cao độ sân theo quy tắc địa hình ở mục 3. Kiểm tra nền dưới lô xây, dốc nối vỉa, mốc cửa và cao độ chân nhân vật. Bố trí tán cây và cụm bụi theo lớp chiều cao quanh lối đi.
- [ ] Cho khung bản đồ phủ toàn vùng hiển thị. Thêm cuộn để zoom và kéo để xem trên máy tính, chụm và kéo trên màn hình cảm ứng. Phân biệt thao tác kéo bản đồ với bấm chọn hoặc kéo vẽ đường. Giữ camera trực giao và góc nhìn thống nhất.
- [ ] Dùng ba lớp chi tiết. Khối chính và dấu hiệu công năng luôn hiện. Lớp sân, cổng và mái hiên rõ ở tầm vừa. Lớp vật dụng nhỏ và chi tiết bề mặt hiện ở tầm gần. Tách phần trang trí ra khỏi vùng chọn, chướng ngại và điểm tương tác.
- [ ] Dựng nắng xiên ấm và mặt khuất mát. Thêm điều khiển đổi hướng nắng để bóng công trình và cây xoay cùng nguồn sáng. Giữ khoảng trống trước cửa, cổng và mặt tiền. Đường nhựa dùng xám ấm, đường đất ở thị trấn đầu game vẫn có màu riêng.
- [ ] Thêm công tắc Ngày và Đêm cho bản demo. Khi chuyển sang đêm, giảm nắng, dùng ánh nền mát và bật đèn cửa sổ, đèn hiên, đèn ở công trình công cộng, bến xe và các tuyến đường có đèn. Bố trí đèn thấp, ánh ấm ở khu dân cư và đèn phố phù hợp cấp bến xe. Duy trì chu kỳ tín hiệu giao thông theo quy tắc nút giao.
- [ ] Thêm chỉ dấu avatar khi nhìn xa và hiệu ứng làm mờ công trình khi nhìn gần, theo quy tắc che khuất bên dưới.
- [ ] **Nghiệm thu bản đồ** — Chụp ở mức xa, vừa và gần trên màn hình ngang, màn hình rộng và điện thoại dọc. Kéo tới các giới hạn camera mà không lộ mép địa hình hoặc nền trống. Chụm để zoom không tạo nét vẽ đường. Ở mỗi mức zoom, vùng bấm vẫn khớp công trình và nhân vật vẫn đi đúng lối. Ghi thời gian khung hình trước và sau trên cùng thiết bị.
- [ ] **Nghiệm thu địa hình** — So cùng đoạn bờ suối, gò cỏ và cổng có bậc hoặc dốc ở ba mức zoom. Dẫn thị trưởng qua đoạn đổi cao độ và thử đặt nhà cạnh dốc. Kiểm tra chân nhân vật, mặt đường và chân công trình bám mặt đất, cùng khoảng trống dành cho lối đi.
- [ ] **Nghiệm thu ánh sáng** — Đổi hướng nắng ở hai góc và so hướng bóng của nhà, cây, bến xe. Chuyển Ngày → Đêm → Ngày, xác nhận đèn cửa sổ, đèn công trình và đèn đường bật tắt đúng chế độ. Ở đêm, thử nhìn lối đi, biển công trình, nhân vật và chỉ dấu avatar trên nền tối.
- [ ] **Nghiệm thu che khuất** — Cho thị trưởng đi sau một tòa nhà cao. Ở zoom xa, avatar bám theo nhân vật và mũi tên chỉ đúng vị trí khi vừa đi vừa kéo camera. Chụm hoặc cuộn để zoom gần ngay lúc đang bị che. Công trình mờ đi, nhìn thấy nhân vật tiếp tục bước và có thể bấm đích đến. Thử đi ngang hai tòa chồng hình, đi ra khỏi vùng che, đổi zoom quanh ngưỡng và vào nội thất. Chỉ dấu xuất hiện theo đúng trạng thái, công trình khôi phục độ đục và hiệu ứng không nhấp nháy.

#### Giữ thị trưởng trong tầm nhìn

- **Nhận biết công trình đang che.** Khi thị trưởng ở ngoài phố và trong khung hình, dò từ camera trực giao tới đầu và thân trên nhân vật. So khoảng cách để chỉ tính mái hoặc tường nằm trước nhân vật theo góc nhìn hiện tại. Công trình ở sau lưng hoặc nằm cạnh nhân vật vẫn hiển thị đầy đủ.
- **Zoom xa và vừa.** Khi đầu và thân trên bị che, hiện avatar thị trưởng trên lớp giao diện, lệch lên trên điểm chiếu của đầu. Mũi tên hướng về chính điểm đó trên bản đồ. Chỉ dấu đi theo nhân vật và giữ kích thước dễ đọc trên màn hình. Nếu avatar sát mép khung, dịch phần ảnh vào trong vùng an toàn và giữ mũi tên hướng về nhân vật. Thao tác chạm, kéo và vẽ đường đi qua lớp chỉ dấu.
- **Zoom gần.** Làm mờ dần từng công trình thực sự chắn tầm nhìn. Đề xuất giữ khoảng 20–25% độ đục để còn nhận ra dáng tòa nhà. Avatar thu lại khi đã thấy nhân vật. Khi ra khỏi vùng che hoặc zoom xa trở lại, công trình hiện rõ dần. Dùng một khoảng chuyển nhỏ quanh ngưỡng zoom và một khoảng chờ ngắn khi sát mép tường để tránh nhấp nháy.
- **Hiệu ứng hiển thị độc lập.** Áp dụng độ mờ theo từng công trình, kể cả khi nhiều tòa dùng chung vật liệu. Tìm đường, giới hạn xây dựng và vùng chọn vẫn đọc mô hình gốc. Chỉ áp dụng khi xem bản đồ ngoài phố. Khi chuyển vào nội thất, dọn chỉ dấu và khôi phục độ đục của các công trình.

### Công trình và sinh hoạt sau khi duyệt quy hoạch

**Đầu vào** — Các mẫu do chủ dự án thiết kế lại và bản quy hoạch đã duyệt. Duyệt từng mẫu trước khi đặt vào demo.

- [ ] Kiểm tra kích thước, cấp và lối vào của các mẫu nhận được với lô và mạng đường đã duyệt. Bến xe dùng cùng dữ liệu cấp với bộ mặt đường và giao lộ. Nối khu chờ vào lối đi bộ, còn lối xe buýt vào và ra nối vào đường từ 2× trở lên theo kiểm tra bề ngang và khoảng quay.
- [ ] Tạo biến thể kiến trúc và đặt cạnh nhau trong chế độ xem để so sánh. Giữ cảnh thị trấn mới nhận nhiệm vụ và thêm cảnh xem khu đô thị đã phát triển để thử đủ nhóm công trình.
- [ ] Dựng bộ chi tiết theo mục 3 cho các mô hình cũ và mới. Ưu tiên hốc cửa, mái đua, hiên và ban công tạo bóng ở tầm vừa. Hiện mạch ngói, lan can, vật dụng nhỏ và chi tiết lá theo mức zoom gần. Dùng chung hình học và vật liệu cho các chi tiết lặp lại ở nhiều lô khi phù hợp.
- [ ] Gửi bản xem trước và nhận duyệt cho từng công trình mới hoặc chỉnh sửa trước khi ghép vào cảnh bản đồ. Áp dụng quy trình duyệt mô hình ở mục 3.
- [ ] Thêm một hành động đặc trưng cho mỗi nhóm mới. Các mô hình phụ đang có như biệt thự, nhà gỗ, nhà nguyện và công trình đang xây có thể dùng chung cơ chế điểm đến theo công năng đã duyệt.
- [ ] **Nghiệm thu** — Ẩn toàn bộ biển tên ở mức zoom xa và thử nhận diện từng nhóm công trình từ hình dáng. Ở mức vừa và gần, đối chiếu lối vào và vật dụng với bảng yêu cầu. Thử ít nhất một hành động cho mỗi nhóm mới. Kiểm tra hành khách tới khu chờ, xe chỉ vào bến từ tuyến hợp lệ và đèn bến bật khi chuyển sang ban đêm.
- [ ] **Nghiệm thu chi tiết mô hình** — So nhà dân Lv1, nhà thị trưởng Lv3 và một công trình công cộng tại cùng góc nhìn. Ở tầm vừa thấy rõ lớp mái và bóng ở hốc cửa hoặc dưới ban công. Ở tầm gần thấy ngói, đồ trang trí và cụm lá. Khi đổi hướng nắng, bóng đổi theo hướng sáng. Khi thu nhỏ, dáng chính và lối vào vẫn dễ đọc, chi tiết nhỏ không nhấp nháy.

### Đề xuất giai đoạn sau cho nhà riêng của thị trưởng

**Tệp chính** — `demo_linguacity/models/house.js`, `app.js`, `world.js` và mô hình nội thất đang dùng. Đề xuất tách dữ liệu thiết kế nhà và đồ đạc vào `demo_linguacity/house-design.js`.

- [ ] Mở công cụ thiết kế từ nhà thị trưởng. Đề xuất bản đầu có mục **Ngoại thất** để đổi màu tường, mái, cửa, hiên hoặc hàng rào theo mẫu. Xem trước trước khi áp dụng. Nhà dân dùng bộ biến thể riêng theo từng hộ.
- [ ] Thêm mục **Nội thất** để đổi màu tường và vật liệu sàn, đặt, xoay, dời hoặc cất đồ trong phòng. Chặn đồ chồng nhau, vượt tường hoặc chắn cửa và đường đi cần thiết. Cho người chơi xác nhận hoặc hủy thay đổi. Đề xuất lưu cấu hình nhà riêng trên trình duyệt để mở lại demo vẫn xem được bản đã thiết kế.
- [ ] Kiểm tra quyền vào và quyền thiết kế ở dữ liệu hành động của nhà. Khi nhà Lv1/Lv3 đổi cấp, xoay hoặc dời trên bản đồ, cấu hình vẫn gắn với cùng căn nhà. Giữ các lựa chọn còn tương thích và báo nếu cần dời đồ vì mặt bằng mới.
- [ ] Gửi bản xem trước riêng của các mẫu ngoại thất hoặc nội thất nhà thị trưởng được tạo hay sửa trong dự án trước khi đưa các mẫu đó vào demo.
- [ ] **Nghiệm thu** — Đổi mái hoặc màu tường và xem thay đổi ngoài phố. Vào nhà, đổi sàn, đặt và xoay bàn ghế, rồi thử đặt đồ chắn cửa. Ra vào và tải lại để kiểm tra cấu hình đã lưu. Cư dân chỉ về nhà của họ. Nhà dân vẫn có mô hình và đèn riêng khi dùng chế độ Đêm.

## 5. Gợi ý về phạm vi bản đầu

- **Dùng hoạt động ngắn để làm thị trấn sống động.** Vào cửa, ngồi ghế, ném bóng và đợi xe cho thấy các loại sinh hoạt khác nhau mà vẫn dễ kiểm tra từng luồng. Cho cư dân có vài đích đến tự động để các hoạt động xuất hiện cả khi người chơi đang quan sát bản đồ.
- **Giữ hai bối cảnh xem thử.** Cảnh khởi đầu vẫn là thị trấn nghèo và theo thứ tự xây nhà, cải tạo trường, sửa đường và bến xe, rồi công viên. Cảnh xem thử đô thị phát triển cho phép kiểm tra bệnh viện, chợ, cửa hàng và biến thể mà không cần chơi qua tutorial.
- **Cho hoạt động sân bóng bắt đầu bằng một lượt ném do người chơi kích hoạt.** Cách này kiểm tra được đường đi, hoạt ảnh và bóng ngay trong bản đầu. Điều khiển canh lực hoặc tính điểm có thể được chọn làm phạm vi riêng nếu đó là trải nghiệm bạn muốn.
- **Đánh giá công trình với biển tên ẩn.** Nếu khó phân biệt ở mức xa, chỉnh khối mái, tỷ lệ hoặc sân trước khi thêm các vật dụng nhỏ.
- **Chọn bến xe Lv1–Lv3 làm mẫu đối chiếu sớm.** Bến xe cho phép kiểm tra cùng lúc dấu hiệu theo cấp, tỷ lệ với đường, lối đi bộ, vị trí xe đón khách và đèn ban đêm. Dùng nhà dân hoặc nhà thị trưởng làm mốc tỷ lệ cạnh bến trong bản xem trước.

## 6. Những điểm cần bạn duyệt

1. Duyệt bố cục địa hình, hướng suối, đồi, mật độ cây và khoảng đất thoải ở bước 1.
2. Sau khi bước 1 được duyệt, duyệt vùng xây và cấu trúc mạng đường của bước 2.
3. Khi có bộ công trình thiết kế lại, duyệt từng mẫu ở đúng tỷ lệ lô đã chọn trước khi ghép vào demo.

## 7. Tài liệu demo

- [Báo cáo bước 1 — Địa hình trống](04-bao-cao-buoc-1-dia-hinh.md)
- [Báo cáo bước 2 — Quy hoạch và đường](05-bao-cao-buoc-2-quy-hoach.md)
- [Các bước xử lý](01-cac-buoc-xu-ly.md)
- [Kiến trúc và luồng](02-kien-truc-va-luong.md)
- [Cài đặt và chạy](03-cai-dat-va-chay.md)
