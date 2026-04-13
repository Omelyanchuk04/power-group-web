"use client";

import { forwardRef } from "react";
import NextImage from "next/image";
import styles from "./HeroVideo.module.scss";

const HeroLogo = forwardRef((props, ref) => {
  return (
    <section className={styles.logoStep} ref={ref}>
      <div className={styles.logoContainer}>
        <div className={styles.animIcon}>
          <NextImage
            src="/logo-icon.svg"
            alt="Icon"
            width={160}
            height={160}
            priority
          />
        </div>
        <div className={styles.logoRightColumn}>
          <div className={styles.animText}>
            <NextImage
              src="/logo-text.svg"
              alt="Text"
              width={480}
              height={80}
              priority
            />
          </div>
          <div className={styles.animLine}></div>
          <p className={styles.animSlogan}>Ваша енергетична стабільність</p>
        </div>
      </div>
    </section>
  );
});

HeroLogo.displayName = "HeroLogo";
export default HeroLogo;
