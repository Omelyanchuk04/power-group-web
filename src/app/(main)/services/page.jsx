import React from "react";
import ServicesHero from "./components/ServicesHero/ServicesHero";
import ServicesGrid from "./components/ServicesGrid/ServicesGrid";
import FAQ from "./components/FAQ/FAQ";
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";
import GlobalBackground from "@/components/layout/GlobalBackground";

import styles from "./services.module.scss";

// 🔥 ДОДАНО: SEO Метадані для пошуковиків та соцмереж
export const metadata = {
  title: "Послуги та рішення | ВІН ПАУЕР ГРУП",
  description:
    "Комплексні рішення з енергопостачання: проєктування та будівництво СЕС, системи резервного живлення, зберігання енергії та професійний електромонтаж під ключ.",
  alternates: {
    canonical: "https://vinpowergroup.com/services",
  },
  openGraph: {
    title: "Послуги та рішення | ВІН ПАУЕР ГРУП",
    description:
      "Надійні енергетичні рішення для бізнесу та приватних клієнтів. Будівництво сонячних електростанцій та електромонтаж.",
    url: "https://vinpowergroup.com/services",
    type: "website",
  },
};

export default function ServicesPage() {
  // 🔥 ДОДАНО: Мікророзмітка сторінки з переліком послуг
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Послуги та рішення | ВІН ПАУЕР ГРУП",
    description: "Комплексні енергетичні рішення для бізнесу та дому.",
    url: "https://vinpowergroup.com/services",
    hasPart: [
      {
        "@type": "Service",
        name: "Будівництво СЕС",
        provider: { "@type": "Organization", name: "ВІН ПАУЕР ГРУП" },
      },
      {
        "@type": "Service",
        name: "Резервне живлення",
        provider: { "@type": "Organization", name: "ВІН ПАУЕР ГРУП" },
      },
      {
        "@type": "Service",
        name: "Зберігання енергії",
        provider: { "@type": "Organization", name: "ВІН ПАУЕР ГРУП" },
      },
      {
        "@type": "Service",
        name: "Електромонтаж",
        provider: { "@type": "Organization", name: "ВІН ПАУЕР ГРУП" },
      },
    ],
  };

  return (
    <main className={styles.servicesPageMain}>
      {/* Ін'єкція мікророзмітки */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      <div className={styles.servicesContentWrapper}>
        <div className={styles.servicesBgWrapper} aria-hidden="true">
          <GlobalBackground isLayout={false} />
        </div>

        <ServicesHero />
        <ServicesGrid />
        <FAQ />
        <ContactCTA />
      </div>
    </main>
  );
}
