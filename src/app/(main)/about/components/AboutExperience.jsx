"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "../about.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const AboutExperience = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Анімуємо тільки текст. Це легка операція, яка не викликає фрізів.
      gsap.fromTo(
        `.${styles.headerBlock}`,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `.${styles.headerBlock}`,
            start: "top 85%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section className={styles.experienceSection} ref={containerRef}>
      <div
        className={styles.container}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* БЛОК 1: Заголовки (тепер тільки заголовок і опис) */}
        <div className={styles.headerBlock}>
          <h2 className={styles.sectionTitle}>Експертність, яка не підведе</h2>
          <p className={styles.sectionDesc}>
            Ми не просто монтуємо кабелі. Досвід спеціалістів ВІН ПАУЕР ГРУП
            дозволяє реалізувати проєкти будь-якого масштабу — від затишного
            приватного будинку до потужного промислового об'єкта.
          </p>
        </div>

        {/* БЛОК 2: Сітка карток (залишається ідеально статичною) */}
        <div className={styles.bentoGrid}>
          <div className={styles.size2x2}>
            <div className={`${styles.bentoCard} ${styles.bentoDark}`}>
              <div className={styles.cardBgLayer}>
                <Image
                  src="/images/about-page-hero/about-hero-1.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 992px) 66vw, 590px"
                  className={styles.cardBgImage}
                  loading="lazy"
                />
              </div>
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
                  Вам не доведеться витрачати час на пошук різних підрядників.
                  Ми беремо на себе все: від розробки креслення до монтажу та
                  запуску.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.size2x1}>
            <div className={`${styles.bentoCard} ${styles.bentoWarm}`}>
              <div className={styles.cardBgLayer}>
                <Image
                  src="/images/about-page-hero/about-hero-2.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 992px) 33vw, 590px"
                  className={styles.cardBgImage}
                  loading="lazy"
                />
              </div>
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
          </div>

          <div className={styles.size1x1}>
            <div className={`${styles.bentoCard} ${styles.bentoBlue}`}>
              <div className={styles.cardBgLayer}>
                <Image
                  src="/images/about-page-experience/reliable_materials.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 992px) 33vw, 285px"
                  className={styles.cardBgImage}
                  loading="lazy"
                />
              </div>
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
          </div>

          <div className={styles.size1x2}>
            <div className={`${styles.bentoCard} ${styles.bentoImage}`}>
              <div className={styles.cardBgLayer}>
                <Image
                  src="/images/about-page-experience/qualification.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 992px) 33vw, 285px"
                  className={styles.cardBgImage}
                  loading="lazy"
                />
              </div>
              <div className={styles.imageOverlay}></div>
              <div className={styles.bentoContent}>
                <div className={styles.iconCircle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                </div>
                <h3>Кваліфікація</h3>
                <p>Спеціалісти з багаторічним практичним досвідом</p>
              </div>
            </div>
          </div>

          <div className={styles.size3x1}>
            <div className={`${styles.bentoCard} ${styles.bentoSuccess}`}>
              <div className={styles.cardBgLayer}>
                <Image
                  src="/images/about-page-hero/about-hero-5.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 992px) 66vw, 890px"
                  className={styles.cardBgImage}
                  loading="lazy"
                />
              </div>
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
      </div>
    </section>
  );
};

export default AboutExperience;
