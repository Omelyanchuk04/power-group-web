"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import styles from "./CatalogGrid.module.scss";

import CatalogSidebar from "./CatalogSidebar";
import CatalogCategoryTabs from "./CatalogCategoryTabs";
import CatalogProductCard from "./CatalogProductCard";
import CatalogProductModal from "./CatalogProductModal";

// Конфігурація категорій, що відповідає базі даних
const CATEGORIES_LIST = [
  "Сонячні панелі",
  "Гібридні інвертори",
  "Мережеві інвертори",
  "Акумулятори",
  "Системи накопичення",
  "Силове обладнання для сонячних електростанцій",
  "Комплектуючі для монтажу",
];

// Конфігурація фільтрів
const FILTER_CONFIG = {
  "Сонячні панелі": [
    {
      key: "brand",
      title: "Виробник (бренд)",
      type: "checkbox",
      options: [
        "Longi Solar",
        "Tongwei Solar",
        "Jinko Solar",
        "JA Solar",
        "Trina Solar",
      ],
    },
    {
      key: "power",
      title: "Потужність",
      type: "checkbox",
      options: ["300 - 400 Вт", "400 - 500 Вт", "500 - 600 Вт", "600 - 700 Вт"],
    },
    {
      key: "dimensions",
      title: "Габарити",
      type: "checkbox",
      options: [
        "1722х1134",
        "1762x1134",
        "1961×1134",
        "1990х1134",
        "2278x1134",
        "2382x1134",
      ],
    },
  ],
  "Гібридні інвертори": [
    {
      key: "brand",
      title: "Виробник (бренд)",
      type: "checkbox",
      options: [
        "Deye",
        "Solis",
        "Afore",
        "Sungrow",
        "FoxESS",
        "LuxPower",
        "Huawei",
      ],
    },
    {
      key: "phase",
      title: "Кількість фаз",
      type: "checkbox",
      options: ["1 фаза", "3 фази"],
    },
    {
      key: "type",
      title: "Тип",
      type: "checkbox",
      options: ["високовольтний", "низьковольтний"],
    },
    {
      key: "power",
      title: "Потужність",
      type: "checkbox",
      options: [
        "6-10 кВт",
        "11-15 кВт",
        "16-25 кВт",
        "26-50 кВт",
        "51-100 кВт",
        "понад 100 кВт",
      ],
    },
  ],
  "Мережеві інвертори": [
    {
      key: "brand",
      title: "Виробник (бренд)",
      type: "checkbox",
      options: ["Deye", "Solis", "Sungrow", "Huawei"],
    },
    {
      key: "phase",
      title: "Кількість фаз",
      type: "checkbox",
      options: ["1 фаза", "3 фази"],
    },
    {
      key: "power",
      title: "Потужність",
      type: "checkbox",
      options: [
        "6-10 кВт",
        "11-15 кВт",
        "16-25 кВт",
        "26-50 кВт",
        "51-100 кВт",
        "понад 100 кВт",
      ],
    },
  ],
  Акумулятори: [
    {
      key: "brand",
      title: "Виробник (бренд)",
      type: "checkbox",
      options: ["Deye", "Dyness", "GSL ENERGY", "FoxESS"],
    },
    {
      key: "batteryType",
      title: "Тип батареї",
      type: "checkbox",
      options: ["Низьковольтна", "Високовольтна"],
    },
  ],
  "Системи накопичення": [
    {
      key: "brand",
      title: "Виробник (бренд)",
      type: "checkbox",
      options: ["Deye", "Dyness", "GSL ENERGY", "FoxESS"],
    },
  ],
  "Силове обладнання для сонячних електростанцій": [
    {
      key: "executionType",
      title: "Тип виконання",
      type: "checkbox",
      options: [
        "для гібридних інверторів",
        "для мережевих інверторів",
        "для установок зберігання енергії",
        "для дизельних генераторів АВР",
      ],
    },
    {
      key: "power",
      title: "Потужність",
      type: "checkbox",
      options: [
        "6-10 кВт",
        "11-15 кВт",
        "16-25 кВт",
        "26-50 кВт",
        "51-100 кВт",
        "понад 100 кВт",
      ],
    },
  ],
  "Комплектуючі для монтажу": [
    {
      key: "subcategory",
      title: "Розділи",
      type: "checkbox",
      options: ["Кабель", "Конектори МС-4", "Кріплення", "Лічильники", "Інше"],
    },
  ],
};

let cachedProducts = null;

export default function CatalogGrid() {
  const pathname = usePathname();
  const gridRef = useRef(null);
  const layoutRef = useRef(null);

  const [products, setProducts] = useState(cachedProducts || []);
  const [isLoading, setIsLoading] = useState(!cachedProducts);

  const [activeCategory, setActiveCategory] = useState(CATEGORIES_LIST[0]);
  const [activeFilters, setActiveFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (cachedProducts) return;

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/catalog");
        if (res.ok) {
          const data = await res.json();
          cachedProducts = data;
          setProducts(data);
        }
      } catch (error) {
        console.error("Помилка завантаження товарів:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.category === activeCategory);

    Object.keys(activeFilters).forEach((filterKey) => {
      const selectedOptions = activeFilters[filterKey];
      if (selectedOptions && selectedOptions.length > 0) {
        result = result.filter((p) => {
          const itemFilterValue = p.filters && p.filters[filterKey];
          return selectedOptions.includes(itemFilterValue);
        });
      }
    });

    return result;
  }, [products, activeCategory, activeFilters]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    const cards = gridRef.current?.children;
    if (cards && cards.length > 0 && !isLoading) {
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
  }, [pathname, activeCategory, currentPage, isLoading]);

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
      setActiveCategory(categoryId);
      setActiveFilters({});
      setCurrentPage(1);
      // Прибрано логіку автоматичного скролу вниз
    }
  };

  const resetFilters = () => {
    setActiveFilters({});
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber === currentPage) return;
    if (layoutRef.current) {
      const yOffset =
        layoutRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
    setCurrentPage(pageNumber);
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

  const currentSidebarConfig = FILTER_CONFIG[activeCategory] || [];

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
          categories={CATEGORIES_LIST}
        />

        <div className={styles.mainLayout} ref={layoutRef}>
          <CatalogSidebar
            activeCategory={activeCategory}
            activeFilters={activeFilters}
            onFilterToggle={handleFilterToggle}
            onReset={resetFilters}
            isOpen={isMobileFiltersOpen}
            onClose={() => setIsMobileFiltersOpen(false)}
            config={currentSidebarConfig}
          />

          <div
            className={styles.content}
            style={{ minHeight: "100vh", alignContent: "flex-start" }}
          >
            {isLoading ? (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: "#64748b",
                }}
              >
                Завантаження товарів...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className={styles.noResults}>
                <h3>Товарів не знайдено</h3>
                <p>Змініть критерії пошуку або скиньте фільтри.</p>
              </div>
            ) : (
              <>
                <div className={styles.grid} ref={gridRef}>
                  {currentProducts.map((product) => (
                    <CatalogProductCard
                      key={product._id}
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
              </>
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
