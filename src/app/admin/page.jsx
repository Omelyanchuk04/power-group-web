"use client";

import React, { useState, useEffect } from "react";
import GlobalBackground from "@/components/layout/GlobalBackground";
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
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
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

const CLOUD_NAME = "umg8kma4";
const UPLOAD_PRESET = "vin_power_group_projects";

const initialForm = {
  title: "",
  shortDescription: "",
  client: "",
  clientType: "b2c",
  serviceType: "solar",
  power: "",
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState("list");
  const [formData, setFormData] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Помилка завантаження", error);
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
      mainImage: project.mainImage,
    });
    setEditingId(project._id);
    setFile(null);
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
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p._id !== projectToDelete));
      } else {
        alert("Помилка видалення");
      }
    } catch (error) {
      alert("Помилка з'єднання");
    } finally {
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = formData.mainImage;

      if (file) {
        const imageFormData = new FormData();
        imageFormData.append("file", file);
        imageFormData.append("upload_preset", UPLOAD_PRESET);

        const cloudinaryRes = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: imageFormData,
          },
        );
        const cloudinaryData = await cloudinaryRes.json();
        if (!cloudinaryRes.ok) throw new Error("Помилка завантаження фото");
        imageUrl = cloudinaryData.secure_url;
      } else if (view === "add") {
        throw new Error("Будь ласка, оберіть фотографію!");
      }

      const projectData = {
        ...formData,
        power: Number(formData.power) || 0,
        mainImage: imageUrl,
      };

      const method = view === "edit" ? "PUT" : "POST";
      const url =
        view === "edit" ? `/api/projects/${editingId}` : "/api/projects";

      const dbRes = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (dbRes.ok) {
        fetchProjects();
        setView("list");
      } else {
        throw new Error("Помилка збереження в БД");
      }
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
            <img
              src="/Logo-icon.svg"
              alt="Vin Power"
              className={styles.logoMobile}
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
                setFile(null);
                setView("add");
              }}
              className={`${styles.navBtn} ${view === "add" ? styles.active : ""} ${styles.hideOnMobile}`}
            >
              <IconPlus /> <span>Додати проєкт</span>
            </button>
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
                    setFile(null);
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
                    Завантаження даних...
                  </div>
                ) : projects.length === 0 ? (
                  <div style={{ padding: "40px", textAlign: "center" }}>
                    <div style={{ fontSize: "40px", marginBottom: "16px" }}>
                      📂
                    </div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "800",
                        color: "#111827",
                      }}
                    >
                      Проєктів ще немає
                    </h3>
                    <p style={{ color: "#4b5563", fontSize: "14px" }}>
                      Додайте свій перший об'єкт.
                    </p>
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
                                alt={p.title}
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
                                title="Редагувати"
                              >
                                <IconEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(p._id)}
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
                  <div className={styles.grid2}>
                    <div className={styles.inputGroup}>
                      <label>
                        Назва <span>*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
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
                        name="client"
                        value={formData.client}
                        onChange={(e) =>
                          setFormData({ ...formData, client: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.grid3}>
                    <div className={styles.inputGroup}>
                      <label>Тип об'єкта</label>
                      <select
                        name="clientType"
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
                        name="serviceType"
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
                        name="power"
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
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shortDescription: e.target.value,
                        })
                      }
                      required
                      rows="2"
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Головне фото</label>
                    {view === "edit" && formData.mainImage && (
                      <img
                        src={formData.mainImage}
                        alt="Current"
                        className={styles.previewImg}
                      />
                    )}
                    <div className={styles.fileInputWrapper}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        required={view === "add"}
                      />
                    </div>
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
            <p>
              Ви впевнені, що хочете видалити цей проєкт? Цю дію неможливо буде
              скасувати.
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className={styles.btnCancel}
              >
                Скасувати
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
