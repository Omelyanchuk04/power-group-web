"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./ProjectsHero.module.scss";

export default function ProjectsHero() {
  const containerRef = useRef(null);
  const countersRef = useRef([]);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        `.${styles.badge}, .${styles.title}, .${styles.desc}`,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" },
      );

      tl.fromTo(
        `.${styles.statBlock}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      );

      countersRef.current.forEach((counter) => {
        if (!counter) return;
        const targetValue = parseInt(
          counter.getAttribute("data-target") || "0",
          10,
        );
        const suffix = counter.getAttribute("data-suffix") || "";

        // Починаємо анімацію з 0, незважаючи на те, що в HTML вже лежить фінальна цифра
        gsap.fromTo(
          counter,
          { innerHTML: 0 },
          {
            innerHTML: targetValue,
            duration: 2,
            ease: "power3.out",
            snap: { innerHTML: 1 },
            onUpdate: function () {
              counter.innerHTML =
                Math.round(Number(this.targets()[0].innerHTML)) + suffix;
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      className={styles.heroSection}
      ref={containerRef}
      aria-labelledby="portfolio-hero-title"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>Наше портфоліо</span>

          {/* Прив'язуємо секцію до головного заголовка сторінки */}
          <h1 id="portfolio-hero-title" className={styles.title}>
            Енергонезалежність, яку ми вже створили
          </h1>

          <p className={styles.desc}>
            Від приватних будинків до великих промислових підприємств. Ми
            пишаємося кожним <strong>проєктом</strong>, забезпечуючи стабільну
            енергію там, де вона потрібна найбільше.
          </p>

          <div className={styles.statsRow}>
            <div className={styles.statBlock}>
              <h3
                ref={(el) => {
                  countersRef.current[0] = el;
                }}
                data-target="150"
                data-suffix="+"
              >
                {/* 🔥 ЗМІНЕНО: Віддаємо пошуковику реальну цифру замість 0 */}
                150+
              </h3>
              <p>Реалізованих об'єктів</p>
            </div>

            <div className={styles.statBlock}>
              <h3
                ref={(el) => {
                  countersRef.current[1] = el;
                }}
                data-target="15"
                data-suffix=" МВт"
              >
                15 МВт
              </h3>
              <p>Загальна потужність</p>
            </div>

            <div className={styles.statBlock}>
              <h3
                ref={(el) => {
                  countersRef.current[2] = el;
                }}
                data-target="5"
                data-suffix=" років"
              >
                5 років
              </h3>
              <p>Досвіду на ринку</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
