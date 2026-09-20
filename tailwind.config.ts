import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0c",
        foreground: "#f4f4f5",
        surface: {
          DEFAULT: "#18181b", // zinc-900
          hover: "#27272a",   // zinc-800
          subtle: "#121215",
        },
        border: {
          DEFAULT: "#27272a", // zinc-800
          subtle: "#1f1f23",
          strong: "#3f3f46", // zinc-700
        },
        accent: {
          DEFAULT: "#06b6d4", // cyan-500
          hover: "#0891b2",   // cyan-600
          subtle: "rgba(6, 182, 212, 0.12)",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#a1a1aa", // zinc-400
          foreground: "#71717a", // zinc-500
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
