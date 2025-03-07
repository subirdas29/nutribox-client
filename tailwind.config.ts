module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'underline-expand': 'underlineExpand 0.6s ease-out',
        'card-entrance': 'cardEntrance 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        underlineExpand: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        },
        cardEntrance: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }
    }
  }
}