import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Colours (all reference CSS vars from globals.css) ──────────────
      colors: {
        background:  "var(--background)",
        "background-alt": "var(--background-alt)",
        surface:     "var(--surface)",
        "surface-hover":  "var(--surface-hover)",
        "surface-raised": "var(--surface-raised)",

        foreground:  "var(--foreground)",
        muted:       "var(--foreground-muted)",
        subtle:      "var(--foreground-subtle)",
        inverse:     "var(--foreground-inverse)",

        primary: {
          DEFAULT: "var(--primary)",
          hover:   "var(--primary-hover)",
          muted:   "var(--primary-muted)",
          subtle:  "var(--primary-subtle)",
          fg:      "var(--primary-fg)",
        },

        accent: {
          DEFAULT: "var(--accent)",
          muted:   "var(--accent-muted)",
          subtle:  "var(--accent-subtle)",
        },

        success:          "var(--success)",
        "success-muted":  "var(--success-muted)",
        warning:          "var(--warning)",
        "warning-muted":  "var(--warning-muted)",
        destructive:      "var(--destructive)",
        "destructive-muted": "var(--destructive-muted)",
        "destructive-fg": "var(--destructive-fg)",

        border:        "var(--border)",
        "border-strong": "var(--border-strong)",
        "border-focus":  "var(--border-focus)",
      },

      // ── Fonts ──────────────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },

      // ── Border radius ──────────────────────────────────────────────────
      // One system, applied consistently.
      borderRadius: {
        sm:   "var(--radius-sm)",   // 6px  — inline badges, tight chips
        DEFAULT: "var(--radius)",   // 10px — buttons, inputs
        md:   "var(--radius-md)",   // 12px — small cards
        lg:   "var(--radius-lg)",   // 16px — main cards, sidebar items
        xl:   "var(--radius-xl)",   // 24px — modals, drawer surfaces
        full: "var(--radius-full)", // pills only
      },

      // ── Box shadows ────────────────────────────────────────────────────
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },

      // ── Transitions ────────────────────────────────────────────────────
      transitionTimingFunction: {
        spring: "var(--ease-spring)",
        smooth: "var(--ease-smooth)",
      },
      transitionDuration: {
        fast:   "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow:   "var(--duration-slow)",
      },

      // ── Spacing ────────────────────────────────────────────────────────
      // Keep Tailwind's default scale but document what we use at what level:
      // 4 = 16px,  6 = 24px,  8 = 32px,  10 = 40px,  12 = 48px
    },
  },
  plugins: [],
};

export default config;