/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F5A524',
          dark: '#D68F1F',
        },
        secondary: {
          DEFAULT: '#1E5128',
          light: '#2E7D3B',
        },
        sand: {
          light: '#F5DEB3',
          DEFAULT: '#DEB887',
          dark: '#BC9970',
        },
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        russo: ['var(--font-russo)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
