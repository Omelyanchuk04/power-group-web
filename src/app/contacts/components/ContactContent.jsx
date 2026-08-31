"use client";

import React, { useRef } from "react";
import styles from "../contact.module.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const ContactContent = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        `.${styles.headerBlock}`,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.headerBlock}`,
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        ".animBentoCard",
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.contentGrid}`,
            start: "top 80%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section className={styles.contactSection} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.headerBlock}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badgeDark}>Контакти</span>
          </div>
          <h2 className={styles.sectionTitle}>Чекаємо на ваш запит</h2>
          <p className={styles.sectionDesc}>
            Якщо у Вас є питання, або ви хочете співпрацювати — заповніть форму
            зворотного зв'язку і ми надамо відповідь у найкоротші терміни.
          </p>
        </div>

        <div className={styles.contentGrid}>
          {/* Інформація */}
          <div className={styles.infoBentoGrid}>
            <div
              className={`animBentoCard ${styles.bentoCard} ${styles.size2x1}`}
            >
              <div className={styles.bentoContent}>
                <div className={styles.iconCircle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3>Головний офіс</h3>
                <p>
                  Україна, 21009, Вінницька обл.,
                  <br />
                  м. Вінниця, вул. Київська, 14
                </p>
              </div>
            </div>

            <div
              className={`animBentoCard ${styles.bentoCard} ${styles.size2x1}`}
            >
              <div className={styles.bentoContent}>
                <div className={styles.iconCircle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h3>Телефони</h3>
                <div className={styles.phoneGroup}>
                  <a href="tel:+380672671477">067 267 14 77</a>
                  <a href="tel:+380992671477">099 267 14 77</a>
                </div>
                <div className={styles.messengerButtons}>
                  <a
                    href="viber://chat?number=%2B380672671477"
                    className={styles.messengerBtn}
                  >
                    Viber
                  </a>
                  <a
                    href="tg://resolve?domain=YOUR_TG_NICKNAME"
                    className={styles.messengerBtn}
                  >
                    Telegram
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`animBentoCard ${styles.bentoCard} ${styles.size1x1}`}
            >
              <div className={styles.bentoContent}>
                <div className={styles.iconCircle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3>Email</h3>
                <a href="mailto:powergroup.vin@gmail.com">
                  powergroup.vin@gmail.com
                </a>
              </div>
            </div>

            <div
              className={`animBentoCard ${styles.bentoCard} ${styles.size1x1}`}
            >
              <div className={styles.bentoContent}>
                <div className={styles.iconCircle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3>Робочий час</h3>
                <p>
                  Пн-Пт: 8:30 - 17:30
                  <br />
                  Сб-Нд: Вихідні
                </p>
              </div>
            </div>
          </div>

          {/* Форма */}
          <div className={`animBentoCard ${styles.formWrapper}`}>
            <form className={styles.contactForm}>
              <h3 className={styles.formTitle}>Надіслати запит</h3>

              <div className={styles.inputGroup}>
                <label>Ваше ім'я *</label>
                <input type="text" required placeholder="Ім'я" />
              </div>

              <div className={styles.inputGroup}>
                <label>Ваш телефон *</label>
                <input type="tel" required placeholder="+38 (000) 000-00-00" />
              </div>

              <div className={styles.inputGroup}>
                <label>Ваш email</label>
                <input type="email" placeholder="Email" />
              </div>

              <div className={styles.inputGroup}>
                <label>Компанія</label>
                <input type="text" placeholder="Назва підприємства" />
              </div>

              <div className={styles.inputGroup}>
                <label>Ваше повідомлення</label>
                <textarea rows={4} placeholder="Текст запиту"></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Надіслати
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactContent;
