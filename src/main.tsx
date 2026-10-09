/// <reference path="../declarations.d.ts" />
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Terms from './pages/Terms.tsx';
import Privacy from './pages/Privacy.tsx';
import { applyBrandTheme, BRAND } from './config/brand.ts';
import './index.css';

// Apply brand theme variables to document root immediately
applyBrandTheme();
if (typeof document !== 'undefined') {
  document.title = `${BRAND.assistantName} — ${BRAND.tagline}`;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
