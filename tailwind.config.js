/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",   // se você tiver essa pasta
    "./src/app/**/*.{js,ts,jsx,tsx}",     // pasta app dentro do src
    "./src/components/**/*.{js,ts,jsx,tsx}"  // componentes dentro do src
  ],
  theme: {
    extend: {
      backgroundImage:{
        "home": "url('/cidade Inteligente.jpg')",
      },
       fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
}
