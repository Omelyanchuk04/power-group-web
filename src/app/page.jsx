import HeroVideo from "@/components/sections/HeroVideo/";
import About from "@/components/sections/About/About";
import Services from "@/components/sections/Services/Services";
import Projects from "@/components/sections/Projects/Projects";
import Process from "@/components/sections/Process/Process";
import GlobalBackground from "@/components/layout/GlobalBackground";

export default function Home() {
  return (
    <main>
      <HeroVideo />

      <div style={{ position: "relative", zIndex: 10, marginTop: "-40px" }}>
        {/* 🔥 Фон тепер сам має заокруглення і тінь */}
        <GlobalBackground />

        {/* Додаємо paddingTop: "40px", щоб компенсувати видалену шапку */}
        <div style={{ position: "relative", zIndex: 1, paddingTop: "40px" }}>
          <About />
          <Services />
          <Projects />
          <Process />
        </div>
      </div>
    </main>
  );
}
