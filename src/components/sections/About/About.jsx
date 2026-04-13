"use client";

import { useEffect, useRef } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./About.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  const offerHeaderRef = useRef(null);
  const targetGridRef = useRef(null);
  const imageCardsRef = useRef([]);

  const transitionTextRef = useRef(null);

  const statsHeaderRef = useRef(null);
  const statsGridRef = useRef(null);
  const statsRef = useRef([]);

  const parallaxWrappersRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. ГОЛОВНИЙ ЗАГОЛОВОК
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        },
      );

      // 2. ЗАГОЛОВОК "ЩО МИ ПРОПОНУЄМО"
      gsap.fromTo(
        offerHeaderRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: offerHeaderRef.current, start: "top 75%" },
        },
      );

      // 3. КАРТКИ АУДИТОРІЙ (B2C / B2B)
      gsap.fromTo(
        imageCardsRef.current,
        { opacity: 0, scale: 0.95, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: targetGridRef.current, start: "top 70%" },
        },
      );

      // 4. ТЕКСТ-ПЕРЕХІД (Заява)
      gsap.fromTo(
        transitionTextRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: transitionTextRef.current,
            start: "top 80%",
          },
        },
      );

      // 5. ПІДЗАГОЛОВОК СТАТИСТИКИ
      gsap.fromTo(
        statsHeaderRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: statsGridRef.current, start: "top 85%" },
        },
      );

      // 6. КАРТКИ СТАТИСТИКИ (Цифри) - Ідеально плавні
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out", // М'яке гальмування без ривків
          scrollTrigger: { trigger: statsGridRef.current, start: "top 80%" },
        },
      );

      // Паралакс фонів
      parallaxWrappersRef.current.forEach((wrapper) => {
        if (wrapper) {
          gsap.fromTo(
            wrapper,
            { yPercent: -20 },
            {
              yPercent: 20,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper.parentNode,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.lightSection} ref={sectionRef}>
      <div className={styles.blob3}></div>
      <div className={styles.blob4}></div>
      <div className={styles.blob5}></div>

      <div className={styles.container}>
        {/* ================= БЛОК 1: ІНТРО ================= */}
        <div className={styles.sectionHeader} ref={headerRef}>
          <span className={styles.badge}>Про компанію</span>
          <h2>Створюємо вашу енергетичну стабільність</h2>
          <p>
            <strong>ВІН ПАУЕР ГРУП</strong> — ваш надійний партнер. Ми
            проєктуємо, будуємо та обслуговуємо об'єкти будь-якої складності,
            забезпечуючи безпечний результат.
          </p>
        </div>

        {/* ================= БЛОК 2: ЩО МИ ПРОПОНУЄМО (Картки) ================= */}
        <div className={styles.offerWrapper}>
          <div className={styles.offerHeader} ref={offerHeaderRef}>
            <h3>Що ми пропонуємо</h3>
            <p>
              Комплексні рішення для забезпечення енергонезалежності як
              приватних клієнтів, так і великого бізнесу.
            </p>
          </div>

          <div className={styles.targetGrid} ref={targetGridRef}>
            <div
              className={styles.targetCard}
              ref={(el) => (imageCardsRef.current[0] = el)}
            >
              <div
                className={styles.imgParallaxWrapper}
                ref={(el) => (parallaxWrappersRef.current[0] = el)}
              >
                <NextImage
                  src="/images/about-b2c.jpg"
                  alt="Приватні будинки"
                  fill
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

            <div
              className={styles.targetCard}
              ref={(el) => (imageCardsRef.current[1] = el)}
            >
              <div
                className={styles.imgParallaxWrapper}
                ref={(el) => (parallaxWrappersRef.current[1] = el)}
              >
                <NextImage
                  src="/images/about-b2b.jpg"
                  alt="Підприємства"
                  fill
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

        {/* ================= БЛОК 2.5: ТЕКСТ-ПЕРЕХІД ================= */}
        <div className={styles.transitionBlock} ref={transitionTextRef}>
          <h3>Надійність на кожному етапі</h3>
          <p>
            Від розробки проєкту до введення об'єкта в експлуатацію — ми беремо
            на себе всі технічні виклики. Використання сучасних матеріалів та
            суворе дотримання стандартів гарантують безпечну та ефективну роботу
            вашої електросистеми.
          </p>
        </div>

        {/* ================= БЛОК 3: НАШІ ДОСЯГНЕННЯ ================= */}
        <div className={styles.statsWrapper}>
          <div className={styles.statsHeader} ref={statsHeaderRef}>
            <h3>Факти, що говорять самі за себе</h3>
            <div className={styles.headerLine}></div>
          </div>

          <div className={styles.statsGrid} ref={statsGridRef}>
            {/* 🔥 МАГІЯ ТУТ: Додано невидимі обгортки (div) спеціально для GSAP */}
            <div ref={(el) => (statsRef.current[0] = el)}>
              <div className={styles.statCard}>
                <NextImage
                  src="/images/experiense-card.jpg"
                  alt="Досвід"
                  fill
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

            <div ref={(el) => (statsRef.current[1] = el)}>
              <div className={styles.statCard}>
                <NextImage
                  src="/images/projects-card.jpg"
                  alt="Проєкти"
                  fill
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

            <div ref={(el) => (statsRef.current[2] = el)}>
              <div className={styles.statCard}>
                <NextImage
                  src="/images/employees-card.jpg"
                  alt="Спеціалісти"
                  fill
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

            <div ref={(el) => (statsRef.current[3] = el)}>
              <div className={styles.statCard}>
                <NextImage
                  src="/images/power-card.jpg"
                  alt="Потужність"
                  fill
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
