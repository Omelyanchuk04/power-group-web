"use client";

import { forwardRef } from "react";
import styles from "./HeroVideo.module.scss";

const HeroContent = forwardRef((props, ref) => {
  return (
    <div className={styles.contentWrapper} ref={ref}>
      {/* 1. ЦЕНТРАЛЬНИЙ БЛОК (Фокус уваги) */}
      <div className={styles.mainContent}>
        <h1 className={styles.animTitle}>
          Електромонтажні роботи <br />
          <span className={styles.textHighlight}>будь-якої складності</span>
        </h1>
        <p className={styles.animSubtitle}>
          Від невеликих приватних замовлень до реалізації масштабних об'єктів у
          цивільній та промисловій сфері.
        </p>
        <div className={styles.animButtonWrapper}>
          <button className={styles.animButton}>Отримати консультацію</button>
        </div>
      </div>

      {/* 2. БЛОК ПЕРЕВАГ (Glassmorphism картки знизу) */}
      <div className={styles.featuresRow}>
        {/* 🔥 Картка 1: Комплексні рішення */}
        <div className="animCardWrapper">
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className={styles.cardText}>
              <h4>Комплексні рішення</h4>
              <p>Роботи «під ключ»</p>
            </div>
          </div>
        </div>

        {/* 🔥 Картка 2: Масштабність (приватні/промислові) */}
        <div className="animCardWrapper">
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}>
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
            <div className={styles.cardText}>
              <h4>Масштабність</h4>
              <p>Приватні та промислові об'єкти</p>
            </div>
          </div>
        </div>

        {/* 🔥 Картка 3: Надійність та персонал */}
        <div className="animCardWrapper">
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className={styles.cardText}>
              <h4>Надійний результат</h4>
              <p>Кваліфікований персонал</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

HeroContent.displayName = "HeroContent";
export default HeroContent;
