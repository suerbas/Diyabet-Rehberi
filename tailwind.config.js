/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './index.tsx', './App.tsx', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#0a0a0a',
        secondary: '#3b82f6',
        accent: '#f43f5e',
        dark: '#0f172a',
      },
    },
  },
  plugins: [],
};
