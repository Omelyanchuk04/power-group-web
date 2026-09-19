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

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const cleanId = resolvedParams.id.replace("(.)", "");

  await connectToDatabase();

  if (!mongoose.Types.ObjectId.isValid(cleanId))
    return { title: "Товар не знайдено" };

  const product = await CatalogItem.findById(cleanId);
  if (!product) return { title: "Товар не знайдено" };

  return {
    title: `${product.name} | Vin Power Group`,
    description: product.description?.substring(0, 150) + "...",
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const cleanId = resolvedParams.id.replace("(.)", "");

  await connectToDatabase();

  if (!mongoose.Types.ObjectId.isValid(cleanId)) {
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
        Невірний формат посилання на товар 😕
      </div>
    );
  }

  const productDoc = await CatalogItem.findById(cleanId);
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

  const activeSpecs = [];
  if (product.filters) {
    Object.keys(product.filters).forEach((key) => {
      if (product.filters[key]) {
        activeSpecs.push({
          label: FILTER_LABELS[key] || key,
          value: product.filters[key],
        });
      }
    });
  }

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
              {/* Apple-style Характеристики */}
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

              {/* Apple-style Опис */}
              {product.description && (
                <div className={styles.appleSection}>
                  <h3 className={styles.appleSectionTitle}>Опис</h3>
                  <div className={styles.appleSectionContent}>
                    <p className={styles.appleText}>{product.description}</p>
                  </div>
                </div>
              )}

              {/* Apple-style Документація */}
              {product.datasheetUrl && (
                <div className={styles.appleSection}>
                  <h3 className={styles.appleSectionTitle}>Комплектація</h3>
                  <div className={styles.appleSectionContent}>
                    <a
                      href={product.datasheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.appleDocLink}
                    >
                      <IconFileText />
                      <span>Завантажити Datasheet (PDF)</span>
                    </a>
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
