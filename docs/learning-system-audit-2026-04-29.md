# Learning System Audit - 2026-04-29

## Mục tiêu

Rà soát Henry Learning OS như một hệ học tập cho trẻ có tư duy mạnh hơn tuổi: học sâu, nhớ lâu, tự chủ, không quá trẻ con, có bằng chứng thực nghiệm và benchmark sản phẩm thật.

## Hiện trạng đã xác minh trong mã nguồn

- Entry point trẻ: `/child`, `/child/learn`, `/child/review`, `/child/mistakes`, `/child/reading`, `/child/vocab`, `/child/discover`, `/child/elite`.
- Entry point phụ huynh: `/parent/dashboard`, `/parent/adaptive`, `/parent/analytics`, `/parent/weekly-review`, `/parent/settings`.
- Nội dung sinh bài: `src/lib/content/*-generator.ts`, hiện bao phủ Toán, Tiếng Việt, Tiếng Anh, Khoa học, Lịch sử - Địa lý, Tin học.
- Lớp benchmark đã thêm: `src/data/curriculum-enrichment.ts`, `src/data/learning-benchmark-system.ts`.
- Lớp chẩn đoán chủ đề đã thêm: `src/lib/learning-path-advisor.ts`.
- Lớp nguyên lý học tập đã thêm: `src/data/learning-science-system.ts`.
- Lớp hiệp đồng dashboard đã thêm: `src/lib/whole-child-learning-plan.ts`.

## Evidence-base đang được mã hóa

- Retrieval practice và spacing: IES/WWC, AERO, Dunlosky.
- Worked examples, dual coding, concrete-to-abstract: IES/WWC.
- Metacognition/self-regulation: EEF, Harvard executive function.
- Motivation: Self-Determination Theory, Khan Academy Kids path.
- Universal Design for Learning: CAST UDL.
- Agency/well-being: OECD Learning Compass 2030.
- Safety/child AI: UNICEF, AAP Family Media Plan.

## Benchmark sản phẩm đã đối chiếu

- Khan Academy/Khan Academy Kids: mastery path, learning path, tự học có hỗ trợ.
- IXL: diagnostic path, kỹ năng sẵn sàng học tiếp.
- Beast Academy: độ sâu bài toán và tư duy cho trẻ mạnh.
- Zearn: nhịp bài fluency - concept development - independent practice.
- ST Math: visual problem solving, spatial-temporal reasoning.
- DreamBox: adaptive instruction.
- Duolingo ABC: micro-lesson đọc.
- Scratch/Code.org: create-first computing và lộ trình khoa học máy tính.

## Nâng cấp đã thực hiện trong đợt rà soát này

1. Nối bài làm với lịch ôn:
   - Mỗi attempt có hồ sơ sẽ tạo review competency nếu chưa có review pending.
   - Câu sai tạo mistake và review mistake.

2. Sửa review scheduler:
   - `updateReviewResult` dùng `calculateNextReview`, vì vậy khi trẻ bấm nhớ/quên/cần gợi ý thì lịch ôn tự nhảy mốc.

3. Nâng nội dung review competency:
   - Review competency không còn flashcard mặc định; app dùng topic blueprint để hỏi nhớ lại chủ động, bằng chứng thành thạo và nhiệm vụ nâng cao.

4. Thêm learning science system:
   - 10 nguyên lý: retrieval, spacing, interleaving, dual coding, concrete-abstract, metacognition, adaptive challenge, motivation, executive function, UDL.
   - Mỗi nguyên lý có source, cơ chế app, benchmark và checklist triển khai.

5. Thêm whole-child learning plan:
   - Dashboard hiển thị 4 mạch hiệp đồng: Nhớ lâu, Sửa lỗi, Học sâu, Tự chủ.
   - Mỗi mạch có metric từ dữ liệu local, action tiếp theo, benchmark và nguyên lý học tập.

6. Sửa lỗi adaptive memory key:
   - `src/lib/adaptive/spaced-repetition.ts` trước đó tạo key literal; đã sửa thành key thật theo `childId::exerciseId`.

7. Thêm evidence profile data-driven:
   - `src/lib/evidence/learning-evidence.ts` tính năng lực theo từng chủ đề từ attempts, mistakes và review schedules.
   - Không tạo accuracy khi chưa có bài làm thật; mỗi kết luận có `reliability`, `decision`, `dataQualityNote`, benchmark và guardrail.
   - `/parent/adaptive` dùng dữ liệu thật theo môn để hiển thị số bài, accuracy trung bình, chủ đề cần sửa/luyện/nâng cao và đề xuất phụ huynh.

8. Chuẩn hóa cách trình bày câu hỏi:
   - `src/lib/pedagogy/question-presentation.ts` chuyển mỗi câu hỏi thành quy trình: hiểu đề, dữ kiện/bằng chứng, chiến lược, dự đoán lỗi, tự kiểm và chuyển giao.
   - `/child/learn` hiển thị khung trình bày ngay trước câu hỏi, ghi nhận dùng gợi ý vào `hintLevelUsed`, và đưa lỗi dễ gặp vào feedback.

9. Sửa lỗi dashboard phụ huynh:
   - Sửa progress bar CASEL/WEF bị escape sai chuỗi width.
   - `avgHintLevel` được tính dạng số thay vì so sánh chuỗi.
   - Dashboard phụ huynh thêm link nhanh đến phân tích học thật và tăng tốc.

10. Nâng AI gia sư từ mock/display sang engine có hành vi thật:
   - `src/lib/ai/tutor-engine.ts` tạo lượt gia sư từ câu hỏi, đáp án đúng, đáp án của bé, hint level, evidence profile và question presentation plan.
   - `src/lib/ai/provider.ts` dùng engine mới khi có payload bài tập có cấu trúc; không còn chỉ chọn câu mock theo môn.
   - `/child/learn` ghi nhận AI hint/feedback vào `aiInteractionLogs`, tăng `hintLevelUsed` theo từng lần mở gợi ý, và hiển thị phân tích câu trả lời cụ thể.
   - Guardrail: L1-L4 không đưa đáp án cuối; chỉ định hướng hiểu đề, bằng chứng, chiến lược, bước thử và tự kiểm.

## Ưu tiên nâng tiếp

1. Parent adaptive dashboard cần dùng dữ liệu thật từ attempts/review/mistakes thay vì chờ `skillStates`.
   - Lý do: phụ huynh cần nhìn được hành động hôm nay, không chỉ chỉ số kỹ thuật.
   - Benchmark: IXL teacher dashboard, DreamBox educator insights.

2. `/child/elite` cần refactor để qua full lint và gắn cùng evidence layer.
   - Lý do: đang là module giàu tiềm năng nhưng lint toàn repo báo lỗi React purity/static components.
   - Benchmark: CASEL reflection, OECD agency, Beast Academy-style challenge.

3. Mỗi môn cần thêm activity type ngoài trắc nghiệm:
   - Toán: visual manipulative, explain-your-strategy, compare two solutions.
   - Tiếng Việt/Tiếng Anh: read aloud, evidence highlight, rewrite sentence.
   - Khoa học: claim-evidence-reasoning.
   - Lịch sử - Địa lý: timeline/map reasoning.
   - Tin học: sequence/debug mini-task.

4. Resource adapters cần đi từ discover sang lesson recommendation.
   - Lý do: hiện Open Library/Gutendex là nguồn khám phá; chưa được dùng để đề xuất bài đọc theo mục tiêu học.
   - Guardrail: chỉ dùng metadata/link hoặc nội dung public-domain đã lọc tuổi.

5. Cần event analytics bền hơn:
   - Hiện learning-events store là in-memory; nên đồng bộ vào Zustand/localStorage hoặc parent report.
   - Lý do: muốn đo nhớ lâu/hứng thú phải giữ dấu vết qua phiên.

6. Full repo lint cần được xử lý thành hạng mục riêng:
   - Lỗi tồn đọng ở script CommonJS, `/child/elite`, `BaseDefenseCard`, `session/page.tsx`.
   - Không nên gộp vào một commit nội dung học vì dễ nhiễu review.

## Gate kiểm chứng hiện tại

- `npx tsc --noEmit`
- `npx vitest run`
- Targeted lint các file đã sửa/thêm
- `npm run build`
- Browser smoke test `/child`, `/child/review`, `/child/learn`

## Gate bổ sung cho evidence/profile

- `npx vitest run __tests__/learning-evidence-system.test.ts`
- Kiểm tra bắt buộc: không tự bịa accuracy khi topic chưa có attempts; số attempts/hints/mistakes/reviews phải đếm đúng từ input test.
- `npx vitest run __tests__/ai-tutor-engine.test.ts`
- Kiểm tra bắt buộc: AI tutor phải dùng payload câu hỏi thật, dữ liệu evidence thật, và không lộ đáp án ở hint level thấp.

## Cập nhật benchmark full-stack

Đã bổ sung scorecard cạnh tranh có trọng số tại:

- `src/data/fullstack-competitive-benchmark.ts`
- `src/app/parent/benchmark/page.tsx`
- `docs/FULLSTACK_COMPETITIVE_BENCHMARK_2026-04-29.md`
- `__tests__/fullstack-competitive-benchmark.test.ts`

Kết luận mới: Henry Learning OS có nền sản phẩm thật về AI tutor, adaptive learning, evidence dashboard và deploy live, nhưng chưa đủ điều kiện claim hiệu quả học tập vì thiếu cohort người học thật, pre/post, retention và effect-size analysis.

Gate đã chạy cho phần cập nhật này:

- `npx tsc --noEmit`
- `npx vitest run __tests__/fullstack-competitive-benchmark.test.ts __tests__/learning-evidence-system.test.ts __tests__/ai-tutor-engine.test.ts`
- `npx eslint --quiet src/data/fullstack-competitive-benchmark.ts src/app/parent/benchmark/page.tsx src/app/page.tsx src/app/parent/dashboard/page.tsx __tests__/fullstack-competitive-benchmark.test.ts`
- `npm run build`
