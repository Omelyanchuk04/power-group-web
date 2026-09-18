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

// 🔥 ІКОНКА PDF 🔥
const IconFileText = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

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

          {/* 🔥 ВІДОБРАЖЕННЯ PDF ДОКУМЕНТУ 🔥 */}
          {product.datasheetUrl && (
            <div className={styles.documentSection}>
              <h3>Технічна документація</h3>
              <a
                href={product.datasheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.pdfLinkBox}
              >
                <div className={styles.pdfIcon}>
                  <IconFileText />
                </div>
                <span className={styles.pdfText}>
                  Завантажити або переглянути Datasheet
                </span>
              </a>
            </div>
          )}

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
