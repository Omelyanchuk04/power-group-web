"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image"; // 🔥 ДОДАНО: Правильний імпорт картинок
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

          const offsetLeft = tabLeft + (tabWidth - textWidth) / 2;
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
    // 🔥 ДОДАНО: role="tablist" для розпізнавання пошуковиками
    <div
      className={styles.categoriesScrollWrapper}
      role="tablist"
      aria-label="Категорії обладнання"
    >
      <div className={styles.segmentedTrack} ref={trackRef}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.activeTab : ""}`}
            onClick={() => onCategoryChange(cat.id)}
            role="tab" // 🔥 ДОДАНО: семантика таба
            aria-selected={activeCategory === cat.id} // 🔥 ДОДАНО: стан таба
            aria-controls={`panel-${cat.id}`}
          >
            <div
              className={styles.tabImageWrapper}
              style={{ position: "relative", width: "40px", height: "40px" }}
            >
              {/* 🔥 ЗМІНЕНО: <img> на <Image> для кращої продуктивності */}
              <Image
                src={
                  CATEGORY_IMAGES[cat.label] ||
                  "/images/admin/equipment/solar-panel-icon.png"
                }
                alt={`Категорія: ${cat.label}`}
                fill
                sizes="40px"
                style={{ objectFit: "contain" }}
                className={styles.tabImage}
              />
            </div>
            <span className={styles.tabText}>{cat.label}</span>
          </button>
        ))}

        <div
          className={styles.tabIndicator}
          style={indicatorStyle}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
