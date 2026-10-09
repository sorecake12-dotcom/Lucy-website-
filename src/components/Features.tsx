import { motion } from "motion/react";
import { 
  Mic, 
  Cpu, 
  Terminal, 
  Globe, 
  Database, 
  Eye, 
  Mail, 
  Sliders, 
  Activity, 
  Smartphone, 
  CheckCircle 
} from "lucide-react";
import { BRAND } from "../config/brand";

interface FeatureItem {
  id: number;
  chapter: string;
  title: string;
  label: string;
  sysCore: string;
  icon: any;
  points: string[];
  specs?: string[];
  image?: string;
}

interface FeatureVisualCardProps {
  feature: FeatureItem;
  progressPercent: number;
}

export function FeatureVisualCard({ feature, progressPercent }: FeatureVisualCardProps) {
  return (
    <div className="feature-visual-card relative w-full aspect-[4/3] bg-brand-surface border border-brand-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center box-glow overflow-hidden select-none">
      {/* Background Media Slot: Future GIFs, screenshots, animations, or demos are strictly framed by this container */}
      {feature.image && (
        <img
          src={feature.image}
          alt={feature.label}
          className="absolute inset-0 w-full h-full object-cover z-0"
          referrerPolicy="no-referrer"
        />
      )}

      {/* Decorative Corner Targets */}
      <div className="absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t-2 border-l-2 border-brand-primary/40 pointer-events-none z-20" />
      <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t-2 border-r-2 border-brand-primary/40 pointer-events-none z-20" />
      <div className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 border-b-2 border-l-2 border-brand-primary/40 pointer-events-none z-20" />
      <div className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 border-b-2 border-r-2 border-brand-primary/40 pointer-events-none z-20" />

      {/* Subtle Background Radial Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Center Interactive HUD Presentation */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* HUD Central Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border border-brand-primary/30 flex items-center justify-center mb-4 sm:mb-5 relative">
          <div className="absolute inset-0 rounded-full bg-brand-primary/10 blur-xl animate-pulse" />
          <feature.icon size={36} className="text-brand-primary relative z-10 drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
        </div>
        
        <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1.5 sm:mb-2 text-brand-muted/90 font-mono px-2">
          {feature.label}
        </div>
        
        <div className="border border-brand-primary/40 bg-brand-primary/10 text-brand-primary text-xs font-mono tracking-wider px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg uppercase">
          {feature.sysCore}
        </div>
      </div>

      {/* Bottom Progressive Gauge Line */}
      <div className="absolute bottom-3.5 sm:bottom-4 left-6 right-6 sm:left-8 sm:right-8 flex flex-col gap-1.5 z-20 pointer-events-none">
        <div className="flex justify-between text-xs font-mono text-brand-muted/70">
          <span>CHAPTER_PROGRESS</span>
          <span className="text-brand-primary">{progressPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-brand-primary to-brand-magenta rounded-full shadow-[0_0_8px_var(--color-brand-primary)]"
            initial={{ width: 0 }}
            whileInView={{ width: `${progressPercent}%` }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>
    </div>
  );
}

export function Features() {
  const features: FeatureItem[] = [
    {
      id: 1,
      chapter: "CHAPTER 01",
      title: "Real-Time Multimodal Voice & Audio",
      label: "Voice Streaming",
      sysCore: "GEMINI LIVE PCM PROTOCOL",
      icon: Mic,
      points: [
        "Native bi-directional audio streaming pipeline using PyAudio and Gemini Live PCM audio with zero external TTS latency.",
        "Local offline wake-word gating via openWakeWord (hey_jarvis model) enabling hands-free activation with zero network transmission while asleep.",
        "Real-time Voice Activity Detection (VAD) and instant barge-in via voice interruption, ESC hotkey, or cancel button to flush playback buffers.",
        "Acoustic self-echo suppression to prevent speaker feedback and acoustic double-clap activation trigger.",
        "Live voice switching between Gemini Live prebuilt voices (Puck, Charon, Kore, Fenrir, Aoede) and optional push-to-talk mode (Ctrl+Space)."
      ],
      specs: ["Latency: <120ms", "Audio: 16-bit 24kHz PCM", "VAD: Instant Barge-In", "Wake-Word: openWakeWord (Offline)"]
    },
    {
      id: 2,
      chapter: "CHAPTER 02",
      title: "Autonomous Task Agent & Self-Awareness",
      label: "Task Reasoning",
      sysCore: "HIGH-LEVEL TASK PLANNER",
      icon: Cpu,
      points: [
        `High-level autonomous task planner capable of multi-step problem solving and developer workflows.`,
        `Dynamic runtime self-awareness: ${BRAND.assistantName} inspects her host OS, active tools, and capabilities dynamically at session boot.`,
        "Proactive intelligence featuring time-aware check-ins, morning briefings (time, weather, headlines recap), and daily topic monitoring.",
        "Tool auto-discovery engine supporting modular drop-in extensions with single-file definitions."
      ],
      specs: ["Planner: Multi-Step DAG", "Inspection: Session Boot", "Architecture: Modular Tool Plugins", "Intelligence: Proactive Briefing"]
    },
    {
      id: 3,
      chapter: "CHAPTER 03",
      title: "Cross-Platform Desktop Automation",
      label: "System Controls",
      sysCore: "NATIVE OS AUTOMATION",
      icon: Terminal,
      points: [
        "Cross-platform app launcher searching and executing installed applications across Windows, macOS, and Linux.",
        "Native system controls: adjust audio volume, display brightness, Wi-Fi connectivity, and power states (sleep, restart, shutdown).",
        "Window and desktop manipulation: active window tracking, keystroke automation, and system shortcut dispatch.",
        "Safety confirmation gate: reversible vs. irreversible action safeguards requiring explicit user verification before executing critical operations."
      ],
      specs: ["Platforms: Windows / macOS / Linux", "Guardrails: User Confirmation Gate", "Process Engine: Native OS Subprocess", "Input: Keystroke & Mouse"]
    },
    {
      id: 4,
      chapter: "CHAPTER 04",
      title: "Headless & Headful Browser Automation",
      label: "Browser Agent",
      sysCore: "PLAYWRIGHT WEB RUNTIME",
      icon: Globe,
      points: [
        "Fast, resilient browser automation powered by Playwright across Chromium and Firefox engines.",
        "Autonomous web navigation and query execution on DuckDuckGo, Google, and direct URL endpoints.",
        "Full DOM interaction: text extraction, element clicking, multi-field form entry, and comprehensive page reading in both headless and headful modes."
      ],
      specs: ["Engines: Chromium & Firefox", "Modes: Headless & Headful", "Navigation: DuckDuckGo / Google", "Extraction: Full Interactive DOM"]
    },
    {
      id: 5,
      chapter: "CHAPTER 05",
      title: "Long-Term Memory Subsystem",
      label: "Memory Subsystem",
      sysCore: "LOCAL FACT STORE & DASHBOARD",
      icon: Database,
      points: [
        "Persistent long-term memory store for user preferences, personal context, habits, and ongoing projects across sessions.",
        "Floating Memory Dashboard UI panel to inspect, search, and delete stored memories with a single click.",
        "Context summarization pipeline that condenses extended conversation histories without losing critical facts."
      ],
      specs: ["Persistence: SQLite / JSON Vector", "Management: Floating Memory Panel", "Compression: Context Summarizer", "Privacy: 100% Local Disk"]
    },
    {
      id: 6,
      chapter: "CHAPTER 06",
      title: "Visual Perception & Screen Understanding",
      label: "Computer Vision",
      sysCore: "MULTIMODAL VISION PIPELINE",
      icon: Eye,
      points: [
        "Desktop screen capture for instant visual analysis, code troubleshooting, and graphical layout inspection.",
        "Webcam video stream feeding into Gemini Live for real-time visual question answering and physical scene understanding.",
        "Intelligent source labeling distinguishing screen captures (computer state) from webcam frames (user and environment state)."
      ],
      specs: ["Inputs: Screen Stream + Webcam", "Engine: Gemini Multimodal Vision", "Labeling: Source State Separation", "Latency: Live Frame Buffer"]
    },
    {
      id: 7,
      chapter: "CHAPTER 07",
      title: "Gmail, WhatsApp & Media Integrations",
      label: "Integrations",
      sysCore: "COMMUNICATIONS & API SUITE",
      icon: Mail,
      points: [
        "Gmail automation: reads incoming emails, summarizes unread threads, drafts replies, and dispatches messages.",
        "WhatsApp automation: web-based WhatsApp messaging automation with linked persistent user sessions.",
        "Media and information retrieval: YouTube video transcript fetching and summarization, flight searches, and real-time weather reports."
      ],
      specs: ["Email: Gmail Automation", "Chat: WhatsApp Web Session", "Media: YouTube Transcript Extraction", "Data: Real-Time Weather & Flights"]
    },
    {
      id: 8,
      chapter: "CHAPTER 08",
      title: "Personality Modes & HUD Customization",
      label: "Avatar & Personality",
      sysCore: "PYQT6 3D HOLOGRAPHIC HUD",
      icon: Sliders,
      points: [
        "Three distinct real-time personality modes: GF (friendly, warm, playful companion), JARVIS (authoritative operator with dry humor), and ASSISTANT (concise, direct, zero fluff).",
        "Configurable assistant name and custom user addressing title.",
        "Dual HUD styles: switch between a software-rendered holographic wireframe face (with phonetic viseme lip-sync and eye saccades) and an Arc Reactor core.",
        "Live HUD theming: dynamic color picker supporting full UI recoloring and custom hex values, with in-app audio device hardware selectors."
      ],
      specs: ["Personas: GF / JARVIS / ASSISTANT", "Avatar: 3D Wireframe Lip-Sync", "HUD Style: Holographic Face / Reactor", "Audio: In-App Device Switcher"]
    },
    {
      id: 9,
      chapter: "CHAPTER 09",
      title: "System Metrics & OS Integration",
      label: "System Metrics",
      sysCore: "REAL-TIME MONITOR & HOTKEYS",
      icon: Activity,
      points: [
        "Real-time hardware metrics monitor visualizing CPU, RAM, and GPU load continuously.",
        "Floating Clipboard Monitor panel that triggers contextual AI actions when text is copied.",
        "Global hotkeys: instant push-to-talk (Ctrl+Space), speech interruption, and full-screen HUD toggle.",
        "One-click native Desktop and Start Menu shortcut generator with cross-platform autostart on boot (Windows Registry, macOS LaunchAgents, Linux autostart)."
      ],
      specs: ["Telemetry: CPU / RAM / GPU", "Shortcuts: Desktop & Start Menu", "Autostart: Win / Mac / Linux", "Clipboard: Context Action Trigger"]
    },
    {
      id: 10,
      chapter: "CHAPTER 10",
      title: "Encrypted Mobile Companion & Security",
      label: "Remote Companion",
      sysCore: "FASTAPI TLS & AES-256 GCM",
      icon: Smartphone,
      points: [
        "Encrypted web companion: built-in local HTTPS/WSS server (FastAPI / Uvicorn) providing a responsive mobile browser interface.",
        "Instant QR code pairing between mobile devices and the desktop instance without manual IP configuration.",
        "AES-256 GCM transport: end-to-end payload encryption securing all remote commands, audio uplinks, and system telemetry.",
        "Credential isolation: API keys and sensitive tokens stored strictly in local ignored config files with explicit confirmation gates for destructive actions."
      ],
      specs: ["Server: FastAPI / Uvicorn", "Pairing: Zero-Config QR Scan", "Encryption: AES-256 GCM", "Security: Local Credential Isolation"]
    }
  ];

  return (
    <section id="features" className="relative py-24 sm:py-28 bg-brand-bg overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Top Section Transition Divider & Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-5xl h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-32 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col items-center relative z-10">
        
        {/* Intro Header Section */}
        <motion.div 
          className="flex flex-col items-center text-center mb-20"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border border-brand-primary/30 text-brand-primary text-xs px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 bg-brand-primary/5 inline-flex items-center space-x-2 select-none"
          >
            <span>&gt;_</span>
            <span>Complete Feature Breakdown</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-brand-text">CORE</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-magenta to-brand-soft text-glow">FEATURES</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-brand-muted max-w-3xl leading-relaxed font-light">
            Every subsystem built into the {BRAND.assistantName} desktop runtime. From low-latency <span className="text-brand-primary border-b border-brand-primary/40 font-medium">Gemini Live voice conversation</span> and Playwright browser control to persistent vector memory, computer vision, and encrypted remote companion access.
          </p>
        </motion.div>

        {/* Feature List (10 Chapters) */}
        <div className="flex flex-col gap-16 sm:gap-20 w-full">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            const progressPercent = (feature.id / 10) * 100;

            return (
              <motion.div
                key={feature.id}
                id={`chapter-${feature.id}`}
                className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 w-full scroll-mt-28 ${isEven ? '' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {/* Text Description Column */}
                <motion.div 
                  className="flex-1 w-full text-left"
                  initial={{ opacity: 0, x: isEven ? -25 : 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                >
                  <div>
                    {/* Chapter Header with Progressive Progress Meter */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-brand-primary text-xs sm:text-sm font-mono tracking-widest uppercase">
                        <span className="w-2.5 h-2.5 bg-brand-primary rounded-full mr-3 shadow-[0_0_10px_var(--color-brand-primary)]"></span>
                        {feature.chapter}
                      </div>
                      <span className="text-xs font-mono text-brand-muted/70">
                        {feature.id}/10 &middot; {progressPercent}%
                      </span>
                    </div>

                    {/* Progressive Chapter Lining Bar */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full mb-6 overflow-hidden border border-brand-primary/10">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-magenta shadow-[0_0_12px_var(--color-brand-primary)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progressPercent}%` }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                      />
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-5 text-brand-text leading-tight">
                      {feature.title}
                    </h3>

                    {/* Bullet Points */}
                    <ul className="space-y-3.5 mb-8">
                      {feature.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start text-sm sm:text-base text-brand-text/90 leading-relaxed">
                          <CheckCircle size={17} className="text-brand-accent mr-3 mt-1 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Spec Tags */}
                  {feature.specs && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-brand-primary/15">
                      {feature.specs.map((spec, sIdx) => (
                        <span key={sIdx} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-brand-surface border border-brand-primary/20 text-brand-muted">
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Visual HUD Card Column */}
                <motion.div 
                  className="flex-1 w-full max-w-lg md:max-w-none mx-auto"
                  initial={{ opacity: 0, x: isEven ? 25 : -25, scale: 0.97 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                >
                  <FeatureVisualCard feature={feature} progressPercent={progressPercent} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
