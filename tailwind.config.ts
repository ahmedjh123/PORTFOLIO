import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      paper: "#f7f7f7",
      scandi: "#e8eef5",
      ink: "#111111",
      muted: "#4a4a4a",
      "muted-onDark": "#b5b8bd",
      faint: "#8a8a8a",
      "faint-onDark": "#8d9096",
      line: "#dcdcd4",
      "line-onDark": "rgba(247,247,247,0.14)",
      blue: {
        DEFAULT: "#0066ff",
        deep: "#0050cc",
      },
      graphite: {
        DEFAULT: "#1e1e1e",
        soft: "#2a2a2a",
      },
      error: {
        DEFAULT: "#c0392b",
        onDark: "#ff8a76",
      },
    },
    fontFamily: {
      display: ["var(--font-display)", "system-ui", "sans-serif"],
      body: ["var(--font-body)", "system-ui", "sans-serif"],
      mono: ["var(--font-mono)", "ui-monospace", "monospace"],
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1.4" }],
      sm: ["0.875rem", { lineHeight: "1.5" }],
      base: ["1rem", { lineHeight: "1.65" }],
      lg: ["1.125rem", { lineHeight: "1.7" }],
      xl: ["1.375rem", { lineHeight: "1.6" }],
      "2xl": ["1.75rem", { lineHeight: "1.3" }],
      "3xl": ["2.25rem", { lineHeight: "1.2" }],
      "4xl": ["3rem", { lineHeight: "1.1" }],
      "5xl": ["4rem", { lineHeight: "1.05" }],
      "6xl": ["5.5rem", { lineHeight: "0.98" }],
    },
    extend: {
      maxWidth: {
        content: "1240px",
      },
      spacing: {
        section: "clamp(3.25rem, 7vw, 5.5rem)",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tight: "-0.02em",
        wide: "0.08em",
        widest: "0.18em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
