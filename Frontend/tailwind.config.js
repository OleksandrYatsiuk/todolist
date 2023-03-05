/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#ee3823'
        },
        hover: {
          red: '#a32618'
        }
      }
    }
  },
  plugins: [],
}
