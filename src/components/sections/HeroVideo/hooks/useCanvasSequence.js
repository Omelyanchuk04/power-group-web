import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const FRAME_COUNT = 152;
const DESKTOP_MIN_WIDTH = "(min-width: 1025px)";
const MOBILE_MAX_WIDTH = "(max-width: 1024px)";

export const useCanvasSequence = ({
  heroRef,
  canvasRef,
  overlayRef,
  contentRef,
}) => {
  const imagesRef = useRef([]);
  const renderMetrics = useRef({ width: 0, height: 0, x: 0, y: 0 });

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      // ДЕСКТОП (Canvas + секвенція з пінінгом)
      mm.add(DESKTOP_MIN_WIDTH, () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d", {
          alpha: false,
          desynchronized: true,
        });
        const animationState = { frame: 0 };

        const calculateMetrics = () => {
          const img = imagesRef.current[0];
          if (!img || !canvas) return;
          const rect = canvas.getBoundingClientRect();
          canvas.width = rect.width;
          canvas.height = rect.height;
          const canvasAspect = canvas.width / canvas.height;
          const imgAspect = img.width / img.height;

          if (canvasAspect > imgAspect) {
            renderMetrics.current.width = canvas.width;
            renderMetrics.current.height = canvas.width / imgAspect;
            renderMetrics.current.x = 0;
            renderMetrics.current.y =
              (canvas.height - renderMetrics.current.height) / 2;
          } else {
            renderMetrics.current.width = canvas.height * imgAspect;
            renderMetrics.current.height = canvas.height;
            renderMetrics.current.x =
              (canvas.width - renderMetrics.current.width) / 2;
            renderMetrics.current.y = 0;
          }
        };

        const render = () => {
          const targetFrame = Math.max(
            0,
            Math.min(FRAME_COUNT - 1, Math.floor(animationState.frame)),
          );
          let img = imagesRef.current[targetFrame];
          if (!img || !img.complete || img.naturalWidth === 0) {
            for (let i = targetFrame; i >= 0; i--) {
              if (
                imagesRef.current[i]?.complete &&
                imagesRef.current[i]?.naturalWidth > 0
              ) {
                img = imagesRef.current[i];
                break;
              }
            }
          }
          if (
            !img ||
            !img.complete ||
            renderMetrics.current.width === 0 ||
            !context ||
            !canvas
          )
            return;

          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(
            img,
            renderMetrics.current.x,
            renderMetrics.current.y,
            renderMetrics.current.width,
            renderMetrics.current.height,
          );
        };

        const preloadFirstFrame = () => {
          return new Promise((resolve) => {
            const img = new Image();
            img.fetchPriority = "high";
            img.src = `/frames/frame-001.jpg`;
            img.onload = () => {
              imagesRef.current[0] = img;
              resolve(img);
            };
            img.onerror = () => {
              imagesRef.current[0] = img;
              resolve(img);
            };
          });
        };

        const preloadOtherFrames = async () => {
          const batchSize = 10;
          for (let i = 1; i < FRAME_COUNT; i += batchSize) {
            const batch = [];
            for (let j = 0; j < batchSize && i + j < FRAME_COUNT; j++) {
              const index = i + j;
              batch.push(
                new Promise((resolve) => {
                  const img = new Image();
                  img.fetchPriority = "low";
                  img.src = `/frames/frame-${(index + 1).toString().padStart(3, "0")}.jpg`;
                  img.onload = () => {
                    imagesRef.current[index] = img;
                    resolve();
                  };
                  img.onerror = () => {
                    imagesRef.current[index] = img;
                    resolve();
                  };
                }),
              );
            }
            await Promise.all(batch);
          }
        };

        preloadFirstFrame().then(() => {
          calculateMetrics();
          render();
          preloadOtherFrames();
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 0.5,
            pin: true,
            pinSpacing: false,
          },
        });

        tl.to(
          animationState,
          {
            frame: FRAME_COUNT - 1,
            ease: "none",
            duration: 2,
            onUpdate: render,
          },
          0,
        );
        tl.to(contentRef.current, { y: -50, opacity: 0, duration: 0.3 }, 1.7);
        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 0.2, duration: 1, ease: "none" },
          2,
        );

        let lastWidth = window.innerWidth;
        const handleResize = () => {
          if (window.innerWidth !== lastWidth) {
            lastWidth = window.innerWidth;
            calculateMetrics();
            render();
          }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      });

      // МОБАЙЛ
      mm.add(MOBILE_MAX_WIDTH, () => {
        gsap.set([heroRef.current, canvasRef.current, contentRef.current], {
          clearProps: "all",
        });
        return () => {};
      });
    },
    { scope: heroRef },
  );
};
