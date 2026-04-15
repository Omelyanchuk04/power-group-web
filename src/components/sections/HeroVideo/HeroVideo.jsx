"use client";

import { useRef, useEffect } from "react";
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
  const videoRef = useRef(null);

  const frameCount = 152;
  const imagesRef = useRef([]);
  const renderMetrics = useRef({ width: 0, height: 0, x: 0, y: 0 });

  useEffect(() => {
    // Логери можна залишити або прибрати, коли все буде ідеально
    console.log("🟢 [INIT] HeroVideo змонтовано.");
  }, []);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d", {
        alpha: false,
        desynchronized: true,
      });
      const animationState = { frame: 0 };

      const calculateMetrics = () => {
        const img = imagesRef.current[0];
        if (!img || !canvas) return;
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
        const targetFrame = Math.max(
          0,
          Math.min(frameCount - 1, Math.floor(animationState.frame)),
        );
        let img = imagesRef.current[targetFrame];

        // 🔥 ФІКС 1: Розумний фолбек. Шукаємо найближчий завантажений кадр,
        // якщо цільовий ще не готовий або вивантажений з пам'яті.
        if (!img || !img.complete || img.naturalWidth === 0) {
          for (let i = targetFrame; i >= 0; i--) {
            if (
              imagesRef.current[i] &&
              imagesRef.current[i].complete &&
              imagesRef.current[i].naturalWidth > 0
            ) {
              img = imagesRef.current[i];
              break;
            }
          }
        }

        // Якщо кадру взагалі немає, просто перериваємось, але НЕ стираємо Canvas
        if (
          !img ||
          !img.complete ||
          renderMetrics.current.width === 0 ||
          !context ||
          !canvas
        )
          return;

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
        return new Promise((resolve) => {
          const img = new Image();
          // Прибрали img.decoding = "async", щоб перший кадр був миттєвим
          img.fetchPriority = "high";
          img.onload = () => {
            imagesRef.current[0] = img;
            resolve(img);
          };
          img.onerror = resolve;
          img.src = `/frames/frame-001.jpg`;
        });
      };

      const preloadOtherFrames = async () => {
        // 🔥 ФІКС 2: Збільшили розмір пачки, бо файли тепер маленькі (6 МБ сумарно)
        const batchSize = 10;
        for (let i = 1; i < frameCount; i += batchSize) {
          const batch = [];
          for (let j = 0; j < batchSize && i + j < frameCount; j++) {
            const index = i + j;
            batch.push(
              new Promise((resolve) => {
                const img = new Image();
                // 🔥 ФІКС 2: Прибрали img.decoding = "async"
                // Тепер браузер не буде відкладати розпаковку картинки
                img.fetchPriority = "low";
                img.onload = resolve;
                img.onerror = resolve; // Продовжуємо навіть якщо 1 файл помилковий
                img.src = `/frames/frame-${(index + 1).toString().padStart(3, "0")}.jpg`;
                imagesRef.current[index] = img;
              }),
            );
          }
          await Promise.all(batch);
        }
      };

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
        const contentButtonWrapper = contentRef.current.querySelector(
          `.${styles.animButtonWrapper}`,
        );

        const tlStart = gsap.timeline({ delay: 0.2 });
        tlStart
          .fromTo(
            icon,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            0,
          )
          .fromTo(
            text,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            0.1,
          )
          .fromTo(
            line,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
            0.4,
          )
          .fromTo(
            slogan,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            0.6,
          )
          .to(
            [icon, text, line, slogan],
            {
              y: -20,
              opacity: 0,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.in",
            },
            "+=0.3",
          )
          .fromTo(
            contentTitle,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "-=0.1",
          )
          .fromTo(
            contentSubtitle,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "-=0.4",
          )
          .fromTo(
            contentButtonWrapper,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            "-=0.4",
          );
      }

      // --- СПІЛЬНА ФУНКЦІЯ ДЛЯ СЕКВЕНЦІЇ ---
      const initSequence = (scrollEnd) => {
        preloadFirstFrame().then(() => {
          calculateMetrics();
          render();
          // Запускаємо завантаження інших кадрів після першого
          preloadOtherFrames();
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: scrollEnd,
            scrub: 0.5, // 0.5 робить скрол плавнішим, якщо він здається різким - зміни на 1 або 1.5
            pin: true,
            pinSpacing: false, // Ефект НАЇЗДУ другої секції
          },
        });

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

        if (contentRef.current) {
          const contentCards =
            contentRef.current.querySelectorAll(".animCardWrapper");
          tl.fromTo(
            contentCards,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.15,
              ease: "power3.out",
            },
            0.1,
          );
          tl.to(contentRef.current, { y: -50, opacity: 0, duration: 0.3 }, 1.7);
        }

        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 0.8, duration: 1, ease: "none" },
          2,
        );

        return tl;
      };

      let mm = gsap.matchMedia();

      // 1. ДЕСКТОП
      mm.add("(min-width: 1025px)", () => {
        initSequence("+=300%");

        const handleResize = () => {
          calculateMetrics();
          render();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      });

      // 2. МОБАЙЛ
      mm.add("(max-width: 1024px)", () => {
        gsap.set(heroRef.current, { clearProps: "all" });

        initSequence("+=200%");

        if (videoRef.current) {
          videoRef.current.pause();
        }

        const handleResize = () => {
          calculateMetrics();
          render();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      });
    },
    { scope: heroRef },
  );

  return (
    <div className={styles.heroSection} ref={heroRef}>
      <div className={styles.pinArea}>
        <canvas ref={canvasRef} className={styles.canvas} />

        <video
          ref={videoRef}
          className={styles.mobileVideo}
          src="/hero-mobile.mp4"
          poster="/frames/frame-001.jpg"
          loop
          muted
          playsInline
        />
        <div ref={overlayRef} className={styles.canvasOverlay} />
        <HeroLogo ref={logoRef} />
        <HeroContent ref={contentRef} />
      </div>
      <div className={styles.delaySpacer} />
    </div>
  );
}
