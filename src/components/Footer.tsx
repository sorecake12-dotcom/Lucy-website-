import { Eye, Mail, Shield, FileText } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { BRAND } from "../config/brand";

export function Footer({ onDownloadClick }: { onDownloadClick?: () => void }) {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="border-t border-brand-primary/10 bg-brand-bg pt-16 pb-12 px-6 sm:px-8"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-4 mb-16">
        <div className="max-w-xs">
          <div className="flex items-center space-x-2 text-brand-primary mb-4">
            <Eye size={24} className="text-brand-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]" />
            <span className="text-xl font-bold tracking-widest uppercase text-brand-text">{BRAND.assistantName}</span>
          </div>
          <p className="text-brand-muted text-sm leading-relaxed mb-6">
            A futuristic desktop AI assistant designed to understand your voice, interact with your computer, remember context, and automate tasks.
          </p>
          <div className="text-xs font-mono text-brand-primary tracking-wide">
            Made by {BRAND.creatorName} &middot; Windows &middot; macOS &middot; Linux
          </div>
        </div>
        <div className="flex flex-wrap gap-12 sm:gap-16">
          <div>
            <h3 className="text-xs font-bold tracking-wider text-brand-text mb-6">Product</h3>
            <ul className="space-y-4 text-sm text-brand-muted">
              <li><Link to="/#about" className="hover:text-brand-primary transition-colors">About</Link></li>
              <li><Link to="/#features" className="hover:text-brand-primary transition-colors">Features</Link></li>
              <li>
                {onDownloadClick ? (
                  <button 
                    type="button"
                    onClick={onDownloadClick} 
                    className="hover:text-brand-primary transition-colors text-left block cursor-pointer"
                  >
                    Download
                  </button>
                ) : (
                  <Link to="/#pricing" className="hover:text-brand-primary transition-colors text-left block">
                    Download
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-wider text-brand-text mb-6">Contact &amp; Community</h3>
            <ul className="space-y-4 text-sm text-brand-muted">
              <li>
                <a 
                  href="mailto:jarvis.nets@gmail.com" 
                  className="hover:text-brand-primary transition-colors font-mono text-xs inline-flex items-center gap-1.5"
                >
                  <Mail size={13} />
                  jarvis.nets@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="https://t.me/+AcLs7FW-Kpo0Mjll" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-brand-primary transition-colors"
                >
                  Telegram Channel
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.gg/WY5FWEpD5T" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-brand-primary transition-colors"
                >
                  Discord Community
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/sorecake12-dotcom/lucy-ai" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-brand-primary transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href="https://youtube.com/@jarvisnets" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-brand-primary transition-colors"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-wider text-brand-text mb-6">Legal &amp; Policies</h3>
            <ul className="space-y-4 text-sm text-brand-muted">
              <li>
                <Link 
                  to="/terms"
                  className="hover:text-brand-primary transition-colors text-left inline-flex items-center gap-1.5"
                >
                  <FileText size={14} className="text-brand-primary" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy"
                  className="hover:text-brand-primary transition-colors text-left inline-flex items-center gap-1.5"
                >
                  <Shield size={14} className="text-brand-primary" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-brand-primary/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted/80">
        <p>
          &copy; {new Date().getFullYear()} {BRAND.assistantName} AI by {BRAND.creatorName}. All rights reserved.
        </p>
        <nav aria-label="Footer legal and contact links" className="flex flex-wrap items-center gap-6">
          <Link to="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
          <a href="https://t.me/+AcLs7FW-Kpo0Mjll" target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">Telegram</a>
          <a href="mailto:jarvis.nets@gmail.com" className="hover:text-brand-primary transition-colors">Contact</a>
        </nav>
      </div>
    </motion.footer>
  );
}
