import React from "react";
import Link from "next/link";
import styles from "./CatalogGrid.module.scss";

// Іконка для бренду
const TagIconBrand = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

// Іконка "Детальніше"
const IconArrowRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// Іконка "Швидкий перегляд" (Око)
const IconEye = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export default function CatalogProductCard({ product }) {
  const brandName = product.filters?.brand;
  const productUrl = `/catalog/${product._id}`;

  return (
    <div className={styles.productCard}>
      {/* Клік по фото теж відкриває модалку (швидкий перегляд) */}
      <Link href={productUrl} scroll={false} className={styles.imageBox}>
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.name}
          className={styles.img}
        />
        <div className={styles.badges}>
          {brandName && (
            <span className={`${styles.badge} ${styles.badgeBrand}`}>
              <TagIconBrand /> {brandName}
            </span>
          )}
        </div>
      </Link>

      <div className={styles.infoBox}>
        <div className={styles.textWrap}>
          <h4 className={styles.title}>{product.name}</h4>
          <span className={styles.productCategory}>{product.category}</span>
        </div>

        {/* 🔥 НОВИЙ БЛОК З ДВОМА КНОПКАМИ 🔥 */}
        <div className={styles.cardButtons}>
          <a href={productUrl} className={styles.detailsBtn}>
            Замовити <IconArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
}
