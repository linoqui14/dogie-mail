import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        wag: {
          '0%, 100%': { transform: 'rotate(-5deg) scale(1.1)' },
          '50%': { transform: 'rotate(5deg) scale(1.1)' },
        },
      },
      animation: {
        wag: 'wag 0.3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;