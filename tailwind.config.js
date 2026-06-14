/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#f97316",
        dark: "#000000",
        light: "#ffffff",
      },
    },
  },

  plugins: [],
};