"use client";

import { useEffect, useRef } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import styles from "./Projects.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

const TIMELINE_PROJECTS = [
  {
    id: 1,
    year: "2024",
    title: "Промислова СЕС 1.2 МВт",
    location: "Хмельницька обл.",
    power: "1200 кВт",
    img: "/images/Projects/project-1.jpeg",
  },
  {
    id: 2,
    year: "2024",
    title: "Реконструкція ПС 110/10 kВ",
    location: "Вінницька обл.",
    power: "10 МВА",
    img: "/images/Projects/project-2.jpeg",
  },
  {
    id: 3,
    year: "2023",
    title: "Енергозабезпечення ТРЦ",
    location: "м. Київ",
    power: "500 кВт",
    img: "/images/Projects/project-3.jpeg",
  },
  {
    id: 4,
    year: "2023",
    title: "Логістичний центр «А-Клас»",
    location: "Львівська обл.",
    power: "800 кВт",
    img: "/images/Projects/project-4.jpeg",
  },
  {
    id: 5,
    year: "2022",
    title: "Сонячна станція (приватна)",
    location: "Київська обл.",
    power: "30 кВт",
    img: "/images/Projects/project-5.jpeg",
  },
  {
    id: 6,
    year: "2021",
    title: "Збірка обладнання ГРЩ",
    location: "Власне виробництво",
    power: "2500 А",
    img: "/images/Projects/project-6.jpeg",
  },
  {
    id: 7,
    year: "2021",
    title: "Автономне живлення",
    location: "Житомирська обл.",
    power: "50 кВт",
    img: "/images/Projects/project-7.jpeg",
  },
  {
    id: 8,
    year: "2020",
    title: "Освітлення автомагістралі",
    location: "м. Вінниця",
    power: "150 kВт",
    img: "/images/Projects/project-8.jpeg",
  },
  {
    id: 9,
    year: "2020",
    title: "Біогазова ТЕС",
    location: "Черкаська обл.",
    power: "1 МВт",
    img: "/images/Projects/project-9.jpeg",
  },
  {
    id: 10,
    year: "2019",
    title: "Модернізація заводу",
    location: "м. Дніпро",
    power: "200 кВт",
    img: "/images/Projects/project-10.jpeg",
  },
  {
    id: 11,
    year: "2019",
    title: "Зарядна станція для ЕБ",
    location: "м. Київ",
    power: "400 кВт",
    img: "/images/Projects/project-11.jpeg",
  },
  {
    id: 12,
    year: "2018",
    title: "Підстанція КТП",
    location: "Одеська обл.",
    power: "630 кВА",
    img: "/images/Projects/project-12.jpeg",
  },
  {
    id: 13,
    year: "2018",
    title: "Вітрова електростанція",
    location: "Миколаївська обл.",
    power: "2.5 МВт",
    img: "/images/Projects/project-13.jpeg",
  },
  {
    id: 14,
    year: "2017",
    title: "Система моніторингу",
    location: "м. Полтава",
    power: "АСКОЕ",
    img: "/images/Projects/project-14.jpeg",
  },
];

export default function Projects() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);

  const updateProgressRef = useRef(null);
  const autoPlayCallRef = useRef(null);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);

  const currentIndexRef = useRef(0);

  const getStep = () => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return 620;
    return track.children[1].offsetLeft - track.children[0].offsetLeft;
  };

  const goToIndex = (newIndex, isManual = false) => {
    const track = trackRef.current;
    const slider = sliderRef.current;
    if (!track || !slider) return;

    const maxScroll = track.scrollWidth - slider.offsetWidth;
    const step = getStep();

    const maxIndex = Math.ceil(maxScroll / step);
    let isRewinding = false;

    if (newIndex > maxIndex || newIndex * step > maxScroll + step / 2) {
      newIndex = 0;
      isRewinding = true;
    } else if (newIndex < 0) {
      newIndex = 0;
    }

    currentIndexRef.current = newIndex;
    let targetX = -(newIndex * step);

    if (targetX < -maxScroll) targetX = -maxScroll;
    if (targetX > 0) targetX = 0;

    let animDuration = isManual ? 0.6 : 1.2;
    if (isRewinding && !isManual) animDuration = 1.4;

    // Основний рух
    gsap.to(track, {
      x: targetX,
      duration: animDuration,
      ease: isManual ? "power3.out" : "power2.inOut",
      overwrite: "auto",
      onUpdate: () => {
        if (updateProgressRef.current) updateProgressRef.current();
      },
    });

    // Ефект Motion Blur для ілюзії легкості та швидкості
    if (isManual || isRewinding) {
      gsap.fromTo(
        track,
        { opacity: 1, filter: "blur(0px)" },
        {
          opacity: 0.6,
          filter: "blur(3px)",
          duration: animDuration * 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        },
      );
    }
  };

  const slideNext = (isManualFlag = true) => {
    const isManual = typeof isManualFlag === "boolean" ? isManualFlag : true;
    stopAutoPlay();
    goToIndex(currentIndexRef.current + 1, isManual);
    startAutoPlay();
  };

  const slidePrev = (isManualFlag = true) => {
    const isManual = typeof isManualFlag === "boolean" ? isManualFlag : true;
    stopAutoPlay();
    if (currentIndexRef.current > 0) {
      goToIndex(currentIndexRef.current - 1, isManual);
    }
    startAutoPlay();
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayCallRef.current = gsap.delayedCall(4.5, () => {
      if (!isHoveredRef.current && !isDraggingRef.current) {
        slideNext(false);
      }
    });
  };

  const stopAutoPlay = () => {
    if (autoPlayCallRef.current) {
      autoPlayCallRef.current.kill();
      autoPlayCallRef.current = null;
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      );

      const track = trackRef.current;
      const slider = sliderRef.current;

      const updateProgress = () => {
        const maxScroll = track.scrollWidth - slider.offsetWidth;
        if (maxScroll <= 0) return;

        const currentX = gsap.getProperty(track, "x") || 0;
        const progress = Math.abs(currentX) / maxScroll;

        gsap.to(progressBarRef.current, {
          scaleX: progress,
          duration: 0.1,
          ease: "none",
        });
      };

      updateProgressRef.current = updateProgress;

      Draggable.create(track, {
        type: "x",
        bounds: slider,
        inertia: true,
        dragResistance: 0.1,
        edgeResistance: 0.6,
        snap: {
          x: function (endValue) {
            const step = getStep();
            const closestIndex = Math.round(Math.abs(endValue) / step);
            currentIndexRef.current = closestIndex;
            return -(closestIndex * step);
          },
        },
        onPress: () => {
          isDraggingRef.current = true;
          stopAutoPlay();
          gsap.killTweensOf(track);
          gsap.to(track, { opacity: 0.9, duration: 0.2 });
        },
        onRelease: () => {
          isDraggingRef.current = false;
          if (!isHoveredRef.current) startAutoPlay();
          gsap.to(track, { opacity: 1, duration: 0.2 });
        },
        onDrag: updateProgress,
        onThrowUpdate: updateProgress,
      });

      startAutoPlay();
    }, containerRef);

    return () => {
      ctx.revert();
      stopAutoPlay();
    };
  }, []);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    stopAutoPlay();
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (!isDraggingRef.current) startAutoPlay();
  };

  return (
    <section
      className={styles.projectsSection}
      ref={containerRef}
      id="projects"
    >
      <div className={styles.blob3}></div>
      <div className={styles.blob4}></div>
      <div className={styles.blob5}></div>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.badge}>Досвід</span>
            <h2 className={styles.title}>Реалізовані проєкти</h2>
            <p className={styles.subtitle}>
              Переглядайте наші об'єкти за допомогою стрілок
            </p>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.viewAllBtn}>
              Всі проєкти
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: "8px" }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <div className={styles.controls}>
              <button
                className={styles.controlBtn}
                onClick={slidePrev}
                aria-label="Попередній"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className={styles.controlBtn}
                onClick={slideNext}
                aria-label="Наступний"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={styles.sliderContainer}
          ref={sliderRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
        >
          <div className={styles.sliderTrack} ref={trackRef}>
            {TIMELINE_PROJECTS.map((project, index) => {
              const showYear =
                index === 0 ||
                project.year !== TIMELINE_PROJECTS[index - 1].year;

              return (
                <div key={project.id} className={styles.projectCardWrapper}>
                  <div
                    className={`${styles.yearLabel} ${!showYear ? styles.hiddenYear : ""}`}
                  >
                    {project.year}
                  </div>

                  <div className={styles.projectCard}>
                    <div className={styles.imagePanel}>
                      <NextImage
                        src={project.img}
                        alt={project.title}
                        fill
                        className={styles.image}
                        sizes="400px"
                        priority={index < 2}
                        draggable={false}
                      />
                    </div>
                    <div className={styles.infoPanel}>
                      <span className={styles.location}>
                        {project.year} • {project.location}
                      </span>
                      <h3 className={styles.cardTitle}>{project.title}</h3>
                      <div className={styles.divider}></div>
                      <div className={styles.powerInfo}>
                        <span className={styles.powerLabel}>ПОТУЖНІСТЬ</span>
                        <span className={styles.powerValue}>
                          {project.power}
                        </span>
                      </div>
                      <button className={styles.detailBtn}>Детальніше</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar} ref={progressBarRef}></div>
      </div>
    </section>
  );
}
