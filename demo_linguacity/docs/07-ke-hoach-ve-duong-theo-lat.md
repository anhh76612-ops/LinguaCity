# Kế hoạch vẽ đường theo lát cắt

**Trạng thái** — Mốc 3 đã build bản demo để thử. Mốc 4 chờ bạn duyệt mốc 3.

**Mục tiêu** — Người chơi có thể kéo tự do hoặc chấm hai điểm A–B để xác định tim đường. Các lát cắt xác định ô được xây. Một phương án xây duy nhất cung cấp hai kiểu hiển thị là **Ô vuông** và **Bo tròn**.

**Phạm vi rà soát** — Từ tin nhắn lúc 23:37 ngày 12/11 về việc đường cong làm mất tự động bắc cầu, tới yêu cầu chia từng bước để duyệt. Kế hoạch gồm cả vẽ từng tuyến, đề xuất mạng đường theo vùng và gợi ý luồng giao thông trên mạng đó. Vị trí công trình vẫn do người chơi bố trí.

## Quy tắc cần duyệt

| Trường hợp | Xử lý dự kiến |
| --- | --- |
| Giới hạn chiều dài | Tổng độ dài Euclid của tim tuyến trên mặt phẳng XZ phải **≤ 60,0 đơn vị** cho cả kéo tay và chọn A–B. Cộng `Math.hypot(Δx, Δz)` của các đoạn tim cuối cùng, gồm đường vòng, nhịp cầu và đường dẫn sau khi căn chỉnh. Mỗi ô lưới có cạnh dài 1 đơn vị, bước chéo qua hai tâm ô dài √2. Số lát cắt và bề rộng W không tham gia phép đo. |
| Chấm điểm A–B | Chấm A để hiện phạm vi theo bán kính 60 đơn vị trên XZ. Cắt đường viền phạm vi theo biên vùng chỉnh đường. Nếu vòng bao hết vùng chỉnh đường thì viền trùng biên vùng hợp lệ. Cho phép kéo camera hoặc thu phóng trước khi chấm B. Chỉ nhận B trong vùng chỉnh đường và trong bán kính. Khi tuyến vòng hoặc đường dẫn vượt 60 đơn vị, giữ A để người chơi chọn lại B. |
| Đường chéo hoặc cong 2×, 3× | Mỗi lát thông thường giữ đúng 2 hoặc 3 ô liền nhau theo bề ngang, ưu tiên gần tim tuyến. Hai lát liền kề có thể dùng chung ô. Ô bị bỏ vì thừa ở mép không tính vào diện tích hoặc chi phí. Quy tắc tương tự áp dụng cho 1× và 4×. |
| Góc cua gắt 3× và 4× | Giữ chỗ cho cụm góc trước khi chia lát hai nhánh. Cua 90° dùng cụm W × W tại góc, các góc khác có thể dùng vùng hình quạt nối kín hai nhánh. Kiểm tra toàn cụm theo cùng quy tắc về móng, nước, độ dốc và biên xây dựng. Nếu cụm không hợp lệ, thử dời góc trong phương án đi vòng hoặc đánh dấu chỗ chặn. Hai kiểu hiển thị dùng chung cụm góc và mỗi ô dùng chung chỉ tính một lần. |
| Đất trống quá dốc | Tự thử san phẳng hoặc làm dốc trong công cụ vẽ đường, áp dụng cho cả kéo tay lẫn A–B. Tính nền phẳng cho đoạn ngắn hoặc mặt dốc nối hai cao độ đầu cuối. Tận dụng bộ gọt đắp và tạo vùng chuyển tiếp ở hai bên. Ưu tiên phương án đạt dốc dọc/ngang với ít biến đổi địa hình hơn. Xem trước cả mặt đường và phần đất đổi cao độ. |
| Vướng công trình khi nối A–B | Ưu tiên tìm đường vòng vuông góc quanh móng theo cả bề rộng đã chọn. Hiển thị đường vòng theo ô và phương án bo những góc đủ chỗ. Nếu không tới được B, đề xuất phần tuyến hợp lệ tới lát trước chỗ vướng và đánh dấu rõ B chưa được nối. |
| Vướng công trình khi kéo tay | Giữ ô móng và đỉnh địa hình bị khóa. Chỉ giữ đoạn liên tục từ điểm đầu tới lát hợp lệ ngay trước công trình. Đánh dấu lát bị chặn và tô đỏ mờ toàn bộ phần nét kéo từ đó trở đi. Chỉ tính chi phí và cập nhật bản đồ trên đoạn được giữ. |
| Trùng hoặc gặp đường cũ | Dùng lại ô mặt đường đã có và ưu tiên nối cùng cao độ. Kéo trùng cùng hướng thì dùng chung đoạn, kéo cắt ngang thì tạo nút giao nếu cao độ phù hợp, kéo song song sát nhau thì dùng quy tắc mở rộng hiện có. Giữ vật liệu trên ô cũ khi chỉ vẽ nối. Tại cùng cao độ, mỗi ô dùng chung chỉ có một mặt đường và không tính chi phí xây lần nữa. |
| Băng qua sông | Thử phương án cầu ngay khi tuyến có một dải nước liên tục giữa hai bờ đất khô. Nếu nét lệch vài ô, thử các cặp điểm lên xuống cầu gần vị trí người chơi chỉ, xếp hạng và chọn nhịp hợp lệ ít lệch nhất. Giữ A và B, cho phần đường trên bờ tự nối vào nhịp đã căn. Giữ quy tắc độ hở, lùi đầu cầu, trụ, đường dẫn và thu nới bề rộng. Lỗi dốc của đường đất trước khi tính cầu không quyết định kết quả vượt sông. |
| Nối cao xuống thấp hoặc nối hai đỉnh đồi | Với đoạn ứng viên trên đất khô, nếu chênh cao hai đầu dưới **1,5 đơn vị** thì mặc định ưu tiên **Gọt/đắp tạo dốc** khi khả thi. Từ **1,5 đơn vị** trở lên, tự gợi ý thêm **Đường trên trụ** nếu đủ điều kiện. Với hai đỉnh gần bằng cao độ, cũng tự gợi ý đường trên trụ nếu độ sâu lớn nhất của hõm dưới mặt đường dự kiến đạt ngưỡng này. Ngưỡng chỉ dùng để xếp thứ tự và gợi ý. Người chơi có thể chuyển giữa hai thẻ khi cả hai phương án hợp lệ. Kiểm tra dốc đường dẫn, nhịp, trụ và vị trí mố. Thử lùi đầu nhịp khi còn chỗ và giữ nền tự nhiên dưới nhịp. |
| Giao lộ đường 2× trở lên | Khi các nhánh xe tham gia đều từ 2×, đưa ra **Giao cùng mức** hoặc **Vòng xoay** nếu đủ chỗ cho đảo giữa và các nhánh vào ra. **Cầu vượt** thuộc mốc 6 cùng các loại cầu khác. Kiểm tra chiều dài đường dẫn, độ hở dưới dầm và vị trí trụ ngoài làn bên dưới. Người chơi chọn trục đi trên nếu cả hai hướng đều khả thi. |
| Cùng vị trí nhưng khác cao độ | Xét cao độ trước khi nối làn. Đường đất nằm dưới mặt cầu không tạo nút giao trên mặt cầu. Có thể nối vào đường dẫn bằng quy tắc nối cầu hiện tại. |
| Chọn kiểu sau khi thả tay | Chọn phương án xây trước nếu có nhiều phương án hợp lệ. Trong từng phương án, **Ô vuông** và **Bo tròn** dùng chung tuyến, lát cắt, phần san nền, nhịp cầu, làn giao thông và chi phí. Khóa tập ô đã chốt. Tự giảm bán kính bo ở góc hẹp để hình học nằm trong tập ô và vẫn phủ đủ mặt đường cho làn đi. Người chơi đổi bản xem trước trước khi xác nhận. |
| Sinh mạng đường và gợi ý giao thông | Người chơi chọn vùng, có thể chỉ điểm cần nối và chọn đường cũ cần giữ. Hệ thống đề xuất các mạng trục, nhánh, cầu và phần đất cần gọt, đắp hoặc làm dốc theo đặc điểm vùng. Xem, chọn, nối thêm, xóa bớt rồi xác nhận. Có thể tiếp tục chỉnh từng tuyến sau khi áp dụng. Gợi ý luồng đi bộ và vòng xe buýt dùng mạng làn khi có điểm đến, đường xe và điểm dừng phù hợp. |

### Làn theo bề rộng

| Bề rộng | Luồng được phép |
| --- | --- |
| **1×** | Có làn đi bộ và làn xe máy. Ô tô và xe buýt chọn tuyến khác. |
| **2×** | Có làn đi bộ. Xe máy và ô tô dùng chung làn xe cơ giới. |
| **3×** | Có làn đi bộ, làn ô tô và làn xe máy riêng. Dải xe máy mục tiêu rộng khoảng nửa ô, nằm bên phải theo hướng lưu thông. |
| **4×** | Giữ trong phạm vi hệ thống bề rộng. Cách bố trí chi tiết sẽ đưa vào bản xem trước làn để duyệt trước khi triển khai cho 4×. |

Bố trí và kiểm thử làn ở mốc 2. Cầu, vòng xoay và mạng sinh tự động dùng cùng luật loại phương tiện. Điểm nối 1×–2×–3× phải chuyển làn đúng loại phương tiện. Chiều xe ở đoạn 1× và các điểm nhường khi không đủ chỗ tránh nhau sẽ được thử trong bản duyệt mốc 2.

## Phần sẽ tái sử dụng

- **Kiểm tra trước mỗi mốc** — Đối chiếu mã demo và mã GitHub đã ghi trong hai tài liệu. Thử thành phần tái sử dụng trên dữ liệu demo, kiểm tra giấy phép và khả năng chạy trong WebView. Ghi lại phần dùng trực tiếp, phần chỉ phù hợp để tham khảo và quy tắc riêng của LinguaCity cần bổ sung. Với sinh mạng đường, thử trước phần JavaScript của `roadgen.js` cho điểm neo, mạng trục và cao độ dọc. Dùng bộ cầu, san nền, dựng đường và hoàn tác hiện có để kiểm tra và áp dụng kết quả. [Đối chiếu mã nguồn và phương án quy hoạch](08-nghien-cuu-goi-y-quy-hoach.md)
- **Lọc tim đường** — Đối chiếu Ramer–Douglas–Peucker của `simplify-js`, dùng lại hàm RDP sẵn có trong `road-shapes.js` cho tọa độ XZ. Giữ điểm đầu, điểm cuối và kiểm thử nét vuốt ngược chiều. Phần chia lát và chọn đúng W ô là quy tắc riêng của game. [Mã nguồn simplify-js](https://github.com/mourner/simplify-js/blob/master/simplify.js)
- **Nhận diện nhịp và nối đường** — Đối chiếu `detectBridgeSpans` của SeloSlav để nhận diện chuỗi mẫu ướt theo chiều dài tuyến và đưa nhịp vào xử lý sớm. Hàm upstream lấy mẫu dọc tim và dùng ngưỡng của bản đồ riêng. LinguaCity sẽ dùng `planRoadStroke` và bộ dựng cầu hiện có để giữ phép đo toàn bề rộng, kiểm tra hai bờ và lùi đầu cầu. Cách tạo mặt nối ở nút giao của SeloSlav dùng để đối chiếu các trường hợp đường chồng. [RiverBridgeSpans](https://github.com/SeloSlav/spline-based-procedural-dirt-road-system/blob/main/src/roads/RiverBridgeSpans.ts) · [RoadJunctionBuilder](https://github.com/SeloSlav/spline-based-procedural-dirt-road-system/blob/main/src/roads/RoadJunctionBuilder.ts)
- **Dựng hai kiểu mặt đường** — Tái sử dụng `streetMesh`, `sampleFillets` và phần dựng dải hiện có. Dùng thư viện `polygon-clipping` cho phép hợp vùng ô và cắt dải bo theo phạm vi đã chọn. Đối chiếu cách `three-roads` cắt dải tại nút giao và giữ một mặt đường chung. Thử thành phần nhỏ trước khi cân nhắc tích hợp cả bộ compiler. [polygon-clipping](https://github.com/mfogel/polygon-clipping) · [Mã cắt mặt đường của three-roads](https://github.com/vibe-stack/three-roads/blob/main/packages/mesher/src/clip-road-surface-patch.ts)
- **San nền, lưu và giao thông** — Dùng `terrainEditor.planRoad`, `planBrush`, lớp cao độ tạm, các quy tắc khóa đỉnh, `buildLaneGraph` và lệnh hoàn tác hiện có. Bản đồ vẫn tải được đường cong, cầu và phần địa hình đã lưu ở phiên bản cũ.
- **Đối chiếu lựa chọn khác** — CozyStreetBuilder dùng để đối chiếu cách đọc ô vuông trong giao diện. `three-path-geometry` cung cấp miter/bevel cho nét 2D. `three-pathfinding` cần navmesh làm đầu vào. Hai thư viện này không thay thế phần chọn ô, kiểm tra cao độ hay nối làn của demo. [CozyStreetBuilder](https://github.com/wurmmatthias/CozyStreetBuilder) · [three-path-geometry](https://github.com/Experience-Monks/three-path-geometry) · [three-pathfinding](https://github.com/donmccurdy/three-pathfinding)

## Đối chiếu chức năng tìm đường vòng A–B

- **SeloSlav** có bắt dính theo rìa lô nhà, bo theo góc lô và nối lại tuyến có sẵn. Luồng điều khiển được mô tả là người chơi đặt các điểm điều khiển spline. Trong tài liệu và phần editor đã kiểm tra, chưa thấy chức năng tìm tuyến xây đường qua toàn bộ bản đồ từ hai điểm A–B. Tái sử dụng cách bắt điểm ở rìa công trình và kiểm tra khớp đầu nối khi áp dụng được. [RoadEditor](https://github.com/SeloSlav/spline-based-procedural-dirt-road-system/blob/main/src/roads/RoadEditor.ts) · [Tài liệu dự án](https://github.com/SeloSlav/spline-based-procedural-dirt-road-system#features)
- **three-roads** biên dịch tuyến và nút giao đã khai báo. **CozyStreetBuilder** mô tả việc đặt đường theo ô và sinh thị trấn. Tài liệu **threejs-playground** có ví dụ và đề mục chỉnh địa hình theo tuyến. Các phần đã kiểm tra chưa xác nhận có công cụ A–B tự né móng và kiểm tra đủ bề rộng theo quy tắc của LinguaCity. [Kiến trúc three-roads](https://github.com/vibe-stack/three-roads/blob/main/docs/architecture.md) · [CozyStreetBuilder](https://github.com/wurmmatthias/CozyStreetBuilder#features) · [threejs-playground](https://github.com/ryanfitzpatrickio/threejs-playground)
- **LinguaCity** đã có `localDetour` để tìm đường vòng ngắn. Có thể dùng lại phần tìm vòng cục bộ cho ứng viên A–B. Khi kéo tay gặp móng, giữ đoạn tới lát hợp lệ cuối theo quy tắc trên. Với tuyến A–B, dùng `AStarFinder` của **PathFinding.js** ở chế độ bốn hướng để tìm tuyến ứng viên. Khi chuyển sang ô đi được cho tim tuyến, chừa đủ bề rộng quanh móng. Sau khi tìm xong, chạy lại bộ chọn lát và bộ kiểm tra đường thật để loại tuyến bóp hẹp ở góc, cắt móng, quá dốc hoặc có tim tuyến dài hơn 60 đơn vị. Phần bo góc là cách dựng mặt đường trên tuyến đã kiểm tra. [PathFinding.js](https://github.com/qiao/PathFinding.js) · [Cấu hình đi bốn hướng](https://github.com/qiao/PathFinding.js/blob/master/docs/user-guide/diagonal-movement.md)

## Thứ tự thực thi sau khi duyệt

Sau mỗi mốc, gửi bản demo, thao tác thử, kết quả kiểm tra và phần còn chưa xác minh rồi dừng. Nếu bạn yêu cầu sửa, cập nhật trong mốc đó và gửi lại. Chỉ chuyển tiếp sau khi bạn đồng ý. Các phần 5A–5D và 6A–6C cũng có điểm dừng duyệt riêng. Mốc 5 duyệt mạng mặt đất trên terrain trống. Toàn bộ logic cầu mới và thử sinh mạng nối hai bờ thuộc mốc 6.

### 1. Chốt dữ liệu tuyến theo lát

- [ ] Thêm kiểm thử cho đường 2× và 3× kéo thẳng, chéo, cua L và chữ S. Kiểm tra hai chiều vuốt, điểm bằng khoảng cách và hai lát chỉ chạm góc.
- [ ] Tách phần chọn lát khỏi giao diện trong `preview/road-drawing.js` hoặc một module nhỏ cùng thư mục. Sau RDP, gán ô ứng viên cho đoạn tim gần nhất và tọa độ dọc tuyến. Chọn W ô theo khoảng cách ngang, sự liền kề và độ lệch so với lát trước. Dùng thứ tự tọa độ ổn định để phân xử ô đồng hạng.
- [ ] Xác định cụm góc trước khi lọc lát trên hai nhánh của đường 3× và 4×. Truyền các lát và cụm góc vào bộ kiểm tra tuyến hiện có. Kiểm thử góc 90° thông suốt, ô trùng chỉ tính một lần và cụm góc vướng móng hoặc nước được xử lý đúng. Khi bộ cầu căn lại nhịp hoặc đường dẫn, dùng tập ô cầu do bộ tính trả về và kiểm tra lại kết nối với lát đất.
- [ ] Dùng giới hạn chiều dài Euclid 60,0 đơn vị cho công cụ vẽ đường, thay giới hạn 20 đang nằm ở luồng kéo và dựng dải. Giữ giới hạn riêng của công cụ Làm dốc độc lập. Trong `planning-preview.js`, thêm chế độ chấm A–B, phạm vi được cắt theo biên vùng chỉnh đường và bộ đếm chiều dài. Duyệt tuyến A–B trực tiếp ở mốc này, tích hợp bộ tìm tuyến vòng ở mốc 3. Kiểm thử tuyến thẳng dài 59, 60 và 61 đơn vị, 42 bước chéo hợp lệ và 43 bước chéo vượt giới hạn. Kiểm thử B nằm đúng bán kính và B trong bán kính nhưng ngoài vùng chỉnh đường.

**Mốc duyệt** — Hiển thị lớp ô được chọn trên bản đồ. Đường 2× và 3× kéo chéo giữ đúng bề ngang từng lát và không có dải ô dư.

**Bản thử mốc 1** — Mở [bản đồ thị trấn](../index.html), chọn **Vẽ dải**, thử **Kéo tay** và **Chấm A–B**. Xem các ca trong [hướng dẫn thử](06-ve-duong-cau-va-san-nen.md#cách-thử).

### 2. Nối đường cùng cao độ

- [x] Dùng dữ liệu đường cũ để ưu tiên bắt đầu nối gần đầu mút, hoặc tạo nút giao khi hai tuyến gặp nhau cùng cao độ. Gộp ô trùng và giữ nguyên dữ liệu các ô ngoài vùng sửa. Với dải cong đã lưu từ bản trước, giữ dải và kiểm tra nối hai chiều ở đầu mút. Giữ quy tắc riêng của cầu và đường dẫn.
- [x] Dùng lại bộ dựng và làn vòng xoay hiện có cho giao lộ cùng mức. Kiểm tra đủ bề rộng để bố trí đảo giữa, kết nối các làn vào ra và giữ phương án giao cùng mức.
- [x] Bổ sung đồ thị làn riêng cho xe máy và dùng quy tắc bề rộng đã chốt cho đi bộ, xe máy, ô tô. Kiểm thử xe máy đi qua đường 1×, ô tô tránh 1×, nhập làn chung ở 2× và tách vào dải bên phải ở 3× theo hướng đi.
- [x] Kiểm thử vẽ trùng cùng hướng, giao chữ T và dữ liệu cầu hiện có. Giữ khả năng tự bắc cầu đang hoạt động trong demo và định dạng cầu đã lưu. Các ca căn cầu chéo/cong, đường dẫn và giao khác mức mới thuộc mốc 6.

**Mốc duyệt** — Đường chồng cùng cao độ có mặt đường chung và làn nối thật. Thử giao chữ T, vòng xoay đủ chỗ và tải lại cầu đã lưu.

**Bản thử mốc 2** — Mở [bản đồ thị trấn](../index.html), bật **Hiện làn giao thông** và thử [nối đường cùng cao độ](06-ve-duong-cau-va-san-nen.md#cách-thử). Demo dựng lại đồ thị làn sau khi xác nhận một thay đổi. Tối ưu cập nhật theo vùng sẽ được đo cùng các mạng lớn ở mốc 5.

### 3. San nền tự động và giữ phần đường hợp lệ

- [x] Dùng `terrain-edit.js` tạo chênh lệch cao độ cho phần đất trống cần sửa và phần vai hai bên. Thử viền 1,25 đơn vị trước rồi mở tới 2,25 khi phương án cần thêm chỗ. Ghi số ô và cao độ thay đổi lớn nhất. Demo thử giới hạn đào hoặc đắp tối đa 1,4 đơn vị mỗi đỉnh. Tuyến ngắn tới 12 đơn vị được thử thêm phương án san phẳng.
- [x] Kiểm tra lại toàn bề rộng, độ dốc dọc/ngang và các điểm nối trên nền dự kiến. Bảo vệ móng, nước và nền đường cũ. Khi kéo tay vướng công trình, giữ đoạn từ điểm đầu đến lát hợp lệ liền trước và tô đỏ mờ phần bị bỏ.
- [x] Đánh dấu cây, đá có thể dọn trong vùng ảnh hưởng và đưa chi phí dọn vào bản xem trước. Khi xác nhận, đường, cao độ và cảnh quan nằm trong cùng một thao tác hoàn tác. Kiểm thử đường 2× ven suối từng bị chặn vì nghiêng ngang 30%.
- [x] Khi tuyến trực tiếp bị chặn, tìm đường A–B trên đất khô bằng `PathFinding.js` 0.4.18. Chừa bề rộng quanh móng, thử hành lang khác khi tuyến đầu thất bại, rồi kiểm tra độ dốc và giới hạn 60 đơn vị trên tuyến cuối. Kiểm thử đường 3× phải vòng xa hơn đường 1× và trường hợp B trong vòng nhưng tuyến vòng quá dài.
- [x] Dùng phong cách xem trước của **San phẳng** cho **Làm dốc** và đường có chỉnh nền. Màu cyan, trắng và cam đánh dấu ô gần chuẩn, cần đắp và cần đào. Cả ba công cụ dùng viền cao độ đích và viền taluy nét đứt.

**Mốc duyệt** — Người chơi thấy nền và taluy dự kiến ngay trong công cụ vẽ đường. Đoạn khả thi trước công trình vẫn có thể xác nhận.

### 4. Hiển thị Ô vuông và Bo tròn

- [ ] Trong `planning-preview.js`, dùng một phương án xây và hai chế độ xem. Trong `streets.js` và `road-shapes.js`, dựng mặt vuông từ ô đã chọn và mặt bo từ tim lát đã chốt. Chừa mặt cầu, đầu cầu và vùng giao lộ cho bộ dựng tương ứng.
- [ ] Với cua hẹp 2× hoặc 3×, thử bo hai mép khác nhau. Tìm cung lớn nhất ở mép ngoài trong phạm vi ô và bề rộng làn. Mép trong có thể dùng cung nhỏ 0,2–0,3 đơn vị hoặc vát 45° nếu cung gắt làm tam giác chồng nhau. Các giá trị này là ứng viên thẩm mỹ, phải kiểm tra mặt đường liên tục, đủ bề rộng, tam giác đúng chiều và UV không xoắn. Nếu cung và vát đều thiếu chỗ, giữ góc vuông cục bộ. Tọa độ UV dọc đường lấy theo chiều dài tích lũy để texture ổn định qua cua.
- [ ] Trước khi khóa tập ô, ưu tiên hành lang đủ rộng ở những ứng viên A–B có chất lượng tương đương. Dùng RDP để lọc nhiễu nét tay và kiểm tra riêng khoảng trống cho góc cua trước khi chọn lát. Giữ hai đầu, hướng nét chủ đạo, giới hạn 60 đơn vị và vùng hợp lệ. Kiểm tra góc chật sát móng, sát đường cũ và bờ suối. Đổi kiểu hiển thị sau khi khóa ô chỉ thay mesh.
- [ ] Đặt thẻ ở cạnh dưới sau khi thả tay hoặc chọn B, giữ bản xem trước và cho phép kéo camera hoặc thu phóng trước khi xác nhận. Tô nhẹ ô hợp lệ, dùng viền tương phản và đánh dấu riêng vùng cầu, vùng cần san và vị trí bị chặn. Hai thẻ hiển thị cùng số ô, cầu và chi phí. Thay đổi kiểu hiển thị lưu cùng tuyến sau khi xác nhận.
- [ ] Kiểm tra hai thẻ dùng cùng ô, cao độ, nhịp và kết nối. Đổi thẻ hoặc hủy giữ nguyên dữ liệu lưu. Thử trên khung nhìn điện thoại, chụp cùng một tuyến ở cả hai kiểu và gửi duyệt.
- [ ] Chỉ dựng bản xem trước nhẹ lúc rê hoặc kéo. Tìm tuyến đầy đủ, chỉnh nền và dựng mesh chi tiết sau khi thả tay hoặc chọn B. Kiểm tra tốc độ phản hồi với tuyến sát 60 đơn vị trên WebView.

**Mốc duyệt** — So sánh hai ảnh trên một tuyến chéo 2× và một tuyến cong 3× có đầu nối hoặc cầu. Hoàn tác, làm lại và tải lại cho kết quả nhất quán.

### 5. Sinh mạng đường và gợi ý tuyến giao thông

Phụ thuộc mốc 1–4. Dùng các quy tắc và nguồn ở [tài liệu quy hoạch](08-nghien-cuu-goi-y-quy-hoach.md). Thêm cảnh thử riêng dùng terrain đã duyệt, ban đầu không có công trình hay đường dựng sẵn. Nút **Sinh mạng tự động** dùng toàn vùng hợp lệ khi người chơi chưa chọn vùng, và cho phép chọn vùng hoặc điểm neo để kiểm thử có kiểm soát. Kết quả xuất hiện dưới dạng xem trước để người chơi có thể hủy hoặc áp dụng. Duyệt mạng mặt đất tại đây, ghi rõ điểm hai bờ chưa nối, rồi bật sinh cầu trong mạng ở mốc 6.

- [ ] **5A — Sinh một mạng theo vùng.** Nhận vùng chọn, điểm neo tùy chọn và đường cũ cần giữ. Nếu thiếu điểm neo, dùng cụm đất bằng, khô và đầu đường có thể nối. Thử mạng **Kết nối cân bằng** trước. Sinh trục xe từ 2× và nhánh đi bộ, xe máy 1× khi phù hợp, ưu tiên đường hiện có. Tính cao độ trước khi gọt đắp hành lang và taluy. Giữ móng, nguồn nước, đường đã khóa và luật mặt đường theo cấp bến xe. Cảnh terrain trống dùng cấu hình Lv1 để thử đường đất. **Duyệt** bằng cách bấm nút trên terrain trống rồi kiểm tra vùng đồng bằng, sườn đồi và hai bờ. Chỉ rõ điểm nối được và điểm còn chờ cầu.
- [ ] **5B — So sánh phương án.** Từ cùng vùng và điểm neo, đề xuất tối đa ba bản **Ít gọt đắp**, **Dễ chia ô xây** và **Kết nối cân bằng**. Xem trước trục, nhánh, đất thay đổi, các điểm chưa nối và diện tích còn để xây. Hiện chiều dài đường mới, lượng gọt đắp và chi phí dự kiến. Sau mốc 6A–6B, dùng cùng thẻ để hiện vị trí và số cầu đã qua kiểm tra. Kiểm tra từng đoạn và các kết nối được hiển thị. Nếu chỉ nối được một phần, ghi rõ trong thẻ. **Duyệt** bằng cách đổi thẻ và so sánh hai bản khả thi trên cùng góc nhìn.
- [ ] **5C — Chỉnh, áp dụng và hoàn tác.** Cho khóa tuyến, vẽ nối, xóa nhánh và đổi phương án hợp lệ ở từng đoạn hoặc giao lộ trong bản nháp. Tính lại nền và các điểm nối bị ảnh hưởng. Xác nhận đường, cầu, nền và cảnh quan trong một thao tác hoàn tác. Sau khi xây, cho tiếp tục nối hoặc xóa từng tuyến qua công cụ hiện có. Giới hạn 60 đơn vị áp dụng cho thao tác vẽ hoặc nối thủ công, tổng mạng đề xuất có thể dài hơn. **Duyệt** bằng cách xóa một nhánh trong bản nháp, nối lại chỗ khác, xác nhận, sửa tiếp rồi hoàn tác và tải lại.
- [ ] **5D — Kiểm tra luồng giao thông trên terrain trống.** Cho chấm hai điểm thử ngay trên mạng vừa sinh, hiển thị tuyến theo loại phương tiện và có nút **Chạy thử** với người đi bộ, xe máy hoặc ô tô mẫu. Kiểm thử xe máy qua được 1×, ô tô tránh 1×, tìm tuyến thay thế khi xóa một đoạn và báo mất kết nối nếu hết tuyến. Dùng điểm đánh dấu tạm cho vị trí đi và đến, giữ cảnh thử trống công trình. Vòng xe buýt trong bản đồ có công trình vẫn cần bến và điểm dừng đủ điều kiện.

### 6. Logic cầu và tích hợp vào mạng tự sinh

- [ ] **6A — Cầu qua suối và đường dẫn.** Tái sử dụng `riverAlignments` để thử nhịp thẳng lệch 1–3 ô so với điểm kéo ở mỗi bờ. Xét đất khô, mực nước cao nhất dưới toàn bề rộng, độ hở, độ dốc và chiều dài đường dẫn trước khi chọn ứng viên. Lùi đầu cầu khi cần và có chỗ. Giữ A/B rồi căn hướng và bề rộng đường dẫn vào tim cầu. Trả cùng kết quả nhịp, đường dẫn, tập ô, kết nối làn hoặc lý do chặn cho kéo tay, chấm A–B và sinh mạng tự động. **Duyệt** bằng cùng terrain trống, thử kéo chéo, chấm A–B và bấm sinh mạng nối hai bờ, rồi kiểm tra đường đi qua cầu.
- [ ] **6B — Đường trên trụ ở đất khô.** Dùng lại `elevatedSpans` và bộ dựng nhịp, trụ để thử đoạn cao xuống thấp và hai đỉnh cùng hoặc lệch cao độ. Dùng ngưỡng 1,5 đơn vị để xếp phương án gọt đắp và đường trên trụ như quy tắc trên. Kiểm tra chiều cao trụ, độ dốc đường dẫn và giới hạn nhịp. Cho bộ sinh mạng xét cùng ứng viên cầu cạn. **Duyệt** với địa hình có hõm sâu, tuyến đủ và thiếu chiều dài, cùng vị trí không đặt được trụ.
- [ ] **6C — Cầu vượt tại giao lộ.** Với giao lộ xe từ 2×, thử vượt từng trục. Kiểm tra độ hở trên toàn bề rộng đường dưới, mố, trụ và độ dốc đường dẫn. Lưu hai tầng và luồng làn độc lập, chỉ nối tại nhánh lên xuống thực tế. Kiểm thử tải lại cầu cũ và dữ liệu đường một tầng, chọn tầng đúng và hoàn tác. **Duyệt** bằng giao lộ có xe chạy qua ở hai cao độ và có thể đổi trục vượt khi cả hai đạt điều kiện. [Kiến trúc giao khác mức](https://github.com/vibe-stack/three-roads/blob/main/docs/architecture.md#grade-separated-interchanges)

