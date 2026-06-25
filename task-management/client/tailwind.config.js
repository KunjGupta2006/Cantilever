/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#FAFAFA",
          dark: "#09090B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          secondary: "#F5F5F5",
          dark: "#18181B",
          "dark-secondary": "#27272A",
        },
        border: {
          DEFAULT: "#E4E4E7",
          dark: "#3F3F46",
        },
        primary: {
          DEFAULT: "#111827",
          dark: "#FAFAFA",
        },
        accent: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          dark: "#3B82F6",
          "hover-dark": "#2563EB",
        },
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
        "text-primary": {
          DEFAULT: "#18181B",
          dark: "#FAFAFA",
        },
        "text-secondary": {
          DEFAULT: "#71717A",
          dark: "#A1A1AA",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["36px", "1.1"],
        "page-heading": ["28px", "1.2"],
        "section-heading": ["20px", "1.3"],
        body: ["15px", "1.5"],
        sm: ["13px", "1.5"],
        xs: ["12px", "1.5"],
      },
      spacing: {
        4.5: "18px",
      },
      borderRadius: {
        input: "12px",
        card: "16px",
        modal: "20px",
      },
      boxShadow: {
        subtle: "0px 1px 2px rgba(0,0,0,.05)",
        medium: "0px 4px 10px rgba(0,0,0,.06)",
        strong: "0px 10px 25px rgba(0,0,0,.08)",
      },
    },
  },
  plugins: [],
};
