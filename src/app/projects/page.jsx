"use client";

import React from "react";
import ProjectsHero from "./components/ProjectsHero/ProjectsHero";
import ProjectsGrid from "./components/ProjectsGrid/ProjectsGrid";
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";
import GlobalBackground from "@/components/layout/GlobalBackground";

export default function ProjectsPage() {
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
        {/* 🔥 ГЛОБАЛЬНИЙ ФОН (Абсолютний, скролиться з контентом) 🔥 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "-1200px", // Запас для скролу, як на сторінці послуг
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          <GlobalBackground isLayout={false} />
        </div>

        {/* =========================================
            БЛОКИ СТОРІНКИ ПРОЕКТІВ
            ========================================= */}

        {/* <ProjectsHero /> */}
        <ProjectsGrid />

        {/* Блок із закликом до дії внизу сторінки */}
        <ContactCTA />
      </div>
    </main>
  );
}
