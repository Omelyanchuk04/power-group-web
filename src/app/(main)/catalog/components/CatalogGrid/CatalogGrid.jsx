"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import styles from "./CatalogGrid.module.scss";

import { FILTER_CONFIG, MOCK_PRODUCTS } from "./catalogData";
import CatalogSidebar from "./CatalogSidebar";
import CatalogCategoryTabs from "./CatalogCategoryTabs";
import CatalogProductCard from "./CatalogProductCard";
import CatalogProductModal from "./CatalogProductModal";

export default function CatalogGrid() {
  const gridRef = useRef(null);

  const MAX_POWER = 150;
  const [activeCategory, setActiveCategory] = useState("solar_panels");
  const [activeFilters, setActiveFilters] = useState({});
  const [powerLimitUI, setPowerLimitUI] = useState(MAX_POWER);
  const [powerLimit, setPowerLimit] = useState(MAX_POWER);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const updateWithAnimation = (stateUpdaterCallback) => {
    const cards = gridRef.current?.children;
    if (!cards || cards.length === 0) {
      stateUpdaterCallback();
      return;
    }
    gsap.killTweensOf(cards);
    gsap.to(cards, {
      opacity: 0,
      y: 15,
      scale: 0.98,
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.in",
      onComplete: () => {
        stateUpdaterCallback();
      },
    });
  };

  useEffect(() => {
    const cards = gridRef.current?.children;
    if (cards && cards.length > 0) {
      gsap.killTweensOf(cards);
      gsap.fromTo(
        cards,
        { opacity: 0, y: 15, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: "power3.out",
          clearProps: "all",
        },
      );
    }
  }, [currentPage, activeFilters, activeCategory, powerLimit]);

  const handleFilterToggle = (filterKey, option) => {
    updateWithAnimation(() => {
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
    });
  };

  const handleCategoryChange = (categoryId) => {
    if (activeCategory !== categoryId) {
      updateWithAnimation(() => {
        setActiveCategory(categoryId);
        setActiveFilters({});
        setPowerLimit(MAX_POWER);
        setPowerLimitUI(MAX_POWER);
        setCurrentPage(1);
      });
    }
  };

  const resetFilters = () => {
    updateWithAnimation(() => {
      setActiveFilters({});
      setPowerLimit(MAX_POWER);
      setPowerLimitUI(MAX_POWER);
      setCurrentPage(1);
    });
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber === currentPage) return;
    if (gridRef.current) {
      const yOffset =
        gridRef.current.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
    updateWithAnimation(() => setCurrentPage(pageNumber));
  };

  const handlePowerRelease = () => {
    if (powerLimit !== powerLimitUI) {
      updateWithAnimation(() => {
        setPowerLimit(powerLimitUI);
        setCurrentPage(1);
      });
    }
  };

  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS.filter((p) => p.category === activeCategory);

    Object.keys(activeFilters).forEach((filterKey) => {
      const selectedOptions = activeFilters[filterKey];
      if (selectedOptions && selectedOptions.length > 0) {
        result = result.filter((p) => selectedOptions.includes(p[filterKey]));
      }
    });

    const hasSlider = FILTER_CONFIG[activeCategory]?.some(
      (c) => c.type === "slider",
    );
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

        {/* 🔥 ПЕРЕНЕСЛИ ВКЛАДКИ СЮДИ: Тепер вони на всю ширину над усім контентом 🔥 */}
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
                <div className={styles.noResultsIcon}>📦</div>
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
