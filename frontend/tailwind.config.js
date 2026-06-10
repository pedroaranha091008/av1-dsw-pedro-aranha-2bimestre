/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        ink: {
          50: "#f5f5f0",
          100: "#e8e8e0",
          200: "#d0d0c4",
          300: "#a8a898",
          400: "#78786a",
          500: "#4a4a3e",
          600: "#363630",
          700: "#242420",
          800: "#161614",
          900: "#0e0e0c",
        },
        lime: {
          400: "#c8e645",
          500: "#b8d630",
          600: "#9ab820",
        },
      },
    },
  },
  plugins: [],
};