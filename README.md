# Long Learning OS — Hệ thống học tập cho Henry

Ứng dụng học tập cá nhân hóa dựa trên AI, thiết kế cho một đứa trẻ (sinh 2020, bắt đầu lớp 1 năm 2026).

> **Triết lý**: AI không bao giờ làm hộ con — chỉ hướng dẫn con tự suy nghĩ.
> Tuổi là guardrail an toàn, không phải trần học vấn.

## Tính năng chính

### Cho con
- **7-Step Lesson Session**: Check-in cảm xúc → Ôn bài cũ → Kiến thức mới → Luyện tập (có gợi ý L0-L5) → Thử thách độc lập → Con dạy lại → Suy ngẫm
- **AI Gia sư Socratic**: 6 vai trò (Tutor, Classmate, Coach, Examiner, Parent Assistant, Safety Guardian)
- **Sổ lỗi sai**: Phân loại 8 loại lỗi, kế hoạch sửa cho từng lỗi
- **Ôn tập theo khoa học**: SM-2 spaced repetition (0→1→3→7→21→60 ngày)
- **Nhật ký đọc sách**: Ghi lại sách, từ mới, tóm tắt nội dung
- **Adaptive Acceleration**: Challenge Fit Score, tốc độ học, chỉ số phụ thuộc gợi ý

### Cho ba mẹ
- **Dashboard 3 mục**: 1 điểm sáng — 1 lo ngại — 1 hành động
- **Nhiệm vụ hàng ngày**: 10 phút đồng hành cùng con
- **Đánh giá tuần**: Họp gia đình với câu hỏi hướng dẫn
- **Cài đặt an toàn**: Under-13 mode, nhật ký tương tác AI, chính sách dữ liệu
- **Adaptive Dashboard**: Hồ sơ năng lực theo môn, đề xuất tăng tốc/hỗ trợ

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **State**: Zustand + localStorage persistence
- **Icons**: Lucide React
- **AI**: Mock provider (sẵn sàng swap OpenAI/Google)
- **Testing**: Vitest + 86 unit tests

## Quick Start

```bash
# Install
npm install

# Dev server
npm run dev
# → http://localhost:3000

# Run tests (86 tests)
npx vitest run

# Production build
npm run build
```

## Cấu trúc project

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing / Role selection
│   ├── session/            # 7-step lesson session
│   ├── child/              # Child dashboard, mistakes, review, reading
│   └── parent/             # Dashboard, onboarding, settings, weekly-review, adaptive
├── stores/app-store.ts     # Zustand state management
├── types/index.ts          # 18+ TypeScript interfaces
├── data/seed.ts            # Grade 1 Math/Tiếng Việt/Tiếng Anh seed data
└── lib/
    ├── ai/provider.ts      # Mock AI + safety middleware + error classification
    ├── adaptive/engine.ts  # Challenge Fit Score + acceleration engine
    ├── adaptive/compactor.ts # Curriculum compacting + enrichment
    ├── spaced-repetition.ts # SM-2 scheduler
    └── utils.ts            # Helper functions
__tests__/                  # 4 test suites, 86 tests total
```

## An toàn trẻ em

- Under-13: không chat AI tự do, chỉ trong bài học
- Crisis detection: phát hiện từ khóa nguy hiểm → chặn + thông báo
- Audit log: mọi tương tác AI đều ghi metadata
- Dữ liệu chỉ lưu trên thiết bị, không gửi server
- Không quảng cáo, không chia sẻ dữ liệu trẻ em

## Roadmap

- [ ] Kết nối API AI thật (OpenAI / Google Gemini)
- [ ] Database backend (Supabase / SQLite)
- [ ] Progressive Web App (offline support)
- [ ] Thêm môn học: Khoa học, Lịch sử, Âm nhạc
- [ ] Voice input cho trẻ chưa biết đánh máy
- [ ] Multi-child support

## 🛡️ Quyền riêng tư

- **Không thu thập dữ liệu** — toàn bộ lưu trên thiết bị (LocalStorage)
- **Không quảng cáo** — hoàn toàn miễn phí
- **Không cần đăng ký** — sử dụng ngay
- **Under-13 compliant** — không chat AI tự do, chỉ trong bài học

## 📄 Rights

Copyright © 2026 ThS.BS CK2. Lê Trọng Thiên Long. All rights reserved.

Repository này không phát hành theo giấy phép MIT. Nguồn code, UI/UX, chương trình học, adaptive engine và nhận diện thương hiệu được bảo lưu quyền sở hữu, ngoại trừ các thư viện hoặc nguồn dữ liệu open-source của bên thứ ba có giấy phép riêng.

Chi tiết xem tại `COPYRIGHT.md`.

---

**Made with ❤️ for Henry** 🇻🇳
