/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        cyanMain: "#02EECB",
        bluegreenMain: "#08ACB9"
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
}

