"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { useModal } from "@/context/ModalContext";
import styles from "./CatalogGrid.module.scss";

// --- ГОЛОВНІ SVG ІКОНКИ ---
const IconInverter = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);
const IconStorage = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
    <path d="M6 12h4" />
    <path d="M14 12h4" />
  </svg>
);
const IconPower = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const IconTool = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const IconBattery = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
    <line x1="22" y1="11" x2="22" y2="13" />
    <polyline points="6 11 8 13 12 9" />
  </svg>
);
const IconArrowRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconCheck = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// --- МІНІ-ІКОНКИ ДЛЯ ПІГУЛОК КАРТОК ---
const TagIconBrand = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);
const TagIconPower = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
  </svg>
);
const TagIconPhase = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
  </svg>
);
const TagIconBat = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
    <line x1="22" y1="11" x2="22" y2="13"></line>
  </svg>
);
const TagIconType = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

// --- КОНФІГ КАТЕГОРІЙ ТА ФІЛЬТРІВ ---
const CATEGORIES = [
  { id: "inverters", label: "Мережеві інвертори", icon: <IconInverter /> },
  { id: "storage", label: "Системи накопичення", icon: <IconStorage /> },
  { id: "power_eq", label: "Силове обладнання", icon: <IconPower /> },
  { id: "accessories", label: "Комплектуючі", icon: <IconTool /> },
  { id: "batteries", label: "Акумулятори", icon: <IconBattery /> },
];

const FILTER_CONFIG = {
  inverters: [
    {
      key: "brand",
      title: "Виробник",
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
      key: "powerNum",
      title: "Потужність СЕС",
      type: "slider",
      min: 0,
      max: 150,
      step: 5,
    },
  ],
  storage: [
    {
      key: "brand",
      title: "Виробник",
      type: "checkbox",
      options: ["Deye", "Dyness", "GSL ENERGY", "FoxESS"],
    },
  ],
  power_eq: [
    {
      key: "type",
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
      key: "powerNum",
      title: "Потужність",
      type: "slider",
      min: 0,
      max: 150,
      step: 5,
    },
  ],
  accessories: [
    {
      key: "type",
      title: "Розділ",
      type: "checkbox",
      options: ["Кабель", "Конектори МС-4", "Кріплення", "Лічильники", "Інше"],
    },
  ],
  batteries: [
    {
      key: "brand",
      title: "Виробник",
      type: "checkbox",
      options: ["Deye", "Dyness", "GSL ENERGY", "FoxESS"],
    },
    {
      key: "batType",
      title: "Тип батареї",
      type: "checkbox",
      options: ["Низьковольтна", "Високовольтна"],
    },
  ],
};

const MOCK_PRODUCTS = [
  {
    id: 1,
    category: "inverters",
    brand: "Deye",
    phase: "3 фази",
    power: "11-15 кВт",
    powerNum: 15,
    name: "Мережевий інвертор Deye SUN-12K-G05",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 2,
    category: "inverters",
    brand: "Huawei",
    phase: "3 фази",
    power: "26-50 кВт",
    powerNum: 50,
    name: "Мережевий інвертор Huawei SUN2000-30KTL-M3",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 3,
    category: "inverters",
    brand: "Solis",
    phase: "1 фаза",
    power: "6-10 кВт",
    powerNum: 10,
    name: "Мережевий інвертор Solis S6-GR1P8K",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 4,
    category: "inverters",
    brand: "Sungrow",
    phase: "3 фази",
    power: "51-100 кВт",
    powerNum: 100,
    name: "Мережевий інвертор Sungrow SG50CX-P2",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 5,
    category: "inverters",
    brand: "Deye",
    phase: "1 фаза",
    power: "6-10 кВт",
    powerNum: 10,
    name: "Мережевий інвертор Deye SUN-8K-SG01LP1",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 6,
    category: "inverters",
    brand: "Solis",
    phase: "3 фази",
    power: "16-25 кВт",
    powerNum: 25,
    name: "Мережевий інвертор Solis-3P20K-4G",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 7,
    category: "inverters",
    brand: "Huawei",
    phase: "3 фази",
    power: "понад 100 кВт",
    powerNum: 150,
    name: "Інвертор Huawei SUN2000-330KTL",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 8,
    category: "storage",
    brand: "GSL ENERGY",
    name: "Система зберігання GSL Energy 10kWh",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 9,
    category: "storage",
    brand: "Dyness",
    name: "Система накопичення Dyness Tower T10",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 10,
    category: "storage",
    brand: "Deye",
    name: "Система зберігання енергії Deye SE-G5.1 Pro",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 11,
    category: "storage",
    brand: "FoxESS",
    name: "Модульна система FoxESS ECS2900",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 12,
    category: "batteries",
    brand: "Dyness",
    batType: "Низьковольтна",
    name: "Акумулятор Dyness BX51100 5.12 кВт*год",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 13,
    category: "batteries",
    brand: "Deye",
    batType: "Високовольтна",
    name: "Акумулятор Deye BOS-G (Високовольтний)",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 14,
    category: "batteries",
    brand: "GSL ENERGY",
    batType: "Низьковольтна",
    name: "Акумулятор GSL Energy 48V 100Ah",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 15,
    category: "batteries",
    brand: "FoxESS",
    batType: "Високовольтна",
    name: "Акумуляторний блок FoxESS HV2600",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 16,
    category: "accessories",
    type: "Кабель",
    name: "Сонячний кабель KBE Solar 6 мм² (Котушка)",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 17,
    category: "accessories",
    type: "Конектори МС-4",
    name: "Комплект конекторів MC-4 Staubli",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 18,
    category: "accessories",
    type: "Кріплення",
    name: "Профіль монтажний алюмінієвий 41х41 (3м)",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 19,
    category: "accessories",
    type: "Лічильники",
    name: "Смарт-лічильник Huawei Smart Power Sensor",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 20,
    category: "power_eq",
    type: "для гібридних інверторів",
    power: "11-15 кВт",
    powerNum: 15,
    name: "Щит захисту AC/DC для гібридної СЕС 15 кВт",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 21,
    category: "power_eq",
    type: "для мережевих інверторів",
    power: "26-50 кВт",
    powerNum: 50,
    name: "Щит збору потужності для СЕС 30 кВт",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 22,
    category: "power_eq",
    type: "для дизельних генераторів АВР",
    power: "51-100 кВт",
    powerNum: 100,
    name: "Шафа АВР (Автоматичне введення резерву) 100 кВт",
    image: "/images/catalog/2.jpg",
  },
];

export default function CatalogGrid() {
  const { openModal } = useModal();
  const gridRef = useRef(null);

  const MAX_POWER = 150;
  const [activeCategory, setActiveCategory] = useState("inverters");
  const [activeFilters, setActiveFilters] = useState({});
  const [powerLimitUI, setPowerLimitUI] = useState(MAX_POWER);
  const [powerLimit, setPowerLimit] = useState(MAX_POWER);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
        if (option === "all") {
          return { ...prev, [filterKey]: [] };
        }

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

  const resetFilters = () => {
    updateWithAnimation(() => {
      setActiveFilters({});
      setPowerLimit(MAX_POWER);
      setPowerLimitUI(MAX_POWER);
      setCurrentPage(1);
    });
  };

  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS.filter((p) => p.category === activeCategory);

    Object.keys(activeFilters).forEach((filterKey) => {
      const selectedOptions = activeFilters[filterKey];
      if (selectedOptions && selectedOptions.length > 0) {
        result = result.filter((p) => selectedOptions.includes(p[filterKey]));
      }
    });

    const hasSlider = FILTER_CONFIG[activeCategory].some(
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

  const handlePageChange = (pageNumber) => {
    if (pageNumber === currentPage) return;

    if (gridRef.current) {
      const yOffset =
        gridRef.current.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }

    updateWithAnimation(() => {
      setCurrentPage(pageNumber);
    });
  };

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

        <div className={styles.mainLayout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>
              {FILTER_CONFIG[activeCategory].map((filterGroup) => {
                if (filterGroup.type === "slider") {
                  const fillPercentage = (powerLimitUI / filterGroup.max) * 100;
                  return (
                    <div key={filterGroup.key} className={styles.filterGroup}>
                      <div className={styles.sliderHeader}>
                        <h4 className={styles.groupTitle}>
                          {filterGroup.title}
                        </h4>
                        <span className={styles.powerValue}>
                          {powerLimitUI === filterGroup.max
                            ? "Макс."
                            : `до ${powerLimitUI} кВт`}
                        </span>
                      </div>
                      <div className={styles.sliderWrapper}>
                        <input
                          type="range"
                          min={filterGroup.min}
                          max={filterGroup.max}
                          step={filterGroup.step}
                          value={powerLimitUI}
                          onChange={(e) =>
                            setPowerLimitUI(Number(e.target.value))
                          }
                          onPointerUp={() => {
                            if (powerLimit !== powerLimitUI) {
                              updateWithAnimation(() => {
                                setPowerLimit(powerLimitUI);
                                setCurrentPage(1);
                              });
                            }
                          }}
                          className={styles.glassSlider}
                          style={{
                            /* 🔥 Яскраво-синя заливка + світлий фон залишеної частини 🔥 */
                            background: `linear-gradient(to right, #0066cc ${fillPercentage}%, rgba(255, 255, 255, 0.4) ${fillPercentage}%)`,
                            boxShadow: `inset 0 3px 6px rgba(0, 0, 0, 0.15), 0 0 10px rgba(0, 102, 204, 0.2)`,
                          }}
                        />
                        <div className={styles.sliderLabels}>
                          <span>0</span>
                          <span>{filterGroup.max} кВт+</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                const selectedInGroup = activeFilters[filterGroup.key] || [];
                const isAllSelected = selectedInGroup.length === 0;

                return (
                  <div key={filterGroup.key} className={styles.filterGroup}>
                    <h4 className={styles.groupTitle}>{filterGroup.title}</h4>

                    <div className={styles.checkboxList}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          className={styles.hiddenCheckbox}
                          checked={isAllSelected}
                          onChange={() =>
                            handleFilterToggle(filterGroup.key, "all")
                          }
                        />
                        <div
                          className={`${styles.customCheckbox} ${isAllSelected ? styles.checked : ""}`}
                        >
                          <IconCheck />
                        </div>
                        <span className={styles.checkboxText}>Усі</span>
                      </label>

                      {filterGroup.options.map((option) => {
                        const isActive = selectedInGroup.includes(option);
                        return (
                          <label key={option} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              className={styles.hiddenCheckbox}
                              checked={isActive}
                              onChange={() =>
                                handleFilterToggle(filterGroup.key, option)
                              }
                            />
                            <div
                              className={`${styles.customCheckbox} ${isActive ? styles.checked : ""}`}
                            >
                              <IconCheck />
                            </div>
                            <span className={styles.checkboxText}>
                              {option}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <button className={styles.sidebarResetBtn} onClick={resetFilters}>
                Скинути фільтри
              </button>
            </div>
          </aside>

          <div className={styles.content}>
            <div className={styles.categoriesScrollWrapper}>
              <div className={styles.segmentedTrack}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.activeTab : ""}`}
                    onClick={() => {
                      if (activeCategory !== cat.id) {
                        updateWithAnimation(() => {
                          setActiveCategory(cat.id);
                          setActiveFilters({});
                          setPowerLimit(MAX_POWER);
                          setPowerLimitUI(MAX_POWER);
                          setCurrentPage(1);
                        });
                      }
                    }}
                  >
                    <span className={styles.tabIcon}>{cat.icon}</span>
                    <span className={styles.tabText}>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {filteredProducts.length === 0 && (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>📦</div>
                <h3>Товарів не знайдено</h3>
                <p>Змініть критерії пошуку або скиньте фільтри.</p>
              </div>
            )}

            <div className={styles.grid} ref={gridRef}>
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className={styles.productCard}
                  onClick={() => openModal()}
                  style={{ opacity: 0 }}
                >
                  <div className={styles.imageBox}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.img}
                    />

                    <div className={styles.badges}>
                      {/* 🔥 ЗАЛИШИВСЯ ТІЛЬКИ ВИРОБНИК 🔥 */}
                      {product.brand && (
                        <span
                          className={`${styles.badge} ${styles.badgeBrand}`}
                        >
                          <TagIconBrand /> {product.brand}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.infoBox}>
                    <div className={styles.textWrap}>
                      <h4 className={styles.title}>{product.name}</h4>
                      <span className={styles.productCategory}>
                        {CATEGORIES.find((c) => c.id === product.category)
                          ?.label || "Обладнання"}
                      </span>
                    </div>
                    {/* 🔥 КОМПАКТНІША КНОПКА 🔥 */}
                    <div className={styles.actionRow}>
                      <span className={styles.linkText}>Детальніше</span>
                      <div className={styles.actionIcon}>
                        <IconArrowRight />
                      </div>
                    </div>
                  </div>
                </div>
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
    </section>
  );
}
