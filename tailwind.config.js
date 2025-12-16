/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          dark: '#011169',
          purple: '#B432FF',
          violet: '#5832FF',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to right, #011169, #5832FF)',
      }
    },
  },
  plugins: [],
}

