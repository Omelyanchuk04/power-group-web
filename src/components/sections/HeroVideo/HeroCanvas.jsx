import { forwardRef } from "react";
import styles from "./HeroVideo.module.scss";

const HeroCanvas = forwardRef(({ overlayRef }, canvasRef) => {
  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div ref={overlayRef} className={styles.canvasOverlay} />
    </>
  );
});

HeroCanvas.displayName = "HeroCanvas";

export default HeroCanvas;
