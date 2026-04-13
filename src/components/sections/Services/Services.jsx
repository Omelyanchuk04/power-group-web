"use client";

import { useEffect, useRef } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Services.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const autoScrollTimer = useRef(null);

  const services = [
    {
      title: 'Електромонтажні роботи "під ключ"',
      desc: "Комплексні рішення для приватних та промислових об'єктів. Від проєктування до повної здачі в експлуатацію.",
      img: "/images/El-work-key-img.jpg",
      num: "01",
    },
    {
      title: "Монтаж та обслуговування",
      desc: "Надійне встановлення та регулярний професійний сервіс електрообладнання будь-якої складності.",
      img: "/images/installation-service-img.jpg",
      num: "02",
    },
    {
      title: "Електрощитове обладнання",
      desc: "Власне виробництво, точна збірка та сертифікований монтаж обладнання.",
      img: "/images/electric-box-img.jpg",
      num: "03",
    },
    {
      title: "Реконструкція електроустановок",
      desc: "Оновлення розподільчих пристроїв, трансформаторних підстанцій та підключення генераторів.",
      img: "/images/reconstruction-img.jpg",
      num: "04",
    },
    {
      title: "Сонячні електростанції",
      desc: "Повна реалізація проєктів з будівництва СЕС для вашої автономії та фінансової вигоди.",
      img: "/images/solar-panel-img.jpg",
      num: "05",
    },
    {
      title: "Резервне живлення та ESS",
      desc: "Встановлення сучасних акумуляторних систем та джерел безперебійного живлення.",
      img: "/images/backup-power-img.jpg",
      num: "06",
    },
  ];

  const resetAutoScroll = () => {
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);

    autoScrollTimer.current = setInterval(() => {
      const st = ScrollTrigger.getById("servicesTrack");
      if (st && st.isActive) {
        handleScroll("next", true);
      }
    }, 5000);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const panels = gsap.utils.toArray(`.${styles.servicePanel}`);
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      // 🔥 ОНОВЛЕНА АНІМАЦІЯ ПОЯВИ
      gsap.from(
        [
          `.${styles.staticHeader}`,
          `.${styles.horizontalTrack}`,
          `.${styles.navControls}`,
          `.${styles.progressContainer}`,
        ],
        {
          y: 80, // Більший зсув для відчутності
          opacity: 0,
          duration: 1.2, // Трохи довший ефект
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%", // 🔥 Спрацює ТІЛЬКИ коли секція дійде до середини екрану
            toggleActions: "play none none none",
          },
        },
      );

      const scrollTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          id: "servicesTrack",
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel) => {
        const inner = panel.querySelector(`.${styles.cardInner}`);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "center 85%",
            end: "center 15%",
            scrub: true,
          },
        });

        tl.to(inner, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
        }).to(inner, {
          scale: 0.85,
          opacity: 0.6,
          duration: 0.5,
          ease: "power1.inOut",
        });
      });

      gsap.fromTo(
        `.${styles.progressBarFill}`,
        { width: "0%" },
        {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: 1,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
          },
        },
      );
    }, wrapperRef);

    resetAutoScroll();

    const handleUserInteraction = () => resetAutoScroll();
    window.addEventListener("wheel", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);

    return () => {
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      ctx.revert();
    };
  }, []);

  const handleScroll = (direction, isAuto = false) => {
    const st = ScrollTrigger.getById("servicesTrack");
    if (!st || !trackRef.current) return;

    const panel = trackRef.current.querySelector(`.${styles.servicePanel}`);
    if (!panel) return;

    const style = window.getComputedStyle(panel);
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    const cardStep = panel.offsetWidth + margin;

    const sectionTop = st.start;
    const currentScrollInSection = window.scrollY - sectionTop;

    let currentIndex = Math.round(currentScrollInSection / cardStep);
    let targetIndex =
      direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (isAuto && targetIndex >= services.length) {
      targetIndex = 0;
    } else {
      if (targetIndex < 0) targetIndex = 0;
      if (targetIndex >= services.length) targetIndex = services.length - 1;
    }

    const targetScrollY = sectionTop + targetIndex * cardStep;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });

    if (!isAuto) resetAutoScroll();
  };

  return (
    <div ref={wrapperRef}>
      <section className={styles.servicesSection} ref={sectionRef}>
        <div className={styles.staticHeader}>
          <span className={styles.badge}>Напрямки діяльності</span>
          <h2 className={styles.title}>Що ми пропонуємо</h2>
        </div>

        <div className={styles.horizontalTrack} ref={trackRef}>
          <div className={styles.spacer}></div>

          {services.map((service, index) => (
            <div className={styles.servicePanel} key={index}>
              <div className={styles.cardInner}>
                <NextImage
                  src={service.img}
                  alt={service.title}
                  fill
                  className={styles.bgImage}
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
                <div className={styles.gradientOverlay}></div>

                <div className={styles.cardContent}>
                  <div className={styles.cardNumber}>{service.num}</div>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.desc}</p>
                </div>
              </div>
            </div>
          ))}

          <div className={styles.spacerEnd}></div>
        </div>

        <div className={styles.navControls}>
          <button
            className={styles.navBtn}
            onClick={() => handleScroll("prev")}
            aria-label="Назад"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button
            className={styles.navBtn}
            onClick={() => handleScroll("next")}
            aria-label="Вперед"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressBarFill}>
              <div className={styles.progressIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
