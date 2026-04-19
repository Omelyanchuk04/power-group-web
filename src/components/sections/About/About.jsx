"use client";

import { useRef, useEffect } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./About.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function About() {
  const sectionRef = useRef(null);

  // ==========================================
  // 🚨 ЛОГЕР ПОЯВИ СЕКЦІЇ
  // ==========================================
  useEffect(() => {
    if (!sectionRef.current) return;

    // Слідкуємо, коли секція "Про компанію" торкається екрану
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(
              `🎯 [OBSERVER] Секція About з'явилася на екрані! Видимість: ${(entry.intersectionRatio * 100).toFixed(0)}%`,
            );
          }
        });
      },
      { threshold: [0, 0.1, 0.5] },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      // Трекаємо спрацювання ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        onEnter: () =>
          console.log("🔥 [TRIGGER] About: onEnter (верх торкнувся низу)"),
        onLeaveBack: () =>
          console.log("⬅️ [TRIGGER] About: onLeaveBack (повернулися нагору)"),
      });

      gsap.fromTo(
        `.${styles.sectionHeader}`,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.sectionHeader}`,
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        `.${styles.offerHeader}`,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.offerHeader}`,
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        `.${styles.targetCard}`,
        { opacity: 0, scale: 0.95, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.targetGrid}`,
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        `.${styles.transitionBlock}`,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.transitionBlock}`,
            start: "top 85%",
          },
        },
      );

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
          scrollTrigger: {
            trigger: `.${styles.statsGrid}`,
            start: "top 80%",
          },
        },
      );

      const parallaxWrappers = gsap.utils.toArray(
        `.${styles.imgParallaxWrapper}`,
      );

      parallaxWrappers.forEach((wrapper) => {
        gsap.fromTo(
          wrapper,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper.parentNode,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    // 🔥 ДОДАНО dependencies: [] щоб хук не ререндерився зайвий раз
    { scope: sectionRef, dependencies: [] },
  );

  return (
    <section className={styles.lightSection} ref={sectionRef}>
      <div className={styles.blob3}></div>
      <div className={styles.blob4}></div>
      <div className={styles.blob5}></div>

      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>Про компанію</span>
          <h2>Створюємо вашу енергетичну стабільність</h2>
          <p>
            <strong>ВІН ПАУЕР ГРУП</strong> — ваш надійний партнер. Ми
            проєктуємо, будуємо та обслуговуємо об'єкти будь-якої складності,
            забезпечуючи безпечний результат.
          </p>
        </div>

        <div className={styles.offerWrapper}>
          <div className={styles.offerHeader}>
            <h3>Що ми пропонуємо</h3>
            <p>
              Комплексні рішення для забезпечення енергонезалежності як
              приватних клієнтів, так і великого бізнесу.
            </p>
          </div>

          <div className={styles.targetGrid}>
            <div className={styles.targetCard}>
              <div className={styles.imgParallaxWrapper}>
                <NextImage
                  src="/images/about-b2c.jpg"
                  alt="Приватні будинки"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.bgImage}
                />
              </div>
              <div className={styles.cardOverlay}></div>
              <div className={styles.cardContent}>
                <div className={styles.targetIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div className={styles.targetText}>
                  <h4>Приватні домоволодіння</h4>
                  <p>Повна автономія для вашого дому</p>
                </div>
              </div>
            </div>

            <div className={styles.targetCard}>
              <div className={styles.imgParallaxWrapper}>
                <NextImage
                  src="/images/about-b2b.jpg"
                  alt="Підприємства"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.bgImage}
                />
              </div>
              <div className={styles.cardOverlay}></div>
              <div className={styles.cardContent}>
                <div className={styles.targetIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 14v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"></path>
                    <rect
                      x="2"
                      y="3"
                      width="20"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="12" y1="3" x2="12" y2="14"></line>
                  </svg>
                </div>
                <div className={styles.targetText}>
                  <h4>Великі підприємства</h4>
                  <p>Енергоефективність та вигода для бізнесу</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.transitionBlock}>
          <h3>Надійність на кожному етапі</h3>
          <p>
            Від розробки проєкту до введення об'єкта в експлуатацію — ми беремо
            на себе всі технічні виклики. Використання сучасних матеріалів та
            суворе дотримання стандартів гарантують безпечну та ефективну роботу
            вашої електросистеми.
          </p>
        </div>

        <div className={styles.statsWrapper}>
          <div className={styles.statsHeader}>
            <h3>Факти, що говорять самі за себе</h3>
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
