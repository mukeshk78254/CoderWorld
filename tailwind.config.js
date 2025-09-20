/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Sets 'Poppins' as the default sans-serif font for the entire application.
        // It includes a fallback to generic 'sans-serif' if Poppins fails to load.
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  // The daisyUI plugin is included for pre-styled components.
  plugins: [require("daisyui")],
}