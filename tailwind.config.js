module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('/cidade-Inteligente.jpg')",
        "capa": "url('/pizza.jpg')",
        "capa2": "url('/mecanico de moto.jpg')"
      },

      keyframes: {
        customPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.1' },
        },
        spinLeft: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-360deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        slowPing: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        // ✅ NOVO: animação mais suave e crescente da esquerda para a direita
        slideFadeInLeft: {
          '0%': {
            transform: 'translateX(-100%) scale(0.95)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0) scale(1)',
            opacity: '1',
          },
        },
      },

      animation: {
        'pulse-2s': 'customPulse 3s ease-in-out infinite',
        'spin-left': 'spinLeft 25s ease-in-out infinite',
        'slow-ping': 'slowPing 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        // ✅ NOVO: nome da animação mais suave
        'slide-fade-left': 'slideFadeInLeft 1s ease-out forwards',
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
