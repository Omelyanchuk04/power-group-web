"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ContactModal.module.scss";

// 🔥 Виносимо початковий стан в окрему константу, щоб телефон ОДРАЗУ мав +380
const initialFormState = {
  name: "",
  phone: "+38 (0",
  email: "",
  company: "",
  message: "",
  _gotcha: "",
};

const ContactModal = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      setStatus("idle");
      setErrors({});
      // Скидаємо форму до початкового стану (з жорстким префіксом телефону) при закритті
      setFormData(initialFormState);
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // 🔥 РОЗУМНА І ЖОРСТКА МАСКА ТЕЛЕФОНУ
  const formatPhoneInput = (value) => {
    let digits = value.replace(/\D/g, "");

    // 1. Жорстко блокуємо видалення базового коду 380
    if (digits.length < 3) {
      digits = "380";
    }
    // 2. Якщо користувач вставив скопійований номер без 380 (наприклад, 097...)
    else if (!digits.startsWith("380")) {
      digits = "380" + digits.replace(/^38?0?/, "");
    }

    digits = digits.substring(0, 12); // Обмежуємо довжину 12 цифрами

    // 3. Формуємо красивий вивід, який дружній до клавіші Backspace
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

    // Прибираємо підсвітку помилки під час вводу
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Введіть ваше ім'я";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 12) {
      newErrors.phone = "Введіть повний номер телефону";
    }

    // 🔥 Нормальна валідація Email (перевіряємо, тільки якщо користувач щось ввів)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Введіть коректний email";
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Будь ласка, опишіть ваш запит";
    }

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
        setFormData(initialFormState); // Скидаємо до стану з префіксом телефону
        setTimeout(() => onClose(), 4000);
      } else {
        setStatus("error");
        setTimeout(() => onClose(), 4000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => onClose(), 2500);
    }
  };

  // Екран успіху/помилки
  if (status === "success" || status === "error") {
    return createPortal(
      <div className={styles.modalOverlay}>
        <div className={styles.modalWrapper}>
          <div className={styles.blobBlue}></div>
          <div className={styles.blobYellow}></div>
          <div className={styles.toastModalContent}>
            {status === "success" ? (
              <>
                <div className={styles.iconSuccess}>
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
                <div className={styles.iconError}>
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
                  Щось пішло не так при відправці. Будь ласка, спробуйте пізніше
                  або зателефонуйте нам.
                </p>
              </>
            )}
          </div>
        </div>
      </div>,
      document.body,
    );
  }

  // Головний екран форми
  return createPortal(
    <div className={styles.modalOverlay} onPointerDown={onClose}>
      <div className={styles.modalWrapper}>
        <div className={styles.blobBlue}></div>
        <div className={styles.blobYellow}></div>
        <div
          className={styles.modalContent}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Закрити"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className={styles.modalHeader}>
            <h3>Залиште заявку</h3>
            <p>І ми допоможемо підібрати найкраще рішення для вас</p>
          </div>

          <form
            className={styles.contactForm}
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Honeypot поле (захист від ботів) */}
            <input
              type="text"
              name="_gotcha"
              value={formData._gotcha}
              onChange={handleChange}
              tabIndex="-1"
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
              <label htmlFor="name">Ваше ім'я *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Введіть ваше ім'я"
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>

            <div
              className={`${styles.inputGroup} ${errors.phone ? styles.hasError : ""}`}
            >
              <label htmlFor="phone">Номер телефону *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+38 (0__) ___-__-__"
              />
              {errors.phone && (
                <span className={styles.errorText}>{errors.phone}</span>
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
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
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
              <label htmlFor="message">Що вас цікавить? *</label>
              <input
                type="text"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Опишіть ваш запит"
              />
              {errors.message && (
                <span className={styles.errorText}>{errors.message}</span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Відправка..." : "Отримати консультацію"}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ContactModal;
