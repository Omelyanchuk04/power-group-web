"use client";
import { usePathname } from "next/navigation";
import styles from "./GlobalBackground.module.scss";

export default function GlobalBackground({ isLayout = false }) {
  const pathname = usePathname();

  // 🔥 Якщо це фон з layout.js, але ми на головній сторінці ("/") — не рендеримо його.
  // Головна сторінка має власний фон у мега-контейнері для правильного перекриття відео.
  if (isLayout && pathname === "/") {
    return null;
  }

  return (
    <div
      className={`${styles.absoluteWrapper} ${
        isLayout ? styles.fixedWrapper : ""
      }`}
    >
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.blob3}></div>
      <div className={styles.blob4}></div>
      <div className={styles.blob5}></div>
      <div className={styles.blob6}></div>
      <div className={styles.blob7}></div>
      <div className={styles.blob8}></div>
      <div className={styles.blob9}></div>
      <div className={styles.blob10}></div>
    </div>
  );
}
