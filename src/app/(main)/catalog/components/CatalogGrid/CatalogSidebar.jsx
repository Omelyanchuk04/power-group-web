import React, { useState, useEffect } from "react";
import styles from "./CatalogGrid.module.scss";
import { IconCheck } from "./catalogData";

// Іконка для розгортання/згортання (шеврон)
const IconChevronDown = ({ isOpen }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      width: "16px",
      height: "16px",
      transition: "transform 0.3s ease",
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default function CatalogSidebar({
  config,
  activeCategory,
  activeFilters,
  powerLimitUI,
  onFilterToggle,
  onPowerChange,
  onPowerRelease,
  onReset,
  isOpen,
  onClose,
}) {
  // 🔥 СТАН ДЛЯ ЗГОРТАННЯ ГРУП 🔥
  // За замовчуванням усі групи розгорнуті. Якщо хочеш згорнуті - зроби useState({})
  const [expandedGroups, setExpandedGroups] = useState({});

  // Коли змінюється категорія (або при першому завантаженні), розгортаємо всі групи
  useEffect(() => {
    if (config) {
      const initialExpandedState = {};
      config.forEach((group) => {
        initialExpandedState[group.key] = true;
      });
      setExpandedGroups(initialExpandedState);
    }
  }, [config, activeCategory]);

  const toggleGroup = (key) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <div
        className={[styles.sidebarOverlay, isOpen ? styles.open : ""].join(" ")}
        onClick={onClose}
      />

      <aside className={[styles.sidebar, isOpen ? styles.open : ""].join(" ")}>
        <div className={styles.sidebarSticky}>
          <div className={styles.mobileSidebarHeader}>
            <h3>Фільтри</h3>
            <button className={styles.closeSidebarBtn} onClick={onClose}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {config?.map((filterGroup) => {
            const isGroupOpen = expandedGroups[filterGroup.key];

            // --- РЕНДЕР ПОВЗУНКА ---
            if (filterGroup.type === "slider") {
              const minVal = filterGroup.min || 0;
              const maxVal = filterGroup.max || 150;
              const unit = filterGroup.unit || "кВт";
              const fillPercentage =
                ((powerLimitUI - minVal) / (maxVal - minVal)) * 100;

              return (
                <div key={filterGroup.key} className={styles.filterGroup}>
                  {/* Заголовок групи, що клікається */}
                  <div
                    className={styles.groupTitleRow}
                    onClick={() => toggleGroup(filterGroup.key)}
                  >
                    <h4 className={styles.groupTitle}>{filterGroup.title}</h4>
                    <IconChevronDown isOpen={isGroupOpen} />
                  </div>

                  {/* Вміст, який приховується */}
                  {isGroupOpen && (
                    <div className={styles.filterContentArea}>
                      <div className={styles.sliderHeader}>
                        <span className={styles.powerValue}>
                          {powerLimitUI === maxVal
                            ? "Макс."
                            : `до ${powerLimitUI} ${unit}`}
                        </span>
                      </div>
                      <div className={styles.sliderWrapper}>
                        <input
                          type="range"
                          min={minVal}
                          max={maxVal}
                          step={filterGroup.step || 1}
                          value={powerLimitUI}
                          onChange={(e) =>
                            onPowerChange(Number(e.target.value))
                          }
                          onPointerUp={onPowerRelease}
                          onTouchEnd={onPowerRelease}
                          className={styles.glassSlider}
                          style={{
                            background: `linear-gradient(to right, #0066cc ${fillPercentage}%, rgba(255, 255, 255, 0.4) ${fillPercentage}%)`,
                            boxShadow: `inset 0 3px 6px rgba(0, 0, 0, 0.15), 0 0 10px rgba(0, 102, 204, 0.2)`,
                          }}
                        />
                        <div className={styles.sliderLabels}>
                          <span>{minVal}</span>
                          <span>
                            {maxVal} {unit}+
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // --- РЕНДЕР ЧЕКБОКСІВ ---
            const selectedInGroup = activeFilters[filterGroup.key] || [];
            const isAllSelected = selectedInGroup.length === 0;

            return (
              <div key={filterGroup.key} className={styles.filterGroup}>
                {/* Заголовок групи, що клікається */}
                <div
                  className={styles.groupTitleRow}
                  onClick={() => toggleGroup(filterGroup.key)}
                >
                  <h4 className={styles.groupTitle}>{filterGroup.title}</h4>
                  <IconChevronDown isOpen={isGroupOpen} />
                </div>

                {/* Вміст, який приховується */}
                {isGroupOpen && (
                  <div className={styles.filterContentArea}>
                    <div className={styles.checkboxList}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          className={styles.hiddenCheckbox}
                          checked={isAllSelected}
                          onChange={() =>
                            onFilterToggle(filterGroup.key, "all")
                          }
                        />
                        <div
                          className={[
                            styles.customCheckbox,
                            isAllSelected ? styles.checked : "",
                          ].join(" ")}
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
                                onFilterToggle(filterGroup.key, option)
                              }
                            />
                            <div
                              className={[
                                styles.customCheckbox,
                                isActive ? styles.checked : "",
                              ].join(" ")}
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
                )}
              </div>
            );
          })}

          <button
            className={styles.sidebarResetBtn}
            onClick={() => {
              onReset();
              onClose();
            }}
          >
            Скинути фільтри
          </button>
        </div>
      </aside>
    </>
  );
}
