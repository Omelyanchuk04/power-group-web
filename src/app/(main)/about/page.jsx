"use client";

import React from "react";
import styles from "./about.module.scss";
import AboutHero from "./components/AboutHero";
import CompanyStats from "@/components/shared/CompanyStats/CompanyStats";
import AboutExperience from "./components/AboutExperience";
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";
import GlobalBackground from "@/components/layout/GlobalBackground";

export default function AboutPage() {
  // 🔥 ДОДАНО: Мікророзмітка компанії для Google
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ВІН ПАУЕР ГРУП",
    url: "https://vinpowergroup.com",
    logo: "https://vinpowergroup.com/logo.svg", // Або ваш актуальний шлях до лого
    description:
      "Надійний партнер у сфері енергетики. Проєктуємо, будуємо та обслуговуємо сонячні електростанції та виконуємо електромонтажні роботи.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+380672671477",
      contactType: "customer service",
      areaServed: "UA",
      availableLanguage: "Ukrainian",
    },
  };

  return (
    <main className={styles.aboutPage}>
      {/* Ін'єкція SEO-розмітки */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <AboutHero />

      {/* Всі inline-стилі винесено у класи */}
      <div className={styles.contentWrapper}>
        <div className={styles.bgWrapper}>
          <GlobalBackground isLayout={false} />
        </div>

        <div className={styles.innerContent}>
          <CompanyStats />
          <AboutExperience />
          <ContactCTA />
        </div>
      </div>
    </main>
  );
}
