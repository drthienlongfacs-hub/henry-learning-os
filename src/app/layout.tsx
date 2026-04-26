import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Long Learning OS — Hệ thống học tập cho Henry",
  description: "Ứng dụng học tập cá nhân hóa cho trẻ em từ 6-18 tuổi. AI đóng vai giáo viên, bạn học, huấn luyện viên. Đo tiến bộ thật, không đo thời gian dùng app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[var(--color-bg-warm)] text-[var(--color-text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}
