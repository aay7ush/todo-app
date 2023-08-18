/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Josefin Sans", "sans-serif"],
      },
      colors: {
        "clr-bg-main": "var(--clr-bg-main)",
        "clr-bg-input": "var(--clr-bg-input)",
        "clr-bg-border": "var(--clr-bg-border)",
        "clr-text-primary": "var(--clr-text-primary)",
        "clr-text-secondary": "var(--clr-text-secondary)",
        "clr-accent": "var(--clr-accent)",
        "clr-line-through": "var(--clr-line-through)",
        "clr-gradient-1": "var(--clr-gradient-1)",
        "clr-gradient-2": "var(--clr-gradient-2)",
      },
    },
  },
  plugins: [],
}
