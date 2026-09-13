"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./CatalogProductModal.module.scss";
import { CATEGORIES } from "./catalogData";

export default function CatalogProductModal({ product, onClose }) {
  // 1. Стан для відслідковування завантаження (потрібно для Next.js SSR)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  // Якщо компонент ще не змонтовано в браузері або немає продукту - нічого не рендеримо
  if (!mounted || !product) return null;

  const categoryLabel =
    CATEGORIES.find((c) => c.id === product.category)?.label || "Обладнання";

  // 2. 🔥 МАГІЯ ТУТ: createPortal рендерить модалку в document.body, ПОВЕРХ шапки!
  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.imageBanner}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.mainImg}
          />
        </div>

        <div className={styles.content}>
          <span className={styles.category}>{categoryLabel}</span>
          <h2 className={styles.title}>{product.name}</h2>

          <div className={styles.specsGrid}>
            {product.brand && (
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Виробник:</span>
                <span className={styles.specValue}>{product.brand}</span>
              </div>
            )}
            {product.power && (
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Потужність:</span>
                <span className={styles.specValue}>{product.power}</span>
              </div>
            )}
            {product.phase && (
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Кількість фаз:</span>
                <span className={styles.specValue}>{product.phase}</span>
              </div>
            )}
            {product.batType && (
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Тип батареї:</span>
                <span className={styles.specValue}>{product.batType}</span>
              </div>
            )}
            {product.type && (
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Тип:</span>
                <span className={styles.specValue}>{product.type}</span>
              </div>
            )}
          </div>

          <div className={styles.divider}></div>

          <div className={styles.description}>
            <h3>Опис обладнання</h3>
            <p>
              Це високоякісне обладнання від виробника{" "}
              {product.brand || "нашого партнера"}, яке забезпечує стабільну
              роботу вашої сонячної електростанції чи системи накопичення.
              {product.name} відповідає всім сучасним стандартам якості та
              безпеки. Для отримання точних технічних характеристик (Datasheet)
              або прорахунку вартості залиште заявку.
            </p>
          </div>

          <button
            className={styles.ctaButton}
            onClick={() => {
              alert("Тут відкриється форма для замовлення");
            }}
          >
            Отримати консультацію
          </button>
        </div>
      </div>
    </div>,
    document.body, // <-- Відправляємо модалку сюди
  );
}
