"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import HeroLogo from "./HeroLogo";
import HeroContent from "./HeroContent";
import HeroCanvas from "./HeroCanvas";
import styles from "./HeroVideo.module.scss";

import { useEntranceAnimation } from "./hooks/useEntranceAnimation";
import { useCanvasSequence } from "./hooks/useCanvasSequence";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function HeroVideo() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Створюємо всі необхідні refs
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);

  // Блокування скролу під час завантаження
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  // 2. Запускаємо логіку через кастомні хуки
  useEntranceAnimation({ heroRef, logoRef, contentRef });
  useCanvasSequence({
    heroRef,
    canvasRef,
    overlayRef,
    contentRef,
    onProgress: setProgress,
    onComplete: () => setIsLoaded(true),
  });

  // 3. Рендеримо чисту структуру
  // 3. Рендеримо чисту структуру
  // 3. Рендеримо чисту структуру
  return (
    <>
      {/* Динамічний прелоадер: Енергетичний кабель */}
      <div className={`${styles.preloader} ${isLoaded ? styles.loaded : ""}`}>
        <div className={styles.energyCore}>
          <svg className={styles.energySvg} viewBox="0 0 100 100">
            <defs>
              <linearGradient
                id="electricGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00e5ff" />
                <stop offset="100%" stopColor="#0055ff" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Базовий темний кабель */}
            <circle cx="50" cy="50" r="45" className={styles.wireTrack} />

            {/* Кільце загального прогресу (заповнюється разом з відсотками) */}
            <circle
              cx="50"
              cy="50"
              r="45"
              className={styles.progressRing}
              style={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
            />

            {/* Іскра / струм (гіпнотично крутиться по колу) */}
            <circle
              cx="50"
              cy="50"
              r="45"
              className={styles.energySpark}
              filter="url(#glow)"
            />
          </svg>

          {/* Контент у центрі */}
          <div className={styles.progressValue}>
            <svg
              className={styles.boltIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <div className={styles.progressTextWrapper}>
              <span className={styles.progressNumber}>{progress}</span>
              <span className={styles.progressPercent}>%</span>
            </div>
          </div>
        </div>
        <div className={styles.loadingText}>Подача напруги...</div>
      </div>

      <div className={styles.heroSection} ref={heroRef}>
        <HeroCanvas ref={canvasRef} overlayRef={overlayRef} />
        <HeroLogo ref={logoRef} />
        <HeroContent ref={contentRef} />
      </div>

      <div className={styles.delaySpacer} />
    </>
  );
}
