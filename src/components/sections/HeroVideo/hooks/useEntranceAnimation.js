"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "../HeroVideo.module.scss";

export const useEntranceAnimation = ({
  heroRef,
  logoRef,
  contentRef,
  isLoaded,
}) => {
  useGSAP(
    () => {
      if (!isLoaded) return;
      if (!logoRef?.current || !contentRef?.current) return;

      const icon = logoRef.current.querySelector(`.${styles.animIcon}`);
      const text = logoRef.current.querySelector(`.${styles.animText}`);
      const line = logoRef.current.querySelector(`.${styles.animLine}`);
      const slogan = logoRef.current.querySelector(`.${styles.animSlogan}`);
      const logoBg = logoRef.current.querySelector(`.${styles.logoBackground}`);
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

      const initialDelay = isMobile ? 0.1 : 0.6;

      const entranceTl = gsap.timeline({ delay: initialDelay });

      if (logoBg) {
        entranceTl.fromTo(
          logoBg,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1, ease: "power2.out" },
          0,
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

      if (contentBg) {
        entranceTl.fromTo(
          contentBg,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1, ease: "power2.out" },
          "-=0.1",
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
      dependencies: [isLoaded],
      scope: heroRef,
    },
  );
};
