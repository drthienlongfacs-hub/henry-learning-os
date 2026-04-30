# Henry Learning OS - Full-stack competitive benchmark

Ngày cập nhật: 2026-04-30

## Kết luận ngắn

Henry Learning OS đã vượt mức "display demo" ở các phần: AI gia sư, mastery/adaptive, dashboard bằng chứng, safety settings, static build và GitHub Pages. Điểm cạnh tranh nội bộ hiện là **67/100** theo scorecard có trọng số sau khi có SOT Control Center, AI tutor rubric 50 scenario, RCA/PDCA tuần, privacy evidence panel, human review queue, diagnostic warm-start lớp 1 và Playwright/WCAG smoke gate.

Benchmark Chương trình giáo dục phổ thông Việt Nam cho năm học **2026-2027** hiện đạt **100/100 ở lớp coverage nguồn, phiên bản và gate kiểm chứng**. Con số này không đồng nghĩa item bank đã phủ 100% mọi yêu cầu cần đạt; muốn claim phủ chuẩn nội dung phải có item-level map và người duyệt.

Riêng bậc tiểu học được kiểm soát kỹ hơn: benchmark đã đưa đủ **13 nhóm chính thức** gồm **11 môn học/hoạt động giáo dục bắt buộc** và **2 môn tự chọn** vào scope theo nguồn Bộ GDĐT. Những nhóm chưa có module trong app vẫn được giữ trong danh mục để không bị bỏ sót khi nâng cấp.

Nâng cấp mới đã hoàn tất ở mức item review workflow và baseline ban đầu: **59/59 topic lớp 1-5** trong app đã có curriculum map, generated item có `curriculumMapId`, toàn bộ được đưa vào human review queue với RCA/PDCA, reviewer metadata schema và release gate; đồng thời có diagnostic warm-start lớp 1 gồm **12 item Toán/Tiếng Việt** để tạo baseline, confidence, domain RCA và kế hoạch 7 ngày. Chưa được claim item bank phủ chuẩn cho đến khi có người duyệt thật và calibration bằng dữ liệu làm bài thật.

UI/UX live đã được chỉnh để khác biệt thấy ngay: benchmark hiện điểm 67/100, trang `/parent/sot` hiển thị SOT Control Center, `/parent/review-queue` hiển thị hàng đợi duyệt item lớp 1-5, `/parent/diagnostic` hiển thị diagnostic warm-start lớp 1, dashboard phụ huynh có RCA/PDCA tuần, settings có privacy evidence panel, và GitHub Pages workflow chạy Playwright smoke 8 route x 2 viewport trước khi upload site. Vẫn cảnh báo chưa claim hiệu quả học tập.

Không được claim hiệu quả học tập, tăng điểm, hoặc vượt phần mềm khác cho đến khi có dữ liệu người học thật: pre-test, post-test, retention sau 7 ngày, time-on-task, lỗi tái phát và phân tích cohort.

## Benchmark chương trình Việt Nam 2026-2027

| Gate bắt buộc | Trạng thái | Nguồn chính | Gate tiếp theo |
|---|---|---|---|
| Nguồn Chương trình GDPT chính thức | Đã đạt | Bộ GDĐT - Chương trình GDPT 2018 | Mọi curriculum map phải lưu sourceId và ngày benchmark |
| Cập nhật chương trình 2025 | Đã đạt | Thông tư 17/2025/TT-BGDĐT | Re-audit nội dung chịu tác động, nhất là Lịch sử - Địa lý và công dân/pháp luật |
| Mốc năm học 2026-2027 | Đã đạt | Bộ GDĐT - SGK thống nhất từ năm học 2026-2027 | Khi có danh mục/sách cụ thể, cập nhật source version và so sánh item bank |
| Map nguồn cho môn đang có trong app | Đã đạt | CTGDPT 2018 và Thông tư 17/2025 | Không thêm môn/generator mới nếu thiếu sourceIds và nextGate |
| Gate chống claim phủ chuẩn quá mức | Đã đạt | CTGDPT + nguồn evidence | Không hiển thị claim phủ 100% chương trình nếu chưa có người duyệt và calibration |

## Đường lên 100/100

| Gate | Trạng thái | Hiện có | Cần để lên 100 |
|---|---|---|---|
| Nguồn CTGDPT Việt Nam | Đã qua | Nguồn Bộ GDĐT, cập nhật 2025, mốc 2026-2027, scope tiểu học | Duy trì version nguồn khi có thay đổi mới |
| Traceability từng item | Đã qua | 59/59 topic generator có `curriculumMapId`, source version và evidence fields | Không cho generator mới chạy nếu thiếu source version |
| Người duyệt nội dung | Đang làm | Đã có review queue, RCA/PDCA và release gate khóa item chưa approved | `reviewerId`, `approvedAt`, lý do block thật cho từng item |
| Calibration độ khó | Đang làm | Item đã có `calibrationStatus` | Dữ liệu attempt thật đủ mẫu để hiệu chỉnh độ khó |
| Pilot hiệu quả học tập | Chưa đủ dữ liệu | Chưa có cohort/pre-post/retention | Pilot 4 tuần có consent, pre-test, post-test, retention 7 ngày |
| Vận hành production | Đang làm | Có Pages deploy, unit/build gate và Playwright smoke 8 route x 2 viewport | Monitoring live, rollback drill, export cohort |

## Bậc tiểu học - scope 100%

| Nhóm chính thức | Lớp | Vai trò | Trạng thái trong Henry | Diễn giải dễ hiểu |
|---|---|---|---|---|
| Tiếng Việt | 1-5 | Bắt buộc | Đã có trong app | Trẻ cần đọc được, viết được, nói rõ ý và nghe hiểu; không chỉ làm đúng trắc nghiệm |
| Toán | 1-5 | Bắt buộc | Đã có trong app | Trẻ cần hiểu số, phép tính, hình, đo lường, dữ liệu và biết giải thích cách làm |
| Đạo đức | 1-5 | Bắt buộc | Scope benchmark | Trẻ cần biết chọn việc đúng trong tình huống gần gũi, nói được lý do và làm lại trong đời sống |
| Ngoại ngữ 1 | 3-5 | Bắt buộc | Đã có trong app | Trẻ cần dùng tiếng Anh trong tình huống ngắn: nghe, nói, đọc, viết ở mức phù hợp |
| Tự nhiên và Xã hội | 1-3 | Bắt buộc | Đã có trong app | Trẻ học bằng quan sát đời sống: cơ thể, gia đình, trường học, cây cối, con vật, môi trường và an toàn |
| Lịch sử và Địa lý | 4-5 | Bắt buộc | Đã có trong app | Trẻ cần đọc bản đồ, hiểu mốc thời gian, nhân vật, địa danh và nói được ý nghĩa |
| Khoa học | 4-5 | Bắt buộc | Đã có trong app | Trẻ cần quan sát, thử nghiệm đơn giản, giải thích hiện tượng và áp dụng an toàn |
| Tin học và Công nghệ | 3-5 | Bắt buộc | Đã có trong app | Trẻ cần dùng thiết bị số an toàn, hiểu dữ liệu đơn giản, làm theo thuật toán và tạo sản phẩm số nhỏ |
| Giáo dục thể chất | 1-5 | Bắt buộc | Scope benchmark | App chỉ nên nhắc thói quen và ghi nhận; không thay giáo viên khi đánh giá vận động |
| Nghệ thuật | 1-5 | Bắt buộc | Scope benchmark | Trẻ cần cảm thụ, thể hiện và nói về sản phẩm; không chấm theo một đáp án cứng |
| Hoạt động trải nghiệm | 1-5 | Bắt buộc | Scope benchmark | Trẻ học qua việc làm thật, tự nhìn lại và có xác nhận phụ huynh khi phù hợp |
| Tiếng dân tộc thiểu số | 1-5 | Tự chọn | Tham chiếu | Chỉ triển khai khi có chương trình, ngữ liệu được phép dùng và người duyệt ngôn ngữ |
| Ngoại ngữ 1 lớp 1-2 | 1-2 | Tự chọn | Tham chiếu/enrichment | Làm quen nhẹ nhàng; không biến thành kiểm tra nặng hoặc claim chương trình bắt buộc |

## Ví dụ diễn giải tiểu học

| Lớp | Môn | Cách hiểu đúng | Ví dụ bài trong app | Minh chứng phải lưu |
|---:|---|---|---|---|
| 1 | Tiếng Việt | Con cần nghe âm, đọc tiếng, viết lại và nói một câu ngắn | Với tiếng "mẹ": đọc to, chỉ âm đầu, viết lại, nói câu "Mẹ bế em" | Lỗi âm-vần-dấu, câu con tự nói, mức gợi ý |
| 1 | Toán | Con cần hiểu số là số lượng thật, không chỉ nhớ đáp án | Gộp 7 quả táo và 2 quả táo, nói "7 thêm 2 là 9" | Cách đếm, lỗi thêm/bớt, giải thích của con |
| 2 | Tự nhiên và Xã hội | Con cần quan sát và nói điều an toàn trong đời sống | Xem cây bị héo, chọn nguyên nhân có thể xảy ra và nói cách chăm sóc | Câu quan sát, lý do an toàn, liên hệ đời sống |
| 3 | Ngoại ngữ 1 | Con cần dùng câu trong tình huống nhỏ | Nghe "What do you like?", chọn câu trả lời, đọc lại và viết một câu về sở thích | Kỹ năng đo, từ/mẫu câu, mức hỗ trợ tiếng Việt |
| 3 | Tin học và Công nghệ | Con cần làm theo bước và dùng thiết bị an toàn | Xếp lệnh cho nhân vật đi tới nhà, rồi chọn cách xử lý khi gặp link lạ | Chuỗi lệnh, lỗi thứ tự, quyết định an toàn số |
| 4 | Lịch sử và Địa lý | Con cần đọc bản đồ, đặt sự kiện vào thời gian và nói ý nghĩa | Chỉ địa danh trên bản đồ, đặt sự kiện vào dòng thời gian, nói điều thay đổi sau sự kiện | Địa danh, mốc thời gian, trạng thái re-audit theo Thông tư 17/2025 |
| 4 | Khoa học | Con cần dự đoán, quan sát và giải thích bằng bằng chứng | So sánh đường tan trong nước ấm và nước lạnh, dự đoán bên nào nhanh hơn | Dự đoán, quan sát, câu giải thích, bước an toàn |
| 5 | Tiếng Việt | Con cần hiểu ý chính, chọn chi tiết và viết đoạn rõ ràng | Đọc đoạn ngắn, gạch ý chính, chọn 2 chi tiết, viết đoạn 5-7 câu | Ý chính, chi tiết làm bằng chứng, lỗi diễn đạt |
| 5 | Toán | Con cần giải nhiều bước và kiểm tra kết quả | Tóm tắt bài toán mua đồ, viết cách làm, nêu vì sao chọn phép tính | Tóm tắt, bước giải, lỗi tính, cách kiểm tra |
| 5 | Hoạt động trải nghiệm | Con cần làm việc thật và tự nhìn lại | Dọn góc học tập 15 phút, chụp minh chứng, viết 3 câu tự nhận xét | Mục tiêu, minh chứng, phản tư, xác nhận phụ huynh |

## Curriculum map lớp 1-5 trong app

| Khối | Số topic đã map | Ví dụ mạch nội dung | Gate còn thiếu |
|---:|---:|---|---|
| 1 | 11 | Tiếng Việt âm/chữ/dấu; Toán số đến 20, hình phẳng, khối 3D; Tự nhiên và Xã hội cơ thể - sức khỏe | Người duyệt và calibration |
| 2 | 11 | Toán hàng chục-đơn vị, cộng trừ có nhớ, đo độ dài; Tiếng Việt từ vựng/đọc hiểu; Tự nhiên và Xã hội thực vật - động vật | Người duyệt và calibration |
| 3 | 8 | Toán nhân/chia, chu vi, quy luật; Tiếng Việt ngữ pháp; Ngoại ngữ 1 từ vựng; Tin học phần cứng | Reviewer thật và calibration |
| 4 | 9 | Toán phân số/diện tích/số lớn; Ngoại ngữ 1 đọc-ngữ pháp; Khoa học vật chất - năng lượng; Lịch sử dân tộc | Re-audit địa danh/bản đồ theo Thông tư 17/2025 |
| 5 | 8 | Toán thập phân/phần trăm/tỉ số/biểu đồ; Khoa học hệ sinh thái; Địa lý Việt Nam; Tin học thuật toán | Item calibration bằng dữ liệu làm bài thật |

## Item audit và attempt evidence

| Thành phần | Trạng thái |
|---|---|
| Traceable topic generator | 59/59 |
| Item traceability coverage | 100/100 |
| Trường lưu trong attempt/event | `curriculumMapId`, `topicKey`, `gradeLevel`, `attempt result`, `support level`, `child explanation`, `source version`, `review status` |
| Review status hiện tại | `needs_human_review` |
| Calibration status hiện tại | `needs_real_attempts` |
| Human review queue | Đã có `/parent/review-queue` cho 59 item/topic, có RCA/PDCA và release gate |

Generated item trong luồng học lớp 1-5 hiện đã có đủ metadata để truy vết về CTGDPT. Đây là nâng cấp dữ liệu và UI thật, nhưng chưa phải bằng chứng hiệu quả học tập.

### Môn đang có mapping nguồn

| Môn trong app | Phạm vi | Gate tiếp theo |
|---|---|---|
| Toán | Lớp 1-5 đang có trong app | Map từng câu hỏi tới lớp, mạch số và phép tính, hình học, đo lường, thống kê/xác suất |
| Tiếng Việt | Lớp 1-5 đang có trong app | Map từng bài tới đọc, viết, nói và nghe; kiểm tra lỗi dấu thanh, âm/vần và diễn đạt |
| Tiếng Anh | Lớp 1-5 trong app | Map từ vựng, mẫu câu, nghe-nói-đọc-viết theo lớp và tình huống giao tiếp |
| Khoa học / Tự nhiên và Xã hội | Tự nhiên và Xã hội lớp 1-3; Khoa học lớp 4-5 | Map từng hoạt động tới quan sát, đặt câu hỏi, giải thích hiện tượng và vận dụng an toàn |
| Lịch sử và Địa lý | Lớp 4-5 đang có trong app | Re-audit câu hỏi địa danh, đơn vị hành chính và nội dung chịu tác động cập nhật 2025 |
| Tin học và Công nghệ | Lớp 3-5 trong CTGDPT 2018; app đang có computing topics | Map từng item tới thiết bị số, an toàn, dữ liệu, thuật toán và sản phẩm số |

## Đối thủ benchmark

| Nhóm chuẩn | Tín hiệu lấy làm chuẩn | Hàm ý cho Henry |
|---|---|---|
| Khanmigo / Khan Academy | AI tutor gợi mở, đa môn, gắn hệ bài học | AI gia sư phải hỏi ngược, sửa lỗi tư duy và ghi log học thật |
| IXL / DreamBox | Chẩn đoán liên tục, đường học thích ứng | Attempt, lỗi sai, mức gợi ý và lịch ôn phải điều khiển bài tiếp theo |
| Duolingo ABC / Beast Academy | Phiên học ngắn, nội dung sâu, dashboard phụ huynh | Trẻ nhỏ cần nhịp học ngắn nhưng trẻ mạnh cần stretch task |
| Zearn / ST Math / EEF | Báo cáo vận hành, evidence ngoài, metacognition | Cần pilot thực nghiệm trước khi nói về hiệu quả |
| Bộ GDĐT Việt Nam / CTGDPT 2018 cập nhật 2025 | Chuẩn chương trình, mốc cập nhật 2025, mốc SGK 2026-2027 | Henry phải version hóa nguồn chương trình và map từng item trước khi claim phủ chuẩn |

## Scorecard

| Dimension | Weight | Henry | Gap chính | Gate tiếp theo |
|---|---:|---:|---|---|
| AI gia sư và sửa lỗi tư duy | 15% | 7.4/10 | Đã có 50 scenario regression, chưa có pilot hội thoại thật | Log hội thoại ẩn danh và review chất lượng |
| Chẩn đoán và thích ứng học thật | 14% | 6.8/10 | Đã có diagnostic nội bộ lớp 1, nhưng chưa lưu session dài hạn và chưa validation bằng cohort thật | Diagnostic persistence, mở rộng Tiếng Anh và recheck 7 ngày |
| UI/UX học ngắn và bền | 10% | 6.7/10 | Đã có smoke gate cơ bản, chưa có Lighthouse/axe audit sâu hoặc visual diff | Visual regression, axe audit và completion funnel |
| Độ sâu chương trình | 11% | 8.4/10 | Đã có review queue, nhưng chưa có reviewer thật/calibration | Reviewer decisions thật và calibration bằng attempt |
| Dashboard phụ huynh | 11% | 6.5/10 | Đã có RCA/PDCA tuần, chưa lưu plan/follow-up nhiều tuần | Export weekly report |
| Hiệu quả học tập có bằng chứng | 14% | 3.8/10 | Chưa có cohort/pre-post/retention | Pilot 4 tuần |
| Safety/privacy | 10% | 7.0/10 | Đã có privacy evidence panel, chưa có legal/backend review | Consent và data-retention checklist |
| Hạ tầng dữ liệu | 9% | 6.6/10 | Local-only, chưa có diagnostic session persistence, reviewer decisions thật/cohort analytics | Analytics export schema, diagnostic persistence và reviewer decision persistence |
| Build/test/deploy | 6% | 7.6/10 | Đã có E2E smoke trong Pages workflow, chưa có monitoring live và rollback drill | Monitoring live, rollback drill và WCAG audit sâu |

## Roadmap đúng trọng tâm

1. **Pilot evidence pack 4 tuần**: consent, pre/post, retention sau 7 ngày, time-on-task, lỗi tái phát, cohort dashboard.
2. **Diagnostic persistence và validation**: lưu session diagnostic, mở rộng Tiếng Anh và so sánh dự báo level với recheck sau 7 ngày.
3. **Reviewer decision persistence và calibration**: lưu reviewerId/approvedAt/blockReason thật và đưa item approved vào calibration.
4. **Live monitoring và accessibility audit sâu**: uptime route check, rollback drill, axe/WCAG report và visual diff.

## Nguồn

- Khanmigo: https://blog.khanacademy.org/ai-tutor-tutoring-khanmigo-kl/
- IXL Real-Time Diagnostic: https://www.ixl.com/benchmark/info
- DreamBox adaptivity: https://dreamboxlearning.zendesk.com/hc/en-us/articles/27281596241043-DreamBox-Math-Continuous-Assessment-Adaptivity
- Duolingo ABC: https://play.google.com/store/apps/details?hl=en_US&id=com.duolingo.literacy
- Beast Academy Online: https://beastacademy.com/online
- Zearn reporting suite: https://help.zearn.org/hc/en-us/articles/29008224450967-Zearn-reporting-suite
- ST Math - Evidence for ESSA: https://www.evidenceforessa.org/program/st-math-spatial-temporal-math/
- EEF metacognition and self-regulation: https://educationendowmentfoundation.org.uk/news/updated-eef-guide-to-metacognition-and-self-regulation
- Bộ GDĐT - Chương trình GDPT 2018: https://moet.gov.vn/tintuc/pages/tin-hoat-dong-cua-bo.aspx?ItemID=5755
- Thông tư 17/2025/TT-BGDĐT: https://moet.gov.vn/van-ban/vanban/Pages/chi-tiet-van-ban.aspx?ItemID=1600
- Bộ GDĐT - tổng kết triển khai chương trình, sách giáo khoa GDPT 2020-2025 và mốc SGK 2026-2027: https://www.moet.gov.vn/tintuc/Pages/tin-hoat-dong-cua-bo.aspx?ItemID=11222
- Bộ GDĐT - họp báo công bố Chương trình GDPT mới, phạm vi cấp tiểu học: https://moet.gov.vn/tintuc/Pages/CT-GDPT-Moi.aspx?ItemID=5756
