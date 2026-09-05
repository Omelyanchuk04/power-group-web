"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import NextImage from "next/image";
import gsap from "gsap";
import { useModal } from "@/context/ModalContext";
import styles from "./ProjectsGrid.module.scss";

// --- SVG ІКОНКИ ---
const IconHouse = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconFactory = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4H2v16Z" />
    <path d="M17 18h1" />
    <path d="M12 18h1" />
    <path d="M7 18h1" />
  </svg>
);
const IconSolar = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M6.34 17.66l-1.41 1.41" />
    <path d="M19.07 4.93l-1.41 1.41" />
  </svg>
);
const IconBattery = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
    <line x1="22" y1="11" x2="22" y2="13" />
    <polyline points="6 11 8 13 12 9" />
  </svg>
);
const IconPlug = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22v-5" />
    <path d="M9 8V2" />
    <path d="M15 8V2" />
    <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
  </svg>
);
const IconAll = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);
const IconLightning = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);
const IconPin = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const IconChevronLeft = () => (
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
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);
const IconChevronRight = () => (
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
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);
// 🔥 НОВІ ІКОНКИ ДЛЯ FULLSCREEN 🔥
const IconExpand = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 3 21 3 21 9"></polyline>
    <polyline points="9 21 3 21 3 15"></polyline>
    <line x1="21" y1="3" x2="14" y2="10"></line>
    <line x1="3" y1="21" x2="10" y2="14"></line>
  </svg>
);
const IconX = () => (
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
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function ProjectsGrid({ initialProjects = [] }) {
  const { openModal: openContactModal } = useModal();

  const formatPower = (kw) => {
    if (!kw) return "0 кВт";
    if (kw >= 1000) {
      return (kw / 1000).toFixed(1).replace(/\.0$/, "") + " МВт";
    }
    return kw + " кВт";
  };

  const mappedProjects = initialProjects.map((p) => ({
    id: p._id,
    title: p.title,
    clientType: p.clientType,
    serviceType: p.serviceType,
    power: p.power,
    powerLabel: formatPower(p.power),
    location: p.client || "Локація не вказана",
    description: p.shortDescription || "Опис відсутній",
    image: p.mainImage,
    gallery: p.gallery || [],
  }));

  const [activeFilters, setActiveFilters] = useState({
    clientType: "all",
    serviceType: ["all"],
  });

  const MAX_POWER = 2000;
  const [powerLimit, setPowerLimit] = useState(MAX_POWER);
  const gridRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  const [selectedProject, setSelectedProject] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Слайдер в модалці
  const [currentSlide, setCurrentSlide] = useState(0);
  const galleryRef = useRef(null);

  // 🔥 Стан та ref для Fullscreen режиму
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenRef = useRef(null);

  const modalCardRef = useRef(null);
  const backdropRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedProject]);

  const openProjectModal = (project) => {
    setIsClosing(false);
    setSelectedProject(project);
    setCurrentSlide(0);
    setIsFullscreen(false);
  };

  const closeProjectModal = () => {
    if (isClosing) return;
    setIsClosing(true);
    setIsFullscreen(false);
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedProject(null);
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
    if (selectedProject && !isClosing && modalCardRef.current) {
      const tl = gsap.timeline();
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(modalCardRef.current, { y: 50, opacity: 0, scale: 0.92 });

      if (closeBtnRef.current) {
        gsap.set(closeBtnRef.current, { opacity: 0, scale: 0.8 });
      }

      tl.to(backdropRef.current, { opacity: 1, duration: 0.4 });
      tl.to(
        modalCardRef.current,
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" },
        "-=0.3",
      );
      if (closeBtnRef.current) {
        tl.to(
          closeBtnRef.current,
          { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" },
          "-=0.4",
        );
      }
    }
  }, [selectedProject, isClosing]);

  const filteredProjects = mappedProjects.filter((p) => {
    const matchClient =
      activeFilters.clientType === "all" ||
      activeFilters.clientType === p.clientType;
    const matchService =
      activeFilters.serviceType.includes("all") ||
      activeFilters.serviceType.includes(p.serviceType);
    const matchPower = p.power <= powerLimit;
    return matchClient && matchService && matchPower;
  });

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

  const animateGrid = (updateStateCallback) => {
    gsap.to(`.${styles.projectCard}`, {
      opacity: 0,
      scale: 0.96,
      y: 15,
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.in",
      onComplete: () => {
        updateStateCallback();
        setTimeout(() => {
          gsap.fromTo(
            `.${styles.projectCard}`,
            { opacity: 0, scale: 0.96, y: 15 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.04,
              ease: "power3.out",
              clearProps: "all",
            },
          );
        }, 10);
      },
    });
  };

  const handleFilterClick = (groupKey, filterId) => {
    animateGrid(() => {
      setCurrentPage(1);
      setActiveFilters((prev) => {
        if (groupKey === "clientType") {
          if (prev.clientType === filterId) return prev;
          return { ...prev, clientType: filterId };
        } else if (groupKey === "serviceType") {
          const currentGroup = [...prev.serviceType];
          if (filterId === "all") return { ...prev, serviceType: ["all"] };

          let newGroup;
          if (currentGroup.includes(filterId)) {
            newGroup = currentGroup.filter((id) => id !== filterId);
            if (newGroup.length === 0) newGroup = ["all"];
          } else {
            newGroup = currentGroup.filter((id) => id !== "all");
            newGroup.push(filterId);
          }
          return { ...prev, serviceType: newGroup };
        }
        return prev;
      });
    });
  };

  const resetFilters = () => {
    animateGrid(() => {
      setActiveFilters({ clientType: "all", serviceType: ["all"] });
      setPowerLimit(MAX_POWER);
      setCurrentPage(1);
    });
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber === currentPage) return;
    animateGrid(() => {
      setCurrentPage(pageNumber);
      if (gridRef.current) {
        const yOffset =
          gridRef.current.getBoundingClientRect().top + window.scrollY - 150;
        window.scrollTo({ top: yOffset, behavior: "smooth" });
      }
    });
  };

  const sliderFillPercentage = (powerLimit / MAX_POWER) * 100;

  const allModalImages = selectedProject
    ? [selectedProject.image, ...(selectedProject.gallery || [])]
    : [];

  const handleGalleryScroll = (e, isFullscreenMode = false) => {
    const ref = isFullscreenMode ? fullscreenRef : galleryRef;
    if (!ref.current) return;
    const scrollPosition = ref.current.scrollLeft;
    const slideWidth = ref.current.offsetWidth;
    const newIndex = Math.round(scrollPosition / slideWidth);
    if (newIndex !== currentSlide) {
      setCurrentSlide(newIndex);
    }
  };

  const scrollToSlide = (index, isFullscreenMode = false) => {
    const ref = isFullscreenMode ? fullscreenRef : galleryRef;
    if (!ref.current) return;
    const slideWidth = ref.current.offsetWidth;
    ref.current.scrollTo({
      left: index * slideWidth,
      behavior: "smooth",
    });
    setCurrentSlide(index);
  };

  // Відкриття фулскріну і фокус на поточному слайді
  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  // Синхронізація фулскріну зі звичайним слайдером при відкритті/закритті
  useEffect(() => {
    if (isFullscreen && fullscreenRef.current) {
      const slideWidth = fullscreenRef.current.offsetWidth;
      fullscreenRef.current.scrollLeft = currentSlide * slideWidth;
    }
  }, [isFullscreen]);

  const closeFullscreen = () => {
    setIsFullscreen(false);
    // Після закриття фулскріну, підтягуємо маленьку галерею до потрібного слайду
    setTimeout(() => {
      if (galleryRef.current) {
        const slideWidth = galleryRef.current.offsetWidth;
        galleryRef.current.scrollTo({
          left: currentSlide * slideWidth,
          behavior: "instant",
        });
      }
    }, 50);
  };

  return (
    <>
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <div className={styles.mainLayout}>
            <aside className={styles.sidebar}>
              <div className={styles.sidebarSticky}>
                <div className={styles.filterGroup}>
                  <h4 className={styles.groupTitle}>Тип об'єкта</h4>
                  <div className={styles.segmentedControl}>
                    <button
                      className={`${styles.segmentBtn} ${activeFilters.clientType === "all" ? styles.active : ""}`}
                      onClick={() => handleFilterClick("clientType", "all")}
                    >
                      Усі
                    </button>
                    <button
                      className={`${styles.segmentBtn} ${activeFilters.clientType === "b2c" ? styles.active : ""}`}
                      onClick={() => handleFilterClick("clientType", "b2c")}
                    >
                      <IconHouse /> Для
                      <br />
                      дому
                    </button>
                    <button
                      className={`${styles.segmentBtn} ${activeFilters.clientType === "b2b" ? styles.active : ""}`}
                      onClick={() => handleFilterClick("clientType", "b2b")}
                    >
                      <IconFactory /> Для
                      <br />
                      бізнесу
                    </button>
                  </div>
                </div>

                <div className={styles.filterGroup}>
                  <h4 className={styles.groupTitle}>Послуги та рішення</h4>
                  <div className={styles.iconList}>
                    {[
                      { id: "all", label: "Усі рішення", icon: <IconAll /> },
                      {
                        id: "solar",
                        label: "Будівництво СЕС",
                        icon: <IconSolar />,
                      },
                      {
                        id: "backup",
                        label: "Резервне живлення",
                        icon: <IconBattery />,
                      },
                      {
                        id: "storage",
                        label: "Зберігання енергії",
                        icon: <IconBattery />,
                      },
                      {
                        id: "electro",
                        label: "Електромонтаж",
                        icon: <IconPlug />,
                      },
                    ].map((service) => (
                      <button
                        key={service.id}
                        className={`${styles.iconOptionBtn} ${activeFilters.serviceType.includes(service.id) ? styles.active : ""}`}
                        onClick={() =>
                          handleFilterClick("serviceType", service.id)
                        }
                      >
                        <span className={styles.iconWrapper}>
                          {service.icon}
                        </span>
                        {service.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.filterGroup}>
                  <div className={styles.sliderHeader}>
                    <h4 className={styles.groupTitle}>Потужність СЕС</h4>
                    <span className={styles.powerValue}>
                      {powerLimit === MAX_POWER
                        ? "Макс."
                        : `до ${powerLimit} кВт`}
                    </span>
                  </div>
                  <div className={styles.sliderWrapper}>
                    <input
                      type="range"
                      min="0"
                      max={MAX_POWER}
                      step="50"
                      value={powerLimit}
                      onChange={(e) => {
                        setPowerLimit(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className={styles.glassSlider}
                      style={{
                        background: `linear-gradient(to right, #0056b3 ${sliderFillPercentage}%, rgba(0,86,179,0.15) ${sliderFillPercentage}%)`,
                      }}
                    />
                    <div className={styles.sliderLabels}>
                      <span>0</span>
                      <span>2 МВт+</span>
                    </div>
                  </div>
                </div>

                <button
                  className={styles.sidebarResetBtn}
                  onClick={resetFilters}
                >
                  Скинути все
                </button>
              </div>
            </aside>

            <div className={styles.content}>
              {filteredProjects.length === 0 && (
                <div className={styles.noResults}>
                  <div className={styles.noResultsIcon}>🔍</div>
                  <h3>Немає таких проектів</h3>
                  <p>Змініть критерії пошуку або скиньте фільтри.</p>
                </div>
              )}

              <div className={styles.grid} ref={gridRef}>
                {currentProjects.map((project) => (
                  <div
                    key={project.id}
                    className={styles.projectCard}
                    onClick={() => openProjectModal(project)}
                  >
                    <div className={styles.imageWrapper}>
                      <NextImage
                        src={project.image}
                        alt={project.title}
                        fill
                        className={styles.img}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className={styles.overlay}></div>
                      <div className={styles.tags}>
                        <span className={styles.tagPower}>
                          {project.powerLabel}
                        </span>
                        <span className={styles.tagClient}>
                          {project.clientType === "b2c"
                            ? "Для дому"
                            : "Для бізнесу"}
                        </span>
                      </div>
                    </div>

                    <div className={styles.cardInfo}>
                      <div className={styles.cardText}>
                        <h4>{project.title}</h4>
                        <p className={styles.location}>
                          <IconPin />
                          {project.location}
                        </p>
                      </div>
                      <div className={styles.arrowBtn}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className={styles.pagination}>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i + 1}
                      className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.pageActive : ""}`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 ШИРОКА МОДАЛКА ЗІ СЛАЙДЕРОМ ТА FULLSCREEN 🔥 */}
      {mounted &&
        selectedProject &&
        createPortal(
          <>
            <div
              className={styles.backdropLayer}
              ref={backdropRef}
              onClick={closeProjectModal}
            ></div>
            <div
              className={styles.modalScrollWrapper}
              onClick={closeProjectModal}
              data-lenis-prevent="true"
            >
              <div
                className={styles.modalContent}
                ref={modalCardRef}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.absoluteCloseWrapper} ref={closeBtnRef}>
                  <button
                    className={styles.closeBtn}
                    onClick={closeProjectModal}
                  >
                    <IconX />
                  </button>
                </div>

                {/* ГАЛЕРЕЯ-СЛАЙДЕР В МОДАЛЦІ */}
                <div className={styles.galleryWrapper}>
                  <div
                    className={styles.modalGallery}
                    ref={galleryRef}
                    onScroll={(e) => handleGalleryScroll(e, false)}
                  >
                    {allModalImages.map((imgUrl, index) => (
                      <div key={index} className={styles.gallerySlide}>
                        <NextImage
                          src={imgUrl}
                          alt={`${selectedProject.title} - фото ${index + 1}`}
                          fill
                          className={styles.modalImg}
                          sizes="(max-width: 1000px) 100vw, 1000px"
                        />
                      </div>
                    ))}
                  </div>

                  {/* 🔥 Кнопка розгортання на весь екран 🔥 */}
                  <button
                    className={styles.expandBtn}
                    onClick={openFullscreen}
                    title="На весь екран"
                  >
                    <IconExpand />
                  </button>

                  {allModalImages.length > 1 && (
                    <>
                      <button
                        className={`${styles.sliderArrow} ${styles.arrowLeft} ${currentSlide === 0 ? styles.disabled : ""}`}
                        onClick={() => scrollToSlide(currentSlide - 1, false)}
                      >
                        <IconChevronLeft />
                      </button>
                      <button
                        className={`${styles.sliderArrow} ${styles.arrowRight} ${currentSlide === allModalImages.length - 1 ? styles.disabled : ""}`}
                        onClick={() => scrollToSlide(currentSlide + 1, false)}
                      >
                        <IconChevronRight />
                      </button>

                      <div className={styles.sliderDots}>
                        {allModalImages.map((_, idx) => (
                          <button
                            key={idx}
                            className={`${styles.dot} ${currentSlide === idx ? styles.activeDot : ""}`}
                            onClick={() => scrollToSlide(idx, false)}
                            aria-label={`Слайд ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className={styles.modalBodyContainer}>
                  <h2 className={styles.modalTitle}>{selectedProject.title}</h2>

                  <div className={styles.statsHorizontalRow}>
                    <div className={styles.statHItem}>
                      <div className={styles.iconBox}>
                        <IconLightning />
                      </div>
                      <div className={styles.statHText}>
                        <span className={styles.statHLabel}>Потужність</span>
                        <span
                          className={`${styles.statHValue} ${styles.highlight}`}
                        >
                          {selectedProject.powerLabel}
                        </span>
                      </div>
                    </div>

                    <div className={styles.statDivider}></div>

                    <div className={styles.statHItem}>
                      <div className={styles.iconBox}>
                        <IconPin />
                      </div>
                      <div className={styles.statHText}>
                        <span className={styles.statHLabel}>Локація</span>
                        <span className={styles.statHValue}>
                          {selectedProject.location}
                        </span>
                      </div>
                    </div>

                    <div className={styles.statDivider}></div>

                    <div className={styles.statHItem}>
                      <div className={styles.iconBox}>
                        {selectedProject.clientType === "b2c" ? (
                          <IconHouse />
                        ) : (
                          <IconFactory />
                        )}
                      </div>
                      <div className={styles.statHText}>
                        <span className={styles.statHLabel}>Призначення</span>
                        <span className={styles.statHValue}>
                          {selectedProject.clientType === "b2c"
                            ? "Для дому"
                            : "Для бізнесу"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.modalDescBlock}>
                    <h3>Про проєкт</h3>
                    <p>{selectedProject.description}</p>
                  </div>

                  <div className={styles.modalFooter}>
                    <button
                      className={styles.ctaButton}
                      onClick={() => {
                        openContactModal();
                        setSelectedProject(null);
                      }}
                    >
                      Отримати консультацію
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 🔥 ПОВНОЕКРАННИЙ РЕЖИМ (LIGHTBOX) 🔥 */}
            {isFullscreen && (
              <div
                className={styles.fullscreenOverlay}
                onClick={closeFullscreen}
              >
                <div className={styles.fullscreenHeader}>
                  <div className={styles.imageCounter}>
                    {currentSlide + 1} / {allModalImages.length}
                  </div>
                  <button
                    className={styles.fullscreenClose}
                    onClick={closeFullscreen}
                  >
                    <IconX />
                  </button>
                </div>

                <div
                  className={styles.fullscreenGallery}
                  ref={fullscreenRef}
                  onScroll={(e) => handleGalleryScroll(e, true)}
                  onClick={(e) =>
                    e.stopPropagation()
                  } /* Щоб не закривалось при кліку на фото */
                >
                  {allModalImages.map((imgUrl, index) => (
                    <div key={index} className={styles.fullscreenSlide}>
                      <NextImage
                        src={imgUrl}
                        alt={`Fullscreen фото ${index + 1}`}
                        fill
                        className={styles.fullscreenImg}
                        sizes="100vw"
                        quality={100}
                      />
                    </div>
                  ))}
                </div>

                {allModalImages.length > 1 && (
                  <>
                    <button
                      className={`${styles.fullscreenArrow} ${styles.arrowLeft} ${currentSlide === 0 ? styles.disabled : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToSlide(currentSlide - 1, true);
                      }}
                    >
                      <IconChevronLeft />
                    </button>
                    <button
                      className={`${styles.fullscreenArrow} ${styles.arrowRight} ${currentSlide === allModalImages.length - 1 ? styles.disabled : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToSlide(currentSlide + 1, true);
                      }}
                    >
                      <IconChevronRight />
                    </button>
                  </>
                )}
              </div>
            )}
          </>,
          document.body,
        )}
    </>
  );
}
