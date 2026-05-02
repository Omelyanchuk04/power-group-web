"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ContactCTA.module.scss";

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    request: "",
  });

  const [errors, setErrors] = useState({});

  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const formWrapperRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // 1. Поява всієї картки (Іконка з'явиться одразу з нею, статично на своєму місці)
      tl.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform",
      })

        // 2. ТЕКСТИ: плавно виїжджають знизу по черзі
        .from(
          [
            `.${styles.badgeOverlay}`,
            `.${styles.title}`,
            `.${styles.subtitle}`,
            `.${styles.directContacts}`,
          ],
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all",
          },
          "-=0.4",
        )

        // 3. ФОРМА: виїжджає справа
        .from(
          formWrapperRef.current,
          {
            x: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "all",
          },
          "-=0.6",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      const truncated = numericValue.slice(0, 9);

      let formattedPhone = truncated;
      if (truncated.length > 7) {
        formattedPhone = `${truncated.slice(0, 2)}-${truncated.slice(2, 5)}-${truncated.slice(5, 7)}-${truncated.slice(7)}`;
      } else if (truncated.length > 5) {
        formattedPhone = `${truncated.slice(0, 2)}-${truncated.slice(2, 5)}-${truncated.slice(5)}`;
      } else if (truncated.length > 2) {
        formattedPhone = `${truncated.slice(0, 2)}-${truncated.slice(2)}`;
      }

      setFormData((prev) => ({ ...prev, [name]: formattedPhone }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ім'я є обов'язковим";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон є обов'язковим";
    } else if (formData.phone.replace(/\D/g, "").length !== 9) {
      newErrors.phone = "Введіть 9 цифр номера";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Введіть коректний email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Форма відправлена успішно:", formData);
      alert("Дякуємо! Ваша заявка успішно відправлена.");
      setFormData({ name: "", phone: "", email: "", company: "", request: "" });
    }
  };

  return (
    <section className={styles.ctaSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.glassCard} ref={cardRef}>
          <div className={styles.textContent}>
            {/* <div className={styles.badgeOverlay}>Швидка відповідь</div> */}

            <div className={styles.iconCircle}>
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
            </div>

            <h2 className={styles.title}>Залишилися питання?</h2>
            <p className={styles.subtitle}>
              Якщо у Вас є питання, або ви хочете співпрацювати — заповніть
              форму зворотного зв’язку і ми надамо відповідь у найкоротші
              терміни.
            </p>

            <div className={styles.directContacts}>
              <p>Або зв'яжіться з нами напряму:</p>
              <div className={styles.contactLinks}>
                <a href="tel:0672671477" className={styles.link}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  067 267 14 77
                </a>
              </div>
            </div>
          </div>

          <div className={styles.formWrapper} ref={formWrapperRef}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.grid}>
                <div className={styles.inputGroup}>
                  <label>Ваше ім'я *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Введіть ваше ім'я"
                    className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                  />
                  {errors.name && (
                    <span className={styles.errorText}>{errors.name}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label>Номер телефону *</label>
                  <div
                    className={`${styles.phoneInputWrapper} ${errors.phone ? styles.wrapperError : ""}`}
                  >
                    <span className={styles.prefix}>380</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="XX-XXX-XX-XX"
                      className={styles.innerInput}
                    />
                  </div>
                  {errors.phone && (
                    <span className={styles.errorText}>{errors.phone}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label>Ваш Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  />
                  {errors.email && (
                    <span className={styles.errorText}>{errors.email}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label>Компанія</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Назва вашого підприємства"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroupFull}>
                <label>Що вас цікавить?</label>
                <input
                  type="text"
                  name="request"
                  value={formData.request}
                  onChange={handleChange}
                  placeholder="Опишіть ваш запит"
                  className={styles.input}
                />
              </div>

              <button type="submit" className={styles.ctaButton}>
                <span>Отримати консультацію</span>
                <svg
                  className={styles.btnIcon}
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
