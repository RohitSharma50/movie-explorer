/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep cinematic dark palette
        cinema: {
          black: "#0a0a0f",
          dark: "#111118",
          card: "#16161f",
          border: "#2a2a3a",
          accent: "#e8c547",      // Gold — classic movie marquee color
          "accent-hover": "#f0d060",
          red: "#e54545",
          muted: "#6b7280",
          text: "#e8e8f0",
          subtext: "#9090a8",
        },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],    // Bold titles
        body: ["'DM Sans'", "sans-serif"],        // Clean readable body
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "shimmer": "shimmer 1.5s infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(232,197,71,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(232,197,71,0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
