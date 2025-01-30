/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e6f7ff",
          500: "#00b4d8",
          600: "#0096b7",
        },
        secondary: {
          500: "#6c63ff",
          600: "#564fcc",
        },
        dark: {
          900: "#0f172a",
          800: "#1e293b",
        },
      },
    },
  },
  plugins: [],
};
