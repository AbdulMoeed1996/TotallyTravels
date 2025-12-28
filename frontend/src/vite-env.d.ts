/// <reference types="vite/client" />

// This project imports plain CSS files (e.g. "./styles/hero.css").
// Add lightweight module declarations so TypeScript + VSCode don't error.
declare module '*.css';

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}