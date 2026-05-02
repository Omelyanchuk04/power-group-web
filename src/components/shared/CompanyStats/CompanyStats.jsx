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
      gsap.fromTo(
        `.${styles.statsHeader}`,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.statsHeader}`,
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        ".animStatWrapper",
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: `.${styles.statsGrid}`, start: "top 80%" },
        },
      );
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    // 🔥 Секція і контейнер обмежують ширину
    <section className={styles.statsSection} ref={containerRef}>
      <div className={styles.container}>
        {/* 🔥 А ось цей блок повертає заокруглення та прозорість */}
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
                  <div className={styles.statNum}>30+</div>
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
                  <div className={styles.statNum}>50+</div>
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
