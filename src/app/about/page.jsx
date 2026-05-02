import React from "react";
import styles from "./about.module.scss";
import AboutHero from "./components/AboutHero";
import CompanyStats from "@/components/shared/CompanyStats/CompanyStats";
import AboutExperience from "./components/AboutExperience";
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";
import GlobalBackground from "@/components/layout/GlobalBackground";

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      <AboutHero />

      {/* Головна обгортка для нижніх секцій */}
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {/* 🔥 АБСОЛЮТНА ЗБРОЯ ПРОТИ ШВІВ */}
        {/* Цей div закріплений позаду контенту і примусово витягнутий на 800px ВНИЗ під футер */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom:
              "-800px" /* Візуально пробиваємо дно і залазимо під футер */,
            zIndex: -1 /* Ховаємо під усі секції та футер */,
            pointerEvents: "none" /* Щоб фон не блокував кліки по кнопках */,
          }}
        >
          <GlobalBackground isLayout={false} />
        </div>

        {/* Твої секції спокійно лежать зверху */}
        <CompanyStats />
        <AboutExperience />
        <ContactCTA />
      </div>
    </main>
  );
}
