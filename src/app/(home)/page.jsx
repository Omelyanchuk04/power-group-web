import HeroVideo from "@/components/sections/HeroVideo";
import About from "@/components/sections/About/About";
import Services from "@/components/sections/Services/Services";
import Projects from "@/components/sections/Projects/Projects";
import Process from "@/components/sections/Process/Process";
import ContactCTA from "@/components/sections/Contacts/Contacts";
import GlobalBackground from "@/components/layout/GlobalBackground";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <HeroVideo />

      {/* МЕГА-КОНТЕЙНЕР */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "-40px",
          backgroundColor: "#f5f5f5",
          borderRadius: "40px 40px 0 0",
          boxShadow: "0 -15px 25px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
        }}
      >
        <GlobalBackground />

        <div style={{ position: "relative", zIndex: 2 }}>
          <About />
          <Services />
          <Projects />
          <Process />

          {/* 🔥 Тут має бути ЄДИНИЙ виклик футера на цій сторінці */}
          <Footer />
        </div>
      </div>
    </>
  );
}
