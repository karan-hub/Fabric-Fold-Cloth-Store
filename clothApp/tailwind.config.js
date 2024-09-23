/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playwrite': ['"Playwrite DE Grund"', 'sans-serif'],
        'sofadi': ['"Sofadi One"', 'cursive'],
      },
      colors: {
        'custom-pink': '#EC8FD0',
      },
    },
  },
  plugins: [],
}

