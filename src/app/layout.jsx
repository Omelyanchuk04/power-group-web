import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import ClientLayout from "@/components/layout/ClientLayout"; // 🔥 Головний клієнтський компонент

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ВІН ПАУЕР ГРУП | Ваша енергетична стабільність",
  description:
    "Електромонтажні роботи, сонячні станції та системи резервного живлення під ключ.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          href="/frames/frame-001.jpg"
          as="image"
          fetchPriority="high"
        />
        <link rel="preload" href="/frames/frame-002.jpg" as="image" />
        <link rel="preload" href="/frames/frame-003.jpg" as="image" />
        <link rel="preload" href="/frames/frame-004.jpg" as="image" />
        <link rel="preload" href="/frames/frame-005.jpg" as="image" />
      </head>
      {/* Body залишаємо як flex-контейнер для підтримки sticky-footer, 
         хоча основна логіка тепер всередині ClientLayout 
      */}
      <body
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
