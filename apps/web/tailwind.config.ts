import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#faf8f5",
          100: "#f3efe8",
          200: "#e8dfd2",
          300: "#d9cbb8",
          400: "#c4ad94",
          500: "#a89078",
          600: "#8f7762",
          700: "#75604f",
          800: "#614f43",
          900: "#514338",
        },
        lagoon: {
          50: "#f0f9f8",
          100: "#d9f0ee",
          200: "#b6e2de",
          300: "#86ccc6",
          400: "#56afa8",
          500: "#3d948d",
          600: "#2f776f",
          700: "#29605b",
          800: "#244e4a",
          900: "#21413f",
        },
        coral: {
          400: "#e8a598",
          500: "#d48474",
          600: "#c06a58",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
