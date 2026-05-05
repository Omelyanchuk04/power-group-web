"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useModal } from "@/context/ModalContext";
import styles from "./ServicesGrid.module.scss";

const servicesData = [
  {
    category: "Електромонтаж",
    items: [
      {
        id: "s1",
        num: "01",
        title: 'Електромонтажні роботи "під ключ"',
        description:
          "Виконуємо повний комплекс робіт для приватних та промислових об'єктів.",
        fullText:
          "Ми забезпечуємо повний цикл електромонтажних робіт. Від початкового дослідження об'єкту та розробки проєкту до прокладання кабельних трас, встановлення освітлення та пусконалагоджувальних робіт. Гарантуємо відповідність усім нормам безпеки (ДБН, ПУЕ) та використання сертифікованих матеріалів.",
        img: "/images/El-work-key-img.jpg",
      },
      {
        id: "s2",
        num: "02",
        title: "Виробництво та монтаж щитового обладнання",
        description:
          "Проектування, збирання та професійний монтаж щитів управління.",
        fullText:
          "Наші інженери збирають електрощитове обладнання будь-якої складності: ввідно-розподільчі пристрої (ВРП), щити автоматики, шафи управління насосами чи вентиляцією. Використовуємо комплектуючі від перевірених світових брендів.",
        img: "/images/electric-box-img.jpg",
      },
      {
        id: "s3",
        num: "03",
        title: "Реконструкція електроустановок",
        description: "Оновлення трансформаторних підстанцій та генераторів.",
        fullText:
          "Проводимо модернізацію застарілих електромереж на підприємствах. Збільшуємо дозволену потужність, замінюємо старі автоматичні вимикачі та трансформатори на сучасні аналоги.",
        img: "/images/reconstruction-img.jpg",
      },
      {
        id: "s4",
        num: "04",
        title: "Монтаж та обслуговування",
        description:
          "Кваліфікований монтаж та подальше сервісне обслуговування.",
        fullText:
          "Ми пропонуємо регулярний технічний огляд, тепловізійний контроль контактів, перевірку опору ізоляції та оперативний виїзд аварійної бригади у разі позаштатних ситуацій.",
        img: "/images/installation-service-img.jpg",
      },
    ],
  },
  {
    category: "Зелена енергія",
    items: [
      {
        id: "s5",
        num: "05",
        title: "Сонячні електростанції",
        description: "Реалізація проєктів СЕС для дому та бізнесу.",
        fullText:
          "Проєктуємо та будуємо сонячні електростанції (СЕС) під власне споживання або під «Зелений тариф». Встановлення СЕС дозволяє суттєво знизити собівартість вашої продукції.",
        img: "/images/solar-panel-img.jpg",
      },
      {
        id: "s6",
        num: "06",
        title: "Системи зберігання енергії",
        description:
          "Встановлення промислових та домашніх акумуляторних систем (BESS).",
        fullText:
          "Накопичувачі енергії (BESS) — це ваш захист від блекаутів. Система заряджається вночі або від сонця, а віддає енергію в пікові години.",
        img: "/images/backup-power-img.jpg",
      },
      {
        id: "s7",
        num: "07",
        title: "Системи резервного живлення",
        description:
          "Забезпечення безперебійної роботи за допомогою ДБЖ та генераторів.",
        fullText:
          "Комплексні системи для критичної інфраструктури. Синхронізуємо роботу генераторів із потужними ДБЖ, щоб бізнес не зупинявся ні на секунду.",
        img: "/images/backup-power-img.jpg",
      },
    ],
  },
];

export default function ServicesGrid() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { openModal: openContactModal } = useModal();

  const sectionRef = useRef(null);
  const gridContentRef = useRef(null);
  const modalCardRef = useRef(null);
  const backdropRef = useRef(null);
  const closeBtnRef = useRef(null);

  const isBlueTheme = activeTab === 0;
  const isGreenTheme = activeTab === 1;

  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedService]);

  const openModal = (service) => {
    setIsClosing(false);
    setSelectedService(service);
  };

  const closeModal = () => {
    if (isClosing) return;
    setIsClosing(true);
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedService(null);
        setIsClosing(false);
      },
    });
    tl.to(modalCardRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
    });
    tl.to(
      backdropRef.current,
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      "-=0.2",
    );
  };

  useEffect(() => {
    if (selectedService && !isClosing && modalCardRef.current) {
      const tl = gsap.timeline();
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(modalCardRef.current, { y: 50, opacity: 0, scale: 0.92 });
      tl.to(backdropRef.current, { opacity: 1, duration: 0.4 });
      tl.to(
        modalCardRef.current,
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" },
        "-=0.3",
      );
      tl.to(
        closeBtnRef.current,
        { opacity: 1, scale: 1, duration: 0.4 },
        "-=0.4",
      );
    }
  }, [selectedService, isClosing]);

  return (
    <>
      <section
        className={`${styles.gridSection} ${isBlueTheme ? styles.themeBlue : ""} ${isGreenTheme ? styles.themeGreen : ""}`}
        ref={sectionRef}
      >
        <div className={styles.container}>
          <div className={styles.tabsWrapper}>
            <div className={styles.tabsContainer}>
              {servicesData.map((data, index) => (
                <button
                  key={index}
                  className={`${styles.tabButton} ${activeTab === index ? styles.activeTab : ""}`}
                  onClick={() => setActiveTab(index)}
                >
                  {data.category}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.grid} ref={gridContentRef}>
            {servicesData[activeTab].items.map((service, index) => (
              <div key={service.id} className={styles.servicePanel}>
                <div
                  className={styles.cardInner}
                  onClick={() => openModal(service)}
                >
                  <NextImage
                    src={service.img}
                    alt={service.title}
                    fill
                    className={styles.bgImage}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index < 2}
                  />
                  <div className={styles.gradientOverlay}></div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardNumber}>{service.num}</div>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <p className={styles.cardDesc}>{service.description}</p>
                  </div>
                  <button className={styles.plusBtn} aria-label="Детальніше">
                    <svg
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
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {mounted &&
        selectedService &&
        createPortal(
          <>
            <div
              className={styles.backdropLayer}
              ref={backdropRef}
              onClick={closeModal}
            ></div>
            <div
              className={styles.modalScrollWrapper}
              onClick={closeModal}
              data-lenis-prevent="true"
            >
              <div className={styles.fixedCloseWrapper} ref={closeBtnRef}>
                <button className={styles.closeBtn} onClick={closeModal}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div
                className={styles.modalContent}
                ref={modalCardRef}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <span className={styles.modalNum}>
                    Послуга {selectedService.num}
                  </span>
                  <h2 className={styles.modalTitle}>{selectedService.title}</h2>
                </div>

                <div className={styles.modalRichContent}>
                  <div className={styles.modalBody}>
                    <p>{selectedService.fullText}</p>
                  </div>
                  <div className={styles.modalImageWrapper}>
                    <NextImage
                      src={selectedService.img}
                      alt={selectedService.title}
                      fill
                      className={styles.modalImage}
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  {/* 🔥 НОВА ЛОГІКА: Відкриваємо миттєво без затримок і зайвих рухів 🔥 */}
                  <button
                    className={styles.ctaButton}
                    onClick={() => {
                      openContactModal(); // Відкриваємо контакти відразу
                      setSelectedService(null); // Просто прибираємо опис послуги без анімації
                    }}
                  >
                    Отримати консультацію
                  </button>
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
