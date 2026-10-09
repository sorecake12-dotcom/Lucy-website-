import { Download, Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { BRAND } from "../config/brand";
import { MagneticButton } from "./MagneticButton";

export function Pricing({ onDownloadClick }: { onDownloadClick: () => void }) {
  return (
    <section id="pricing" className="relative py-32 bg-brand-bg border-t border-brand-primary/10 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 uppercase text-brand-text">
            Get <span className="text-brand-primary drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">{BRAND.assistantName}</span> Desktop
          </h2>
          <p className="text-brand-muted">Download for desktop (Mac, Linux, Windows) &middot; Full Source Code</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="bg-brand-surface border border-brand-primary/25 rounded-2xl p-8 sm:p-10 relative overflow-hidden box-glow"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 text-brand-primary pointer-events-none">
              <Download size={120} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-mono mb-4">
              <Sparkles size={12} />
              <span>OPEN SOURCE RELEASE</span>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-brand-text">{BRAND.assistantName} CORE</h3>
            <p className="text-brand-muted mb-8 text-sm">Everything you need for autonomous desktop control and automation.</p>
            
            <div className="flex items-baseline space-x-4 mb-2">
              <span className="text-4xl sm:text-5xl font-bold tracking-tighter text-brand-text">FREE</span>
              <span className="text-sm text-brand-primary font-mono uppercase tracking-wider font-semibold">100% Open Source</span>
            </div>
            <div className="text-brand-muted/80 font-mono text-xs mb-8">
              No subscription &middot; No checkout &middot; Direct GitHub Source Access
            </div>

            <MagneticButton 
              onClick={onDownloadClick}
              strength={0.35}
              maxOffset={14}
              className="w-full py-4 bg-brand-primary text-black font-bold uppercase tracking-widest rounded-xl hover:bg-brand-soft transition-all mb-8 shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_32px_rgba(168,85,247,0.65)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              <span>Download {BRAND.assistantName}</span>
            </MagneticButton>

            <ul className="space-y-4">
              {[
                "Direct File System Access",
                "Unlimited Voice Commands",
                "Local Vector Memory",
                "Cross-platform (Mac, Windows, Linux)",
                "Complete GitHub Source Code & Documentation"
              ].map((feature, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  className="flex items-center text-sm text-brand-muted"
                >
                  <Check size={16} className="text-brand-accent mr-3 shrink-0" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="space-y-8 pl-0 md:pl-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div>
              <h4 className="text-lg font-bold text-brand-text mb-2">Desktop Application</h4>
              <p className="text-brand-muted text-sm leading-relaxed">
                {BRAND.assistantName} is designed to run locally on your machine for maximum security and performance. It requires native OS permissions to execute file management and system-level tasks.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-brand-text mb-2">High-Performance Engine</h4>
              <p className="text-brand-muted text-sm leading-relaxed">
                Built from the ground up for low-latency voice execution, zero background bloat, and autonomous workflow management.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
