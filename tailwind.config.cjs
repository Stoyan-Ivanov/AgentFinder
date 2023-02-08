const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue[500],
        error: colors.red[500],
        paragraph: colors.slate[600]
      },
    },
  },
  plugins: [],
};
