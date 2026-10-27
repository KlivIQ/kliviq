/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
