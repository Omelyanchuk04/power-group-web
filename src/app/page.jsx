// import HeroVideo from "@/components/sections/HeroVideo/HeroVideo";
// import About from "@/components/sections/About/About";
// import Services from "@/components/sections/Services/Services";
// import Projects from "@/components/sections/Projects/Projects";
// import Process from "@/components/sections/Process/Process";
// import Contacts from "@/components/sections/Contacts/Contacts";

// export default function Home() {
//   return (
//     // 🔥 Використовуємо фрагмент <></>, щоб не дублювати <main>
//     <>
//       <HeroVideo />
//       <About />
//       <Services />
//       <Projects />
//       <Process />
//       {/* <Contacts /> */}
//     </>
//   );
// }

"use client";

import { useEffect } from "react";
import HeroVideo from "@/components/sections/HeroVideo/HeroVideo";
import About from "@/components/sections/About/About";
import Services from "@/components/sections/Services/Services";
import Projects from "@/components/sections/Projects/Projects";
import Process from "@/components/sections/Process/Process";

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
      {/* <Services />
      <Projects />
      <Process /> */}
    </>
  );
}
