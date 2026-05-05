"use client";

// 🔥 1. Імпортуємо наш хук для модалки
import { useModal } from "@/context/ModalContext";
import styles from "./ContactCTA.module.scss";

// 🔥 2. Прибираємо пропс onOpenModal, він більше не потрібен
export default function ContactCTA() {
  // 🔥 3. Дістаємо функцію відкриття з контексту
  const { openModal } = useModal();

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

          {/* 🔥 4. Вішаємо виклик openModal на клік 🔥 */}
          <button className={styles.ctaButton} onClick={openModal}>
            <span>Заповнити форму</span>
          </button>
        </div>
      </div>
    </div>
  );
}
