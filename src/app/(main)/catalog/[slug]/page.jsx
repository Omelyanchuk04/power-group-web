import React from "react";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import CatalogItem from "@/models/CatalogItem";
import ContactCTA from "@/components/shared/ContactCTA/ContactCTA";

import styles from "./page.module.scss";

import { BackButton, ConsultButton } from "./ProductClientButtons";
import ProductImageGallery from "./ProductImageGallery";
import GlobalBackground from "@/components/layout/GlobalBackground";

const IconFileText = () => (
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
    focusable="false"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const getProductQuery = (slugOrId) => {
  if (mongoose.Types.ObjectId.isValid(slugOrId)) {
    return { $or: [{ slug: slugOrId }, { _id: slugOrId }] };
  }
  return { slug: slugOrId };
};

// 🔥 ОНОВЛЕНО: Розширена мета-інформація для SEO та соцмереж
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slugParam = resolvedParams.slug;

  await connectToDatabase();

  const product = await CatalogItem.findOne(getProductQuery(slugParam));
  if (!product) return { title: "Товар не знайдено | ВІН ПАУЕР ГРУП" };

  const productUrl = `https://vinpowergroup.com/catalog/${slugParam}`;
  const shortDescription = product.description
    ? product.description.substring(0, 150) + "..."
    : `Замовити ${product.name} від ВІН ПАУЕР ГРУП. Обладнання для сонячних електростанцій.`;

  return {
    title: `${product.name} | ВІН ПАУЕР ГРУП`,
    description: shortDescription,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: product.name,
      description: shortDescription,
      url: productUrl,
      // 🔥 ВИПРАВЛЕНО: Next.js офіційно підтримує "website" або "article". "product" викликає помилку.
      type: "website",
      images: product.image ? [{ url: product.image, alt: product.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: shortDescription,
      images: product.image ? [product.image] : [],
    },
  };
}

const FILTER_LABELS = {
  brand: "Виробник (бренд)",
  power: "Потужність",
  dimensions: "Габарити",
  phase: "Кількість фаз",
  type: "Тип",
  executionType: "Тип виконання",
  subcategory: "Підкатегорія (розділ)",
  batteryType: "Тип батареї",
};

const CATEGORY_CONFIG = {
  "Сонячні панелі": ["brand", "power", "dimensions"],
  "Гібридні інвертори": ["brand", "phase", "type", "power"],
  "Мережеві інвертори": ["brand", "phase", "power"],
  Акумулятори: ["brand", "batteryType"],
  "Системи накопичення": ["brand"],
  "Силове обладнання для сонячних електростанцій": ["executionType", "power"],
  "Комплектуючі для монтажу": ["subcategory"],
};

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const slugParam = resolvedParams.slug;

  await connectToDatabase();

  const productDoc = await CatalogItem.findOne(getProductQuery(slugParam));

  if (!productDoc) {
    return (
      <div
        style={{
          paddingTop: "150px",
          textAlign: "center",
          fontSize: "20px",
          color: "#64748b",
          minHeight: "100vh",
        }}
        role="alert"
      >
        Товар не знайдено 😕
      </div>
    );
  }

  const product = JSON.parse(JSON.stringify(productDoc));

  const imagesList = [];
  if (product.image) imagesList.push(product.image);
  if (product.gallery && Array.isArray(product.gallery)) {
    product.gallery.forEach((img) => {
      if (img && img !== product.image) imagesList.push(img);
    });
  }
  if (imagesList.length === 0) imagesList.push("/placeholder.jpg");

  const activeSpecs = [];
  const categoryKeys = CATEGORY_CONFIG[product.category] || [];

  categoryKeys.forEach((key) => {
    const val = product.filters?.[key];
    const displayValue =
      val && val.trim() !== "" && val !== "Не обрано" ? val : "—";
    activeSpecs.push({
      label: FILTER_LABELS[key] || key,
      value: displayValue,
    });
  });

  const brandName = product.filters?.brand || "ВІН ПАУЕР ГРУП";

  // 🔥 ДОДАНО: JSON-LD розмітка товару (Product) та структури (BreadcrumbList)
  const schemaMarkup = [
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      image: imagesList,
      description: product.description || `Замовити ${product.name}`,
      brand: {
        "@type": "Brand",
        name: brandName,
      },
      category: product.category,
      url: `https://vinpowergroup.com/catalog/${slugParam}`,
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
          name: "Каталог",
          item: "https://vinpowergroup.com/catalog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: product.name,
        },
      ],
    },
  ];

  return (
    <main className={styles.pageContainer}>
      {/* Ін'єкція мікророзмітки */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className={styles.bgWrapper} aria-hidden="true">
        <div className={styles.bgFade}>
          <GlobalBackground />
        </div>
      </div>

      <article className={styles.contentWrapper}>
        <BackButton />

        <div className={styles.layoutFlex}>
          <div className={styles.leftStickyCol}>
            {/* Alt-текст буде передано всередину галереї */}
            <ProductImageGallery
              images={imagesList}
              altText={`Фото товару: ${product.name}`}
              wrapperClass={styles.imageCard}
            />
          </div>

          <div className={styles.rightContentCol}>
            <header className={styles.headerBlock}>
              <span className={styles.categoryText}>{product.category}</span>
              <h1 className={styles.title}>{product.name}</h1>
            </header>

            <div className={styles.ctaWrapper}>
              <ConsultButton />
            </div>

            <div className={styles.appleInfoContainer}>
              {activeSpecs.length > 0 && (
                <section
                  className={styles.appleSection}
                  aria-labelledby="specs-heading"
                >
                  <h2 id="specs-heading" className={styles.appleSectionTitle}>
                    Характеристики
                  </h2>
                  <div className={styles.appleSectionContent}>
                    <div className={styles.appleSpecsList}>
                      {activeSpecs.map((spec, index) => (
                        <div key={index} className={styles.appleSpecRow}>
                          <span className={styles.appleSpecLabel}>
                            {spec.label}
                          </span>
                          <span className={styles.appleSpecValue}>
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {product.description && (
                <section
                  className={styles.appleSection}
                  aria-labelledby="desc-heading"
                >
                  <h2 id="desc-heading" className={styles.appleSectionTitle}>
                    Опис
                  </h2>
                  <div className={styles.appleSectionContent}>
                    <p className={styles.appleText}>{product.description}</p>
                  </div>
                </section>
              )}

              {/* ДОКУМЕНТАЦІЯ */}
              {(product.datasheetUrl ||
                (product.documents && product.documents.length > 0)) && (
                <section
                  className={styles.appleSection}
                  aria-labelledby="docs-heading"
                >
                  <h2 id="docs-heading" className={styles.appleSectionTitle}>
                    Документація
                  </h2>
                  <div className={styles.appleSectionContent}>
                    <div className={styles.docsWrapper}>
                      {product.datasheetUrl && (
                        <a
                          href={product.datasheetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.appleDocLink}
                          aria-label={`Завантажити Datasheet для ${product.name} у форматі PDF`}
                        >
                          <IconFileText />
                          <span>Завантажити Datasheet (PDF)</span>
                        </a>
                      )}

                      {product.documents &&
                        product.documents.map((doc, idx) => (
                          <a
                            key={idx}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.appleDocLink}
                            aria-label={`Завантажити ${doc.title} у форматі PDF`}
                          >
                            <IconFileText />
                            <span>{doc.title} (PDF)</span>
                          </a>
                        ))}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </article>

      <ContactCTA />
    </main>
  );
}
