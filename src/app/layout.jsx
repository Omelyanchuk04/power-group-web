import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import ClientLayout from "@/components/layout/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata = {
  metadataBase: new URL("https://vinpowergroup.com"),
  title: {
    default: "ВІН ПАУЕР ГРУП | Ваша енергетична стабільність",
    template: "%s | ВІН ПАУЕР ГРУП", // Автоматично підставлятиме назву компанії на інших сторінках (напр. "Про нас | ВІН ПАУЕР ГРУП")
  },
  description:
    "Професійні електромонтажні роботи, встановлення сонячних електростанцій (СЕС) та систем резервного живлення під ключ у Вінниці та по всій Україні.",
  keywords: [
    "електромонтажні роботи",
    "сонячні станції",
    "резервне живлення",
    "СЕС",
    "ВІН ПАУЕР ГРУП",
    "електромонтаж Вінниця",
    "сонячні панелі Україна",
    "енергетична незалежність",
  ],
  alternates: {
    canonical: "/", // Вказує Google, що це головна і єдина правильна версія сайту (захист від дублів)
  },
  openGraph: {
    title: "ВІН ПАУЕР ГРУП | Ваша енергетична стабільність",
    description:
      "Електромонтажні роботи, сонячні станції та системи резервного живлення під ключ.",
    url: "https://vinpowergroup.com",
    siteName: "ВІН ПАУЕР ГРУП",
    images: [
      {
        url: "/og-image.jpg", // Спеціальна картинка для соцмереж
        width: 1200,
        height: 630,
        alt: "ВІН ПАУЕР ГРУП - Сонячні станції та електромонтаж",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ВІН ПАУЕР ГРУП",
    description:
      "Електромонтажні роботи, сонячні станції та системи резервного живлення під ключ.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#f5f5f5",
};

// Мікророзмітка для локального бізнесу (допомагає Google зрозуміти, що ви реальна компанія)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ТОВ «ВІН ПАУЕР ГРУП»",
  image: "https://vinpowergroup.com/og-image.jpg",
  url: "https://vinpowergroup.com",
  telephone: "+380672671477",
  address: {
    "@type": "PostalAddress",
    streetAddress: "вул. Київська",
    addressLocality: "Вінниця",
    addressCountry: "UA",
  },
  description:
    "Електромонтажні роботи, сонячні станції та системи резервного живлення під ключ.",
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
      </head>
      <body suppressHydrationWarning>
        {/* Вставка мікророзмітки невидима для людей, але її читає Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
