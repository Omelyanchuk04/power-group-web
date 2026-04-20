import HeroVideo from "@/components/sections/HeroVideo/";
import About from "@/components/sections/About/About";
import Services from "@/components/sections/Services/Services";
import Projects from "@/components/sections/Projects/Projects";
import Process from "@/components/sections/Process/Process";
import Contact from "@/components/sections/Contacts/Contacts";

export default function Home() {
  return (
    <>
      <HeroVideo />
      <About />
      <Services />
      <Projects />
      <Process />
      <Contact />
    </>
  );
}
