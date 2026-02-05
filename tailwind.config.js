/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        weather: {
          'light-bg': '#f8fafc',
          'dark-bg': '#0f172a',
          'light-card': 'rgba(255, 255, 255, 0.85)',
          'dark-card': 'rgba(30, 41, 59, 0.85)',
        }
      },
      backgroundImage: {
        // Light theme gradients (white/neutral based)
        'gradient-light': 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
        'gradient-light-cloudy': 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)',
        'gradient-light-rainy': 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        'gradient-light-snow': 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
        
        // Dark theme gradients
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        'gradient-dark-cloudy': 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
        'gradient-dark-rainy': 'linear-gradient(135deg, #0f172a 0%, #1e1e2e 50%, #2d3748 100%)',
        'gradient-dark-storm': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        'gradient-dark-snow': 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
