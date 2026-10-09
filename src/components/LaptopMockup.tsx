import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface LaptopMockupProps {
  imageSrc?: string;
  className?: string;
}

export function LaptopMockup({
  imageSrc = "/lucy-desktop-ui.svg",
  className = "",
}: LaptopMockupProps) {
  const [currentSrc, setCurrentSrc] = useState(imageSrc);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className={`relative w-full max-w-[560px] md:max-w-[620px] lg:max-w-[680px] mx-auto py-4 sm:py-8 flex items-center justify-center select-none [perspective:1200px] sm:[perspective:1400px] overflow-visible ${className}`}
    >
      {/* Subtle Violet & Magenta Ambient Underglow (Reusing site theme tokens) */}
      <div
        className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 w-[85%] sm:w-[95%] h-32 sm:h-44 bg-gradient-to-r from-brand-primary/20 via-brand-magenta/25 to-brand-soft/20 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Realistic Shadow Cast Beneath Chassis */}
      <div
        className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-6 sm:h-8 bg-black/85 rounded-full blur-xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* 3D Angled Floating Laptop Rig */}
      <motion.div
        className="relative w-full [transform-style:preserve-3d] flex flex-col items-center"
        initial={{ opacity: 0, y: 30, rotateY: -20, rotateX: 10 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: 0, rotateY: -16, rotateX: 6 }
            : {
                opacity: 1,
                y: [-4, 4, -4],
                rotateY: [-17, -15, -17],
                rotateX: [6, 8, 6],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0.8, ease: "easeOut" }
            : {
                y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.8, ease: "easeOut" },
              }
        }
      >
        {/* ================= LAPTOP DISPLAY LID ================= */}
        <div className="relative w-[96%] sm:w-[98%] bg-gradient-to-b from-[#221633] via-[#140b20] to-[#0b0413] rounded-t-2xl sm:rounded-t-[22px] p-2.5 sm:p-3.5 pb-2 sm:pb-3 border border-white/15 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95),0_0_35px_rgba(168,85,247,0.18)]">
          {/* Top Bezel Center Camera */}
          <div className="w-full flex justify-center pb-1.5 sm:pb-2">
            <div className="w-2 h-2 rounded-full bg-[#1a0e28] border border-white/20 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-brand-accent/70" />
            </div>
          </div>

          {/* Screen Glass Frame (16:10 Ratio) */}
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg sm:rounded-xl bg-[#0b0413] border border-white/10 shadow-inner">
            {/* The Actual LUCY Desktop UI Screenshot / Image */}
            <img
              src={currentSrc}
              width={1280}
              height={800}
              onError={() => {
                if (currentSrc !== "/lucy-desktop-ui.svg") {
                  setCurrentSrc("/lucy-desktop-ui.svg");
                }
              }}
              alt="LUCY desktop AI assistant interface"
              className="w-full h-full object-cover object-top block"
              loading="eager"
              referrerPolicy="no-referrer"
            />

            {/* Subtle Screen Gloss / Diagonal Glass Glare Reflection */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.045] to-transparent pointer-events-none"
              aria-hidden="true"
            />
            
            {/* Top Perimeter Bevel Glint */}
            <div
              className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ================= LAPTOP HINGE ================= */}
        <div className="w-[70%] sm:w-[74%] h-2 sm:h-2.5 bg-gradient-to-b from-[#090310] via-[#1b0d2a] to-[#0c0415] rounded-md border-t border-black/80 shadow-inner relative z-10" />

        {/* ================= LAPTOP BASE / LOWER CHASSIS ================= */}
        <div className="relative w-full h-4 sm:h-5 md:h-6 bg-gradient-to-b from-[#251838] via-[#160c24] to-[#0a0312] rounded-b-xl sm:rounded-b-2xl border-x border-b border-white/15 shadow-[0_16px_36px_rgba(0,0,0,0.95)] flex items-center justify-center">
          {/* Top Lip Metallic Highlight Line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-white/10 via-white/30 to-white/10" />

          {/* Centered Thumb Opening Notch */}
          <div className="w-14 sm:w-20 h-1 sm:h-1.5 bg-black/70 rounded-b-md border-x border-b border-white/15" />

          {/* Micro Ambient Status Light */}
          <div className="absolute bottom-1 sm:bottom-1.5 right-6 sm:right-8 w-1 h-1 rounded-full bg-brand-primary/80 animate-pulse shadow-[0_0_8px_var(--color-brand-primary)]" />
        </div>
      </motion.div>
    </div>
  );
}
