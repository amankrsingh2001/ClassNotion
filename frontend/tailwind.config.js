/** @type {import('tailwindcss').Config} */
// "Aurora Glass" — inspired by Nixtio's AI Learning Platform shot:
// near-black UI on a plum ambience, magenta→violet→peach glows, frosted glass, pills, progress rings.
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        night: "#0B0A0F", // page base
        surface: { DEFAULT: "#141218", 2: "#1C1922", 3: "#25212C" },
        plum: { DEFAULT: "#5B3F5A", deep: "#2A1D2C", soft: "#8A6787" },
        orchid: "#C86FD0",
        magenta: "#E25FA8",
        violet: "#8F6BF2",
        peach: "#F5B9A1",
        citrus: "#DDF247", // progress / highlight accent (the yellow-lime ring)
        mint: "#7FE3C3",
        rose: "#FF6B81",
      },
      backgroundImage: {
        brand: "linear-gradient(135deg, #F5B9A1 0%, #E25FA8 45%, #8F6BF2 100%)",
        "brand-soft":
          "linear-gradient(135deg, rgba(245,185,161,.25) 0%, rgba(226,95,168,.25) 45%, rgba(143,107,242,.25) 100%)",
        "photo-fade": "linear-gradient(180deg, rgba(11,10,15,0) 35%, rgba(11,10,15,.55) 70%, rgba(11,10,15,.92) 100%)",
        "pink-wash": "linear-gradient(180deg, rgba(226,95,168,0) 30%, rgba(226,95,168,.55) 100%)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgba(226,95,168,.55)",
        "glow-violet": "0 10px 40px -10px rgba(143,107,242,.6)",
        card: "0 30px 60px -30px rgba(0,0,0,.8)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,.08)",
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
