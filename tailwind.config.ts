import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#020817",
        ink: "#061124",
        gold: "#d9aa47",
        champagne: "#fff3c8"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        aureate: "0 0 55px rgba(217, 170, 71, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
