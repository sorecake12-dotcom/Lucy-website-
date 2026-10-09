import { motion } from "motion/react";
import { 
  Cpu, 
  ShieldCheck, 
  Workflow, 
  Volume2 
} from "lucide-react";
import { BRAND } from "../config/brand";

export function About() {
  const architecturePillars = [
    {
      icon: Cpu,
      title: "System-Level Runtime",
      tag: "OS CORE",
      description: "Direct OS-level integration across Windows, macOS, and Linux. Manages system processes, display brightness, audio hardware, and background daemons natively without web sandboxes."
    },
    {
      icon: Volume2,
      title: "Real-Time Voice Pipeline",
      tag: "LOW LATENCY",
      description: "Native bidirectional 16-bit 24kHz PCM audio streaming pipeline with sub-120ms latency, instant voice barge-in, and offline local wake-word gating."
    },
    {
      icon: Workflow,
      title: "Autonomous Task Planner",
      tag: "AGENT ENGINE",
      description: "Multi-step reasoning engine executing desktop automation, Playwright browser navigation, file management, and dynamic tool auto-discovery."
    },
    {
      icon: ShieldCheck,
      title: "Privacy & Confirmation Gates",
      tag: "SECURITY",
      description: "Strict safety boundaries requiring explicit confirmation before executing critical or irreversible actions. Zero private telemetry and local-first execution."
    }
  ];

  return (
    <section 
      id="about" 
      className="relative py-24 sm:py-32 bg-brand-bg overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Top Section Transition Divider & Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-5xl h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-32 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Ambient Cyber Background Accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center relative z-10">
        {/* Intro Header Section */}
        <motion.div 
          className="flex flex-col items-center text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border border-brand-primary/30 text-brand-primary text-xs px-4 py-1.5 rounded-full tracking-wider font-medium mb-6 bg-brand-primary/5 inline-flex items-center space-x-2 select-none"
          >
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" aria-hidden="true" />
            <span>System Architecture</span>
          </motion.div>
          
          {/* Heading */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-brand-text">ABOUT</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-magenta to-brand-soft text-glow">
              {BRAND.assistantName}
            </span>
          </h2>
          
          {/* Concise Description */}
          <p className="text-base sm:text-lg md:text-xl text-brand-muted max-w-3xl leading-relaxed font-light">
            <span className="text-brand-text font-medium">{BRAND.assistantName}</span> is a system-level AI assistant designed to work across your desktop environment. She understands natural voice, controls installed applications, manages files, automates developer workflows, and operates with full local privacy.
          </p>
        </motion.div>

        {/* System Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {architecturePillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="bg-brand-surface/70 border border-brand-primary/20 hover:border-brand-primary/45 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden group"
              >
                {/* Subtle corner grid accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-primary/10 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary group-hover:scale-105 transition-transform">
                      <IconComponent size={22} className="text-brand-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-brand-primary/80 uppercase px-2.5 py-1 rounded-md bg-brand-primary/10 border border-brand-primary/20">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-brand-text mb-2.5">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-brand-muted leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Decorative Status Indicator */}
                <div className="pt-5 mt-5 border-t border-brand-primary/10 flex items-center justify-between text-xs font-mono text-brand-muted/70">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                    ACTIVE SUBSYSTEM
                  </span>
                  <span className="text-brand-primary">SECURE</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* System Specs Overview Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full mt-8 bg-brand-surface/40 border border-brand-primary/15 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-around gap-4 text-center font-mono text-xs text-brand-muted"
        >
          <div>
            <span className="text-brand-text font-bold block text-sm sm:text-base">Python 3.11+</span>
            <span className="text-[11px] text-brand-muted/70">Daemon Core</span>
          </div>
          <div className="w-px h-8 bg-brand-primary/20 hidden sm:block" />
          <div>
            <span className="text-brand-text font-bold block text-sm sm:text-base">&lt; 120ms</span>
            <span className="text-[11px] text-brand-muted/70">PCM Voice Latency</span>
          </div>
          <div className="w-px h-8 bg-brand-primary/20 hidden sm:block" />
          <div>
            <span className="text-brand-text font-bold block text-sm sm:text-base">Local Gating</span>
            <span className="text-[11px] text-brand-muted/70">openWakeWord (Offline Idle)</span>
          </div>
          <div className="w-px h-8 bg-brand-primary/20 hidden sm:block" />
          <div>
            <span className="text-brand-accent font-bold block text-sm sm:text-base">Cross-Platform</span>
            <span className="text-[11px] text-brand-muted/70">Win / Mac / Linux</span>
          </div>
        </motion.div>

        {/* System Requirements Subsection */}
        <div id="system-requirements" className="w-full mt-14 sm:mt-16 pt-12 sm:pt-14 border-t border-brand-primary/15 scroll-mt-24">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[11px] font-mono tracking-widest text-brand-primary uppercase px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/25 mb-3 inline-block font-medium">
              Hardware Specifications
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text mb-2.5">
              System Requirements
            </h3>
            <p className="text-sm sm:text-base text-brand-muted max-w-xl mx-auto font-light">
              Hardware and system specifications needed to run the {BRAND.assistantName} Desktop Assistant smoothly on your computer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
            {/* MINIMUM REQUIREMENTS */}
            <div className="bg-brand-surface/70 border border-brand-primary/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-primary/15">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-brand-muted/80 uppercase block">
                      Hardware Spec
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold tracking-wider uppercase text-brand-text">
                      MINIMUM
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-brand-muted uppercase px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                    Standard Run
                  </span>
                </div>

                <ul className="divide-y divide-brand-primary/10 text-xs sm:text-sm">
                  <li className="py-2.5 flex items-start justify-between gap-4">
                    <span className="font-semibold text-brand-text/90 shrink-0">OS</span>
                    <span className="text-right text-brand-muted">Windows 10/11 64-bit</span>
                  </li>
                  <li className="py-2.5 flex items-start justify-between gap-4">
                    <span className="font-semibold text-brand-text/90 shrink-0">Processor</span>
                    <span className="text-right text-brand-muted">Intel Core i3 / AMD Ryzen 3 or equivalent</span>
                  </li>
                  <li className="py-2.5 flex items-start justify-between gap-4">
                    <span className="font-semibold text-brand-text/90 shrink-0">RAM</span>
                    <span className="text-right text-brand-muted">8 GB</span>
                  </li>
                  <li className="py-2.5 flex items-start justify-between gap-4">
                    <span className="font-semibold text-brand-text/90 shrink-0">Storage</span>
                    <span className="text-right text-brand-muted">At least 5 GB free space</span>
                  </li>
                  <li className="py-2.5 flex items-start justify-between gap-4">
                    <span className="font-semibold text-brand-text/90 shrink-0">Internet</span>
                    <span className="text-right text-brand-muted">Stable internet connection recommended</span>
                  </li>
                  <li className="py-2.5 flex items-start justify-between gap-4">
                    <span className="font-semibold text-brand-text/90 shrink-0">Microphone</span>
                    <span className="text-right text-brand-muted">Required for voice interaction</span>
                  </li>
                  <li className="py-2.5 flex items-start justify-between gap-4">
                    <span className="font-semibold text-brand-text/90 shrink-0">Camera</span>
                    <span className="text-right text-brand-muted">Optional, only required for camera-based features</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* RECOMMENDED REQUIREMENTS */}
            <div className="bg-brand-surface/85 border border-brand-primary/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative shadow-[0_0_25px_rgba(168,85,247,0.1)]">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-primary/20">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-brand-primary uppercase block">
                      Optimal Setup
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold tracking-wider uppercase text-brand-text">
                      RECOMMENDED
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-brand-primary uppercase px-2.5 py-1 rounded-md bg-brand-primary/15 border border-brand-primary/30 font-medium">
                    Best Experience
                  </span>
                </div>

                <ul className="divide-y divide-brand-primary/10 text-xs sm:text-sm">
                  <li className="py-2.5 flex items-start justify-between gap-4">
                    <span className="font-semibold text-brand-text/90 shrink-0">OS</span>
                    <span className="text-right text-brand-muted">Windows 11 64-bit</span>
                  </li>
                  <li className="py-2.5 flex items-start justify-between gap-4">
                    <span className="font-semibold text-brand-text/90 shrink-0">Processor</span>
                    <span className="text-right text-brand-muted">Intel Core i5 / AMD Ryzen 5 or better</span>
                  </li>
                  <li className="py-2.5 flex items-start justify-between gap-4">
                    <span className="font-semibold text-brand-text/90 shrink-0">RAM</span>
                    <span className="text-right text-brand-muted">16 GB</span>
                  </li>
                  <li className="py-2.5 flex items-start justify-between gap-4">
                    <span className="font-semibold text-brand-text/90 shrink-0">Storage</span>
                    <span className="text-right text-brand-muted">10 GB+ free space</span>
                  </li>
                  <li className="py-2.5 flex items-start justify-between gap-4">
                    <span className="font-semibold text-brand-text/90 shrink-0">Internet</span>
                    <span className="text-right text-brand-muted">Stable broadband connection</span>
                  </li>
                  <li className="py-2.5 flex items-start justify-between gap-4">
                    <span className="font-semibold text-brand-text/90 shrink-0">Microphone</span>
                    <span className="text-right text-brand-muted">Good-quality microphone/headset</span>
                  </li>
                  <li className="py-2.5 flex items-start justify-between gap-4">
                    <span className="font-semibold text-brand-text/90 shrink-0">Camera</span>
                    <span className="text-right text-brand-muted">Recommended for camera-related features</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
