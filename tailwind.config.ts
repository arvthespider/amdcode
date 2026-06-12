import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        ivory: "#fcfcf8",
        ink: "#0f172a",
        muted: "#64748b",
        line: "rgba(15, 23, 42, 0.08)"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(15, 23, 42, 0.08)",
        float: "0 30px 80px rgba(15, 23, 42, 0.12)"
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
        display: ["var(--font-montserrat)", "Montserrat", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
