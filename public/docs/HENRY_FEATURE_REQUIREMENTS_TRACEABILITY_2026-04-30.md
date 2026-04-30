# Henry Learning OS - Ma trận yêu cầu, căn cứ, tính năng và áp dụng

Ngày cập nhật: 2026-04-30  
Phạm vi: nền móng sản phẩm Henry Learning OS, ưu tiên lớp 1-5 và hành trình 6-18 tuổi  
Trạng thái: tài liệu SOT để giải thích vì sao từng tính năng/workflow tồn tại

## 1. Mục đích

File này là một ma trận truy vết để trả lời minh bạch năm câu hỏi cho từng tính năng của Henry Learning OS:

1. Tính năng này phục vụ yêu cầu nào?
2. Căn cứ lấy từ đâu?
3. Nguồn đó có mức độ tin cậy/uy tín ra sao?
4. Diễn giải dễ hiểu là gì?
5. Áp dụng cụ thể vào Henry, bối cảnh Việt Nam và cách vận hành kiểu BVBD như thế nào?

Cách tư duy được mượn từ hai tài liệu CLLS UTTTR đã cung cấp:

- `/Users/mac/Projects/data 2026/MacMini_2026/Bo_TCCLLS_UTTTR/output/CLLS_UTTTR_REQUIREMENTS_SPEC_pheduyet.docx`
- `/Users/mac/Projects/data 2026/MacMini_2026/Bo_TCCLLS_UTTTR/output/CLLS_UTTTR_PHAN_2_CHUYEN_MON_v2.docx`

Điểm mượn là phương pháp: căn cứ bậc cao, yêu cầu, giải pháp, diễn giải, nguồn số liệu và gate phê duyệt. Không mượn nội dung chuyên môn ung thư trực tràng cho Henry, vì Henry là nền tảng giáo dục, không phải hệ thống lâm sàng.

## 2. Ranh giới sản phẩm

Henry Learning OS là **Family-first Learning Evidence OS**: một hệ điều hành học tập cá nhân giúp Henry học theo chương trình Việt Nam, học bằng chứng, dùng trí tuệ nhân tạo (AI) an toàn và có phụ huynh đồng hành.

Henry không phải:

- Chatbot tự do cho trẻ dưới 13 tuổi.
- App luyện điểm hoặc giữ chuỗi ngày học.
- Công cụ làm bài hộ.
- Hệ thống mạng xã hội.
- CDMS, hồ sơ bệnh án, hệ thống chăm sóc người bệnh hoặc công cụ lâm sàng của BVBD.

Khi nói "áp dụng vào BVBD" trong tài liệu này, nghĩa là áp dụng phong cách quản trị chất lượng: có nguồn, có chủ sở hữu, có tiêu chí đạt, có bằng chứng, có audit trail, có chống claim quá mức. Không có nghĩa Henry xử lý dữ liệu người bệnh hoặc thay thế quy trình chuyên môn bệnh viện.

## 3. Nguyên tắc căn cứ

Tài liệu CLLS dùng logic ưu tiên căn cứ bậc cao. Trích đoạn ngắn từ tài liệu gốc: "Căn cứ bậc cao hơn được ưu tiên áp dụng."

Áp dụng cho Henry:

1. **Nguồn người dùng và blueprint gốc**: yêu cầu gia đình, file DOCX Henry learning super app, ZIP handoff full-stack.
2. **Repo SOT**: PRD, Feature Spec, Architecture, Benchmark, Product Foundation, Curriculum Map, tests.
3. **Nguồn chính thức Việt Nam**: Bộ GDĐT, Chương trình giáo dục phổ thông 2018, cập nhật 2025, phạm vi tiểu học, mốc sách giáo khoa 2026-2027.
4. **Chuẩn học tập và đánh giá bằng chứng**: EEF, WWC, UDL.
5. **Chuẩn AI, trẻ em, quyền riêng tư và chất lượng phần mềm**: NIST AI RMF, UNICEF AI for Children, COPPA, FERPA, ISO/IEC 25010, WCAG 2.2.
6. **Benchmark sản phẩm thực tế**: Khanmigo, IXL, DreamBox, Zearn, Duolingo ABC, Beast Academy, ST Math.
7. **Dữ liệu thật của Henry**: attempt, lỗi sai, hint, retention, transfer, phản tư, quan sát phụ huynh, pre/post/pilot.

Quy tắc: nguồn chính thức Việt Nam quyết định scope chương trình; benchmark quốc tế giúp thiết kế sản phẩm; dữ liệu thật mới được dùng để claim hiệu quả học tập.

## 4. Thang mức độ tin cậy

| Mức | Loại căn cứ | Được dùng để làm gì | Không được dùng để làm gì |
|---|---|---|---|
| A0 | Văn bản/chương trình chính thức | Chốt phạm vi môn học, lớp, yêu cầu cần đạt, cập nhật bắt buộc | Claim hiệu quả học tập nếu chưa có dữ liệu |
| A1 | Chuẩn quốc tế/khung đánh giá uy tín | Đặt gate AI, privacy, accessibility, chất lượng phần mềm, evidence | Thay thế chương trình Việt Nam |
| A2 | SOT nội bộ đã đọc từ file/repo | Chốt định vị, workflow, acceptance criteria, current implementation | Tự gọi là bằng chứng ngoài |
| B | Benchmark sản phẩm thực tế | So sánh chức năng, mức trưởng thành, khoảng cách cạnh tranh | Sao chép claim của sản phẩm khác |
| C | Code/test/build hiện có | Chứng minh phần mềm đang có hành vi nào | Chứng minh tác động học tập dài hạn |
| D | Thiếu dữ liệu thật | Chỉ được ghi là blocked/missing gate | Không được claim đạt |

## 5. Chính sách trích dẫn nguyên văn

Người dùng cần nhìn thấy nguyên văn tài liệu gốc. Tài liệu này chỉ ghi **trích đoạn nguyên văn ngắn** để giữ đúng bản quyền và tránh cắt rời bối cảnh. Nguồn đầy đủ được ghi bằng đường dẫn file hoặc URL ở từng mục.

Ví dụ trích đoạn gốc được dùng:

- CLLS requirement spec: "Căn cứ bậc cao hơn được ưu tiên áp dụng."
- CLLS chuyên môn/QĐ 2116 pattern: "dựa trên bằng chứng khoa học"
- PRD Henry: "AI must make the child think more, not think less."
- Feature Spec Henry: "Never provide full answer first."

## 6. Nguồn SOT chính

| ID nguồn | Nguồn | Mức | Vai trò |
|---|---|---:|---|
| S01 | `/Users/mac/Documents/app cho henry/Henry learning super app.docx` | A2 | Blueprint sản phẩm 6-18 tuổi, 5 layer, AI không làm hộ, data-driven system |
| S02 | `/Users/mac/Downloads/long_learning_os_dev_handoff_resource_fullstack.zip` | A2 | Handoff kỹ thuật gồm PRD, specs, architecture, policies, benchmarks |
| S03 | `docs/dev-handoff/docs/PRD.md` | A2 | Vision, non-goals, pillars, MVP journeys, metrics |
| S04 | `docs/dev-handoff/docs/FEATURE_SPEC.md` | A2 | Danh mục feature và rule hành vi AI/học tập |
| S05 | `docs/dev-handoff/architecture/ARCHITECTURE.md` | A2 | Boundary kỹ thuật: child app, parent app, AI orchestration, learning engine |
| S06 | `docs/FULLSTACK_COMPETITIVE_BENCHMARK_2026-04-29.md` | A2 | Scorecard, đường lên 100, no-overclaim, scope tiểu học |
| S07 | `docs/PRODUCT_FOUNDATION_SPEC_2026-04-30.md` | A2 | Định vị Product Foundation và SOT control plane |
| S08 | `src/data/primary-curriculum-map.ts` | C | 47 topic lớp 1-5 đã map trong app |
| S09 | Bộ GDĐT - Chương trình GDPT 2018: https://moet.gov.vn/tintuc/Pages/chi-tiet.aspx?ItemID=8421 | A0 | Chuẩn chương trình gốc |
| S10 | Bộ GDĐT - phạm vi tiểu học: https://moet.gov.vn/tintuc/Pages/CT-GDPT-Tong-The.aspx?ItemID=5756 | A0 | 11 môn/hoạt động bắt buộc và 2 môn tự chọn cấp tiểu học |
| S11 | Bộ GDĐT - cập nhật/chỉ đạo 2026-2027: https://www.moet.gov.vn/tintuc/Pages/tin-hoat-dong-cua-bo.aspx?ItemID=11222 | A0 | Mốc sách giáo khoa và version nguồn cần theo dõi |
| S12 | EEF metacognition: https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation | A1 | Tự điều chỉnh học tập, plan-monitor-evaluate |
| S13 | WWC standards: https://ies.ed.gov/ncee/WWC/Handbooks | A1 | Chuẩn bằng chứng trước khi claim hiệu quả |
| S14 | UDL guidelines: https://udlguidelines.cast.org/ | A1 | Nhiều cách tiếp cận, biểu đạt, tham gia |
| S15 | NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework | A1 | Govern, map, measure, manage rủi ro AI |
| S16 | UNICEF AI and children: https://www.unicef.org/innocenti/reports/policy-guidance-ai-children | A1 | AI lấy trẻ em làm trung tâm |
| S17 | ISO/IEC 25010: https://www.iso.org/standard/78176.html | A1 | Chất lượng phần mềm |
| S18 | WCAG 2.2: https://www.w3.org/TR/WCAG22/ | A1 | Accessibility và usable UI |
| S19 | Khanmigo: https://blog.khanacademy.org/ai-tutor-tutoring-khanmigo-kl/ | B | Benchmark AI tutor gợi mở |
| S20 | IXL Diagnostic: https://www.ixl.com/benchmark/info | B | Benchmark diagnostic và action plan |
| S21 | DreamBox adaptivity: https://dreamboxlearning.zendesk.com/hc/en-us/articles/27281596241043-DreamBox-Math-Continuous-Assessment-Adaptivity | B | Benchmark continuous assessment |
| S22 | Zearn reporting: https://help.zearn.org/hc/en-us/articles/29008224450967-Zearn-reporting-suite | B | Benchmark dashboard vận hành |

## 7. Bậc tiểu học phải kỹ lưỡng 100%

Ở lớp 1-5, "100%" được hiểu theo ba tầng khác nhau:

| Tầng | Có thể đạt 100% khi nào | Trạng thái hiện tại |
|---|---|---|
| Source coverage | Đủ nguồn chính thức, version, phạm vi môn học, mốc cập nhật | Đã có trong benchmark/foundation |
| Traceability coverage | Mỗi topic/item trong app có môn, lớp, mạch nội dung, source version, review status | 47/47 topic đã map; item generator đã có metadata |
| Efficacy coverage | Có dữ liệu người học thật, pre/post, retention, transfer, cohort đủ mẫu | Chưa đủ, không được claim |

Không được viết "Henry đáp ứng 100% chương trình" nếu chỉ có source coverage. Cách viết đúng là:

- "Đã có 100% source coverage cho phạm vi chính thức lớp 1-5 đang benchmark."
- "Đã có 47/47 topic trong app được traceability."
- "Chưa có bằng chứng hiệu quả học tập 100%; cần pilot thật."

## 8. Ma trận tính năng

### F01. Định vị sản phẩm và non-goals

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Chống trôi sản phẩm thành chatbot, game luyện điểm hoặc dashboard đẹp nhưng thiếu bằng chứng |
| Căn cứ/SOT | S01, S02, S03, S07 |
| Mức tin cậy | A2 |
| Nguyên văn ngắn | "AI must make the child think more, not think less." |
| Diễn giải | AI phải tăng năng lực suy nghĩ của trẻ, không thay trẻ suy nghĩ |
| Áp dụng vào Henry | Mọi feature phải ghi rõ học gì, trẻ làm gì, AI hỗ trợ mức nào, phụ huynh nhìn thấy gì |
| Tương ứng Việt Nam/BVBD | Giống logic phê duyệt tiêu chuẩn: trước khi làm phải rõ mục đích, phạm vi, trách nhiệm, không vượt phạm vi |
| Gate đạt | Product Foundation có category, non-goals, success definition và các trang chính link về foundation |

### F02. SOT control plane

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Mỗi nâng cấp phải có nguồn, yêu cầu, scope, gate, anti-overclaim |
| Căn cứ/SOT | S06, S07, CLLS requirement spec |
| Mức tin cậy | A2 |
| Nguyên văn ngắn | "Căn cứ bậc cao hơn được ưu tiên áp dụng." |
| Diễn giải | Không chọn tính năng theo cảm giác; chọn theo thứ tự yêu cầu và bằng chứng |
| Áp dụng vào Henry | Upgrade queue có rank, owner surface, evidence gate, deploy gate, blockedUntil |
| Tương ứng Việt Nam/BVBD | Tương tự hệ thống chất lượng bệnh viện: có owner, căn cứ, chỉ số, audit |
| Gate đạt | SOT integrity 100/100 ở nghĩa truy vết quyết định; không đồng nghĩa hiệu quả học tập 100/100 |

### F03. Curriculum kernel lớp 1-5

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Henry phải bám chương trình Việt Nam, nhất là lớp 1-5 |
| Căn cứ/SOT | S08, S09, S10, S11 |
| Mức tin cậy | A0 + C |
| Nguyên văn ngắn | Bộ GDĐT ghi rõ có "11 môn học và hoạt động giáo dục bắt buộc" ở tiểu học |
| Diễn giải | Không chỉ có Toán/Tiếng Việt/Tiếng Anh; scope tiểu học gồm cả đạo đức, trải nghiệm, nghệ thuật, thể chất, công nghệ |
| Áp dụng vào Henry | Mỗi topic có grade, subject, strand, source version, ví dụ bài, misconception, evidence field |
| Tương ứng Việt Nam/BVBD | Khi làm chương trình cho con trong bối cảnh Việt Nam, nguồn Bộ GDĐT là chuẩn gốc; benchmark quốc tế chỉ bổ sung cách làm |
| Gate đạt | Không thêm item/generator mới nếu thiếu curriculumMapId và source version |

### F04. Item traceability và review status

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Chặn claim phủ chuẩn khi item chưa được người thật duyệt hoặc calibration |
| Căn cứ/SOT | S06, S08, S13 |
| Mức tin cậy | A1 + C |
| Nguyên văn ngắn | CLLS pattern: "dựa trên bằng chứng khoa học" |
| Diễn giải | Câu hỏi học tập không chỉ đúng về code; phải đúng chuẩn học, đúng độ khó và đúng ngữ cảnh |
| Áp dụng vào Henry | Item có `reviewStatus`, `calibrationStatus`, `sourceIds`, `evidenceFields` |
| Tương ứng Việt Nam/BVBD | Tương tự một chỉ số chất lượng: cần nguồn số liệu, người chịu trách nhiệm, ngưỡng đạt |
| Gate đạt | Review queue có reviewerId, approvedAt, block reason; calibration dùng dữ liệu attempt thật |

### F05. AI Socratic tutor

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | AI giúp trẻ suy nghĩ, phát hiện sai lầm, không đưa đáp án ngay |
| Căn cứ/SOT | S03, S04, S15, S16, S19 |
| Mức tin cậy | A1 + A2 + B |
| Nguyên văn ngắn | Feature Spec: "Never provide full answer first." |
| Diễn giải | AI nên hỏi, gợi ý, kiểm tra hiểu; lời giải đầy đủ chỉ xuất hiện sau khi trẻ đã thử |
| Áp dụng vào Henry | Tutor response có role, support level, hint level, misconception, next question, audit metadata |
| Tương ứng Việt Nam/BVBD | Tương tự nguyên tắc an toàn: công cụ hỗ trợ quyết định không thay người chịu trách nhiệm |
| Gate đạt | 50 scenario regression cho Toán, Tiếng Việt, Tiếng Anh lớp 1-5; test chặn AI làm hộ |

### F06. Hint ladder

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Hỗ trợ vừa đủ, tránh phụ thuộc vào AI |
| Căn cứ/SOT | S04, S12, S19 |
| Mức tin cậy | A1 + A2 + B |
| Nguyên văn ngắn | Feature Spec: "tiny hint, medium hint, worked example" |
| Diễn giải | Trẻ cần được đỡ từng bậc, không nhảy thẳng tới đáp án |
| Áp dụng vào Henry | Lưu `hintLevelUsed`, phân biệt hint nhỏ, hint vừa, ví dụ mẫu, bài tương tự |
| Tương ứng Việt Nam/BVBD | Giống hỗ trợ theo mức rủi ro: can thiệp tối thiểu đủ hiệu quả, có ghi nhận |
| Gate đạt | Dashboard hiển thị hint dependency; mastery không tăng nếu trẻ cần hint quá cao |

### F07. Mistake notebook và RCA lỗi sai

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Biến lỗi sai thành dữ liệu sửa học, không chỉ trừ điểm |
| Căn cứ/SOT | S03, S04, S12, S13 |
| Mức tin cậy | A1 + A2 |
| Nguyên văn ngắn | PRD journey: "Child makes error" rồi lỗi thành notebook item |
| Diễn giải | Lỗi có loại gốc: hiểu sai khái niệm, đọc đề sai, tính sai, thiếu từ vựng, quá khó, quá dễ |
| Áp dụng vào Henry | Mỗi mistake lưu root cause, recurrence count, linked review, parent action |
| Tương ứng Việt Nam/BVBD | RCA là cách quản trị chất lượng quen thuộc: không chỉ xử lý hiện tượng, phải tìm nguyên nhân lặp lại |
| Gate đạt | Weekly RCA tự chọn top 1-3 lỗi tái phát và đề xuất hành động 7 ngày |

### F08. Spaced repetition

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Kiến thức phải được nhớ lại sau thời gian, không chỉ làm đúng ngay hôm nay |
| Căn cứ/SOT | S03, S04, S12 |
| Mức tin cậy | A1 + A2 |
| Nguyên văn ngắn | PRD metric: "Retention score after 1 day, 1 week, 1 month." |
| Diễn giải | Học thật phải có gợi nhớ sau 1 ngày, 1 tuần, 1 tháng |
| Áp dụng vào Henry | SM-2/review scheduler; bài sai quay lại; mastery cần retention evidence |
| Tương ứng Việt Nam/BVBD | Tương tự audit sau can thiệp: có recheck thì mới biết cải tiến có bền không |
| Gate đạt | Retention dashboard có mẫu số, ngày due, overdue, pass/fail và trend |

### F09. Mastery checkpoint và retrieval practice

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Không cho "xem xong" hoặc "làm có hint" trở thành thành thạo |
| Căn cứ/SOT | S03, S04, S12, S13 |
| Mức tin cậy | A1 + A2 |
| Nguyên văn ngắn | PRD: "recall, apply, and explain" |
| Diễn giải | Thành thạo nghĩa là nhớ lại, vận dụng và giải thích được khi không có gợi ý |
| Áp dụng vào Henry | Mastery state gồm recall, apply, explain, retain, transfer; independent challenge không hint |
| Tương ứng Việt Nam/BVBD | Tương tự tiêu chí outcome: không chỉ hoàn thành quy trình mà phải có kết quả đo được |
| Gate đạt | Mastery checkpoint lưu independent attempt và explanation score |

### F10. Diagnostic warm-start

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Xác định điểm bắt đầu phù hợp, tránh học quá dễ hoặc quá khó |
| Căn cứ/SOT | S20, S21, S08, S09 |
| Mức tin cậy | A0 + B + C |
| Nguyên văn ngắn | Product Foundation: "Diagnostic 12-15 phút theo môn" |
| Diễn giải | Không nên mặc định trẻ lớp 1 thì mọi kỹ năng đều ở mức lớp 1; cần đo theo domain |
| Áp dụng vào Henry | Diagnostic Toán/Tiếng Việt lớp 1, confidence score, kế hoạch 7 ngày, flag thiếu dữ liệu |
| Tương ứng Việt Nam/BVBD | Tương tự baseline trước cải tiến: chưa có baseline thì không biết can thiệp có hiệu quả không |
| Gate đạt | Mỗi diagnostic có rubric, item source, độ tin cậy và parent-visible summary |

### F11. Weekly RCA/PDCA outcome loop

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Biến dữ liệu thành hành động cải tiến hằng tuần |
| Căn cứ/SOT | S06, S07, S12, S13, S22 |
| Mức tin cậy | A1 + A2 + B |
| Nguyên văn ngắn | Product Foundation loop: "Observe, RCA, Plan, Do, Check, Act" |
| Diễn giải | Mỗi tuần chỉ nên chọn ít vấn đề quan trọng, làm một can thiệp nhỏ, đo lại |
| Áp dụng vào Henry | Weekly issue, parent mission, 7-day recheck, outcome delta, audit trail |
| Tương ứng Việt Nam/BVBD | Đây là cầu nối rõ nhất với quản lý chất lượng bệnh viện: PDCA thật, có chỉ số và vòng kiểm tra |
| Gate đạt | Không hiển thị cải thiện nếu không có before/after hoặc nếu mẫu số quá nhỏ |

### F12. Parent dashboard và daily mission

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Phụ huynh thấy một insight quan trọng và một việc có thể làm trong 10 phút |
| Căn cứ/SOT | S03, S04, S22 |
| Mức tin cậy | A2 + B |
| Nguyên văn ngắn | PRD: "Parents receive simple daily missions" |
| Diễn giải | Dashboard không nên là biểu đồ rối; cần chuyển dữ liệu thành hành động tại nhà |
| Áp dụng vào Henry | Mỗi ngày: điểm sáng, điều cần để ý, nhiệm vụ ngắn, bằng chứng cần quan sát |
| Tương ứng Việt Nam/BVBD | Tương tự báo cáo chất lượng cho lãnh đạo: ít chỉ số, đúng trọng tâm, có hành động |
| Gate đạt | Mission gắn với dữ liệu thật của Henry và được đo lại sau 7 ngày |

### F13. Reading buddy và reading journal

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Phát triển đọc hiểu, kể lại, vốn từ và thói quen đọc |
| Căn cứ/SOT | S03, S04, S09, S14 |
| Mức tin cậy | A0 + A1 + A2 |
| Nguyên văn ngắn | Feature Spec: "Story retelling" |
| Diễn giải | Đọc không chỉ là đọc to; trẻ cần kể lại, chọn ý chính, dùng từ mới |
| Áp dụng vào Henry | Reading journal lưu sách/đoạn đọc, câu hỏi hiểu, từ mới, retell, parent note |
| Tương ứng Việt Nam/BVBD | Trong bối cảnh Việt Nam, Tiếng Việt lớp 1-5 là nền năng lực học các môn khác |
| Gate đạt | Bài đọc có grade/strand/source; journal có evidence đọc hiểu và phản tư |

### F14. Writing coach

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Giúp trẻ viết rõ ý nhưng không viết hộ |
| Căn cứ/SOT | S03, S04, S09, S16 |
| Mức tin cậy | A0 + A1 + A2 |
| Nguyên văn ngắn | Feature Spec: "provide feedback, not a ready-to-submit essay" |
| Diễn giải | AI chỉ góp ý cấu trúc, ý, câu, lỗi diễn đạt; bản cuối phải do trẻ viết |
| Áp dụng vào Henry | Feedback rubric: ý chính, chi tiết, câu, chính tả, tự sửa; cấm sinh bài nộp hoàn chỉnh |
| Tương ứng Việt Nam/BVBD | Tương tự nguyên tắc trách nhiệm: công cụ hỗ trợ, người học vẫn là người tạo sản phẩm |
| Gate đạt | Test chặn AI viết bài hoàn chỉnh; UI bắt trẻ sửa từng đoạn và ghi lý do sửa |

### F15. English roleplay

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Tiếng Anh dùng được trong tình huống, không chỉ làm bài ngữ pháp |
| Căn cứ/SOT | S03, S04, S09, S14 |
| Mức tin cậy | A0 + A1 + A2 |
| Nguyên văn ngắn | PRD outcome: "usable English, not just test English" |
| Diễn giải | Trẻ cần nghe-nói-đọc-viết trong tình huống ngắn, an toàn, có phản hồi |
| Áp dụng vào Henry | Roleplay có kịch bản lớp 3-5, từ/cấu trúc, mức hỗ trợ tiếng Việt, pronunciation note |
| Tương ứng Việt Nam/BVBD | Ở Việt Nam, Ngoại ngữ 1 bắt buộc từ lớp 3; lớp 1-2 chỉ nên nhẹ nhàng/enrichment nếu triển khai |
| Gate đạt | Roleplay log có target language, attempt, feedback, retry và no-free-chat dưới 13 tuổi |

### F16. Math reasoning analyzer

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Tách đúng/sai đáp án khỏi hiểu/sai tư duy |
| Căn cứ/SOT | S03, S04, S08, S09 |
| Mức tin cậy | A0 + A2 + C |
| Nguyên văn ngắn | Feature Spec: "Step-by-step reasoning" |
| Diễn giải | Một đáp án sai có thể do đọc đề, chọn phép tính, tính toán hoặc không hiểu khái niệm |
| Áp dụng vào Henry | Analyzer lưu error type, reasoning step, misconception, reverse problem, similar problem |
| Tương ứng Việt Nam/BVBD | Giống phân tích nguyên nhân trong chất lượng: lỗi quy trình khác lỗi kết quả |
| Gate đạt | Bài toán lớp 1-5 có rubric bước giải và lỗi được đưa vào mistake notebook |

### F17. Science and maker lab

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Học qua quan sát, dự đoán, làm thử và giải thích bằng bằng chứng |
| Căn cứ/SOT | S04, S09, S14 |
| Mức tin cậy | A0 + A1 + A2 |
| Nguyên văn ngắn | Feature Spec: "Hypothesis-prediction-observation-explanation flow" |
| Diễn giải | Khoa học lớp nhỏ cần gắn với hiện tượng đời sống và an toàn tại nhà |
| Áp dụng vào Henry | Home experiment có checklist an toàn, dự đoán, ảnh/minh chứng, giải thích, parent approval |
| Tương ứng Việt Nam/BVBD | Không biến thành hướng dẫn nguy hiểm; mọi hoạt động có vật liệu, rủi ro và phụ huynh xác nhận |
| Gate đạt | Mỗi activity có safety checklist, age range, parent approval và evidence artifact |

### F18. Coding và AI literacy

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Trẻ hiểu thuật toán, dữ liệu, an toàn số và dùng AI có trách nhiệm |
| Căn cứ/SOT | S03, S04, S09, S15, S16 |
| Mức tin cậy | A0 + A1 + A2 |
| Nguyên văn ngắn | PRD: "Uses AI ethically and actively" |
| Diễn giải | Tin học không chỉ dùng thiết bị; cần tư duy bước, lỗi, dữ liệu, quyền riêng tư |
| Áp dụng vào Henry | Block-coding path, digital safety, prompt literacy theo tuổi, AI-use reflection |
| Tương ứng Việt Nam/BVBD | Phù hợp bối cảnh Việt Nam khi Tin học và Công nghệ bắt buộc lớp 3-5; AI literacy phải đi cùng safety |
| Gate đạt | Không mở prompt tự do cho trẻ nhỏ; mọi AI activity có purpose và parent-visible audit |

### F19. Project builder và portfolio vault

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Biến học tập thành sản phẩm, phản tư và hồ sơ phát triển dài hạn |
| Căn cứ/SOT | S03, S04, S14 |
| Mức tin cậy | A1 + A2 |
| Nguyên văn ngắn | PRD: "12-year portfolio" |
| Diễn giải | Học sâu cần sản phẩm thật: bài viết, dự án, code, thí nghiệm, đọc sách, phản tư |
| Áp dụng vào Henry | Portfolio item có artifact, skill tags, reflection, source, parent note, export later |
| Tương ứng Việt Nam/BVBD | Giống hồ sơ chất lượng: sản phẩm phải có minh chứng, không chỉ điểm số |
| Gate đạt | Export HTML/PDF về sau; mỗi artifact có reflection và skill mapping |

### F20. Safety audit và parent control

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Bảo vệ trẻ dưới 13 tuổi, tránh free chat, dark pattern, nội dung nhạy cảm |
| Căn cứ/SOT | S03, S15, S16 |
| Mức tin cậy | A1 + A2 |
| Nguyên văn ngắn | PRD non-goal: "Not a generic chatbot for children." |
| Diễn giải | AI trong app của trẻ phải được bao quanh bằng role, mục tiêu học, policy và log |
| Áp dụng vào Henry | Under-13 mode, blocked unsafe interaction, parent-visible audit, escalation flags |
| Tương ứng Việt Nam/BVBD | Tư duy tương tự an toàn hệ thống: sự kiện rủi ro phải được ghi nhận, không chôn trong UI |
| Gate đạt | Safety panel hiển thị policy status, blocked counts, last audit, retention/delete status |

### F21. Privacy evidence panel

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Phụ huynh biết dữ liệu nào được lưu, để làm gì, giữ bao lâu, xóa/xuất thế nào |
| Căn cứ/SOT | S15, S16, S17 |
| Mức tin cậy | A1 |
| Nguyên văn ngắn | Product Foundation: "Data minimization, parent-visible audit" |
| Diễn giải | Với trẻ em, privacy là nền móng sản phẩm, không phải màn hình cài đặt phụ |
| Áp dụng vào Henry | Data inventory: profile, attempts, mistakes, reviews, reflections, AI logs; purpose/retention/export/delete |
| Tương ứng Việt Nam/BVBD | Nếu dùng trong môi trường tổ chức Việt Nam/BVBD, cần legal review riêng trước khi tuyên bố tuân thủ pháp luật dữ liệu cá nhân |
| Gate đạt | Có privacy evidence page và test không lưu trường ngoài mục đích đã khai báo |

### F22. Software quality, accessibility và deploy gate

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Phần mềm phải build được, test được, dùng được trên mobile/desktop, có đường deploy live |
| Căn cứ/SOT | S05, S07, S17, S18 |
| Mức tin cậy | A1 + A2 + C |
| Nguyên văn ngắn | Product Foundation: "TypeScript, test, lint, build, deploy gate" |
| Diễn giải | Một tính năng chưa đạt nếu chỉ nằm trong code nhưng không qua build, test và kiểm tra UI |
| Áp dụng vào Henry | Gate: `tsc`, Vitest, lint, `npm run build`, Pages Actions success, live verification |
| Tương ứng Việt Nam/BVBD | Tương tự nghiệm thu nội bộ: có bằng chứng chạy được và người dùng nhìn thấy được |
| Gate đạt | Thêm Playwright/WCAG smoke CI trước khi gọi UI là production-grade |

### F23. Pilot evidence pack

| Trường | Nội dung |
|---|---|
| Yêu cầu phục vụ | Chỉ claim hiệu quả khi có dữ liệu người học thật và thiết kế đo lường |
| Căn cứ/SOT | S06, S12, S13 |
| Mức tin cậy | A1 + A2 |
| Nguyên văn ngắn | Benchmark: "Không được claim hiệu quả học tập" khi thiếu dữ liệu thật |
| Diễn giải | Đúng code và đúng chương trình chưa đủ để nói học sinh tiến bộ |
| Áp dụng vào Henry | Pilot 4 tuần: consent, baseline, pre-test, post-test, retention 7 ngày, attrition, cohort report |
| Tương ứng Việt Nam/BVBD | Tương tự phân biệt chỉ số quá trình và chỉ số kết quả; phải có dữ liệu trước-sau |
| Gate đạt | Báo cáo pilot có mẫu số, phương pháp, giới hạn, dữ liệu thiếu và no-overclaim |

## 9. Bản đồ module lớp 1-5

| Môn/nhóm tiểu học | Yêu cầu Henry phải phục vụ | Module tương ứng | Gate 100% traceability |
|---|---|---|---|
| Tiếng Việt | Đọc, viết, nói, nghe, từ vựng, diễn đạt | Reading buddy, writing coach, mistake notebook | Bài đọc/bài viết có grade, strand, rubric, source version |
| Toán | Số, phép tính, hình, đo lường, dữ liệu, giải thích | Math reasoning analyzer, mastery checkpoint, diagnostic | Mỗi item có bước giải, misconception, independent challenge |
| Đạo đức | Ra quyết định trong tình huống gần gũi | Reflection journal, scenario prompts | Không chấm đạo đức như trắc nghiệm cứng; cần parent discussion |
| Ngoại ngữ 1 lớp 3-5 | Giao tiếp tình huống, nghe-nói-đọc-viết | English roleplay, vocabulary notebook | Log có target language, attempt, feedback, retry |
| Tự nhiên và Xã hội lớp 1-3 | Quan sát đời sống, an toàn, gia đình, trường học, môi trường | Science/maker mini tasks, reading prompts | Activity có evidence quan sát và parent safety note |
| Lịch sử và Địa lý lớp 4-5 | Bản đồ, mốc thời gian, địa danh, ý nghĩa sự kiện | History-geography cards, timeline/map tasks | Re-audit khi nguồn hành chính/chương trình thay đổi |
| Khoa học lớp 4-5 | Dự đoán, quan sát, giải thích, vận dụng an toàn | Science lab, hypothesis flow | Có checklist an toàn và artifact |
| Tin học và Công nghệ lớp 3-5 | Thiết bị số, dữ liệu, thuật toán, an toàn số | Coding/AI literacy, digital safety | Không mở AI/free web nếu thiếu parent gate |
| Giáo dục thể chất | Thói quen vận động và ghi nhận nhẹ | Habit/check-in, parent observation | Không thay giáo viên đánh giá vận động |
| Nghệ thuật | Cảm thụ, thể hiện, nói về sản phẩm | Portfolio artifact, reflection | Không ép một đáp án đúng duy nhất |
| Hoạt động trải nghiệm | Làm việc thật, tự nhìn lại, đóng góp gia đình | Daily mission, project builder | Có minh chứng và phản tư |
| Tiếng dân tộc thiểu số | Tự chọn, cần nguồn/người duyệt riêng | Chưa mở module chính | Block đến khi có nguồn hợp lệ |
| Ngoại ngữ 1 lớp 1-2 | Tự chọn/enrichment | English play/light exposure | Không claim chương trình bắt buộc |

## 10. Quy trình tạo hoặc nâng cấp một tính năng

Một tính năng mới chỉ được đưa vào product foundation khi qua đủ 10 bước:

1. **Xác định yêu cầu**: trẻ/phụ huynh/curriculum/evidence cần gì?
2. **Gắn nguồn**: tối thiểu một nguồn SOT và một nguồn chuẩn nếu có.
3. **Xếp mức tin cậy**: A0/A1/A2/B/C/D.
4. **Viết trích đoạn gốc ngắn**: đủ để người đọc biết nguồn nói gì.
5. **Diễn giải dễ hiểu**: cha mẹ không phải lập trình viên vẫn hiểu.
6. **Thiết kế workflow**: trẻ làm gì, AI làm gì, phụ huynh thấy gì.
7. **Định nghĩa dữ liệu cần lưu**: event, attempt, metric, evidence field, privacy purpose.
8. **Định nghĩa no-overclaim**: câu nào được nói, câu nào bị chặn.
9. **Định nghĩa gate đạt**: test, review, calibration, pilot, deploy.
10. **Cập nhật live**: build, commit, push, Actions success, verify URL.

## 11. RCA/PDCA tự động dựa vào số liệu thật

Vòng tối thiểu:

| Bước | Dữ liệu bắt buộc | Output |
|---|---|---|
| Observe | Attempt, mistake, hint, retention, transfer, parent note | Vấn đề nổi bật tuần này |
| RCA | Root cause taxonomy | Nguyên nhân gốc có khả năng nhất |
| Plan | Goal 7 ngày, task, owner | Kế hoạch nhỏ, làm được |
| Do | Completion log | Trẻ/phụ huynh đã làm gì |
| Check | Re-attempt, retention, explanation, parent observation | Có cải thiện hay không |
| Act | Keep/change/stop | Điều chỉnh tuần sau |

Không được gọi là "tự tiến hóa" nếu hệ thống tự sửa policy, tự nâng claim hoặc tự đổi nội dung mà không có validation gate hiển thị. Tự động hóa đúng nghĩa là tự đề xuất dựa trên dữ liệu, sau đó có gate kiểm tra.

## 12. Các claim được phép và bị chặn

| Chủ đề | Được nói | Bị chặn |
|---|---|---|
| Nguồn chương trình | Đã có nguồn chính thức và version để benchmark lớp 1-5 | Đã đảm bảo mọi bài học trong app phủ 100% chuẩn nếu chưa duyệt item |
| Curriculum map | 47/47 topic hiện có đã traceability | Mọi yêu cầu cần đạt của Bộ GDĐT đã có item đủ chất lượng |
| AI tutor | Đã có thiết kế Socratic/hint ladder và cần regression | AI tốt hơn gia sư/giáo viên |
| Adaptive learning | Có engine và dữ liệu nội bộ bước đầu | Adaptive đã tối ưu bằng cohort thật |
| Parent dashboard | Có dashboard và mission | Phụ huynh chỉ nhìn dashboard là cải thiện chắc chắn |
| Hiệu quả học tập | Sẵn sàng thiết kế pilot | Tăng điểm, tăng năng lực, vượt đối thủ khi chưa có pre/post/retention |
| Software deploy | Build/test/deploy live thành công | Production-grade nếu chưa có E2E, accessibility và monitoring |

## 13. Áp dụng vào bối cảnh Việt Nam và BVBD

### Việt Nam

- Scope chương trình phải theo Bộ GDĐT trước, đặc biệt lớp 1-5.
- Năm học 2026-2027 phải được coi là một mốc version nguồn, không được để nội dung đứng yên.
- Tiếng Việt và Toán là nền học tập đầu tiên; Ngoại ngữ 1 bắt buộc từ lớp 3; lớp 1-2 nếu học tiếng Anh thì ghi là enrichment/tự chọn.
- Những nhóm như Đạo đức, Nghệ thuật, Hoạt động trải nghiệm, Giáo dục thể chất không nên bị ép thành trắc nghiệm thuần.

### BVBD

Nếu Henry được vận hành trong hệ sinh thái cá nhân của BS. Long/BVBD như một mô hình quản trị chất lượng phần mềm giáo dục:

- Dùng tư duy "căn cứ - yêu cầu - giải pháp - chỉ số - nguồn số liệu - trách nhiệm".
- Không đưa dữ liệu người bệnh vào Henry.
- Không dùng Henry như công cụ y tế hoặc tư vấn lâm sàng.
- Khi có dữ liệu trẻ em/phụ huynh, cần privacy review riêng trước mọi tuyên bố tuân thủ pháp lý.
- Mọi báo cáo mạnh phải có file, ngày, gate, run/test/deploy hoặc dữ liệu pilot đi kèm.

## 14. Roadmap ưu tiên sau file này

| Rank | Việc tiếp theo | Vì sao đứng trước | Gate xong |
|---:|---|---|---|
| 1 | AI tutor rubric và 50 scenario regression | AI là lõi khác biệt và rủi ro lớn nhất | Test chặn làm hộ, test hỏi gợi mở, test phân loại sai lầm |
| 2 | Weekly RCA/PDCA outcome loop | Biến dữ liệu thành cải tiến thật | Top mistake -> parent mission -> recheck 7 ngày |
| 3 | Privacy evidence panel | Sản phẩm cho trẻ cần minh bạch dữ liệu | Data inventory, purpose, retention, export/delete |
| 4 | Human review queue | Muốn claim phủ chuẩn phải có người duyệt | Đã có queue/RCA/PDCA; cần reviewerId, approvedAt, block reason thật |
| 5 | Diagnostic warm-start lớp 1 | Cá nhân hóa cần baseline | Diagnostic Toán/Tiếng Việt, confidence, plan 7 ngày |
| 6 | Playwright/WCAG smoke CI | UI live phải kiểm được thật | Desktop/mobile smoke, focus, no blank page |
| 7 | Pilot evidence pack 4 tuần | Muốn claim hiệu quả phải có dữ liệu thật | consent, pre/post, retention, cohort report |

## 15. Kết luận vận hành

File này giúp Henry có nền móng "transparent by design": mỗi tính năng phải có yêu cầu, căn cứ, nguồn, mức tin cậy, diễn giải, workflow, dữ liệu, gate và giới hạn claim.

Đích gần hạn không phải là nâng điểm bằng câu chữ. Đích đúng là nâng từng lane theo SOT để có:

- 100% traceability nguồn và yêu cầu cho tính năng đang có.
- 100% no-overclaim cho claim mạnh.
- 100% deploy discipline sau mỗi nâng cấp.
- Evidence thật trước khi nói 100% hiệu quả học tập.

## 16. Ledger triển khai theo SOT

Cập nhật sau đợt nâng cấp full-stack ngày 2026-04-30:

| Rank SOT | Lane | Trạng thái sau nâng cấp | Bằng chứng trong repo/live | Claim được phép |
|---:|---|---|---|---|
| 1 | AI tutor rubric và 50 scenario regression | Đã triển khai nội bộ và live UI điều hành | `src/lib/ai/tutor-rubric.ts`, `__tests__/ai-tutor-rubric.test.ts`, `/parent/sot` | Có regression guardrail nội bộ theo SOT |
| 2 | Weekly RCA/PDCA outcome loop | Đã triển khai engine và dashboard phụ huynh | `src/lib/evidence/weekly-pdca.ts`, `__tests__/weekly-pdca.test.ts`, `/parent/dashboard` | Có vòng observe/RCA/plan/recheck không bịa delta |
| 3 | Privacy evidence panel | Đã triển khai inventory và UI phụ huynh | `src/lib/privacy/privacy-evidence.ts`, `__tests__/privacy-evidence.test.ts`, `/parent/settings` | Có privacy evidence inventory local-first |
| 4 | Human review queue | Đã triển khai control plane và live UI | `src/lib/curriculum/review-queue.ts`, `__tests__/curriculum-review-queue.test.ts`, `/parent/review-queue` | Có workflow duyệt nội dung, RCA/PDCA và release gate nội bộ |
| 5 | Diagnostic warm-start lớp 1 | Lane tiếp theo | Còn trong roadmap theo SOT | Chỉ được nói đã đặc tả |
| 6 | Playwright/WCAG smoke gate | Chưa triển khai | Còn trong roadmap | Chưa claim production-grade/WCAG conformant |
| 7 | Pilot evidence pack 4 tuần | Chưa có dữ liệu thật | Bị chặn bởi evidence | Không claim hiệu quả học tập |

Điểm P0 readiness có thể tăng vì bốn lane kỹ thuật đã có code/test/UI. Điểm hiệu quả học tập không được nâng nếu chưa có pilot có consent, pre-test, post-test, retention, attrition và phân tích cohort.
