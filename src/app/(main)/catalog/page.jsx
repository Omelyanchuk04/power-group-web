import React from "react";
import CatalogGrid from "./components/CatalogGrid/CatalogGrid";
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";
import GlobalBackground from "@/components/layout/GlobalBackground";
import styles from "./catalog.module.scss";

export const metadata = {
  title: "Каталог обладнання | ВІН ПАУЕР ГРУП",
  description:
    "Професійне силове обладнання: мережеві інвертори, системи накопичення енергії (ESS) та акумулятори для сонячних електростанцій.",
  alternates: {
    canonical: "/catalog", // Вказує пошуковикам, що це головна сторінка каталогу
  },
  openGraph: {
    title: "Каталог обладнання | ВІН ПАУЕР ГРУП",
    description:
      "Мережеві інвертори, системи накопичення, акумулятори та силове обладнання.",
    url: "https://vinpowergroup.com/catalog",
    type: "website",
  },
};

export default function CatalogPage() {
  // 🔥 ДОДАНО: Мікророзмітка типу "Сторінка-колекція" (Каталог)
  const catalogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Каталог обладнання | ВІН ПАУЕР ГРУП",
    description:
      "Мережеві інвертори, системи накопичення, акумулятори та силове обладнання.",
    url: "https://vinpowergroup.com/catalog",
    publisher: {
      "@type": "Organization",
      name: "ВІН ПАУЕР ГРУП",
    },
  };

  return (
    <main className={styles.catalogPageMain}>
      {/* Ін'єкція SEO-розмітки */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }}
      />

      <div className={styles.catalogContentWrapper}>
        <div className={styles.catalogBgWrapper}>
          <GlobalBackground isLayout={false} />
        </div>

        <CatalogGrid />

        <ContactCTA />
      </div>
    </main>
  );
}
