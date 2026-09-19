"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useModal } from "@/context/ModalContext";
import styles from "./CatalogProductModal.module.scss";

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

const IconChevronRight = () => (
  <svg
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

export default function CatalogProductModal({ product, onClose }) {
  const [mounted, setMounted] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (product) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [product]);

  if (!mounted || !product) return null;

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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Ліва колонка (Зменшено ширину) */}
        <div className={styles.imageCol}>
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            className={styles.mainImg}
          />
        </div>

        {/* Права колонка (Розширено) */}
        <div className={styles.infoCol}>
          <div className={styles.headerBlock}>
            <h2 className={styles.title} title={product.name}>
              {product.name}
            </h2>
            <div className={styles.purchaseRow}>
              <span className={styles.category}>{product.category}</span>
              <button
                className={styles.buyButton}
                onClick={() => {
                  onClose();
                  openModal();
                }}
              >
                Замовити
              </button>
            </div>
          </div>

          <div className={styles.scrollContent}>
            {activeSpecs.length > 0 && (
              <div className={styles.specsList}>
                {activeSpecs.map((spec, index) => (
                  <div key={index} className={styles.specRow}>
                    <span className={styles.specLabel}>{spec.label}</span>
                    <span className={styles.specValue}>{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.specRow}>
              <div className={styles.descriptionText}>
                {product.description ||
                  `Це високоякісне обладнання від виробника ${product.filters?.brand || "нашого партнера"}, яке забезпечує стабільну роботу вашої сонячної електростанції чи системи накопичення.`}
              </div>
            </div>

            <div className={styles.exploreWrapper}>
              <a
                href={`/catalog/${product._id}`}
                className={styles.exploreLink}
              >
                Дізнатися більше <IconChevronRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
