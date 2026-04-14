"use client";

import { useEffect } from "react";
import HeroVideo from "@/components/sections/HeroVideo/HeroVideo";
import About from "@/components/sections/About/About";
import Services from "@/components/sections/Services/Services";

export default function Home() {
  // 🚨 ЖУЧОК ДЛЯ ПОШУКУ СКРОЛУ
  useEffect(() => {
    const findScroller = (e) => {
      console.log("🔥 СКРОЛИТЬСЯ ЕЛЕМЕНТ:", e.target);
    };

    // Трекаємо всі скроли на сторінці
    window.addEventListener("scroll", findScroller, true);
    return () => window.removeEventListener("scroll", findScroller, true);
  }, []);

  return (
    <>
      <HeroVideo />
      <About />
      <Services />
    </>
  );
}
