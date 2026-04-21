import HeroVideo from "@/components/sections/HeroVideo/";
import About from "@/components/sections/About/About";
import Services from "@/components/sections/Services/Services";
import Projects from "@/components/sections/Projects/Projects";
import Process from "@/components/sections/Process/Process";

// Імпортуємо наш фон
import GlobalBackground from "@/components/layout/GlobalBackground";

export default function Home() {
  return (
    <main>
      <HeroVideo />

      {/* 🔥 ГОЛОВНА ОБГОРТКА ("ШТОРА") 🔥 */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "-40px",
          borderRadius: "40px 40px 0 0",
          boxShadow: "0 -15px 25px rgba(0, 0, 0, 0.15)",
          /* Магія: обрізає фон під форму кутів, але не ламає sticky! */
          overflow: "clip",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Наш липкий фон (тепер без власних кутів) */}
        <GlobalBackground />

        {/* Контент */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <About />
          <Services />
          <Projects />
          <Process />
        </div>
      </div>
    </main>
  );
}
