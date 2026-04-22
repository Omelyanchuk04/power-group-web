import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ContactModal.module.scss";

const ContactModal = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Гарантоване блокування скролу сторінки
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Форма відправлена");
    onClose();
  };

  return createPortal(
    <div className={styles.modalOverlay} onPointerDown={onClose}>
      {/* Обгортка для позиціонування форми і кольорових плям */}
      <div className={styles.modalWrapper}>
        {/* Розмиті фонові плями */}
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
            <div className={styles.inputGroup}>
              <label htmlFor="name">Ваше ім'я *</label>
              <input
                type="text"
                id="name"
                placeholder="Введіть ваше ім'я"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">Номер телефону *</label>
              <input
                type="tel"
                id="phone"
                placeholder="380_________"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Ваш Email</label>
              <input type="email" id="email" placeholder="example@mail.com" />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="company">Компанія</label>
              <input
                type="text"
                id="company"
                placeholder="Назва вашого підприємства"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message">Що вас цікавить?</label>
              <input type="text" id="message" placeholder="Опишіть ваш запит" />
            </div>

            <button type="submit" className={styles.submitButton}>
              <span>Отримати консультацію</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <div className={styles.privacyPolicy}>
              <label className={styles.checkboxContainer}>
                <input type="checkbox" required defaultChecked />
                <span className={styles.checkmark}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className={styles.policyText}>
                  Я погоджуюся з умовами{" "}
                  <a href="#">Політики конфіденційності</a> та{" "}
                  <a href="#">Обробки персональних даних</a>
                </span>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ContactModal;
