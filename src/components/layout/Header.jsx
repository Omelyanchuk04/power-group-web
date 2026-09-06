"use client";
import { useModal } from "@/context/ModalContext";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import HeaderLogo from "./HeaderLogo";

// --- SVG Іконки ---
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21.43 3.61a1.23 1.23 0 0 0-1-.38 1.48 1.48 0 0 0-.64.16c-1.11.45-16.7 6.91-17.76 7.37a1.44 1.44 0 0 0-.75 1.76c.19.65.75 1.14 1.44 1.34l3.86 1.2c.16.51.35 1.05.51 1.57.51 1.63 1.09 3.49 1.15 3.65a1.4 1.4 0 0 0 .56.76.7.7 0 0 0 .19.09l.06.02a1.35 1.35 0 0 0 .61.12 1.41 1.41 0 0 0 1-.41l2.42-2.19 3.52 2.6c.36.27.78.41 1.21.41a1.4 1.4 0 0 0 1.28-1l3.12-14.73a1.43 1.43 0 0 0-.48-1.25Zm-3.1 13.06-4.66-3.44a1.2 1.2 0 0 0-1.46-.02l-2.58 2.33-.86-2.73a1.2 1.2 0 0 0-.72-.78l-3.32-1.03 15.63-6.49-2.03 12.16Z"
      fill="currentColor"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 448 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 448 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
);

const ClockIcon = () => (
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
);

const MapPinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// 🔥 Універсальний компонент вмісту дропдауну
const ContactDropdownContent = ({ onOpenModal }) => (
  <>
    <div className={styles.dropdownGlass}></div>
    <div className={styles.dropdownContent}>
      {/* Телефони */}
      <a href="tel:+380672671477" className={styles.dropdownLink}>
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
        <span>+38 067 267 14 77</span>
      </a>
      <a href="tel:+380992671477" className={styles.dropdownLink}>
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
        <span>+38 099 267 14 77</span>
      </a>

      {/* Пошта */}
      <a href="mailto:powergroup.vin@gmail.com" className={styles.dropdownLink}>
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
        <span>powergroup.vin@gmail.com</span>
      </a>

      {/* Графік роботи */}
      <div className={styles.dropdownText}>
        <ClockIcon />
        <div className={styles.scheduleBlock}>
          <span>Пн-Пт: 8:30 - 17:30</span>
          <span className={styles.weekendText}>Сб-Нд: Вихідні</span>
        </div>
      </div>

      {/* Локація */}
      <div className={styles.dropdownText}>
        <MapPinIcon />
        <div className={styles.scheduleBlock}>
          <span>м. Вінниця, вул. Київська, 14</span>
        </div>
      </div>

      {/* Соцмережі */}
      <div className={styles.dropdownSocials}>
        <a
          href="https://t.me/+380672671477"
          target="_blank"
          rel="noreferrer"
          className={`${styles.socialIcon} ${styles.telegram}`}
          aria-label="Telegram (067)"
        >
          <TelegramIcon />
        </a>
        <a
          href="https://t.me/+380992671477"
          target="_blank"
          rel="noreferrer"
          className={`${styles.socialIcon} ${styles.telegram}`}
          aria-label="Telegram (099)"
        >
          <TelegramIcon />
        </a>
        <a
          href="https://wa.me/380672671477"
          target="_blank"
          rel="noreferrer"
          className={`${styles.socialIcon} ${styles.whatsapp}`}
          aria-label="WhatsApp"
        >
          <WhatsAppIcon />
        </a>
        <a
          href="https://www.instagram.com/power_group.vn?stkn=bHgwcjBxdGV3YzMx"
          target="_blank"
          rel="noreferrer"
          className={`${styles.socialIcon} ${styles.instagram}`}
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
      </div>

      {/* Кнопка "Отримати консультацію" */}
      <button className={styles.dropdownContactBtn} onClick={onOpenModal}>
        Отримати консультацію
      </button>
    </div>
  </>
);

export default function Header() {
  const [pill, setPill] = useState({
    opacity: 0,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    isMoving: false,
  });
  const { openModal } = useModal();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileContactOpen, setIsMobileContactOpen] = useState(false);

  const searchInputRef = useRef(null);
  const mobileContactRef = useRef(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileContactRef.current &&
        !mobileContactRef.current.contains(event.target)
      ) {
        setIsMobileContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navList = [
    { name: "ПОСЛУГИ", link: "/services" },
    { name: "ПРО НАС", link: "/about" },
    { name: "РЕАЛІЗОВАНІ ПРОЄКТИ", link: "/projects" },
    { name: "КОНТАКТИ", link: "/contacts" },
  ];

  const handleMouseEnter = (e) => {
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } =
      e.currentTarget;
    setPill((prev) => ({
      opacity: 1,
      left: offsetLeft,
      top: offsetTop,
      width: offsetWidth,
      height: offsetHeight,
      isMoving: prev.opacity !== 0,
    }));
  };

  const handleMouseLeave = () =>
    setPill((prev) => ({ ...prev, opacity: 0, isMoving: false }));

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileContactOpen(false);
  };

  const handleOpenModal = () => {
    openModal();
    setIsMobileContactOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        {/* БУРГЕР-МЕНЮ */}
        <button
          className={`${styles.burgerBtn} ${isMobileMenuOpen ? styles.burgerOpen : ""}`}
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            setIsMobileContactOpen(false);
          }}
          aria-label="Меню"
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>

        {/* ЛОГОТИП */}
        <HeaderLogo closeMobileMenu={closeMobileMenu} />

        {/* НАВІГАЦІЯ ДЛЯ ДЕСКТОПУ */}
        <nav className={styles.nav} onMouseLeave={handleMouseLeave}>
          <div
            className={styles.navPill}
            style={{
              left: `${pill.left}px`,
              top: `${pill.top}px`,
              width: `${pill.width}px`,
              height: `${pill.height}px`,
              opacity: pill.opacity,
              transition: pill.isMoving
                ? "left 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease"
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

        {/* КОНТРОЛИ ДЛЯ ДЕСКТОПУ */}
        <div className={styles.desktopControls}>
          <button
            className={styles.desktopSearchBtn}
            aria-label="Відкрити пошук"
            onClick={() => setIsSearchOpen(true)}
          >
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

          <div
            className={styles.contactWrapper}
            style={{ pointerEvents: isSearchOpen ? "none" : "auto" }}
          >
            <button className={styles.contactBtn} onClick={openModal}>
              Зворотний зв'язок
            </button>

            {/* Десктопний дропдаун */}
            <div className={styles.contactDropdown}>
              <ContactDropdownContent onOpenModal={openModal} />
            </div>
          </div>
        </div>

        {/* КОНТРОЛИ ДЛЯ МОБІЛЬНОГО */}
        <div className={styles.mobileControls}>
          <div className={styles.mobileContactWrapper} ref={mobileContactRef}>
            <button
              className={`${styles.actionIconBtn} ${styles.mobilePhoneBtn} ${isMobileContactOpen ? styles.active : ""}`}
              aria-label="Контакти"
              onClick={() => {
                setIsMobileContactOpen(!isMobileContactOpen);
                setIsSearchOpen(false);
              }}
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
              <ChevronDownIcon />
            </button>

            {/* Мобільний дропдаун */}
            <div
              className={`${styles.contactDropdown} ${isMobileContactOpen ? styles.open : ""}`}
            >
              <ContactDropdownContent onOpenModal={handleOpenModal} />
            </div>
          </div>

          <button
            className={styles.actionIconBtn}
            aria-label="Відкрити пошук"
            onClick={() => {
              setIsSearchOpen(true);
              setIsMobileContactOpen(false);
            }}
          >
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
        </div>

        {/* БЛОК ПОШУКУ */}
        <div
          className={`${styles.searchContainer} ${isSearchOpen ? styles.searchOpen : ""}`}
        >
          <svg
            className={styles.searchIconInside}
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
          <input
            type="text"
            placeholder="Шукати на сайті..."
            className={styles.searchInput}
            ref={searchInputRef}
          />
          <button className={styles.searchSubmitBtn} aria-label="Знайти">
            Пошук
          </button>
          <button
            className={styles.searchCloseBtn}
            aria-label="Закрити пошук"
            onClick={() => setIsSearchOpen(false)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* МОБІЛЬНЕ МЕНЮ (Бургер) */}
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
            <a href="tel:+380672671477">
              <span>+38 067 267 14 77</span>
            </a>
            <a href="tel:+380992671477">
              <span>+38 099 267 14 77</span>
            </a>
            <a href="mailto:powergroup.vin@gmail.com">
              <span>powergroup.vin@gmail.com</span>
            </a>

            <div className={styles.mobileSchedule}>
              <p>м. Вінниця, вул. Київська, 14</p>
              <p>Пн-Пт: 8:30 - 17:30</p>
            </div>

            <div className={styles.mobileSocials}>
              <a
                href="https://t.me/+380672671477"
                target="_blank"
                rel="noreferrer"
                className={`${styles.socialIcon} ${styles.telegram}`}
              >
                <TelegramIcon />
              </a>
              <a
                href="https://t.me/+380992671477"
                target="_blank"
                rel="noreferrer"
                className={`${styles.socialIcon} ${styles.telegram}`}
              >
                <TelegramIcon />
              </a>
              <a
                href="https://wa.me/380672671477"
                target="_blank"
                rel="noreferrer"
                className={`${styles.socialIcon} ${styles.whatsapp}`}
              >
                <WhatsAppIcon />
              </a>
              <a
                href="https://www.instagram.com/power_group.vn?stkn=bHgwcjBxdGV3YzMx"
                target="_blank"
                rel="noreferrer"
                className={`${styles.socialIcon} ${styles.instagram}`}
              >
                <InstagramIcon />
              </a>
            </div>

            <button
              className={styles.mobileContactBtn}
              onClick={() => {
                openModal();
                closeMobileMenu();
              }}
            >
              Отримати консультацію
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
