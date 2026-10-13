import React from "react";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectContent from "./ProjectContent";
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";

import styles from "./ProjectDetails.module.scss";

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
    return { title: "Проєкт не знайдено | ВІН ПАУЕР ГРУП" };

  await connectToDatabase();
  const query = getProjectQuery(paramValue);
  const project = query ? await Project.findOne(query) : null;

  if (!project) return { title: "Проєкт не знайдено | ВІН ПАУЕР ГРУП" };

  const projectUrl = `https://vinpowergroup.com/projects/${paramValue}`;
  const shortDescription = project.shortDescription
    ? project.shortDescription.substring(0, 150) + "..."
    : `Реалізований проєкт: ${project.title}. Дізнайтеся більше про рішення від ВІН ПАУЕР ГРУП.`;

  return {
    title: `${project.title} | Реалізовані проєкти ВІН ПАУЕР ГРУП`,
    description: shortDescription,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      title: `${project.title} | ВІН ПАУЕР ГРУП`,
      description: shortDescription,
      url: projectUrl,
      type: "article",
      images: project.mainImage
        ? [{ url: project.mainImage, alt: project.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: shortDescription,
      images: project.mainImage ? [project.mainImage] : [],
    },
  };
}

export default async function ProjectDetailsPage({ params }) {
  const resolvedParams = await params;
  const paramValue = resolvedParams.id || resolvedParams.slug;

  if (!paramValue || paramValue === "undefined") {
    return (
      <div className={styles.notFoundWrapper} role="alert">
        Невірне посилання 😕
      </div>
    );
  }

  await connectToDatabase();
  const query = getProjectQuery(paramValue);
  const projectDoc = query ? await Project.findOne(query) : null;

  if (!projectDoc) {
    return (
      <div className={styles.notFoundWrapper} role="alert">
        Проєкт не знайдено 😕
      </div>
    );
  }

  const project = JSON.parse(JSON.stringify(projectDoc));

  const schemaMarkup = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.shortDescription || project.description,
      image: project.mainImage,
      url: `https://vinpowergroup.com/projects/${paramValue}`,
      author: {
        "@type": "Organization",
        name: "ВІН ПАУЕР ГРУП",
      },
      datePublished: project.date || project.createdAt,
      contentLocation: {
        "@type": "Place",
        name: project.client || "Україна",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Головна",
          item: "https://vinpowergroup.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Реалізовані проєкти",
          item: "https://vinpowergroup.com/projects",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <ProjectContent project={project} />
      <ContactCTA />
    </>
  );
}
