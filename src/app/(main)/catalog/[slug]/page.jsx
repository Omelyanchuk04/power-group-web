import React from "react";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import CatalogItem from "@/models/CatalogItem";
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

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slugParam = resolvedParams.slug;

  await connectToDatabase();

  const product = await CatalogItem.findOne(getProductQuery(slugParam));
  if (!product) return { title: "Товар не знайдено" };

  return {
    title: `${product.name} | Vin Power Group`,
    description: product.description?.substring(0, 150) + "...",
    openGraph: { images: [product.image] },
  };
}

// Словник перекладів для характеристик
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

// Конфігурація характеристик для кожної категорії (як в адмінці)
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

  // Формуємо список тільки з тих полів, які належать категорії
  const activeSpecs = [];
  const categoryKeys = CATEGORY_CONFIG[product.category] || [];

  categoryKeys.forEach((key) => {
    const val = product.filters?.[key];
    // Якщо значення є і воно не "Не обрано", показуємо його. Якщо порожнє — ставимо красивий прочерк
    const displayValue =
      val && val.trim() !== "" && val !== "Не обрано" ? val : "—";

    activeSpecs.push({
      label: FILTER_LABELS[key] || key,
      value: displayValue,
    });
  });

  return (
    <main className={styles.pageContainer}>
      <div className={styles.bgWrapper}>
        <div className={styles.bgFade}>
          <GlobalBackground />
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <BackButton />

        <div className={styles.layoutFlex}>
          <div className={styles.leftStickyCol}>
            <ProductImageGallery
              images={imagesList}
              altText={product.name}
              wrapperClass={styles.imageCard}
            />
          </div>

          <div className={styles.rightContentCol}>
            <div className={styles.headerBlock}>
              <span className={styles.categoryText}>{product.category}</span>
              <h1 className={styles.title}>{product.name}</h1>
            </div>

            <div className={styles.ctaWrapper}>
              <ConsultButton />
            </div>

            <div className={styles.appleInfoContainer}>
              {activeSpecs.length > 0 && (
                <div className={styles.appleSection}>
                  <h3 className={styles.appleSectionTitle}>Характеристики</h3>
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
                </div>
              )}

              {product.description && (
                <div className={styles.appleSection}>
                  <h3 className={styles.appleSectionTitle}>Опис</h3>
                  <div className={styles.appleSectionContent}>
                    <p className={styles.appleText}>{product.description}</p>
                  </div>
                </div>
              )}

              {/* 🔥 ДОКУМЕНТАЦІЯ ТА ФАЙЛИ 🔥 */}
              {(product.datasheetUrl ||
                (product.documents && product.documents.length > 0)) && (
                <div className={styles.appleSection}>
                  <h3 className={styles.appleSectionTitle}>Документація</h3>
                  <div className={styles.appleSectionContent}>
                    <div className={styles.docsWrapper}>
                      {/* Вивід старого одиночного файлу (якщо є) */}
                      {product.datasheetUrl && (
                        <a
                          href={product.datasheetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.appleDocLink}
                        >
                          <IconFileText />
                          <span>Завантажити Datasheet (PDF)</span>
                        </a>
                      )}

                      {/* Вивід нового масиву файлів */}
                      {product.documents &&
                        product.documents.map((doc, idx) => (
                          <a
                            key={idx}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.appleDocLink}
                          >
                            <IconFileText />
                            <span>{doc.title} (PDF)</span>
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
