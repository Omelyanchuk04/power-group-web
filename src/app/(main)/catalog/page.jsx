import React from "react";
import CatalogGrid from "./components/CatalogGrid/CatalogGrid";
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";
import GlobalBackground from "@/components/layout/GlobalBackground";

export const metadata = {
  title: "Каталог обладнання | ВІН ПАУЕР ГРУП",
  description:
    "Мережеві інвертори, системи накопичення, акумулятори та силове обладнання.",
};

export default function CatalogPage() {
  return (
    <main
      style={{
        position: "relative",
        width: "100%",
        // 🔥 Прибрали overflowX: "clip", щоб запрацювало залипання сайдбару
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
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

        <CatalogGrid />

        <ContactCTA />
      </div>
    </main>
  );
}
