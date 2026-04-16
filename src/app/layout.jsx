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

// 🔥 ДОДАЙ ЦЕЙ БЛОК:
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover", // Це розтягує сайт на весь екран в Safari
  themeColor: "#000000", // Робить системні панелі темними
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* 🔥 ГАРАНТОВАНИЙ ФІКС ДЛЯ SAFARI ТА БЕЗПЕЧНИХ ЗОН */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#000000" />

        {/* 🔥 ЗМУШУЄМО БРАУЗЕР КРАСТИ ПЕРШІ КАДРИ ОДРАЗУ */}
        <link
          rel="preload"
          href="/frames/frame-001.jpg"
          as="image"
          fetchPriority="high"
        />
        <link rel="preload" href="/frames/frame-002.jpg" as="image" />
        {/* ... твої інші лінки ... */}
      </head>
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
