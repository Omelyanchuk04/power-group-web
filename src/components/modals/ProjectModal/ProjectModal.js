"use client";

import React, { useState, useRef, useEffect } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { useModal } from "@/context/ModalContext";
import styles from "./ProjectModal.module.scss";

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

export default function ProjectModal({ project, onClose }) {
  const { openModal } = useModal();

  const [isClosing, setIsClosing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const modalCardRef = useRef(null);
  const backdropRef = useRef(null);
  const closeBtnRef = useRef(null);
  const galleryRef = useRef(null);
  const fullscreenRef = useRef(null);

  // Блокуємо скрол сторінки
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Анімація ПОЯВИ модалки
  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(modalCardRef.current, { y: 50, opacity: 0, scale: 0.95 });
    if (closeBtnRef.current)
      gsap.set(closeBtnRef.current, { opacity: 0, scale: 0.8 });

    tl.to(backdropRef.current, { opacity: 1, duration: 0.3 });
    tl.to(
      modalCardRef.current,
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "expo.out" },
      "-=0.2",
    );
    if (closeBtnRef.current)
      tl.to(
        closeBtnRef.current,
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" },
        "-=0.3",
      );
  }, []);

  // Функція ЗАКРИТТЯ з анімацією
  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setIsFullscreen(false);

    const tl = gsap.timeline({ onComplete: onClose });
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

  const allModalImages = project
    ? [project.image, ...(project.gallery || [])]
    : [];

  // Оновлення стану крапок під час гортання пальцем
  const handleGalleryScroll = (e, isFullscreenMode = false) => {
    const ref = isFullscreenMode ? fullscreenRef : galleryRef;
    if (!ref.current) return;

    // Обчислюємо поточний слайд на основі позиції скролу
    const newIndex = Math.round(
      ref.current.scrollLeft / ref.current.offsetWidth,
    );
    if (newIndex !== currentSlide) {
      setCurrentSlide(newIndex);
    }
  };

  // 🔥 НАДІЙНА ФУНКЦІЯ ПРОКРУТКИ КНОПКАМИ 🔥
  const scrollToSlide = (index, isFullscreenMode = false) => {
    const ref = isFullscreenMode ? fullscreenRef : galleryRef;
    if (!ref.current) return;

    // Використовуємо нативний скрол браузера, який ідеально працює зі scroll-snap
    ref.current.scrollTo({
      left: index * ref.current.offsetWidth,
      behavior: "smooth",
    });

    setCurrentSlide(index);
  };

  // Відкриття фулскріну
  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  // Синхронізація фулскріну з поточним слайдом при його відкритті
  useEffect(() => {
    if (isFullscreen && fullscreenRef.current) {
      // Використовуємо instant, щоб воно одразу відкрилося на потрібній картинці
      fullscreenRef.current.scrollTo({
        left: currentSlide * fullscreenRef.current.offsetWidth,
        behavior: "instant",
      });
    }
  }, [isFullscreen, currentSlide]);

  // Закриття фулскріну і синхронізація маленької галереї
  const closeFullscreen = () => {
    setIsFullscreen(false);
    setTimeout(() => {
      if (galleryRef.current) {
        galleryRef.current.scrollTo({
          left: currentSlide * galleryRef.current.offsetWidth,
          behavior: "instant",
        });
      }
    }, 50);
  };

  if (!project) return null;

  return (
    <>
      <div
        className={styles.backdropLayer}
        ref={backdropRef}
        onClick={handleClose}
      ></div>
      <div
        className={styles.modalScrollWrapper}
        onClick={handleClose}
        data-lenis-prevent="true"
      >
        <div
          className={styles.modalContent}
          ref={modalCardRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.absoluteCloseWrapper} ref={closeBtnRef}>
            <button className={styles.closeBtn} onClick={handleClose}>
              <IconX />
            </button>
          </div>

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
                    alt={`${project.title} - фото ${index + 1}`}
                    fill
                    className={styles.modalImg}
                    sizes="(max-width: 1000px) 100vw, 1000px"
                  />
                </div>
              ))}
            </div>
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
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToSlide(currentSlide - 1, false);
                  }}
                >
                  <IconChevronLeft />
                </button>
                <button
                  className={`${styles.sliderArrow} ${styles.arrowRight} ${currentSlide === allModalImages.length - 1 ? styles.disabled : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToSlide(currentSlide + 1, false);
                  }}
                >
                  <IconChevronRight />
                </button>
                <div className={styles.sliderDots}>
                  {allModalImages.map((_, idx) => (
                    <button
                      key={idx}
                      className={`${styles.dot} ${currentSlide === idx ? styles.activeDot : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        scrollToSlide(idx, false);
                      }}
                      aria-label={`Слайд ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className={styles.modalBodyContainer}>
            <h2 className={styles.modalTitle}>{project.title}</h2>

            <div className={styles.statsHorizontalRow}>
              <div className={styles.statHItem}>
                <div className={styles.iconBox}>
                  <IconLightning />
                </div>
                <div className={styles.statHText}>
                  <span className={styles.statHLabel}>Потужність</span>
                  <span className={`${styles.statHValue} ${styles.highlight}`}>
                    {project.powerLabel}
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
                  <span className={styles.statHValue}>{project.location}</span>
                </div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statHItem}>
                <div className={styles.iconBox}>
                  <IconCalendar />
                </div>
                <div className={styles.statHText}>
                  <span className={styles.statHLabel}>Реалізовано</span>
                  <span className={styles.statHValue}>{project.date}</span>
                </div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statHItem}>
                <div className={styles.iconBox}>
                  {project.clientType === "b2c" ? (
                    <IconHouse />
                  ) : (
                    <IconFactory />
                  )}
                </div>
                <div className={styles.statHText}>
                  <span className={styles.statHLabel}>Призначення</span>
                  <span className={styles.statHValue}>
                    {project.clientType === "b2c" ? "Для дому" : "Бізнес"}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.modalDescBlock}>
              <h3>Про проєкт</h3>
              <p>{project.description}</p>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.ctaButton}
                onClick={() => {
                  handleClose();
                  openModal("contact");
                }}
              >
                Отримати консультацію
              </button>
            </div>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div className={styles.fullscreenOverlay} onClick={closeFullscreen}>
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
            onClick={(e) => e.stopPropagation()}
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
                  e.preventDefault();
                  e.stopPropagation();
                  scrollToSlide(currentSlide - 1, true);
                }}
              >
                <IconChevronLeft />
              </button>
              <button
                className={`${styles.fullscreenArrow} ${styles.arrowRight} ${currentSlide === allModalImages.length - 1 ? styles.disabled : ""}`}
                onClick={(e) => {
                  e.preventDefault();
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
    </>
  );
}
