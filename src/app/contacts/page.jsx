"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./contacts.module.scss";
import GlobalBackground from "../../components/layout/GlobalBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ContactsPage() {
  const containerRef = useRef(null);
  const bannerWrapperRef = useRef(null);
  const bannerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Анімація для тексту на банері
      gsap.fromTo(
        `.${styles.heroContent}`,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
      );

      // 2. Розширення обгортки банера
      gsap.to(bannerWrapperRef.current, {
        maxWidth: "100%",
        paddingLeft: "0px",
        paddingRight: "0px",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=350",
          scrub: 0.5,
        },
        immediateRender: false,
      });

      // 3. Прибирання заокруглень банера
      gsap.to(bannerRef.current, {
        borderRadius: "0px",
        borderWidth: "0px",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=350",
          scrub: 0.5,
        },
        immediateRender: false,
      });

      // 4. Ідеально плавна анімація карток (ТОЧНО як у AboutExperience)
      gsap.fromTo(
        `.${styles.animBento}`,
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.bentoGrid}`,
            start: "top 80%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <main className={styles.contactsPage} ref={containerRef}>
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "-800px",
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
            backgroundColor: "#f9fafb",
          }}
        >
          <GlobalBackground isLayout={false} />
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <div className={styles.pageTopPadding}>
            <div className={styles.bannerWrapper} ref={bannerWrapperRef}>
              <div className={styles.heroBanner} ref={bannerRef}>
                <img
                  src="/images/contacts/contacts-img.jpg"
                  alt="Контакти"
                  className={styles.heroImg}
                  fetchPriority="high"
                />
                <div className={styles.heroOverlay}></div>

                <div className={styles.heroContent}>
                  <h1 className={styles.title}>Контакти</h1>
                  <p className={styles.subtitle}>
                    Готові відповісти на ваші запитання та розробити оптимальне
                    енергетичне рішення.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.bentoGrid}>
              {/* РЯД 1: ТРИ КАРТКИ */}

              {/* 1. Телефони та Пошта */}
              <div
                className={`${styles.bentoItem} ${styles.topCardSpan} ${styles.animBento}`}
              >
                <div className={styles.innerGlow}></div>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircle}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <h3>Зв'язок</h3>
                </div>
                <div className={styles.cardDivider}></div>
                <div className={styles.cardBody}>
                  <div className={styles.linksGroup}>
                    <a href="tel:+380672671477">067 267 14 77</a>
                    <a href="tel:+380992671477">099 267 14 77</a>
                    <a
                      href="mailto:powergroup.vin@gmail.com"
                      className={styles.emailLink}
                    >
                      powergroup.vin@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* 2. Графік роботи (Тепер на другому місці) */}
              <div
                className={`${styles.bentoItem} ${styles.topCardSpan} ${styles.animBento}`}
              >
                <div className={styles.innerGlow}></div>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircle}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <h3>Графік роботи</h3>
                </div>
                <div className={styles.cardDivider}></div>
                <div className={styles.cardBody}>
                  <div className={styles.scheduleBox}>
                    <div className={styles.scheduleRow}>
                      <span className={styles.scheduleDay}>Пн-Пт:</span>
                      <span className={styles.scheduleTime}>
                        8:30 – 17:30[cite: 1]
                      </span>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span className={styles.scheduleDay}>Сб-Нд:</span>
                      <span className={styles.scheduleTime}>
                        Вихідні[cite: 1]
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Соцмережі (Тепер на третьому місці) */}
              <div
                className={`${styles.bentoItem} ${styles.topCardSpan} ${styles.animBento}`}
              >
                <div className={styles.innerGlow}></div>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircle}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                  <h3>Соцмережі</h3>
                </div>
                <div className={styles.cardDivider}></div>
                <div className={styles.cardBody}>
                  <div className={styles.socialRow}>
                    <a
                      href="https://www.instagram.com/power_group.vn?igsi=bHgwcjBxdGV3YzMx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      <span>Instagram</span>
                    </a>
                    <a
                      href="https://wa.me/380672671477"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href="https://t.me/+380672671477"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                      <span>Telegram (067)</span>
                    </a>
                    <a
                      href="https://t.me/+380992671477"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                      <span>Telegram (099)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* РЯД 2: КАРТА ТА ФОРМА */}

              <div
                className={`${styles.bentoItem} ${styles.mapSpan} ${styles.animBento}`}
              >
                <iframe
                  src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=uk&amp;q=м.%20Вінниця,%20вул.%20Київська,%2014&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className={styles.mapOverlay}>
                  <div className={styles.iconCircleMap}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h4>Головний офіс</h4>
                    <p>м. Вінниця, вул. Київська, 14[cite: 1]</p>
                  </div>
                </div>
              </div>

              <div
                className={`${styles.bentoItem} ${styles.formSpan} ${styles.animBento}`}
              >
                <div className={styles.innerGlow}></div>
                <div className={styles.formHeader}>
                  <h2>Залиште заявку</h2>
                  <p>І ми допоможемо підібрати найкраще рішення для вас</p>
                </div>

                <form className={styles.contactForm}>
                  <div className={styles.inputGroup}>
                    <label>
                      Ваше ім'я <span>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Введіть ваше ім'я"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>
                      Номер телефону <span>*</span>
                    </label>
                    <input type="tel" required placeholder="380________" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Ваш Email</label>
                    <input type="email" placeholder="example@mail.com" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Компанія</label>
                    <input
                      type="text"
                      placeholder="Назва вашого підприємства"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Що вас цікавить?</label>
                    <input type="text" placeholder="Опишіть ваш запит" />
                  </div>
                  <button type="submit" className={styles.submitBtn}>
                    Отримати консультацію
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
