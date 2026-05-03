import React from "react";
import styles from "./services.module.scss";
import ServicesHero from "./components/ServicesHero/ServicesHero";
import ServicesGrid from "./components/ServicesGrid/ServicesGrid"; // 🔥 Без фігурних дужок!
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";

export const metadata = {
  title: "Наші послуги | Vin Power Group",
  description: "Комплексні енергетичні рішення...",
};

export default function ServicesPage() {
  return (
    <main className={styles.servicesPage}>
      <ServicesHero />
      <ServicesGrid />
      <div className={styles.ctaWrapper}>
        <ContactCTA />
      </div>
    </main>
  );
}
