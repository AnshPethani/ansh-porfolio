import type { Config } from "tailwindcss";

/**
 * Tokens are declared as CSS variables in app/globals.css and only referenced
 * here, so runtime theming stays possible without touching class names.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    // Replaces (not extends) the default palette so no stock Tailwind colors leak in.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      bg: "rgb(var(--bg) / <alpha-value>)",
      surface: "rgb(var(--surface) / <alpha-value>)",
      ink: {
        DEFAULT: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--ink-muted) / <alpha-value>)",
      },
      accent: {
        DEFAULT: "rgb(var(--accent) / <alpha-value>)",
        soft: "rgb(var(--accent-soft) / <alpha-value>)",
      },
      line: "rgb(var(--line) / <alpha-value>)",
    },
    // Replaces the default scale: 14/16/18/24/32/48/64 only.
    fontSize: {
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.65" }],
      lg: ["1.125rem", { lineHeight: "1.7" }],
      xl: ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
      "2xl": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
      "3xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      "4xl": ["4rem", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
      },
      letterSpacing: {
        label: "0.12em",
        "label-wide": "0.18em",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        card: "8px",
        full: "9999px",
      },
      // Hairline-first: the only allowed shadow is a very soft, low-opacity blur.
      boxShadow: {
        hairline: "0 0 0 1px rgb(var(--line) / 1)",
        soft: "0 4px 8px -4px rgb(var(--ink) / 0.08)",
        none: "none",
      },
      maxWidth: {
        prose: "48rem", // 768px — text-heavy single-column sections
        content: "72rem", // 1152px — wider card grids
      },
      spacing: {
        header: "3.75rem", // 60px sticky header height
        section: "5.5rem",
        "section-lg": "8rem",
      },
      transitionDuration: {
        DEFAULT: "180ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "fade-rise": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "none" },
        },
        "draw-edge": {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 500ms cubic-bezier(0.4, 0, 0.2, 1) both",
        "draw-edge": "draw-edge 700ms cubic-bezier(0.4, 0, 0.2, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
