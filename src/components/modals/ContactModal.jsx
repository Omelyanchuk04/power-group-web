"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ContactModal.module.scss";

const ContactModal = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
    _gotcha: "", // 🔥 Перейменована пастка для ботів
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  useEffect(() => {
    setMounted(true);
  }, []);

  // Блокування скролу
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      setStatus("idle"); // Скидаємо статус при закритті
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          phone: "",
          email: "",
          company: "",
          message: "",
          _gotcha: "", // Скидаємо пастку
        });

        // Вікно успіху висить 4 секунди, потім повністю закривається
        setTimeout(() => {
          onClose();
        }, 4000);
      } else {
        setStatus("error");
        setTimeout(() => {
          onClose();
        }, 4000);
      }
    } catch (error) {
      console.error("Помилка відправки:", error);
      setStatus("error");
      setTimeout(() => {
        onClose();
      }, 2500);
    }
  };

  // 🔥 ЯКЩО УСПІХ АБО ПОМИЛКА — ПОКАЗУЄМО СТИЛІЗОВАНЕ ВІКНО 🔥
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

  // 🔥 ЯКЩО IDLE АБО LOADING — ПОКАЗУЄМО ФОРМУ 🔥
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

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            {/* 🔥 HONEYPOT: Приховане поле від спам-ботів 🔥 */}
            <input
              type="text"
              name="_gotcha"
              value={formData._gotcha}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="new-password" // Забороняємо браузеру автозаповнення
              style={{
                position: "absolute",
                opacity: 0,
                top: "-9999px",
                left: "-9999px",
              }}
            />

            <div className={styles.inputGroup}>
              <label htmlFor="name">Ваше ім'я *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Введіть ваше ім'я"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">Номер телефону *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="380_________"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Ваш Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
              />
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

            <div className={styles.inputGroup}>
              <label htmlFor="message">Що вас цікавить?</label>
              <input
                type="text"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Опишіть ваш запит"
              />
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
