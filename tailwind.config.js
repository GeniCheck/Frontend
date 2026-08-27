/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#5B50E8",
        "brand-dark": "#493FD1", // brand 버튼 hover
        brand2: "#8B5CF6",
        "brand-light": "#EEF0FF",
        accent: "#F59E0B",
        "accent-dark": "#D98A09", // accent 버튼 hover
        "accent-light": "#FFFBEB", // accent 아이콘/뱃지 배경 틴트
        accent2: "#10B981",
        "accent2-light": "#ECFDF5", // accent2 아이콘 배경 틴트
        surface: "#F9FAFB",
        surface2: "#F3F4F6",
        text1: "#1A1A2E",
        text2: "#4B5563",
        text3: "#9CA3AF",
      },
      fontFamily: {
        // 사이트 전체 단일 서체. Bebas Neue / Space Mono 제거.
        sans: ['"Noto Sans KR"', "sans-serif"],
      },
      fontSize: {
        // text-xs(12px) 아래 마이크로 라벨용. 두 단계만 유지한다.
        "2xs": "11px",
        "3xs": "9px",
      },
    },
  },
  plugins: [],
};
