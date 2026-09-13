import React from "react";
import styles from "./CatalogGrid.module.scss";
import { CATEGORIES } from "./catalogData";

export default function CatalogCategoryTabs({
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className={styles.categoriesScrollWrapper}>
      <div className={styles.segmentedTrack}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.activeTab : ""}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            <span className={styles.tabIcon}>{cat.icon}</span>
            <span className={styles.tabText}>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
