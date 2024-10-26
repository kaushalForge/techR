/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mjs}"],
  theme: {
    extend: {
      screens: {
        lap: "1200px",
      },
    },
  },
  plugins: [],
};
