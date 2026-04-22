"use client";

import React, { createContext, useContext, useState } from "react";
import ContactModal from "../components/modals/ContactModal"; // Перевірте, чи правильний шлях до вашої модалки

// 1. Створюємо контекст
const ModalContext = createContext();

// 2. Створюємо Провайдер, який обгорне весь сайт
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {/* Модалка тепер живе тут, на глобальному рівні */}
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </ModalContext.Provider>
  );
};

// 3. Створюємо кастомний хук для швидкого доступу
export const useModal = () => {
  return useContext(ModalContext);
};
