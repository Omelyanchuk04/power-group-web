"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./contacts.module.scss";
import GlobalBackground from "@/components/layout/GlobalBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const initialFormState = {
  name: "",
  phone: "+38 (0",
  email: "",
  company: "",
  message: "",
  _gotcha: "",
};

export default function ContactsPage() {
  const containerRef = useRef(null);
  const bannerWrapperRef = useRef(null);
  const bannerRef = useRef(null);

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ВІН ПАУЕР ГРУП",
    image: "https://vinpowergroup.com/images/contacts/contacts-img.jpg",
    url: "https://vinpowergroup.com",
    telephone: "+380672671477",
    email: "powergroup.vin@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "вул. Київська, 14",
      addressLocality: "Вінниця",
      addressCountry: "UA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "17:30",
      },
    ],
  };

  useGSAP(
    () => {
      gsap.fromTo(
        `.${styles.heroContent}`,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );

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

  const formatPhoneInput = (value) => {
    let digits = value.replace(/\D/g, "");

    if (digits.length < 3) {
      digits = "380";
    } else if (!digits.startsWith("380")) {
      digits = "380" + digits.replace(/^38?0?/, "");
    }

    digits = digits.substring(0, 12);

    if (digits.length <= 3) return "+38 (0";
    if (digits.length <= 5) return `+38 (0${digits.substring(3, 5)}`;
    if (digits.length <= 8)
      return `+38 (0${digits.substring(3, 5)}) ${digits.substring(5, 8)}`;
    if (digits.length <= 10)
      return `+38 (0${digits.substring(3, 5)}) ${digits.substring(5, 8)}-${digits.substring(8, 10)}`;

    return `+38 (0${digits.substring(3, 5)}) ${digits.substring(5, 8)}-${digits.substring(8, 10)}-${digits.substring(10, 12)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, [name]: formatPhoneInput(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Введіть ваше ім'я";

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 12)
      newErrors.phone = "Введіть повний номер телефону";

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email))
        newErrors.email = "Введіть коректний email";
    }

    if (!formData.message.trim())
      newErrors.message = "Будь ласка, опишіть ваш запит";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData(initialFormState);
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <main className={styles.contactsPage} ref={containerRef}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

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
          aria-hidden="true"
        >
          <GlobalBackground isLayout={false} />
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <div className={styles.pageTopPadding}>
            <div className={styles.bannerWrapper} ref={bannerWrapperRef}>
              <div className={styles.heroBanner} ref={bannerRef}>
                <Image
                  src="/images/contacts/contacts-img.jpg"
                  alt="Офіс та команда ВІН ПАУЕР ГРУП"
                  fill
                  priority
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  className={styles.heroImg}
                />
                <div className={styles.heroOverlay} aria-hidden="true"></div>

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
              <article
                className={`${styles.bentoItem} ${styles.topCardSpan} ${styles.animBento}`}
              >
                <div className={styles.innerGlow} aria-hidden="true"></div>
                <header className={styles.cardHeader}>
                  <div className={styles.iconCircle} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <h2>Зв'язок</h2>
                </header>
                <div className={styles.cardDivider} aria-hidden="true"></div>
                <div className={styles.cardBody}>
                  <address
                    className={styles.linksGroup}
                    style={{ fontStyle: "normal" }}
                  >
                    <a href="tel:+380672671477">067 267 14 77</a>
                    <a href="tel:+380992671477">099 267 14 77</a>
                    <a
                      href="mailto:powergroup.vin@gmail.com"
                      className={styles.emailLink}
                    >
                      powergroup.vin@gmail.com
                    </a>
                  </address>
                </div>
              </article>

              <article
                className={`${styles.bentoItem} ${styles.topCardSpan} ${styles.animBento}`}
              >
                <div className={styles.innerGlow} aria-hidden="true"></div>
                <header className={styles.cardHeader}>
                  <div className={styles.iconCircle} aria-hidden="true">
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
                  <h2>Соцмережі</h2>
                </header>
                <div className={styles.cardDivider} aria-hidden="true"></div>
                <div className={styles.cardBody}>
                  <div className={styles.socialRow}>
                    <a
                      href="https://www.instagram.com/power_group.vn?igsi=bHgwcjBxdGV3YzMx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                      aria-label="Перейти на нашу сторінку в Instagram"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
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
                      aria-label="Написати нам у WhatsApp"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
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
                      aria-label="Написати нам у Telegram (номер 067)"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
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
                      aria-label="Написати нам у Telegram (номер 099)"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                      <span>Telegram (099)</span>
                    </a>
                  </div>
                </div>
              </article>

              <article
                className={`${styles.bentoItem} ${styles.topCardSpan} ${styles.animBento}`}
              >
                <div className={styles.innerGlow} aria-hidden="true"></div>
                <header className={styles.cardHeader}>
                  <div className={styles.iconCircle} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <h2>Графік роботи</h2>
                </header>
                <div className={styles.cardDivider} aria-hidden="true"></div>
                <div className={styles.cardBody}>
                  <div className={styles.scheduleBox}>
                    <div className={styles.scheduleRow}>
                      <span className={styles.scheduleDay}>Пн-Пт:</span>
                      <span className={styles.scheduleTime}>8:30 – 17:30</span>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span className={styles.scheduleDay}>Сб-Нд:</span>
                      <span className={styles.scheduleTime}>Вихідні</span>
                    </div>
                  </div>
                </div>
              </article>

              <article
                className={`${styles.bentoItem} ${styles.mapSpan} ${styles.animBento}`}
              >
                <iframe
                  title="Google Карта - Офіс ВІН ПАУЕР ГРУП у Вінниці"
                  src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=uk&amp;q=м.%20Вінниця,%20вул.%20Київська,%2014&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className={styles.mapOverlay} aria-hidden="true">
                  <div className={styles.iconCircleMap}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h4>Головний офіс</h4>
                    <p>м. Вінниця, вул. Київська, 14</p>
                  </div>
                </div>
              </article>

              <article
                className={`${styles.bentoItem} ${styles.formSpan} ${styles.animBento}`}
              >
                <div className={styles.innerGlow} aria-hidden="true"></div>

                {/* 🔥 ВИПРАВЛЕНО: Прибрано зайвий div, який ламав Flexbox */}
                {status === "success" || status === "error" ? (
                  <div className={styles.formResult} aria-live="polite">
                    {status === "success" ? (
                      <>
                        <div className={styles.iconSuccess} aria-hidden="true">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        </div>
                        <h3>Дякуємо!</h3>
                        <p>
                          Вашу заявку успішно відправлено. Ми зв'яжемося з вами
                          найближчим часом.
                        </p>
                      </>
                    ) : (
                      <>
                        <div className={styles.iconError} aria-hidden="true">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                          </svg>
                        </div>
                        <h3>Ой, помилка</h3>
                        <p>
                          Щось пішло не так при відправці. Будь ласка, спробуйте
                          пізніше або зателефонуйте нам.
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <header className={styles.formHeader}>
                      <h2>Залиште заявку</h2>
                      <p>І ми допоможемо підібрати найкраще рішення для вас</p>
                    </header>

                    <form
                      className={styles.contactForm}
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <input
                        type="text"
                        name="_gotcha"
                        value={formData._gotcha}
                        onChange={handleChange}
                        tabIndex="-1"
                        aria-hidden="true"
                        autoComplete="new-password"
                        style={{
                          position: "absolute",
                          opacity: 0,
                          top: "-9999px",
                          left: "-9999px",
                        }}
                      />

                      <div
                        className={`${styles.inputGroup} ${errors.name ? styles.hasError : ""}`}
                      >
                        <label htmlFor="name">
                          Ваше ім'я <span>*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Введіть ваше ім'я"
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                          <span className={styles.errorText} role="alert">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div
                        className={`${styles.inputGroup} ${errors.phone ? styles.hasError : ""}`}
                      >
                        <label htmlFor="phone">
                          Номер телефону <span>*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+38 (0__) ___-__-__"
                          aria-invalid={!!errors.phone}
                        />
                        {errors.phone && (
                          <span className={styles.errorText} role="alert">
                            {errors.phone}
                          </span>
                        )}
                      </div>

                      <div
                        className={`${styles.inputGroup} ${errors.email ? styles.hasError : ""}`}
                      >
                        <label htmlFor="email">Ваш Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@mail.com"
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <span className={styles.errorText} role="alert">
                            {errors.email}
                          </span>
                        )}
                      </div>

                      <div className={styles.inputGroup}>
                        <label htmlFor="company">Компанія</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Назва вашого підприємства"
                        />
                      </div>

                      <div
                        className={`${styles.inputGroup} ${errors.message ? styles.hasError : ""}`}
                      >
                        <label htmlFor="message">
                          Що вас цікавить? <span>*</span>
                        </label>
                        <input
                          type="text"
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Опишіть ваш запит"
                          aria-invalid={!!errors.message}
                        />
                        {errors.message && (
                          <span className={styles.errorText} role="alert">
                            {errors.message}
                          </span>
                        )}
                      </div>

                      <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={status === "loading"}
                      >
                        {status === "loading"
                          ? "Відправка..."
                          : "Отримати консультацію"}
                      </button>
                    </form>
                  </>
                )}
              </article>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
