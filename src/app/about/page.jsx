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

      {/* 🔥 МЕГА-КОНТЕЙНЕР 🔥 */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          // 🔥 ВИДАЛИЛИ backgroundColor ЗВІДСИ, щоб він не обрізався жорстко перед футером
        }}
      >
        {/* Абсолютний блок фону */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "-800px" /* Заходить глибоко під футер */,
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
            backgroundColor: "#f9fafb" /* 🔥 ПЕРЕНЕСЛИ КОЛІР СЮДИ */,
          }}
        >
          <GlobalBackground isLayout={false} />
        </div>

        {/* Контент безпечно лежить зверху */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <CompanyStats />
          <AboutExperience />
          <ContactCTA />
        </div>
      </div>
    </main>
  );
}
