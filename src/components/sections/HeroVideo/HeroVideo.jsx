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

  const frameCount = 158;
  const imagesRef = useRef([]);
  const renderMetrics = useRef({ width: 0, height: 0, x: 0, y: 0 });

  // ==========================================
  // 🚨 СУПЕР-ЛОГЕР (Відстежуємо ВСЕ)
  // ==========================================
  useEffect(() => {
    console.log(
      "🟢 [INIT] HeroVideo змонтовано. Висота body:",
      document.body.scrollHeight,
    );

    // 1. Відстежуємо фізичний скрол
    const handleScroll = () => {
      console.log(
        `🌀 [SCROLL] Позиція: ${window.scrollY.toFixed(0)}px | Висота сторінки: ${document.body.scrollHeight}px`,
      );
    };

    // 2. Відстежуємо дотики (чи не скасовує їх браузер)
    const handleTouchStart = (e) =>
      console.log("👆 [TOUCH START] Палець торкнувся екрану", e.target);
    const handleTouchMove = () => console.log("〰️ [TOUCH MOVE] Скролимо...");
    const handleTouchEnd = () => console.log("👇 [TOUCH END] Палець відірвано");
    const handleTouchCancel = (e) =>
      console.error("❌ [TOUCH CANCEL] БРАУЗЕР ЖОРСТКО СКАСУВАВ ДОТИК!", e);

    // 3. Відстежуємо ресайз екрану
    const handleResize = () =>
      console.warn(
        `📐 [RESIZE] Екран змінив розмір: ${window.innerWidth}x${window.innerHeight}`,
      );

    // 4. Ловимо паніку GSAP
    const onRefreshInit = () =>
      console.warn("⚠️ [GSAP] ScrollTrigger почав перерахунок!");
    const onRefresh = () =>
      console.log("✅ [GSAP] ScrollTrigger закінчив перерахунок.");

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchCancel);
    window.addEventListener("resize", handleResize);
    ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
    ScrollTrigger.addEventListener("refresh", onRefresh);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchCancel);
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
    };
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
        return new Promise((resolve) => {
          const img = new Image();
          img.decoding = "async";
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

      let mm = gsap.matchMedia();

      // 1. ДЕСКТОП
      mm.add("(min-width: 1025px)", () => {
        preloadFirstFrame().then(() => {
          calculateMetrics();
          render();
          preloadOtherFrames();
        });
        const handleResize = () => {
          calculateMetrics();
          render();
        };
        window.addEventListener("resize", handleResize);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 0.5,
            pin: true,
            pinSpacing: false, // Залишаємо стандартну поведінку для десктопу
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
        return () => window.removeEventListener("resize", handleResize);
      });

      // 2. МОБАЙЛ (Повна ізоляція від ScrollTrigger)
      mm.add("(max-width: 1024px)", () => {
        console.log(
          "📱 [MEDIA] Мобільний режим - ЕФЕКТ НАЇЗДУ (pinSpacing: false)",
        );

        gsap.set(overlayRef.current, { opacity: 0.6 });

        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current
            .play()
            .catch((err) => console.log("Autoplay blocked", err));
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
              delay: 0.5,
            },
          );
        }

        // 🔥 ДОДАЄМО ПІН ДЛЯ ЕФЕКТУ НАЇЗДУ
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%", // Тримаємо пін, поки користувач скролить висоту одного екрану
          pin: true,
          pinSpacing: false, // 🔥 НАЙГОЛОВНІШЕ! Не створює пустоти, дозволяє About наїхати зверху
        });
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
