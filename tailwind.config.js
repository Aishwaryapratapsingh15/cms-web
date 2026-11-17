/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bloo: "#01b0f1",
        muted: "#7f7f7f",
        blackk: "#333333",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
