"use client";

import { useRef } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./CompanyStats.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CompanyStats() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Полегшена анімація заголовку
      gsap.fromTo(
        `.${styles.statsHeader}`,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          force3D: true, // Апаратне прискорення GPU
          scrollTrigger: {
            trigger: `.${styles.statsHeader}`,
            start: "top 90%",
          },
        },
      );

      // 2. Ультралегка анімація сітки (БЕЗ SCALE)
      gsap.fromTo(
        ".animStatWrapper",
        { opacity: 0, y: 30 }, // Прибрали scale, зменшили дистанцію
        {
          opacity: 1,
          y: 0,
          stagger: 0.1, // Швидший каскад (менше часу навантажує процесор)
          duration: 0.5, // Швидша поява
          ease: "power2.out",
          force3D: true, // Примусово рендеримо на відеокарті
          scrollTrigger: {
            trigger: `.${styles.statsGrid}`,
            start: "top 85%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section className={styles.statsSection} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.statsWrapper}>
          <div className={styles.statsHeader}>
            <h3>Наш практичний досвід у цифрах та фактах</h3>
            <div className={styles.headerLine}></div>
          </div>

          <div className={styles.statsGrid}>
            <div className="animStatWrapper">
              <div className={styles.statCard}>
                <NextImage
                  src="/images/experiense-card.jpg"
                  alt="Досвід"
                  fill
                  priority // Пріоритетне завантаження для LCP
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className={styles.statBgImage}
                />
                <div className={styles.statOverlay}></div>
                <div className={styles.statContent}>
                  <div className={styles.statNum}>8+</div>
                  <div className={styles.statLabel}>
                    Років
                    <br />
                    досвіду
                  </div>
                </div>
              </div>
            </div>

            <div className="animStatWrapper">
              <div className={styles.statCard}>
                <NextImage
                  src="/images/projects-card.jpg"
                  alt="Проєкти"
                  fill
                  priority // Другій картинці теж даємо пріоритет, щоб не було ривків
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className={styles.statBgImage}
                />
                <div className={styles.statOverlay}></div>
                <div className={styles.statContent}>
                  <div className={styles.statNum}>150+</div>
                  <div className={styles.statLabel}>
                    Успішних
                    <br />
                    проєктів
                  </div>
                </div>
              </div>
            </div>

            <div className="animStatWrapper">
              <div className={styles.statCard}>
                <NextImage
                  src="/images/employees-card.jpg"
                  alt="Спеціалісти"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className={styles.statBgImage}
                />
                <div className={styles.statOverlay}></div>
                <div className={styles.statContent}>
                  <div className={styles.statNum}>10+</div>
                  <div className={styles.statLabel}>
                    Кваліфікованих
                    <br />
                    спеціалістів
                  </div>
                </div>
              </div>
            </div>

            <div className="animStatWrapper">
              <div className={styles.statCard}>
                <NextImage
                  src="/images/power-card.jpg"
                  alt="Потужність"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className={styles.statBgImage}
                />
                <div className={styles.statOverlay}></div>
                <div className={styles.statContent}>
                  <div className={styles.statNum}>37+</div>
                  <div className={styles.statLabel}>
                    МВт загальної
                    <br />
                    потужності
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
