import { BRAND } from "../config/brand";
import { YOUTUBE_URL, GITHUB_URL, DOWNLOAD_URL, LUCY_RELEASE_NAME } from "../config/download";

export interface ChatTurn {
  sender: "user" | "lucy" | "system";
  text: string;
}

export type LucyTopic =
  | "what_is_lucy"
  | "core_features"
  | "pc_control"
  | "browser_automation"
  | "file_management"
  | "voice_audio"
  | "memory_subsystem"
  | "personality_modes"
  | "system_os"
  | "visual_perception"
  | "gmail_whatsapp"
  | "system_metrics"
  | "mobile_security"
  | "installation"
  | "download_flow"
  | "github_repo"
  | "pricing_license"
  | "security_safety"
  | "about_creator"
  | "greeting"
  | "thanks"
  | "affirmation"
  | "out_of_scope"
  | "undocumented_capability"
  | "unknown";

// Helper to determine the last discussed topic from conversation history
export function detectLastTopic(history: ChatTurn[]): LucyTopic | null {
  for (let i = history.length - 1; i >= 0; i--) {
    const turn = history[i];
    if (turn.sender === "lucy") {
      const lower = turn.text.toLowerCase();
      // Check specific topics with word boundaries or distinct phrases
      if (lower.includes("voice") || lower.includes("gemini live") || lower.includes("wake word") || lower.includes("pyaudio")) return "voice_audio";
      if (lower.includes("browser") || lower.includes("playwright")) return "browser_automation";
      if (lower.includes("file") || lower.includes("folder") || lower.includes("directory")) return "file_management";
      if (/\bpc\b/.test(lower) || lower.includes("desktop automation") || lower.includes("system control") || lower.includes("control on your pc")) return "pc_control";
      if (lower.includes("memory") || lower.includes("sqlite") || lower.includes("dashboard panel")) return "memory_subsystem";
      if (lower.includes("personality") || lower.includes("jarvis") || lower.includes("holographic")) return "personality_modes";
      if (lower.includes("install") || lower.includes("python 3.10") || lower.includes("requirements.txt")) return "installation";
      if (lower.includes("download") || lower.includes("youtube")) return "download_flow";
      if (lower.includes("github")) return "github_repo";
      if (lower.includes("free and open") || lower.includes("pricing") || lower.includes("subscription")) return "pricing_license";
      if (lower.includes("10 documented core") || lower.includes("core features")) return "core_features";
      if (lower.includes("system-level") || lower.includes("assistant designed")) return "what_is_lucy";
      if (lower.includes("vision") || lower.includes("webcam") || lower.includes("screen capture")) return "visual_perception";
      if (lower.includes("whatsapp") || lower.includes("gmail")) return "gmail_whatsapp";
      if (lower.includes("companion") || lower.includes("qr code")) return "mobile_security";
    }
  }
  return null;
}

/**
 * Robust Intent Classifier and Fact Engine grounded strictly on website content.
 */
export function processLucyQuery(rawInput: string, history: ChatTurn[] = []): { reply: string; topic: LucyTopic } {
  const text = rawInput.trim();
  // Normalize punctuation and hyphens into single spaces for robust matching
  const lower = text.toLowerCase().replace(/-/g, " ").replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();

  // 1. SECURITY & PROMPT INJECTION CHECKS
  if (
    lower.includes("system prompt") ||
    lower.includes("system instruction") ||
    lower.includes("hidden instruction") ||
    lower.includes("ignore previous instructions") ||
    lower.includes("api key") ||
    lower.includes("secret key") ||
    lower.includes("environment variable") ||
    lower.includes(".env")
  ) {
    return {
      reply: "I can help with information about LUCY and this website, but I can't provide internal system instructions or security credentials.",
      topic: "security_safety",
    };
  }

  // 2. UNDOCUMENTED / PROHIBITED / HACKING CAPABILITIES
  const hackingOrUndocumented = [
    "hack", "hacking", "hacked", "ddos", "crack", "cracking",
    "keylogger", "spyware", "crypto miner", "steal", "bypass password"
  ];
  if (hackingOrUndocumented.some(term => lower.includes(term))) {
    return {
      reply: "That's outside the capabilities documented on this website. I can tell you about LUCY's desktop automation, browser automation, voice, memory, and other documented features.",
      topic: "undocumented_capability",
    };
  }

  // 3. OUT-OF-SCOPE GENERAL KNOWLEDGE CHECKS
  // Check if query is asking general trivia, arbitrary coding, weather outside, etc.
  const isGeneralTrivia = [
    "capital of", "who is the president", "president of", "prime minister",
    "solve this math", "write a python script for", "write python code for", "write code for",
    "recipe for", "bitcoin price", "crypto price", "stock price", "write an essay",
    "tell me a joke", "latest news", "today news", "translate this", "weather in",
    "weather outside", "weather today", "what is the time in", "who won", "how old is"
  ].some(term => lower.includes(term));

  if (isGeneralTrivia && !lower.includes("lucy")) {
    return {
      reply: "I'm LUCY's website assistant, so I can help with LUCY, her features, installation, downloads, GitHub, pricing, and information on this website.",
      topic: "out_of_scope",
    };
  }

  // 4. CONVERSATIONAL INTENTS (GREETINGS, THANKS, AFFIRMATIONS)

  // Greetings: "hello", "hi", "hey", "hello dud", "yo", "sup", "good morning", etc.
  const isGreeting = (
    lower === "hello" || lower === "hi" || lower === "hey" || lower === "yo" || lower === "sup" ||
    lower.startsWith("hello") || lower.startsWith("hi ") || lower.startsWith("hey ") ||
    lower.includes("good morning") || lower.includes("good evening") || lower.includes("good afternoon")
  );
  if (isGreeting && !lower.includes("control") && !lower.includes("can") && !lower.includes("what") && !lower.includes("how")) {
    return {
      reply: `Hey! I'm ${BRAND.assistantName}'s website assistant. Ask me about ${BRAND.assistantName}, her features, installation, downloads, GitHub, or how she automates your desktop.`,
      topic: "greeting",
    };
  }

  // Thanks: "thanks", "thank you", "thx", "appreciate it"
  if (lower.includes("thank") || lower === "thx" || lower === "ty" || lower.includes("appreciate it")) {
    return {
      reply: `You're welcome! Let me know if you need any other details about ${BRAND.assistantName} or the download process.`,
      topic: "thanks",
    };
  }

  // Affirmations: "cool", "nice", "awesome", "great", "wonderful"
  if (lower === "cool" || lower === "nice" || lower === "awesome" || lower === "great" || lower === "sweet" || lower === "neat") {
    return {
      reply: `Glad you think so! Feel free to ask about any specific feature, or download ${BRAND.assistantName} to try her on your desktop.`,
      topic: "affirmation",
    };
  }

  // Acknowledgements: "ok", "okay", "got it", "understood", "alright"
  if (lower === "ok" || lower === "okay" || lower === "got it" || lower === "understood" || lower === "alright") {
    return {
      reply: "Ready whenever you are. What would you like to explore next?",
      topic: "affirmation",
    };
  }

  // Specific pronoun follow-up with a feature (e.g. "Can she do that with voice?", "Does she support voice?", "Can she do that in the browser?")
  if ((lower.includes("voice") || lower.includes("speech") || lower.includes("talk") || lower.includes("speak")) && (lower.includes("she") || lower.includes("that") || lower.includes("can") || lower.includes("does"))) {
    return {
      reply: `Yes, ${BRAND.assistantName} features real-time multimodal voice streaming:\n\n• Direct Gemini Live PCM bi-directional audio pipeline with zero external TTS lag (<120ms).\n• Local offline wake-word gating via openWakeWord ('hey_jarvis') with zero audio sent over the network while idle.\n• Instant barge-in via voice interruption or the ESC hotkey.\n• Switchable prebuilt voices (Puck, Charon, Kore, Fenrir, Aoede) and push-to-talk (Ctrl+Space).`,
      topic: "voice_audio",
    };
  }

  // Context-aware generic follow-ups: "tell me more", "how does that work", "why", "elaborate", "more details"
  const isFollowUp = (
    lower === "tell me more" || lower === "more" || lower.includes("tell me more") ||
    lower === "how does that work" || lower.includes("how does that work") ||
    lower === "why" || lower === "elaborate" ||
    ((lower.includes("can she do that") || lower.includes("can it do that")) && !lower.includes("voice") && !lower.includes("browser"))
  );

  if (isFollowUp) {
    const lastTopic = detectLastTopic(history);
    if (lastTopic === "pc_control") {
      return {
        reply: `${BRAND.assistantName}'s Cross-Platform Desktop Automation operates at the OS subprocess level:\n\n• Application Launcher: Searches and executes installed apps across Windows, macOS, and Linux.\n• Native Controls: Adjusts master volume, display brightness, and Wi-Fi, plus power actions (sleep, restart, shutdown).\n• Keystroke & Mouse Dispatch: Dispatches keyboard hotkeys and window management routines.\n• Safety Gates: Reversible vs. irreversible safeguards require your explicit verification before critical actions.`,
        topic: "pc_control",
      };
    }
    if (lastTopic === "voice_audio") {
      return {
        reply: `Voice interaction in ${BRAND.assistantName} is powered by the Gemini Live PCM protocol:\n\n• Bi-Directional Streaming: Sub-120ms latency audio via PyAudio directly to Gemini Live without external TTS lag.\n• Offline Wake-Word: Uses openWakeWord ('hey_jarvis' model) running 100% locally with zero audio transmission while asleep.\n• Instant Barge-In: Interrupt speech at any moment by speaking or pressing ESC.\n• Hardware Controls: In-app microphone and speaker hardware selector plus Ctrl+Space push-to-talk.`,
        topic: "voice_audio",
      };
    }
    if (lastTopic === "browser_automation") {
      return {
        reply: `${BRAND.assistantName}'s browser agent uses Playwright under the hood:\n\n• Dual Modes: Runs in both headless (background) and headful (visible) modes across Chromium and Firefox.\n• Querying: Performs search queries on DuckDuckGo and Google or navigates directly to URLs.\n• Page Interaction: Extracts text, clicks interactive elements, and completes multi-field forms automatically.`,
        topic: "browser_automation",
      };
    }
    if (lastTopic === "memory_subsystem") {
      return {
        reply: `The Long-Term Memory Subsystem is designed around user privacy:\n\n• Local Fact Store: Stored locally in SQLite and JSON vector format on your machine.\n• Floating Dashboard: A dedicated GUI panel lets you view, search, and delete individual memories with one click.\n• Context Summarizer: Intelligently condenses extended chat histories to retain key facts without token bloat.`,
        topic: "memory_subsystem",
      };
    }
    if (lastTopic === "personality_modes") {
      return {
        reply: `${BRAND.assistantName} provides 3 built-in personas with customizable visual representations:\n\n• GF: Warm, playful, and caring companion.\n• JARVIS: Authoritative operator with dry British wit.\n• ASSISTANT: Concise, direct, zero-fluff operator.\n• Visual HUD: Switch between a 3D holographic wireframe face with phonetic viseme lip-sync or an Arc Reactor core, with a full hex color picker.`,
        topic: "personality_modes",
      };
    }
    // Default follow up expansion
    return {
      reply: `${BRAND.assistantName} combines real-time voice, desktop control, browser automation, and local memory into one cross-platform desktop application.\n\nWould you like details on a specific feature, installation steps, or downloading the source code?`,
      topic: "core_features",
    };
  }

  // 5. SPECIFIC DOMAIN INTENTS

  // Intent: GENERAL AUTOMATION / HOW DOES AUTOMATION WORK
  if (
    lower.includes("how does automation work") ||
    lower.includes("how automation works") ||
    lower.includes("about automation") ||
    lower.includes("types of automation") ||
    lower.includes("what automation") ||
    lower === "automation" ||
    lower.includes("automation work") ||
    lower.includes("how does it automate")
  ) {
    return {
      reply: `${BRAND.assistantName} delivers two core layers of automation:\n\n1. Cross-Platform Desktop Automation: Dispatches OS subprocesses to search and open applications, manage windows, automate keystrokes, and control system volume, brightness, Wi-Fi, and power states.\n2. Browser Automation (Playwright): Navigates Chromium and Firefox in headless or headful mode, executes search queries, extracts page text, clicks buttons, and fills web forms.\n\nAll critical or irreversible system operations are protected by explicit safety confirmation gates.`,
      topic: "pc_control",
    };
  }

  // Intent: PC CONTROL / WHAT CAN LUCY CONTROL ON MY PC / DESKTOP WORKFLOWS
  if (
    lower.includes("control on my pc") ||
    lower.includes("control my pc") ||
    lower.includes("control my computer") ||
    lower.includes("control on pc") ||
    lower.includes("what can lucy control") ||
    lower.includes("what lucy can control") ||
    lower.includes("pc control") ||
    lower.includes("system control") ||
    lower.includes("interact with my operating system") ||
    lower.includes("interact with the os") ||
    lower.includes("control my os") ||
    (lower.includes("control") && (lower.includes("pc") || lower.includes("computer") || lower.includes("desktop") || lower.includes("windows") || lower.includes("mac")))
  ) {
    return {
      reply: `${BRAND.assistantName} is designed for system-level desktop automation across Windows, macOS, and Linux:\n\n• Applications: Searches and launches installed desktop applications natively.\n• Files & Workflows: Interacts with local files, directories, and developer workflows.\n• System Actions: Controls master audio volume, display brightness, Wi-Fi connectivity, and system power states (sleep, restart, shutdown).\n• Window & Keystrokes: Tracks active windows, dispatches keystroke shortcuts, and automates input.\n• Safety Confirmation Gate: Enforces explicit user verification before executing critical or irreversible operations.\n\nWould you like to know more about browser automation or file management?`,
      topic: "pc_control",
    };
  }

  // Intent: BROWSER AUTOMATION / PLAYWRIGHT / WEB
  if (
    lower.includes("browser") ||
    lower.includes("playwright") ||
    lower.includes("chromium") ||
    lower.includes("firefox") ||
    lower.includes("web automation") ||
    lower.includes("navigate the web") ||
    lower.includes("automate my browser") ||
    lower.includes("automate browser") ||
    (lower.includes("web") && lower.includes("automate"))
  ) {
    return {
      reply: `Yes, ${BRAND.assistantName} includes dedicated Browser Automation powered by Playwright:\n\n• Engines: Operates across Chromium and Firefox in both headless (background) and headful (visible) modes.\n• Web Navigation: Conducts autonomous searches and queries on DuckDuckGo and Google, or opens target URLs.\n• Full DOM Interaction: Extracts web text, clicks page elements, and fills multi-field forms autonomously.`,
      topic: "browser_automation",
    };
  }

  // Intent: FILES & FILE MANAGEMENT
  if (
    lower.includes("manage file") ||
    lower.includes("manage my file") ||
    lower.includes("files") ||
    lower.includes("folder") ||
    lower.includes("filesystem") ||
    lower.includes("file management") ||
    lower.includes("directory") ||
    (lower.includes("file") && (lower.includes("can") || lower.includes("does") || lower.includes("how")))
  ) {
    return {
      reply: `${BRAND.assistantName} includes local file-management and desktop workflow capabilities:\n\n• Local File Operations: Works directly with files and folders across your desktop environment.\n• Local Storage: Configuration and API keys are stored locally in config/api_keys.json (isolated from version control).\n• SQLite Fact Store: Long-term user memories and context are stored locally on your hard disk for complete data privacy.\n• Safety Safeguards: Uses confirmation prompts before executing critical file or system modifications.`,
      topic: "file_management",
    };
  }

  // Intent: VOICE CONTROL / SPEECH / AUDIO STREAMING
  if (
    lower.includes("voice") ||
    lower.includes("speech") ||
    lower.includes("audio") ||
    lower.includes("wake word") ||
    lower.includes("wakeword") ||
    lower.includes("microphone") ||
    lower.includes("barge in") ||
    lower.includes("talk to") ||
    lower.includes("speak")
  ) {
    return {
      reply: `${BRAND.assistantName} features Real-Time Multimodal Voice & Audio:\n\n• Zero-Lag Voice Streaming: Native bi-directional PyAudio streaming via Gemini Live PCM audio (<120ms latency, zero external TTS delay).\n• Offline Wake-Word: Powered by openWakeWord ('hey_jarvis' model) running 100% locally with zero network transmission while asleep.\n• Instant Barge-In: Voice Activity Detection (VAD) lets you interrupt ${BRAND.assistantName} at any point using your voice or the ESC key.\n• Voices & Hotkeys: Switchable Gemini Live voices (Puck, Charon, Kore, Fenrir, Aoede) and a push-to-talk hotkey (Ctrl+Space).`,
      topic: "voice_audio",
    };
  }

  // Intent: MEMORY / REMEMBERING THINGS / SQLITE
  if (
    lower.includes("remember") ||
    lower.includes("memory") ||
    lower.includes("sqlite") ||
    lower.includes("fact store") ||
    lower.includes("long term memory") ||
    lower.includes("dashboard") && lower.includes("memory")
  ) {
    return {
      reply: `Yes, ${BRAND.assistantName} has a Long-Term Memory Subsystem:\n\n• Persistent Context: Stores user preferences, habits, ongoing projects, and personal context across sessions.\n• 100% Local Privacy: Memories are stored locally on your disk in SQLite and JSON vector format.\n• Floating Memory Dashboard: A dedicated desktop panel lets you search, inspect, and delete stored memories with one click.\n• Context Summarization: Condenses extended conversations to prevent token bloat while keeping crucial facts intact.`,
      topic: "memory_subsystem",
    };
  }

  // Intent: PERSONALITY MODES & HUD
  if (
    lower.includes("personality") ||
    lower.includes("personalities") ||
    lower.includes("persona") ||
    lower.includes("modes") ||
    lower.includes("jarvis mode") ||
    lower.includes("gf mode") ||
    lower.includes("assistant mode") ||
    lower.includes("hud") ||
    lower.includes("avatar") ||
    lower.includes("arc reactor") ||
    lower.includes("wireframe")
  ) {
    return {
      reply: `${BRAND.assistantName} offers 3 distinct real-time personality modes:\n\n1. GF: A warm, playful, and caring companion.\n2. JARVIS: An authoritative operator with dry British wit.\n3. ASSISTANT: A concise, direct, zero-fluff professional assistant.\n\nVisual HUD options include a 3D holographic wireframe face with phonetic viseme lip-sync and eye saccades, or an Arc Reactor core, with custom hex color theming.`,
      topic: "personality_modes",
    };
  }

  // Intent: VISION / SCREEN CAPTURE / WEBCAM
  if (
    lower.includes("screen") ||
    lower.includes("webcam") ||
    lower.includes("vision") ||
    lower.includes("camera") ||
    lower.includes("see") ||
    lower.includes("visual")
  ) {
    return {
      reply: `${BRAND.assistantName} includes Visual Perception & Screen Understanding:\n\n• Screen Capture: Takes desktop screenshots for code troubleshooting, UI layout inspection, and visual reasoning.\n• Webcam Video Feed: Feeds live frames into Gemini Live for physical environment understanding.\n• Dual Source Labeling: Distinguishes between computer desktop state and webcam user environment.`,
      topic: "visual_perception",
    };
  }

  // Intent: GMAIL / WHATSAPP / MEDIA INTEGRATIONS
  if (
    lower.includes("gmail") ||
    lower.includes("whatsapp") ||
    lower.includes("email") ||
    lower.includes("youtube transcript") ||
    lower.includes("integration") ||
    lower.includes("integrations")
  ) {
    return {
      reply: `${BRAND.assistantName} includes several built-in communications and media integrations:\n\n• Gmail Automation: Reads inbox emails, summarizes unread threads, and drafts replies.\n• WhatsApp Web: Automates messaging through linked WhatsApp Web sessions.\n• Media & Data: Fetches and summarizes YouTube video transcripts, plus real-time weather and flight information.`,
      topic: "gmail_whatsapp",
    };
  }

  // Intent: SYSTEM METRICS / HARDWARE
  if (
    lower.includes("metric") ||
    lower.includes("cpu") ||
    lower.includes("ram") ||
    lower.includes("gpu") ||
    lower.includes("hardware") ||
    lower.includes("clipboard")
  ) {
    return {
      reply: `${BRAND.assistantName} integrates closely with your operating system metrics:\n\n• Real-Time Monitor: Visualizes CPU, RAM, and GPU load continuously.\n• Clipboard Monitor: Floating panel that triggers contextual AI actions when you copy text.\n• System Shortcuts: One-click native desktop and Start Menu shortcut generator with autostart on boot support (Windows, macOS, Linux).`,
      topic: "system_metrics",
    };
  }

  // Intent: MOBILE COMPANION / REMOTE APP / QR CODE
  if (
    lower.includes("mobile") ||
    lower.includes("phone") ||
    lower.includes("companion") ||
    lower.includes("remote") ||
    lower.includes("qr code") ||
    lower.includes("qr")
  ) {
    return {
      reply: `Yes, ${BRAND.assistantName} includes an Encrypted Mobile Companion:\n\n• Built-in Web Server: Powered by a local FastAPI TLS / HTTPS and WSS server.\n• Zero-Config QR Scan: Point your smartphone camera at the desktop QR code to link instantly without manual IP entry.\n• AES-256 GCM Encryption: End-to-end payload encryption securing all remote commands, audio uplinks, and system telemetry.`,
      topic: "mobile_security",
    };
  }

  // Intent: INSTALLATION / HOW TO INSTALL / REQUIREMENTS
  if (
    lower.includes("install") ||
    lower.includes("installation") ||
    lower.includes("how to run") ||
    lower.includes("how do i run") ||
    lower.includes("setup") ||
    lower.includes("requirements")
  ) {
    return {
      reply: `Here is the documented installation process for ${BRAND.assistantName}:\n\n1. Prerequisites: Python 3.10+, PyQt6, microphone, and a Google Gemini API key (BYOK model).\n2. Clone or Download: Obtain the repository from GitHub (${GITHUB_URL}).\n3. Install Dependencies: Run 'pip install -r requirements.txt'.\n4. Configuration: Save your Gemini API key in 'config/api_keys.json'.\n5. Launch: Run 'python main.py' to start ${BRAND.assistantName}.`,
      topic: "installation",
    };
  }

  // Intent: DOWNLOAD / WHERE TO DOWNLOAD / DOWNLOAD FLOW
  if (
    lower.includes("download") ||
    lower.includes("get lucy") ||
    lower.includes("where can i get") ||
    lower.includes("how to get")
  ) {
    return {
      reply: `To download ${BRAND.assistantName}:\n\n1. Click "Download ${BRAND.assistantName}" on this website.\n2. Complete the brief YouTube channel visit gate (${YOUTUBE_URL}) to access setup walkthroughs.\n3. Return here to unlock the verified release (${LUCY_RELEASE_NAME}) or view the repository (${GITHUB_URL}).`,
      topic: "download_flow",
    };
  }

  // Intent: GITHUB REPOSITORY / SOURCE CODE
  if (
    lower.includes("github") ||
    lower.includes("repo") ||
    lower.includes("repository") ||
    lower.includes("source code") ||
    lower.includes("git")
  ) {
    return {
      reply: `The official ${BRAND.assistantName} GitHub repository is available at:\n${GITHUB_URL}\n\nYou can clone the project, review documentation, inspect all source code, star the repository, and contribute pull requests.`,
      topic: "github_repo",
    };
  }

  // Intent: PRICING / COST / FREE / SUBSCRIPTION
  if (
    lower.includes("price") ||
    lower.includes("pricing") ||
    lower.includes("cost") ||
    lower.includes("how much") ||
    lower.includes("free") ||
    lower.includes("subscription") ||
    lower.includes("pay") ||
    lower.includes("license")
  ) {
    return {
      reply: `${BRAND.assistantName} is 100% Free and Open Source:\n\n• Zero Subscriptions: No monthly fees, no hidden checkouts, and no credit card required.\n• Bring Your Own Key (BYOK): Uses your own Google Gemini API key for cloud intelligence.\n• Full Source Access: The entire codebase is available freely on GitHub.`,
      topic: "pricing_license",
    };
  }

  // Intent: OPEN SOURCE / LICENSE
  if (
    lower.includes("open source") ||
    lower.includes("opensource") ||
    lower.includes("is lucy open")
  ) {
    return {
      reply: `Yes, ${BRAND.assistantName} is 100% open source. The full Python codebase is hosted on GitHub under an open license, allowing developers to inspect, customize, and extend her capabilities freely.`,
      topic: "pricing_license",
    };
  }

  // Intent: OPERATING SYSTEM / OS COMPATIBILITY
  if (
    lower.includes("operating system") ||
    lower.includes("os support") ||
    lower.includes("windows") ||
    lower.includes("mac") ||
    lower.includes("linux") ||
    lower.includes("macos") ||
    lower.includes("compatibility") ||
    lower.includes("platforms")
  ) {
    return {
      reply: `${BRAND.assistantName} is cross-platform and supports:\n\n• Windows: Windows 10 & 11\n• macOS: Intel & Apple Silicon (macOS 12+)\n• Linux: Modern distributions including Ubuntu, Debian, Fedora, and Arch\n\nBuilt with Python 3.10+ and PyQt6 for native performance across all three platforms.`,
      topic: "system_os",
    };
  }

  // Intent: SECURITY / PRIVACY / SAFETY / IS LUCY SAFE
  if (
    lower.includes("safe") ||
    lower.includes("security") ||
    lower.includes("privacy") ||
    lower.includes("data") ||
    lower.includes("secure") ||
    lower.includes("telemetry")
  ) {
    return {
      reply: `${BRAND.assistantName}'s documented security and privacy architecture includes:\n\n• 100% Local Storage: Long-term memory is stored locally in SQLite; API keys are kept in local config/api_keys.json.\n• Zero Idle Transmission: The openWakeWord engine runs locally without transmitting audio while asleep.\n• Safety Confirmation Gates: Reversible vs. irreversible action safeguards require explicit user confirmation before running critical system actions.\n• AES-256 GCM: The mobile companion uses end-to-end encryption for all remote commands.`,
      topic: "security_safety",
    };
  }

  // Intent: ABOUT / CREATOR / AUTHOR / SOREBLITZ / ALOK
  if (
    lower.includes("who created") ||
    lower.includes("who made") ||
    lower.includes("creator") ||
    lower.includes("developer") ||
    lower.includes("author") ||
    lower.includes("soreblitz") ||
    lower.includes("alok") ||
    lower.includes("contact")
  ) {
    return {
      reply: `${BRAND.assistantName} was created by ${BRAND.creatorName} (Owner: Alok).\n\nYou can reach out or join the community via:\n• YouTube: ${YOUTUBE_URL}\n• GitHub: ${GITHUB_URL}\n• Telegram: https://t.me/+AcLs7FW-Kpo0Mjll\n• Discord: https://discord.gg/WY5FWEpD5T\n• Email: jarvis.nets@gmail.com`,
      topic: "about_creator",
    };
  }

  // Intent: WHAT IS LUCY / ABOUT LUCY
  if (
    lower.includes("what is lucy") ||
    lower.includes("who is lucy") ||
    lower.includes("about lucy") ||
    lower === "what is" ||
    lower === "who is" ||
    (lower.includes("what") && lower.includes("lucy") && !lower.includes("can") && !lower.includes("control") && !lower.includes("do"))
  ) {
    return {
      reply: `${BRAND.assistantName} is an open-source, system-level desktop AI assistant built in Python and PyQt6.\n\nUnlike web chatbots confined to a browser tab, ${BRAND.assistantName} interacts directly with your desktop environment: executing applications, navigating browsers with Playwright, streaming real-time voice through Gemini Live, reading screens, and remembering context across sessions.`,
      topic: "what_is_lucy",
    };
  }

  // Intent: WHAT CAN LUCY DO / CAPABILITIES / FEATURES SUMMARY
  if (
    lower.includes("what can lucy do") ||
    lower.includes("what can she do") ||
    lower.includes("what can it do") ||
    lower.includes("capabilities") ||
    lower.includes("features") ||
    lower.includes("core features") ||
    lower.includes("what does lucy do")
  ) {
    return {
      reply: `${BRAND.assistantName} provides 10 documented core systems:\n\n1. Real-Time Multimodal Voice: Sub-120ms Gemini Live PCM audio streaming with offline wake-word.\n2. Autonomous Task Agent: Multi-step task planner with session boot OS self-awareness.\n3. Desktop Automation: App launching, volume, brightness, power, and keystroke dispatch.\n4. Browser Automation: Playwright web navigation, text extraction, and form filling.\n5. Long-Term Memory: Local SQLite fact store with a floating Memory Dashboard.\n6. Visual Perception: Desktop screen analysis and webcam video streaming.\n7. Communications: Gmail and WhatsApp automation, plus YouTube transcript extraction.\n8. Personalities & HUD: GF, JARVIS, and ASSISTANT personas with a 3D holographic HUD.\n9. System Metrics: Real-time CPU/RAM/GPU monitoring and clipboard triggers.\n10. Mobile Companion: Encrypted FastAPI HTTPS server with zero-config QR pairing.`,
      topic: "core_features",
    };
  }

  // Intent: FAQ
  if (lower.includes("faq") || lower.includes("questions") || lower.includes("frequently asked")) {
    return {
      reply: `The FAQ section covers 6 key topics:\n\n• Architecture & OS: How ${BRAND.assistantName} automates desktop applications and system controls.\n• Voice & Speech: Gemini Live PCM streaming, offline wake-word, and barge-in.\n• Personality & HUD: GF, JARVIS, ASSISTANT modes and holographic HUD customization.\n• Browser Automation: Playwright query execution and DOM parsing.\n• Mobile Companion: Encrypted FastAPI TLS server and QR pairing.\n• Privacy & Memory: 100% local SQLite memory and credential isolation.`,
      topic: "core_features",
    };
  }

  // 6. UNKNOWN LUCY QUESTIONS OR UNDOCUMENTED QUERIES
  if (lower.includes("lucy") || lower.includes("she") || lower.includes("assistant")) {
    return {
      reply: `I don't see that documented on the LUCY website yet.\n\nI can help you with documented features such as desktop automation, voice streaming, browser automation, long-term memory, personality modes, or installation instructions.`,
      topic: "unknown",
    };
  }

  // 7. DEFAULT FRIENDLY FALLBACK (NOT REPEATING GENERIC INTRO)
  return {
    reply: `I'm ${BRAND.assistantName}'s website assistant. I can answer questions about:\n\n• Desktop & PC Control: Applications, files, system power, volume, and Wi-Fi\n• Core Capabilities: Voice streaming, Playwright browser automation, and local SQLite memory\n• Project Details: Installation, download flow, GitHub repository, and open-source pricing\n\nWhat would you like to know?`,
    topic: "what_is_lucy",
  };
}
