"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // 🔥 ДОДАНО: хук для перевірки сторінки
import styles from "./Footer.module.scss";
import { useModal } from "@/context/ModalContext";
import GlobalBackground from "@/components/layout/GlobalBackground"; // 🔥 ДОДАНО: імпорт фону

export default function Footer() {
  const { openModal } = useModal();
  const pathname = usePathname(); // 🔥 Отримуємо поточний шлях
  const currentYear = new Date().getFullYear();

  // 🔥 Перевіряємо, чи ми зараз на Головній сторінці
  const isHome = pathname === "/";

  // --- Оригінальні SVG Іконки ---
  const TelegramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.43 3.61a1.23 1.23 0 0 0-1-.38 1.48 1.48 0 0 0-.64.16c-1.11.45-16.7 6.91-17.76 7.37a1.44 1.44 0 0 0-.75 1.76c.19.65.75 1.14 1.44 1.34l3.86 1.2c.16.51.35 1.05.51 1.57.51 1.63 1.09 3.49 1.15 3.65a1.4 1.4 0 0 0 .56.76.7.7 0 0 0 .19.09l.06.02a1.35 1.35 0 0 0 .61.12 1.41 1.41 0 0 0 1-.41l2.42-2.19 3.52 2.6c.36.27.78.41 1.21.41a1.4 1.4 0 0 0 1.28-1l3.12-14.73a1.43 1.43 0 0 0-.48-1.25Zm-3.1 13.06-4.66-3.44a1.2 1.2 0 0 0-1.46-.02l-2.58 2.33-.86-2.73a1.2 1.2 0 0 0-.72-.78l-3.32-1.03 15.63-6.49-2.03 12.16Z"
        fill="currentColor"
      />
    </svg>
  );

  const ViberIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.33 13.04a3.11 3.11 0 0 1-.9-2.12c0-1-.35-1.92-1-2.6a4.43 4.43 0 0 0-3.33-1.45 4.54 4.54 0 0 0-3.4 1.48c-.68.7-.99 1.61-.99 2.6 0 .8.3 1.5.87 2.06a3 3 0 0 1 .91 2.14c0 1.18.5 2.25 1.38 3 1 .84 2.27 1.26 3.57 1.26a5 5 0 0 0 3.61-1.34 4.2 4.2 0 0 0 1.3-2.98c0-.36-.07-.7-.2-1.05Zm-1.8 3.52a3.12 3.12 0 0 1-2.26.84c-.81 0-1.6-.26-2.22-.76a3.1 3.1 0 0 1-1-2.04 4.6 4.6 0 0 0-1.3-3c-.34-.33-.51-.73-.51-1.18 0-.58.19-1.1.56-1.5.5-.53 1.2-.82 1.95-.82s1.43.29 1.93.81c.36.38.56.9.56 1.48 0 .8.34 1.51.98 2a4.4 4.4 0 0 0 2.94 1.07.7.7 0 0 1 .37.11 1 1 0 0 1 .4.78c0 .87-.33 1.63-.9 2.22Z"
        fill="currentColor"
      />
      <path
        d="M12.72 13.43a.75.75 0 0 0 1.06 0L17.5 9.7a3.5 3.5 0 0 0-4.95 0 .75.75 0 0 0 0 1.06.75.75 0 0 0 1.06 0 2 2 0 0 1 2.83 0L12.72 12.37a.75.75 0 0 0 0 1.06Z"
        fill="currentColor"
      />
      <path
        d="M21.23 2.77a1 1 0 0 0-1 0c-1.14.65-21 12.14-20 13.43.34.45.89.73 1.51.73H3.6a14.2 14.2 0 0 0 .56 1.77A1.43 1.43 0 0 0 5.4 20h2a1.3 1.3 0 0 0 1.09-.59 13.2 13.2 0 0 0 .62-1.74h6.8c.23.63.43 1.2.6 1.74a1.3 1.3 0 0 0 1.1.59h2a1.43 1.43 0 0 0 1.25-1.28c.11-.6.31-1.2.53-1.77h1.1a2 2 0 0 0 2-2V4.7a2 2 0 0 0-2-2Zm-13.6 15.6-1-2.37h9.8l-1 2.37H7.63Zm11.77-1.37h-.8a24.2 24.2 0 0 1-.58 1.77H16.2a18.2 18.2 0 0 1-.56-1.77H8.3a20 20 0 0 1-.5 1.77H6.03a27.2 27.2 0 0 1-.53-1.77h-.73c-.5 0-.81-.17-.93-.38-.2-.36 3.13-2.3 16.14-9.8a3.11 3.11 0 0 1 .86 1.3v8.1c0 .26-.2.48-.48.48.01.01.01.01 0 .01Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <footer className={styles.footerWrapper}>
      {/* 🔥 ДОДАНО: Рендеримо локальний фон ТІЛЬКИ на внутрішніх сторінках */}
      {!isHome && <GlobalBackground isLayout={false} />}

      {/* Головна картка футера (Прозоре скло) */}
      {/* 🔥 ДОДАНО: style={{ position: "relative", zIndex: 1 }}, щоб картка була НАД плямами */}
      <div
        className={styles.footerCard}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className={styles.topRow}>
          {/* КОЛОНКА 1: ЛОГО */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/logo.svg"
                alt="Vin Power Group Logo"
                width={180}
                height={55}
                className={styles.logoImage}
                priority
              />
            </Link>
          </div>

          {/* КОЛОНКА 2: НАВІГАЦІЯ */}
          <div className={styles.navCol}>
            <nav className={styles.nav}>
              <Link href="#services">Послуги</Link>
              <Link href="#about">Про нас</Link>
              <Link href="#projects">Реалізовані проєкти</Link>
              <Link href="#cooperation">Співпраця</Link>
            </nav>
          </div>

          {/* КОЛОНКА 3: КОНТАКТИ */}
          <div className={styles.contactsCol}>
            <div className={styles.contactInfo}>
              <a href="tel:0672671477" className={styles.phone}>
                067 267 14 77
              </a>
              <a
                href="mailto:powergroup.vin@gmail.com"
                className={styles.email}
              >
                powergroup.vin@gmail.com
              </a>
              <p className={styles.address}>м. Вінниця, вул. Київська, 14</p>
            </div>
          </div>

          {/* КОЛОНКА 4: КНОПКА ТА СОЦМЕРЕЖІ */}
          <div className={styles.actionCol}>
            <button className={styles.ctaBtn} onClick={openModal}>
              Замовити консультацію
            </button>
            <div className={styles.socials}>
              <a
                href="https://t.me/+380672671477"
                target="_blank"
                rel="noreferrer"
                className={`${styles.socialLink} ${styles.telegram}`}
              >
                <TelegramIcon />
                <span>Telegram</span>
              </a>
              <a
                href="viber://chat?number=%2B380672671477"
                className={`${styles.socialLink} ${styles.viber}`}
              >
                <ViberIcon />
                <span>Viber</span>
              </a>
            </div>
          </div>
        </div>

        {/* НИЖНЯ ЧАСТИНА: КОПІРАЙТ */}
        <div className={styles.bottomRow}>
          <p>© {currentYear} Vin Power Group. Всі права захищені.</p>
          <div className={styles.legalLinks}>
            <Link href="/privacy">Політика конфіденційності</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
