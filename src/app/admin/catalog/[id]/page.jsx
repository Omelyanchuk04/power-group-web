"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { CATEGORY_FILTERS, FILTER_LABELS } from "@/lib/catalogConfig";
import styles from "./form.module.scss";

// --- ІКОНКИ ---
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

const IconUpload = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const IconX = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- НАЛАШТУВАННЯ CLOUDINARY ---
const CLOUD_NAME = "umg8kma4";
const UPLOAD_PRESET = "vin_power_group_projects";

export default function CatalogFormPage({ params }) {
  const router = useRouter();

  // 🔥 РОЗПАКОВУЄМО PARAMS ДЛЯ НОВИХ ВЕРСІЙ NEXT.JS 🔥
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const isNew = id === "new";

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    filters: {},
  });

  // Стейт для Drag & Drop
  const [isDragging, setIsDragging] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const settingsRes = await fetch("/api/settings/catalog");
        let fetchedCategories = [];
        let fetchedBrands = [];
        if (settingsRes.ok) {
          const settings = await settingsRes.json();
          fetchedCategories = settings.categories || [];
          fetchedBrands = settings.brands || [];
          setCategories(fetchedCategories);
          setBrands(fetchedBrands);
        }

        if (!isNew) {
          const res = await fetch("/api/catalog");
          const items = await res.json();
          const item = items.find((i) => i._id === id);
          if (item) {
            setFormData({
              name: item.name || "",
              category: item.category || fetchedCategories[0] || "",
              description: item.description || "",
              image: item.image || "",
              filters: item.filters || {},
            });
          }
        } else {
          setFormData((prev) => ({
            ...prev,
            category: fetchedCategories[0] || "",
          }));
        }
      } catch (error) {
        console.error("Помилка завантаження:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, [isNew, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setFormData((prev) => ({ ...prev, category: value, filters: {} }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFilterChange = (filterKey, value) => {
    setFormData((prev) => ({
      ...prev,
      filters: { ...prev.filters, [filterKey]: value },
    }));
  };

  // --- ЛОГІКА DRAG & DROP ---
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) processFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length) processFile(e.target.files[0]);
  };

  const processFile = (file) => {
    setImageFile(file);
    setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  const removeImage = () => {
    setImageFile(null);
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let finalImageUrl = formData.image;

      if (imageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", imageFile);
        formDataUpload.append("upload_preset", UPLOAD_PRESET);
        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formDataUpload,
          },
        );
        const uploadData = await uploadRes.json();
        finalImageUrl = uploadData.secure_url;
      }

      const payload = { ...formData, image: finalImageUrl };

      // Використовуємо id змінну, яку розпакували з params
      const url = isNew ? "/api/catalog" : `/api/catalog/${id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/catalog");
        router.refresh();
      } else {
        alert("Сталася помилка при збереженні!");
      }
    } catch (error) {
      console.error(error);
      alert("Помилка сервера.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return (
      <div className={styles.containerForm}>
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#4b5563",
            fontWeight: "500",
          }}
        >
          Завантаження...
        </div>
      </div>
    );

  const currentCategoryFilters = CATEGORY_FILTERS[formData.category];

  return (
    <div className={styles.containerForm}>
      <button
        type="button"
        onClick={() => router.push("/admin/catalog")}
        className={styles.backBtn}
      >
        <IconArrowLeft /> Повернутися
      </button>

      <div className={styles.glassPanel}>
        <h2 className={styles.formTitle}>
          {isNew ? "Створення нового товару" : "Редагування товару"}
        </h2>

        <form className={styles.formLayout} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>
              Назва товару <span>*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Наприклад: Інвертор Deye 8kW"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Фотографія товару</label>
            {!formData.image ? (
              <label
                className={`${styles.unifiedUploadZone} ${isDragging ? styles.dragging : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  className={styles.hiddenFileInput}
                  onChange={handleFileChange}
                />
                <div className={styles.uploadContent}>
                  <IconUpload />
                  <span className={styles.uploadText}>
                    Натисніть або перетягніть фото сюди
                  </span>
                </div>
              </label>
            ) : (
              <div className={styles.imagePreviewContainer}>
                <div className={styles.imageCard}>
                  <img src={formData.image} alt="preview" />
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={removeImage}
                  >
                    <IconX />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>
              Категорія обладнання <span>*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {currentCategoryFilters && (
            <div className={styles.dynamicFiltersBox}>
              <h3 className={styles.filtersBoxTitle}>
                Специфікації для: {formData.category}
              </h3>
              <div className={styles.grid2}>
                {Object.entries(currentCategoryFilters).map(
                  ([filterKey, options]) => {
                    const isBrand = filterKey === "brand";
                    const renderOptions = isBrand ? brands : options;

                    return (
                      <div key={filterKey} className={styles.inputGroup}>
                        <label>{FILTER_LABELS[filterKey] || filterKey}</label>
                        <select
                          value={formData.filters[filterKey] || ""}
                          onChange={(e) =>
                            handleFilterChange(filterKey, e.target.value)
                          }
                        >
                          <option value="">Не обрано</option>
                          {renderOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label>
              Короткий опис <span>*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className={styles.fixedTextarea}
              placeholder="Опишіть особливості товару..."
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={() => router.push("/admin/catalog")}
              className={styles.cancelBtn}
            >
              Скасувати
            </button>
            <button
              type="submit"
              className={styles.submitFormBtn}
              disabled={isSaving}
            >
              {isSaving ? "Завантаження..." : "Зберегти товар"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
