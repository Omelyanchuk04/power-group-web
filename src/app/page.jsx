import HeroVideo from "@/components/sections/HeroVideo/";
import About from "@/components/sections/About/About";
import Services from "@/components/sections/Services/Services";
import Projects from "@/components/sections/Projects/Projects";
import Process from "@/components/sections/Process/Process";
import Footer from "@/components/layout/Footer"; // 🔥 Футер тепер тут!
import ContactCTA from "@/components/sections/Contacts/Contacts";
import GlobalBackground from "@/components/layout/GlobalBackground";

export default function Home() {
  return (
    <>
      <HeroVideo />

      {/* 🔥 МЕГА-КОНТЕЙНЕР ДЛЯ ВСЬОГО САЙТУ ПІСЛЯ HERO 🔥 */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "-40px",
          backgroundColor: "#f5f5f5",
          borderRadius: "40px 40px 0 0",
          boxShadow: "0 -15px 25px rgba(0, 0, 0, 0.15)",
          /* overflow: hidden ідеально обрізає кути і ховає краї плям */
          overflow: "hidden",
        }}
      >
        {/* Абсолютний фон, розтягнутий на весь цей контейнер */}
        <GlobalBackground />

        {/* Контент, включно з футером */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <About />
          <Services />
          <Projects />
          <Process />
          <Footer />
        </div>
      </div>
    </>
  );
}
