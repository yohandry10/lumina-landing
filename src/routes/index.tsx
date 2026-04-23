import { createFileRoute } from "@tanstack/react-router";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { ParallaxBand } from "@/components/ParallaxBand";
import { Contact } from "@/components/Contact";
import { MapSection } from "@/components/MapSection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <ParallaxBand />
        <Projects />
        <Contact />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}
