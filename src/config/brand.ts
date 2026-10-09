export interface BrandConfig {
  assistantName: string;
  ownerName: string;
  creatorName: string;
  tagline: string;
  colors: {
    primary: string;
    secondary: string;
    magenta: string;
    soft: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    mutedText: string;
  };
}

/**
 * Centralized Brand & Visual Identity Configuration for the Website.
 * Modifying values here updates all references and theme variables across the application.
 */
export const BRAND: BrandConfig = {
  assistantName: "LUCY",
  ownerName: "Alok",
  creatorName: "Soreblitz",
  tagline: "Futuristic Real-Time Desktop AI Assistant",

  colors: {
    primary: "#A855F7",       // Primary Purple
    secondary: "#7E22CE",     // Deep Purple
    magenta: "#E000A8",       // Neon Magenta
    soft: "#C084FC",          // Soft Purple
    accent: "#00E5A0",        // Emerald Accent (functional: online, active mic, status, positive state)
    background: "#08030D",    // Dark Background
    surface: "#11071A",       // Dark Surface
    text: "#F5EFFF",          // Text
    mutedText: "#A99BB8",     // Muted Text
  },
};

// Reusable individual theme tokens as required by specification
export const ASSISTANT_NAME = BRAND.assistantName;
export const OWNER_NAME = BRAND.ownerName;
export const CREATOR_NAME = BRAND.creatorName;

export const BRAND_PRIMARY = BRAND.colors.primary;
export const BRAND_SECONDARY = BRAND.colors.secondary;
export const BRAND_MAGENTA = BRAND.colors.magenta;
export const BRAND_SOFT = BRAND.colors.soft;
export const BRAND_ACCENT = BRAND.colors.accent;
export const BACKGROUND = BRAND.colors.background;
export const SURFACE = BRAND.colors.surface;
export const TEXT = BRAND.colors.text;
export const MUTED_TEXT = BRAND.colors.mutedText;

/**
 * Applies the centralized brand colors as CSS custom properties on document.documentElement.
 * This ensures that changing BRAND.colors immediately propagates across all CSS variables
 * and Tailwind utility classes throughout the entire website.
 */
export function applyBrandTheme(): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  // Ensure any previous light mode flags are cleared
  root.removeAttribute("data-theme");
  root.classList.remove("light");
  root.classList.add("dark");
  try {
    localStorage.removeItem("lucy_theme_mode");
  } catch {
    // ignore
  }

  // Semantic base tokens
  root.style.setProperty("--color-primary", BRAND.colors.primary);
  root.style.setProperty("--color-secondary", BRAND.colors.secondary);
  root.style.setProperty("--color-magenta", BRAND.colors.magenta);
  root.style.setProperty("--color-soft", BRAND.colors.soft);
  root.style.setProperty("--color-accent", BRAND.colors.accent);
  root.style.setProperty("--color-background", BRAND.colors.background);
  root.style.setProperty("--color-surface", BRAND.colors.surface);
  root.style.setProperty("--color-text", BRAND.colors.text);
  root.style.setProperty("--color-muted", BRAND.colors.mutedText);

  // Brand prefixed tokens
  root.style.setProperty("--color-brand-primary", BRAND.colors.primary);
  root.style.setProperty("--color-brand-secondary", BRAND.colors.secondary);
  root.style.setProperty("--color-brand-magenta", BRAND.colors.magenta);
  root.style.setProperty("--color-brand-soft", BRAND.colors.soft);
  root.style.setProperty("--color-brand-accent", BRAND.colors.accent);
  root.style.setProperty("--color-brand-bg", BRAND.colors.background);
  root.style.setProperty("--color-brand-surface", BRAND.colors.surface);
  root.style.setProperty("--color-brand-text", BRAND.colors.text);
  root.style.setProperty("--color-brand-muted", BRAND.colors.mutedText);
}
