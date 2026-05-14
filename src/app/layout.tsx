import type { Metadata, Viewport } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { DataErrorBoundary } from "@/components/DataErrorBoundary";
import { PWARegister } from "@/components/PWARegister";
import { OfflineBanner, InstallPrompt } from "@/components/PWAComponents";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

const nunito = Nunito({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-nunito",
});

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
    <html lang="vi" className={`${inter.variable} ${nunito.variable}`}>
      <head>
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
