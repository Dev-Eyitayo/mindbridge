import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: { DEFAULT: '#7a9e7e', light: '#a8c5ac', dark: '#4a7a4f' },
        cream: '#faf7f2',
        'warm-white': '#fffef9',
        earth: { DEFAULT: '#8b6f47', light: '#c4a882' },
        forest: '#2d5a3d',
        blush: '#e8b4a0',
        text: { dark: '#2a2a2a', mid: '#5a5a5a', light: '#8a8a8a' },
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;