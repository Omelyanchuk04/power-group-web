import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
  /* 🔥 ВИДАЛЕНО themeColor ТА СТАРИЙ viewport ЗВІДСИ, БО ВОНИ ЗРОБИЛИ ЧОРНУ СМУГУ */
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover", // Магія, що пускає сайт під камеру
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* 🔥 ГАРАНТОВАНИЙ МЕТА-ТЕГ ДЛЯ SAFARI */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
          suppressHydrationWarning
        />

        {/* 🔥 ВИДАЛЕНО ТЕГИ APPLE (apple-mobile-web-app-capable), 
            БО ВОНИ ЛАМАЛИ ВІДОБРАЖЕННЯ В ЗВИЧАЙНОМУ БРАУЗЕРІ */}

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
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
