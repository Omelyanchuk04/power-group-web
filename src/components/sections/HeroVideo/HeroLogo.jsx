"use client";

import { forwardRef } from "react";
import styles from "./HeroVideo.module.scss";

const HeroLogo = forwardRef((props, ref) => {
  return (
    <section className={styles.logoStep} ref={ref}>
      <div className={styles.logoContainer}>
        {/* ЛІВА ЧАСТИНА: ІКОНКА */}
        <div className={styles.animIcon}>
          {/* 🔥 ШЛЯХ БЕЗ ПАПКИ images! */}
          <img src="/Logo-icon.svg" alt="Icon" width={160} height={160} />
        </div>

        {/* ПРАВА ЧАСТИНА: ТЕКСТ + СЛОГАН */}
        <div className={styles.logoRightColumn}>
          <div className={styles.animText}>
            {/* 🔥 ШЛЯХ БЕЗ ПАПКИ images! */}
            <img src="/Logo-text.svg" alt="Text" width={480} height={80} />
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
