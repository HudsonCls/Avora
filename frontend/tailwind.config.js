/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#16a34a',
          dark: '#15803d',
          light: '#22c55e',
          50: '#f0fdf4',
          100: '#dcfce7',
        },
        // Paleta oficial do brandbook Avora — usada nas telas de identidade
        // (login/onboarding) sem alterar os tokens `brand.*` já usados no resto do app.
        avora: {
          deep: '#0F3D2E',
          green: '#16A34A',
          mist: '#86EFAC',
          bg: '#F1F5F3',
          slate: '#64748B',
        },
      },
    },
  },
  plugins: [],
};
