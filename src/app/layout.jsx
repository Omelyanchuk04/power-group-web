import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import Header from "@/components/layout/Header"; // Підключаємо нашу шапку

// Налаштування шрифтів
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Налаштування SEO для ВІН ПАУЕР ГРУП
export const metadata = {
  title: "ВІН ПАУЕР ГРУП | Ваша енергетична стабільність",
  description:
    "Електромонтажні роботи, сонячні станції та системи резервного живлення під ключ.",
};

export default function RootLayout({ children }) {
  return (
    // Змінюємо мову на українську
    <html lang="uk" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {/* Додаємо наш Header, щоб він був на кожній сторінці */}
        <Header />

        {/* Обгортаємо весь контент і робимо відступ на висоту шапки (80px) */}
        <main>{children}</main>
      </body>
    </html>
  );
}
