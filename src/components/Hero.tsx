import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Code2 } from "lucide-react";
import { BRAND } from "../config/brand";
import { LaptopMockup } from "./LaptopMockup";

interface HeroProps {
  onDownloadClick?: () => void;
}

// Typing Tagline Component powered by Framer Motion staggered character reveal
function TypingTagline({ text }: { text: string }) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.016,
        delayChildren: 0.35,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 3 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.05, ease: "easeOut" }
    },
  };

  return (
    <motion.p
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-xl text-sm sm:text-base md:text-lg text-brand-muted leading-relaxed font-light mb-8 lg:mb-10 px-1 text-center lg:text-left"
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
          {word.split("").map((char, cIdx) => (
            <motion.span key={cIdx} variants={charVariants}>
              {char}
            </motion.span>
          ))}
        </span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-1.5 h-3.5 sm:h-4.5 bg-brand-primary align-middle ml-1 shadow-[0_0_8px_var(--color-brand-primary)]"
        aria-hidden="true"
      />
    </motion.p>
  );
}

// Interactive 3D Tilt Card Button Component
function ThreeDButton({
  children,
  onClick,
  href,
  target,
  rel,
  className = "",
}: {
  children: (isHovered: boolean) => React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}) {
  const cardRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for smooth 3D tilting
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Subtle magnetic hover translation pulling button towards cursor
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const commonProps = {
    ref: cardRef,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick,
    style: {
      rotateX,
      rotateY,
      x: translateX,
      y: translateY,
      transformStyle: "preserve-3d" as const,
    },
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.97, y: 2 },
    transition: { type: "spring", stiffness: 450, damping: 22 },
    className: `perspective-1000 cursor-pointer select-none relative group block ${className}`,
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...commonProps}>
        {children(isHovered)}
      </motion.a>
    );
  }

  return (
    <motion.div {...commonProps}>
      {children(isHovered)}
    </motion.div>
  );
}

export function Hero({ onDownloadClick }: HeroProps) {
  const phrases = [
    "Automate workflow",
    "Analyze data",
    "Manage tasks",
    "Execute commands",
    "Control system routines"
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter & backspacing animation cycle matching video
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (currentText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, 75);
      } else {
        // Full phrase finished typing -> hold for 1.8s
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (currentText.length > 0) {
        // Backspacing character by character
        timer = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length - 1));
        }, 38);
      } else {
        // Completely deleted -> pause briefly and switch to next phrase
        timer = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, phrases]);

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-grid pt-24 pb-16 scroll-mt-20 sm:scroll-mt-24"
    >
      {/* 3D Atom Background Animation */}
      <motion.div 
        className="atom-container"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="sphere-core"></div>
        <div className="atom-ring"></div>
        <div className="atom-ring"></div>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
        {/* LEFT COLUMN: HERO MESSAGING & ACTIONS */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          {/* Desktop Assistant Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border border-brand-primary/30 text-brand-primary text-xs font-mono px-3.5 py-1.5 rounded-full tracking-wide bg-brand-primary/10 inline-flex items-center gap-2 mb-6 select-none"
          >
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shadow-[0_0_8px_var(--color-brand-primary)]" />
            <span>Desktop Assistant</span>
          </motion.div>

          {/* Main Title Heading: MEET LUCY. */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-bold uppercase mb-4 flex flex-col items-center lg:items-start justify-center gap-2 select-none tracking-tight leading-none"
          >
            <span className="text-brand-text tracking-widest font-sans font-extrabold">
              MEET
            </span>
            <span className="font-outline-brand font-display">
              {BRAND.assistantName}.
            </span>
            <span className="sr-only"> — Open Source Futuristic Desktop AI Assistant for Voice Control and Task Automation</span>
          </motion.h1>

          {/* Dynamic Typewriter & Backspacing Capabilities with Glowing Cursor */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex items-center justify-center lg:justify-start gap-2 mb-4 font-mono text-sm sm:text-base md:text-lg text-brand-text min-h-[36px]"
          >
            <span className="text-brand-muted font-medium tracking-wide">Ready to</span>
            <span className="inline-flex items-center text-brand-magenta font-bold tracking-wider drop-shadow-[0_0_12px_rgba(224,0,168,0.5)]">
              <span>{currentText}</span>
              <span 
                className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-brand-magenta ml-1 shadow-[0_0_10px_var(--color-brand-magenta)] animate-pulse" 
                aria-hidden="true"
              />
            </span>
          </motion.div>

          {/* Dynamic Typing Tagline via Framer Motion */}
          <TypingTagline 
            text={`A true system-level intelligence. ${BRAND.assistantName} bypasses the browser to read your screen, manage local files, and execute complex automated workflows hands-free.`} 
          />

          {/* 3D Interactive Action Button: Download LUCY */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="flex items-center justify-center lg:justify-start w-full max-w-xs sm:max-w-sm mb-6 lg:mb-0"
          >
            {/* Button: Get Source Code */}
            <ThreeDButton
              onClick={onDownloadClick}
              className="w-full"
            >
              {(isHovered) => (
                <div
                  style={{ transform: "translateZ(16px)" }}
                  className={`w-full rounded-xl px-5 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between gap-3 transition-all duration-300 relative overflow-hidden bg-brand-primary text-black border border-brand-primary shadow-[0_0_24px_rgba(168,85,247,0.45)] hover:bg-brand-soft hover:shadow-[0_0_34px_rgba(168,85,247,0.7)]`}
                >
                  {/* Subtle Scanlines on Hover */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none opacity-20 btn-scanlines" />
                  )}

                  {/* Left Side: Icon + Text */}
                  <div className="flex items-center gap-3 relative z-10">
                    <Code2 
                      size={22} 
                      className="stroke-[2.2] shrink-0 text-black" 
                    />
                    <div className="text-left">
                      <div className="font-bold text-sm sm:text-base tracking-tight leading-tight text-black">
                        Download {BRAND.assistantName}
                      </div>
                      <div className="text-xs font-mono tracking-wider font-semibold uppercase mt-0.5 text-black/80">
                        OPEN SOURCE RELEASE
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Icon */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-8 h-8 rounded-full bg-black/15 flex items-center justify-center text-black transition-transform">
                      <ArrowRight size={18} className="stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              )}
            </ThreeDButton>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D ANGLED LAPTOP SHOWCASE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          className="lg:col-span-6 xl:col-span-7 flex items-center justify-center w-full relative z-10"
        >
          <LaptopMockup />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce pointer-events-none"
      >
        <div className="w-6 h-10 border-2 border-brand-primary/40 rounded-full flex justify-center p-1.5">
          <div className="w-1 h-2.5 bg-brand-primary/70 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
