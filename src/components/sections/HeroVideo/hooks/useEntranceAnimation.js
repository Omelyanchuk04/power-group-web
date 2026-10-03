"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "../HeroVideo.module.scss";

// Додано isLoaded у параметри
export const useEntranceAnimation = ({
  heroRef,
  logoRef,
  contentRef,
  isLoaded,
}) => {
  useGSAP(
    () => {
      // Блокуємо запуск анімації, поки лоадер не зникне повністю
      if (!isLoaded) return;

      if (!logoRef?.current || !contentRef?.current) return;

      const icon = logoRef.current.querySelector(`.${styles.animIcon}`);
      const text = logoRef.current.querySelector(`.${styles.animText}`);
      const line = logoRef.current.querySelector(`.${styles.animLine}`);
      const slogan = logoRef.current.querySelector(`.${styles.animSlogan}`);

      // 🔥 ДОДАНО: Шукаємо фон логотипу
      const logoBg = logoRef.current.querySelector(`.${styles.logoBackground}`);

      // Шукаємо блок затемнення для головного тексту
      const contentBg = contentRef.current.querySelector(
        `.${styles.contentBackground}`,
      );

      const contentTitle = contentRef.current.querySelector(
        `.${styles.animTitle}`,
      );
      const contentSubtitle = contentRef.current.querySelector(
        `.${styles.animSubtitle}`,
      );
      const contentButtonWrapper = contentRef.current.querySelector(
        `.${styles.animButtonWrapper}`,
      );

      const contentCards = contentRef.current.querySelectorAll(
        `.${styles.animCardWrapper}`,
      );

      const isMobile =
        typeof window !== "undefined"
          ? window.matchMedia("(max-width: 768px)").matches
          : false;
      const initialDelay = isMobile ? 0.8 : 0.6;

      const entranceTl = gsap.timeline({ delay: initialDelay });

      // 🔥 ДОДАНО: Поява фону логотипу на самому початку
      if (logoBg) {
        entranceTl.fromTo(
          logoBg,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 1,
            ease: "power2.out",
          },
          0, // Запускаємо на нульовій секунді разом з іконкою
        );
      }

      if (icon) {
        entranceTl.fromTo(
          icon,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            force3D: true,
          },
          0,
        );
      }
      if (text) {
        entranceTl.fromTo(
          text,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            force3D: true,
          },
          0.1,
        );
      }
      if (line) {
        entranceTl.fromTo(
          line,
          { scaleX: 0, autoAlpha: 0 },
          {
            scaleX: 1,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
            force3D: true,
          },
          0.4,
        );
      }
      if (slogan) {
        entranceTl.fromTo(
          slogan,
          { y: 15, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
            force3D: true,
          },
          0.6,
        );
      }

      // Зникнення логотипу
      // 🔥 ДОДАНО: logoBg в масив, щоб він зник разом з логотипом
      const logoElements = [logoBg, icon, text, line, slogan].filter(Boolean);
      if (logoElements.length > 0) {
        entranceTl.to(
          logoElements,
          {
            y: -20,
            autoAlpha: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in",
            force3D: true,
          },
          "+=0.3",
        );
      }

      // Анімуємо появу темної плями (затемнення фону для тексту)
      if (contentBg) {
        entranceTl.fromTo(
          contentBg,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.1", // Починаємо трохи раніше появи заголовку
        );
      }

      if (contentTitle) {
        entranceTl.fromTo(
          contentTitle,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power3.out",
            force3D: true,
          },
          "-=0.1",
        );
      }
      if (contentSubtitle) {
        entranceTl.fromTo(
          contentSubtitle,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power3.out",
            force3D: true,
          },
          "-=0.4",
        );
      }
      if (contentButtonWrapper) {
        entranceTl.fromTo(
          contentButtonWrapper,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: "power3.out",
            force3D: true,
          },
          "-=0.4",
        );
      }

      if (contentCards && contentCards.length > 0) {
        entranceTl.fromTo(
          contentCards,
          { y: 50, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            force3D: true,
          },
          "-=0.4",
        );
      }
    },
    {
      // Додано isLoaded у залежності, щоб хук перезапустився, коли стан зміниться на true
      dependencies: [isLoaded],
      scope: heroRef,
    },
  );
};
