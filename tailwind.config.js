/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "primary": "#60a5fa",
        "secondary": "#64748b",
        "background": "#8926ad",
        "highlight": "#9F2B68",
      }
    },
  },
  plugins: [],
}

