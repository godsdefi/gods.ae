/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'gods-dark': '#0A0B0E',
        'gods-primary': '#00F0FF',
        'gods-secondary': '#6E7179',
        
        // Accent colors for data visualization
        'gods-green': '#00FF9D',
        'gods-purple': '#A855F7',
        'gods-yellow': '#FFD700',
        
        // UI element colors
        'gods-card': 'rgba(255, 255, 255, 0.05)',
        'gods-border': 'rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gods-glow': 'linear-gradient(180deg, rgba(0, 240, 255, 0.15) 0%, rgba(0, 240, 255, 0) 100%)',
      },
      boxShadow: {
        'gods-glow': '0 0 20px rgba(0, 240, 255, 0.1)',
        'gods-card': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backdropFilter: {
        'gods': 'blur(20px) saturate(180%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
