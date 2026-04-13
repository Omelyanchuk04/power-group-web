"use client";

import { useEffect, useRef } from "react";

import NextImage from "next/image";

import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

import styles from "./HeroVideo.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // ВАЖЛИВО: ScrollTrigger.normalizeScroll ВИДАЛЕНО, щоб не ламався Chrome
}

export default function HeroVideo() {
  const heroRef = useRef(null);

  const canvasRef = useRef(null);

  const logoRef = useRef(null);

  const frameCount = 396;

  const imagesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d", { alpha: false });

    const animationState = { frame: 0 };

    const render = () => {
      const img = imagesRef.current[Math.round(animationState.frame)];

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

    // 🔥 Оптимізація FPS: малюємо тільки синхронно з екраном (допомагає проти ривків у кінці)

    let renderRequested = false;

    const requestRender = () => {
      if (!renderRequested) {
        renderRequested = true;

        requestAnimationFrame(() => {
          render();

          renderRequested = false;
        });
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();

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
      // 1. Анімація старту (Відео темнішає, логотип збирається)

      if (logoRef.current) {
        const icon = logoRef.current.querySelector(`.${styles.animIcon}`);

        const text = logoRef.current.querySelector(`.${styles.animText}`);

        const line = logoRef.current.querySelector(`.${styles.animLine}`);

        const slogan = logoRef.current.querySelector(`.${styles.animSlogan}`);

        gsap

          .timeline({ delay: 0.3 })

          .fromTo(
            canvas,

            { filter: "brightness(1) blur(0px)" },

            {
              filter: "brightness(0.4) blur(10px)",

              duration: 1.2,

              ease: "power2.inOut",
            },

            0,
          )

          .fromTo(
            icon,

            { x: -50, opacity: 0 },

            { x: 0, opacity: 1, duration: 1, ease: "power3.out" },

            0,
          )

          .fromTo(
            text,

            { x: 50, opacity: 0 },

            { x: 0, opacity: 1, duration: 1, ease: "power3.out" },

            0,
          )

          .fromTo(
            line,

            { scaleX: 0, opacity: 0 },

            { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },

            0.6,
          )

          .fromTo(
            slogan,

            { y: 20, opacity: 0 },

            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },

            0.8,
          );
      }

      // 2. Анімація скролу

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,

          start: "top top",

          end: "+=1200",

          scrub: 1,

          pin: true,

          anticipatePin: 1,
        },
      });

      tl.to(
        animationState,

        {
          frame: Math.floor(frameCount * 0.4),

          snap: "frame",

          ease: "none",

          onUpdate: requestRender, // 🔥 Замінено render на requestRender
        },

        0,
      );

      if (logoRef.current) {
        tl.to(logoRef.current, { y: -100, opacity: 0, duration: 0.5 }, 0);
      }

      tl.fromTo(
        canvas,

        { filter: "brightness(0.4) blur(10px)" },

        { filter: "brightness(1) blur(0px)", duration: 0.5 },

        0,
      );
    });

    return () => {
      ctx.revert();

      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.heroSection} ref={heroRef}>
      <div className={styles.pinArea}>
        <canvas ref={canvasRef} className={styles.canvas} />

        <section className={styles.logoStep} ref={logoRef}>
          <div className={styles.logoContainer}>
            <div className={styles.animIcon}>
              <NextImage
                src="/logo-icon.svg"
                alt="Icon"
                width={160}
                height={160}
                priority
              />
            </div>

            <div className={styles.logoRightColumn}>
              <div className={styles.animText}>
                <NextImage
                  src="/logo-text.svg"
                  alt="Text"
                  width={480}
                  height={80}
                  priority
                />
              </div>

              <div className={styles.animLine}></div>

              <p className={styles.animSlogan}>Ваша енергетична стабільність</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
