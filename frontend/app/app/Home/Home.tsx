{/*
  This is the Landing page for the app. Changes to this file will change the homepage.
*/}

import { Hero } from "../components/homepage/Hero";
import { ThemeToggle } from "../components/layout/ThemeToggle";
import { HowItWorks } from "../components/homepage/HowItWorks";
import { Features } from "../components/homepage/Features";
import { Footer } from "../components/homepage/Footer";
import { Performance } from "../components/homepage/Performance";
import { CTA } from "../components/homepage/CTA";
import { WIPplaceholder } from "../components/homepage/WIPplaceholder";
import { Technologies } from "../components/homepage/Technologies";
import Navbar from "../components/layout/Navbar";
import { useState, useEffect } from "react";

export function Home() {
  const [showTechnologies, setShowTechnologies] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Handle navigation to Technologies section
    const handleHashChange = () => {
      if (window.location.hash === '#Technologies') {
        if (!showTechnologies) {
          setIsTransitioning(true);
          setTimeout(() => {
            setShowTechnologies(true);
            setIsTransitioning(false);
          }, 300); // Half of transition duration for smooth fade
        }
      } else {
        if (showTechnologies) {
          setIsTransitioning(true);
          setTimeout(() => {
            setShowTechnologies(false);
            setIsTransitioning(false);
          }, 300); // Half of transition duration for smooth fade
        }
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [showTechnologies]);

  return (
    <main className="box-border">
      <Navbar />

      {/* Homepage Content with Fade Transition */}
      <div
        className={`transition-opacity duration-600 ease-in-out ${showTechnologies || isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        style={{
          display: showTechnologies ? 'none' : 'block'
        }}
      >
        {/*<WIPplaceholder />*/}
        <Hero />
        <HowItWorks />
        {/* <Features /> */}
        <Performance />
        {/* <section id="FAQ" className="bg-background px-4 md:px-8 py-16 md:py-24 border-t border-border"> */}
        {/*   <div className="max-w-4xl mx-auto"> */}
        {/*     <h2 className="text-text text-3xl md:text-4xl font-extrabold text-center mb-10">Frequently Asked Questions</h2> */}
        {/*     <p className="text-text text-center opacity-80 dark:opacity-100">[FAQ content placeholder - add questions and answers here]</p> */}
        {/*   </div> */}
        {/* </section> */}
      </div>

      {/* Technologies Section with Fade Transition */}
      <div
        className={`transition-opacity duration-600 ease-in-out ${showTechnologies && !isTransitioning ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          display: showTechnologies ? 'block' : 'none'
        }}
      >
        <Technologies />
      </div>

      <Footer />

    </main>
  );
}
