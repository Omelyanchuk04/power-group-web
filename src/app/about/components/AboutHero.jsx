"use client";

import React, { useState, useEffect } from "react";
import styles from "../about.module.scss";

// Масив з твоїми картинками
const images = [
  "/images/about-page-hero/about-hero-1.jpg",
  "/images/about-page-hero/about-hero-2.jpg",
  "/images/about-page-hero/about-hero-3.jpg",
  "/images/about-page-hero/about-hero-4.jpg",
  "/images/about-page-hero/about-hero-5.jpg",
];

const AboutHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Запускаємо анімацію тексту одразу після завантаження сторінки
    setIsMounted(true);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Додаємо клас mounted для активації анімацій появи
    <section className={`${styles.hero} ${isMounted ? styles.mounted : ""}`}>
      {images.map((src, index) => (
        <div
          key={src}
          className={`${styles.bgImage} ${index === currentIndex ? styles.active : ""}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}

      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.badgeWrapper}>
          <span className={styles.badge}>Про компанію</span>
        </div>

        <div className={styles.textContent}>
          <h1 className={styles.title}>
            Ваш надійний партнер <br /> у сфері електроенергетики
          </h1>
          <p className={styles.description}>
            Компанія ВІН ПАУЕР ГРУП реалізує проєкти будь-якої складності: від
            приватних домоволодінь до великих промислових об'єктів. Ми створюємо
            рішення, що забезпечують вашу енергетичну незалежність.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
