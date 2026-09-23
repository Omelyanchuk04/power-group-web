"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GlobalBackground from "@/components/layout/GlobalBackground";
import styles from "./SearchPage.module.scss";

// Внутрішній компонент, який використовує useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results);
        }
      } catch (error) {
        console.error("Помилка при завантаженні результатів:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Результати пошуку</h1>
        {query ? (
          <p>
            За запитом <strong>«{query}»</strong> знайдено {results.length}{" "}
            результатів
          </p>
        ) : (
          <p>Введіть пошуковий запит у меню вище</p>
        )}
      </div>

      {isLoading ? (
        <div className={styles.loadingState}>Шукаємо...</div>
      ) : results.length > 0 ? (
        <div className={styles.simpleGrid}>
          {results.map((item) => {
            const targetUrl = `/${item.type === "catalog" ? "catalog" : "projects"}/${item.slug || item._id}`;
            const isCatalog = item.type === "catalog";

            return (
              <Link
                href={targetUrl}
                key={item._id}
                style={{ textDecoration: "none" }}
              >
                <div className={styles.projectCard}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={item.image}
                      alt={item.title}
                      // Замість дорогих інлайн-ефектів використовуємо прості класи
                      className={`${styles.img} ${isCatalog ? styles.imgCatalog : styles.imgProject}`}
                    />

                    {/* Плашки без блюру та без прозорості */}
                    <div className={styles.tags}>
                      <span className={styles.tagPower}>
                        {isCatalog ? "Товар" : "Проєкт"}
                      </span>
                      <span className={styles.tagClient}>{item.category}</span>
                    </div>
                  </div>

                  <div className={styles.cardInfo}>
                    <div className={styles.cardText}>
                      <h4>{item.title}</h4>
                    </div>
                    <div className={styles.arrowBtn}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className={styles.noResults}>
          <h3>Нічого не знайдено</h3>
          <p>Спробуйте змінити слова пошуку або перевірте орфографію.</p>
        </div>
      )}
    </div>
  );
}

// ГОЛОВНИЙ КОМПОНЕНТ
export default function SearchPage() {
  return (
    <section className={styles.gridSection}>
      <GlobalBackground />
      <Suspense
        fallback={
          <div className={styles.loadingState}>Завантаження пошуку...</div>
        }
      >
        <SearchContent />
      </Suspense>
    </section>
  );
}
