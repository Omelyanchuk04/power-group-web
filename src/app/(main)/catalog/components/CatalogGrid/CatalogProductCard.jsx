import React from "react";
import styles from "./CatalogGrid.module.scss";
import { TagIconBrand, IconArrowRight, CATEGORIES } from "./catalogData";

export default function CatalogProductCard({ product, onClick }) {
  return (
    <div
      className={styles.productCard}
      onClick={onClick}
      style={{ opacity: 0 }}
    >
      <div className={styles.imageBox}>
        <img src={product.image} alt={product.name} className={styles.img} />
        <div className={styles.badges}>
          {product.brand && (
            <span className={`${styles.badge} ${styles.badgeBrand}`}>
              <TagIconBrand /> {product.brand}
            </span>
          )}
        </div>
      </div>
      <div className={styles.infoBox}>
        <div className={styles.textWrap}>
          <h4 className={styles.title}>{product.name}</h4>
          <span className={styles.productCategory}>
            {CATEGORIES.find((c) => c.id === product.category)?.label ||
              "Обладнання"}
          </span>
        </div>
        <div className={styles.actionRow}>
          <span className={styles.linkText}>Детальніше</span>
          <div className={styles.actionIcon}>
            <IconArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
}
