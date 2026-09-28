/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oranza: {
          DEFAULT: "#FF6A00",
          50: "#FFF3E8",
          100: "#FFE6D1",
          200: "#FFC9A3",
          300: "#FFA86E",
          400: "#FF8A00",
          500: "#FF6A00",
          600: "#E85D00",
          700: "#C44B00",
          800: "#993B00",
          900: "#702A00",
        },
        "brand-orange": {
          DEFAULT: "#FF6A00",
          dark: "#E85D00",
          light: "#FFF3E8",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          secondary: "#F8F9FA",
          subtle: "#F3F4F6",
        },
        ink: {
          DEFAULT: "#111827",
          secondary: "#4B5563",
          tertiary: "#9CA3AF",
        },
        whatsapp: {
          DEFAULT: "#25D366",
          dark: "#1EBE5D",
          light: "#E8F8EE",
        },
        border: "#E5E5E5",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        "card-hover": "0 10px 30px -5px rgba(255, 106, 0, 0.12), 0 8px 16px -6px rgba(0, 0, 0, 0.04)",
        "glow-orange": "0 10px 25px -3px rgba(255, 106, 0, 0.35), 0 4px 10px -2px rgba(255, 106, 0, 0.2)",
      },
      borderRadius: {
        brand: "8px",
        card: "12px",
      }
    },
  },
  plugins: [],
}
