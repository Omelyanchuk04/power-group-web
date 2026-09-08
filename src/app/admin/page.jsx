"use client";

import React from "react";
import Link from "next/link";
import styles from "./home.module.scss";

const IconLeads = () => (
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
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

        <div className={styles.menuList}>
          <Link href="/admin/leads" className={styles.menuRow}>
            <div className={`${styles.rowIcon} ${styles.blueIcon}`}>
              <IconLeads />
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
              <h3>На головну</h3>
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
