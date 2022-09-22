/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          blue: '#65B0F6',
          orange: '#FFB572',
          red: '#FF7CA3',
          green: '#50D1AA',
          purple: '#9290FE',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
