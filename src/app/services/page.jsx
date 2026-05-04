"use client";

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
        overflowY: "visible",
        overflowX: "clip",
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          overflow: "visible",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 🔥 ФОН ПОВЕРНУТО ЯК БУЛО (Абсолютний, скролиться з контентом) 🔥 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "-1200px",
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
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
