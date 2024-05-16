/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ribes']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      colors: {
        'bubblegum': '#ff77e9',
        'purple-100': 'rgb(139, 67, 163)',
        'hover-button-start': '#ffe0c3',
      },
      backgroundImage: {
        'wave-pattern': "url('/public/wave-background.PNG')",
      }
    },
  },
  plugins: [],
}