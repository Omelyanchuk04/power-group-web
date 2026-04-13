"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./Header.module.scss";

export default function Header() {
  // Додали isMoving для керування логікою анімації пігулки
  const [pill, setPill] = useState({
    opacity: 0,
    left: 0,
    width: 0,
    isMoving: false,
  });

  const navList = [
    { name: "ПОСЛУГИ", link: "/services" },
    { name: "ПРО НАС", link: "/about" },
    { name: "РЕАЛІЗОВАНІ ПРОЄКТИ", link: "/projects" },
    { name: "КОНТАКТИ", link: "/contacts" },
    { name: "CПІВПРАЦЯ", link: "/cooperation" },
  ];

  const handleMouseEnter = (e) => {
    const { offsetLeft, offsetWidth } = e.currentTarget;

    setPill((prev) => {
      // Якщо пігулки не було на екрані - з'являємось миттєво без анімації руху
      if (prev.opacity === 0) {
        return {
          opacity: 1,
          left: offsetLeft,
          width: offsetWidth,
          isMoving: false,
        };
      }
      // Якщо вона вже там - плавно перепливаємо
      return {
        opacity: 1,
        left: offsetLeft,
        width: offsetWidth,
        isMoving: true,
      };
    });
  };

  const handleMouseLeave = () => {
    setPill((prev) => ({ ...prev, opacity: 0, isMoving: false }));
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="ВІН ПАУЕР ГРУП логотип"
              width={200}
              height={43}
              priority
              className={styles.logoImage}
            />
          </Link>
        </div>

        <nav className={styles.nav} onMouseLeave={handleMouseLeave}>
          <div
            className={styles.navPill}
            style={{
              left: `${pill.left}px`,
              width: `${pill.width}px`,
              opacity: pill.opacity,
              // Ключова зміна: React сам вирішує, коли вмикати плавний рух
              transition: pill.isMoving
                ? "left 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease"
                : "opacity 0.3s ease",
            }}
          />

          {navList.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              onMouseEnter={handleMouseEnter}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className={styles.contactWrapper}>
          <button className={styles.contactBtn}>Зворотний зв'язок</button>

          <div className={styles.contactDropdown}>
            {/* Фізичний шар скла */}
            <div className={styles.dropdownGlass}></div>

            {/* Шар з контентом */}
            <div className={styles.dropdownContent}>
              <a href="tel:+380670000000" className={styles.dropdownLink}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+38 067 000 00 00</span>
              </a>

              <a
                href="mailto:info@vinpower.com.ua"
                className={styles.dropdownLink}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>info@vinpower.com.ua</span>
              </a>

              <div className={styles.dropdownInfo}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Пн-Пт: 09:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
