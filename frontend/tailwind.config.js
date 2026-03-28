/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deep:          "#0a0f1e",
        primary:       "#3d5af1",
        "primary-light":"#6b7ff5",
        accent:        "#c8a96e",
        pearl:         "#f8f9ff",
        surface:       "#0f1629",
        muted:         "#6b7280",
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
      boxShadow: {
        glow: "0 0 40px rgba(61, 90, 241, 0.25)",
        card: "0 20px 60px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        marquee:      "marquee 35s linear infinite",
        "marquee-rev":"marquee-rev 35s linear infinite",
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
      },
      backdropBlur: { xs: "2px" },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [],
};
