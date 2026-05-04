import React from "react";
import ServicesHero from "./components/ServicesHero/ServicesHero";
import ServicesGrid from "./components/ServicesGrid/ServicesGrid";
import FAQ from "./components/FAQ/FAQ";
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";
import GlobalBackground from "@/components/layout/GlobalBackground";

export default function ServicesPage() {
  return (
    <main
      style={{
        position: "relative",
        width: "100%",
        /* Запобігаємо появі горизонтального скролу */
        overflowX: "clip",
        backgroundColor: "transparent",
      }}
    >
      {/* 🔥 ГЛОБАЛЬНИЙ ФОН (ТЕПЕР ФІКСОВАНИЙ І НЕ СТРИБАЄ) 🔥 */}
      <div
        style={{
          position: "fixed" /* прив'язуємо до екрану, а не до сторінки */,
          top: 0,
          left: 0,
          width: "100vw" /* ширина рівно на весь екран */,
          height: "100vh" /* висота рівно на весь екран */,
          zIndex: -1 /* ховаємо під контент */,
          pointerEvents: "none",
          backgroundColor:
            "#f9fafb" /* Суцільний колір під плямами, щоб не було швів перед футером */,
        }}
      >
        <GlobalBackground isLayout={false} />
      </div>

      {/* Головна обгортка ДЛЯ ВСІХ секцій сторінки */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Твої секції спокійно скроляться ПОВЕРХ нерухомого фону */}
        <ServicesHero />
        <ServicesGrid />
        <FAQ />
        <ContactCTA />
      </div>
    </main>
  );
}
