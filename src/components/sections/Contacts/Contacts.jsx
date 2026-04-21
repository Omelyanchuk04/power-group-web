"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Contacts.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const sectionTriggerRef = useRef(null);
  const bgRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Плавний паралакс фонової картинки
      gsap.fromTo(
        bgRef.current,
        { y: "-10%" },
        {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionTriggerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // Анімація контенту зліва (Заклик + Кнопка випливають)
      gsap.fromTo(
        leftSideRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionTriggerRef.current,
            start: "top 65%",
          },
        },
      );

      // Анімація панелі контактів справа
      gsap.fromTo(
        rightSideRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionTriggerRef.current,
            start: "top 65%",
          },
        },
      );
    }, sectionTriggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className={styles.contactTrigger}
      ref={sectionTriggerRef}
      id="contacts"
    >
      <div className={styles.pageBackground}>
        {/* Фонова картинка */}
        <div className={styles.bgImage} ref={bgRef}></div>
        {/* Затемнення для читабельності тексту */}
        <div className={styles.backgroundOverlay}></div>

        {/* Контейнер на 1200px */}
        <div className={styles.container}>
          <div className={styles.splitLayout}>
            {/* ЛІВА ЧАСТИНА: ЗАКЛИК ДО ДІЇ */}
            <div className={styles.ctaContent} ref={leftSideRef}>
              <span className={styles.badge}>Почнемо співпрацю</span>
              <h2 className={styles.title}>
                Готові до <br /> енергонезалежності?
              </h2>
              <p className={styles.subtitle}>
                Залиште заявку, і наші інженери зв'яжуться з вами для детальної
                безкоштовної консультації та розрахунку вартості проєкту.
              </p>

              <button className={styles.actionBtn}>
                <span>Замовити консультацію</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            {/* ПРАВА ЧАСТИНА: ПАНЕЛЬ КОНТАКТІВ */}
            <div className={styles.contactPanel} ref={rightSideRef}>
              <h3 className={styles.panelTitle}>Наші контакти</h3>

              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <div className={styles.iconBox}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className={styles.itemText}>
                    <span className={styles.label}>Телефони</span>
                    <a href="tel:0672671477">067 267 14 77</a>
                    <a href="tel:0992671477">099 267 14 77</a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.iconBox}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className={styles.itemText}>
                    <span className={styles.label}>Ел. пошта</span>
                    <a href="mailto:powergroup.vin@gmail.com">
                      powergroup.vin@gmail.com
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.iconBox}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className={styles.itemText}>
                    <span className={styles.label}>Адреса офісу</span>
                    <p>м. Вінниця, вул. Київська, 14</p>
                  </div>
                </div>
              </div>

              {/* Соціальні мережі / Месенджери */}
              <div className={styles.messengers}>
                <a
                  href="https://t.me/+380672671477"
                  className={styles.tg}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
                <a
                  href="viber://chat?number=%2B380672671477"
                  className={styles.viber}
                >
                  Viber
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
