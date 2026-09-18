"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
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
const IconStar = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);
const IconFileText = () => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const CLOUD_NAME = "umg8kma4";
const UPLOAD_PRESET = "vin_power_group_projects";

const CATEGORIES = [
  "Сонячні панелі",
  "Гібридні інвертори",
  "Мережеві інвертори",
  "Акумулятори",
  "Системи накопичення",
  "Силове обладнання для сонячних електростанцій",
  "Комплектуючі для монтажу",
];

const FILTER_LABELS = {
  brand: "Виробник (бренд)",
  power: "Потужність",
  dimensions: "Габарити",
  phase: "Кількість фаз",
  type: "Тип",
  executionType: "Тип виконання",
  subcategory: "Підкатегорія (розділ)",
  batteryType: "Тип батареї",
};

const CATEGORY_FILTERS = {
  "Сонячні панелі": {
    brand: [
      "Longi Solar",
      "Tongwei Solar",
      "Jinko Solar",
      "JA Solar",
      "Trina Solar",
    ],
    power: ["300 - 400 Вт", "400 - 500 Вт", "500 - 600 Вт", "600 - 700 Вт"],
    dimensions: [
      "1722х1134",
      "1762x1134",
      "1961×1134",
      "1990х1134",
      "2278x1134",
      "2382x1134",
    ],
  },
  "Гібридні інвертори": {
    brand: [
      "Deye",
      "Solis",
      "Afore",
      "Sungrow",
      "FoxESS",
      "LuxPower",
      "Huawei",
    ],
    phase: ["3 фази", "1 фаза"],
    type: ["високовольтний", "низьковольтний"],
    power: [
      "6-10 кВт",
      "11-15 кВт",
      "16-25 кВт",
      "26-50 кВт",
      "51-100 кВт",
      "понад 100 кВт",
    ],
  },
  "Мережеві інвертори": {
    brand: ["Deye", "Solis", "Sungrow", "Huawei"],
    phase: ["3 фази", "1 фаза"],
    power: [
      "6-10 кВт",
      "11-15 кВт",
      "16-25 кВт",
      "26-50 кВт",
      "51-100 кВт",
      "понад 100 кВт",
    ],
  },
  Акумулятори: {
    brand: ["Deye", "Dyness", "GSL ENERGY", "FoxESS"],
    batteryType: ["Низьковольтна", "Високовольтна"],
  },
  "Системи накопичення": {
    brand: ["Deye", "Dyness", "GSL ENERGY", "FoxESS"],
  },
  "Силове обладнання для сонячних електростанцій": {
    executionType: [
      "для гібридних інверторів",
      "для мережевих інверторів",
      "для установок зберігання енергії",
      "для дизельних генераторів АВР",
    ],
    power: [
      "6-10 кВт",
      "11-15 кВт",
      "16-25 кВт",
      "26-50 кВт",
      "51-100 кВт",
      "понад 100 кВт",
    ],
  },
  "Комплектуючі для монтажу": {
    subcategory: [
      "Кабель",
      "Конектори МС-4",
      "Кріплення",
      "Лічильники",
      "Інше",
    ],
  },
};

export default function CatalogFormPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const isNew = id === "new";

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    filters: {},
  });

  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        if (!isNew) {
          const res = await fetch("/api/catalog");
          const items = await res.json();
          const item = items.find((i) => i._id === id);
          if (item) {
            setFormData({
              name: item.name || "",
              category: item.category || CATEGORIES[0],
              description: item.description || "",
              filters: item.filters || {},
            });

            const existingImages = [];
            if (item.image) {
              existingImages.push({
                id: "main_old",
                url: item.image,
                file: null,
                isMain: true,
              });
            }
            if (item.gallery && item.gallery.length > 0) {
              item.gallery.forEach((url, i) => {
                existingImages.push({
                  id: `gal_old_${i}`,
                  url,
                  file: null,
                  isMain: false,
                });
              });
            }
            setImages(existingImages);

            if (item.datasheetUrl) {
              setPdfFile({
                name: "Технічна_документація.pdf",
                url: item.datasheetUrl,
                file: null,
              });
            }
          }
        } else {
          setFormData((prev) => ({
            ...prev,
            category: CATEGORIES[0],
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

  const processFiles = (fileList) => {
    const files = Array.from(fileList);
    if (!files.length) return;

    const newImages = files.map((f, i) => ({
      id: `new_${Date.now()}_${i}`,
      url: URL.createObjectURL(f),
      file: f,
      isMain: false,
    }));

    setImages((prev) => {
      const combined = [...prev, ...newImages];
      if (combined.length > 0 && !combined.some((img) => img.isMain)) {
        combined[0].isMain = true;
      }
      return combined;
    });
  };

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
    if (e.dataTransfer.files?.length) processFiles(e.dataTransfer.files);
  };
  const handleFileChange = (e) => {
    if (e.target.files?.length) processFiles(e.target.files);
  };

  const setMainImage = (id) => {
    setImages((prev) => prev.map((img) => ({ ...img, isMain: img.id === id })));
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      if (filtered.length > 0 && !filtered.some((img) => img.isMain)) {
        filtered[0].isMain = true;
      }
      return filtered;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const uploadedImages = await Promise.all(
        images.map(async (img) => {
          if (img.file) {
            const formDataUpload = new FormData();
            formDataUpload.append("file", img.file);
            formDataUpload.append("upload_preset", UPLOAD_PRESET);
            const res = await fetch(
              `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
              { method: "POST", body: formDataUpload },
            );
            const data = await res.json();
            return { url: data.secure_url, isMain: img.isMain };
          }
          return { url: img.url, isMain: img.isMain };
        }),
      );

      const finalMainImage =
        uploadedImages.find((u) => u.isMain)?.url ||
        uploadedImages[0]?.url ||
        "";
      const finalGallery = uploadedImages
        .filter((u) => !u.isMain)
        .map((u) => u.url);

      let finalPdfUrl = pdfFile ? pdfFile.url : "";
      if (pdfFile && pdfFile.file) {
        const pdfUploadData = new FormData();
        pdfUploadData.append("file", pdfFile.file);
        pdfUploadData.append("upload_preset", UPLOAD_PRESET);
        const pdfRes = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
          { method: "POST", body: pdfUploadData },
        );
        const pdfData = await pdfRes.json();
        finalPdfUrl = pdfData.secure_url;
      }

      const payload = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        image: finalMainImage,
        gallery: finalGallery,
        filters: formData.filters,
        datasheetUrl: finalPdfUrl,
      };

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

        <form
          className={styles.formLayout}
          onSubmit={handleSubmit}
          style={{
            opacity: isLoading ? 0.6 : 1,
            pointerEvents: isLoading ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
        >
          {/* 1. НАЗВА */}
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

          {/* 2. КАТЕГОРІЯ */}
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
              <option value="" disabled>
                Оберіть категорію...
              </option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 3. СПЕЦИФІКАЦІЇ (ДИНАМІЧНІ) */}
          {currentCategoryFilters && (
            <div
              className={styles.dynamicFiltersBox}
              style={{
                background: "rgba(0,0,0,0.02)",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  marginTop: 0,
                  marginBottom: "16px",
                  color: "#111827",
                }}
              >
                Специфікації для: {formData.category}
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {Object.entries(currentCategoryFilters).map(
                  ([filterKey, options]) => (
                    <div key={filterKey} className={styles.inputGroup}>
                      <label>{FILTER_LABELS[filterKey]}</label>
                      <select
                        value={formData.filters[filterKey] || ""}
                        onChange={(e) =>
                          handleFilterChange(filterKey, e.target.value)
                        }
                      >
                        <option value="">Не обрано</option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* 4. ОПИС ТОВАРУ */}
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

          {/* 5. ФОТОГРАФІЇ ТОВАРУ */}
          <div className={styles.inputGroup}>
            <label>Фотографії товару (Головне фото та Галерея)</label>
            <label
              className={`${styles.unifiedUploadZone} ${isDragging ? styles.dragging : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                multiple
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

            {images.length > 0 && (
              <div className={styles.imageGrid}>
                {images.map((img) => (
                  <div
                    key={img.id}
                    className={`${styles.imageCard} ${img.isMain ? styles.isMain : ""}`}
                  >
                    <img src={img.url} alt="preview" />
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removeImage(img.id)}
                    >
                      <IconX />
                    </button>
                    {img.isMain ? (
                      <div className={styles.mainBadge}>
                        <IconStar /> Головна
                      </div>
                    ) : (
                      <div
                        className={styles.setMainOverlay}
                        onClick={() => setMainImage(img.id)}
                      >
                        Зробити головною
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 🔥 РОЗДІЛЮВАЧ МІЖ ФОТО І PDF 🔥 */}
          <div className={styles.sectionDivider}></div>

          {/* 6. БЛОК ЗАВАНТАЖЕННЯ PDF */}
          <div className={styles.inputGroup}>
            <label>
              Технічна документація (PDF Datasheet)
              <span
                style={{
                  color: "#9ca3af",
                  fontWeight: 400,
                  marginLeft: "4px",
                  textTransform: "none",
                }}
              >
                - не обов'язково
              </span>
            </label>

            {!pdfFile ? (
              <label
                className={`${styles.unifiedUploadZone} ${styles.pdfZone}`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  className={styles.hiddenFileInput}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPdfFile({
                        name: file.name,
                        url: URL.createObjectURL(file),
                        file,
                      });
                    }
                  }}
                />
                <div className={styles.uploadContent}>
                  <IconFileText />
                  <span className={styles.uploadText}>
                    Натисніть сюди, щоб обрати PDF файл
                  </span>
                </div>
              </label>
            ) : (
              <div className={styles.pdfCard}>
                <a
                  href={pdfFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pdfInfoLink}
                  title="Відкрити документ у новій вкладці"
                >
                  <div className={styles.pdfIconWrapper}>
                    <IconFileText />
                  </div>
                  <span className={styles.pdfName}>{pdfFile.name}</span>
                </a>
                <button
                  type="button"
                  className={styles.pdfRemoveBtn}
                  onClick={() => setPdfFile(null)}
                  title="Видалити PDF"
                >
                  <IconX />
                </button>
              </div>
            )}
          </div>

          {/* КНОПКИ */}
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
