/** @type {import('tailwindcss').Config} */
export default { // <-- Changed from module.exports
  content: [
    "./index.html", // <-- Added this line
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};