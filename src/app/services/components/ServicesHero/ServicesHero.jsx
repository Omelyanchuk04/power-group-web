"use client";

import React, { useEffect, useRef } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import styles from "./ServicesHero.module.scss";

export default function ServicesHero() {
  const containerRef = useRef(null);
  const textContentRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Анімація центрального тексту
      tl.from(textContentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1,
      });

      // 2. Ефектна поява "розкиданих" картинок
      tl.from(
        imagesRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 50,
          rotation: () => gsap.utils.random(-15, 15), // Легкий нахил при появі
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.2)",
        },
        "-=0.6", // Починаємо ще до того, як закінчиться текст
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.heroSection} ref={containerRef}>
      {/* М'яке світіння під текстом, щоб він завжди легко читався */}
      <div className={styles.centerGlow}></div>

      {/* РОЗКИДАНІ ФОТОГРАФІЇ */}
      <div className={styles.scatteredGallery}>
        {/* Фото 1: Зверху зліва */}
        <div
          className={`${styles.floatImg} ${styles.img1}`}
          ref={(el) => (imagesRef.current[0] = el)}
        >
          <NextImage
            src="/images/solar-panel-img.jpg"
            alt="СЕС"
            fill
            className={styles.imgCover}
          />
        </div>

        {/* Фото 2: Зверху справа (Кругле/Квадратне) */}
        <div
          className={`${styles.floatImg} ${styles.img2}`}
          ref={(el) => (imagesRef.current[1] = el)}
        >
          <NextImage
            src="/images/electric-box-img.jpg"
            alt="Щитові"
            fill
            className={styles.imgCover}
          />
        </div>

        {/* Фото 3: Знизу зліва */}
        <div
          className={`${styles.floatImg} ${styles.img3}`}
          ref={(el) => (imagesRef.current[2] = el)}
        >
          <NextImage
            src="/images/installation-service-img.jpg"
            alt="Монтаж"
            fill
            className={styles.imgCover}
          />
        </div>

        {/* Фото 4: Знизу справа */}
        <div
          className={`${styles.floatImg} ${styles.img4}`}
          ref={(el) => (imagesRef.current[3] = el)}
        >
          <NextImage
            src="/images/backup-power-img.jpg"
            alt="Генератори"
            fill
            className={styles.imgCover}
          />
        </div>

        {/* Фото 5: Розмите на задньому фоні (додає глибини 3D) */}
        <div
          className={`${styles.floatImg} ${styles.img5}`}
          ref={(el) => (imagesRef.current[4] = el)}
        >
          <NextImage
            src="/images/reconstruction-img.jpg"
            alt="Реконструкція"
            fill
            className={styles.imgCover}
          />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content} ref={textContentRef}>
          <div className={styles.badge}>Наші послуги</div>

          <h1 className={styles.title}>
            Комплексні <br />
            <span className={styles.accent}>енергетичні</span> рішення
          </h1>

          <p className={styles.description}>
            Компанія «ВІН ПАУЕР ГРУП» пропонує розробку оптимальних рішень та
            вибір обладнання, які будуть враховувати особливості об'єкта,
            бюджету та ваших очікувань.
          </p>

          <button
            className={styles.primaryBtn}
            onClick={() =>
              document
                .querySelector("#contact-cta")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Отримати консультацію
          </button>
        </div>
      </div>
    </section>
  );
}
