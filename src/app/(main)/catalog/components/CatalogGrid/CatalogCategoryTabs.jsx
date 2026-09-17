import React from "react";
import styles from "./CatalogGrid.module.scss";
import { CATEGORIES } from "./catalogData";

// --- МАПІНГ КАРТИНОК ЯК В АДМІНЦІ ---
const CATEGORY_IMAGES = {
  "Сонячні панелі": "/images/admin/equipment/solar-panel-icon.png",
  // 🔥 Виправлено: велика літера 'H'
  "Гібридні інвертори": "/images/admin/equipment/Hybrid-inverter-img.png",
  "Мережеві інвертори": "/images/admin/equipment/network-inverter-img.png",
  Акумулятори: "/images/admin/equipment/battery-img.png",
  "Системи накопичення": "/images/admin/equipment/storage-system-img.png",
  // 🔥 Виправлено: скорочена назва, точно як у твоїх табах
  "Силове обладнання": "/images/admin/equipment/power-equipment-img.png",
  // На всякий випадок залишаємо і повну назву
  "Силове обладнання для сонячних електростанцій":
    "/images/admin/equipment/power-equipment-img.png",
  "Комплектуючі для монтажу":
    "/images/admin/equipment/electric-installation-icon.png",
};

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
            <div className={styles.tabImageWrapper}>
              <img
                src={
                  CATEGORY_IMAGES[cat.label] ||
                  "/images/admin/equipment/solar-panel-icon.png"
                }
                alt={cat.label}
                className={styles.tabImage}
              />
            </div>
            <span className={styles.tabText}>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
