import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "900": "900px",
      },
      width: {
        "900": "900px",
      },
      colors: {
        background: {
          dark: "#282828",
          light: "#DADEDB",
        },
        text: {
          dark: "#DADEDB",
          light: "#282828",
        },
        background_secondary: {
          dark: "#484848",
          light: "#fff",
        },
        element_background: {
          dark: "#383838",
          light: "#e8e8e8",
        },
        hot_pink: {
          normal: "#DE90C1",
          darken: "#C26B9E",
        },
        light_pink: {
          normal: "#FFD0EE",
          darken: "#FFB3E0",
        },
        error: {
          dark: "#E33D3D",
          light: "#E33D3D",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
