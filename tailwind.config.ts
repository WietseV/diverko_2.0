import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary_dark: "#545454",
        secondary: "#3c91e6",
        secondary_dark: "#155CA2",
        primary_light: "#efe7da",
      },
    },
  },
  plugins: [],
} satisfies Config;
