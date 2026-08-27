import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";

/**
 * All three faces are fetched at build time and served from our own origin by
 * next/font — no runtime requests to Google.
 */

export const display = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-display",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

export const fontVariables = [display.variable, body.variable, mono.variable].join(" ");
