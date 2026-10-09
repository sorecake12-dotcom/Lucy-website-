import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { BRAND } from '../config/brand';

export function InteractiveText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-[22vh] sm:min-h-[26vh] flex items-center justify-center bg-brand-bg overflow-hidden py-14 sm:py-16 cursor-crosshair border-t border-brand-primary/10 select-none"
    >
      {/* Base Dim Outline Text */}
      <h2 
        className="font-outline-dim text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase select-none z-0 text-center leading-none px-4 whitespace-nowrap"
      >
        {BRAND.assistantName}
      </h2>

      {/* Bright Purple/Magenta Outline Glow Mask Layer */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0.4,
          maskImage: isHovered 
            ? `radial-gradient(circle 340px at ${mousePos.x}px ${mousePos.y}px, black 40%, transparent 85%)`
            : `radial-gradient(circle 500px at 50% 50%, black 25%, transparent 80%)`,
          WebkitMaskImage: isHovered 
            ? `radial-gradient(circle 340px at ${mousePos.x}px ${mousePos.y}px, black 40%, transparent 85%)`
            : `radial-gradient(circle 500px at 50% 50%, black 25%, transparent 80%)`,
        }}
      >
        <h2 
          className="font-outline-brand text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase select-none text-center leading-none px-4 whitespace-nowrap"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.9)) drop-shadow(0 0 50px rgba(224, 0, 168, 0.6))'
          }}
        >
          {BRAND.assistantName}
        </h2>
      </div>
    </motion.section>
  );
}
