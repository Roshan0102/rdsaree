/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B88E2F',
        'primary-dark': '#9A7626',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        rdsaree: {
          "primary": "#B88E2F",
          "primary-focus": "#9A7626",
          "primary-content": "#ffffff",
          "secondary": "#D5A882",
          "secondary-focus": "#C8906E",
          "secondary-content": "#ffffff",
          "accent": "#821D30",
          "accent-focus": "#6E1828",
          "accent-content": "#ffffff",
          "neutral": "#2B2730",
          "neutral-focus": "#201C24",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#F8F6F1",
          "base-300": "#EAE7E0",
          "base-content": "#2B2730",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-text-case": "uppercase",
          "--navbar-padding": "0.5rem",
          "--border-btn": "1px",
        },
      },
    ],
  },
} 