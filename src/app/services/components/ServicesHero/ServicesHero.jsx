"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./ServicesHero.module.scss";

export default function ServicesHero() {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(badgeRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      })
        .from(
          titleRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          descRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.heroSection} ref={containerRef}>
      {/* Фоновий елемент для глибини */}
      <div className={styles.bgGradient}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge} ref={badgeRef}>
            Наші послуги
          </div>
          <h1 className={styles.title} ref={titleRef}>
            Комплексні <span className={styles.accent}>енергетичні</span>{" "}
            рішення
          </h1>
          <p className={styles.description} ref={descRef}>
            Компанія «ВІН ПАУЕР ГРУП» пропонує розробку оптимальних рішень та
            вибір обладнання, які будуть враховувати особливості об'єкта,
            бюджету та ваших очікувань.
          </p>
        </div>
      </div>
    </section>
  );
}
