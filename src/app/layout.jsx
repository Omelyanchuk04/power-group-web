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
};

// 🔥 САМЕ ЦЕЙ БЛОК РОБИТЬ МАГІЮ "ВЕСЬ ЕКРАН"
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Забороняємо зум, щоб сайт поводився як додаток
  viewportFit: "cover", // ЗАЛАЗИТИ ПІД ЧОЛКУ І ПІД ПАНЕЛІ
  themeColor: "#000000", // Фарбує статус-бар (де годинник і батарея) в колір відео
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* ❌ ТУТ НЕ ПОВИННО БУТИ <meta name="viewport" ... /> */}
        {/* ❌ ТУТ НЕ ПОВИННО БУТИ <meta name="theme-color" ... /> */}

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
