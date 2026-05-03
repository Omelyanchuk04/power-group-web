"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServicesGrid.module.scss";

const servicesData = [
  {
    category: "Інфраструктура",
    items: [
      {
        id: "s1",
        num: "01",
        title: 'Електромонтажні роботи "під ключ"',
        description:
          "Виконуємо повний комплекс робіт для приватних та промислових об'єктів.",
        fullText:
          "Ми забезпечуємо повний цикл електромонтажних робіт. Від початкового дослідження об'єкту та розробки проєкту до прокладання кабельних трас, встановлення освітлення та пусконалагоджувальних робіт. Гарантуємо відповідність усім нормам безпеки (ДБН, ПУЕ) та використання сертифікованих матеріалів. Ідеально підходить як для нових будівель, так і для капітального ремонту.",
        img: "/images/El-work-key-img.jpg",
      },
      {
        id: "s2",
        num: "02",
        title: "Виробництво та монтаж щитового обладнання",
        description:
          "Проектування, збирання та професійний монтаж щитів управління.",
        fullText:
          "Наші інженери збирають електрощитове обладнання будь-якої складності: ввідно-розподільчі пристрої (ВРП), щити автоматики, шафи управління насосами чи вентиляцією. Кожен щит проходить тестування під навантаженням перед відправкою на об'єкт. Використовуємо комплектуючі від перевірених світових брендів.",
        img: "/images/electric-box-img.jpg",
      },
      {
        id: "s3",
        num: "03",
        title: "Реконструкція електроустановок",
        description: "Оновлення трансформаторних підстанцій та генераторів.",
        fullText:
          "Проводимо модернізацію застарілих електромереж на підприємствах. Збільшуємо дозволену потужність, замінюємо старі автоматичні вимикачі та трансформатори на сучасні, більш надійні аналоги. Це дозволяє уникнути аварійних зупинок виробництва та зменшити втрати електроенергії.",
        img: "/images/reconstruction-img.jpg",
      },
      {
        id: "s4",
        num: "04",
        title: "Монтаж та обслуговування",
        description:
          "Кваліфікований монтаж та подальше сервісне обслуговування.",
        fullText:
          "Не достатньо просто встановити обладнання — його потрібно правильно обслуговувати. Ми пропонуємо регулярний технічний огляд, тепловізійний контроль контактів, перевірку опору ізоляції та оперативний виїзд аварійної бригади у разі позаштатних ситуацій.",
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
          "Проєктуємо та будуємо сонячні електростанції (СЕС) під власне споживання або під «Зелений тариф». Встановлення СЕС на дахах підприємств дозволяє зафіксувати вартість електроенергії на роки вперед та суттєво знизити собівартість вашої продукції. Робимо повний розрахунок окупності перед стартом.",
        img: "/images/solar-panel-img.jpg",
      },
      {
        id: "s6",
        num: "06",
        title: "Системи зберігання енергії",
        description:
          "Встановлення промислових та домашніх акумуляторних систем (BESS).",
        fullText:
          "Накопичувачі енергії (BESS) — це ваш захист від блекаутів. Система заряджається вночі (за дешевим тарифом) або від сонячних панелей вдень, а віддає енергію в пікові години, коли мережа нестабільна або тариф найдорожчий. Забезпечує миттєве і безшовне перемикання.",
        img: "/images/backup-power-img.jpg",
      },
      {
        id: "s7",
        num: "07",
        title: "Системи резервного живлення",
        description:
          "Забезпечення безперебійної роботи за допомогою ДБЖ та генераторів.",
        fullText:
          "Комплексні системи для критичної інфраструктури: серверних, лікарень, виробничих ліній. Синхронізуємо роботу дизельних/бензинових генераторів із потужними джерелами безперебійного живлення (ДБЖ), щоб ваш бізнес не зупинявся ні на секунду під час відключень світла.",
        img: "/images/backup-power-img.jpg",
      },
    ],
  },
];

export default function ServicesGrid() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [isClosing, setIsClosing] = useState(false); // 🔥 Контроль закриття
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef(null);
  const gridContentRef = useRef(null);
  const modalCardRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Блокування глобального скролу
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedService]);

  // Анімація появи секції
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Анімація табів
  useEffect(() => {
    if (!gridContentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridContentRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all",
        },
      );
    }, gridContentRef);
    return () => ctx.revert();
  }, [activeTab]);

  // Відкриття модалки
  const openModal = (service) => {
    setIsClosing(false);
    setSelectedService(service);
  };

  // Правильне закриття модалки
  const closeModal = () => {
    if (isClosing) return;
    setIsClosing(true); // Запускає CSS-транзицію зникнення фону

    if (modalCardRef.current) {
      // Анімуємо тільки саму білу картку через GSAP
      gsap.to(modalCardRef.current, {
        y: 30,
        opacity: 0,
        scale: 0.98,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setSelectedService(null);
          setIsClosing(false);
        },
      });
    } else {
      setSelectedService(null);
      setIsClosing(false);
    }
  };

  // Анімація появи білої картки
  useEffect(() => {
    if (selectedService && !isClosing && modalCardRef.current) {
      gsap.fromTo(
        modalCardRef.current,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          clearProps: "transform",
        },
      );
    }
  }, [selectedService, isClosing]);

  return (
    <>
      <section className={styles.gridSection} ref={sectionRef}>
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
          /* 🔥 Головний оверлей. Клас .visible керує блюром через чистий CSS 🔥 */
          <div
            className={`${styles.modalOverlay} ${!isClosing ? styles.visible : ""}`}
            onClick={closeModal}
            data-lenis-prevent="true"
          >
            <div
              className={styles.modalContent}
              ref={modalCardRef}
              onClick={(e) => e.stopPropagation()} // Блокуємо клік по самій картці
            >
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
                <a
                  href="#contact-cta"
                  className={styles.ctaButton}
                  onClick={(e) => {
                    e.preventDefault();
                    closeModal();
                    setTimeout(() => {
                      document
                        .querySelector("#contact-cta")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 400);
                  }}
                >
                  Отримати консультацію
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
