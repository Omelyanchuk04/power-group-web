import HeroVideo from "@/components/sections/HeroVideo";
import About from "@/components/sections/About/About";
import Services from "@/components/sections/Services/Services";
import Projects from "@/components/sections/Projects/Projects";
import Process from "@/components/sections/Process/Process";

// 🔥 Змінили назву імпорту, щоб не було конфлікту:
import GlobalBackground from "@/components/layout/GlobalBackground";
import Footer from "@/components/layout/Footer";

// Підключаємо файл стилів
import styles from "./page.module.css"; // Або .css, залежно від вашого розширення

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroVideo />

      {/* МЕГА-КОНТЕЙНЕР */}
      <div className={styles.megaContainer}>
        <GlobalBackground />

        <div className={styles.contentWrapper}>
          <About />
          <Services />
          <Projects />
          <Process />

          {/* ЄДИНИЙ виклик футера на цій сторінці */}
          <Footer />
        </div>
      </div>
    </main>
  );
}
