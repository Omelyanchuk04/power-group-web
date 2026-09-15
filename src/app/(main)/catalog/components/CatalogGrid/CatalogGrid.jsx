"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import styles from "./CatalogGrid.module.scss";

import { FILTER_CONFIG, MOCK_PRODUCTS } from "./catalogData";
import CatalogSidebar from "./CatalogSidebar";
import CatalogCategoryTabs from "./CatalogCategoryTabs";
import CatalogProductCard from "./CatalogProductCard";
import CatalogProductModal from "./CatalogProductModal";

// Допоміжна функція для отримання налаштувань повзунка
const getSliderConfig = (categoryId) => {
  return FILTER_CONFIG[categoryId]?.find((f) => f.type === "slider") || null;
};

export default function CatalogGrid() {
  const gridRef = useRef(null);
  const isInitialRender = useRef(true); // 🔥 Відстежуємо перший рендер для анімації

  // Стейт для даних (фільтрації)
  const [activeCategory, setActiveCategory] = useState("solar_panels");

  // 🔥 ДОДАНО: Окремий стейт тільки для візуалу кнопок (щоб натискалося миттєво)
  const [activeTabUI, setActiveTabUI] = useState("solar_panels");

  // Ініціалізація повзунка під поточну категорію
  const initialSlider = getSliderConfig("solar_panels");
  const initialMax = initialSlider ? initialSlider.max : 150;

  const [activeFilters, setActiveFilters] = useState({});
  const [powerLimitUI, setPowerLimitUI] = useState(initialMax);
  const [powerLimit, setPowerLimit] = useState(initialMax);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // АНІМАЦІЯ ЗНИКНЕННЯ
  const updateWithAnimation = (stateUpdaterCallback) => {
    const cards = gridRef.current?.children;
    if (!cards || cards.length === 0) {
      stateUpdaterCallback();
      return;
    }
    gsap.killTweensOf(cards);
    gsap.to(cards, {
      opacity: 0,
      duration: 0.15,
      stagger: 0.01,
      ease: "power2.in",
      onComplete: () => {
        stateUpdaterCallback();
      },
    });
  };

  // АНІМАЦІЯ ПОЯВИ
  useEffect(() => {
    const cards = gridRef.current?.children;
    if (cards && cards.length > 0) {
      let ctx = gsap.context(() => {
        if (isInitialRender.current) {
          // 1. Перший рендер: плавний виїзд знизу
          gsap.fromTo(
            cards,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.05,
              ease: "power3.out",
              clearProps: "all",
            },
          );
          isInitialRender.current = false;
        } else {
          // 2. При перемиканні вкладок: дуже швидке розчинення/поява (щоб не чекати)
          gsap.fromTo(
            cards,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.3,
              stagger: 0.02,
              ease: "power2.out",
              clearProps: "all",
            },
          );
        }
      });
      return () => ctx.revert();
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
    if (activeCategory !== categoryId && activeTabUI !== categoryId) {
      // 🔥 1. МИТТЄВИЙ відгук: перемикаємо візуал кнопки без жодних затримок
      setActiveTabUI(categoryId);

      // 2. Запускаємо анімацію і фільтрацію на фоні
      updateWithAnimation(() => {
        setActiveCategory(categoryId);
        setActiveFilters({});

        // Оновлюємо ліміт повзунка для нової категорії
        const newSlider = getSliderConfig(categoryId);
        const newMax = newSlider ? newSlider.max : 150;
        setPowerLimit(newMax);
        setPowerLimitUI(newMax);

        setCurrentPage(1);
      });
    }
  };

  const resetFilters = () => {
    updateWithAnimation(() => {
      setActiveFilters({});
      const currentSlider = getSliderConfig(activeCategory);
      const currentMax = currentSlider ? currentSlider.max : 150;
      setPowerLimit(currentMax);
      setPowerLimitUI(currentMax);
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

        {/* 🔥 ПЕРЕДАЄМО activeTabUI ЗАМІСТЬ activeCategory */}
        <CatalogCategoryTabs
          activeCategory={activeTabUI}
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
