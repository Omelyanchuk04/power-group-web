import HeroVideo from "@/components/sections/HeroVideo/HeroVideo";
import About from "@/components/sections/About/About";
import Services from "@/components/sections/Services/Services";
import Projects from "@/components/sections/Projects/Projects";
import Process from "@/components/sections/Process/Process";
import Contacts from "@/components/sections/Contacts/Contacts";

export default function Home() {
  return (
    <main>
      <HeroVideo />
      <About />
      <Services />
      <Projects />
      <Process />
      {/* <Contacts /> */}
    </main>
  );
}
