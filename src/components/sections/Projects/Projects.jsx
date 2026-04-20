"use client";

import { useEffect, useRef } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import styles from "./Projects.module.scss";

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
  const progressBarRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  // Рефи для швидкої анімації кнопок
  const targetIndexRef = useRef(0);
  const tweenRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      );
    }, containerRef);

    handleScroll(); // Ініціалізація прогрес-бару та кнопок
    return () => ctx.revert();
  }, []);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollLeft = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    // Пряме оновлення кнопок (без лагів від React setState)
    if (prevBtnRef.current) {
      if (scrollLeft <= 0) prevBtnRef.current.classList.add(styles.disabled);
      else prevBtnRef.current.classList.remove(styles.disabled);
    }

    if (nextBtnRef.current) {
      if (scrollLeft >= maxScroll - 10)
        nextBtnRef.current.classList.add(styles.disabled);
      else nextBtnRef.current.classList.remove(styles.disabled);
    }

    // Прогрес-бар
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${progress})`;
    }
  };

  // 🔥 Швидка та надійна прокрутка кнопками (GSAP)
  const scrollByAmount = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector(`.${styles.projectCardWrapper}`);
    if (!card) return;

    const gap =
      parseFloat(
        window.getComputedStyle(slider.querySelector(`.${styles.sliderTrack}`))
          .gap,
      ) || 40;
    const step = card.offsetWidth + gap;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const maxIndex = Math.ceil(maxScroll / step);

    // Якщо ми свайпали вручну, синхронізуємо індекс
    if (!tweenRef.current?.isActive()) {
      targetIndexRef.current = Math.round(slider.scrollLeft / step);
    }

    // Розрахунок наступного індексу (ідеально обробляє швидкі кліки)
    if (direction === "next") {
      targetIndexRef.current = Math.min(targetIndexRef.current + 1, maxIndex);
    } else {
      targetIndexRef.current = Math.max(targetIndexRef.current - 1, 0);
    }

    let targetX = targetIndexRef.current * step;
    if (targetX > maxScroll) targetX = maxScroll;

    // Тимчасово вимикаємо snap, щоб браузер не боровся з GSAP
    slider.style.scrollSnapType = "none";

    if (tweenRef.current) tweenRef.current.kill();

    tweenRef.current = gsap.to(slider, {
      scrollLeft: targetX,
      duration: 0.35, // 🔥 Дуже швидка реакція
      ease: "power2.out",
      onComplete: () => {
        slider.style.scrollSnapType = "x mandatory"; // Повертаємо snap для свайпів
        handleScroll();
      },
    });
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
              Переглядайте наші об'єкти за допомогою стрілок або свайпу
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
                ref={prevBtnRef}
                className={styles.controlBtn}
                onClick={() => scrollByAmount("prev")}
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
                ref={nextBtnRef}
                className={styles.controlBtn}
                onClick={() => scrollByAmount("next")}
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
          onScroll={handleScroll}
        >
          <div className={styles.sliderTrack}>
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
                        sizes="(max-width: 768px) 100vw, 400px"
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
            <div className={styles.spacerEnd}></div>
          </div>
        </div>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar} ref={progressBarRef}></div>
      </div>
    </section>
  );
}
