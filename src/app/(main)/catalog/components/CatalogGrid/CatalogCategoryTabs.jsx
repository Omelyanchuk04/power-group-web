"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./CatalogGrid.module.scss";
import { CATEGORIES } from "./catalogData";

const CATEGORY_IMAGES = {
  "Сонячні панелі": "/images/admin/equipment/solar-panel-icon.png",
  "Гібридні інвертори": "/images/admin/equipment/Hybrid-inverter-img.png",
  "Мережеві інвертори": "/images/admin/equipment/network-inverter-img.png",
  Акумулятори: "/images/admin/equipment/battery-img.png",
  "Системи накопичення": "/images/admin/equipment/storage-system-img.png",
  "Силове обладнання": "/images/admin/equipment/power-equipment-img.png",
  "Силове обладнання для сонячних електростанцій":
    "/images/admin/equipment/power-equipment-img.png",
  "Комплектуючі для монтажу":
    "/images/admin/equipment/electric-installation-icon.png",
};

export default function CatalogCategoryTabs({
  activeCategory,
  onCategoryChange,
}) {
  const trackRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    opacity: 0,
  });

  useEffect(() => {
    const updateIndicator = () => {
      if (!trackRef.current) return;

      const activeTab = trackRef.current.querySelector(`.${styles.activeTab}`);
      if (activeTab) {
        const textElement = activeTab.querySelector(`.${styles.tabText}`);

        if (textElement) {
          const tabLeft = activeTab.offsetLeft;
          const tabTop = activeTab.offsetTop;
          const tabWidth = activeTab.offsetWidth;

          const textWidth = textElement.offsetWidth;
          const textHeight = textElement.offsetHeight;
          const textTop = textElement.offsetTop;

          // Центруємо лінію під текстом
          const offsetLeft = tabLeft + (tabWidth - textWidth) / 2;

          // 🔥 ЛІНІЯ БЛИЖЧЕ ДО ТЕКСТУ (відступ 4 пікселі замість 8) 🔥
          const offsetTop = tabTop + textTop + textHeight + 4;

          setIndicatorStyle({
            left: offsetLeft,
            top: offsetTop,
            width: textWidth,
            opacity: 1,
          });
        } else {
          setIndicatorStyle({
            left: activeTab.offsetLeft,
            top: activeTab.offsetTop + activeTab.offsetHeight - 10,
            width: activeTab.offsetWidth,
            opacity: 1,
          });
        }
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    const timeout = setTimeout(updateIndicator, 150);

    return () => {
      window.removeEventListener("resize", updateIndicator);
      clearTimeout(timeout);
    };
  }, [activeCategory]);

  return (
    <div className={styles.categoriesScrollWrapper}>
      <div className={styles.segmentedTrack} ref={trackRef}>
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

        <div className={styles.tabIndicator} style={indicatorStyle} />
      </div>
    </div>
  );
}
