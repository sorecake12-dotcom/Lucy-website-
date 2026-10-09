import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, Terminal } from "lucide-react";
import { BRAND } from "../config/brand";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      category: "ARCHITECTURE & OS",
      question: `How does ${BRAND.assistantName} interact with my computer and desktop OS?`,
      answer: `${BRAND.assistantName} is built with Python and PyQt6 as a cross-platform desktop assistant. It can search and launch installed applications, manipulate windows, automate keystrokes, and manage system power, audio volume, brightness, and Wi-Fi across Windows, macOS, and Linux with built-in safety confirmation gates for critical operations.`
    },
    {
      category: "VOICE & SPEECH",
      question: "How does the real-time voice streaming and barge-in work?",
      answer: `${BRAND.assistantName} uses native bi-directional audio streaming via PyAudio and Gemini Live PCM audio without external TTS delay. It features offline wake-word gating (hey_jarvis model via openWakeWord), real-time Voice Activity Detection (VAD) with instant barge-in, self-echo suppression, double-clap activation, and switchable prebuilt voices (Puck, Charon, Kore, Fenrir, Aoede).`
    },
    {
      category: "PERSONALITY & HUD",
      question: `What personality modes and HUD styles are available in ${BRAND.assistantName}?`,
      answer: `${BRAND.assistantName} includes three distinct real-time personality modes: GF (a playful, warm companion), JARVIS (authoritative operator with dry humor), and ASSISTANT (direct and concise with zero fluff). The visual HUD can be customized with dynamic color theming, and lets you switch between a software-rendered holographic wireframe face with phonetic lip-sync and an Arc Reactor core.`
    },
    {
      category: "BROWSER & TASK AUTOMATION",
      question: "How does browser automation and task execution work?",
      answer: `${BRAND.assistantName} incorporates an autonomous task agent and Playwright web automation for Chromium and Firefox. It can navigate the web, execute queries on DuckDuckGo and Google, extract text, click elements, fill forms, and automate multi-step developer workflows.`
    },
    {
      category: "MOBILE COMPANION & SECURITY",
      question: `Can I connect to ${BRAND.assistantName} remotely from my mobile phone?`,
      answer: `Yes. ${BRAND.assistantName} has an Encrypted Web Companion powered by a built-in FastAPI HTTPS/WSS server. You can scan the on-screen QR code from your phone to connect instantly without manual network configuration. All remote communications are secured with end-to-end AES-256 GCM transport encryption.`
    },
    {
      category: "PRIVACY & MEMORY",
      question: "Where are my API keys, memories, and screen captures stored?",
      answer: `Everything is stored locally on your device. The Gemini API key and runtime settings are saved in config/api_keys.json (which is excluded from version control), and long-term memories are stored locally in SQLite with a dedicated floating Memory Dashboard for inspection and deletion.`
    },
    {
      category: "HYBRID ARCHITECTURE",
      question: `Does ${BRAND.assistantName} work offline or require an active internet connection?`,
      answer: `${BRAND.assistantName} employs a hybrid edge-and-cloud architecture. Offline capabilities include local wake-word detection via openWakeWord (zero audio sent to the network while waiting for activation), local SQLite persistent memory, app launching, hardware controls (volume, brightness), and confirmation safety gates. Online access is required for real-time Gemini Live multimodal reasoning, voice streaming, Playwright web browser tasks, and cloud service integrations.`
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative py-28 bg-brand-bg border-t border-brand-primary/10 scroll-mt-20 sm:scroll-mt-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="border border-brand-primary/30 text-brand-primary text-xs px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 bg-brand-primary/5 inline-flex items-center space-x-2 select-none">
            <HelpCircle size={14} />
            <span>Knowledge Base &amp; Inquiries</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-brand-text">
            Frequently Asked <span className="text-brand-primary drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">Questions</span>
          </h2>
          <p className="text-brand-muted text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about setting up, securing, and operating the {BRAND.assistantName} Desktop Assistant.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? "bg-brand-surface border-brand-primary/50 shadow-[0_0_25px_rgba(168,85,247,0.15)]" 
                    : "bg-brand-surface/50 border-brand-primary/15 hover:border-brand-primary/30"
                }`}
              >
                <button
                  type="button"
                  id={`faq-btn-${index}`}
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 select-none focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1">
                    {item.category && (
                      <span className="inline-block text-xs font-mono tracking-widest text-brand-primary/80 uppercase mb-1.5">
                        // {item.category}
                      </span>
                    )}
                    <h3 className={`text-base sm:text-lg font-semibold transition-colors duration-150 ${
                      isOpen ? "text-brand-text" : "text-brand-muted hover:text-brand-text"
                    }`}>
                      {item.question}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 border ${
                    isOpen 
                      ? "bg-brand-primary text-black border-brand-primary rotate-180 shadow-[0_0_10px_var(--color-brand-primary)]" 
                      : "bg-white/5 text-brand-muted border-white/10"
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 sm:px-6 pt-0 border-t border-brand-primary/10 text-brand-muted text-sm sm:text-base leading-relaxed">
                        <div className="mt-4 flex items-start gap-3">
                          <Terminal size={18} className="text-brand-accent mt-1 shrink-0" />
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
