"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image"; // 🔥 ДОДАНО: Імпортуємо Image для SEO
import styles from "../about.module.scss";

// 🔥 ЗМІНЕНО: Масив тепер містить не тільки шлях, але й SEO-опис (alt) для кожної картинки
const images = [
  {
    src: "/images/about-page-hero/about-hero-1.jpg",
    alt: "Електромонтажні роботи на промисловому об'єкті - ВІН ПАУЕР ГРУП",
  },
  {
    src: "/images/about-page-hero/about-hero-2.jpg",
    alt: "Встановлення сонячних електростанцій (СЕС) для бізнесу",
  },
  {
    src: "/images/about-page-hero/about-hero-3.jpg",
    alt: "Проєктування та монтаж систем резервного живлення",
  },
  {
    src: "/images/about-page-hero/about-hero-4.jpg",
    alt: "Команда спеціалістів-енергетиків ВІН ПАУЕР ГРУП за роботою",
  },
];

const AboutHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`${styles.hero} ${isMounted ? styles.mounted : ""}`}
      aria-labelledby="about-hero-title"
    >
      {/* 🔥 ЗМІНЕНО: Використовуємо Next.js Image замість CSS background-image */}
      {images.map((img, index) => (
        <div
          key={img.src}
          className={`${styles.bgImage} ${index === currentIndex ? styles.active : ""}`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={index === 0} // 🔥 ПЕРШЕ зображення вантажиться миттєво для ідеального LCP
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}

      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.badgeWrapper}>
          <span className={styles.badge}>Про компанію</span>
        </div>

        <div className={styles.textContent}>
          <h1 id="about-hero-title" className={styles.title}>
            Ваш надійний партнер <br /> у сфері електроенергетики
          </h1>
          <p className={styles.description}>
            Компанія <strong>ВІН ПАУЕР ГРУП</strong> реалізує проєкти будь-якої
            складності: від приватних домоволодінь до великих промислових
            об'єктів. Ми створюємо рішення, що забезпечують вашу енергетичну
            незалежність та стабільність.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
