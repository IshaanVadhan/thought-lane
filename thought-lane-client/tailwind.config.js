/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          500: "#a855f7",
        },
        dark: {
          100: "#111827",
          200: "#1F2937",
          300: "#4B5563",
        },
      },
    },
  },
  plugins: [],
};
