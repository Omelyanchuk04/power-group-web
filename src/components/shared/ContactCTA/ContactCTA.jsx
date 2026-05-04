"use client";

import styles from "./ContactCTA.module.scss";

export default function ContactCTA({ onOpenModal }) {
  return (
    <div className={`${styles.ctaContainer} gsap-step`}>
      <div className={styles.ctaCard}>
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
              Якщо у Вас є питання, або ви хочете співпрацювати — заповніть
              форму зворотного зв’язку і ми надамо відповідь у найкоротші
              терміни.
            </p>
          </div>

          <button className={styles.ctaButton} onClick={onOpenModal}>
            <span>Заповнити форму</span>
          </button>
        </div>
      </div>
    </div>
  );
}
