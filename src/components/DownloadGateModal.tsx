import React, { useState, useEffect } from "react";
import { X, Youtube, Download, ExternalLink, ArrowRight, CheckCircle2, RefreshCw } from "lucide-react";
import { YOUTUBE_URL, GITHUB_URL, DOWNLOAD_URL, LUCY_RELEASE_NAME, LUCY_RELEASE_FILENAME } from "../config/download";
import { BRAND } from "../config/brand";
import { MagneticButton } from "./MagneticButton";

interface DownloadGateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type GateStep = "locked" | "awaiting_return" | "unlocked";

const SESSION_STORAGE_KEY = "lucy_download_unlocked";
const VISIT_FLAG_KEY = "lucy_youtube_visited";

export function DownloadGateModal({ isOpen, onClose }: DownloadGateModalProps) {
  const [step, setStep] = useState<GateStep>("locked");
  const [statusNotice, setStatusNotice] = useState<string>("");

  // Sync with persistent session state on modal open
  useEffect(() => {
    if (!isOpen) return;

    try {
      const isUnlocked = sessionStorage.getItem(SESSION_STORAGE_KEY) === "true";
      if (isUnlocked) {
        setStep("unlocked");
        setStatusNotice("");
        return;
      }

      const hasVisited = sessionStorage.getItem(VISIT_FLAG_KEY) === "true";
      if (hasVisited) {
        setStep("unlocked");
        sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
        setStatusNotice("YouTube visit detected. Download unlocked!");
        return;
      }

      setStep("locked");
      setStatusNotice("");
    } catch {
      setStep("locked");
    }
  }, [isOpen]);

  // Window Focus / Visibility Change Listener to detect user return from YouTube
  useEffect(() => {
    if (!isOpen) return;

    const handleReturnToSite = () => {
      try {
        const hasVisited = sessionStorage.getItem(VISIT_FLAG_KEY) === "true";
        if (hasVisited) {
          sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
          setStep("unlocked");
          setStatusNotice("YouTube visit detected.");
        }
      } catch {
        // Safe fallback
      }
    };

    window.addEventListener("focus", handleReturnToSite);
    document.addEventListener("visibilitychange", handleReturnToSite);

    return () => {
      window.removeEventListener("focus", handleReturnToSite);
      document.removeEventListener("visibilitychange", handleReturnToSite);
    };
  }, [isOpen]);

  // ESC key to close modal
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

  if (!isOpen) return null;

  // Step 1: User clicks "Visit YouTube"
  const handleVisitYouTube = () => {
    try {
      sessionStorage.setItem(VISIT_FLAG_KEY, "true");
    } catch {
      // ignore
    }
    setStep("awaiting_return");
    setStatusNotice("Ready to unlock download once you return.");
    window.open(YOUTUBE_URL, "_blank", "noopener,noreferrer");
  };

  // Manual fallback verification button in case window focus didn't fire
  const handleManualUnlock = () => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      sessionStorage.setItem(VISIT_FLAG_KEY, "true");
    } catch {
      // ignore
    }
    setStep("unlocked");
    setStatusNotice("YouTube visit detected.");
  };

  // Download action
  const handleDownloadLucy = () => {
    window.open(DOWNLOAD_URL, "_blank", "noopener,noreferrer");
  };

  // View GitHub action
  const handleViewGithub = () => {
    window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
  };

  // Reset gate handler for easy testing / expiration
  const handleResetGate = () => {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      sessionStorage.removeItem(VISIT_FLAG_KEY);
    } catch {
      // ignore
    }
    setStep("locked");
    setStatusNotice("");
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-brand-surface border border-brand-primary/30 rounded-2xl p-6 sm:p-9 w-full max-w-md relative box-glow text-center shadow-[0_0_50px_rgba(168,85,247,0.25)] select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          type="button"
          onClick={onClose} 
          className="absolute top-4 right-4 text-brand-muted hover:text-brand-text transition-colors p-2 rounded-xl bg-brand-bg/50 hover:bg-brand-primary/10 border border-brand-primary/15 cursor-pointer"
          aria-label="Close download gate"
        >
          <X size={18} />
        </button>

        {/* ==================================================== */}
        {/* STEP 1: LOCKED / BEFORE YOUTUBE VISIT */}
        {/* ==================================================== */}
        {step === "locked" && (
          <div className="space-y-6">
            {/* YouTube Badge */}
            <div className="w-16 h-16 rounded-2xl bg-[#FF0000]/10 border border-[#FF0000]/30 flex items-center justify-center mx-auto text-[#FF0000] shadow-[0_0_30px_rgba(255,0,0,0.25)]">
              <Youtube size={36} className="fill-[#FF0000] text-[#FF0000]" />
            </div>

            {/* Header Text */}
            <div>
              <div className="text-xs font-mono tracking-widest text-brand-primary uppercase font-bold mb-1">
                // VERIFICATION GATE
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text uppercase font-sans">
                {BRAND.assistantName} DOWNLOAD
              </h3>
            </div>

            {/* Explanatory Message */}
            <p className="text-brand-muted text-sm leading-relaxed px-2 font-light">
              Before downloading {BRAND.assistantName}, visit our YouTube channel for installation walkthroughs and live demonstrations.
            </p>

            {/* Action Button: Visit YouTube */}
            <div className="pt-2">
              <MagneticButton
                type="button"
                onClick={handleVisitYouTube}
                strength={0.3}
                maxOffset={10}
                className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-500 text-white font-bold text-sm uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(255,0,0,0.35)] hover:shadow-[0_0_35px_rgba(255,0,0,0.6)] flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Youtube size={20} className="fill-white group-hover:scale-110 transition-transform" />
                <span>VISIT YOUTUBE</span>
              </MagneticButton>
            </div>

            {/* Footer Guidance */}
            <p className="text-xs text-brand-muted/80 font-mono tracking-wide pt-1">
              After visiting, return here to unlock the download.
            </p>
          </div>
        )}

        {/* ==================================================== */}
        {/* STEP 2: AWAITING RETURN / YOUTUBE TAB OPENED */}
        {/* ==================================================== */}
        {step === "awaiting_return" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Pulsing Status Icon */}
            <div className="w-16 h-16 rounded-2xl bg-brand-primary/15 border border-brand-primary/40 flex items-center justify-center mx-auto text-brand-primary shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-brand-primary opacity-60" />
                <Youtube size={30} className="relative fill-brand-primary text-brand-primary" />
              </div>
            </div>

            <div>
              <div className="text-xs font-mono tracking-widest text-brand-accent uppercase font-bold mb-1">
                // AWAITING RETURN
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-brand-text uppercase font-sans">
                {BRAND.assistantName} DOWNLOAD
              </h3>
            </div>

            <div className="p-3.5 rounded-xl bg-brand-bg/80 border border-brand-primary/20 text-xs font-mono text-brand-text/90">
              {statusNotice || "Ready to unlock download."}
            </div>

            <p className="text-brand-muted text-xs leading-relaxed">
              When you return to this tab after visiting YouTube, your download options will unlock automatically.
            </p>

            <div className="space-y-3 pt-2">
              {/* Ready to unlock trigger */}
              <button
                type="button"
                onClick={handleManualUnlock}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-primary text-black font-bold text-xs uppercase tracking-widest hover:bg-brand-soft transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 size={16} />
                <span>Ready to Unlock Download</span>
              </button>

              {/* Re-open YouTube if needed */}
              <button
                type="button"
                onClick={handleVisitYouTube}
                className="w-full py-2.5 px-4 rounded-xl border border-white/10 hover:border-white/20 text-brand-muted hover:text-brand-text text-xs font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Youtube size={14} className="text-red-500" />
                <span>Re-open YouTube Channel</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* STEP 3: UNLOCKED / DOWNLOAD & GITHUB OPTIONS */}
        {/* ==================================================== */}
        {step === "unlocked" && (
          <div className="space-y-6 animate-in zoom-in-95 duration-300">
            {/* Green Checkmark Badge */}
            <div className="w-16 h-16 rounded-2xl bg-brand-accent/15 border border-brand-accent/40 flex items-center justify-center mx-auto text-brand-accent shadow-[0_0_35px_rgba(0,229,160,0.35)]">
              <CheckCircle2 size={36} className="text-brand-accent" />
            </div>

            {/* Header Text */}
            <div>
              <div className="text-xs font-mono tracking-widest text-brand-accent uppercase font-bold mb-1 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                <span>YouTube Visit Detected</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text uppercase font-sans">
                DOWNLOAD UNLOCKED
              </h3>
            </div>

            <p className="text-brand-muted text-sm font-light">
              {BRAND.assistantName} is ready. Choose your preferred source below.
            </p>

            <div className="inline-block py-1.5 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-brand-muted">
              <span className="text-brand-text font-medium">{LUCY_RELEASE_NAME}</span>
              <span className="mx-2 text-brand-primary/50">&bull;</span>
              <span className="text-brand-muted/80">{LUCY_RELEASE_FILENAME}</span>
            </div>

            {/* Unlocked Actions: DOWNLOAD LUCY & VIEW GITHUB */}
            <div className="space-y-3 pt-2">
              {/* Button 1: Download LUCY */}
              <MagneticButton
                type="button"
                onClick={handleDownloadLucy}
                strength={0.3}
                maxOffset={10}
                className="w-full py-4 px-5 rounded-2xl bg-brand-primary hover:bg-brand-soft text-black font-bold text-sm uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                <span>DOWNLOAD {BRAND.assistantName}</span>
              </MagneticButton>

              {/* Button 2: View GitHub */}
              <button
                type="button"
                onClick={handleViewGithub}
                className="w-full py-3.5 px-5 rounded-2xl bg-brand-surface/90 hover:bg-brand-primary/10 text-brand-text border border-brand-primary/30 hover:border-brand-primary/60 font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>VIEW GITHUB</span>
                <ExternalLink size={15} className="text-brand-primary" />
              </button>
            </div>

            {/* Reset Gate / Session Info */}
            <div className="pt-3 border-t border-brand-primary/15 flex items-center justify-between text-xs font-mono text-brand-muted/70">
              <span>Session unlocked</span>
              <button
                type="button"
                onClick={handleResetGate}
                className="inline-flex items-center gap-1 hover:text-brand-primary transition-colors cursor-pointer"
                title="Reset verification state"
              >
                <RefreshCw size={11} />
                <span>Reset Gate</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
