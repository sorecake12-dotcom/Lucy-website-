/**
 * LUCY Centralized Download, Community & Repository Configuration
 * Update these settings to distribute new verified releases across the application.
 */

// Official YouTube Channel Destination for Download Gate Verification
export const YOUTUBE_URL = "https://youtube.com/@jarvisnets";

// Official GitHub Repository URL
export const GITHUB_URL = "https://github.com/sorecake12-dotcom/lucy-ai";

/**
 * Release Versioning & Distribution Architecture
 *
 * Configured for the verified repository archive distribution (main.zip).
 */
const rawVersion = 
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_LUCY_RELEASE_VERSION) ||
  (typeof process !== "undefined" && process.env?.VITE_LUCY_RELEASE_VERSION) ||
  "v1.0.0";

// Strict validation: version must be a clean version tag (e.g., "v1.0.0", "1.0.0", "1.2.3")
// Rejects any leaked URLs ("http", "github", "/") or corrupted environment variables
const isCleanVersion = typeof rawVersion === "string" &&
  rawVersion.length > 0 &&
  rawVersion.length <= 15 &&
  !rawVersion.startsWith("http") &&
  !rawVersion.includes("/") &&
  !rawVersion.includes("github");

export const LUCY_RELEASE_VERSION = isCleanVersion ? rawVersion.trim() : "v1.0.0";

export const LUCY_RELEASE_NAME = `LUCY Official Release (${LUCY_RELEASE_VERSION.startsWith("v") ? LUCY_RELEASE_VERSION : `v${LUCY_RELEASE_VERSION}`})`;
export const LUCY_RELEASE_FILENAME = "main.zip";

// GitHub latest releases navigation URL
export const RELEASES_PAGE_URL = "https://github.com/sorecake12-dotcom/lucy-ai/releases";

// Default direct verified download artifact URL (points to official GitHub main branch package)
export const DEFAULT_DOWNLOAD_URL = "https://github.com/sorecake12-dotcom/lucy-ai/archive/refs/heads/main.zip";

// Environment variable override support for instant release artifact switching
const envDownloadUrl = 
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_DOWNLOAD_URL) ||
  (typeof process !== "undefined" && process.env?.VITE_DOWNLOAD_URL) ||
  undefined;

// Active download target (points directly to the latest verified standalone release)
export const DOWNLOAD_URL = envDownloadUrl || DEFAULT_DOWNLOAD_URL;

// Backward-compatible exports for existing imports
export const YOUTUBE_CHANNEL_URL = YOUTUBE_URL;
export const OFFICIAL_GITHUB_REPO_URL = GITHUB_URL;

// Optional environment variable override support with safety validation
const rawEnvUrl = 
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GITHUB_REPO_URL) ||
  (typeof process !== "undefined" && process.env?.VITE_GITHUB_REPO_URL) ||
  undefined;

const isValidUrl = typeof rawEnvUrl === "string" && 
  rawEnvUrl.startsWith("https://") && 
  !rawEnvUrl.includes("AQ.") &&
  rawEnvUrl.includes("github.com");

export const GITHUB_REPO_URL = isValidUrl ? rawEnvUrl : GITHUB_URL;
