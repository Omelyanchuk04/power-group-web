import React from "react";
import ProjectsHero from "./components/ProjectsHero/ProjectsHero"; // розкоментуєш, коли буде готово
import ProjectsGrid from "./components/ProjectsGrid/ProjectsGrid";
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";
import GlobalBackground from "@/components/layout/GlobalBackground";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";

export const revalidate = 60; // Next.js оновлюватиме кеш сторінки кожні 60 секунд

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

  return (
    <main
      style={{
        position: "relative",
        width: "100%",
        overflowY: "visible",
        overflowX: "clip",
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          overflow: "visible",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "-1200px",
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          <GlobalBackground isLayout={false} />
        </div>

        {/* Передаємо завантажені проєкти у компонент сітки */}
        {/* <ProjectsHero /> */}
        <ProjectsGrid initialProjects={dbProjects} />

        <ContactCTA />
      </div>
    </main>
  );
}
