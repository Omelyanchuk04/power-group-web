"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroLogo from "./HeroLogo";
import HeroContent from "./HeroContent";
import styles from "./HeroVideo.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HeroVideo() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

  const frameCount = 158;
  const imagesRef = useRef([]);
  const renderMetrics = useRef({ width: 0, height: 0, x: 0, y: 0 });

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
      });
      const animationState = { frame: 0 };

      const calculateMetrics = () => {
        const img = imagesRef.current[0];
        if (!img) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;

        if (canvasAspect > imgAspect) {
          renderMetrics.current.width = canvas.width;
          renderMetrics.current.height = canvas.width / imgAspect;
          renderMetrics.current.x = 0;
          renderMetrics.current.y =
            (canvas.height - renderMetrics.current.height) / 2;
        } else {
          renderMetrics.current.width = canvas.height * imgAspect;
          renderMetrics.current.height = canvas.height;
          renderMetrics.current.x =
            (canvas.width - renderMetrics.current.width) / 2;
          renderMetrics.current.y = 0;
        }
      };

      const render = () => {
        const safeFrameIndex = Math.max(
          0,
          Math.min(frameCount - 1, Math.floor(animationState.frame)),
        );
        const img = imagesRef.current[safeFrameIndex];

        if (!img || !img.complete || renderMetrics.current.width === 0) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          img,
          renderMetrics.current.x,
          renderMetrics.current.y,
          renderMetrics.current.width,
          renderMetrics.current.height,
        );
      };

      const preloadFirstFrame = () => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            imagesRef.current[0] = img;
            resolve(img);
          };
          img.onerror = reject;
          img.src = `/frames/frame-001.jpg`;
        });
      };

      const preloadOtherFrames = () => {
        for (let i = 1; i < frameCount; i++) {
          const img = new Image();
          img.decoding = "async";
          img.src = `/frames/frame-${(i + 1).toString().padStart(3, "0")}.jpg`;
          imagesRef.current.push(img);
        }
      };

      preloadFirstFrame()
        .then(() => {
          calculateMetrics();
          render();
          preloadOtherFrames();
        })
        .catch(console.error);

      let resizeTimer;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          calculateMetrics();
          render();
        }, 150);
      };

      window.addEventListener("resize", handleResize);

      // --- GSAP АНІМАЦІЇ ПОЯВИ ---
      if (logoRef.current && contentRef.current) {
        const icon = logoRef.current.querySelector(`.${styles.animIcon}`);
        const text = logoRef.current.querySelector(`.${styles.animText}`);
        const line = logoRef.current.querySelector(`.${styles.animLine}`);
        const slogan = logoRef.current.querySelector(`.${styles.animSlogan}`);

        const contentTitle = contentRef.current.querySelector(
          `.${styles.animTitle}`,
        );
        const contentSubtitle = contentRef.current.querySelector(
          `.${styles.animSubtitle}`,
        );
        const contentCards =
          contentRef.current.querySelectorAll(`.animCardWrapper`);
        const contentButtonWrapper = contentRef.current.querySelector(
          `.${styles.animButtonWrapper}`,
        );

        const tlStart = gsap.timeline({ delay: 0.2 });

        // Фаза 1: Поява Лого
        tlStart
          .fromTo(
            icon,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              force3D: true,
            },
            0,
          )
          .fromTo(
            text,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              force3D: true,
            },
            0.1,
          )
          .fromTo(
            line,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              force3D: true,
            },
            0.4,
          )
          .fromTo(
            slogan,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              force3D: true,
            },
            0.6,
          );

        // Фаза 2: Зникнення Лого
        tlStart.to(
          [icon, text, line, slogan],
          {
            y: -20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in",
            force3D: true,
          },
          "+=0.3",
        );

        // Фаза 3: Поява Контенту
        tlStart
          .fromTo(
            contentTitle,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              force3D: true,
            },
            "-=0.1",
          )
          .fromTo(
            contentSubtitle,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              force3D: true,
            },
            "-=0.4",
          )
          .fromTo(
            contentCards,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.out",
              force3D: true,
            },
            "-=0.4",
          )
          .fromTo(
            contentButtonWrapper,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
              force3D: true,
            },
            "-=0.4",
          );
      }

      // ==========================================
      // 🔥 ЛОГІКА СКРОЛУ (БЕЗ ДОВГОГО ОЧІКУВАННЯ)
      // ==========================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=300%", // ЗАГАЛЬНИЙ шлях фіксації: 3 екрани
          scrub: 0.5,
          pin: true,
          pinSpacing: false, // Дозволяємо About наїхати
        },
      });

      // 1. ВІДЕО: Грає тільки першу третину скролу (0 -> 0.5)
      tl.to(
        animationState,
        {
          frame: frameCount - 1,
          ease: "none",
          duration: 2,
          onUpdate: render,
        },
        0,
      );

      // 2. ТЕКСТ: Ховається рівно під кінець відео (час 1.7 -> 2.0)
      if (contentRef.current) {
        tl.to(contentRef.current, { y: -50, opacity: 0, duration: 0.3 }, 1.7);
      }

      // 3. ЗАТЕМНЕННЯ І НАЇЗД: Стартує РІВНО тоді, коли відео зупинилось (час 2 -> 3)
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.8, duration: 1, ease: "none" },
        2, // Починається чітко на відмітці '2'
      );

      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: heroRef },
  );

  return (
    // ❌ ПРИБРАНО delaySpacer знизу, він тільки все ламав
    <div className={styles.heroSection} ref={heroRef}>
      <div className={styles.pinArea}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div ref={overlayRef} className={styles.canvasOverlay} />
        <HeroLogo ref={logoRef} />
        <HeroContent ref={contentRef} />
      </div>
    </div>
  );
}
