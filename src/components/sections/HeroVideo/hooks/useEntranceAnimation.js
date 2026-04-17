import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "../HeroVideo.module.scss";

export const useEntranceAnimation = ({ heroRef, logoRef, contentRef }) => {
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

      const entranceTl = gsap.timeline({ delay: 0.2 });

      entranceTl
        .fromTo(
          icon,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            force3D: false,
            clearProps: "transform",
          }, // 🔥 Додано clearProps
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
            force3D: false,
            clearProps: "transform",
          }, // 🔥 Додано clearProps
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
    },
    { scope: heroRef },
  );
};
