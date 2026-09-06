"use client";

import { forwardRef } from "react";
import { useModal } from "@/context/ModalContext";
import styles from "./HeroVideo.module.scss";

const HeroContent = forwardRef((props, ref) => {
  const { openModal } = useModal();
  return (
    <div className={styles.contentWrapper} ref={ref}>
      <div className={styles.mainContent}>
        <h1 className={styles.animTitle}>
          Електромонтажні роботи <br />
          <span className={styles.textHighlight}>будь-якої складності</span>
        </h1>
        <p className={styles.animSubtitle}>
          Від невеликих приватних замовлень до реалізації масштабних об'єктів у
          цивільній та промисловій сфері.
        </p>
        <div className={styles.animButtonWrapper}>
          <button
            className={styles.animButton}
            onClick={openModal}
            type="button"
          >
            Отримати консультацію
          </button>
        </div>
      </div>
    </div>
  );
});

HeroContent.displayName = "HeroContent";
export default HeroContent;
