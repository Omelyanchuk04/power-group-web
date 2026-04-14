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
  // Про всяк випадок жорстко вимикаємо будь-які нормалізації від попередніх спроб
  ScrollTrigger.normalizeScroll(false);
}

export default function HeroVideo() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const videoRef = useRef(null);

  const frameCount = 158;
  const imagesRef = useRef([]);
  const renderMetrics = useRef({ width: 0, height: 0, x: 0, y: 0 });

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
        const safeFrameIndex = Math.max(
          0,
          Math.min(frameCount - 1, Math.floor(animationState.frame)),
        );
        const img = imagesRef.current[safeFrameIndex];
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
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.decoding = "async";
          img.fetchPriority = "high";
          img.onload = () => {
            imagesRef.current[0] = img;
            resolve(img);
          };
          img.onerror = reject;
          img.src = `/frames/frame-001.jpg`;
        });
      };

      const preloadOtherFrames = async () => {
        const batchSize = 5;
        for (let i = 1; i < frameCount; i += batchSize) {
          const batch = [];
          for (let j = 0; j < batchSize && i + j < frameCount; j++) {
            const index = i + j;
            batch.push(
              new Promise((resolve) => {
                const img = new Image();
                img.decoding = "async";
                img.fetchPriority = "low";
                img.onload = resolve;
                img.onerror = resolve;
                img.src = `/frames/frame-${(index + 1).toString().padStart(3, "0")}.jpg`;
                imagesRef.current[index] = img;
              }),
            );
          }
          await Promise.all(batch);
        }
      };

      // --- АНІМАЦІЯ ПОЯВИ ТЕКСТУ ---
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
          )
          .to(
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
          )
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
      // 🔥 АБСОЛЮТНИЙ ЗАХИСТ ВІД GSAP НА МОБАЙЛІ
      // ==========================================
      let mm = gsap.matchMedia();

      mm.add(
        {
          // ДЕСКТОП: Тільки якщо ширина > 1024 І Є МИШКА
          isDesktop: "(min-width: 1025px) and (pointer: fine)",
          // МОБАЙЛ: Якщо ширина < 1024 АБО ЦЕ ТАЧ-СКРІН (pointer: coarse)
          isMobile: "(max-width: 1024px), (pointer: coarse)",
        },
        (context) => {
          let { isDesktop, isMobile } = context.conditions;

          if (isDesktop) {
            preloadFirstFrame()
              .then(() => {
                calculateMetrics();
                render();
                preloadOtherFrames();
              })
              .catch(console.error);
            window.addEventListener("resize", calculateMetrics);

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "+=300%",
                scrub: 0.5,
                pin: true,
                pinSpacing: false,
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
                  force3D: true,
                },
                0.1,
              );
              tl.to(
                contentRef.current,
                { y: -50, opacity: 0, duration: 0.3 },
                1.7,
              );
            }
            tl.fromTo(
              overlayRef.current,
              { opacity: 0 },
              { opacity: 0.8, duration: 1, ease: "none" },
              2,
            );

            return () => window.removeEventListener("resize", calculateMetrics);
          }

          if (isMobile) {
            // ЖОДНИХ scrollTrigger!
            gsap.set(overlayRef.current, { opacity: 0.6 });

            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current
                .play()
                .catch((e) => console.log("Auto-play blocked", e));
            }

            if (contentRef.current) {
              const contentCards =
                contentRef.current.querySelectorAll(".animCardWrapper");
              gsap.fromTo(
                contentCards,
                { y: 50, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  stagger: 0.15,
                  ease: "power3.out",
                  delay: 1.5,
                },
              );
            }
          }
        },
      );
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
          autoPlay
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
