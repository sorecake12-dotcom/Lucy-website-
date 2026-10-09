export type TerminalState = 
  | "INITIALIZING" 
  | "ANALYZING" 
  | "PROCESSING" 
  | "EXECUTING" 
  | "COMPLETED" 
  | "IDLE";

export type TerminalSubsystem = 
  | "SYS" 
  | "PERCEPTION" 
  | "VOICE" 
  | "MEMORY" 
  | "AUTOMATION" 
  | "CORE" 
  | "INPUT"
  | "PROCESSING"
  | "COMPLETED"
  | "IDLE";

export interface TerminalMessageTemplate {
  subsystem: TerminalSubsystem;
  text: string;
  state: TerminalState;
  delayBefore?: number; // ms to pause before starting to type this line
  highlight?: boolean;
}

/**
 * Predefined simulated system status messages representing LUCY desktop assistant activity.
 * NOTE: These are simulated UI status events demonstrating system telemetry and automation phases.
 * They do not expose or represent private chain-of-thought or hidden reasoning.
 */
export const SIMULATED_TERMINAL_STREAM: TerminalMessageTemplate[] = [
  {
    subsystem: "SYS",
    text: "Initializing LUCY core desktop runtime environment...",
    state: "INITIALIZING",
    delayBefore: 300,
  },
  {
    subsystem: "SYS",
    text: "Neural interface & local IPC daemon: ONLINE [pid: 8042]",
    state: "INITIALIZING",
    delayBefore: 400,
  },
  {
    subsystem: "PERCEPTION",
    text: "Loading vision perception, screen OCR, and active viewport detector...",
    state: "INITIALIZING",
    delayBefore: 450,
  },
  {
    subsystem: "VOICE",
    text: "Gemini Live 2.0 bidirectional low-latency audio pipe: READY [48kHz PCM]",
    state: "INITIALIZING",
    delayBefore: 450,
    highlight: true,
  },
  {
    subsystem: "MEMORY",
    text: "Local vector memory mounted (ChromaDB). Context graph: READY",
    state: "INITIALIZING",
    delayBefore: 400,
  },
  {
    subsystem: "AUTOMATION",
    text: "OS automation bridge & Playwright browser driver: READY",
    state: "INITIALIZING",
    delayBefore: 400,
  },
  {
    subsystem: "INPUT",
    text: "Voice stream detected: \"Lucy, summarize the active code changes and organize downloads.\"",
    state: "ANALYZING",
    delayBefore: 650,
    highlight: true,
  },
  {
    subsystem: "PERCEPTION",
    text: "Analyzing active display buffer (1920x1080). Focused window: VSCode IDE",
    state: "ANALYZING",
    delayBefore: 500,
  },
  {
    subsystem: "PROCESSING",
    text: "Processing intent parameters and verifying security boundaries...",
    state: "PROCESSING",
    delayBefore: 550,
  },
  {
    subsystem: "SYS",
    text: "Execution graph synthesized: 2 parallel tasks dispatched (Filesystem, Speech)",
    state: "PROCESSING",
    delayBefore: 500,
  },
  {
    subsystem: "AUTOMATION",
    text: "Executing file classifier: 12 assets routed to destination directories...",
    state: "EXECUTING",
    delayBefore: 600,
  },
  {
    subsystem: "AUTOMATION",
    text: "Inspecting git working tree: 3 commits validated. Workspace in clean state.",
    state: "EXECUTING",
    delayBefore: 550,
  },
  {
    subsystem: "VOICE",
    text: "Streaming natural audio reply to user: \"I've sorted your workspace and verified git.\"",
    state: "EXECUTING",
    delayBefore: 600,
    highlight: true,
  },
  {
    subsystem: "COMPLETED",
    text: "Task sequence completed in 184ms. Zero private telemetry dispatched to cloud.",
    state: "COMPLETED",
    delayBefore: 650,
    highlight: true,
  },
  {
    subsystem: "IDLE",
    text: "LUCY is standing by. Microphone active [ESC to interrupt]. Awaiting next command...",
    state: "IDLE",
    delayBefore: 700,
  },
];

export const STATE_CONFIG: Record<
  TerminalState,
  { label: string; bg: string; text: string; border: string; glow: string }
> = {
  INITIALIZING: {
    label: "INITIALIZING",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    glow: "shadow-[0_0_10px_rgba(245,158,11,0.3)]",
  },
  ANALYZING: {
    label: "ANALYZING",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/30",
    glow: "shadow-[0_0_10px_rgba(6,182,212,0.3)]",
  },
  PROCESSING: {
    label: "PROCESSING",
    bg: "bg-brand-magenta/10",
    text: "text-brand-magenta",
    border: "border-brand-magenta/30",
    glow: "shadow-[0_0_10px_rgba(224,0,168,0.3)]",
  },
  EXECUTING: {
    label: "EXECUTING",
    bg: "bg-brand-primary/15",
    text: "text-brand-primary",
    border: "border-brand-primary/40",
    glow: "shadow-[0_0_10px_rgba(168,85,247,0.3)]",
  },
  COMPLETED: {
    label: "COMPLETED",
    bg: "bg-brand-accent/15",
    text: "text-brand-accent",
    border: "border-brand-accent/40",
    glow: "shadow-[0_0_10px_rgba(0,229,160,0.3)]",
  },
  IDLE: {
    label: "IDLE",
    bg: "bg-brand-accent/10",
    text: "text-brand-accent",
    border: "border-brand-accent/30",
    glow: "shadow-[0_0_8px_rgba(0,229,160,0.25)]",
  },
};
