import React from "react";
import ProjectsHero from "./components/ProjectsHero/ProjectsHero"; // розкоментуєш, коли буде готово
import ProjectsGrid from "./components/ProjectsGrid/ProjectsGrid";
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";
import GlobalBackground from "@/components/layout/GlobalBackground";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";

import styles from "./projects.module.scss";

export const revalidate = 60; // Next.js оновлюватиме кеш сторінки кожні 60 секунд

// 🔥 ДОДАНО: Статичні метадані для SEO та соцмереж
export const metadata = {
  title: "Реалізовані проєкти | ВІН ПАУЕР ГРУП",
  description:
    "Портфоліо реалізованих об'єктів ВІН ПАУЕР ГРУП: промислові та приватні сонячні електростанції, системи накопичення енергії та електромонтажні роботи.",
  alternates: {
    canonical: "https://vinpowergroup.com/projects",
  },
  openGraph: {
    title: "Реалізовані проєкти | ВІН ПАУЕР ГРУП",
    description:
      "Ознайомтеся з нашим досвідом. Сонячні станції та електромонтажні роботи для бізнесу та приватних клієнтів.",
    url: "https://vinpowergroup.com/projects",
    type: "website",
  },
};

// Функція для отримання даних напряму з MongoDB
async function getProjects() {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Помилка завантаження проєктів:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  // Завантажуємо реальні проєкти з бази
  const dbProjects = await getProjects();

  // 🔥 ДОДАНО: Мікророзмітка CollectionPage (портфоліо) з переліком об'єктів
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Реалізовані проєкти | ВІН ПАУЕР ГРУП",
    description: "Портфоліо реалізованих об'єктів ВІН ПАУЕР ГРУП.",
    url: "https://vinpowergroup.com/projects",
    // Передаємо перші 10 проєктів для базового контексту пошуковика
    hasPart: dbProjects.slice(0, 10).map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: project.title,
      description: project.shortDescription || project.description,
      image: project.mainImage,
      datePublished: project.date,
    })),
  };

  return (
    <main className={styles.projectsPageMain}>
      {/* Ін'єкція мікророзмітки */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />

      <div className={styles.projectsContentWrapper}>
        <div className={styles.projectsBgWrapper} aria-hidden="true">
          <GlobalBackground isLayout={false} />
        </div>

        {/* <ProjectsHero /> */}
        <ProjectsGrid initialProjects={dbProjects} />

        <ContactCTA />
      </div>
    </main>
  );
}
