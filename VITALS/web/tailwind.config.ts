import type { Config } from "tailwindcss";

/**
 * Tokens "warm clinical" — reusados del design system de Pulso (02_DESIGN_SYSTEM) y del
 * portal del paciente LIVIANO (microcemento + salvia + latón). Definidos como CSS vars en
 * globals.css y expuestos aquí a Tailwind.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--mv-bg)",
        elevated: "var(--mv-bg-elevated)",
        raised: "var(--mv-bg-raised)",
        subtle: "var(--mv-bg-subtle)",
        muted: "var(--mv-bg-muted)",
        ink: "var(--mv-ink)",
        "ink-secondary": "var(--mv-ink-secondary)",
        "ink-muted": "var(--mv-ink-muted)",
        "ink-inverse": "var(--mv-ink-inverse)",
        sage: "var(--mv-sage)",
        "sage-deep": "var(--mv-sage-deep)",
        "sage-light": "var(--mv-sage-light)",
        "sage-subtle": "var(--mv-sage-subtle)",
        brass: "var(--mv-brass)",
        "brass-deep": "var(--mv-brass-deep)",
        "brass-subtle": "var(--mv-brass-subtle)",
        navy: "var(--mv-navy)",
        line: "var(--mv-line)",
        "line-subtle": "var(--mv-line-subtle)",
        success: "var(--mv-success)",
        "success-subtle": "var(--mv-success-subtle)",
        warn: "var(--mv-warn)",
        "warn-subtle": "var(--mv-warn-subtle)",
        danger: "var(--mv-danger)",
        "danger-subtle": "var(--mv-danger-subtle)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        sm: "var(--mv-shadow-sm)",
        md: "var(--mv-shadow-md)",
        lg: "var(--mv-shadow-lg)",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "26px",
      },
      keyframes: {
        enter: { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        pop: { "0%": { transform: "scale(0.96)" }, "60%": { transform: "scale(1.02)" }, "100%": { transform: "scale(1)" } },
      },
      animation: {
        enter: "enter 0.4s ease-out both",
        pop: "pop 0.3s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
