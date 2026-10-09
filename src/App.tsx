import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Features } from "./components/Features";
import { FAQ } from "./components/FAQ";
import { Pricing } from "./components/Pricing";
import { BackToTop } from "./components/BackToTop";
import { YouTubeDownloadModal } from "./components/Modals";
import { InteractiveText } from "./components/InteractiveText";
import { Footer } from "./components/Footer";

export default function App() {
  const [isDownloadPromptOpen, setIsDownloadPromptOpen] = useState(false);

  const handleDownloadClick = () => {
    setIsDownloadPromptOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary/30 selection:text-brand-primary">
      <Navbar 
        onDownloadClick={handleDownloadClick}
      />
      
      <main>
        <Hero 
          onDownloadClick={handleDownloadClick}
        />
        <About />
        <Features />
        <FAQ />
        <Pricing onDownloadClick={handleDownloadClick} />
        <InteractiveText />
      </main>

      {/* Floating Back to Top Control */}
      <BackToTop />

      {/* YouTube Prompt -> GitHub Download Modal */}
      <YouTubeDownloadModal 
        isOpen={isDownloadPromptOpen} 
        onClose={() => setIsDownloadPromptOpen(false)} 
      />

      <Footer onDownloadClick={handleDownloadClick} />
    </div>
  );
}


