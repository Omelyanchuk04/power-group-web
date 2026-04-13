"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HeroLogo from "./HeroLogo";
import HeroContent from "./HeroContent";
import styles from "./HeroVideo.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroVideo() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);

  const frameCount = 158;
  const imagesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: false });
    const animationState = { frame: 0 };

    const render = () => {
      const safeFrameIndex = Math.max(
        0,
        Math.min(frameCount - 1, Math.floor(animationState.frame)),
      );
      const img = imagesRef.current[safeFrameIndex];
      if (!img || !img.complete) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.width / img.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > imgAspect) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgAspect;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (i === 0) render();
      };
      img.src = `/frames/frame-${(i + 1).toString().padStart(3, "0")}.jpg`;
      imagesRef.current.push(img);
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let ctx = gsap.context(() => {
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

        // 🔥 ВИПРАВЛЕНО: Тепер шукаємо наші нові обгортки!
        const contentCards =
          contentRef.current.querySelectorAll(`.animCardWrapper`);

        const contentButtonWrapper = contentRef.current.querySelector(
          `.${styles.animButtonWrapper}`,
        );

        const tlStart = gsap.timeline({ delay: 0.2 });

        tlStart.fromTo(
          canvas,
          { filter: "brightness(1) blur(0px)" },
          {
            filter: "brightness(0.7) blur(0px)",
            duration: 1.2,
            ease: "power2.inOut",
          },
          0,
        );

        // ФАЗА 1: Поява ЛОГО
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
              autoRound: false,
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
              autoRound: false,
            },
            0.6,
          );

        // ФАЗА 2: Зникнення ЛОГО
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

        // ФАЗА 3: Поява ГОЛОВНОГО КОНТЕНТУ
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
              autoRound: false,
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
              autoRound: false,
            },
            "-=0.4",
          )
          .fromTo(
            contentCards, // Анімуються обгортки карток
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.out",
              force3D: true,
              autoRound: false,
            },
            "-=0.4",
          )
          .fromTo(
            contentButtonWrapper, // Анімується обгортка кнопки
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
              force3D: true,
              autoRound: false,
            },
            "-=0.4",
          );
      }

      // АНІМАЦІЯ СКРОЛУ
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 0.5,
          pin: true,
          pinSpacing: false,
        },
      });

      tl.to({}, { duration: 1 });
      tl.to(
        animationState,
        {
          frame: frameCount - 1,
          ease: "none",
          duration: 0.9,
          onUpdate: render,
        },
        0,
      );

      if (contentRef.current) {
        tl.to(contentRef.current, { y: -100, opacity: 0, duration: 0.3 }, 0);
      }

      tl.fromTo(
        canvas,
        { filter: "brightness(0.55) blur(0px)" },
        { filter: "brightness(1) blur(0px)", duration: 0.4 },
        0,
      );
    });

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.heroSection} ref={heroRef}>
        <div className={styles.pinArea}>
          <canvas ref={canvasRef} className={styles.canvas} />
          <HeroLogo ref={logoRef} />
          <HeroContent ref={contentRef} />
        </div>
      </div>

      <div className={styles.delaySpacer}></div>
    </>
  );
}
