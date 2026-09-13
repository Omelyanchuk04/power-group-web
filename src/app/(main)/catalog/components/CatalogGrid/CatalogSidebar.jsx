import React from "react";
import styles from "./CatalogGrid.module.scss";
import { IconCheck, FILTER_CONFIG } from "./catalogData";

export default function CatalogSidebar({
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
  return (
    <>
      {/* Темний фон для мобільного, клік по якому закриває фільтри */}
      <div
        className={[styles.sidebarOverlay, isOpen ? styles.open : ""].join(" ")}
        onClick={onClose}
      />

      <aside className={[styles.sidebar, isOpen ? styles.open : ""].join(" ")}>
        <div className={styles.sidebarSticky}>
          {/* Мобільна шапка меню фільтрів */}
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

          {FILTER_CONFIG[activeCategory].map((filterGroup) => {
            if (filterGroup.type === "slider") {
              const fillPercentage = (powerLimitUI / filterGroup.max) * 100;
              return (
                <div key={filterGroup.key} className={styles.filterGroup}>
                  <div className={styles.sliderHeader}>
                    <h4 className={styles.groupTitle}>{filterGroup.title}</h4>
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
                      onChange={(e) => onPowerChange(Number(e.target.value))}
                      onPointerUp={onPowerRelease}
                      onTouchEnd={onPowerRelease}
                      className={styles.glassSlider}
                      style={{
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
                      onChange={() => onFilterToggle(filterGroup.key, "all")}
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
                        <span className={styles.checkboxText}>{option}</span>
                      </label>
                    );
                  })}
                </div>
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
