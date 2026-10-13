"use client";

import { useModal } from "@/context/ModalContext";
import styles from "./ContactCTA.module.scss";

export default function ContactCTA() {
  const { openModal } = useModal();

  return (
    // 🔥 ЗМІНЕНО: <div> на семантичний тег <section> із прив'язкою до заголовка
    <section
      className={`${styles.ctaContainer} gsap-step`}
      aria-labelledby="cta-heading"
    >
      <div className={styles.ctaCard}>
        <span className={styles.ctaBadge}>Швидка відповідь</span>

        <div className={styles.cardContentWrapper}>
          <div className={styles.iconCircle} aria-hidden="true">
            {/* 🔥 ДОДАНО: focusable="false" для SVG, щоб уникнути багів фокусу в деяких браузерах */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              focusable="false"
            >
              <path d="M22 2L11 13"></path>
              <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
          </div>

          <div className={styles.textContent}>
            {/* 🔥 ЗМІНЕНО: <h3> на <h2> для правильної структури заголовків на сторінці */}
            <h2 id="cta-heading">Залишилися питання?</h2>
            <p>
              Якщо у Вас є питання, або ви хочете співпрацювати — заповніть
              форму зворотного зв’язку і ми надамо відповідь у найкоротші
              терміни.
            </p>
          </div>

          {/* 🔥 ДОДАНО: Атрибути доступності для модального вікна */}
          <button
            className={styles.ctaButton}
            onClick={openModal}
            aria-haspopup="dialog"
            aria-label="Відкрити форму зворотного зв'язку"
          >
            <span>Заповнити форму</span>
          </button>
        </div>
      </div>
    </section>
  );
}
