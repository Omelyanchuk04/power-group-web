"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useModal } from "@/context/ModalContext";
import styles from "./Projects.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const { openModal } = useModal();

  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const progressBarRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const targetIndexRef = useRef(0);
  const tweenRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Отримуємо проєкти з БД
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();

        const formattedProjects = data.map((p) => ({
          id: p._id,
          title: p.title,
          location: p.client || "Локація не вказана",
          power: p.power,
          powerLabel:
            p.power >= 1000
              ? `${(p.power / 1000).toFixed(1)} МВт`
              : `${p.power} кВт`,
          img: p.mainImage,
          year: p.date ? new Date(p.date).getFullYear() : "2024",
          date: p.date,
          clientType: p.clientType,
          serviceType: p.serviceType,
          description: p.shortDescription || "Опис відсутній",
          gallery: p.gallery || [],
        }));

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Помилка завантаження проєктів:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Анімація появи (тільки після завантаження даних)
  useEffect(() => {
    if (isLoading || projects.length === 0) return;

    let ctx = gsap.context(() => {
      gsap.from(
        [
          `.${styles.badge}`,
          `.${styles.title}`,
          `.${styles.subtitle}`,
          `.${styles.headerBottom}`,
          `.${styles.sliderContainer}`,
          `.${styles.progressContainer}`,
        ],
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        },
      );
    }, containerRef);

    handleScroll();
    return () => ctx.revert();
  }, [isLoading, projects]);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollLeft = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (prevBtnRef.current) {
      if (scrollLeft <= 0) prevBtnRef.current.classList.add(styles.disabled);
      else prevBtnRef.current.classList.remove(styles.disabled);
    }

    if (nextBtnRef.current) {
      if (scrollLeft >= maxScroll - 10)
        nextBtnRef.current.classList.add(styles.disabled);
      else nextBtnRef.current.classList.remove(styles.disabled);
    }

    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${progress})`;
    }
  };

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

    if (!tweenRef.current?.isActive()) {
      targetIndexRef.current = Math.round(slider.scrollLeft / step);
    }

    if (direction === "next") {
      targetIndexRef.current = Math.min(targetIndexRef.current + 1, maxIndex);
    } else {
      targetIndexRef.current = Math.max(targetIndexRef.current - 1, 0);
    }

    let targetX = targetIndexRef.current * step;
    if (targetX > maxScroll) targetX = maxScroll;

    slider.style.scrollSnapType = "none";

    if (tweenRef.current) tweenRef.current.kill();

    tweenRef.current = gsap.to(slider, {
      scrollLeft: targetX,
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => {
        slider.style.scrollSnapType = "x mandatory";
        handleScroll();
      },
    });
  };

  // Форматування дати для модалки
  const formatDate = (dateStr) => {
    if (!dateStr) return "Не вказано";
    const d = new Date(dateStr);
    const formatted = d.toLocaleDateString("uk-UA", {
      month: "long",
      year: "numeric",
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  return (
    <section
      className={styles.projectsSection}
      ref={containerRef}
      id="projects"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <span className={styles.badge}>Досвід</span>
            <h2 className={styles.title}>Реалізовані проєкти</h2>
            <p className={styles.subtitle}>
              Переглядайте наші об'єкти за допомогою стрілок або свайпу
            </p>
          </div>

          <div className={styles.headerBottom}>
            <Link href="/projects" className={styles.viewAllBtn}>
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
            </Link>

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
          {isLoading ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                color: "#64748b",
              }}
            >
              Завантаження проєктів...
            </div>
          ) : (
            <div className={styles.sliderTrack}>
              {projects.map((project, index) => {
                const showYear =
                  index === 0 || project.year !== projects[index - 1].year;

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
                            {project.powerLabel}
                          </span>
                        </div>

                        {/* 🔥 Відкриваємо глобальну модалку проєкту 🔥 */}
                        <button
                          className={styles.detailBtn}
                          onClick={() => {
                            openModal("project", {
                              title: project.title,
                              image: project.img,
                              gallery: project.gallery,
                              powerLabel: project.powerLabel,
                              location: project.location,
                              date: formatDate(project.date),
                              clientType: project.clientType,
                              description: project.description,
                            });
                          }}
                        >
                          Детальніше
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar} ref={progressBarRef}></div>
      </div>
    </section>
  );
}
