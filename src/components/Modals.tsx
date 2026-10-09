import React, { useState, useEffect } from "react";
import { X, Youtube, Mail, MessageSquare, Shield, FileText, ExternalLink, ArrowRight } from "lucide-react";
import { YOUTUBE_CHANNEL_URL, GITHUB_REPO_URL } from "../config/download";
import { BRAND } from "../config/brand";
import { MagneticButton } from "./MagneticButton";

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

// Hook for ESC key listener
function useEscKey(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
}

// FULL VIEW MODAL: TERMS OF SERVICE
export function TermsModal({ isOpen, onClose }: ModalBaseProps) {
  useEscKey(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-brand-surface border border-brand-primary/25 rounded-2xl p-6 sm:p-10 w-full max-w-3xl relative shadow-2xl my-8 max-h-[90vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-brand-primary/15">
          <div>
            <div className="flex items-center space-x-2 text-brand-accent text-xs font-mono uppercase tracking-widest mb-1.5">
              <FileText size={15} />
              <span>Legal Terms</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-text tracking-wide">
              Terms of Service
            </h2>
            <p className="text-xs text-brand-muted mt-1 font-mono">
              Effective Date: October 2026 &middot; Version 1.0.0 &middot; Contact: jarvis.nets@gmail.com | <a href="https://t.me/+AcLs7FW-Kpo0Mjll" target="_blank" rel="noreferrer" className="text-brand-accent hover:underline">Telegram</a>
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 rounded-xl bg-brand-bg/60 hover:bg-brand-primary/10 text-brand-muted hover:text-brand-text transition-colors border border-brand-primary/15 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto py-6 space-y-6 text-sm text-brand-muted leading-relaxed pr-2 font-sans">
          <div className="p-4 bg-brand-accent/10 border border-brand-accent/25 rounded-xl text-xs text-brand-accent flex items-center justify-between">
            <span className="font-semibold">License: CC BY-NC 4.0</span>
            <span className="text-brand-text/80">Creative Commons Attribution-NonCommercial</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-brand-text font-bold text-base flex items-center gap-2">
              <span className="text-brand-accent font-mono text-sm">01.</span> Acceptance of Terms
            </h3>
            <p className="text-brand-muted pl-6">
              By downloading, installing, or executing the <strong className="text-brand-text">LUCY</strong> desktop application or accessing associated services and documentation, you agree to be bound by these Terms of Service.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-brand-text font-bold text-base flex items-center gap-2">
              <span className="text-brand-accent font-mono text-sm">02.</span> Permitted Use &amp; BYOK Model
            </h3>
            <p className="text-brand-muted pl-6">
              LUCY is provided for personal, desktop automation, research, and productivity purposes. Users are responsible for providing their own valid Google Gemini API keys (<strong className="text-brand-text">&quot;Bring Your Own Key&quot;</strong> model) and maintaining device security.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-brand-text font-bold text-base flex items-center gap-2">
              <span className="text-brand-accent font-mono text-sm">03.</span> Attribution &amp; Copyright
            </h3>
            <p className="text-brand-muted pl-6">
              LUCY is developed by Soreblitz. You may not rebrand, resell, or distribute modified commercial SaaS versions without explicit written permission from the author.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-brand-text font-bold text-base flex items-center gap-2">
              <span className="text-brand-accent font-mono text-sm">04.</span> Disclaimers &amp; Limitation of Liability
            </h3>
            <p className="text-brand-muted pl-6">
              The software is provided &quot;as-is&quot; without warranties of any kind. We are not liable for system commands, file modifications, or automations executed by the user.
            </p>
          </div>

          <div className="p-4 bg-brand-bg/60 rounded-xl border border-brand-primary/15 text-xs text-brand-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span>Direct inquiries or questions to:</span>
            <div className="flex gap-4">
              <a 
                href="mailto:jarvis.nets@gmail.com" 
                className="text-brand-accent hover:underline font-mono font-bold transition-colors"
              >
                jarvis.nets@gmail.com
              </a>
              <span className="text-brand-muted/40">|</span>
              <a 
                href="https://t.me/+AcLs7FW-Kpo0Mjll" 
                target="_blank" rel="noreferrer"
                className="text-brand-accent hover:underline font-mono font-bold transition-colors"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-brand-primary/15 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-brand-accent text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}

// FULL VIEW MODAL: PRIVACY POLICY
export function PrivacyModal({ isOpen, onClose }: ModalBaseProps) {
  useEscKey(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-brand-surface border border-brand-primary/25 rounded-2xl p-6 sm:p-10 w-full max-w-3xl relative shadow-2xl my-8 max-h-[90vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-brand-primary/15">
          <div>
            <div className="flex items-center space-x-2 text-brand-accent text-xs font-mono uppercase tracking-widest mb-1.5">
              <Shield size={15} />
              <span>Privacy &amp; Data</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-text tracking-wide">
              Privacy Policy
            </h2>
            <p className="text-xs text-brand-muted mt-1 font-mono">
              Local-First Architecture &middot; Zero Data Harvesting Guarantee
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 rounded-xl bg-brand-bg/60 hover:bg-brand-primary/10 text-brand-muted hover:text-brand-text transition-colors border border-brand-primary/15 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto py-6 space-y-6 text-sm text-brand-muted leading-relaxed pr-2 font-sans">
          <div className="space-y-2">
            <h3 className="text-brand-text font-bold text-base flex items-center gap-2">
              <span className="text-brand-accent font-mono text-sm">01.</span> Local-First Privacy Architecture
            </h3>
            <p className="text-brand-muted pl-6">
              All conversation histories, API keys, OAuth tokens, and system preferences are stored <strong className="text-brand-text">strictly locally</strong> on your machine.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-brand-text font-bold text-base flex items-center gap-2">
              <span className="text-brand-accent font-mono text-sm">02.</span> Third-Party API Transmission
            </h3>
            <p className="text-brand-muted pl-6">
              Real-time voice, STT, and screen vision processing are powered by Google Gemini Live API. Audio streams and screen captures are transmitted directly to Google AI endpoints solely for real-time inference in accordance with Google&apos;s API Terms of Service.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-brand-text font-bold text-base flex items-center gap-2">
              <span className="text-brand-accent font-mono text-sm">03.</span> Zero Data Harvesting
            </h3>
            <p className="text-brand-muted pl-6">
              LUCY does not harvest, telemetry-track, sell, or monetize user data. Your desktop workflows remain completely private to your environment.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-brand-text font-bold text-base flex items-center gap-2">
              <span className="text-brand-accent font-mono text-sm">04.</span> Contact &amp; Legal Inquiries
            </h3>
            <p className="text-brand-muted pl-6">
              For any questions regarding privacy or data security, please contact us directly at:
            </p>
            <div className="pl-6 pt-1 flex flex-wrap gap-3">
              <a 
                href="mailto:jarvis.nets@gmail.com" 
                className="inline-flex items-center gap-2 text-brand-accent hover:underline font-mono text-xs font-semibold bg-brand-bg/60 px-3 py-1.5 rounded-lg border border-brand-primary/15"
              >
                <Mail size={13} />
                jarvis.nets@gmail.com
              </a>
              <a 
                href="https://t.me/+AcLs7FW-Kpo0Mjll"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 text-brand-accent hover:underline font-mono text-xs font-semibold bg-brand-bg/60 px-3 py-1.5 rounded-lg border border-brand-primary/15"
              >
                <MessageSquare size={13} />
                Telegram Support
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-brand-primary/15 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-brand-accent text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
          >
            Close Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}

import { DownloadGateModal } from "./DownloadGateModal";
export { DownloadGateModal };
export const YouTubeDownloadModal = DownloadGateModal;





