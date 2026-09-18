"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./CatalogProductModal.module.scss";

// Мапінг англійських ключів фільтрів у зрозумілі назви
const FILTER_LABELS = {
  brand: "Виробник (бренд)",
  power: "Потужність",
  dimensions: "Габарити",
  phase: "Кількість фаз",
  type: "Тип",
  executionType: "Тип виконання",
  subcategory: "Підкатегорія (розділ)",
  batteryType: "Тип батареї",
};

export default function CatalogProductModal({ product, onClose }) {
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

  if (!mounted || !product) return null;

  // Формуємо масив наявних характеристик
  const activeSpecs = [];
  if (product.filters) {
    Object.keys(product.filters).forEach((key) => {
      if (product.filters[key]) {
        activeSpecs.push({
          label: FILTER_LABELS[key] || key,
          value: product.filters[key],
        });
      }
    });
  }

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
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            className={styles.mainImg}
          />
        </div>

        <div className={styles.content}>
          <span className={styles.category}>{product.category}</span>
          <h2 className={styles.title}>{product.name}</h2>

          {activeSpecs.length > 0 && (
            <div className={styles.specsGrid}>
              {activeSpecs.map((spec, index) => (
                <div key={index} className={styles.specItem}>
                  <span className={styles.specLabel}>{spec.label}:</span>
                  <span className={styles.specValue}>{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          <div className={styles.divider}></div>

          <div className={styles.description}>
            <h3>Опис обладнання</h3>
            <p>
              {product.description ||
                `Це високоякісне обладнання від виробника ${product.filters?.brand || "нашого партнера"}, яке забезпечує стабільну роботу вашої сонячної електростанції чи системи накопичення.`}
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
    document.body,
  );
}
