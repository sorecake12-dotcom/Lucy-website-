import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect } from "react";
import { BRAND } from "../config/brand";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Terms of Service — ${BRAND.assistantName}`;
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-muted font-sans selection:bg-brand-primary/30 selection:text-brand-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 sm:px-10 lg:px-20 max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text uppercase tracking-widest mb-4">
            Terms of Service
          </h1>
          <p className="font-mono text-xs text-brand-primary uppercase tracking-wider">
            Last Updated: October 2026
          </p>
        </div>

        <div className="space-y-12 text-sm leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">01.</span> Acceptance of Terms
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                By accessing, downloading, installing, or using the {BRAND.assistantName} AI desktop application ("Software") and its associated website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use or install the Software.
              </p>
              <p>
                {BRAND.assistantName} AI is developed and maintained by {BRAND.creatorName} ("Developer", "we", "us", or "our").
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">02.</span> Description of Service
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                {BRAND.assistantName} AI is an AI-powered desktop assistant software available for Windows, macOS, and Linux. The Software provides features including voice processing, system interaction, browser automation, and contextual memory via third-party AI interfaces (including the Google Gemini API).
              </p>
              <p>
                The Developer reserves the right to modify, suspend, or discontinue any aspect of the Software at any time, including the availability of specific AI models or third-party integrations, without prior notice.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">03.</span> Software License & Permitted Use
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                The Developer grants you a limited, non-exclusive license to download, install, and use the Software on your computer systems in accordance with open-source and personal usage guidelines.
              </p>
              <p className="text-brand-text font-semibold">You may not:</p>
              <ul className="list-disc pl-5 space-y-2 text-brand-muted">
                <li>Rebrand, resell, or distribute modified commercial SaaS versions of the Software without explicit written permission.</li>
                <li>Use the Software for any illegal, abusive, malicious, or unauthorized purpose.</li>
                <li>Deploy automated unauthorized surveillance routines.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">04.</span> Open Source Access
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                {BRAND.assistantName} does not require user accounts, email registration, passwords, or centralized authentication. You are free to inspect, run, and modify the source code locally on your workstation.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">05.</span> System Access & User Responsibility
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                {BRAND.assistantName} AI may request permissions to access your system's microphone, screen, camera, and file system to perform its intended functions. You maintain full control over these permissions.
              </p>
              <p>
                <strong>Warning:</strong> The Software is capable of executing system commands and automating tasks. You are strictly responsible for all actions, commands, and file modifications executed by the AI on your behalf. We are not liable for accidental data loss, system misconfiguration, or unintended actions resulting from AI automation.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">06.</span> Third-Party Services
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                The Software utilizes third-party application programming interfaces (APIs), including Google Gemini. Your use of the Software is also subject to the Terms of Service of these third-party providers. We do not guarantee the continuous availability, accuracy, or reliability of third-party AI outputs.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">07.</span> Limitation of Liability
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY LAW, {BRAND.creatorName.toUpperCase()} SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SOFTWARE.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">08.</span> Governing Law
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">09.</span> Contact Information
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> <a href="mailto:jarvis.nets@gmail.com" className="text-brand-primary hover:underline">jarvis.nets@gmail.com</a></li>
                <li><strong>Telegram:</strong> <a href="https://t.me/+AcLs7FW-Kpo0Mjll" target="_blank" rel="noreferrer" className="text-brand-primary hover:underline">t.me/+AcLs7FW-Kpo0Mjll</a></li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
