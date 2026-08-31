"use client";

import React, { useState, useEffect } from "react";
import styles from "../contact.module.scss";

const ContactHero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className={`${styles.hero} ${isMounted ? styles.mounted : ""}`}>
      <div
        className={`${styles.bgImage} ${styles.active}`}
        style={{
          backgroundImage: `url('/images/about-page-hero/about-hero-1.jpg')`,
        }}
      />

      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.badgeWrapper}>
          <span className={styles.badge}>Зворотний зв'язок</span>
        </div>

        <div className={styles.textContent}>
          <h1 className={styles.title}>
            Завжди на зв'язку <br /> для ваших проєктів
          </h1>
          <p className={styles.description}>
            Ми з радістю відповімо на будь-які ваші запитання та підберемо
            оптимальне рішення саме для вашого замовлення.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
