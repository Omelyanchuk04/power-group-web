"use client";

import React from "react";
import styles from "./home.module.scss";

export default function AdminHomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Головна панель</h1>
      </div>

      <div className={styles.glassPanel}>
        <div className={styles.iconWrapper}>
          <div className={styles.waveIcon}>👋</div>
        </div>
        <h2 className={styles.title}>Вітаємо в системі управління</h2>
        <p className={styles.description}>
          Оберіть розділ <strong>Заявки з сайту</strong> для перегляду нових
          лідів або <strong>Усі проєкти</strong> для керування портфоліо у
          боковому меню ліворуч.
        </p>
      </div>
    </div>
  );
}
