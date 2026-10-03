import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#123D2B",
        deep: "#1F5138",
        natural: "#527A5A",
        sage: "#A9BDA8",
        cream: "#F7F4EC",
        warm: "#FCFBF7",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: { soft: "0 10px 30px -12px rgba(18,61,43,0.25)" },
    },
  },
  plugins: [],
};
export default config;
