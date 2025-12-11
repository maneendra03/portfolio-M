import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Business from './sections/Business';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import GitHubStats from './sections/GitHubStats';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Register ScrollTrigger after loading complete
      ScrollTrigger.refresh();
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoading]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoadComplete} />}
      {!isLoading && (
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
            <GitHubStats />
            <Achievements />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}

export default App;


