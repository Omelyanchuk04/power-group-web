import React from "react";
import styles from "./services.module.scss"; // Залиш свій імпорт стилів сторінки, якщо він є

import ServicesHero from "./components/ServicesHero/ServicesHero";
import ServicesGrid from "./components/ServicesGrid/ServicesGrid";
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";
import GlobalBackground from "@/components/layout/GlobalBackground";

export default function ServicesPage() {
  return (
    <main className={styles?.servicesPage || ""}>
      {/* Головна обгортка ДЛЯ ВСІХ секцій сторінки */}
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {/* 🔥 ГЛОБАЛЬНИЙ ФОН 🔥 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "-800px" /* Пробиваємо дно під футер */,
            zIndex: -1 /* Ховаємо під усіма секціями */,
            pointerEvents: "none",
          }}
        >
          <GlobalBackground isLayout={false} />
        </div>

        {/* Твої секції спокійно лежать зверху на фоні */}
        <ServicesHero />
        <ServicesGrid />
        <ContactCTA />
      </div>
    </main>
  );
}
