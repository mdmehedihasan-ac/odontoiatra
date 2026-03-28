import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    join(__dir, "index.html"),
    join(__dir, "src/**/*.{js,jsx,ts,tsx}"),
  ],
  theme: {
    extend: {
      colors: {
        deep:    "#0a0f1e",
        primary: "#3d5af1",
        accent:  "#c8a96e",
        pearl:   "#f8f9ff",
        ink:     "#1a1d2e",
        surface: "#0f1629",
        surface2:"#161d35",
        muted:   "#6b7280",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans:  ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh":
          "radial-gradient(at 40% 20%, #3d5af133 0px, transparent 50%), radial-gradient(at 80% 0%, #c8a96e22 0px, transparent 50%), radial-gradient(at 0% 50%, #3d5af122 0px, transparent 50%)",
      },
      animation: {
        marquee:      "marquee 35s linear infinite",
        "marquee-rev":"marquee-rev 35s linear infinite",
        "fade-up":    "fadeUp 0.7s ease forwards",
        float:        "float 5s ease-in-out infinite",
        "spin-slow":  "spin 12s linear infinite",
        shimmer:      "shimmer 2.5s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backdropBlur: { xs: "2px" },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [],
};
