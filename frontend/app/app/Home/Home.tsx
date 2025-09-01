{/*
  This is the Landing page for the app. Changes to this file will change the homepage.
*/}

import { Hero } from "../components/homepage/Hero";
import { ThemeToggle } from "../components/layout/ThemeToggle";
import { HowItWorks } from "../components/homepage/HowItWorks";
import { Footer } from "../components/homepage/Footer";
import { WIPplaceholder } from "../components/homepage/WIPplaceholder";

export function Home() {
  return (
    <main className="box-border">
      <ThemeToggle />
      <WIPplaceholder />
      <Hero />
      <HowItWorks />
      <Footer />

    </main>
  );
}
