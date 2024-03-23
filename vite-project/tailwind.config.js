/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Trebuchet MS', 'sans-serif']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      colors: {
        'bubblegum': '#ff77e9',
      },
    },
  },
  plugins: [],
}