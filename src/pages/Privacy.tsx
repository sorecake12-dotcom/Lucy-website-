import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect } from "react";
import { BRAND } from "../config/brand";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Privacy Policy — ${BRAND.assistantName}`;
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-muted font-sans selection:bg-brand-primary/30 selection:text-brand-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 sm:px-10 lg:px-20 max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text uppercase tracking-widest mb-4">
            Privacy Policy
          </h1>
          <p className="font-mono text-xs text-brand-primary uppercase tracking-wider">
            Last Updated: October 2026
          </p>
        </div>

        <div className="space-y-12 text-sm leading-relaxed">
          
          <div className="p-6 border border-brand-primary/30 bg-brand-primary/5 rounded-2xl mb-8">
            <p className="text-brand-text font-mono text-sm leading-relaxed">
              <strong>TL;DR:</strong> {BRAND.assistantName} is built with a Local-First Architecture. Your conversation history, system preferences, and local credentials stay on your machine. We do not harvest, track, sell, or monetize your personal system data.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">01.</span> Information We Collect
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                When you use the {BRAND.assistantName} AI software and website, we collect only the minimal data necessary to provide you with the service:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-brand-muted">
                <li><strong>System Prompts & Audio:</strong> Audio streams (microphone input) and screen captures are temporarily processed strictly to facilitate real-time AI responses via your own configured API key.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">02.</span> Local-First Processing
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                {BRAND.assistantName} prioritizes local processing. All of your conversation histories, API keys, OAuth tokens, and software system preferences are stored <strong>strictly locally</strong> on your own machine. We do not sync your chat history or private files to our own servers without your explicit setup.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">03.</span> Third-Party AI Transmission
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                To generate intelligent responses, {BRAND.assistantName} integrates with external AI providers, primarily the Google Gemini API. 
              </p>
              <p>
                <strong>What is shared:</strong> Real-time voice streams (Speech-to-Text), screen vision captures, and textual prompts are transmitted directly and securely to Google AI endpoints solely for the purpose of real-time inference. This transmission is strictly governed by Google's API Terms of Service. {BRAND.assistantName} itself does not retain copies of these payloads on its own remote servers.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">04.</span> Use of Information
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                {BRAND.assistantName} operates strictly on-device without centralized user profiles or accounts:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-brand-muted">
                <li>No account registration or login is required to download and run the open-source software.</li>
                <li>Configuration files and API credentials are kept isolated on your local file system.</li>
                <li>We do not collect telemetry, track browsing activities, or sell personal information.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">05.</span> Data Security & Deletion
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                Because all actual usage data (chats, files, memories, and API keys) lives entirely on your hard drive, you maintain 100% ownership and control. You can permanently delete all records at any time simply by clearing your local application folder or removing the software.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">06.</span> Changes to this Policy
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our software or legal requirements. We will notify you of any material changes by updating the "Last Updated" date on this page or via an in-app notification.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <span className="text-brand-primary font-mono text-base">07.</span> Contact Us
            </h2>
            <div className="bg-brand-surface/70 border border-brand-primary/15 rounded-2xl p-6 sm:p-8 space-y-4">
              <p>
                For any questions regarding privacy or data security, please contact us directly at:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> <a href="mailto:jarvis.nets@gmail.com" className="text-brand-primary hover:underline">jarvis.nets@gmail.com</a></li>
                <li><strong>Telegram:</strong> <a href="https://t.me/+AcLs7FW-Kpo0Mjll" target="_blank" rel="noreferrer" className="text-brand-primary hover:underline">Telegram Support</a></li>
              </ul>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
