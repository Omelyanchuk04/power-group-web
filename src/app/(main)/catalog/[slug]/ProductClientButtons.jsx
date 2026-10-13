"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import styles from "./page.module.scss";

export function BackButton() {
  const router = useRouter();

  const handleBack = (e) => {
    e.preventDefault();
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/catalog");
    }
  };

  return (
    <button
      onClick={handleBack}
      className={styles.backLink}
      aria-label="Повернутися до каталогу обладнання"
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
        aria-hidden="true"
        focusable="false"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      Назад до каталогу
    </button>
  );
}

export function ConsultButton() {
  const { openModal } = useModal();

  return (
    <button
      className={styles.ctaButton}
      onClick={openModal}
      aria-haspopup="dialog"
      aria-label="Відкрити форму для отримання консультації"
    >
      Отримати консультацію
    </button>
  );
}
