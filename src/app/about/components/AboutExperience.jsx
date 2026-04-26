"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "../about.module.scss";

const AboutExperience = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        // Анімація запуститься ПІЗНІШЕ: чекаємо поки 30% секції з'явиться на екрані
        threshold: 0.3,
        // Додатково відкладаємо старт, поки користувач не проскролить ще трохи нижче
        rootMargin: "0px 0px -10% 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.experienceSection} ${inView ? styles.inView : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.badgeWrapper}>
          <span className={styles.badgeDark}>Енергія в діях</span>
        </div>

        <h2 className={styles.sectionTitle}>Експертність, яка не підведе</h2>
        <p className={styles.sectionDesc}>
          Ми не просто монтуємо кабелі. Досвід спеціалістів ВІН ПАУЕР ГРУП
          дозволяє реалізувати проєкти будь-якого масштабу — від затишного
          приватного будинку до потужного промислового об'єкта.
        </p>

        <div className={styles.bentoGrid}>
          {/* Блок 1: Темно-синій */}
          <div
            className={`${styles.bentoCard} ${styles.bentoDark} ${styles.size2x2}`}
          >
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

          {/* Блок 2: Оранжевий */}
          <div
            className={`${styles.bentoCard} ${styles.bentoWarm} ${styles.size2x1}`}
          >
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

          {/* Блок 3: БЛАКИТНИЙ (Надійні матеріали) */}
          <div
            className={`${styles.bentoCard} ${styles.bentoBlue} ${styles.size1x1}`}
          >
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

          {/* Блок 4: Фото */}
          <div
            className={`${styles.bentoCard} ${styles.bentoImage} ${styles.size1x2}`}
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

          {/* Блок 5: ЗЕЛЕНИЙ (Відповідальність) */}
          <div
            className={`${styles.bentoCard} ${styles.bentoSuccess} ${styles.size3x1}`}
          >
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
