// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--color-border)',
        ring: 'var(--color-ring)',
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        // Add others as needed
      },
    },
  },
  plugins: [],
};