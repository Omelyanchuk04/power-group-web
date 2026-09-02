"use client";

import React, { useEffect, useRef } from "react";
import NextImage from "next/image";
import gsap from "gsap";
// 🔥 Імпортуємо хук для модалки, як у хедері
import { useModal } from "@/context/ModalContext";
import styles from "./ServicesHero.module.scss";

export default function ServicesHero() {
  const containerRef = useRef(null);
  const textContentRef = useRef(null);
  const imagesRef = useRef([]);

  // 🔥 Дістаємо функцію відкриття модалки
  const { openModal } = useModal();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(textContentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1,
        clearProps: "all",
      });

      tl.from(
        imagesRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 50,
          rotation: () => gsap.utils.random(-15, 15),
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.2)",
        },
        "-=0.6",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.heroSection} ref={containerRef}>
      <div className={styles.centerGlow}></div>

      {/* РОЗКИДАНІ ФОТОГРАФІЇ */}
      <div className={styles.scatteredGallery}>
        <div
          className={`${styles.floatImg} ${styles.img1}`}
          ref={(el) => (imagesRef.current[0] = el)}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <NextImage
              src="/images/solar-panel-img.jpg"
              alt="СЕС"
              fill
              sizes="(max-width: 768px) 150px, 300px"
              className={styles.imgCover}
              priority
            />
          </div>
        </div>

        <div
          className={`${styles.floatImg} ${styles.img2}`}
          ref={(el) => (imagesRef.current[1] = el)}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <NextImage
              src="/images/electric-box-img.jpg"
              alt="Щитові"
              fill
              sizes="(max-width: 768px) 120px, 250px"
              className={styles.imgCover}
              priority
            />
          </div>
        </div>

        <div
          className={`${styles.floatImg} ${styles.img3}`}
          ref={(el) => (imagesRef.current[2] = el)}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <NextImage
              src="/images/installation-service-img.jpg"
              alt="Монтаж"
              fill
              sizes="(max-width: 768px) 150px, 300px"
              className={styles.imgCover}
              priority
            />
          </div>
        </div>

        <div
          className={`${styles.floatImg} ${styles.img4}`}
          ref={(el) => (imagesRef.current[3] = el)}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <NextImage
              src="/images/backup-power-img.jpg"
              alt="Генератори"
              fill
              sizes="(max-width: 768px) 150px, 300px"
              className={styles.imgCover}
              priority
            />
          </div>
        </div>

        <div
          className={`${styles.floatImg} ${styles.img5}`}
          ref={(el) => (imagesRef.current[4] = el)}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <NextImage
              src="/images/reconstruction-img.jpg"
              alt="Реконструкція"
              fill
              sizes="(max-width: 768px) 100vw, 150px"
              className={styles.imgCover}
            />
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content} ref={textContentRef}>
          <div className={styles.badge}>Наші послуги</div>

          <h1 className={styles.title}>
            Комплексні <br />
            енергетичні <br />
            рішення
          </h1>

          <p className={styles.description}>
            Компанія «ВІН ПАУЕР ГРУП» пропонує розробку оптимальних рішень та
            вибір обладнання, які будуть враховувати особливості об'єкта,
            бюджету та ваших очікувань.
          </p>

          <div className={styles.btnWrapper}>
            {/* 🔥 ТЕПЕР ТУТ ВИКЛИКАЄТЬСЯ openModal() 🔥 */}
            <button className={styles.primaryBtn} onClick={openModal}>
              Отримати консультацію
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
