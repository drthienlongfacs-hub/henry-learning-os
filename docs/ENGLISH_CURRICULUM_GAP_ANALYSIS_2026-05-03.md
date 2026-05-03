# English curriculum gap analysis - 2026-05-03

## Kết luận

Không nên gọi đây là giáo trình chính thức của một trường cụ thể ở TP.HCM nếu chưa có kế hoạch giáo dục nhà trường, tên bộ sách trường chọn và lịch học thật của Henry. Nhưng app đã được nâng lên để học thực tế theo ba lớp đối chiếu:

- Bộ GDĐT: lớp 1-2 là làm quen/tự chọn, chuẩn bị cho Tiếng Anh chính thức từ lớp 3.
- Sở GDĐT TP.HCM: chương trình tích hợp theo Đề án 5695 áp dụng lớp 1-5, 8 tiết/tuần gồm Tiếng Anh, Toán, Khoa học.
- Hệ quốc tế: Cambridge Primary English as a Second Language, Cambridge Young Learners, Common Core foundational reading và Australian-style phonics/reading.

## Gap đã phát hiện

| Gap | Bằng chứng repo trước vá | Rủi ro |
|---|---|---|
| Unit SGK lớp 1-2 có dữ liệu nhưng không sinh bài | `generateUnitExercises()` chỉ có gradeMap lớp 3-5 | Bấm Unit lớp 1-2 có thể rơi vào rỗng/fallback, không phải học thật |
| Topic quốc tế sinh theo category, chưa khóa đúng topic | `generateEnglishSet()` gọi `generateInternationalExercises(grade, category)` | Chọn một topic có thể ra bài topic khác cùng category |
| Traceability thiếu các Unit SGK và topic quốc tế | `PRIMARY_CURRICULUM_TOPIC_MAP` chỉ có core topic | Không thể nói mỗi bài có nguồn/curriculum map đầy đủ |
| Parent UI chưa giải thích Bộ/Sở/quốc tế | `/child/learn` chỉ hiển thị số nguồn và benchmark chung | Phụ huynh khó biết lớp 1-2 là tự chọn, tích hợp TP.HCM là 8 tiết/tuần |

## Nâng cấp đã làm

| Surface | Thay đổi |
|---|---|
| `src/lib/content/english-unit-generator.ts` | Bổ sung gradeMap lớp 1 và lớp 2 để Unit SGK sinh bài thật |
| `src/lib/content/english-intl-generator.ts` | Thêm `generateInternationalTopicExercises()` để topic quốc tế sinh đúng topicKey |
| `src/lib/content/english-generator.ts` | Route bài SGK và quốc tế qua generator đúng topic |
| `src/data/primary-curriculum-map.ts` | Sinh map cho toàn bộ Unit SGK lớp 1-5, phonics, grammar, reading, sight words |
| `src/data/learning-benchmark-system.ts` | Sinh blueprint cho toàn bộ Unit và topic quốc tế |
| `src/data/curriculum-enrichment.ts` | Bổ sung nguồn Bộ GDĐT lớp 1-2, TP.HCM Đề án 5695, Cambridge ESL, Cambridge Young Learners |
| `src/app/child/learn/page.tsx` | Thêm panel phụ huynh: Bộ, Sở, quốc tế, guardrail chưa claim giáo trình trường cụ thể |

## Ghi chú tích hợp sau khi rebase Antigravity

Trong lúc chuẩn bị push, remote `main` có thêm topic Toán, Tiếng Việt, Tự nhiên - Xã hội và Đạo đức. Các generator mới này chưa có đủ curriculum map/blueprint nên full test fail. Đã bổ sung traceability cho 15 topic mới để không làm hệ thống rơi vào trạng thái có bài sinh ra nhưng thiếu chuẩn đối chiếu, thiếu blueprint hoặc thiếu audit map.

## Nguồn đối chiếu chính

- Bộ GDĐT: Chương trình làm quen tiếng Anh lớp 1-2 chuẩn bị cho học Tiếng Anh chính thức từ lớp 3 và tổ chức trên cơ sở tự nguyện của học sinh, phụ huynh.
- Sở/Phòng GDĐT TP.HCM: hướng dẫn chuyên môn nêu chương trình tích hợp theo Quyết định 5695 cho lớp 1-5, 8 tiết/tuần gồm Tiếng Anh 4, Toán 2, Khoa học 2.
- Cambridge International: Primary English as a Second Language có năm mạch Reading, Writing, Use of English, Listening, Speaking.
- Cambridge English: Young Learners gồm Pre A1 Starters, A1 Movers, A2 Flyers như mốc tiến bộ nhẹ nhàng.

## Guardrail

Đã đủ để học và kiểm tra thực hành trong app. Chưa được claim 100% là giáo trình của một trường TP.HCM cụ thể nếu chưa nhập kế hoạch giáo dục nhà trường và danh mục tài liệu trường đang dùng.
