import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal button when scrolled down beyond the hero section (approx 450px)
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="back-to-top-btn"
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 z-40 p-3.5 rounded-full bg-brand-surface border border-brand-primary/60 text-brand-primary shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:bg-brand-primary hover:text-black hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all flex items-center justify-center group focus:outline-none cursor-pointer"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={22} className="stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-0.5" />
          
          {/* Subtle outer glowing ring */}
          <span className="absolute inset-0 rounded-full border border-brand-primary/30 animate-ping pointer-events-none opacity-40" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
