import React from "react";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectContent from "./ProjectContent";
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";

const getProjectQuery = (slugOrId) => {
  if (!slugOrId || slugOrId === "undefined") return null;
  if (mongoose.Types.ObjectId.isValid(slugOrId)) {
    return { $or: [{ slug: slugOrId }, { _id: slugOrId }] };
  }
  return { slug: slugOrId };
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const paramValue = resolvedParams.id || resolvedParams.slug;
  if (!paramValue || paramValue === "undefined")
    return { title: "Проєкт не знайдено" };

  await connectToDatabase();
  const query = getProjectQuery(paramValue);
  const project = query ? await Project.findOne(query) : null;

  if (!project) return { title: "Проєкт не знайдено" };

  return {
    title: `${project.title} | Реалізовані проєкти Vin Power Group`,
    description: project.shortDescription?.substring(0, 150) + "...",
    openGraph: { images: [project.mainImage] },
  };
}

export default async function ProjectDetailsPage({ params }) {
  const resolvedParams = await params;
  const paramValue = resolvedParams.id || resolvedParams.slug;

  if (!paramValue || paramValue === "undefined") {
    return (
      <div
        style={{
          paddingTop: "150px",
          textAlign: "center",
          color: "#64748b",
          minHeight: "100vh",
        }}
      >
        Невірне посилання 😕
      </div>
    );
  }

  await connectToDatabase();
  const query = getProjectQuery(paramValue);
  const projectDoc = query ? await Project.findOne(query) : null;

  if (!projectDoc) {
    return (
      <div
        style={{
          paddingTop: "150px",
          textAlign: "center",
          color: "#64748b",
          minHeight: "100vh",
        }}
      >
        Проєкт не знайдено 😕
      </div>
    );
  }

  // Передаємо чистий JSON у клієнтський компонент
  const project = JSON.parse(JSON.stringify(projectDoc));

  return (
    <>
      <ProjectContent project={project} />
    </>
  );
}
