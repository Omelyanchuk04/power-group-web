"use client";

import React, { useState, useEffect, useMemo } from "react";
import styles from "./CatalogGrid.module.scss";

import CatalogSidebar from "./CatalogSidebar";
import CatalogCategoryTabs from "./CatalogCategoryTabs";
import CatalogProductCard from "./CatalogProductCard";

const CATEGORIES_LIST = [
  "Сонячні панелі",
  "Гібридні інвертори",
  "Мережеві інвертори",
  "Акумулятори",
  "Системи накопичення",
  "Силове обладнання для сонячних електростанцій",
  "Комплектуючі для монтажу",
];

const FILTER_CONFIG = {
  "Сонячні панелі": [
    { key: "brand", title: "Виробник (бренд)", type: "checkbox", options: [] },
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
    { key: "brand", title: "Виробник (бренд)", type: "checkbox", options: [] },
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
    { key: "brand", title: "Виробник (бренд)", type: "checkbox", options: [] },
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
    { key: "brand", title: "Виробник (бренд)", type: "checkbox", options: [] },
    {
      key: "batteryType",
      title: "Тип батареї",
      type: "checkbox",
      options: ["Низьковольтна", "Високовольтна"],
    },
  ],
  "Системи накопичення": [
    { key: "brand", title: "Виробник (бренд)", type: "checkbox", options: [] },
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
let cachedBrands = null;

export default function CatalogGrid() {
  const [products, setProducts] = useState(cachedProducts || []);
  const [brandsList, setBrandsList] = useState(cachedBrands || []);
  const [isLoading, setIsLoading] = useState(!cachedProducts);

  const [activeCategory, setActiveCategory] = useState(CATEGORIES_LIST[0]);
  const [activeFilters, setActiveFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isRestored, setIsRestored] = useState(false);

  const itemsPerPage = 9;

  useEffect(() => {
    const savedCat = sessionStorage.getItem("catalogCat");
    const savedFilters = sessionStorage.getItem("catalogFilters");
    const savedPage = sessionStorage.getItem("catalogPage");

    if (savedCat) setActiveCategory(savedCat);
    if (savedFilters) setActiveFilters(JSON.parse(savedFilters));
    if (savedPage) setCurrentPage(Number(savedPage));

    setIsRestored(true);
  }, []);

  useEffect(() => {
    if (isRestored) {
      sessionStorage.setItem("catalogCat", activeCategory);
      sessionStorage.setItem("catalogFilters", JSON.stringify(activeFilters));
      sessionStorage.setItem("catalogPage", currentPage.toString());
    }
  }, [activeCategory, activeFilters, currentPage, isRestored]);

  useEffect(() => {
    if (cachedProducts && cachedBrands) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [prodRes, settingsRes] = await Promise.all([
          fetch("/api/catalog"),
          fetch("/api/settings/catalog"),
        ]);

        if (prodRes.ok) {
          const data = await prodRes.json();
          cachedProducts = data;
          setProducts(data);
        }

        if (settingsRes.ok) {
          const settings = await settingsRes.json();
          cachedBrands = settings.brands || [];
          setBrandsList(settings.brands || []);
        }
      } catch (error) {
        console.error("Помилка завантаження даних:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

  const currentProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  }, [filteredProducts, currentPage]);

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
    }
  };

  const resetFilters = () => {
    setActiveFilters({});
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber === currentPage) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    document.body.style.overflow = isMobileFiltersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileFiltersOpen]);

  const currentSidebarConfig = (FILTER_CONFIG[activeCategory] || []).map(
    (group) => {
      if (group.key === "brand" && brandsList.length > 0) {
        return { ...group, options: brandsList };
      }
      return group;
    },
  );

  if (!isRestored) return null;

  // 🔥 Створюємо унікальний ключ для сітки.
  // При зміні фільтра чи сторінки React знищить стару сітку і створить нову, автоматично запустивши CSS анімацію
  const gridKey = `${activeCategory}-${currentPage}-${JSON.stringify(activeFilters)}`;

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

        <div className={styles.mainLayout}>
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
                {/* 🔥 Додали ключ та клас анімації 🔥 */}
                <div key={gridKey} className={styles.gridAnimated}>
                  {currentProducts.map((product) => (
                    <CatalogProductCard key={product._id} product={product} />
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
    </section>
  );
}
