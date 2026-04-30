# Henry Learning OS - Product foundation spec

Ngày cập nhật: 2026-04-30

## Kết luận nền móng

Henry Learning OS được định vị là **Family-first Learning Evidence OS**: một hệ điều hành học tập cá nhân cho Henry từ lớp 1 đến 18 tuổi, trong đó AI giúp con suy nghĩ sâu hơn, ba mẹ đồng hành bằng nhiệm vụ ngắn và mọi claim mạnh đều đi qua evidence gate.

Nền móng hiện đạt **94/100 P0 readiness**: đã chốt định vị, curriculum traceability lớp 1-5, no-overclaim gate, quy trình deploy live, AI tutor regression 50 scenario, privacy evidence panel, RCA/PDCA tuần theo số liệu local, human review queue cho item lớp 1-5, diagnostic warm-start lớp 1 và Playwright/WCAG smoke gate cho route live. Còn thiếu gate trưởng thành về reviewer decisions thật, calibration, diagnostic validation cohort, cohort/pilot thật, monitoring live và accessibility audit sâu.

Không được nâng điểm benchmark lên 100/100 chỉ vì đã có trang UI hoặc nguồn tham khảo. 100/100 chỉ mở khi có review người thật, calibration độ khó, pilot outcome, production monitoring, rollback drill và accessibility audit sâu.

## Căn cứ đã kiểm tra

| Nguồn | Vai trò trong foundation |
|---|---|
| `/Users/mac/Documents/app cho henry/Henry learning super app.docx` | Blueprint sản phẩm 6-18 tuổi: 5 layer, AI không làm hộ, data-driven system, AI safety, 20 must-have features |
| `/Users/mac/Downloads/long_learning_os_dev_handoff_resource_fullstack.zip` | Handoff kỹ thuật 38 file: PRD, feature spec, architecture, policies, benchmark, schema, backlog |
| `docs/dev-handoff/docs/PRD.md` | Family-first vision, non-goals, product pillars, MVP scope, acceptance criteria |
| `docs/dev-handoff/architecture/ARCHITECTURE.md` | Child app, parent app, AI orchestration, learning engine, content engine, data layer |
| `docs/FULLSTACK_COMPETITIVE_BENCHMARK_2026-04-29.md` | Scorecard 60/100, đường lên 100, scope tiểu học, item traceability và no-overclaim |
| `src/data/primary-curriculum-map.ts` | 59 topic lớp 1-5 đã map tới môn, lớp, mạch nội dung, ví dụ nhiệm vụ và evidence fields |

Nguồn chuẩn dùng để benchmark foundation:

- Bộ GDĐT - Chương trình GDPT 2018: https://moet.gov.vn/tintuc/pages/tin-hoat-dong-cua-bo.aspx?ItemID=5755
- Thông tư 17/2025/TT-BGDĐT: https://moet.gov.vn/van-ban/vanban/Pages/chi-tiet-van-ban.aspx?ItemID=1600
- Bộ GDĐT - phạm vi giáo dục tiểu học: https://moet.gov.vn/tintuc/Pages/CT-GDPT-Moi.aspx?ItemID=5756
- EEF metacognition and self-regulation: https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation
- What Works Clearinghouse standards: https://ies.ed.gov/ncee/WWC/Handbooks
- ISO/IEC 25010:2023 product quality model: https://www.iso.org/standard/78176.html
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- UNICEF policy guidance on AI and children: https://www.unicef.org/innocenti/reports/policy-guidance-ai-children
- COPPA: https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa
- FERPA: https://studentprivacy.ed.gov/ferpa

## Định vị sản phẩm

**Tên:** Henry Learning OS

**Category:** Family-first Learning Evidence OS

**One-line:** Giúp Henry trở thành người tự học suốt đời, biết dùng AI để suy nghĩ sâu hơn, không dùng AI để làm hộ.

**Primary user:** Henry sinh năm 2020, bắt đầu lớp 1 năm 2026 tại TP.HCM; phụ huynh là mentor và người quan sát.

**Không phải:**

- Không phải chatbot tự do cho trẻ dưới 13 tuổi.
- Không phải app luyện điểm, giữ streak hoặc bảng xếp hạng công khai.
- Không phải công cụ làm bài hộ, viết văn hộ hoặc thay giáo viên/phụ huynh.
- Không phải mạng xã hội hoặc nền tảng khai thác dữ liệu trẻ em.
- Không phải bằng chứng hiệu quả học tập khi chưa có cohort, pre/post và retention thật.

## Bảy kernel nền móng

| Kernel | Mục đích | Gate còn thiếu |
|---|---|---|
| Curriculum kernel | Biến chương trình lớp 1-5 thành topic/item/evidence có source version | Reviewer decisions thật, approved item bank, difficulty calibration |
| Learning science kernel | Biến retrieval, spaced repetition, feedback, metacognition thành hành vi sản phẩm | Rubric explanation quality, retention dashboard, transfer task coverage |
| AI orchestration kernel | Điều phối AI theo role an toàn: tutor, classmate, coach, examiner, parent assistant, safety guardian | 50 scenario tutor regression, rubric không làm hộ, post-check chất lượng |
| Evidence data kernel | Thu dữ liệu vừa đủ để chạy RCA/PDCA: attempt, lỗi, hint, retention, transfer, parent observation | Cohort export, pre/post/retention protocol, weekly PDCA loop |
| Parent co-learning kernel | Biến phụ huynh thành mentor bằng hành động ngắn, đo lại được | Weekly outcome delta, parent observation rubric, export report |
| Child safety/privacy kernel | Data minimization, parent-visible audit, không dark pattern, không emotional dependency | Consent checklist, retention/delete UI, privacy event audit panel |
| Software quality kernel | Typed data, tests, build/deploy gate, accessibility, maintainability | WCAG audit sâu, production monitoring, rollback drill |

## Requirements P0/P1/P2

| ID | Priority | Trạng thái | Yêu cầu | Gate tiếp theo |
|---|---:|---|---|---|
| P0-positioning | P0 | Implemented | Chốt Henry Learning OS là Family-first Learning Evidence OS | Mọi trang chính link về foundation |
| P0-curriculum-traceability | P0 | Implemented | Mỗi topic/item truy vết được chương trình, source version, evidence | Review queue và khóa item thiếu metadata |
| P0-no-overclaim | P0 | Implemented | Claim mạnh phải qua evidence gate | Mở rộng test no-overclaim sang foundation UI |
| P0-release-gate | P0 | Implemented | TypeScript, test, lint, build, Playwright smoke, commit, push, Actions success, live verification | Live monitoring và rollback drill |
| P0-ai-socratic-safety | P0 | Implemented | AI hỏi gợi mở, không làm hộ, có audit | Pilot hội thoại thật với trẻ/phụ huynh |
| P0-real-evidence-engine | P0 | Partial | Quyết định dựa trên attempt/lỗi/hint/retention/transfer thật | Pilot evidence pack 4 tuần |
| P0-child-privacy | P0 | Implemented | Data tối thiểu, parent control, export/delete local, không ads/tracking | Legal/backend review trước claim tuân thủ |
| P0-data-driven-pdca | P0 | Implemented | Observe-score-recommend-validate, không self-modification mơ hồ | Lưu plan/follow-up qua nhiều tuần |
| P1-diagnostic-warm-start | P1 | Implemented | Chẩn đoán 12-15 phút theo môn để đặt level ban đầu | Lưu diagnostic session và validation cohort |
| P1-review-queue | P1 | Implemented | Hàng đợi duyệt item với reviewer metadata | ReviewerId/approvedAt/blockReason thật và calibration |
| P1-weekly-outcome-loop | P1 | Implemented | Mục tiêu tuần, hành động phụ huynh, đo lại sau 7 ngày | Cohort/export cho pilot |
| P1-accessibility-quality | P1 | Implemented | Smoke visual mobile, keyboard/focus, target size theo WCAG 2.2 | Visual diff, axe/WCAG audit sâu và monitoring live |
| P2-whole-child-portfolio | P2 | Spec ready | Portfolio 12 năm gồm đọc, viết, dự án, coding, reflection | Portfolio schema và page đầu tiên |

## SOT control plane

SOT integrity hiện là **100/100** ở nghĩa hẹp: mọi lane nâng cấp trong queue đều có sourceIds, target requirement, target feature, implementation scope, done definition, evidence gate, deploy gate và anti-overclaim. Đây không phải điểm hiệu quả học tập.

Thứ tự nguồn bắt buộc:

1. Người dùng và local blueprint: mục đích, ràng buộc gia đình, DOCX và ZIP handoff.
2. Repo SOT: PRD, architecture, benchmark, curriculum map, product foundation data.
3. Nguồn chính thức: Bộ GDĐT, chuẩn phần mềm, chuẩn accessibility, chuẩn AI/privacy.
4. Learning science và evidence standard: EEF, WWC, pilot/cohort/pre-post/retention.
5. Code reality: TypeScript types, tests, build output, GitHub Actions, live URL.

Protocol bắt buộc:

1. Observe: đọc dữ liệu/source hiện có, không suy luận từ tên file.
2. Cite: mỗi quyết định phải có sourceIds và file/source locator rõ.
3. Decide: chọn lane có rank cao nhất nhưng chưa bị chặn bởi evidence.
4. Implement: sửa phạm vi nhỏ, additive, không phá hành vi đang live.
5. Verify: chạy TypeScript, test liên quan, lint, full Vitest và build khi thay UI/data.
6. Deploy: commit, push main, theo dõi Pages success, kiểm tra URL live.
7. Recheck: không nâng claim nếu gate evidence chưa đủ.

### Implementation queue từ SOT

| Rank | Lane | Trạng thái | Căn cứ chính | Done definition tóm tắt |
|---:|---|---|---|---|
| 1 | AI tutor rubric và 50 scenario regression | Đã triển khai live | DOCX, PRD, Khanmigo, NIST AI RMF, UNICEF | 50 scenario, rubric Socratic, test không làm hộ |
| 2 | Weekly RCA/PDCA outcome loop | Đã triển khai live | Benchmark, EEF, WWC, Zearn, DOCX | Weekly issue, parent action, recheck 7 ngày, no fake delta |
| 3 | Privacy evidence panel | Đã triển khai live | UNICEF, COPPA, FERPA, NIST AI RMF | Data inventory, purpose, retention, export/delete status |
| 4 | Human review queue | Đã triển khai live | Bộ GDĐT, curriculum map, benchmark | reviewer metadata, block reason, release gate |
| 5 | Diagnostic warm-start lớp 1 | Đã triển khai live | IXL, DreamBox, CTGDPT, curriculum map | diagnostic Toán/Tiếng Việt, confidence, 7-day plan |
| 6 | Playwright/WCAG smoke gate | Đã triển khai live | ISO 25010, WCAG 2.2, architecture | 8 route x 2 viewport, route text, focus, target-size, no blank page |
| 7 | Pilot evidence pack 4 tuần | Sẵn sàng triển khai | WWC, EEF, Zearn, benchmark | consent, pre/post, retention, cohort dashboard |

Sáu lane đầu theo SOT đã được triển khai nội bộ: **AI tutor rubric và 50 scenario regression**, **Weekly RCA/PDCA outcome loop**, **Privacy evidence panel**, **Human review queue cho item lớp 1-5**, **Diagnostic warm-start lớp 1**, **Playwright/WCAG smoke gate**. Lane tiếp theo theo SOT là **Pilot evidence pack 4 tuần**. Không được nhảy sang tính năng hấp dẫn hơn nếu chưa ghi rõ vì sao bỏ qua rank 7.

## Hai mươi must-have feature

Hiện trạng coverage thực thi/partial là **16/20 = 80/100**.

| Feature | Trạng thái | Bề mặt hiện có |
|---|---|---|
| Child profile | Implemented | Onboarding và store |
| Competency map 6-18 | Partial | Mastery states và map lớp 1-5 |
| Diagnostic baseline | Implemented | Diagnostic warm-start Toán/Tiếng Việt lớp 1, confidence và kế hoạch 7 ngày |
| AI Socratic tutor | Implemented | Tutor engine, role policy, hint ladder |
| Hint ladder | Implemented | Session practice và `hintLevelUsed` |
| Mistake notebook | Implemented | Mistake store/UI |
| Mastery checkpoint | Partial | Mastery states và independent challenge |
| Spaced repetition | Implemented | SM-2 scheduler, review cards |
| Retrieval practice | Partial | Review step và challenge |
| Reading buddy | Partial | Reading journal |
| Writing coach | Spec ready | Có spec, chưa có module |
| English roleplay | Spec ready | Có lessons, chưa có roleplay mature |
| Math reasoning analyzer | Partial | Error type và math topic map |
| Project builder | Spec ready | Có roadmap/spec |
| Coding and AI literacy | Partial | Computing topics và safety policy |
| Reflection journal | Implemented | Reflection store/session |
| Parent dashboard | Implemented | Dashboard phụ huynh live |
| Daily parent mission | Implemented | Parent missions |
| Portfolio vault | Spec ready | Một phần artifact qua reading/reflection |
| Safety audit and parent control | Implemented | Safety settings, AI logs và privacy evidence panel |

## Claim gates

| Gate | Trạng thái | Được nói | Không được nói |
|---|---|---|---|
| Source foundation | Passed | Có nền tảng nguồn nội bộ và nguồn chuẩn | Không nói nguồn đủ để chứng minh hiệu quả |
| Curriculum traceability | Passed | Topic/item đang có có đường truy vết lớp 1-5 | Không nói item bank đã được duyệt/calibration xong |
| No-overclaim | Passed | Có guardrail không claim khi thiếu dữ liệu thật | Không nói tăng điểm hoặc vượt đối thủ |
| AI tutor quality | Passed | Có AI tutor/hint ladder và regression guardrail 50 scenario | Không nói đã benchmark chất lượng với trẻ thật |
| Adaptive evidence | Partial | Có local data và adaptive engine | Không nói adaptive đã tối ưu bằng cohort |
| Learning efficacy | Blocked | Chỉ nói sẵn sàng thiết kế pilot | Cấm claim tăng điểm, effect size, vượt ST Math/IXL/Khanmigo |
| Production quality | Partial | Có TypeScript/test/lint/build/deploy gate và Playwright smoke 8 route x 2 viewport | Không nói production-grade khi thiếu monitoring, rollback drill và accessibility audit sâu |

## RCA/PDCA thật cần xây tiếp

Vòng tối thiểu:

1. Observe: lấy top recurring mistake, hint dependency, retention miss hoặc parent observation.
2. RCA: phân loại root cause: chưa hiểu khái niệm, sai quy trình, đọc đề sai, thiếu từ vựng, quá dễ, quá khó, thiếu ngủ/tâm trạng.
3. Plan: chọn một can thiệp nhỏ trong 7 ngày.
4. Do: con học hoặc phụ huynh làm mission.
5. Check: đo lại sau 7 ngày bằng attempt/retention/transfer.
6. Act: giữ, đổi hoặc hạ độ khó; ghi audit trail.

Không được gọi là tự tiến hóa nếu hệ thống tự sửa nội dung, tự nâng claim hoặc tự đổi policy mà không có validation gate hiển thị cho người vận hành.

## Roadmap đúng thứ tự

1. **Pilot evidence pack 4 tuần** trước mọi claim hiệu quả học tập.
2. **Diagnostic persistence và validation** để so baseline với recheck thật.
3. **Reviewer decision persistence và calibration** cho item đã duyệt.
4. **Live monitoring và accessibility audit sâu** trước khi gọi production-grade đầy đủ.
5. **Lưu PDCA plan/follow-up qua nhiều tuần** để chuẩn bị cohort export.
