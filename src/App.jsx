import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Business from './sections/Business';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Register ScrollTrigger
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Business />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}

export default App;

