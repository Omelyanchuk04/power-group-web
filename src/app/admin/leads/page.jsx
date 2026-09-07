"use client";

import React, { useState, useEffect } from "react";
import styles from "./leads.module.scss";

// Іконки
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
const IconArrowLeft = () => (
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
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);
const IconPhone = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);
const IconMail = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);
const IconCompany = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="14" x2="23" y2="14"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);

// 🔥 ГЛОБАЛЬНИЙ КЕШ ДЛЯ МИТТЄВОГО ВІДОБРАЖЕННЯ 🔥
let leadsCache = null;

export default function LeadsPage() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const [leads, setLeads] = useState(leadsCache || []);
  const [isLoading, setIsLoading] = useState(!leadsCache);

  // 🔥 Миттєво підтягуємо першу заявку з кешу, щоб уникнути блимання пустого екрану
  const [selectedLead, setSelectedLead] = useState(() => {
    if (leadsCache && leadsCache.length > 0 && !isMobile) {
      return leadsCache[0];
    }
    return null;
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchLeads = async () => {
    if (!leadsCache) setIsLoading(true);
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        leadsCache = data;
        setLeads(data);

        // Відкриваємо першу заявку, якщо вона ще не відкрита
        if (data.length > 0 && !isMobile) {
          setSelectedLead((prev) => prev || data[0]);
        }
      }
    } catch (error) {
      console.error("Помилка", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const previousLeads = [...leads];

    const updatedLeads = leads.map((lead) =>
      lead._id === id ? { ...lead, status: newStatus } : lead,
    );
    setLeads(updatedLeads);
    leadsCache = updatedLeads;

    if (selectedLead && selectedLead._id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }

    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Помилка сервера");
    } catch (error) {
      alert("Не вдалося оновити статус!");
      setLeads(previousLeads);
      leadsCache = previousLeads;
    }
  };

  const confirmDelete = async () => {
    if (!selectedLead) return;
    try {
      const res = await fetch(`/api/leads/${selectedLead._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const remainingLeads = leads.filter((l) => l._id !== selectedLead._id);
        setLeads(remainingLeads);
        leadsCache = remainingLeads;
        setSelectedLead(
          remainingLeads.length > 0 && !isMobile ? remainingLeads[0] : null,
        );
      }
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Успіх":
        return "success";
      case "Відмова":
        return "reject";
      case "В роботі":
        return "work";
      default:
        return "nova";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Вхідні заявки</h1>
      </div>

      <div className={styles.mailApp}>
        {isLoading ? (
          <div className={styles.emptyState}>Завантаження...</div>
        ) : leads.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📬</div>
            <h3>Немає нових заявок</h3>
            <p>Усі нові запити з сайту з'являтимуться тут.</p>
          </div>
        ) : (
          <>
            <div
              className={`${styles.mailSidebar} ${selectedLead ? styles.hideOnMobile : ""}`}
            >
              <div className={styles.sidebarHeader}>
                <span>Всі заявки ({leads.length})</span>
              </div>
              <div className={styles.mailList}>
                {leads.map((lead) => {
                  const isActive = selectedLead?._id === lead._id;
                  return (
                    <div
                      key={lead._id}
                      className={`${styles.mailItem} ${isActive ? styles.active : ""}`}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className={styles.itemHeader}>
                        <span className={styles.itemName}>{lead.name}</span>
                        <span className={styles.itemDate}>
                          {formatDate(lead.createdAt)}
                        </span>
                      </div>
                      <div className={styles.itemSub}>
                        <span className={styles.itemPhone}>{lead.phone}</span>
                        <span
                          className={`${styles.statusDot} ${styles[getStatusClass(lead.status)]}`}
                        />
                      </div>
                      <div className={styles.itemSnippet}>
                        {lead.message || "Без тексту запиту..."}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`${styles.mailContent} ${!selectedLead ? styles.hideOnMobile : ""}`}
            >
              {selectedLead ? (
                <>
                  <div className={styles.contentToolbar}>
                    <button
                      className={styles.backBtnMobile}
                      onClick={() => setSelectedLead(null)}
                    >
                      <IconArrowLeft /> Назад
                    </button>

                    <div className={styles.statusControl}>
                      <select
                        value={selectedLead.status || "Нова"}
                        onChange={(e) =>
                          handleStatusChange(selectedLead._id, e.target.value)
                        }
                        className={`${styles.customSelect} ${styles[getStatusClass(selectedLead.status)]}`}
                      >
                        <option value="Нова">Нова</option>
                        <option value="В роботі">В роботі</option>
                        <option value="Успіх">Успіх</option>
                        <option value="Відмова">Відмова</option>
                      </select>
                    </div>
                    <button
                      onClick={() => setIsDeleteModalOpen(true)}
                      className={styles.deleteBtn}
                      title="Видалити"
                    >
                      <IconTrash />
                    </button>
                  </div>

                  <div className={styles.contentScrollArea}>
                    <div className={styles.emailHeader}>
                      <div className={styles.emailAvatar}>
                        {selectedLead.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className={styles.emailMeta}>
                        <h2>{selectedLead.name}</h2>
                        <div className={styles.emailDate}>
                          {new Date(selectedLead.createdAt).toLocaleString(
                            "uk-UA",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={styles.emailContacts}>
                      <a
                        href={`tel:${selectedLead.phone}`}
                        className={styles.contactPill}
                      >
                        <IconPhone /> {selectedLead.phone}
                      </a>
                      {selectedLead.email && (
                        <a
                          href={`mailto:${selectedLead.email}`}
                          className={styles.contactPill}
                        >
                          <IconMail /> {selectedLead.email}
                        </a>
                      )}
                      {selectedLead.company && (
                        <div className={styles.contactPill}>
                          <IconCompany /> {selectedLead.company}
                        </div>
                      )}
                    </div>

                    <div className={styles.emailBody}>
                      {selectedLead.message ? (
                        <p>{selectedLead.message}</p>
                      ) : (
                        <p className={styles.emptyText}>
                          Клієнт залишив заявку без додаткового коментаря.
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.emptyContent}>
                  Виберіть заявку для перегляду
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {isDeleteModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Видалити заявку?</h3>
            <p>Цю дію неможливо буде скасувати.</p>
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
