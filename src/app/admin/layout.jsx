"use client";

import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import GlobalBackground from "@/components/layout/GlobalBackground";
import Header from "@/components/layout/Header";
import styles from "./layout.module.scss";

// --- ІКОНКИ ---
const IconProjects = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const IconInbox = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
  </svg>
);

const IconExternal = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const IconCatalog = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // React 18 Transition API для фонової навігації
  const [isPending, startTransition] = useTransition();
  // Оптимістичний стан для миттєвої реакції інтерфейсу
  const [optimisticPath, setOptimisticPath] = useState(null);

  // Скидаємо оптимістичний стан, коли Next.js нарешті змінив реальний шлях
  useEffect(() => {
    setOptimisticPath(null);
  }, [pathname]);

  const handleNavigation = (e, path) => {
    e.preventDefault(); // Забороняємо Next.js робити стандартний блокуючий перехід

    if (pathname === path || pathname.startsWith(path + "/")) return;

    // 1. Миттєво підсвічуємо кнопку (0 мс затримки)
    setOptimisticPath(path);

    // 2. Запускаємо перехід як неприорітетне фонове завдання
    startTransition(() => {
      router.push(path);
    });
  };

  // Визначаємо, який шлях зараз показувати як активний
  const currentPath = optimisticPath || pathname;

  return (
    <div className={styles.dashboardWrapper}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundColor: "#f9fafb",
        }}
      >
        <GlobalBackground isLayout={false} />
      </div>
      <div className={styles.mobileClientHeader}>
        <Header />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          width: "100%",
          flexDirection: "inherit",
        }}
      >
        <aside className={styles.sidebar}>
          <div className={styles.brand}>
            <img
              src="/logo.svg"
              alt="Vin Power"
              className={styles.logoDesktop}
            />
          </div>
          <div className={styles.navContainer}>
            <Link
              href="/admin/leads"
              onClick={(e) => handleNavigation(e, "/admin/leads")}
              className={`${styles.navBtn} ${currentPath.includes("/admin/leads") ? styles.active : ""}`}
            >
              <IconInbox /> <span>Заявки</span>
            </Link>

            <Link
              href="/admin/projects"
              onClick={(e) => handleNavigation(e, "/admin/projects")}
              className={`${styles.navBtn} ${currentPath.includes("/admin/projects") ? styles.active : ""}`}
            >
              <IconProjects /> <span>Усі проєкти</span>
            </Link>

            <Link
              href="/admin/catalog"
              onClick={(e) => handleNavigation(e, "/admin/catalog")}
              className={`${styles.navBtn} ${currentPath.includes("/admin/catalog") ? styles.active : ""}`}
            >
              <IconCatalog /> <span>Каталог обладнання</span>
            </Link>
          </div>

          <div className={styles.sidebarFooter}>
            <Link href="/" className={styles.navBtn}>
              <IconExternal /> <span>Клієнтський сайт</span>
            </Link>
          </div>
        </aside>

        {/* Контент плавно реагує на фоновий перехід, але не зникає */}
        <main
          className={styles.mainContent}
          style={{
            opacity: isPending ? 0.6 : 1,
            pointerEvents: isPending ? "none" : "auto",
            transition: "opacity 0.2s ease",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
