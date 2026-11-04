import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDF8F1",
        ink: {
          DEFAULT: "#14110F",
          soft: "#3B3530",
          faint: "#787C85",
        },
        muted: "#6B655E",
        rule: "#E7DFD2",
        line: "#E7DFD2",
        yellow: {
          DEFAULT: "#FFC940",
          hover: "#F5BE30",
        },
        coral: "#FF6B5A",
        mint: "#7BE0AD",
        blue: "#4F7CFF",
        lilac: "#C9BDF5",
        sky: "#A8D8FF",
        peach: "#FFD9C7",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        solid: "3px 3px 0px #14110F",
        "solid-sm": "2px 2px 0px #14110F",
        "solid-lg": "5px 5px 0px #14110F",
      },
    },
  },
  plugins: [],
};

export default config;
