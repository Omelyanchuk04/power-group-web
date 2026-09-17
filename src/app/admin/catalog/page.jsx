"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./catalog.module.scss";

// --- ІКОНКИ ---
const IconPlus = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const IconArrowLeft = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="14 18 8 12 14 6"></polyline>
  </svg>
);

const IconEdit = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);

const IconTrash = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const IconCheck = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CATEGORY_IMAGES = {
  "Сонячні панелі": "/images/admin/equipment/solar-panel-icon.png",
  "Гібридні інвертори": "/images/admin/equipment/Hybrid-inverter-img.png",
  "Мережеві інвертори": "/images/admin/equipment/network-inverter-img.png",
  Акумулятори: "/images/admin/equipment/battery-img.png",
  "Системи накопичення": "/images/admin/equipment/storage-system-img.png",
  "Силове обладнання для сонячних електростанцій":
    "/images/admin/equipment/power-equipment-img.png",
  "Комплектуючі для монтажу":
    "/images/admin/equipment/electric-installation-icon.png",
};

// Кеш для миттєвого завантаження
let catalogCache = null;
let settingsCache = null;

export default function CatalogAdminPage() {
  const router = useRouter();

  const [items, setItems] = useState(catalogCache || []);
  const [categories, setCategories] = useState(
    settingsCache?.categories || Object.keys(CATEGORY_IMAGES),
  );
  const [brands, setBrands] = useState(settingsCache?.brands || []);

  const [isLoading, setIsLoading] = useState(!catalogCache || !settingsCache);

  const [viewMode, setViewMode] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [activeModal, setActiveModal] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [deletePrompt, setDeletePrompt] = useState(null);

  useEffect(() => {
    const savedViewMode = sessionStorage.getItem("catalog_viewMode");
    const savedCategory = sessionStorage.getItem("catalog_selectedCategory");

    if (savedViewMode) setViewMode(savedViewMode);
    if (savedCategory && savedCategory !== "null")
      setSelectedCategory(savedCategory);

    const fetchData = async () => {
      try {
        const [itemsRes, settingsRes] = await Promise.all([
          fetch("/api/catalog"),
          fetch("/api/settings/catalog"),
        ]);

        if (itemsRes.ok) {
          const fetchedItems = await itemsRes.json();
          catalogCache = fetchedItems;
          setItems(fetchedItems);
        }
        if (settingsRes.ok) {
          const settings = await settingsRes.json();
          settingsCache = settings;
          setCategories(
            settings.categories?.length > 0
              ? settings.categories
              : Object.keys(CATEGORY_IMAGES),
          );
          setBrands(settings.brands || []);
        }
      } catch (error) {
        console.error("Помилка завантаження:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateViewMode = (mode) => {
    setViewMode(mode);
    sessionStorage.setItem("catalog_viewMode", mode);
  };

  const updateSelectedCategory = (category) => {
    setSelectedCategory(category);
    if (category) {
      sessionStorage.setItem("catalog_selectedCategory", category);
    } else {
      sessionStorage.removeItem("catalog_selectedCategory");
    }
  };

  const handleCategoryClick = (categoryName) => {
    updateSelectedCategory(categoryName);
    updateViewMode("list");
  };

  const saveSettingsToDB = async (newCategories, newBrands) => {
    try {
      settingsCache = { categories: newCategories, brands: newBrands };
      await fetch("/api/settings/catalog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: newCategories, brands: newBrands }),
      });
    } catch (error) {
      console.error("Помилка при збереженні налаштувань:", error);
    }
  };

  const displayedItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;
  const getItemsCount = (categoryName) =>
    items.filter((item) => item.category === categoryName).length;

  const closeModal = () => {
    setActiveModal(null);
    setEditingIndex(null);
    setIsAdding(false);
    setNewItemName("");
  };

  const addBrand = async (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const updated = [...brands, newItemName.trim()];
    setBrands(updated);
    setNewItemName("");
    setIsAdding(false);
    await saveSettingsToDB(categories, updated);
  };

  const saveEditedBrand = async (index) => {
    const updated = [...brands];
    updated[index] = editValue;
    setBrands(updated);
    setEditingIndex(null);
    setEditValue("");
    await saveSettingsToDB(categories, updated);
  };

  const triggerDelete = (type, identifier, name) => {
    setDeletePrompt({ type, identifier, name });
  };

  const confirmDeletion = async () => {
    if (!deletePrompt) return;

    const { type, identifier } = deletePrompt;

    if (type === "brands") {
      const updated = brands.filter((_, idx) => idx !== identifier);
      setBrands(updated);
      await saveSettingsToDB(categories, updated);
    } else if (type === "item") {
      try {
        const res = await fetch(`/api/catalog/${identifier}`, {
          method: "DELETE",
        });
        if (res.ok) {
          const newItems = items.filter((item) => item._id !== identifier);
          setItems(newItems);
          catalogCache = newItems;
        }
      } catch (error) {
        console.error("Помилка видалення:", error);
      }
    }

    setDeletePrompt(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitleGroup}>
          <Link
            href="/admin"
            className={styles.backToAdminBtn}
            aria-label="Повернутися"
          >
            <IconArrowLeft />
          </Link>
          <h1>Каталог обладнання</h1>
        </div>

        <Link href="/admin/catalog/new" className={styles.darkGlassBtn}>
          <IconPlus /> <span className={styles.btnText}>Новий товар</span>
        </Link>
      </div>

      <div className={styles.glassPanel}>
        <div className={styles.controlsRow}>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.toggleBtn} ${viewMode === "categories" ? styles.active : ""}`}
              onClick={() => {
                updateViewMode("categories");
                updateSelectedCategory(null);
              }}
            >
              Категорії
            </button>
            <button
              className={`${styles.toggleBtn} ${viewMode === "list" ? styles.active : ""}`}
              onClick={() => updateViewMode("list")}
            >
              Всі товари
            </button>
          </div>

          <div className={styles.settingsGroup}>
            <button
              className={styles.settingBtn}
              onClick={() => setActiveModal("brands")}
            >
              Налаштування брендів
            </button>
          </div>
        </div>

        {viewMode === "categories" && (
          <div className={styles.categoriesGrid}>
            {categories.length === 0 && isLoading ? (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "40px",
                  color: "#64748b",
                }}
              >
                Оновлення категорій...
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category}
                  className={styles.categoryCard}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className={styles.iconWrapper}>
                    <img
                      src={
                        CATEGORY_IMAGES[category] ||
                        "/images/admin/equipment/solar-panel-icon.png"
                      }
                      alt={category}
                      className={styles.categoryIcon}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{category}</h3>
                    <span className={styles.countBadge}>
                      {getItemsCount(category)} товарів
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {viewMode === "list" && (
          <>
            {selectedCategory && (
              <div className={styles.activeFilterBadge}>
                Фільтр: {selectedCategory}
                <button onClick={() => updateSelectedCategory(null)}>×</button>
              </div>
            )}

            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {/* 🔥 ДОДАНО КОЛОНКУ ДЛЯ НОМЕРА 🔥 */}
                    <th
                      style={{
                        width: "40px",
                        paddingRight: "0",
                        textAlign: "center",
                      }}
                    >
                      №
                    </th>
                    <th>Фото</th>
                    <th>Назва</th>
                    <th>Категорія</th>
                    <th style={{ textAlign: "right" }}>Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && displayedItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          padding: "60px",
                          textAlign: "center",
                          color: "#64748b",
                        }}
                      >
                        Оновлення списку...
                      </td>
                    </tr>
                  ) : displayedItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        style={{ padding: "60px", textAlign: "center" }}
                      >
                        <div style={{ fontSize: "40px", marginBottom: "16px" }}>
                          📂
                        </div>
                        <h3
                          style={{
                            fontSize: "18px",
                            fontWeight: "800",
                            color: "#111827",
                            margin: 0,
                          }}
                        >
                          Немає товарів
                        </h3>
                      </td>
                    </tr>
                  ) : (
                    displayedItems.map((item, index) => (
                      <tr
                        key={item._id}
                        className={styles.projectRow}
                        onClick={() =>
                          router.push(`/admin/catalog/${item._id}`)
                        }
                      >
                        {/* 🔥 ДОДАНО НОМЕР ПЕРЕД ФОТО 🔥 */}
                        <td className={styles.cellIndex}>{index + 1}.</td>
                        <td className={styles.cellImg}>
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className={styles.itemImage}
                            />
                          ) : (
                            <div
                              className={styles.itemImage}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#cbd5e1",
                              }}
                            >
                              Немає
                            </div>
                          )}
                        </td>
                        <td className={styles.cellTitle}>{item.name}</td>
                        <td className={styles.cellClient}>
                          <span className={styles.categoryBadge}>
                            {item.category}
                          </span>
                        </td>
                        <td className={styles.cellActions}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/admin/catalog/${item._id}`);
                            }}
                            className={`${styles.actionBtn} ${styles.edit}`}
                            title="Редагувати"
                          >
                            <IconEdit />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerDelete("item", item._id, item.name);
                            }}
                            className={`${styles.actionBtn} ${styles.delete}`}
                            title="Видалити"
                          >
                            <IconTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {activeModal === "brands" && (
        <div className={styles.settingsOverlay}>
          <div className={styles.settingsContent}>
            <div className={styles.settingsHeader}>
              <h2>Бренди</h2>
              <button className={styles.settingsCloseBtn} onClick={closeModal}>
                ×
              </button>
            </div>

            <div className={styles.settingsTopControls}>
              {!isAdding ? (
                <button
                  className={styles.settingsAddToggleBtn}
                  onClick={() => setIsAdding(true)}
                >
                  <IconPlus />
                  <span>Додати бренд</span>
                </button>
              ) : (
                <form className={styles.settingsAddForm} onSubmit={addBrand}>
                  <input
                    type="text"
                    placeholder="Назва бренду..."
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className={styles.settingsInput}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className={styles.settingsSubmitBtn}
                    disabled={!newItemName.trim()}
                  >
                    Зберегти
                  </button>
                  <button
                    type="button"
                    className={styles.settingsCancelBtn}
                    onClick={() => {
                      setIsAdding(false);
                      setNewItemName("");
                    }}
                  >
                    Скасувати
                  </button>
                </form>
              )}
            </div>

            <div className={styles.settingsList}>
              {brands.map((item, index) => (
                <div key={item} className={styles.settingsListItem}>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className={styles.settingsInlineInput}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveEditedBrand(index);
                        }
                      }}
                    />
                  ) : (
                    <span className={styles.settingsItemText}>
                      <span
                        style={{
                          color: "#9ca3af",
                          marginRight: "8px",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        {index + 1}.
                      </span>
                      {item}
                    </span>
                  )}
                  <div className={styles.settingsItemActions}>
                    {editingIndex === index ? (
                      <button
                        className={styles.iconBtnSuccess}
                        onClick={() => saveEditedBrand(index)}
                        title="Зберегти"
                      >
                        <IconCheck />
                      </button>
                    ) : (
                      <>
                        <button
                          className={styles.iconBtnEdit}
                          onClick={() => {
                            setEditingIndex(index);
                            setEditValue(item);
                          }}
                          title="Редагувати"
                        >
                          <IconEdit />
                        </button>
                        <button
                          className={styles.iconBtnDelete}
                          onClick={() => triggerDelete("brands", index, item)}
                          title="Видалити"
                        >
                          <IconTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {deletePrompt && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>
              Видалити {deletePrompt.type === "item" ? "товар" : "бренд"}?
            </h3>
            <p>Цю дію неможливо буде скасувати.</p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setDeletePrompt(null)}
                className={styles.btnCancel}
              >
                Скасування
              </button>
              <button onClick={confirmDeletion} className={styles.btnDelete}>
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
