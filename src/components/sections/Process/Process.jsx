"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Process.module.scss";
import ContactModal from "../../modals/ContactModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // 🔥 ВИРІШУЄ ПРОБЛЕМУ ЛАГІВ НА МОБІЛЬНИХ:
  // Ігноруємо зміну розміру вікна при хованні адресної строки браузера
  ScrollTrigger.config({ ignoreMobileResize: true });
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
        strokeWidth="2"
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
        strokeWidth="2"
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
        strokeWidth="2"
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
        strokeWidth="2"
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
      "Після здачі об'єкта забезпечуємо постійний технічний супровід та професійне гарантійне/післягарантійне сервісне обслуговування.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
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
  const timelineWrapperRef = useRef(null);
  const mainLineRef = useRef(null);
  const lineRef = useRef(null);
  const lastDotRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const updateLineHeight = () => {
      if (
        timelineWrapperRef.current &&
        mainLineRef.current &&
        lastDotRef.current
      ) {
        const wrapperRect = timelineWrapperRef.current.getBoundingClientRect();
        const dotRect = lastDotRef.current.getBoundingClientRect();

        const exactHeight =
          dotRect.top - wrapperRect.top + dotRect.height / 2 + 14;
        mainLineRef.current.style.height = `${exactHeight}px`;
      }
    };

    updateLineHeight();

    // Перевіряємо тільки зміну ШИРИНИ, щоб уникнути лагів при скролі на телефонах
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        updateLineHeight();
        ScrollTrigger.refresh();
      }
    };
    window.addEventListener("resize", handleResize);

    let ctx = gsap.context(() => {
      const triggerPoint = "35%";

      // 1. СМУГА ПРОГРЕСУ
      gsap.to(lineRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: mainLineRef.current,
          start: `top ${triggerPoint}`,
          end: `bottom ${triggerPoint}`,
          scrub: 0.5, // 🔥 0.5 робить рух смуги м'якшим (без ривків)
        },
      });

      // 2. АНІМАЦІЇ КАРТОК ТА ТОЧОК
      const rows = gsap.utils.toArray(`.${styles.stepRow}`);

      rows.forEach((row) => {
        const card = row.querySelector(`.${styles.card}`);
        const dotContainer = row.querySelector(`.${styles.dotContainer}`);
        const dot = row.querySelector(`.${styles.smallDot}`);

        // Анімація карток
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row, // 🔥 Використовуємо рядок як тригер (стабільніше)
                start: "top 75%", // 🔥 Пізніше! Треба доскролити більше, щоб картка з'явилась
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        // Анімація жовтих точок
        if (dot && dotContainer) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: dotContainer,
                start: `center ${triggerPoint}`, // Спрацьовує точно при дотику синьої смуги
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });
    }, containerRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section className={styles.processSection} ref={containerRef} id="process">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Алгоритм роботи</span>
          <h2 className={styles.title}>Етапи співпраці</h2>
          <p className={styles.subtitle}>
            Прозорий та контрольований процес від першого дослідження до
            сервісного обслуговування.
          </p>
        </div>

        <div className={styles.timelineWrapper} ref={timelineWrapperRef}>
          <div className={styles.mainLine} ref={mainLineRef}>
            <div className={styles.lineProgress} ref={lineRef}></div>
          </div>

          <div className={styles.stepsContainer}>
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`${styles.stepRow} ${index % 2 === 0 ? styles.left : styles.right}`}
              >
                <div className={styles.dotContainer}>
                  <div className={styles.smallDot}></div>
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

            <div className={`${styles.stepRow} ${styles.ctaRow}`}>
              <div className={styles.dotContainer} ref={lastDotRef}>
                <div className={styles.smallDot}></div>
              </div>

              <div className={`${styles.card} ${styles.ctaCard}`}>
                <span className={styles.ctaBadge}>Швидка відповідь</span>

                <div className={styles.cardContentWrapper}>
                  <div className={styles.iconCircle}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 2L11 13"></path>
                      <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                    </svg>
                  </div>

                  <div className={styles.textContent}>
                    <h3>Залишилися питання?</h3>
                    <p>
                      Якщо у Вас є питання, або ви хочете співпрацювати —
                      заповніть форму зворотного зв’язку і ми надамо відповідь у
                      найкоротші терміни.
                    </p>
                  </div>

                  <button
                    className={styles.ctaButton}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <span>Заповнити форму</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
