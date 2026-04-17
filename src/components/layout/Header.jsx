"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import HeaderLogo from "./HeaderLogo";

export default function Header() {
  // Повертаємо простий стейт тільки для навігації
  const [pill, setPill] = useState({
    opacity: 0,
    left: 0,
    width: 0,
    isMoving: false,
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navList = [
    { name: "ПОСЛУГИ", link: "/services" },
    { name: "ПРО НАС", link: "/about" },
    { name: "РЕАЛІЗОВАНІ ПРОЄКТИ", link: "/projects" },
    { name: "КОНТАКТИ", link: "/contacts" },
    { name: "CПІВПРАЦЯ", link: "/cooperation" },
  ];

  const handleMouseEnter = (e) => {
    const { offsetLeft, offsetWidth } = e.currentTarget;
    setPill((prev) => ({
      opacity: 1,
      left: offsetLeft,
      width: offsetWidth,
      isMoving: prev.opacity !== 0,
    }));
  };

  const handleMouseLeave = () => {
    setPill((prev) => ({ ...prev, opacity: 0, isMoving: false }));
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <HeaderLogo closeMobileMenu={closeMobileMenu} />

        {/* НАВІГАЦІЯ (Тільки посилання) */}
        <nav className={styles.nav} onMouseLeave={handleMouseLeave}>
          <div
            className={styles.navPill}
            style={{
              left: `${pill.left}px`,
              width: `${pill.width}px`,
              opacity: pill.opacity,
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

        {/* ДЕСКТОПНІ КОНТРОЛИ (Лупа повернулася сюди!) */}
        <div className={styles.desktopControls}>
          <button className={styles.desktopSearchBtn} aria-label="Пошук">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <div className={styles.contactWrapper}>
            <button className={styles.contactBtn}>Зворотний зв'язок</button>
            <div className={styles.contactDropdown}>
              <div className={styles.dropdownGlass}></div>
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
              </div>
            </div>
          </div>
        </div>

        {/* МОБІЛЬНІ КОНТРОЛИ */}
        <div className={styles.mobileControls}>
          <a
            href="tel:+380670000000"
            className={styles.actionIconBtn}
            aria-label="Зателефонувати"
          >
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
          </a>

          <button className={styles.actionIconBtn} aria-label="Пошук">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <button
            className={`${styles.burgerBtn} ${isMobileMenuOpen ? styles.burgerOpen : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Меню"
          >
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </button>
        </div>
      </div>

      {/* МОБІЛЬНЕ МЕНЮ ... (без змін) */}
      <div
        className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOverlayOpen : ""}`}
      >
        <div className={styles.mobileMenuContent}>
          <nav className={styles.mobileNav}>
            {navList.map((item, i) => (
              <Link
                key={item.link}
                href={item.link}
                onClick={closeMobileMenu}
                style={{ transitionDelay: `${i * 0.05}s` }}
                className={isMobileMenuOpen ? styles.linkVisible : ""}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className={styles.mobileContacts}>
            <a href="tel:+380670000000">
              <span>+38 067 000 00 00</span>
            </a>
            <a href="mailto:info@vinpower.com.ua">
              <span>info@vinpower.com.ua</span>
            </a>
            <button className={styles.mobileContactBtn}>
              Зворотний зв'язок
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
