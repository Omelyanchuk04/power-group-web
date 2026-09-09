"use client";

import React from "react";
import Link from "next/link";
import styles from "./home.module.scss";

// --- ІКОНКИ ---
const IconInbox = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
  </svg>
);
const IconProjects = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);
const IconHome = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
const IconChevronRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default function AdminHomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Головна панель</h1>
      </div>

      <div className={styles.glassPanel}>
        <h2 className={styles.title}>Вітаємо в системі управління</h2>
        <p className={styles.subtitle}>Оберіть потрібний розділ для роботи</p>

        {/* Вертикальний список без бордерів */}
        <div className={styles.menuList}>
          <Link href="/admin/leads" className={styles.menuRow}>
            <div className={`${styles.rowIcon} ${styles.blueIcon}`}>
              <IconInbox />
            </div>
            <div className={styles.rowInfo}>
              <h3>Заявки з сайту</h3>
              <span>Перегляд та обробка лідів</span>
            </div>
            <div className={styles.chevron}>
              <IconChevronRight />
            </div>
          </Link>

          <Link href="/admin/projects" className={styles.menuRow}>
            <div className={`${styles.rowIcon} ${styles.orangeIcon}`}>
              <IconProjects />
            </div>
            <div className={styles.rowInfo}>
              <h3>Усі проєкти</h3>
              <span>Керування портфоліо</span>
            </div>
            <div className={styles.chevron}>
              <IconChevronRight />
            </div>
          </Link>

          <Link href="/" className={styles.menuRow}>
            <div className={`${styles.rowIcon} ${styles.grayIcon}`}>
              <IconHome />
            </div>
            <div className={styles.rowInfo}>
              <h3>Клієнтський сайт</h3>
              <span>Повернутися на сайт</span>
            </div>
            <div className={styles.chevron}>
              <IconChevronRight />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
