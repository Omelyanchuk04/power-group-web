import React from "react";
import Link from "next/link";
import Image from "next/image"; // 🔥 ДОДАНО: Next.js Image для швидкості
import styles from "./CatalogGrid.module.scss";

// 🔥 ДОДАНО: aria-hidden та focusable="false" до іконок
const TagIconBrand = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

const IconArrowRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default function CatalogProductCard({ product }) {
  const brandName = product.filters?.brand;
  const productUrl = `/catalog/${product.slug || product._id}`;

  return (
    <article className={styles.productCard}>
      {/* 🔥 ДОДАНО: aria-label для лінка, щоб боти розуміли куди він веде */}
      <Link
        href={productUrl}
        className={styles.imageBox}
        aria-label={`Перейти до товару ${product.name}`}
      >
        {/* 🔥 ЗМІНЕНО: <img> на <Image> для WebP та лінивого завантаження */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            minHeight: "200px",
          }}
        >
          <Image
            src={product.image || "/placeholder.jpg"}
            alt={`Фото товару: ${product.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 992px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
            className={styles.img}
          />
        </div>

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
          <Link href={productUrl}>
            <h4 className={styles.title}>{product.name}</h4>
          </Link>
          <span className={styles.productCategory}>{product.category}</span>
        </div>

        <div className={styles.cardButtons}>
          <Link href={productUrl} className={styles.detailsBtn} tabIndex="-1">
            Замовити <IconArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}
