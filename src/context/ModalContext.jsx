"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import ContactModal from "../components/modals/ContactModal"; // Ваш шлях до модалки контактів
import ProjectModal from "../components/modals/ProjectModal/ProjectModal"; // 🔥 Шлях до нової модалки проєкту

// 1. Створюємо контекст
const ModalContext = createContext();

// 2. Створюємо Провайдер, який обгорне весь сайт
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // Стан для контактної форми
  const [projectData, setProjectData] = useState(null); // 🔥 Стан для даних проєкту

  // 🔥 Блокуємо скрол сторінки, якщо відкрита БУДЬ-ЯКА з модалок
  useEffect(() => {
    if (isOpen || projectData) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, projectData]);

  // 🔥 Оновлена функція: тепер вона приймає тип модалки та дані
  const openModal = (type = "contact", data = null) => {
    if (type === "project" && data) {
      setProjectData(data); // Відкриваємо модалку проєкту з даними
    } else {
      setIsOpen(true); // За замовчуванням відкриваємо контакти
    }
  };

  // Функції закриття
  const closeModal = () => setIsOpen(false);
  const closeProjectModal = () => setProjectData(null); // 🔥 Очищаємо дані проєкту для закриття

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {/* Контактна модалка живе тут */}
      <ContactModal isOpen={isOpen} onClose={closeModal} />

      {/* 🔥 Модалка проєкту живе тут і з'являється тільки тоді, коли є дані */}
      {projectData && (
        <ProjectModal project={projectData} onClose={closeProjectModal} />
      )}
    </ModalContext.Provider>
  );
};

// 3. Створюємо кастомний хук для швидкого доступу
export const useModal = () => {
  return useContext(ModalContext);
};
