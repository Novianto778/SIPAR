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
      zIndex: {
        100: '100',
      },
      maxWidth: {
        dashboard: 'calc(100vw - 80px)',
        'dashboard-small': 'calc(100vw - 40px)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide'), require('@tailwindcss/forms')],
};
