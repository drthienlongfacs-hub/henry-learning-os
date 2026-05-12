import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DataErrorBoundary } from "@/components/DataErrorBoundary";
import { PWARegister } from "@/components/PWARegister";
import { OfflineBanner, InstallPrompt } from "@/components/PWAComponents";

export const metadata: Metadata = {
  title: "Henry Learning OS — Hệ thống học tập cá nhân hóa",
  description: "Ứng dụng học tập cá nhân hóa cho trẻ em từ 6-18 tuổi. AI đóng vai giáo viên, bạn học, huấn luyện viên. Đo tiến bộ thật, không đo thời gian dùng app.",
  manifest: "/henry-learning-os/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HenryOS",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        <link rel="apple-touch-icon" href="/henry-learning-os/icons/icon-192.png" />
      </head>
      <body className="bg-[var(--color-bg-warm)] text-[var(--color-text-primary)] antialiased">
        <OfflineBanner />
        <DataErrorBoundary>
          {children}
        </DataErrorBoundary>
        <InstallPrompt />
        <PWARegister />
      </body>
    </html>
  );
}
