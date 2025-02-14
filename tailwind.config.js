/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    function ({ addUtilities }) {
      addUtilities({
        '.text-justify-full': {
          'text-align': 'justify',
          'text-justify': 'inter-word', // Ensures full justification like MS Word
        },
      });
    },
  ],
}