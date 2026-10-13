"use client";

import { forwardRef } from "react";
import Image from "next/image";
import styles from "./HeroVideo.module.scss";

const HeroCanvas = forwardRef(({ overlayRef }, canvasRef) => {
  return (
    <>
      <Image
        src="/hero-mobile.jpg"
        alt="Сонячні станції та електромонтажні роботи ВІН ПАУЕР ГРУП"
        fill
        priority
        unoptimized /* 🔥 ДОДАНО: Повністю вимикає стиснення і ресайз від Next.js */
        className={styles.mobileHeroImage}
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
