/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#000',
          secondary: '#FFB612',
          tertiary: '#F5F5F5',
        }
      }
    },
  },
  plugins: []
}