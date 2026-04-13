"use client";

import { forwardRef } from "react";
import styles from "./HeroVideo.module.scss";

const HeroLogo = forwardRef((props, ref) => {
  return (
    // Змінив section на div, бо семантично section краще використовувати для великих блоків з власним заголовком
    <div className={styles.logoStep} ref={ref}>
      <div className={styles.logoContainer}>
        {/* ЛІВА ЧАСТИНА: ІКОНКА */}
        <div className={styles.animIcon}>
          <img
            src="/Logo-icon.svg"
            alt="Icon"
            width={160}
            height={160}
            fetchPriority="high" // 🔥 Браузер завантажить це в першу чергу
          />
        </div>

        {/* ПРАВА ЧАСТИНА: ТЕКСТ + СЛОГАН */}
        <div className={styles.logoRightColumn}>
          <div className={styles.animText}>
            <img
              src="/Logo-text.svg"
              alt="Text"
              width={480}
              height={80}
              fetchPriority="high" // 🔥 І це також
            />
          </div>
          <div className={styles.animLine}></div>
          <p className={styles.animSlogan}>Ваша енергетична стабільність</p>
        </div>
      </div>
    </div>
  );
});

HeroLogo.displayName = "HeroLogo";
export default HeroLogo;
