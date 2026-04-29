# Henry Learning OS - Full-stack competitive benchmark

Ngày cập nhật: 2026-04-29

## Kết luận ngắn

Henry Learning OS đã vượt mức "display demo" ở các phần: AI gia sư, mastery/adaptive, dashboard bằng chứng, safety settings, static build và GitHub Pages. Điểm cạnh tranh nội bộ hiện là **56/100** theo scorecard có trọng số.

Không được claim hiệu quả học tập, tăng điểm, hoặc vượt phần mềm khác cho đến khi có dữ liệu người học thật: pre-test, post-test, retention sau 7 ngày, time-on-task, lỗi tái phát và phân tích cohort.

## Đối thủ benchmark

| Nhóm chuẩn | Tín hiệu lấy làm chuẩn | Hàm ý cho Henry |
|---|---|---|
| Khanmigo / Khan Academy | AI tutor gợi mở, đa môn, gắn hệ bài học | AI gia sư phải hỏi ngược, sửa lỗi tư duy và ghi log học thật |
| IXL / DreamBox | Chẩn đoán liên tục, đường học thích ứng | Attempt, lỗi sai, mức gợi ý và lịch ôn phải điều khiển bài tiếp theo |
| Duolingo ABC / Beast Academy | Phiên học ngắn, nội dung sâu, dashboard phụ huynh | Trẻ nhỏ cần nhịp học ngắn nhưng trẻ mạnh cần stretch task |
| Zearn / ST Math / EEF | Báo cáo vận hành, evidence ngoài, metacognition | Cần pilot thực nghiệm trước khi nói về hiệu quả |

## Scorecard

| Dimension | Weight | Henry | Gap chính | Gate tiếp theo |
|---|---:|---:|---|---|
| AI gia sư và sửa lỗi tư duy | 15% | 6.4/10 | Chưa có rubric hội thoại | 50 kịch bản tutor regression |
| Chẩn đoán và thích ứng học thật | 14% | 6.1/10 | Chưa có diagnostic đầu vào | Diagnostic 12-15 phút theo môn |
| UI/UX học ngắn và bền | 10% | 6.2/10 | Chưa có Playwright/Lighthouse mobile | Smoke test visual mobile |
| Độ sâu chương trình | 11% | 6.3/10 | Item bank chưa calibration | Review 3 mạch lõi lớp 1-3 |
| Dashboard phụ huynh | 11% | 5.7/10 | Chưa có mục tiêu tuần và export | Weekly outcome loop |
| Hiệu quả học tập có bằng chứng | 14% | 3.2/10 | Chưa có cohort/pre-post/retention | Pilot 4 tuần |
| Safety/privacy | 10% | 6.0/10 | Chưa có privacy status panel | Consent và data-retention checklist |
| Hạ tầng dữ liệu | 9% | 4.6/10 | Local-only, chưa có cohort analytics | Analytics export schema |
| Build/test/deploy | 6% | 7.0/10 | Chưa có E2E CI | Playwright smoke trong CI |

## Roadmap đúng trọng tâm

1. **Pilot evidence pack 4 tuần**: pre/post, retention sau 7 ngày, time-on-task, lỗi tái phát, cohort dashboard.
2. **Diagnostic warm-start theo môn**: xác định level ban đầu và kế hoạch 7 ngày bằng dữ liệu bài làm.
3. **AI tutor rubric**: đo hỏi gợi mở, phát hiện misconception, không làm hộ, có phản tư.
4. **Parent weekly outcome loop**: mỗi tuần có mục tiêu, việc phụ huynh, bằng chứng hoàn thành và thay đổi accuracy/retention.

## Nguồn

- Khanmigo: https://blog.khanacademy.org/ai-tutor-tutoring-khanmigo-kl/
- IXL Real-Time Diagnostic: https://www.ixl.com/benchmark/info
- DreamBox adaptivity: https://dreamboxlearning.zendesk.com/hc/en-us/articles/27281596241043-DreamBox-Math-Continuous-Assessment-Adaptivity
- Duolingo ABC: https://play.google.com/store/apps/details?hl=en_US&id=com.duolingo.literacy
- Beast Academy Online: https://beastacademy.com/online
- Zearn reporting suite: https://help.zearn.org/hc/en-us/articles/29008224450967-Zearn-reporting-suite
- ST Math - Evidence for ESSA: https://www.evidenceforessa.org/program/st-math-spatial-temporal-math/
- EEF metacognition and self-regulation: https://educationendowmentfoundation.org.uk/news/updated-eef-guide-to-metacognition-and-self-regulation
