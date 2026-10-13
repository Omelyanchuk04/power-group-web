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

  const isSwiping = useRef(false);
  const touchStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();

        const formattedProjects = data
          .map((p) => ({
            id: p.slug?.current || p.slug || p._id || p.id,
            title: p.title,
            location: p.client || "Локація не вказана",
            power: p.power,
            powerLabel:
              p.power >= 1000
                ? `${(p.power / 1000).toFixed(1)} МВт`
                : p.power
                  ? `${p.power} кВт`
                  : null,
            capacity: p.capacity,
            capacityLabel: p.capacity ? `${p.capacity} кВт·год` : null,
            img: p.mainImage,
            year: p.date ? new Date(p.date).getFullYear() : "2024",
            date: p.date,
            clientType: p.clientType,
            serviceType: p.serviceType,
            description: p.shortDescription || "Опис відсутній",
            gallery: p.gallery || [],
          }))
          .sort((a, b) => {
            if (!a.date && !b.date) return 0;
            if (!a.date) return 1;
            if (!b.date) return -1;
            return new Date(b.date) - new Date(a.date);
          });

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Помилка завантаження проєктів:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

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

  const formatDate = (dateStr) => {
    if (!dateStr) return "Не вказано";
    const d = new Date(dateStr);
    const formatted = d.toLocaleDateString("uk-UA", {
      month: "long",
      year: "numeric",
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const handleCardClick = (e, project) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSwiping.current) return;

    openModal("project", {
      id: project.id,
      title: project.title,
      image: project.img,
      gallery: project.gallery,
      power: project.power,
      powerLabel: project.powerLabel,
      capacity: project.capacity,
      capacityLabel: project.capacityLabel,
      location: project.location,
      date: formatDate(project.date),
      clientType: project.clientType,
      serviceType: project.serviceType,
      description: project.description,
    });
  };

  // 🔥 Динамічна генерація Schema.org для портфоліо після завантаження даних
  const projectsSchema =
    projects.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: projects.slice(0, 5).map((project, index) => ({
            // Беремо перші 5 для базового контексту
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: project.title,
              description: project.description,
              image: project.img,
              datePublished: project.date,
              contentLocation: {
                "@type": "Place",
                name: project.location,
              },
            },
          })),
        }
      : null;

  return (
    <section
      className={styles.projectsSection}
      ref={containerRef}
      id="projects"
      aria-labelledby="projects-heading"
    >
      {/* Ін'єкція мікророзмітки */}
      {projectsSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
        />
      )}

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <span className={styles.badge}>Досвід</span>
            <h2 id="projects-heading" className={styles.title}>
              Реалізовані проєкти
            </h2>
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
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <div className={styles.controls}>
              <button
                ref={prevBtnRef}
                className={styles.controlBtn}
                onClick={() => scrollByAmount("prev")}
                aria-label="Попередні проєкти"
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
                  aria-hidden="true"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                ref={nextBtnRef}
                className={styles.controlBtn}
                onClick={() => scrollByAmount("next")}
                aria-label="Наступні проєкти"
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
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </header>

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
                  // 🔥 ЗМІНЕНО: div на article
                  <article
                    key={project.id}
                    className={styles.projectCardWrapper}
                  >
                    <div
                      className={`${styles.yearLabel} ${!showYear ? styles.hiddenYear : ""}`}
                    >
                      {project.year}
                    </div>

                    <div
                      className={styles.projectCard}
                      style={{ position: "relative" }}
                      onTouchStart={(e) => {
                        isSwiping.current = false;
                        touchStartPos.current = {
                          x: e.touches[0].clientX,
                          y: e.touches[0].clientY,
                        };
                      }}
                      onTouchMove={(e) => {
                        const deltaX = Math.abs(
                          e.touches[0].clientX - touchStartPos.current.x,
                        );
                        const deltaY = Math.abs(
                          e.touches[0].clientY - touchStartPos.current.y,
                        );
                        if (deltaX > 10 || deltaY > 10)
                          isSwiping.current = true;
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          zIndex: 10,
                          cursor: "pointer",
                          touchAction: "manipulation",
                        }}
                        onClick={(e) => handleCardClick(e, project)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Відкрити деталі проєкту: ${project.title}`}
                      />

                      <div className={styles.imagePanel}>
                        <NextImage
                          src={project.img}
                          // 🔥 ЗМІНЕНО: Більш контекстний alt
                          alt={`Проєкт: ${project.title} у ${project.location}`}
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

                        <button
                          className={styles.detailBtn}
                          style={{
                            position: "relative",
                            zIndex: 20,
                            cursor: "pointer",
                            pointerEvents: "auto",
                          }}
                          onClick={(e) => handleCardClick(e, project)}
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          Детальніше
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div
        className={styles.progressContainer}
        style={{ pointerEvents: "none" }}
        aria-hidden="true"
      >
        <div className={styles.progressBar} ref={progressBarRef}></div>
      </div>
    </section>
  );
}
