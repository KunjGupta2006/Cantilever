/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1",
          hover: "#4F46E5",
        },
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        surface: "#F8FAFC",
        card: "#FFFFFF",
        "text-primary": "#0F172A",
        "text-secondary": "#64748B",
        border: "#E2E8F0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
