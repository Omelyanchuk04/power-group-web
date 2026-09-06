"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.scss";
import { useModal } from "@/context/ModalContext";
import GlobalBackground from "@/components/layout/GlobalBackground";

export default function Footer() {
  const { openModal } = useModal();
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const isHome = pathname === "/";

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

  return (
    <footer className={styles.footerWrapper}>
      {!isHome && (
        <div className={styles.footerBgWrapper}>
          <GlobalBackground isLayout={false} />
        </div>
      )}

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
              <Link href="/services">Послуги</Link>
              <Link href="/about">Про нас</Link>
              <Link href="/projects">Реалізовані проєкти</Link>
              <Link href="/contacts">Контакти</Link>
            </nav>
          </div>

          {/* КОЛОНКА 3: КОНТАКТИ */}
          <div className={styles.contactsCol}>
            <div className={styles.contactInfo}>
              <a href="tel:0672671477" className={styles.phone}>
                067 267 14 77
              </a>
              <a href="tel:0992671477" className={styles.phone}>
                099 267 14 77
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

          {/* КОЛОНКА 4: КНОПКА ТА ВСІ СОЦМЕРЕЖІ В ОДНІЙ СІТЦІ */}
          <div className={styles.actionCol}>
            <button className={styles.ctaBtn} onClick={openModal}>
              Замовити консультацію
            </button>
            <div className={styles.socials}>
              {/* Ідеальна сітка 2х2. Телеграм іде з номерами, щоб було зрозуміло */}
              <a
                href="https://t.me/+380672671477"
                target="_blank"
                rel="noreferrer"
                className={`${styles.socialLink} ${styles.telegram}`}
              >
                <TelegramIcon />
                <span>067 267 14 77</span>
              </a>
              <a
                href="https://t.me/+380992671477"
                target="_blank"
                rel="noreferrer"
                className={`${styles.socialLink} ${styles.telegram}`}
              >
                <TelegramIcon />
                <span>099 267 14 77</span>
              </a>
              <a
                href="https://wa.me/380672671477"
                target="_blank"
                rel="noreferrer"
                className={`${styles.socialLink} ${styles.whatsapp}`}
              >
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/power_group.vn?stkn=bHgwcjBxdGV3YzMx"
                target="_blank"
                rel="noreferrer"
                className={`${styles.socialLink} ${styles.instagram}`}
              >
                <InstagramIcon />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* НИЖНЯ ЧАСТИНА: КОПІРАЙТ */}
        <div className={styles.bottomRow}>
          <p>© {currentYear} Vin Power Group. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}
