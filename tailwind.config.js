/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-mulish)"],
      },
      transitionProperty: {
        width: "width",
        height: "height",
        "grid-template-columns": "grid-template-columns",
      },
    },
  },
  plugins: [],
};
