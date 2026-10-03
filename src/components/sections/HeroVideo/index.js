"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom"; // ВАЖЛИВО: Імпортуємо Portal
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { LoadingIcon } from "@/components/ui/loader";

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
  const [isMounted, setIsMounted] = useState(false); // Стан для Portal
  const [rawProgress, setRawProgress] = useState(0);
  const [fakeProgress, setFakeProgress] = useState(0);

  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);

  // Ініціалізація для безпечного рендеру в body
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const tween = gsap.to(
      { val: 0 },
      {
        val: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: function () {
          setFakeProgress(this.targets()[0].val);
        },
      },
    );
    return () => tween.kill();
  }, []);

  const displayProgress = Math.round(Math.min(rawProgress, fakeProgress));

  useEffect(() => {
    if (displayProgress >= 100 && isCanvasReady) {
      const hideTimeout = setTimeout(() => setIsLoaded(true), 300);
      return () => clearTimeout(hideTimeout);
    }
  }, [displayProgress, isCanvasReady]);

  // ЖОРСТКЕ БЛОКУВАННЯ СКРОЛУ
  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const preventKeyScroll = (e) => {
      const keys = ["Space", "ArrowUp", "ArrowDown", "PageUp", "PageDown"];
      if (keys.includes(e.code)) {
        e.preventDefault();
      }
    };

    if (!isLoaded) {
      document.body.style.touchAction = "none";
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventKeyScroll, { passive: false });
      window.scrollTo(0, 0);
    } else {
      document.body.style.touchAction = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }

    return () => {
      document.body.style.touchAction = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);
    };
  }, [isLoaded]);

  useEntranceAnimation({ heroRef, logoRef, contentRef, isLoaded });

  useCanvasSequence({
    heroRef,
    canvasRef,
    overlayRef,
    contentRef,
    onProgress: setRawProgress,
    onComplete: () => {
      setRawProgress(100);
      setIsCanvasReady(true);
    },
  });

  // Сам лоадер
  const preloaderComponent = (
    <div className={`${styles.preloader} ${isLoaded ? styles.loaded : ""}`}>
      <div className={styles.loaderWrapper}>
        <LoadingIcon progress={displayProgress} />
      </div>
    </div>
  );

  return (
    <>
      {/* Рендеримо лоадер у <body> через Portal, щоб Chrome його не ламав */}
      {isMounted && createPortal(preloaderComponent, document.body)}

      <div className={styles.heroSection} ref={heroRef}>
        <HeroCanvas ref={canvasRef} overlayRef={overlayRef} />
        <HeroLogo ref={logoRef} />
        <HeroContent ref={contentRef} />
      </div>

      <div className={styles.delaySpacer} />
    </>
  );
}
