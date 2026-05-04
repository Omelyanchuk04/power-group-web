"use client";

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

      {/* 🔥 МЕГА-КОНТЕЙНЕР (Точно як на головній сторінці!) 🔥 */}
      {/* Саме ВІДСУТНІСТЬ backgroundColor тут ламала рендеринг Safari */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          backgroundColor:
            "#f9fafb" /* Додаємо надійну стіну, як #f5f5f5 на Головній */,
        }}
      >
        {/* Твоя абсолютна зброя проти швів тепер лежить на надійному тлі */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "-800px",
            zIndex: 0 /* Опускаємо фон під контент */,
            pointerEvents: "none",
            overflow: "hidden" /* Блокуємо розповзання блюру */,
          }}
        >
          <GlobalBackground isLayout={false} />
        </div>

        {/* 🔥 Всі секції тепер ізольовані від фону і безпечно лежать зверху 🔥 */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <CompanyStats />
          <AboutExperience />
          <ContactCTA />
        </div>
      </div>
    </main>
  );
}
