/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#5B50E8",
        "brand-hover": "#493fd1",
        brand2: "#8B5CF6",
        "brand-light": "#EEF0FF",
        accent: "#F59E0B",
        accent2: "#10B981",
        surface: "#F9FAFB",
        surface2: "#F3F4F6",
        text1: "#1A1A2E",
        text2: "#4B5563",
        text3: "#9CA3AF",
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', "sans-serif"],
        bebas: ['"Bebas Neue"', "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
      },
      animation: {
        "blob-float": "blobFloat 20s linear infinite",
      },
      keyframes: {
        blobFloat: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "1" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 30px) scale(0.97)" },
        },
      },
    },
  },
  plugins: [],
};
