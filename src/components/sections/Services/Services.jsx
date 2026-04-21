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
  const progressRef = useRef(null); // 🔥 Новий реф для прогрес-бару
  const autoScrollTimer = useRef(null);
  const isUserInteracting = useRef(false);

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

  const stopAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  };

  const resetAutoScroll = () => {
    stopAutoScroll();
    const timeout = isUserInteracting.current ? 8000 : 5000;
    autoScrollTimer.current = setInterval(() => {
      handleScroll("next", true);
    }, timeout);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const panels = gsap.utils.toArray(`.${styles.servicePanel}`);

      // Запуск автоскролу тільки коли секція на екрані
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => resetAutoScroll(),
        onLeave: () => stopAutoScroll(),
        onEnterBack: () => resetAutoScroll(),
        onLeaveBack: () => stopAutoScroll(),
      });

      // Анімація появи секції
      gsap.from(
        [
          `.${styles.staticHeader}`,
          `.${styles.horizontalTrack}`,
          `.${styles.navControls}`,
          `.${styles.progressContainer}`,
        ],
        {
          y: 80,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      );

      // Анімація карток
      panels.forEach((panel) => {
        const inner = panel.querySelector(`.${styles.cardInner}`);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            scroller: track,
            horizontal: true,
            start: "left 85%",
            end: "right 15%",
            scrub: 0.5,
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

      // Анімація прогрес-бару
      gsap.to(`.${styles.progressBarFill}`, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: track,
          scroller: track,
          horizontal: true,
          start: "left left",
          end: () => `+=${track.scrollWidth - track.clientWidth}`,
          scrub: 0.1,
        },
      });
    }, wrapperRef);

    // Оптимізовані обробники подій
    const track = trackRef.current;

    const handleTouchStart = () => {
      isUserInteracting.current = true;
      stopAutoScroll();
    };

    const handleTouchEnd = () => {
      resetAutoScroll();
      setTimeout(() => {
        isUserInteracting.current = false;
      }, 1000);
    };

    const handleWheel = () => {
      isUserInteracting.current = true;
      resetAutoScroll();
      clearTimeout(track.wheelTimeout);
      track.wheelTimeout = setTimeout(() => {
        isUserInteracting.current = false;
      }, 1000);
    };

    if (track) {
      track.addEventListener("touchstart", handleTouchStart, { passive: true });
      track.addEventListener("touchend", handleTouchEnd, { passive: true });
      track.addEventListener("wheel", handleWheel, { passive: true });
    }

    return () => {
      stopAutoScroll();
      if (track) {
        track.removeEventListener("touchstart", handleTouchStart);
        track.removeEventListener("touchend", handleTouchEnd);
        track.removeEventListener("wheel", handleWheel);
      }
      ctx.revert();
    };
  }, []);

  const handleScroll = (direction, isAuto = false) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const panel = track.querySelector(`.${styles.servicePanel}`);
    if (!panel) return;

    const style = window.getComputedStyle(panel);
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    const cardStep = panel.offsetWidth + margin;

    const currentScroll = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;

    let targetScroll =
      direction === "next"
        ? currentScroll + cardStep
        : currentScroll - cardStep;

    if (isAuto && currentScroll >= maxScroll - 10) {
      targetScroll = 0;
    }

    track.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });

    if (!isAuto) {
      isUserInteracting.current = true;
      resetAutoScroll();
      setTimeout(() => {
        isUserInteracting.current = false;
      }, 1000);
    }
  };

  // 🔥 ЛОГІКА ПЕРЕТЯГУВАННЯ ПОВЗУНКА 🔥
  const handleProgressDrag = (e) => {
    isUserInteracting.current = true;
    stopAutoScroll();

    const track = trackRef.current;
    const progress = progressRef.current;
    if (!track || !progress) return;

    // Забороняємо виділення тексту під час перетягування
    document.body.style.userSelect = "none";

    const updateScroll = (clientX) => {
      const rect = progress.getBoundingClientRect();
      let x = clientX - rect.left;

      // Обмежуємо значення від 0 до ширини прогрес-бару
      x = Math.max(0, Math.min(x, rect.width));

      const percentage = x / rect.width;
      const maxScroll = track.scrollWidth - track.clientWidth;

      // Одразу скролимо трек, а GSAP сам оновить дизайн прогрес-бару!
      track.scrollLeft = percentage * maxScroll;
    };

    // Стрибок на місце кліку
    updateScroll(e.clientX);

    const onPointerMove = (moveEvent) => {
      updateScroll(moveEvent.clientX);
    };

    const onPointerUp = () => {
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);

      resetAutoScroll();
      setTimeout(() => {
        isUserInteracting.current = false;
      }, 1000);
    };

    // Слухаємо рух мишки/пальця по всьому вікну
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  return (
    <div ref={wrapperRef}>
      <section className={styles.servicesSection} ref={sectionRef}>
        <div className={styles.staticHeader}>
          <span className={styles.badge}>Послуги</span>
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
                  priority={index < 2}
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
          {/* 🔥 Додали реф та обробник натискання (pointerdown працює і для миші, і для пальців) 🔥 */}
          <div
            className={styles.progressBar}
            ref={progressRef}
            onPointerDown={handleProgressDrag}
          >
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
