<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## BVBD/Henry Operational Rule

Sau mỗi đợt nâng cấp đã hoàn tất và vượt gate, phải cập nhật bản live:

1. Chạy gate phù hợp với phạm vi thay đổi, tối thiểu gồm TypeScript, test liên quan, lint liên quan và `npm run build` khi có thay đổi UI/data deploy.
2. Chỉ stage đúng file thuộc phạm vi nâng cấp, không gom thay đổi ngoài luồng.
3. Commit ngắn gọn, nêu rõ phần nâng cấp.
4. Push lên `main` để kích hoạt `.github/workflows/deploy.yml`.
5. Theo dõi GitHub Actions Pages đến trạng thái `success`.
6. Kiểm tra URL live liên quan sau deploy và báo rõ commit, run id, gate đã qua, link live.

Không dùng từ `done`, `all pass`, `release-ready` nếu chưa có gate thật và chưa xác nhận deploy live khi thay đổi cần xuất hiện trên GitHub Pages.
