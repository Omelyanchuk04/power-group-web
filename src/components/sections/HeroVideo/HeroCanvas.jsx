"use client";

import { forwardRef } from "react";
import Image from "next/image";
import styles from "./HeroVideo.module.scss";

const HeroCanvas = forwardRef(({ overlayRef }, canvasRef) => {
  return (
    <>
      {/* 🔥 ЗМІНЕНО: Картинка для мобільних пристроїв (шлях відносно public) */}
      <Image
        src="/hero-mobile.jpg"
        alt="Сонячні станції та електромонтажні роботи ВІН ПАУЕР ГРУП"
        fill
        priority // Вказує браузеру качати це найпершим!
        sizes="100vw"
        className={styles.mobileHeroImage} // 🔥 ДОДАНО КЛАС
        style={{
          objectFit: "cover",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

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
