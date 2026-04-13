"use client";

import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* ЛОГО ТА СЛОГАН */}
          <div className={styles.brandInfo}>
            <div className={styles.logo}>
              <div className={styles.logoSquare}></div>
              <span className={styles.logoText}>ВІН ПАУЕР ГРУП</span>
            </div>
            <p className={styles.slogan}>Ваша енергетична стабільність</p>
          </div>

          {/* НАВІГАЦІЯ */}
          <div className={styles.navGrid}>
            <div className={styles.navColumn}>
              <h3>Послуги</h3>
              <Link href="/services/electrical">Електромонтаж</Link>
              <Link href="/services/solar">Сонячні станції</Link>
              <Link href="/services/backup">Резервне живлення</Link>
              <Link href="/services/design">Проєктування</Link>
            </div>

            <div className={styles.navColumn}>
              <h3>Компанія</h3>
              <Link href="/about">Про нас</Link>
              <Link href="/projects">Проєкти</Link>
              <Link href="/contacts">Контакти</Link>
              <Link href="/blog">Блог</Link>
            </div>

            <div className={styles.navColumn}>
              <h3>Ресурси</h3>
              <Link href="/support">Підтримка</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/warranty">Гарантія</Link>
              <Link href="/partners">Партнери</Link>
            </div>
          </div>

          {/* КОНТАКТИ */}
          <div className={styles.contactsColumn}>
            <h3>Контакти</h3>
            <div className={styles.contactItem}>
              <span>м. Вінниця, вул. Київська, 14</span>
            </div>
            <div className={styles.contactItem}>
              <a href="tel:0672671477">067 267 14 77</a>
            </div>
            <div className={styles.contactItem}>
              <a href="mailto:powergroup.vin@gmail.com">
                powergroup.vin@gmail.com
              </a>
            </div>

            <div className={styles.socials}>
              <a
                href="https://t.me/+380672671477"
                target="_blank"
                aria-label="Telegram"
              >
                TG
              </a>
              <a href="viber://chat?number=%2B380672671477" aria-label="Viber">
                VB
              </a>
              <a href="#" aria-label="Facebook">
                FB
              </a>
              <a href="#" aria-label="Instagram">
                IG
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.divider}></div>
          <p className={styles.copyright}>
            © {currentYear} ВІН ПАУЕР ГРУП. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
