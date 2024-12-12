/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        appBackground: "#1A1A1A",
        appText: "#F2F1F0",
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
        grotesk: ['ABC Monument Grotesk', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

