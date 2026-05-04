import React from "react";
import ServicesHero from "./components/ServicesHero/ServicesHero";
import ServicesGrid from "./components/ServicesGrid/ServicesGrid";
import FAQ from "./components/FAQ/FAQ";
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";
import GlobalBackground from "@/components/layout/GlobalBackground";

// Якщо ти використовуєш services.module.scss, можеш розкоментувати імпорт:
// import styles from "./services.module.scss";

export default function ServicesPage() {
  return (
    <main
      // className={styles?.servicesPage || ""} // розкоментуй, якщо треба
      style={{
        position: "relative",
        width: "100%",
        /* 🔥 ОСНОВНИЙ ФІКС МЕЖІ: дозволяємо фону вільно випадати вниз під футер 🔥 */
        overflowY: "visible",
        /* 🔥 Запобігаємо появі горизонтального скролу 🔥 */
        overflowX: "clip",
        backgroundColor: "transparent",
      }}
    >
      {/* Головна обгортка ДЛЯ ВСІХ секцій сторінки */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          /* Також гарантуємо, що обгортка нічого не ріже */
          overflow: "visible",
          /* Уникаємо злипання марджинів (margin collapse) нижньої секції */
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 🔥 ГЛОБАЛЬНИЙ ФОН (АБСОЛЮТНА ЗБРОЯ ПРОТИ ШВІВ) 🔥 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            /* Пробиваємо дно. Збільшив до -1200px для 100% гарантії перекриття футера */
            bottom: "-1200px",
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          <GlobalBackground isLayout={false} />
        </div>

        {/* Твої секції спокійно лежать зверху на фоні */}
        <ServicesHero />
        <ServicesGrid />
        <FAQ />
        <ContactCTA />
      </div>
    </main>
  );
}
