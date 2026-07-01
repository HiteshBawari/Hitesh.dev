import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Services from "./components/Services/Services";
import Cursor from "./components/Cursor/Cursor";
import Footer from "./components/Footer/Footer";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import FloatingContact from "./components/FloatingContact/FloatingContact";
import SmoothScroll from "./components/SmoothScroll";

function App() {
  return (
    <>
      <SmoothScroll />

      <Cursor />

      <ScrollProgress />

      <Navbar />

      <Hero />

      <About />

      <Skills />
      <Projects />
      <Services/>
      <Contact />

      <Footer />

      <FloatingContact />
    </>
  );
}

export default App;