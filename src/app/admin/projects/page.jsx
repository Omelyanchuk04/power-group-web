"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./projects.module.scss";

// --- SVG ІКОНКИ ---
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
// 🔥 Оновлена іконка-шеврон
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

const CLOUD_NAME = "umg8kma4";
const UPLOAD_PRESET = "vin_power_group_projects";

const initialForm = {
  title: "",
  shortDescription: "",
  client: "",
  clientType: "b2c",
  serviceType: "solar",
  power: "",
  date: "",
};

let projectsCache = null;

export default function ProjectsPage() {
  const [projects, setProjects] = useState(projectsCache || []);
  const [isLoading, setIsLoading] = useState(!projectsCache);
  const [view, setView] = useState("list");
  const [formData, setFormData] = useState(initialForm);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const fetchProjects = async () => {
    if (!projectsCache) setIsLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        projectsCache = data;
        setProjects(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEditClick = (project) => {
    setFormData({
      title: project.title,
      shortDescription: project.shortDescription,
      client: project.client || "",
      clientType: project.clientType,
      serviceType: project.serviceType,
      power: project.power,
      date: project.date || "",
    });
    setEditingId(project._id);

    const existingImages = [];
    if (project.mainImage)
      existingImages.push({
        id: "main_old",
        url: project.mainImage,
        file: null,
        isMain: true,
      });
    if (project.gallery?.length) {
      project.gallery.forEach((url, i) =>
        existingImages.push({
          id: `gal_old_${i}`,
          url,
          file: null,
          isMain: false,
        }),
      );
    }
    setImages(existingImages);
    setView("edit");
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      const res = await fetch(`/api/projects/${projectToDelete}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedProjects = projects.filter(
          (p) => p._id !== projectToDelete,
        );
        setProjects(updatedProjects);
        projectsCache = updatedProjects;
      }
    } finally {
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    }
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
      if (combined.length > 0 && !combined.some((img) => img.isMain))
        combined[0].isMain = true;
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

  const setMainImage = (id) =>
    setImages((prev) => prev.map((img) => ({ ...img, isMain: img.id === id })));
  const removeImage = (id) =>
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      if (filtered.length > 0 && !filtered.some((img) => img.isMain))
        filtered[0].isMain = true;
      return filtered;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images.length) return alert("Додайте фотографію!");
    setIsUploading(true);

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
        uploadedImages.find((u) => u.isMain)?.url || uploadedImages[0].url;
      const finalGallery = uploadedImages
        .filter((u) => !u.isMain)
        .map((u) => u.url);

      const projectData = {
        ...formData,
        power: Number(formData.power) || 0,
        mainImage: finalMainImage,
        gallery: finalGallery,
      };

      const url =
        view === "edit" ? `/api/projects/${editingId}` : "/api/projects";
      const res = await fetch(url, {
        method: view === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (res.ok) {
        projectsCache = null;
        fetchProjects();
        setView("list");
        setImages([]);
      } else throw new Error("Помилка збереження");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {view === "list" && (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headerTitleGroup}>
              {/* 🔥 Кнопка "Назад" (Liquid Glass) */}
              <Link
                href="/admin"
                className={styles.backToAdminBtn}
                aria-label="Повернутися на головну"
              >
                <IconArrowLeft />
              </Link>
              <h1>Реалізовані проєкти</h1>
            </div>

            {/* 🔥 Кнопка "Новий проєкт" (Liquid Glass) */}
            <button
              onClick={() => {
                setFormData(initialForm);
                setImages([]);
                setView("add");
              }}
              className={styles.darkGlassBtn}
            >
              <IconPlus /> <span className={styles.btnText}>Новий проєкт</span>
            </button>
          </div>

          <div className={styles.glassPanel}>
            {isLoading ? (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: "#4b5563",
                }}
              >
                Завантаження...
              </div>
            ) : projects.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>📂</div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#111827",
                  }}
                >
                  Немає проєктів
                </h3>
              </div>
            ) : (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Фото</th>
                      <th>Назва</th>
                      <th>Локація</th>
                      <th>Потужність</th>
                      <th style={{ textAlign: "right" }}>Дії</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p) => (
                      <tr key={p._id}>
                        <td className={styles.cellImg}>
                          <img
                            src={p.mainImage}
                            className={styles.projectImg}
                            alt={p.title}
                          />
                        </td>
                        <td className={styles.cellTitle}>{p.title}</td>
                        <td className={styles.cellClient}>{p.client || "—"}</td>
                        <td className={styles.cellPower}>{p.power} кВт</td>
                        <td className={styles.cellActions}>
                          <button
                            onClick={() => handleEditClick(p)}
                            className={`${styles.actionBtn} ${styles.edit}`}
                            title="Редагувати"
                          >
                            <IconEdit />
                          </button>
                          <button
                            onClick={() => {
                              setProjectToDelete(p._id);
                              setIsDeleteModalOpen(true);
                            }}
                            className={`${styles.actionBtn} ${styles.delete}`}
                            title="Видалити"
                          >
                            <IconTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {(view === "add" || view === "edit") && (
        <div className={styles.containerForm}>
          <button onClick={() => setView("list")} className={styles.backBtn}>
            <IconArrowLeft /> Повернутися
          </button>

          <div className={styles.glassPanel}>
            <h2 className={styles.formTitle}>
              {view === "edit" ? "Редагування проєкту" : "Створення нового"}
            </h2>
            <form onSubmit={handleSubmit} className={styles.formLayout}>
              <div className={styles.grid3}>
                <div className={styles.inputGroup}>
                  <label>
                    Назва <span>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Локація</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) =>
                      setFormData({ ...formData, client: e.target.value })
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Дата реалізації</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styles.grid3}>
                <div className={styles.inputGroup}>
                  <label>Тип об'єкта</label>
                  <select
                    value={formData.clientType}
                    onChange={(e) =>
                      setFormData({ ...formData, clientType: e.target.value })
                    }
                  >
                    <option value="b2c">Для дому (B2C)</option>
                    <option value="b2b">Для бізнесу (B2B)</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label>Рішення</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceType: e.target.value })
                    }
                  >
                    <option value="solar">Будівництво СЕС</option>
                    <option value="backup">Резервне живлення</option>
                    <option value="storage">Зберігання енергії</option>
                    <option value="electro">Електромонтаж</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label>
                    Потужність (кВт) <span>*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.power}
                    onChange={(e) =>
                      setFormData({ ...formData, power: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>
                  Короткий опис <span>*</span>
                </label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shortDescription: e.target.value,
                    })
                  }
                  required
                  className={styles.fixedTextarea}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Фотографії проєкту (Головне фото та Галерея)</label>
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
                    onChange={(e) => processFiles(e.target.files)}
                  />
                  <div className={styles.uploadContent}>
                    <IconUpload />
                    <span className={styles.uploadText}>
                      Натисніть або перетягніть фото сюди
                    </span>
                    <span className={styles.uploadHint}>
                      Перше фото автоматично стане головним.
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

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className={styles.cancelBtn}
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className={styles.submitFormBtn}
                >
                  {isUploading ? "Збереження..." : "Зберегти проєкт"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Видалити проєкт?</h3>
            <p>Цю дію неможливо буде скасувати.</p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className={styles.btnCancel}
              >
                Скасування
              </button>
              <button onClick={confirmDelete} className={styles.btnDelete}>
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
