import React, { useState, MouseEvent } from "react";
import { Eye, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BRAND } from "../config/brand";
import { MagneticButton } from "./MagneticButton";

interface NavbarProps {
  onDownloadClick?: () => void;
}

export function Navbar({ onDownloadClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "FAQ", href: "#faq" },
    { name: "Pricing", href: "#pricing" },
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 py-3.5 sm:py-4 bg-brand-surface/90 backdrop-blur-xl border-b border-brand-primary/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo - Scrolls to Hero */}
        <a 
          href="#hero" 
          onClick={(e) => handleScrollToSection(e, "#hero")}
          className="flex items-center space-x-2.5 text-brand-primary select-none shrink-0 group cursor-pointer"
          aria-label={`${BRAND.assistantName} - Scroll to top`}
        >
          <Eye size={28} className="text-brand-primary drop-shadow-[0_0_12px_rgba(168,85,247,0.7)] transition-transform duration-300 group-hover:scale-110" />
          <span className="text-lg sm:text-xl font-bold tracking-widest uppercase text-brand-text font-sans">
            {BRAND.assistantName}
          </span>
        </a>
        
        {/* Desktop & Tablet Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-xs font-semibold tracking-[0.2em] uppercase text-brand-muted">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="group relative py-1 text-brand-muted hover:text-brand-text transition-colors duration-200"
            >
              <span>{link.name}</span>
              {/* Animated Underline on Hover */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-primary shadow-[0_0_8px_var(--color-brand-primary)] transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Medium Screen / Tablet Navigation (768px - 1023px) */}
        <div className="hidden md:flex lg:hidden items-center space-x-5 text-xs font-semibold tracking-[0.15em] uppercase text-brand-muted">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="py-1 text-brand-muted hover:text-brand-text transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions & Buttons */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          <MagneticButton 
            type="button"
            onClick={onDownloadClick}
            strength={0.32}
            maxOffset={12}
            aria-label={`Download ${BRAND.assistantName}`}
            className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs font-bold tracking-wider uppercase text-black bg-brand-primary rounded-full hover:bg-brand-soft transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_28px_rgba(168,85,247,0.65)] select-none shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            Download {BRAND.assistantName}
          </MagneticButton>

          {/* Mobile/Tablet Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-brand-muted hover:text-brand-text rounded-lg border border-brand-primary/20 bg-brand-surface focus:outline-none cursor-pointer transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} className="text-brand-primary" /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-brand-primary/20 mt-3 pt-3 pb-4 space-y-2.5 bg-brand-surface/95 px-2 rounded-2xl shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleScrollToSection(e, link.href);
                }}
                className="block px-4 py-2.5 text-sm font-mono tracking-widest uppercase text-brand-muted hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
              >
                // {link.name}
              </a>
            ))}
            {onDownloadClick && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onDownloadClick();
                }}
                className="w-full text-left px-4 py-2.5 text-sm font-mono tracking-widest uppercase text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 rounded-lg transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>// Download {BRAND.assistantName}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-brand-primary text-black font-bold">SOURCE</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
