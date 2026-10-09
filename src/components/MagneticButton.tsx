import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Distance multiplier for magnetic pull (default: 0.35)
  maxOffset?: number; // Maximum pixel displacement (default: 14)
  glowEffect?: boolean; // Futuristic radial glow tracking cursor
  innerParallax?: boolean; // Subtle secondary parallax for inner content
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  id?: string;
  title?: string;
  "aria-label"?: string;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  maxOffset = 14,
  glowEffect = true,
  innerParallax = true,
  onClick,
  type = "button",
  disabled = false,
  ...rest
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw cursor displacement motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Cursor position inside button for futuristic radial spotlight effect (in px)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring physics for magnetic pull and snap-back
  const springX = useSpring(rawX, { stiffness: 350, damping: 20, mass: 0.25 });
  const springY = useSpring(rawY, { stiffness: 350, damping: 20, mass: 0.25 });

  // Optional subtle inner content parallax (moves slightly further than button shell)
  const innerX = useTransform(springX, (v) => v * (innerParallax ? 0.4 : 0));
  const innerY = useTransform(springY, (v) => v * (innerParallax ? 0.4 : 0));

  // Dynamic ambient spotlight template
  const glowBackground = useMotionTemplate`radial-gradient(130px circle at ${cursorX}px ${cursorY}px, rgba(224, 0, 168, 0.4), rgba(168, 85, 247, 0.2), transparent 70%)`;

  const handleMouseMove = (e: React.PointerEvent) => {
    if (disabled || !buttonRef.current) return;
    if (e.pointerType === "touch") return; // Keep touch behavior standard

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Clamp within bounds to keep effect subtle & grounded
    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY));

    rawX.set(clampedX);
    rawY.set(clampedY);

    // Track cursor for ambient spotlight
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onPointerMove={handleMouseMove}
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none overflow-hidden transition-shadow ${className}`}
      {...(rest as any)}
    >
      {/* Futuristic Magnetic Radial Aura/Glow tracking cursor */}
      {glowEffect && isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-1 rounded-full opacity-70 mix-blend-screen transition-opacity duration-300"
          style={{
            background: glowBackground,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Futuristic Scanline Sheen on Hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none opacity-25 btn-scanlines rounded-[inherit]" />
      )}

      {/* Button Content with subtle magnetic parallax */}
      <motion.div
        style={{
          x: innerX,
          y: innerY,
        }}
        className="relative z-10 flex items-center justify-center gap-2 w-full"
      >
        {children}
      </motion.div>
    </motion.button>
  );
}
