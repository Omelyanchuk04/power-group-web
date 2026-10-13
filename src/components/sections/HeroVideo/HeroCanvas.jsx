"use client";

import { forwardRef } from "react";
import Image from "next/image";
import styles from "./HeroVideo.module.scss";

const HeroCanvas = forwardRef(({ overlayRef }, canvasRef) => {
  return (
    <>
      {/* 🔥 ДОДАНО: Статичне зображення для SEO (LCP) та моментального завантаження */}
      <Image
        src="/frames/frame-001.jpg" // Перевірте, чи правильний шлях до першого кадру
        alt="Сонячні станції та електромонтажні роботи ВІН ПАУЕР ГРУП"
        fill
        priority // Вказує браузеру качати це найпершим!
        sizes="100vw"
        style={{
          objectFit: "cover",
          zIndex: -1, // Ховаємо під canvas
          pointerEvents: "none",
        }}
      />

      {/* ДОДАНО: role та aria-label, щоб Canvas не був "сліпою зоною" для SEO */}
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        role="img"
        aria-label="3D секвенція сонячних панелей"
      />
      <div ref={overlayRef} className={styles.canvasOverlay} />
    </>
  );
});

HeroCanvas.displayName = "HeroCanvas";

export default HeroCanvas;
