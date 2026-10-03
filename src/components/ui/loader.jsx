"use client";

import React from "react";
import { motion } from "framer-motion";

export function LoadingIcon({ progress = 0 }) {
  const totalTicks = 32;
  const radius = 125;
  const center = 150;

  const displayValue = Math.round(progress);
  const activeTick = progress > 0 ? (progress / 100) * totalTicks : -1;

  // Неоново-блакитний колір реактора Тоні Старка
  const accentColor = "#00bbff";

  return (
    <div style={{ position: "relative", width: "300px", height: "300px" }}>
      <svg width="100%" height="100%" viewBox="0 0 300 300">
        {[...Array(totalTicks)].map((_, i) => {
          const angle = (i * 360) / totalTicks;

          const isFilled = i <= activeTick;
          const distance = Math.abs(i - activeTick);

          const isLeadingZone =
            progress > 0 && progress < 100 && distance <= 2.5;

          const baseLength = 16;
          const baseThickness = 8;

          const length = isLeadingZone
            ? baseLength + (2.5 - distance) * 8
            : baseLength;
          const thickness = isLeadingZone
            ? baseThickness + (2.5 - distance) * 2
            : baseThickness;

          const y1 = center - radius - (length - baseLength) / 2;
          const y2 = center - radius + baseLength + (length - baseLength) / 2;

          return (
            <g key={i} transform={`rotate(${angle} ${center} ${center})`}>
              <motion.line
                x1={center}
                x2={center}
                animate={{
                  y1: y1,
                  y2: y2,
                  strokeWidth: thickness,
                  stroke: isFilled ? accentColor : "#ffffff",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                strokeLinecap="round"
                // Додаємо ефект неонового світіння
                style={{
                  filter: isFilled
                    ? `drop-shadow(0px 0px 8px ${accentColor})`
                    : "none",
                  transition: "filter 0.3s ease",
                }}
              />
            </g>
          );
        })}
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: displayValue >= 100 ? accentColor : "#ffffff",
          // Текст також отримує неонове світіння на 100%
          textShadow:
            displayValue >= 100 ? `0px 0px 15px ${accentColor}` : "none",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "56px",
          fontWeight: "700",
          letterSpacing: "-1px",
          transition: "color 0.3s ease, text-shadow 0.3s ease",
        }}
      >
        {displayValue}%
      </div>
    </div>
  );
}
