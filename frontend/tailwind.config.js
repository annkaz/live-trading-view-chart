/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        appBackground: "#000000",
        appText: "#F2F1F0",
        red: "#FF5A44",
        teal: "#4BC2A3",
        deepCharcoal: "#161514",
        resinBlack: "#252525",
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
        grotesk: ["ABC Monument Grotesk", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
