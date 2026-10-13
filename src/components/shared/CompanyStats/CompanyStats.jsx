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
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: `.${styles.statsHeader}`,
            start: "top 90%",
          },
        },
      );

      gsap.fromTo(
        ".animStatWrapper",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          force3D: true,
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
    <section
      className={styles.statsSection}
      ref={containerRef}
      aria-labelledby="company-stats-heading"
    >
      <div className={styles.container}>
        <div className={styles.statsWrapper}>
          {/* 🔥 ЗМІНЕНО: <h3> на <h2> для правильної SEO-ієрархії сторінки */}
          <header className={styles.statsHeader}>
            <h2 id="company-stats-heading">
              Наш практичний досвід у цифрах та фактах
            </h2>
            <div className={styles.headerLine} aria-hidden="true"></div>
          </header>

          {/* 🔥 ЗМІНЕНО: Сітка тепер є маркованим списком (<ul>), щоб скрінрідери читали це як "Список з 3 елементів" */}
          <ul
            className={styles.statsGrid}
            style={{ listStyle: "none", padding: 0, margin: 0 }}
          >
            <li className="animStatWrapper">
              <article className={styles.statCard}>
                {/* 🔥 ЗМІНЕНО: Розширені alt-тексти з ключовими словами. Прибрано priority, бо блок зазвичай нижче першого екрана */}
                <NextImage
                  src="/images/experiense-card.jpg"
                  alt="8 років практичного досвіду у сфері сонячної енергетики"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.statBgImage}
                />
                <div className={styles.statOverlay} aria-hidden="true"></div>
                <div className={styles.statContent}>
                  <div className={styles.statNum}>8+</div>
                  <div className={styles.statLabel}>
                    Років
                    <br />
                    досвіду
                  </div>
                </div>
              </article>
            </li>

            <li className="animStatWrapper">
              <article className={styles.statCard}>
                <NextImage
                  src="/images/projects-card.jpg"
                  alt="Більше 150 успішно реалізованих проєктів СЕС під ключ"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.statBgImage}
                />
                <div className={styles.statOverlay} aria-hidden="true"></div>
                <div className={styles.statContent}>
                  <div className={styles.statNum}>150+</div>
                  <div className={styles.statLabel}>
                    Успішних
                    <br />
                    проєктів
                  </div>
                </div>
              </article>
            </li>

            <li className="animStatWrapper">
              <article className={styles.statCard}>
                <NextImage
                  src="/images/power-card.jpg"
                  alt="37 мегават загальної встановленої потужності електростанцій"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.statBgImage}
                />
                <div className={styles.statOverlay} aria-hidden="true"></div>
                <div className={styles.statContent}>
                  <div className={styles.statNum}>37+</div>
                  <div className={styles.statLabel}>
                    МВт загальної
                    <br />
                    потужності
                  </div>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
