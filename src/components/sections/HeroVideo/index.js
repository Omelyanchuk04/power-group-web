"use client";

import { useRef } from "react";
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
  // 1. Створюємо всі необхідні refs
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);

  // 2. Запускаємо логіку через кастомні хуки
  useEntranceAnimation({ heroRef, logoRef, contentRef });
  useCanvasSequence({ heroRef, canvasRef, overlayRef, contentRef });

  // 3. Рендеримо чисту структуру
  return (
    <>
      <div className={styles.heroSection} ref={heroRef}>
        <HeroCanvas ref={canvasRef} overlayRef={overlayRef} />
        <HeroLogo ref={logoRef} />
        <HeroContent ref={contentRef} />
      </div>

      <div className={styles.delaySpacer} />
    </>
  );
}
