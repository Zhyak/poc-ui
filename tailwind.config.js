/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/api/**/*.tsx",
    "./index.tsx"
  ],
  theme: {
    // Color variables
    colors: {
      "green-success": "#4EAA37",
      "orange-warning": "#FF9800",
      "violet-0": "#9747ff",
      "red-danger": "#C60000",
      "light-green-background": "#E0F3DB",
      "divisor-color": "#ECECEC"
    },
    extend: {},
  },
  
  plugins: [],
}

