"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./ProductImageGallery.module.scss";

const ChevronLeft = () => (
  <svg
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
const ChevronRight = () => (
  <svg
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
const Maximize = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
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
  }, [isFullscreen]);

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
      <div className={`${wrapperClass} ${styles.galleryWrapper}`}>
        {/* Блок самої картинки */}
        <div className={styles.imageBox}>
          <img
            src={images[currentIndex]}
            alt={`${altText} - фото ${currentIndex + 1}`}
            className={styles.mainImg}
          />
          <button
            className={styles.fullscreenBtn}
            onClick={() => setIsFullscreen(true)}
            title="На весь екран"
          >
            <Maximize />
          </button>
        </div>

        {/* 🔥 НОВИЙ БЛОК КНОПОК У СТИЛІ APPLE 🔥 */}
        {hasMultiple && (
          <div className={styles.controlsRow}>
            <button className={styles.navBtn} onClick={prevImage}>
              <ChevronLeft />
            </button>

            <div className={styles.dotsContainer}>
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === currentIndex ? styles.activeDot : ""}`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>

            <button className={styles.navBtn} onClick={nextImage}>
              <ChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Повноекранний режим */}
      {mounted &&
        isFullscreen &&
        createPortal(
          <div
            className={styles.fullscreenOverlay}
            onClick={() => setIsFullscreen(false)}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setIsFullscreen(false)}
            >
              <Close />
            </button>
            <div
              className={styles.fsContent}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentIndex]}
                alt={altText}
                className={styles.fsImage}
              />
              {hasMultiple && (
                <>
                  <button
                    className={`${styles.fsNavBtn} ${styles.fsPrevBtn}`}
                    onClick={prevImage}
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    className={`${styles.fsNavBtn} ${styles.fsNextBtn}`}
                    onClick={nextImage}
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
