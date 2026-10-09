// Ambient declarations for IDE resolution before npm install
declare module "express" {
  const express: any;
  export type Request = any;
  export type Response = any;
  export type NextFunction = any;
  export default express;
}

declare module "path" {
  const path: any;
  export default path;
}

declare module "vite" {
  export const createServer: any;
  export const defineConfig: any;
  export default any;
}

declare module "express-rate-limit" {
  const rateLimit: any;
  export default rateLimit;
}

declare module "cors" {
  const cors: any;
  export default cors;
}

declare module "dotenv" {
  const dotenv: any;
  export default dotenv;
}

declare module "@google/genai" {
  export class GoogleGenAI {
    constructor(...args: any[]);
    models: any;
  }
}

declare var process: {
  env: Record<string, string | undefined>;
  cwd: () => string;
};

declare module "react" {
  export const useState: any;
  export const useEffect: any;
  export const useRef: any;
  export const useMemo: any;
  export const useCallback: any;
  export const createContext: any;
  export const useContext: any;
  export const StrictMode: any;
  export type ReactNode = any;
  export type FC<P = {}> = any;
  export type MouseEvent<T = any> = any;
  const React: any;
  export default React;
}

declare module "react/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module "react-dom/client" {
  export const createRoot: any;
}

declare module "react-router-dom" {
  export const BrowserRouter: any;
  export const Routes: any;
  export const Route: any;
  export const Link: any;
  export const useNavigate: any;
  export const useLocation: any;
}

declare module "motion/react" {
  export const motion: any;
  export const AnimatePresence: any;
  export const useMotionValue: any;
  export const useSpring: any;
  export const useTransform: any;
}

declare module "lucide-react" {
  export const Eye: any;
  export const Menu: any;
  export const X: any;
  export const Youtube: any;
  export const Mail: any;
  export const MessageSquare: any;
  export const Shield: any;
  export const FileText: any;
  export const ExternalLink: any;
  export const ArrowRight: any;
  export const Download: any;
  export const Check: any;
  export const CheckCircle2: any;
  export const RefreshCw: any;
  export const Sparkles: any;
  export const ChevronDown: any;
  export const HelpCircle: any;
  export const Terminal: any;
  export const Cpu: any;
  export const ShieldCheck: any;
  export const Workflow: any;
  export const Volume2: any;
  export const Code2: any;
}

declare module "@tailwindcss/vite" {
  const tailwindcss: any;
  export default tailwindcss;
}

declare module "@vitejs/plugin-react" {
  const react: any;
  export default react;
}
