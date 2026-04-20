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
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 🔥 1. ЕФЕКТ ЗАЛИПАННЯ ПОПЕРЕДНЬОЇ СЕКЦІЇ (0 лагів)
      const prevSection = sectionTriggerRef.current?.previousElementSibling;
      if (prevSection) {
        ScrollTrigger.create({
          trigger: sectionTriggerRef.current,
          start: "top bottom", // Починаємо, коли контакти торкаються низу екрана
          end: "bottom bottom", // Закінчуємо, коли контакти повністю на екрані
          pin: prevSection, // Фіксуємо попередню секцію
          pinSpacing: false, // Дозволяємо контактам "наїхати" поверх неї
        });
      }

      // 🔥 2. Плавний паралакс тільки для фону (не навантажує сторінку)
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

      // 3. Поява тексту
      gsap.fromTo(
        infoRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionTriggerRef.current,
            start: "top 70%",
          },
        },
      );

      // 4. Поява форми
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionTriggerRef.current,
            start: "top 70%",
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
      <div className={styles.parallaxWrapper}>
        <div className={styles.bgImage} ref={bgRef}></div>
        <div className={styles.backgroundOverlay}></div>

        <div className={styles.container}>
          <div className={styles.centeredBadge}>
            <span className={styles.badge}>Зв'язок</span>
          </div>

          <div className={styles.splitLayout}>
            {/* ЛІВА ЧАСТИНА */}
            <div className={styles.infoSide} ref={infoRef}>
              <h2 className={styles.title}>
                Обговоримо <br /> ваш проєкт?
              </h2>
              <p className={styles.subtitle}>
                Ми з радістю відповімо на будь-які ваші запитання та підберемо
                оптимальне рішення саме для вашого замовлення.
              </p>

              <div className={styles.contactList}>
                <div className={styles.contactRow}>
                  <div className={styles.miniIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className={styles.textWrapper}>
                    <span className={styles.caption}>Адреса</span>
                    <p>м. Вінниця, вул. Київська, 14</p>
                  </div>
                </div>

                <div className={styles.contactRow}>
                  <div className={styles.miniIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className={styles.textWrapper}>
                    <span className={styles.caption}>Робочий час</span>
                    <p>Пн–Пт: 8:30 – 17:30</p>
                  </div>
                </div>

                <div className={styles.contactRow}>
                  <div className={styles.miniIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className={styles.textWrapper}>
                    <span className={styles.caption}>Ел. пошта</span>
                    <a href="mailto:powergroup.vin@gmail.com">
                      powergroup.vin@gmail.com
                    </a>
                  </div>
                </div>

                <div className={styles.contactRow}>
                  <div className={styles.miniIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className={styles.textWrapper}>
                    <span className={styles.caption}>Телефони</span>
                    <div className={styles.phoneStack}>
                      <a href="tel:0672671477">067 267 14 77</a>
                      <a href="tel:0992671477">099 267 14 77</a>
                    </div>
                  </div>
                </div>
              </div>

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

            {/* ПРАВА ЧАСТИНА: ФОРМА */}
            <div className={styles.formSide} ref={formRef}>
              <div className={styles.glassWrapper}>
                <form className={styles.modernForm} autoComplete="off">
                  <h3 className={styles.formTitle}>Швидкий запит</h3>

                  <div className={styles.row}>
                    <div className={styles.inputWrapper}>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder=" "
                        autoComplete="new-password"
                      />
                      <label>Ваше ім'я*</label>
                      <div className={styles.line}></div>
                    </div>
                    <div className={styles.inputWrapper}>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder=" "
                        autoComplete="new-password"
                      />
                      <label>Ваш телефон*</label>
                      <div className={styles.line}></div>
                    </div>
                  </div>

                  <div className={styles.inputWrapper}>
                    <input
                      type="email"
                      name="email"
                      placeholder=" "
                      autoComplete="new-password"
                    />
                    <label>Email</label>
                    <div className={styles.line}></div>
                  </div>

                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      name="company"
                      placeholder=" "
                      autoComplete="new-password"
                    />
                    <label>Компанія</label>
                    <div className={styles.line}></div>
                  </div>

                  <div className={styles.inputWrapper}>
                    <textarea
                      name="message"
                      placeholder=" "
                      rows="4"
                      autoComplete="off"
                    ></textarea>
                    <label>Ваше повідомлення</label>
                    <div className={styles.line}></div>
                  </div>

                  <button type="submit" className={styles.actionBtn}>
                    <span>Надіслати запит</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
