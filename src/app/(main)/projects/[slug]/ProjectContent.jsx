"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import GlobalBackground from "@/components/layout/GlobalBackground";
import styles from "./ProjectDetails.module.scss";

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
const IconBattery = () => (
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
    <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
    <line x1="22" y1="11" x2="22" y2="13"></line>
    <polyline points="6 11 8 13 12 9"></polyline>
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
const IconCalendar = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
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
const IconExpand = () => (
  <svg
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
const IconClose = () => (
  <svg
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

const SERVICE_MAP = {
  solar: "Будівництво СЕС",
  backup: "Резервне живлення",
  storage: "Зберігання енергії",
  electro: "Електромонтаж",
};

export default function ProjectContent({ project }) {
  // 🔥 МЕМОІЗАЦІЯ: тепер масив не перестворюється при кожному рендері 🔥
  const allImages = useMemo(() => {
    return [project.mainImage, ...(project.gallery || [])];
  }, [project.mainImage, project.gallery]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const [spacers, setSpacers] = useState({ left: "0px", right: "0px" });

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // 🔥 ОПТИМІЗОВАНИЙ РОЗРАХУНОК ВІДСТУПІВ 🔥
  const calculateSpacers = useCallback(() => {
    if (typeof window === "undefined" || !sliderRef.current) return;
    const slides = Array.from(
      sliderRef.current.querySelectorAll(`.${styles.slide}`),
    );

    if (slides.length > 0) {
      const gap = window.innerWidth <= 768 ? 16 : 24;
      const firstWidth = slides[0].offsetWidth || 300;
      const lastWidth = slides[slides.length - 1].offsetWidth || 300;

      setSpacers((prev) => {
        const newLeft = `calc(50vw - ${firstWidth / 2}px - ${gap}px)`;
        const newRight = `calc(50vw - ${lastWidth / 2}px - ${gap}px)`;

        // Запобігаємо нескінченному циклу (оновлюємо тільки якщо реально змінилось)
        if (prev.left === newLeft && prev.right === newRight) return prev;

        return { left: newLeft, right: newRight };
      });
    }
  }, []);

  useEffect(() => {
    calculateSpacers();
    window.addEventListener("resize", calculateSpacers);
    return () => window.removeEventListener("resize", calculateSpacers);
  }, [calculateSpacers, allImages.length]);

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const centerPos = container.scrollLeft + container.clientWidth / 2;

    let closestIdx = 0;
    let minDiff = Infinity;

    const slides = Array.from(container.children).filter((child) =>
      child.classList.contains(styles.slide),
    );

    slides.forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const diff = Math.abs(childCenter - centerPos);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    if (closestIdx !== currentSlide) setCurrentSlide(closestIdx);
  };

  const scrollToSlide = (index) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const slides = Array.from(container.children).filter((child) =>
      child.classList.contains(styles.slide),
    );
    const slide = slides[index];
    if (!slide) return;

    const scrollLeft =
      slide.offsetLeft - container.clientWidth / 2 + slide.clientWidth / 2;
    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  };

  useEffect(() => {
    if (allImages.length <= 1 || isLightboxOpen) return;
    const interval = setInterval(() => {
      const nextIndex =
        currentSlide === allImages.length - 1 ? 0 : currentSlide + 1;
      scrollToSlide(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, allImages.length, isLightboxOpen]);

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLightboxOpen]);

  const handlePrev = () => {
    const prevIndex =
      currentSlide === 0 ? allImages.length - 1 : currentSlide - 1;
    scrollToSlide(prevIndex);
  };

  const handleNext = () => {
    const nextIndex =
      currentSlide === allImages.length - 1 ? 0 : currentSlide + 1;
    scrollToSlide(nextIndex);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const lightboxPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const lightboxNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const d = new Date(project.date);
  const formattedDate = project.date
    ? d
        .toLocaleDateString("uk-UA", { month: "long", year: "numeric" })
        .replace(/^./, (str) => str.toUpperCase())
    : "Не вказано";

  let services = [];
  if (Array.isArray(project.serviceType)) services = project.serviceType;
  else if (typeof project.serviceType === "string")
    services = [project.serviceType];

  const serviceLabels = services.map((s) => SERVICE_MAP[s] || s).join(", ");
  const isComplex = services.length > 1;

  const powerLabel = project.power
    ? project.power >= 1000
      ? `${(project.power / 1000).toFixed(1).replace(/\.0$/, "")} МВт`
      : `${project.power} кВт`
    : null;
  const capacityLabel = project.capacity ? `${project.capacity} кВт·год` : null;

  return (
    <main className={styles.pageContainer}>
      {isLightboxOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className={styles.lightbox} onClick={closeLightbox}>
            <div className={styles.lightboxTopBar}>
              <div className={styles.lightboxCounter}>
                {lightboxIndex + 1} / {allImages.length}
              </div>
              <button className={styles.lightboxClose} onClick={closeLightbox}>
                <IconClose />
              </button>
            </div>

            <button
              className={`${styles.lightboxArrow} ${styles.lightboxLeft}`}
              onClick={lightboxPrev}
            >
              <IconChevronLeft />
            </button>

            <div className={styles.lightboxContent}>
              <img
                src={allImages[lightboxIndex]}
                alt="Повноекранне фото"
                className={styles.lightboxImageFull}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <button
              className={`${styles.lightboxArrow} ${styles.lightboxRight}`}
              onClick={lightboxNext}
            >
              <IconChevronRight />
            </button>
          </div>,
          document.body,
        )}

      <div className={styles.bgWrapper}>
        <div className={styles.bgFade}>
          <GlobalBackground />
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.topSection}>
          <Link href="/projects" className={styles.backLink}>
            <IconArrowLeft /> Повернутися до проєктів
          </Link>

          <div className={styles.headerBlock}>
            {serviceLabels && (
              <div className={styles.badgesWrapper}>
                {isComplex && (
                  <span className={styles.complexBadge}>
                    Комплексне рішення
                  </span>
                )}
                <span className={styles.servicesList}>{serviceLabels}</span>
              </div>
            )}
            <h1 className={styles.title}>{project.title}</h1>
          </div>
        </div>
      </div>

      <div className={styles.appleSliderSection}>
        <div
          className={styles.sliderTrack}
          ref={sliderRef}
          onScroll={handleScroll}
        >
          <div
            className={styles.sliderSpacer}
            style={{ flex: `0 0 ${spacers.left}` }}
          ></div>

          {allImages.map((imgUrl, index) => (
            <div
              key={index}
              className={`${styles.slide} ${currentSlide === index ? styles.activeSlide : ""}`}
              onClick={() => scrollToSlide(index)}
            >
              {/* 🔥 ОБРОБНИК ONLOAD ВИКЛИКАЄ РОЗРАХУНОК ЦЕНТРУВАННЯ 🔥 */}
              <img
                src={imgUrl}
                alt="Фото проєкту"
                className={styles.slideImage}
                draggable="false"
                onLoad={calculateSpacers}
              />
              <button
                className={styles.expandBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  openLightbox(index);
                }}
              >
                <IconExpand />
              </button>
            </div>
          ))}

          <div
            className={styles.sliderSpacer}
            style={{ flex: `0 0 ${spacers.right}` }}
          ></div>
        </div>

        {allImages.length > 1 && (
          <>
            <button
              className={`${styles.sliderArrow} ${styles.arrowLeft}`}
              onClick={handlePrev}
              aria-label="Попереднє фото"
            >
              <IconChevronLeft />
            </button>
            <button
              className={`${styles.sliderArrow} ${styles.arrowRight}`}
              onClick={handleNext}
              aria-label="Наступне фото"
            >
              <IconChevronRight />
            </button>

            <div className={styles.appleNavPill}>
              <div className={styles.dotsContainer}>
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.dot} ${currentSlide === idx ? styles.activeDot : ""}`}
                    onClick={() => scrollToSlide(idx)}
                    aria-label={`Слайд ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.statsHorizontalRow}>
          {powerLabel && (
            <>
              <div className={styles.statHItem}>
                <div className={styles.iconBox}>
                  <IconLightning />
                </div>
                <div className={styles.statHText}>
                  <span className={styles.statHLabel}>Потужність</span>
                  <span className={`${styles.statHValue} ${styles.highlight}`}>
                    {powerLabel}
                  </span>
                </div>
              </div>
              <div className={styles.statDivider}></div>
            </>
          )}

          {capacityLabel && (
            <>
              <div className={styles.statHItem}>
                <div className={styles.iconBox}>
                  <IconBattery />
                </div>
                <div className={styles.statHText}>
                  <span className={styles.statHLabel}>Ємність</span>
                  <span className={`${styles.statHValue} ${styles.highlight}`}>
                    {capacityLabel}
                  </span>
                </div>
              </div>
              <div className={styles.statDivider}></div>
            </>
          )}

          <div className={styles.statHItem}>
            <div className={styles.iconBox}>
              <IconPin />
            </div>
            <div className={styles.statHText}>
              <span className={styles.statHLabel}>Локація</span>
              <span className={styles.statHValue}>
                {project.client || "Не вказано"}
              </span>
            </div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statHItem}>
            <div className={styles.iconBox}>
              <IconCalendar />
            </div>
            <div className={styles.statHText}>
              <span className={styles.statHLabel}>Реалізовано</span>
              <span className={styles.statHValue}>{formattedDate}</span>
            </div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statHItem}>
            <div className={styles.iconBox}>
              {project.clientType === "b2c" ? <IconHouse /> : <IconFactory />}
            </div>
            <div className={styles.statHText}>
              <span className={styles.statHLabel}>Призначення</span>
              <span className={styles.statHValue}>
                {project.clientType === "b2c" ? "Для дому" : "Бізнес"}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.descriptionBlock}>
            <h2 className={styles.sectionTitle}>Про проєкт</h2>
            <p className={styles.descriptionText}>{project.shortDescription}</p>
          </div>

          {/* <div className={styles.ctaPill}>
            <div className={styles.ctaPillContent}>
              <div className={styles.ctaPillIcon}>
                <IconLightning />
              </div>
              <div className={styles.ctaPillText}>
                <span className={styles.ctaPillTitle}>
                  Цікавить схоже рішення?
                </span>
                <span className={styles.ctaPillSubtitle}>
                  Наші інженери підготують безкоштовний розрахунок.
                </span>
              </div>
            </div>
            <Link href="#contact" className={styles.ctaButton}>
              Отримати консультацію
            </Link>
          </div> */}
        </div>
      </div>
    </main>
  );
}
