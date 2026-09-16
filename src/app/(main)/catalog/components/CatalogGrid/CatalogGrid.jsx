"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation"; // 🔥 ДОДАЛИ ІМПОРТ
import gsap from "gsap";
import styles from "./CatalogGrid.module.scss";

import { FILTER_CONFIG, MOCK_PRODUCTS } from "./catalogData";
import CatalogSidebar from "./CatalogSidebar";
import CatalogCategoryTabs from "./CatalogCategoryTabs";
import CatalogProductCard from "./CatalogProductCard";
import CatalogProductModal from "./CatalogProductModal";

const getSliderConfig = (categoryId) => {
  return FILTER_CONFIG[categoryId]?.find((f) => f.type === "slider") || null;
};

export default function CatalogGrid() {
  const pathname = usePathname(); // 🔥 СЛІДКУЄМО ЗА ЗМІНОЮ СТОРІНКИ
  const gridRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("solar_panels");

  const initialSlider = getSliderConfig("solar_panels");
  const initialMax = initialSlider ? initialSlider.max : 150;

  const [activeFilters, setActiveFilters] = useState({});
  const [powerLimitUI, setPowerLimitUI] = useState(initialMax);
  const [powerLimit, setPowerLimit] = useState(initialMax);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS.filter((p) => p.category === activeCategory);

    Object.keys(activeFilters).forEach((filterKey) => {
      const selectedOptions = activeFilters[filterKey];
      if (selectedOptions && selectedOptions.length > 0) {
        result = result.filter((p) => selectedOptions.includes(p[filterKey]));
      }
    });

    const hasSlider = getSliderConfig(activeCategory);
    if (hasSlider) {
      result = result.filter((p) => (p.powerNum || 0) <= powerLimit);
    }

    return result;
  }, [activeCategory, activeFilters, powerLimit]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // 🔥 АНІМАЦІЯ ЛИШЕ ПРИ ПОЯВІ / ПОВЕРНЕННІ НА СТОРІНКУ 🔥
  useEffect(() => {
    const cards = gridRef.current?.children;
    if (cards && cards.length > 0) {
      let ctx = gsap.context(() => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            clearProps: "all",
          },
        );
      });
      return () => ctx.revert();
    }
  }, [pathname]); // Запускається ТІЛЬКИ коли змінюється маршрут сторінки!

  // 🔥 МИТТЄВІ ФІЛЬТРИ (без затримок і анімацій) 🔥
  const handleFilterToggle = (filterKey, option) => {
    setCurrentPage(1);
    setActiveFilters((prev) => {
      if (option === "all") return { ...prev, [filterKey]: [] };
      const currentOptions = prev[filterKey] || [];
      if (currentOptions.includes(option)) {
        return {
          ...prev,
          [filterKey]: currentOptions.filter((o) => o !== option),
        };
      } else {
        return { ...prev, [filterKey]: [...currentOptions, option] };
      }
    });
  };

  const handleCategoryChange = (categoryId) => {
    if (activeCategory !== categoryId) {
      const newSlider = getSliderConfig(categoryId);
      const newMax = newSlider ? newSlider.max : 150;

      setActiveCategory(categoryId);
      setActiveFilters({});
      setPowerLimit(newMax);
      setPowerLimitUI(newMax);
      setCurrentPage(1);
    }
  };

  const resetFilters = () => {
    const currentSlider = getSliderConfig(activeCategory);
    const currentMax = currentSlider ? currentSlider.max : 150;

    setActiveFilters({});
    setPowerLimit(currentMax);
    setPowerLimitUI(currentMax);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber === currentPage) return;
    if (gridRef.current) {
      const yOffset =
        gridRef.current.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
    setCurrentPage(pageNumber);
  };

  const handlePowerRelease = () => {
    if (powerLimit !== powerLimitUI) {
      setPowerLimit(powerLimitUI);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileFiltersOpen]);

  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Каталог обладнання</h1>
          <p>
            Високоякісне обладнання для сонячних електростанцій та систем
            накопичення
          </p>
        </div>

        <div className={styles.mobileControls}>
          <button
            className={styles.filterToggleBtn}
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Фільтри
          </button>
        </div>

        <CatalogCategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className={styles.mainLayout}>
          <CatalogSidebar
            activeCategory={activeCategory}
            activeFilters={activeFilters}
            powerLimitUI={powerLimitUI}
            onFilterToggle={handleFilterToggle}
            onPowerChange={setPowerLimitUI}
            onPowerRelease={handlePowerRelease}
            onReset={resetFilters}
            isOpen={isMobileFiltersOpen}
            onClose={() => setIsMobileFiltersOpen(false)}
          />

          <div className={styles.content}>
            {filteredProducts.length === 0 && (
              <div className={styles.noResults}>
                <h3>Товарів не знайдено</h3>
                <p>Змініть критерії пошуку або скиньте фільтри.</p>
              </div>
            )}

            <div className={styles.grid} ref={gridRef}>
              {currentProducts.map((product) => (
                <CatalogProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.pageActive : ""}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <CatalogProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
