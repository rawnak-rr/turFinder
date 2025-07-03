/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // all of the colors used in the project
        primary: {
          black: '#262626',
          green: '#014E38',
          lime: '#07EC72',
          yellow: '#E6C700',
          beige: '#FCF6CB',
        }
    },
      // fonts made to be used easily
    fontFamily: {
      'landing': ['Helvetica', 'system-ui', 'sans-serif'],
      'tiles-title': ['Unbounded', 'sans-serif'],
      'tiles-text': ['Red Hat Mono', 'monospace'],
      'navbar': ['PolySans_Trial', 'sans-serif'],
      'card': ['PolySans_Trial', 'sans-serif'],
    },
    },
  },
  
}