"use client";

import { useRef, useState, useEffect } from "react";
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
  const [rawProgress, setRawProgress] = useState(0);
  const [fakeProgress, setFakeProgress] = useState(0);

  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Додаємо стан для пропуску лоадера
  const [skipLoader, setSkipLoader] = useState(false);

  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);

  // 1. ПЕРЕВІРКА СЕСІЇ ПРИ ЗАВАНТАЖЕННІ
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("heroVisited");

    if (hasVisited) {
      // Якщо вже були на сайті — миттєво пропускаємо лоадер
      setSkipLoader(true);
      setIsLoaded(true);
      setIsCanvasReady(true);
      setFakeProgress(100);
      setRawProgress(100);
    } else {
      // Якщо це перший захід — запускаємо таймер
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
    }
  }, []);

  const displayProgress = Math.round(Math.min(rawProgress, fakeProgress));

  // 2. ЛОГІКА ЗАВЕРШЕННЯ ЛОАДЕРА (для першого заходу)
  useEffect(() => {
    if (!skipLoader && displayProgress >= 100 && isCanvasReady) {
      const hideTimeout = setTimeout(() => {
        setIsLoaded(true);
        // Записуємо в sessionStorage, що лоадер пройдено
        sessionStorage.setItem("heroVisited", "true");
      }, 300);
      return () => clearTimeout(hideTimeout);
    }
  }, [displayProgress, isCanvasReady, skipLoader]);

  // 3. БЛОКУВАННЯ СКРОЛУ (Ігнорується, якщо лоадер пропущено)
  useEffect(() => {
    if (skipLoader) return; // Не блокуємо скрол взагалі, якщо це повторний захід

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
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventKeyScroll, { passive: false });

      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";

      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);

      setTimeout(() => ScrollTrigger.refresh(), 100);
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);
    };
  }, [isLoaded, skipLoader]);

  useEntranceAnimation({ heroRef, logoRef, contentRef, isLoaded });

  useCanvasSequence({
    heroRef,
    canvasRef,
    overlayRef,
    contentRef,
    onProgress: (p) => {
      if (!skipLoader) setRawProgress(p);
    },
    onComplete: () => {
      if (!skipLoader) {
        setRawProgress(100);
        setIsCanvasReady(true);
      }
    },
  });

  return (
    <>
      <div
        className={`${styles.preloader} ${isLoaded ? styles.loaded : ""}`}
        // Якщо лоадер пропущено, миттєво приховуємо його через inline-стиль,
        // щоб уникнути спалаху анімації зникнення
        style={skipLoader ? { display: "none" } : {}}
      >
        <div className={styles.loaderWrapper}>
          <LoadingIcon progress={displayProgress} />
        </div>
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
