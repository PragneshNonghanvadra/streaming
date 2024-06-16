const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: [
      "./index.html", // it is for client packages to scan as it is used as preset
      "./src/**/*.{html,ts,tsx}",
      "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
