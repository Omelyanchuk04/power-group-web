"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image"; // 🔥 ДОДАНО: Next.js Image
import styles from "./ProductImageGallery.module.scss";

// 🔥 ДОДАНО: aria-hidden="true" та focusable="false" для всіх іконок
const ChevronLeft = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);
const ChevronRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);
const Maximize = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
  </svg>
);
const Close = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function ProductImageGallery({ images, altText, wrapperClass }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isFullscreen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, images.length]); // Додано images.length в залежності

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const hasMultiple = images.length > 1;

  return (
    <>
      {/* 🔥 ДОДАНО: Семантика каруселі */}
      <div
        className={`${wrapperClass} ${styles.galleryWrapper}`}
        aria-roledescription="carousel"
        aria-label="Галерея зображень товару"
      >
        {/* 🔥 ДОДАНО: aria-live="polite", щоб боти бачили зміну фото */}
        <div
          className={styles.imageBox}
          aria-live="polite"
          style={{ position: "relative", minHeight: "300px" }} // Фікс для fill
        >
          {/* 🔥 ЗМІНЕНО: <img> на <Image> з priority */}
          <Image
            src={images[currentIndex]}
            alt={`${altText} - фото ${currentIndex + 1} з ${images.length}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "contain" }}
            className={styles.mainImg}
            priority // Гарантує швидке завантаження для LCP
          />
          <button
            className={styles.fullscreenBtn}
            onClick={() => setIsFullscreen(true)}
            aria-label="Відкрити зображення на весь екран"
            title="На весь екран"
          >
            <Maximize />
          </button>
        </div>

        {hasMultiple && (
          <div className={styles.controlsRow}>
            <button
              className={styles.navBtn}
              onClick={prevImage}
              aria-label="Попереднє зображення"
            >
              <ChevronLeft />
            </button>

            <div className={styles.dotsContainer} role="tablist">
              {images.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === currentIndex}
                  aria-label={`Перейти до фотографії ${i + 1}`}
                  className={`${styles.dot} ${i === currentIndex ? styles.activeDot : ""}`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>

            <button
              className={styles.navBtn}
              onClick={nextImage}
              aria-label="Наступне зображення"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>

      {mounted &&
        isFullscreen &&
        createPortal(
          <div
            className={styles.fullscreenOverlay}
            onClick={() => setIsFullscreen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Повноекранний перегляд зображення"
          >
            <button
              className={styles.closeBtn}
              onClick={() => setIsFullscreen(false)}
              aria-label="Закрити повноекранний режим"
            >
              <Close />
            </button>
            <div
              className={styles.fsContent}
              onClick={(e) => e.stopPropagation()}
              aria-live="polite"
            >
              {/* У повноекранному режимі можна залишити звичайний img для простоти, або використати Image. Залишимо <img>, щоб не створювати конфліктів із зумом. */}
              <img
                src={images[currentIndex]}
                alt={`${altText} - фото ${currentIndex + 1}`}
                className={styles.fsImage}
              />
              {hasMultiple && (
                <>
                  <button
                    className={`${styles.fsNavBtn} ${styles.fsPrevBtn}`}
                    onClick={prevImage}
                    aria-label="Попереднє зображення"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    className={`${styles.fsNavBtn} ${styles.fsNextBtn}`}
                    onClick={nextImage}
                    aria-label="Наступне зображення"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
