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
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function HeroVideo() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

  const frameCount = 152;
  const imagesRef = useRef([]);
  const renderMetrics = useRef({ width: 0, height: 0, x: 0, y: 0 });

  useGSAP(
    () => {
      if (!logoRef.current || !contentRef.current) return;

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
      const contentCards =
        contentRef.current.querySelectorAll(".animCardWrapper");

      // ЕТАЛОННА АНІМАЦІЯ (працює скрізь)
      const entranceTl = gsap.timeline({ paused: true, delay: 0.2 });
      entranceTl
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
        )
        .fromTo(
          contentCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4",
        );

      let mm = gsap.matchMedia();

      // ==========================================
      // ДЕСКТОП (Canvas + секвенція)
      // ==========================================
      mm.add("(min-width: 1025px)", () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d", {
          alpha: false,
          desynchronized: true,
        });
        const animationState = { frame: 0 };

        const calculateMetrics = () => {
          const img = imagesRef.current[0];
          if (!img || !canvas) return;
          const rect = canvas.getBoundingClientRect();
          canvas.width = rect.width;
          canvas.height = rect.height;
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
            img.fetchPriority = "high";
            img.src = `/frames/frame-001.jpg`;
            img
              .decode()
              .then(() => {
                imagesRef.current[0] = img;
                resolve(img);
              })
              .catch(() => {
                imagesRef.current[0] = img;
                resolve(img);
              });
          });
        };

        const preloadOtherFrames = async () => {
          const batchSize = 10;
          for (let i = 1; i < frameCount; i += batchSize) {
            const batch = [];
            for (let j = 0; j < batchSize && i + j < frameCount; j++) {
              const index = i + j;
              batch.push(
                new Promise((resolve) => {
                  const img = new Image();
                  img.fetchPriority = "low";
                  img.src = `/frames/frame-${(index + 1).toString().padStart(3, "0")}.jpg`;
                  img
                    .decode()
                    .then(() => {
                      imagesRef.current[index] = img;
                      resolve();
                    })
                    .catch(() => {
                      imagesRef.current[index] = img;
                      resolve();
                    });
                }),
              );
            }
            await Promise.all(batch);
          }
        };

        preloadFirstFrame().then(() => {
          calculateMetrics();
          render();
          preloadOtherFrames();
          entranceTl.play();
        });

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
        tl.to(contentRef.current, { y: -50, opacity: 0, duration: 0.3 }, 1.7);
        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 0.2, duration: 1, ease: "none" },
          2,
        );

        let lastWidth = window.innerWidth;
        const handleResize = () => {
          if (window.innerWidth !== lastWidth) {
            lastWidth = window.innerWidth;
            calculateMetrics();
            render();
          }
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
      });

      // ==========================================
      // МОБАЙЛ (Статика + Parallax + Ефект Наїзду)
      // ==========================================
      mm.add("(max-width: 1024px)", () => {
        gsap.set([heroRef.current, canvasRef.current, contentRef.current], {
          clearProps: "all",
        });

        entranceTl.play();

        // ЕФЕКТ НАЇЗДУ (Overlap)
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: false, // Наступна секція наїде зверху
          onUpdate: (self) => {
            if (overlayRef.current) {
              gsap.set(overlayRef.current, {
                opacity: 0.2 + self.progress * 0.5,
              });
            }
          },
        });

        // ПАРАЛАКС ФОНУ
        gsap.to(heroRef.current, {
          backgroundPosition: "50% 80%",
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=100%",
            scrub: true,
          },
        });

        return () => {};
      });
    },
    { scope: heroRef },
  );

  return (
    <>
      <div className={styles.heroSection} ref={heroRef}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div ref={overlayRef} className={styles.canvasOverlay} />
        <HeroLogo ref={logoRef} />
        <HeroContent ref={contentRef} />
      </div>

      <div className={styles.delaySpacer} />
    </>
  );
}
