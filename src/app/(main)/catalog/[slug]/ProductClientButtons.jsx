"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext"; // Підключаємо контекст форми
import styles from "./page.module.scss";

// 1. РОЗУМНА КНОПКА "НАЗАД"
export function BackButton() {
  const router = useRouter();

  const handleBack = (e) => {
    e.preventDefault();
    // Якщо історія є - повертаємось на крок назад (зберігаючи позицію скролу)
    if (window.history.length > 2) {
      router.back();
    } else {
      // Якщо відкрили в новій вкладці - просто кидаємо на каталог
      router.push("/catalog");
    }
  };

  return (
    <button
      onClick={handleBack}
      className={styles.backLink}
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        font: "inherit",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      Назад до каталогу
    </button>
  );
}

// 2. КНОПКА ВИКЛИКУ ФОРМИ
export function ConsultButton() {
  const { openModal } = useModal();

  return (
    <button className={styles.ctaButton} onClick={openModal}>
      Отримати консультацію
    </button>
  );
}
