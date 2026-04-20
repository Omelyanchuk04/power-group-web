"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Process.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROCESS_STEPS = [
  {
    id: "01",
    title: "Дослідження об'єкту",
    description:
      "Первинний виїзд, збір вихідних даних та повне дослідження об'єкту для визначення оптимальних технічних рішень.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    ),
  },
  {
    id: "02",
    title: "Комерційна пропозиція",
    description:
      "Підготовка та надання детальної комерційної пропозиції з чіткими умовами, термінами виконання та прозорими цінами.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
  },
  {
    id: "03",
    title: "Переговори та договір",
    description:
      "Узгодження всіх технічних та юридичних нюансів, проведення переговорів та укладання офіційного договору.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
      </svg>
    ),
  },
  {
    id: "04",
    title: "Реалізація проєкту",
    description:
      "Своєчасна поставка надійного обладнання та безпосередня реалізація проєкту кваліфікованими спеціалістами.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
  },
  {
    id: "05",
    title: "Супровід та сервіс",
    description:
      "Здача об'єкта, постійний технічний супровід та професійне гарантійне/післягарантійне сервісне обслуговування.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
  },
];

export default function Process() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Анімація центральної лінії
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "bottom 80%",
            scrub: 1,
          },
        },
      );

      // 2. Анімація карток і точок
      const rows = gsap.utils.toArray(`.${styles.stepRow}`);

      rows.forEach((row) => {
        const card = row.querySelector(`.${styles.card}`);
        const dot = row.querySelector(`.${styles.dot}`);
        const glow = row.querySelector(`.${styles.activeGlow}`);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Анімуємо точку
        tl.to(
          dot,
          {
            backgroundColor: "#00d4ff",
            scale: 1.3,
            duration: 0.4,
            ease: "back.out(1.5)",
          },
          0,
        )
          .to(
            glow,
            { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
            0,
          )
          // 🔥 ВИПЛИВАЄ ЗНИЗУ: замість осі x використовуємо вісь y (y: 50)
          .fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
            0.1,
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.processSection} ref={containerRef} id="process">
      <div className={styles.blob3}></div>
      <div className={styles.blob4}></div>
      <div className={styles.blob5}></div>

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Алгоритм роботи</span>
          <h2 className={styles.title}>Етапи співпраці</h2>
          <p className={styles.subtitle}>
            Прозорий та контрольований процес від першого дослідження до
            сервісного обслуговування.
          </p>
        </div>

        <div className={styles.timelineWrapper}>
          <div className={styles.mainLine}>
            <div className={styles.lineProgress} ref={lineRef}></div>
          </div>

          <div className={styles.stepsContainer}>
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`${styles.stepRow} ${index % 2 === 0 ? styles.left : styles.right}`}
              >
                <div className={styles.dotWrapper}>
                  <div className={styles.activeGlow}></div>
                  <div className={styles.dot}></div>
                </div>

                <div className={styles.card}>
                  <div className={styles.innerGlow}></div>

                  <div className={styles.stepDigit}>{step.id}</div>

                  <div className={styles.cardContentWrapper}>
                    <div className={styles.iconCircle}>{step.icon}</div>

                    <div className={styles.textContent}>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
