/** @type {import('tailwindcss').Config} */
// Shared semantic colors support light and dark modes.
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        background: "rgb(var(--canvas) / <alpha-value>)",
        foreground: "rgb(var(--ink) / <alpha-value>)",
        night: "rgb(var(--canvas) / <alpha-value>)",
        surface: { DEFAULT: "rgb(var(--surface) / <alpha-value>)", 2: "rgb(var(--surface-2) / <alpha-value>)", 3: "rgb(var(--surface-3) / <alpha-value>)" },
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        plum: { DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)", deep: "rgb(var(--surface-2) / <alpha-value>)", soft: "rgb(var(--accent-rgb) / <alpha-value>)" },
        orchid: "rgb(var(--accent-rgb) / <alpha-value>)",
        magenta: "rgb(var(--accent-rgb) / <alpha-value>)",
        violet: "rgb(var(--accent-rgb) / <alpha-value>)",
        peach: "rgb(var(--accent-rgb) / <alpha-value>)",
        citrus: "rgb(var(--success-rgb) / <alpha-value>)",
        mint: "rgb(var(--success-rgb) / <alpha-value>)",
        rose: "rgb(var(--danger-rgb) / <alpha-value>)",
      },
      backgroundImage: {
        brand: "linear-gradient(var(--accent), var(--accent))",
        "brand-soft": "linear-gradient(135deg, var(--accent-soft), transparent)",
        "photo-fade": "linear-gradient(180deg, rgba(11,10,15,0) 35%, rgba(11,10,15,.55) 70%, rgba(11,10,15,.92) 100%)",
        "pink-wash": "linear-gradient(180deg, rgba(15,23,42,0) 30%, rgba(15,23,42,.18) 100%)",
      },
      borderRadius: {
        "4xl": "1rem",
        "5xl": "1.25rem",
      },
      boxShadow: {
        glow: "none",
        "glow-violet": "none",
        card: "var(--shadow)",
        inset: "none",
      },
      maxWidth: {
        maxContent: "1280px",
        maxContentTab: "650px",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        floaty: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        drift: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(40px,-30px) scale(1.08)" },
          "66%": { transform: "translate(-30px,20px) scale(.95)" },
        },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};
