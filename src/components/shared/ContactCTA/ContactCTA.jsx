"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./ContactCTA.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ContactCTA() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".animCtaItem",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.ctaSection}`,
            start: "top 85%",
          },
        },
      );
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <section className={styles.ctaSection} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.mainWrapper}>
          {/* ЛІВА ЧАСТИНА: Текст тепер не зверху, а збоку */}
          <div className={`${styles.textContent} animCtaItem`}>
            <span className={styles.badge}>Зворотний зв'язок</span>
            <h2>Залиште заявку</h2>
            <p>
              Допоможемо підібрати найкраще рішення для вашого об'єкту.
              Консультація безкоштовна.
            </p>
            <div className={styles.phoneLink}>
              Або дзвоніть: <a href="tel:0672671477">067 267 14 77</a>
            </div>
          </div>

          {/* ПРАВА ЧАСТИНА: Компактна сітка інпутів */}
          <div className={`${styles.formContent} animCtaItem`}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.grid}>
                <div className={styles.inputGroup}>
                  <label>Ім'я *</label>
                  <input type="text" placeholder="Олександр" required />
                </div>
                <div className={styles.inputGroup}>
                  <label>Телефон *</label>
                  <input type="tel" placeholder="380" required />
                </div>
                <div className={styles.inputGroup}>
                  <label>Email</label>
                  <input type="email" placeholder="mail@example.com" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Що цікавить?</label>
                  <input type="text" placeholder="Опишіть запит" />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                <span>Відправити</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
