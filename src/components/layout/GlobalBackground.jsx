"use client";
import styles from "./GlobalBackground.module.scss";

export default function GlobalBackground() {
  return (
    <div className={styles.absoluteWrapper}>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.blob3}></div>
      <div className={styles.blob4}></div>
      <div className={styles.blob5}></div>
    </div>
  );
}
