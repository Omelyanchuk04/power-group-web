"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import NextImage from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useModal } from "@/context/ModalContext";
import styles from "./Services.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { openModal: openContactModal } = useModal();

  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const autoScrollTimer = useRef(null);
  const isUserInteracting = useRef(false);

  const isModalOpenRef = useRef(false);

  const modalCardRef = useRef(null);
  const backdropRef = useRef(null);
  const closeBtnRef = useRef(null);

  const services = [
    {
      title: 'Електромонтажні роботи "під ключ"',
      desc: "Комплексні рішення для приватних та промислових об'єктів. Від проєктування до повної здачі в експлуатацію.",
      fullText:
        "Ми забезпечуємо повний цикл електромонтажних робіт. Від початкового дослідження об'єкту та розробки проєкту до прокладання кабельних трас, встановлення освітлення та пусконалагоджувальних робіт. Гарантуємо відповідність усім нормам безпеки (ДБН, ПУЕ) та використання сертифікованих матеріалів.",
      img: "/images/El-work-key-img.jpg",
      num: "01",
    },
    {
      title: "Монтаж та обслуговування",
      desc: "Надійне встановлення та регулярний професійний сервіс електрообладнання будь-якої складності.",
      fullText:
        "Ми пропонуємо регулярний технічний огляд, тепловізійний контроль контактів, перевірку опору ізоляції та оперативний виїзд аварійної бригади у разі позаштатних ситуацій.",
      img: "/images/installation-service-img.jpg",
      num: "02",
    },
    {
      title: "Електрощитове обладнання",
      desc: "Власне виробництво, точна збірка та сертифікований монтаж обладнання.",
      fullText:
        "Наші інженери збирають електрощитове обладнання будь-якої складності: ввідно-розподільчі пристрої (ВРП), щити автоматики, шафи управління насосами чи вентиляцією. Використовуємо комплектуючі від перевірених світових брендів.",
      img: "/images/electric-box-img.jpg",
      num: "03",
    },
    {
      title: "Реконструкція електроустановок",
      desc: "Оновлення розподільчих пристроїв, трансформаторних підстанцій та підключення генераторів.",
      fullText:
        "Проводимо модернізацію застарілих електромереж на підприємствах. Збільшуємо дозволену потужність, замінюємо старі автоматичні вимикачі та трансформатори на сучасні аналоги.",
      img: "/images/reconstruction-img.jpg",
      num: "04",
    },
    {
      title: "Сонячні електростанції",
      desc: "Повна реалізація проєктів з будівництва СЕС для вашої автономії та фінансової вигоди.",
      fullText:
        "Проєктуємо та будуємо сонячні електростанції (СЕС) під власне споживання або під «Зелений тариф». Встановлення СЕС дозволяє суттєво знизити собівартість вашої продукції.",
      img: "/images/solar-panel-img.jpg",
      num: "05",
    },
    {
      title: "Резервне живлення та ESS",
      desc: "Встановлення сучасних акумуляторних систем та джерел безперебійного живлення.",
      fullText:
        "Накопичувачі енергії (BESS) — це ваш захист від блекаутів. Система заряджається вночі або від сонця, а віддає енергію в пікові години. Синхронізуємо роботу генераторів із потужними ДБЖ.",
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
    setMounted(true);
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const panels = gsap.utils.toArray(`.${styles.servicePanel}`);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => resetAutoScroll(),
        onLeave: () => stopAutoScroll(),
        onEnterBack: () => resetAutoScroll(),
        onLeaveBack: () => stopAutoScroll(),
      });

      gsap.from(
        [
          `.${styles.staticHeader}`,
          `.${styles.horizontalTrack}`,
          `.${styles.bottomControls}`,
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

    const track = trackRef.current;

    const handleTouchStart = () => {
      isUserInteracting.current = true;
      stopAutoScroll();
    };

    const handleTouchEnd = () => {
      if (!isModalOpenRef.current) {
        resetAutoScroll();
      }
      setTimeout(() => {
        isUserInteracting.current = false;
      }, 1000);
    };

    const handleWheel = () => {
      isUserInteracting.current = true;
      if (!isModalOpenRef.current) resetAutoScroll();
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

  useEffect(() => {
    isModalOpenRef.current = !!selectedService;
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedService]);

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

    if (!isAuto && !isModalOpenRef.current) {
      isUserInteracting.current = true;
      resetAutoScroll();
      setTimeout(() => {
        isUserInteracting.current = false;
      }, 1000);
    }
  };

  const handleProgressDrag = (e) => {
    isUserInteracting.current = true;
    stopAutoScroll();

    const track = trackRef.current;
    const progress = progressRef.current;
    if (!track || !progress) return;

    document.body.style.userSelect = "none";

    const updateScroll = (clientX) => {
      const rect = progress.getBoundingClientRect();
      // Віднімаємо 20px (радіус кружечка), щоб мишка керувала його центром
      let x = clientX - rect.left - 20;
      // Віднімаємо 40px (повну ширину кружечка), щоб він не виходив за межі
      let effectiveWidth = rect.width - 40;

      x = Math.max(0, Math.min(x, effectiveWidth));

      const percentage = effectiveWidth > 0 ? x / effectiveWidth : 0;
      const maxScroll = track.scrollWidth - track.clientWidth;
      track.scrollLeft = percentage * maxScroll;
    };

    updateScroll(e.clientX);

    const onPointerMove = (moveEvent) => {
      updateScroll(moveEvent.clientX);
    };

    const onPointerUp = () => {
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);

      if (!isModalOpenRef.current) resetAutoScroll();
      setTimeout(() => {
        isUserInteracting.current = false;
      }, 1000);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  const openModal = (service) => {
    isUserInteracting.current = true;
    stopAutoScroll();
    setIsClosing(false);
    setSelectedService(service);
  };

  const closeModal = () => {
    if (isClosing) return;
    setIsClosing(true);
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedService(null);
        setIsClosing(false);
        resetAutoScroll();
        isUserInteracting.current = false;
      },
    });
    tl.to(modalCardRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
    });
    tl.to(
      backdropRef.current,
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      "-=0.2",
    );
  };

  useEffect(() => {
    if (selectedService && !isClosing && modalCardRef.current) {
      const tl = gsap.timeline();
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(modalCardRef.current, { y: 50, opacity: 0, scale: 0.92 });
      tl.to(backdropRef.current, { opacity: 1, duration: 0.4 });
      tl.to(
        modalCardRef.current,
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" },
        "-=0.3",
      );
      tl.to(
        closeBtnRef.current,
        { opacity: 1, scale: 1, duration: 0.4 },
        "-=0.4",
      );
    }
  }, [selectedService, isClosing]);

  return (
    <div ref={wrapperRef}>
      <section className={styles.servicesSection} ref={sectionRef}>
        <div className={styles.staticHeader}>
          <div className={styles.headerCenter}>
            <span className={styles.badge}>Послуги</span>
            <h2 className={styles.title}>Що ми пропонуємо</h2>
          </div>
        </div>

        <div className={styles.horizontalTrack} ref={trackRef}>
          <div className={styles.spacer}></div>

          {services.map((service, index) => (
            <div className={styles.servicePanel} key={index}>
              <div
                className={styles.cardInner}
                onClick={() => openModal(service)}
              >
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

                <button className={styles.plusBtn} aria-label="Детальніше">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <div className={styles.spacerEnd}></div>
        </div>

        <div className={styles.bottomControls}>
          <Link href="/services" className={styles.viewAllBtn}>
            Всі послуги
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
          </Link>
          <div className={styles.arrowGroup}>
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
        </div>

        <div className={styles.progressContainer}>
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

      {mounted &&
        selectedService &&
        createPortal(
          <>
            <div
              className={styles.backdropLayer}
              ref={backdropRef}
              onClick={closeModal}
            ></div>
            <div
              className={styles.modalScrollWrapper}
              onClick={closeModal}
              data-lenis-prevent="true"
            >
              <div className={styles.fixedCloseWrapper} ref={closeBtnRef}>
                <button className={styles.closeBtn} onClick={closeModal}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div
                className={styles.modalContent}
                ref={modalCardRef}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <span className={styles.modalNum}>
                    Послуга {selectedService.num}
                  </span>
                  <h2 className={styles.modalTitle}>{selectedService.title}</h2>
                </div>

                <div className={styles.modalRichContent}>
                  <div className={styles.modalBody}>
                    <p>{selectedService.fullText}</p>
                  </div>
                  <div className={styles.modalImageWrapper}>
                    <NextImage
                      src={selectedService.img}
                      alt={selectedService.title}
                      fill
                      className={styles.modalImage}
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <button
                    className={styles.ctaButton}
                    onClick={() => {
                      openContactModal();
                      setSelectedService(null);
                      resetAutoScroll();
                    }}
                  >
                    Отримати консультацію
                  </button>
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
