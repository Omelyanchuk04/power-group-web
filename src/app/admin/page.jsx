"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import GlobalBackground from "@/components/layout/GlobalBackground";
import Header from "@/components/layout/Header";
import styles from "./admin.module.scss";

// --- SVG Іконки ---
const IconPlus = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
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
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
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
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"></path>
  </svg>
);
const IconArrowLeft = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);
const IconProjects = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
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
const IconExternal = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
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

// 🔥 Додали поле date
const initialForm = {
  title: "",
  shortDescription: "",
  client: "",
  clientType: "b2c",
  serviceType: "solar",
  power: "",
  date: "",
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState("list");
  const [formData, setFormData] = useState(initialForm);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Помилка", error);
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
      date: project.date || "", // Підтягуємо існуючу дату
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

  const handleDeleteClick = (id) => {
    setProjectToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      const res = await fetch(`/api/projects/${projectToDelete}`, {
        method: "DELETE",
      });
      if (res.ok)
        setProjects((prev) => prev.filter((p) => p._id !== projectToDelete));
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
            const formData = new FormData();
            formData.append("file", img.file);
            formData.append("upload_preset", UPLOAD_PRESET);
            const res = await fetch(
              `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
              { method: "POST", body: formData },
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
    <div className={styles.dashboardWrapper}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundColor: "#f9fafb",
        }}
      >
        <GlobalBackground isLayout={false} />
      </div>
      <div className={styles.mobileClientHeader}>
        <Header />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          width: "100%",
          flexDirection: "inherit",
        }}
      >
        <aside className={styles.sidebar}>
          <div className={styles.brand}>
            <img
              src="/logo.svg"
              alt="Vin Power"
              className={styles.logoDesktop}
            />
          </div>
          <div className={styles.navContainer}>
            <button
              onClick={() => {
                setView("list");
                fetchProjects();
              }}
              className={`${styles.navBtn} ${view === "list" ? styles.active : ""}`}
            >
              <IconProjects /> <span>Усі проєкти</span>
            </button>
            <button
              onClick={() => {
                setFormData(initialForm);
                setImages([]);
                setView("add");
              }}
              className={`${styles.navBtn} ${view === "add" ? styles.active : ""}`}
            >
              <IconPlus /> <span>Додати проєкт</span>
            </button>
          </div>
          <div className={styles.sidebarFooter}>
            <Link href="/" className={styles.navBtn}>
              <IconExternal /> <span>Повернутися на сайт</span>
            </Link>
          </div>
        </aside>

        <main className={styles.mainContent}>
          {view === "list" && (
            <div className={styles.container}>
              <div className={styles.header}>
                <h1>Реалізовані проєкти</h1>
                <button
                  onClick={() => {
                    setFormData(initialForm);
                    setImages([]);
                    setView("add");
                  }}
                  className={styles.primaryBtn}
                >
                  <IconPlus />{" "}
                  <span className={styles.btnText}>Новий проєкт</span>
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
                    <div style={{ fontSize: "40px", marginBottom: "16px" }}>
                      📂
                    </div>
                    <h3 style={{ fontSize: "18px", fontWeight: "800" }}>
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
                              />
                            </td>
                            <td className={styles.cellTitle}>{p.title}</td>
                            <td className={styles.cellClient}>
                              {p.client || "—"}
                            </td>
                            <td className={styles.cellPower}>{p.power} кВт</td>
                            <td className={styles.cellActions}>
                              <button
                                onClick={() => handleEditClick(p)}
                                className={`${styles.actionBtn} ${styles.edit}`}
                              >
                                <IconEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(p._id)}
                                className={`${styles.actionBtn} ${styles.delete}`}
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
              <button
                onClick={() => setView("list")}
                className={styles.backBtn}
              >
                <IconArrowLeft /> Повернутися
              </button>

              <div className={styles.glassPanel}>
                <h2 className={styles.formTitle}>
                  {view === "edit" ? "Редагування проєкту" : "Створення нового"}
                </h2>

                <form onSubmit={handleSubmit} className={styles.formLayout}>
                  {/* 🔥 ТЕПЕР ТУТ 3 КОЛОНКИ (Назва, Локація, Дата) 🔥 */}
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
                          setFormData({
                            ...formData,
                            clientType: e.target.value,
                          })
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
                          setFormData({
                            ...formData,
                            serviceType: e.target.value,
                          })
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
                      <span className={styles.btnText}>
                        {isUploading ? "Збереження..." : "Зберегти проєкт"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {isDeleteModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Видалити проєкт?</h3>
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
    </div>
  );
}
