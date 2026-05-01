"use client";

import React, { useRef } from "react";
import styles from "../about.module.scss";
import GlobalBackground from "@/components/layout/GlobalBackground";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const AboutExperience = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Анімація для заголовку (залізобетонна видимість)
      gsap.fromTo(
        `.${styles.headerBlock}`,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.headerBlock}`,
            start: "top 85%",
          },
        },
      );

      // 2. Анімація для карток (залізобетонна видимість)
      gsap.fromTo(
        ".animBentoCard",
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.bentoGrid}`,
            start: "top 80%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section className={styles.experienceSection} ref={containerRef}>
      <GlobalBackground isLayout={false} />

      <div
        className={styles.container}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* БЛОК 1: Заголовки */}
        <div className={styles.headerBlock}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badgeDark}>Енергія в діях</span>
          </div>

          <h2 className={styles.sectionTitle}>Експертність, яка не підведе</h2>
          <p className={styles.sectionDesc}>
            Ми не просто монтуємо кабелі. Досвід спеціалістів ВІН ПАУЕР ГРУП
            дозволяє реалізувати проєкти будь-якого масштабу — від затишного
            приватного будинку до потужного промислового об'єкта.
          </p>
        </div>

        {/* БЛОК 2: Сітка карток */}
        <div className={styles.bentoGrid}>
          <div
            className={`animBentoCard ${styles.bentoCard} ${styles.bentoDark} ${styles.size2x2}`}
          >
            <div className={styles.cardBgLayer}></div>
            <div className={styles.imageOverlay}></div>
            <div className={styles.bentoContent}>
              <div className={styles.iconCircle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3>Комплексні рішення «під ключ»</h3>
              <p>
                Вам не доведеться витрачати час на пошук різних підрядників. Ми
                беремо на себе все: від розробки креслення до монтажу та
                запуску.
              </p>
            </div>
            <svg
              className={styles.bentoIconBig}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>

          <div
            className={`animBentoCard ${styles.bentoCard} ${styles.bentoWarm} ${styles.size2x1}`}
          >
            <div className={styles.cardBgLayer}></div>
            <div className={styles.imageOverlay}></div>
            <div className={styles.bentoContent}>
              <div className={styles.iconCircle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3>Індивідуальний підхід</h3>
              <p>
                Працюємо з вашими потребами, а не за шаблоном. Кожен об'єкт
                унікальний.
              </p>
            </div>
          </div>

          <div
            className={`animBentoCard ${styles.bentoCard} ${styles.bentoBlue} ${styles.size1x1}`}
          >
            <div className={styles.cardBgLayer}></div>
            <div className={styles.imageOverlay}></div>
            <div className={styles.bentoContent}>
              <div className={styles.iconCircle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Надійні матеріали</h3>
              <p>Тільки перевірені бренди та сертифікація.</p>
            </div>
          </div>

          <div
            className={`animBentoCard ${styles.bentoCard} ${styles.bentoImage} ${styles.size1x2}`}
          >
            <div className={styles.cardBgLayer}></div>
            <div className={styles.imageOverlay}></div>
            <div className={styles.bentoContent}>
              <div className={styles.iconCircle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <h3>Кваліфікація</h3>
              <p>
                Експерти з допусками та багаторічним реальним досвідом у полях.
              </p>
            </div>
          </div>

          <div
            className={`animBentoCard ${styles.bentoCard} ${styles.bentoSuccess} ${styles.size3x1}`}
          >
            <div className={styles.cardBgLayer}></div>
            <div className={styles.imageOverlay}></div>
            <div className={styles.bentoContent}>
              <div className={styles.iconCircle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>Повна відповідальність за результат</h3>
              <p>
                Фіксуємо терміни та кошторис у договорі. Жодних прихованих
                платежів. Ми відповідаємо за кожен міліметр виконаної роботи.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutExperience;
