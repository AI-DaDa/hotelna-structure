import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Dubai", "sans-serif"],
        heading: ["Dubai", "sans-serif"],
        "dubai-light": ["Dubai", "sans-serif"],
        "dubai-regular": ["Dubai", "sans-serif"],
        "dubai-medium": ["Dubai", "sans-serif"],
        "dubai-bold": ["Dubai", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        bold: "700",
      },
    },
  },
  plugins: [],
};

export default config;
